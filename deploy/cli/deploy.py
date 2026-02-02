import os
import time
from pathlib import Path

import click

from deploy.aws import aws, resource_details
from deploy.settings import BASE_DIR, LAMBDA_FUNCTIONS, PROJECT_NAME
from deploy.utils import echo, run, timing


@click.group()
def deploy():
    """
    Production deployment.
    """


@deploy.command(help='Deploy app to production')
@timing
def deploy_app():
    # Upload website static content
    s3_bucket = resource_details(
        PROJECT_NAME,
        'WebsiteBucket',
    )['PhysicalResourceId']
    dist_folder = BASE_DIR / 'public'
    aws(f's3 sync {dist_folder} s3://{s3_bucket} --delete', parse_output=False)

    # Invalidate CDN
    cloudfront_id = resource_details(
        PROJECT_NAME,
        'WebsiteDistribution',
    )['PhysicalResourceId']
    aws(f'cloudfront create-invalidation --distribution-id {cloudfront_id} --paths "/*"')


@deploy.command(help='Deploy lambda function to production')
@timing
def deploy_lambda():
    resource_ids: dict[str, str] = {}
    for func_name in LAMBDA_FUNCTIONS:
        resource_ids[func_name] = resource_details(
            PROJECT_NAME,
            func_name,
        )['PhysicalResourceId']

    package_path = Path('lambdas')
    package_deps_path = package_path / 'dependencies'
    code_archive_name = 'lambda-package.zip'

    run(f'zip -r ../{code_archive_name} .', cwd=package_deps_path)
    run(f'zip -r {code_archive_name} core', cwd=package_path)
    run(f'zip -g {code_archive_name} functions.py', cwd=package_path)

    code_archive_path = f'fileb://{package_path}/{code_archive_name}'
    for func_name in LAMBDA_FUNCTIONS:
        func_id = resource_ids[func_name]
        echo(f'Updating function code: {func_name}')
        aws(
            f'lambda update-function-code '
            f'--function-name {func_id} '
            f'--zip-file {code_archive_path} '
            f'--publish',
        )

    def get_function_config(fn: str) -> dict:
        fi = resource_ids[fn]
        return aws(f'lambda get-function-configuration --function-name {fi}')

    in_progress_functions: set[str] = set(LAMBDA_FUNCTIONS)
    failed_functions: set[str] = set()
    updated_functions: set[str] = set()
    attempt = 0
    max_attempts = 120
    while in_progress_functions and attempt <= max_attempts:
        attempt += 1
        time.sleep(1)
        for func_name in set(in_progress_functions):
            status = get_function_config(func_name)['LastUpdateStatus']
            echo(f'({attempt}/{max_attempts}) Function {func_name} status: {status}')
            match status:
                case 'InProgress':
                    continue
                case 'Failed':
                    echo(f'Function {func_name} failed to update')
                    in_progress_functions.remove(func_name)
                    failed_functions.add(func_name)
                case _:
                    in_progress_functions.remove(func_name)
                    updated_functions.add(func_name)

    info = os.environ['GOOGLE_API_SERVICE_ACCOUNT_INFO']
    info = info.replace('"', '\\"')  # encode quotes inside json string
    spreadsheet_id = os.environ['GOOGLE_SPREADSHEET_ID']
    slack_bot_token = os.environ['SLACK_BOT_TOKEN']
    pipedrive_token = os.environ['PIPEDRIVE_TOKEN']
    for func_name in updated_functions:
        echo(f'Updating function configuration: {func_name}')
        func_id = resource_ids[func_name]
        aws(
            f'lambda update-function-configuration '
            f'--function-name {func_id} '
            f'--environment "Variables={{'
            f"GOOGLE_API_SERVICE_ACCOUNT_INFO='{info}',"
            f'GOOGLE_SPREADSHEET_ID={spreadsheet_id},'
            f'PIPEDRIVE_TOKEN={pipedrive_token},'
            f'SLACK_BOT_TOKEN={slack_bot_token}'
            f'}}"',
        )

    failed: list[str] = []
    for func_name in failed_functions:
        function_config = get_function_config(func_name)
        reason = function_config.get('LastUpdateStatusReason', 'N/A')
        reason_code = function_config.get('LastUpdateStatusReasonCode', 'N/A')
        failed.append(f'{func_name}: {reason_code} | {reason}')
    if failed:
        msg = f'Failed to update lambda function. {";".join(failed)}'
        raise RuntimeError(msg)

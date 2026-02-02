import os
import time
from pathlib import Path

import click

from deploy.aws import aws, resource_details
from deploy.settings import BASE_DIR, LAMBDA_FUNCTIONS, PROJECT_NAME
from deploy.utils import run, timing


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
    package_path = Path('lambda-package')
    package_deps_path = package_path / 'dependencies'
    code_archive_name = 'lambda-package.zip'

    run(f'zip -r ../{code_archive_name} .', cwd=package_deps_path)
    run(f'zip -r {code_archive_name} core', cwd=package_path)
    run(f'zip -g {code_archive_name} handlers.py', cwd=package_path)

    code_archive_path = f'fileb://{package_path}/{code_archive_name}'
    for func_name in LAMBDA_FUNCTIONS:
        aws(
            f'lambda update-function-code '
            f'--function-name {func_name} '
            f'--zip-file {code_archive_path} '
            f'--publish',
        )

    def get_function_config(fn: str) -> dict:
        return aws(
            f'lambda get-function-configuration --function-name {fn}',
        )['Configuration']

    in_progress_functions: set[str] = set(LAMBDA_FUNCTIONS)
    failed_functions: set[str] = set()
    updated_functions: set[str] = set()
    while in_progress_functions:
        for func_name in in_progress_functions:
            status = get_function_config(func_name)['LastUpdateStatus']
            match status:
                case 'InProgress':
                    continue
                case 'Failed':
                    in_progress_functions.remove(func_name)
                    failed_functions.add(func_name)
                case _:
                    in_progress_functions.remove(func_name)
                    updated_functions.add(func_name)
        time.sleep(1)

    info = os.environ['GOOGLE_API_SERVICE_ACCOUNT_INFO']
    info = info.replace('"', '\\"')  # encode quotes inside json string
    spreadsheet_id = os.environ['GOOGLE_SPREADSHEET_ID']
    slack_bot_token = os.environ['SLACK_BOT_TOKEN']
    pipedrive_token = os.environ['PIPEDRIVE_TOKEN']
    for func_name in updated_functions:
        aws(
            f'lambda update-function-configuration '
            f'--function-name {func_name} '
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
        reason = function_config['LastUpdateStatusReason']
        reason_code = function_config['LastUpdateStatusReasonCode']
        failed.append(f'{func_name}: {reason_code} | {reason}')
    if failed:
        msg = f'Failed to update lambda function. {";".join(failed)}'
        raise RuntimeError(msg)

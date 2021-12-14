#!/usr/bin/env python3
import os
import time
from pathlib import Path

import click

from deploy.aws import aws, resource_details
from deploy.settings import PROJECT_NAME
from deploy.utils import run, timing


BASE_DIR = os.path.dirname(os.path.abspath(__file__))


@click.group()
def cli():
    pass


@cli.command(help='Deploy app to production')
@timing
def deploy_app():
    # Upload website static content
    s3_bucket = resource_details(
        PROJECT_NAME,
        'WebsiteBucket',
    )['PhysicalResourceId']
    dist_folder = os.path.join(BASE_DIR, 'public')
    aws(f's3 sync {dist_folder} s3://{s3_bucket} --delete', parse_output=False)

    # Invalidate CDN
    cloudfront_id = resource_details(
        PROJECT_NAME,
        'WebsiteDistribution',
    )['PhysicalResourceId']
    aws(f'cloudfront create-invalidation --distribution-id {cloudfront_id} '
        f'--paths "/*"')


@cli.command(help='Deploy lambda function to production')
@timing
def deploy_lambda():
    function_name = resource_details(
        PROJECT_NAME,
        'JobApplicationLambda',
    )['PhysicalResourceId']

    package_path = Path('lambda-package')
    package_deps_path = package_path / 'dependencies'
    code_archive_name = 'lambda-package.zip'

    run(f'zip -r ../{code_archive_name} .', cwd=package_deps_path)
    run(f'zip -g {code_archive_name} lambda_function.py', cwd=package_path)

    code_archive_path = f'fileb://{package_path}/{code_archive_name}'
    aws(
        f'lambda update-function-code '
        f'--function-name {function_name} '
        f'--zip-file {code_archive_path} '
        f'--publish',
    )

    def get_function_config():
        return aws(
            f'lambda get-function --function-name {function_name}',
        )['Configuration']

    function_config = get_function_config()
    status = function_config['LastUpdateStatus']
    while status == 'InProgress':
        time.sleep(1)
        function_config = get_function_config()
        status = function_config['LastUpdateStatus']

    if status == 'Failed':
        status_reason = function_config['LastUpdateStatusReason']
        status_reason_code = function_config['LastUpdateStatusReasonCode']
        raise RuntimeError(
            f'Failed to update lambda function. '
            f'Reason: {status_reason_code} | {status_reason}.',
        )

    info = os.environ['GOOGLE_API_SERVICE_ACCOUNT_INFO']
    info = info.replace('"', '\\"')  # encode quotes inside json string
    spreadsheet_id = os.environ['GOOGLE_SPREADSHEET_ID']
    slack_bot_token = os.environ['SLACK_BOT_TOKEN']

    aws(
        f'lambda update-function-configuration '
        f'--function-name {function_name} '
        f'--environment "Variables={{'
        f'GOOGLE_API_SERVICE_ACCOUNT_INFO=\'{info}\','
        f'GOOGLE_SPREADSHEET_ID={spreadsheet_id},'
        f'SLACK_BOT_TOKEN={slack_bot_token}'
        f'}}"',
    )


if __name__ == '__main__':
    cli()

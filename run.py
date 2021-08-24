#!/usr/bin/env python3
import os
from pathlib import Path

import click

from deploy.aws import aws, resource_details
from deploy.settings import AWS_ACCOUNT_ID, PROJECT_NAME
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
    package_path = Path('lambda-package')
    package_deps_path = package_path / 'dependencies'
    code_archive_name = 'lambda-package.zip'

    run(f'zip -r ../{code_archive_name} .', cwd=package_deps_path)
    run(f'zip -g {code_archive_name} lambda_function.py', cwd=package_path)

    function_name = 'handle_job_application'
    code_archive_path = f'fileb://{package_path}/{code_archive_name}'
    try:
        aws(
            f'lambda update-function-code '
            f'--function-name {function_name} '
            f'--zip-file {code_archive_path} '
            f'--publish',
        )
    except RuntimeError as ex:
        if 'Function not found' not in str(ex):
            raise
        role_id = resource_details(
            PROJECT_NAME,
            'LambdaExecutionRole',
        )['PhysicalResourceId']
        role_arn = f'arn:aws:iam::{AWS_ACCOUNT_ID}:role/{role_id}'
        aws(
            f'lambda create-function '
            f'--role {role_arn} '
            f'--function-name {function_name} '
            f'--zip-file {code_archive_path} '
            f'--runtime python3.9 '
            f'--handler lambda_function.lambda_handler '
            f'--publish',
        )

    info = os.environ['GOOGLE_API_SERVICE_ACCOUNT_INFO']
    info = info.replace('"', '\\"')  # encode quotes inside json string
    spreadsheet_id = os.environ['GOOGLE_SPREADSHEET_ID']

    aws(
        f'lambda update-function-configuration '
        f'--function-name {function_name} '
        f'--timeout 10 '
        f'--environment "Variables={{'
        f'GOOGLE_API_SERVICE_ACCOUNT_INFO=\'{info}\','
        f'GOOGLE_SPREADSHEET_ID={spreadsheet_id}'
        f'}}"',
    )


if __name__ == '__main__':
    cli()

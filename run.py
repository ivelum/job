#!/usr/bin/env python3
import os

import click

from deploy.aws import aws, resource_details
from deploy.settings import PROJECT_NAME
from deploy.utils import timing

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


@click.group()
def cli():
    pass


@cli.command(help='Deploy to production')
@timing
def deploy():
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


if __name__ == '__main__':
    cli()

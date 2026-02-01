import json
import os

from .settings import AWS_REGION, PROJECT_NAME
from .utils import run


def aws_cmd(cmd, region):
    if os.environ.get('AWS_ACCESS_KEY_ID'):
        command = f'aws --region {region or AWS_REGION}'
    else:
        profile = os.environ.get('AWS_PROFILE') or PROJECT_NAME
        command = f'aws --profile {profile}'
        if region:
            command = f'{command} --region {region}'
    return f'{command} {cmd}'


def aws(
    cmd,
    region: str | None = None,
    *,
    parse_output: bool = True,
    **kwargs,
):
    """
    Shortcut for aws cli.
    """
    if parse_output:
        kwargs['capture_stdout'] = True
    result = run(aws_cmd(cmd, region), **kwargs)
    if parse_output:
        result = json.loads(''.join(result.stdout_lines))
    return result


def resource_details(stack_name, logical_id):
    return aws(
        f'cloudformation describe-stack-resource --stack-name {stack_name} '
        f'--logical-resource-id {logical_id}'
    )['StackResourceDetail']

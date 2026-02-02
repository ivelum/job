import json
import sys
from collections.abc import Mapping
from json import JSONDecodeError
from typing import Any

from core.pipedrive import PipedriveService


def error_response(event: Any, message: str) -> dict[str, str]:
    sys.stdout.write(str(event))
    return {'status': 'error', 'message': message}


def job_apply_handler(
    event: Mapping[str, Any],
    context,  # noqa: ARG001
) -> dict:
    """
    Handle job apply request.
    """
    malformed_error = 'Wrong input: malformed body.'
    try:
        event_body = json.loads(event['body'])
    except (KeyError, JSONDecodeError, AssertionError):
        return error_response(event, malformed_error)
    if not isinstance(event_body, dict):
        return error_response(event, malformed_error)

    try:
        job = event_body.pop('job')
    except KeyError:
        return error_response(event, 'Wrong input: missing "job" param.')

    try:
        PipedriveService().create_deal_from_form_data(job, event_body)
    except Exception:
        return error_response('Failed to save data')

    return {'status': 'ok'}

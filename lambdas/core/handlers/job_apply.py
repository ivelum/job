import json
import logging
from collections.abc import Mapping
from json import JSONDecodeError
from typing import Any

from core.pipedrive import PipedriveService
from core.utils import error_response, success_response


log = logging.getLogger(__name__)


def handler(
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

    attempt = 0
    max_attempts = 2
    while attempt < max_attempts:
        attempt += 1
        # noinspection PyBroadException
        try:
            PipedriveService().create_deal_from_form_data(job, event_body)
        except Exception:
            log.exception('Failed to save data')
            continue
        else:
            return success_response('New deal? Nice.')
    return error_response(event, 'Failed to save data')

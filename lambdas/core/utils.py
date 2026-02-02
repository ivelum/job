import sys
from typing import Any


def error_response(event: Any, message: str) -> dict[str, str]:
    """
    Log the raw event to stdout and return a structured error dict.
    """
    sys.stdout.write(str(event))
    return {'status': 'error', 'message': message}


def success_response(message: str = '') -> dict[str, str]:
    """
    Return a structured success response.
    """
    response: dict[str, str] = {'status': 'ok'}
    if message:
        response['message'] = message
    return response

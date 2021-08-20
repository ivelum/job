import json
import time
from functools import wraps

import click
import sarge


def run(cmd, raise_on_error=True, capture_stdout=False, parse_json=False,
        print_cmd=False, **kwargs):
    """
    Wrapper around sarge.run which can raise errors and capture stdout.
    """
    if capture_stdout:
        kwargs['stdout'] = sarge.Capture()
    if raise_on_error:
        kwargs['stderr'] = sarge.Capture()
    if print_cmd:
        click.echo(f'->> {cmd}')
    result = sarge.run(cmd, **kwargs)
    code = result.returncode
    if code and raise_on_error:
        raise RuntimeError(
            'Command failed, exit code %s - "%s":\n%s' % (
                code,
                cmd,
                result.stderr.read().decode(),
            ))
    result.json = None
    if result.stdout:
        result.stdout_lines = result.stdout.read().decode().split('\n')
        if result.stdout_lines[-1] == '':
            result.stdout_lines = result.stdout_lines[:-1]
        if parse_json:
            result.json = json.loads('\n'.join(result.stdout_lines))
    else:
        result.stdout_lines = []
    return result


def timing(func):
    """
    Decorator which prints function execution time.
    """
    @wraps(func)
    def inner(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        func_args = ', '.join(
            [str(a) for a in args] +
            ['%s=%s' % (k, v) for k, v in kwargs.items()],
        )
        print('\n--- %s(%s): %0.3f sec ---\n\n' % (  # noqa T001
            func.__name__,
            func_args,
            time.time() - start,
        ))
        return result
    return inner

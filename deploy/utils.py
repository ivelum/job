import json
import time
from collections.abc import Callable, Generator
from contextlib import contextmanager
from functools import wraps

import click
import sarge


def run(
    cmd,
    *,
    raise_on_error: bool = True,
    capture_stdout: bool = False,
    parse_json: bool = False,
    print_cmd: bool = False,
    **kwargs,
):
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
        result_err = result.stderr.read().decode()
        msg = f'Command failed, exit code {code} - "{cmd}":\n{result_err}'
        raise RuntimeError(msg)
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
            [str(a) for a in args] + [f'{k}={v}' for k, v in kwargs.items()],
        )
        elapsed = time.time() - start
        echo(f'\n--- {func.__name__}({func_args}): {elapsed:0.3f} sec ---\n\n', prefix='')
        return result

    return inner


@contextmanager
def timing_ctx() -> Generator[Callable[[], float]]:
    """
    Context manager that yields a callable to get elapsed time.
    """
    start = time.time()

    def elapsed() -> float:
        return time.time() - start

    yield elapsed


def echo(message, prefix='->> ') -> None:
    """
    Use ->> prefix to visually identify output produced by our script.
    """
    print(f'{prefix}{message}', flush=True)  # noqa: T201

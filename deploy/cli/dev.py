import sys

import click

from deploy.settings import BASE_DIR
from deploy.utils import run, timing, timing_ctx


OK = 0
RUFF_FAILED = 1
RUFF_FORMAT_FAILED = 2
ESLINT_FAILED = 4
STYLELINT_FAILED = 8


@click.group()
def dev():
    """
    Local development.
    """


@dev.command(help='Check codestyle')
@click.option('--autofix', '--fix', is_flag=True, help='Auto format the code to comply with checks')
@timing
def codestyle(*, autofix: bool) -> None:
    py_files = './deploy ./lambda-package'
    js_files = './src'
    css_files = './src/**/*.scss'
    result = (
        ruff(py_files, fix=autofix)
        + ruff_format(py_files, fix=autofix)
        + eslint(js_files, fix=autofix)
        + stylelint(css_files, fix=autofix)
    )
    sys.exit(result)


def ruff(files: str, *, fix: bool = False) -> int:
    """
    Check Python files with `Ruff`.

    https://docs.astral.sh/ruff/rules/
    """
    if files:
        click.echo('\n--- Ruff ---')
        with timing_ctx() as elapsed:
            fix_arg = '--fix' if fix else ''
            result = run(
                f'ruff check {fix_arg} {files}',
                raise_on_error=False,
            )
            if len(result.stdout_lines):
                print('\n'.join(result.stdout_lines))  # noqa: T201
        if result.returncode:
            stderr = click.get_text_stream('stderr')
            stderr.write(f'> Ruff: FAIL ({elapsed():.2f}s)\n')
            return RUFF_FAILED
        click.echo(f'> Ruff: ok ({elapsed():.2f}s)')
    return OK


def ruff_format(files: str, *, fix: bool = False) -> int:
    """
    Check Python files formatting with `Ruff format`.

    https://docs.astral.sh/ruff/formatter/
    """
    if files:
        click.echo('\n--- Ruff format ---')
        with timing_ctx() as elapsed:
            if fix:
                result = run(
                    f'ruff format {files}',
                    raise_on_error=False,
                )
            else:
                result = run(
                    f'ruff format --check {files}',
                    raise_on_error=False,
                )
            if len(result.stdout_lines):
                print('\n'.join(result.stdout_lines))  # noqa: T201
        if result.returncode:
            stderr = click.get_text_stream('stderr')
            stderr.write(f'> Ruff format: FAIL ({elapsed():.2f}s)\n')
            return RUFF_FORMAT_FAILED
        click.echo(f'> Ruff format: ok ({elapsed():.2f}s)')
    return OK


def eslint(files: str, *, fix: bool = False) -> int:
    """
    Perform ESLint check on JavaScript and TypeScript files.

    https://eslint.org/docs/latest/rules/
    """
    fix = '--fix' if fix else ''
    if files:
        click.echo('\n--- ESLint ---')
        eslint_exec = BASE_DIR / 'node_modules/.bin/eslint'
        extensions = ['.js', '.jsx', '.mjs', '.ts', '.tsx']
        ext_args = ' '.join(f'--ext {ext}' for ext in extensions)
        try:
            run(f'{eslint_exec} {fix} {ext_args} {files}')
        except RuntimeError:
            stderr = click.get_text_stream('stderr')
            stderr.write('> ESLint: FAIL\n')
            return ESLINT_FAILED
        click.echo('> ESLint: ok')
    return OK


def stylelint(files: str, *, fix: bool = False) -> int:
    """
    Check style files with `stylelint`.

    https://github.com/stylelint/stylelint
    """
    if not files:
        return OK

    fix_opt = '--fix' if fix else ''
    click.echo('\n--- stylelint ---')
    with timing_ctx() as elapsed:
        stylelint_exec = BASE_DIR / f'node_modules/.bin/stylelint {fix_opt}'
        try:
            run(f'{stylelint_exec} {files}')
        except RuntimeError:
            stderr = click.get_text_stream('stderr')
            stderr.write(f'> stylelint: FAIL ({elapsed():.2f}s)\n')
            return STYLELINT_FAILED
    click.echo(f'> stylelint: ok ({elapsed():.2f}s)')
    return OK

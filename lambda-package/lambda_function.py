import json
import os
import sys
from datetime import datetime
from json import JSONDecodeError

import gspread
from slack_sdk import WebClient


def lambda_handler(event, context):
    info = json.loads(os.environ['GOOGLE_API_SERVICE_ACCOUNT_INFO'])
    spreadsheet_id = os.environ['GOOGLE_SPREADSHEET_ID']

    def error_response(message):
        sys.stdout.write(str(event))
        return {'status': 'error', 'message': message}

    try:
        event_body = json.loads(event['body'])
        assert isinstance(event_body, dict)
    except (KeyError, JSONDecodeError, AssertionError):
        return error_response('Wrong input: malformed body.')

    try:
        job = event_body.pop('job')
    except KeyError:
        return error_response('Wrong input: missing "job" param.')

    event_body['ts'] = datetime.now().isoformat()

    gc = gspread.service_account_from_dict(info)
    wb = gc.open_by_key(spreadsheet_id)
    try:
        ws = wb.worksheet(job)
    except gspread.exceptions.WorksheetNotFound:
        return error_response(f'Wrong input: unknown "{job}" job.')

    fields = ws.row_values(1)

    values = []
    for field in fields:
        values.append(event_body.get(field, ''))

    missing_values = {k: v for k, v in event_body.items() if k not in fields}
    new_row_num = len(ws.col_values(1)) + 1
    ws.update(f'A{new_row_num}', [values])
    if missing_values:
        ws.update_cell(new_row_num, len(values) + 1, json.dumps(missing_values))

    slack_client = WebClient(token=os.environ['SLACK_BOT_TOKEN'])
    slack_client.chat_postMessage(
        channel='G054C3DPL',
        text=(
            f'New "{job}" job application :tada:. '
            f'<{ws.url}|Open applications list>'
        ),
    )

    return {'status': 'ok'}

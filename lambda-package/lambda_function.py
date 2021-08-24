import json
import os
from datetime import datetime

import gspread


def lambda_handler(event, context):
    info = json.loads(os.environ['GOOGLE_API_SERVICE_ACCOUNT_INFO'])
    spreadsheet_id = os.environ['GOOGLE_SPREADSHEET_ID']

    job = event.pop('job')
    event['ts'] = datetime.now().isoformat()

    gc = gspread.service_account_from_dict(info)
    wb = gc.open_by_key(spreadsheet_id)
    try:
        ws = wb.worksheet(job)
    except gspread.exceptions.WorksheetNotFound:
        ws = wb.add_worksheet(job, rows=1000, cols=100)
    fields = ws.row_values(1)
    values = []
    for field in fields:
        values.append(event.get(field, ''))

    missing_values = {k: v for k, v in event.items() if k not in fields}
    new_row_num = len(ws.col_values(1)) + 1
    ws.update(f'A{new_row_num}', [values])
    if missing_values:
        ws.update_cell(new_row_num, len(values) + 1, json.dumps(missing_values))

    return {'status': 'ok'}

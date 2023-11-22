import json
import os
import sys
from datetime import datetime
from json import JSONDecodeError

import gspread
from pipedrive.client import Client
from slack_sdk import WebClient


PIPEDRIVE_CUSTOM_FIELD_FALLBACK = "6244292b70f654e8adb467e7c4b6e417c59099a8"


def pipedrive_get_or_create_person(client, form_person):
    resp = client.persons.search_persons({
        "term": form_person["email"],
        "exact_match": 1,
        "fields": "email",
        "limit": 1,
    })

    if len(resp['data']['items']):
        result = resp['data']['items'][0]['item']
        print(f"Person found: {result['id']}")
        return result

    resp = client.persons.create_person(form_person)
    print(f"Person created {resp['data']['id']}")
    return resp['data']


def pipedrive_create_deals(client, title, person, data):
    # pd works with custom fields using internal IDs, not names
    # making mapping "field_name" : "internal_id" for future usage
    cf_mapping = {}
    response = client.deals.get_deal_fields()

    for item in response['data']:
        if not item.get('edit_flag', False):
            continue  # built in field in pd
        cf_mapping[item['name']] = item['key']

    # unknown fields and values will be written into special field
    # by default it has name "Other"
    cf_fallback = cf_mapping.pop('Other', PIPEDRIVE_CUSTOM_FIELD_FALLBACK)

    cf_data = {
        cf_fallback: '',
    }

    for k, v in data.items():
        if k in cf_mapping:
            cf_data[cf_mapping[k]] = v
        else:
            # in case form field was not found, keep it in special pd field
            cf_data[cf_fallback] += f'{k}: {v}\n'

    payload = {
        'title': title,
        'person_id': person['id'],
        **cf_data,
    }
    resp = client.deals.create_deal(payload)

    print(f"Deals {resp['data']['id']} was created")


def send_data_to_pipedrive(title, form_data):
    client = Client(domain='https://api.pipedrive.com')
    client.set_api_token(os.environ.get('PIPEDRIVE_TOKEN'))
    form_person = {
        'email': form_data.pop('email', ''),
        'name': form_data.pop('fullName', '')
    }

    api_person = pipedrive_get_or_create_person(client, form_person)
    pipedrive_create_deals(client, title, api_person, form_data)


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
    for col_index, field in enumerate(fields, start=1):
        if field == 'ts':
            # save timestamp col index as it should always have a value
            # and we can check its values count later
            ts_col_index = col_index
        values.append(event_body.get(field, ''))

    missing_values = {k: v for k, v in event_body.items() if k not in fields}
    new_row_num = len(ws.col_values(ts_col_index)) + 1
    ws.update(f'A{new_row_num}', [values])
    if missing_values:
        ws.update_cell(new_row_num, len(values) + 1, json.dumps(missing_values))

    slack_client = WebClient(token=os.environ['SLACK_BOT_TOKEN'])
    # `ws.url` returns link to google api, but we need a link to google docs
    ws_url = (
        f'https://docs.google.com/spreadsheets/d/{spreadsheet_id}/'
        f'edit#gid={ws.id}'
    )
    slack_client.chat_postMessage(
        channel='G054C3DPL',
        text=(
            f'New "{job}" job application :tada:. '
            f'<{ws_url}|Open applications list>'
        ),
    )

    # average time for longest path is about 1.5-2 s
    # in good circumstances (fast internet, pd works without delays)
    try:
        event_body.pop('ts', None)  # deals has its own ts
        send_data_to_pipedrive(f'New "{job}" job application', event_body)
    except Exception as e:  # temporary catch all exceptions
        print(str(e))

    return {'status': 'ok'}

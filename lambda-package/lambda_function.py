import json
import os
import sys
from datetime import datetime
from json import JSONDecodeError

import gspread
from pipedrive.client import Client


PIPEDRIVE_CUSTOM_FIELD_FALLBACK = "6244292b70f654e8adb467e7c4b6e417c59099a8"

PERSON_FIELDS_MAP = {
    'skype': '4717d3279137c308cc6aa9d67a48622ab596b7ae',
    'whatsapp': 'b117a397d11ea09aacbb47d98a5f371e8c2bc8c3',
    'telegram': '6ab6aa18532570c3f6799700ec3c9d7cca1e4d28',
}

CUSTOM_FIELDS_MAP = {
  "city": "f7731ae79d66ce127edafbea25acc23d741964d1",
  "country": "76d376013db86003c179c2cf97035dd001e6f578",
  "portfolio": "bcc3e04c1f33c099e2ee03ad6b7f4e5789cc8f10",
  "education": "2322c3b704ededc65e25c65fc4fdef436b2d7a4a",
  "english": "6ffd54d9947c4a749d5794205c4457ab6a4c13fd",
  "lovedTasks": "8808eb21eb97c4de0e2124a0ebc2f51caa616daf",
  "unlovedTasks": "9d8ec5f27d6f04082e81b9e7742bb1b394ef752a",
  "experiencedjango": "dda69ba4f52302a1ca0e5db4c3a2a7fea3f4fd5b",
  "experienceposition": "b4dc419032b8de6f7f1d67c2c12ec2998200143b",
  "linuxCommands": "853591293300cce011d4549f92ea7cc8e54d8c35",
  "experiencedb": "db5f0991b4f13b1ad3802274d9a764449564c9d0",
  "experiencetests": "17a9192a295f3a0dd3248a02729e190fa979b601",
  "experiencelinux": "59818648fcbc5a5b2552d09d25c67ebca0221cf2",
  "experiencerequirements": "b5011e781a2e6a6eb4f04a1041fef86d13447173",
  "experiencefrontend": "32a1c8173da00a92cac9de5dde834ebb33a7f967",
  "experiencepython": "6e182fd384f109671c83cb631de95a2bd8fe711f",
  "specializedExperience": "273b41a8ee293c877ffe4dbb784451a16d429f95",
  "experiencephp": "3c6b10339c72dec10796ec6bcd7a28c5a99fdd56",
  "experiencewordpress": "6fce4f306ae12b0a25bc424e66649013d3d121ac",
  "experienceOverall": "9c59f474228e1d86dfb0219e77b0553e9d01b55f",
  "recommendedBy": "14379c7424c02e6c22109bbb364c0a29a7cd9692",
  "referrer": "a97a50f0b9a4cb5386f687774370b951356669a2",
  "experiencerereact": "e800164efb4ad750453a0ed100f1253c90dc0db9",
  "experiencejs": "d845ea966017a800c33daf960ad25217da87f9bd",
  "experiencemarkup": "5319f706a4121961b69e80f9f6bb305c5a92acea",
  "experiencefigma": "3937cc3bcf16f74704d88ddd5db325cd966bf69e",
  "experiencedesign": "4ba10f18f6b51eb1121cf8b3364a0e1f67e09bfc",
  "experienceusability": "bee1537c8a8e9a4b056f13423812be4661663275",
}


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


def pipedrive_create_deals(client, job, person, data):
    cf_mapping = CUSTOM_FIELDS_MAP.copy()

    cf_data = {
        PIPEDRIVE_CUSTOM_FIELD_FALLBACK: '',
    }

    for k, v in data.items():
        if k in cf_mapping:
            cf_data[cf_mapping[k]] = v
        else:
            # in case form field was not found, keep it in special pd field
            cf_data[PIPEDRIVE_CUSTOM_FIELD_FALLBACK] += f'{k}: {v}\n'

    name = person.get('name', '')
    name = name or person.get('primary_email', '').split('@')[0]
    payload = {
        'title': f'{job} - {name}',
        'person_id': person['id'],
        **cf_data,
    }
    resp = client.deals.create_deal(payload)

    print(f"Deals {resp['data']['id']} was created")


def send_data_to_pipedrive(job, form_data):
    client = Client(domain='https://api.pipedrive.com')
    client.set_api_token(os.environ.get('PIPEDRIVE_TOKEN'))
    form_person = {
        'email': form_data.pop('email', ''),
        'name': form_data.pop('fullName', ''),
        PERSON_FIELDS_MAP['skype']: form_data.pop('skype', ''),
        PERSON_FIELDS_MAP['whatsapp']: form_data.pop('whatsapp', ''),
        PERSON_FIELDS_MAP['telegram']: form_data.pop('telegram', ''),
    }

    api_person = pipedrive_get_or_create_person(client, form_person)
    pipedrive_create_deals(client, job, api_person, form_data)


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

    # average time for longest path is about 1.5-2 s
    # in good circumstances (fast internet, pd works without delays)
    try:
        event_body.pop('ts', None)  # deals has its own ts
        send_data_to_pipedrive(job, event_body)
    except Exception as e:  # temporary catch all exceptions
        print(str(e))

    return {'status': 'ok'}

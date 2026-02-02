import os
from collections.abc import Mapping
from typing import Any, ClassVar, NotRequired, TypedDict

from pipedrive.client import Client


class Person(TypedDict):
    """
    https://developers.pipedrive.com/docs/api/v1/Persons
    """

    id: int
    name: NotRequired[str]
    primary_email: NotRequired[str]


class Deal(TypedDict):
    """
    https://developers.pipedrive.com/docs/api/v1/Deals
    """

    id: int


class PipedriveService:
    """
    Service for interacting with the Pipedrive API.
    """

    PERSON_FIELDS_MAP: ClassVar[Mapping[str, str]] = {
        'skype': '4717d3279137c308cc6aa9d67a48622ab596b7ae',
        'whatsapp': 'b117a397d11ea09aacbb47d98a5f371e8c2bc8c3',
        'telegram': '6ab6aa18532570c3f6799700ec3c9d7cca1e4d28',
    }

    DEAL_FIELDS_MAP: ClassVar[Mapping[str, str]] = {
        'city': 'f7731ae79d66ce127edafbea25acc23d741964d1',
        'country': '76d376013db86003c179c2cf97035dd001e6f578',
        'portfolio': 'bcc3e04c1f33c099e2ee03ad6b7f4e5789cc8f10',
        'education': '2322c3b704ededc65e25c65fc4fdef436b2d7a4a',
        'english': '6ffd54d9947c4a749d5794205c4457ab6a4c13fd',
        'lovedTasks': '8808eb21eb97c4de0e2124a0ebc2f51caa616daf',
        'unlovedTasks': '9d8ec5f27d6f04082e81b9e7742bb1b394ef752a',
        'experiencedjango': 'dda69ba4f52302a1ca0e5db4c3a2a7fea3f4fd5b',
        'experienceposition': 'b4dc419032b8de6f7f1d67c2c12ec2998200143b',
        'linuxCommands': '853591293300cce011d4549f92ea7cc8e54d8c35',
        'experiencedb': 'db5f0991b4f13b1ad3802274d9a764449564c9d0',
        'experiencetests': '17a9192a295f3a0dd3248a02729e190fa979b601',
        'experiencelinux': '59818648fcbc5a5b2552d09d25c67ebca0221cf2',
        'experiencerequirements': 'b5011e781a2e6a6eb4f04a1041fef86d13447173',
        'experiencefrontend': '32a1c8173da00a92cac9de5dde834ebb33a7f967',
        'experiencepython': '6e182fd384f109671c83cb631de95a2bd8fe711f',
        'specializedExperience': '273b41a8ee293c877ffe4dbb784451a16d429f95',
        'experiencephp': '3c6b10339c72dec10796ec6bcd7a28c5a99fdd56',
        'experiencewordpress': '6fce4f306ae12b0a25bc424e66649013d3d121ac',
        'experienceOverall': '9c59f474228e1d86dfb0219e77b0553e9d01b55f',
        'recommendedBy': '14379c7424c02e6c22109bbb364c0a29a7cd9692',
        'referrer': 'a97a50f0b9a4cb5386f687774370b951356669a2',
        'experiencerereact': 'e800164efb4ad750453a0ed100f1253c90dc0db9',
        'experiencejs': 'd845ea966017a800c33daf960ad25217da87f9bd',
        'experiencemarkup': '5319f706a4121961b69e80f9f6bb305c5a92acea',
        'experiencefigma': '3937cc3bcf16f74704d88ddd5db325cd966bf69e',
        'experiencedesign': '4ba10f18f6b51eb1121cf8b3364a0e1f67e09bfc',
        'experienceusability': 'bee1537c8a8e9a4b056f13423812be4661663275',
    }

    # In case a mapping for a form field was not found,
    # keep it in a special pd field
    CUSTOM_FIELD_FALLBACK: ClassVar[str] = '6244292b70f654e8adb467e7c4b6e417c59099a8'

    def __init__(self):
        self.client = Client(domain='https://api.pipedrive.com')
        self.client.set_api_token(os.environ.get('PIPEDRIVE_TOKEN'))

    def get_or_create_person(self, form_person: Mapping[str, str]) -> Person:
        """
        Return an existing person by email or create a new one.

        https://developers.pipedrive.com/docs/api/v1/Persons#searchPersons
        https://developers.pipedrive.com/docs/api/v1/Persons#addPerson
        """
        resp = self.client.persons.search_persons(
            {
                'term': form_person['email'],
                'exact_match': 1,
                'fields': 'email',
                'limit': 1,
            },
        )
        if len(resp['data']['items']):
            return resp['data']['items'][0]['item']
        resp = self.client.persons.create_person(form_person)
        return resp['data']

    def create_deal(
        self,
        job: str,
        person: Person,
        data: Mapping[str, Any],
    ) -> Deal:
        """
        Create a deal linked to the given person.

        https://developers.pipedrive.com/docs/api/v1/Deals#addDeal
        """
        cf_data = {
            self.CUSTOM_FIELD_FALLBACK: '',
        }

        for k, v in data.items():
            if k in self.DEAL_FIELDS_MAP:
                cf_data[self.DEAL_FIELDS_MAP[k]] = v
            else:
                cf_data[self.CUSTOM_FIELD_FALLBACK] += f'{k}: {v}\n'

        if not (name := person.get('name', '').strip()):
            name = (person.get('primary_email') or '').split('@')[0]
        payload = {
            'title': f'{job[:255]} - {name[:255]}',
            'person_id': person['id'],
            **cf_data,
        }
        resp = self.client.deals.create_deal(payload)
        return resp['data']

    def get_stage_name(self, stage_id: int) -> str:
        """
        Retrieve the name of a stage by its ID.
        """
        resp = self.client.stages.get_stage(stage_id)
        if resp.get('data'):
            return resp['data']['name']
        return f'stage {stage_id}'

    def create_deal_from_form_data(
        self,
        job: str,
        form_data: Mapping[str, Any],
    ) -> tuple[Deal, Person]:
        form_data = dict(form_data)
        form_person = {
            'email': form_data.pop('email', ''),
            'name': form_data.pop('fullName', ''),
            self.PERSON_FIELDS_MAP['skype']: form_data.pop('skype', ''),
            self.PERSON_FIELDS_MAP['whatsapp']: form_data.pop('whatsapp', ''),
            self.PERSON_FIELDS_MAP['telegram']: form_data.pop('telegram', ''),
        }
        person = self.get_or_create_person(form_person)
        deal = self.create_deal(job, person, form_data)
        return deal, person

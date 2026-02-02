import json
from collections.abc import Mapping
from html.parser import HTMLParser
from json import JSONDecodeError
from typing import Any

from core import settings
from core.pipedrive import PipedriveService
from core.slack import SlackService
from core.utils import error_response, success_response


class HTMLToText(HTMLParser):
    """HTMLParser subclass that extracts plain text content from HTML."""

    def __init__(self):
        super().__init__()
        self._parts: list[str] = []

    def handle_data(self, data: str):
        self._parts.append(data)

    def get_text(self) -> str:
        return ''.join(self._parts)


def strip_html(html: str) -> str:
    """
    Convert Pipedrive note HTML to plain text, preserving &nbsp;
    as non-breaking spaces.
    """
    # Step 1: &nbsp; -> dot character (&#8901; = ⋅) to preserve through HTML stripping
    text = html.replace('&nbsp;', '\u22c5')
    # Step 2: strip HTML tags
    parser = HTMLToText()
    parser.feed(text)
    text = parser.get_text()
    # Step 3: dot back to nbsp (non-breaking space)
    return text.replace('\u22c5', '\xa0')


def format_deal_link(deal_id: int | str, title: str) -> str:
    """
    Format a Pipedrive deal as a Slack mrkdwn link.
    """
    return f'<{settings.PIPEDRIVE_DEAL_URL}{deal_id}|{title}>'


def build_note_blocks(header_text: str, note_text: str) -> list[dict]:
    """
    Build Slack Block Kit sections: a header followed by note text chunked into
    code blocks.
    """
    blocks: list[dict] = [
        {
            'type': 'section',
            'text': {'type': 'mrkdwn', 'text': header_text},
        },
    ]
    for i in range(0, len(note_text), settings.SLACK_NOTE_CHUNK_SIZE):
        chunk = note_text[i : i + settings.SLACK_NOTE_CHUNK_SIZE]
        blocks.append(
            {
                'type': 'section',
                'text': {'type': 'mrkdwn', 'text': f'```{chunk}```'},
            }
        )
    return blocks


def handle_note(payload: dict, slack: SlackService, pipedrive: PipedriveService):
    """
    Post a Slack notification when a note is added or updated on a deal.
    """
    data = payload['data']
    meta = payload['meta']

    deal_id = data.get('deal_id')
    if not deal_id:
        return

    deal_title = pipedrive.get_deal_title(deal_id)
    user_name = pipedrive.get_user_name(data['user_id'])

    action = 'updated' if meta['action'] == 'update' else 'added'
    deal_link = format_deal_link(deal_id, deal_title)

    note_html = data.get('content', '')
    note_text = strip_html(note_html)

    header = f'Note was {action} for {deal_link} by {user_name}'
    blocks = build_note_blocks(header, note_text)

    fallback = f'{user_name} {action} a note in {format_deal_link(deal_id, deal_title)} deal.\n'
    slack.post_message(text=fallback, blocks=blocks)


def handle_deal_lost(payload: dict, slack: SlackService):
    """
    Post a Slack notification when a deal is marked as lost, including the
    reason if provided.
    """
    data = payload['data']
    link = format_deal_link(data['id'], data['title'])
    lost_reason = data.get('lost_reason')
    reason_part = f'Reason: {lost_reason}. ' if lost_reason else ''
    text = f'Deal {link} was lost. {reason_part}'
    slack.post_message(text=text)


def handle_deal_won(payload: dict, slack: SlackService):
    """
    Post a Slack notification when a deal is marked as won.
    """
    data = payload['data']
    link = format_deal_link(data['id'], data['title'])
    text = f'Deal {link} won!!! :fireworks:'
    slack.post_message(text=text)


def handle_stage_changed(payload: dict, slack: SlackService, pipedrive: PipedriveService):
    """
    Post a Slack notification when a deal moves to a different pipeline stage.
    """
    data = payload['data']
    stage_name = pipedrive.get_stage_name(data['stage_id'])
    link = format_deal_link(data['id'], data['title'])
    text = f'Deal {link} moved to {stage_name}'
    slack.post_message(text=text)


def handler(
    event: Mapping[str, Any],
    context,  # noqa: ARG001
) -> dict:
    """
    Handle Pipedrive webhook events and post notifications to Slack.
    """
    try:
        payload = json.loads(event['body'])
    except (KeyError, JSONDecodeError):
        return error_response(event, 'Malformed webhook payload.')

    slack = SlackService()
    pipedrive = PipedriveService()

    curr_data = payload.get('data') or {}
    curr_status = curr_data.get('status') or ''
    curr_stage = curr_data.get('stage_id') or ''

    prev_data = payload.get('previous') or {}
    prev_status = prev_data.get('status') or ''
    prev_stage = prev_data.get('stage_id') or ''

    meta = payload.get('meta') or {}
    event_type = f'{meta.get("action")}.{meta.get("entity")}'
    match event_type:
        case 'added.note' | 'updated.note':
            handle_note(payload, slack, pipedrive)
        case 'updated.deal' if curr_status == 'lost' and prev_status != 'lost':
            handle_deal_lost(payload, slack)
        case 'updated.deal' if curr_status == 'won' and prev_status != 'won':
            handle_deal_won(payload, slack)
        case 'updated.deal' if curr_stage != prev_stage and prev_stage:
            handle_stage_changed(payload, slack, pipedrive)

    return success_response('How did it go?')

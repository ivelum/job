import os

from core import settings
from slack_sdk import WebClient


class SlackService:
    def __init__(self):
        self.client = WebClient(token=os.environ.get('SLACK_BOT_TOKEN'))
        self.default_channel = settings.SLACK_CHANNEL

    def post_message(
        self,
        text: str,
        blocks: list | None = None,
        channel: str | None = None,
    ):
        self.client.chat_postMessage(
            channel=channel or self.default_channel,
            text=text,
            blocks=blocks,
            username='iVelum Job',
        )

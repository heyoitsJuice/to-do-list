# import sys
# import logging
# import os
# from slack_sdk import WebClient
# from slack_sdk.errors import SlackApiError


# client = WebClient(token=os.environ.get("SLACK_BOT_TOKEN"))
# logger = logging.getLogger(__name__)


# channel_id = "C01ASB1ABDX"
# SLACK_BOT_TOKEN = "xoxb-1366373959921-2400084852627-9NIuJmoILLntCIzxx1W9zvZm"

# try:
#     result = client.chat_postMessage(
#         channel=channel_id,
#         thread_ts=message_ts,
#         text
#     )
import os
import schedule
import time
import logging
from slack.web.client import WebClient
from slack.errors import SlackApiError
from token import slack_token

logging.basicConfig(level=logging.DEBUG)

def sendMessage(slack_client, msg):
  # make the POST request through the python slack client
  

  # check if the request was a success
  try:
    slack_client.chat_postMessage(
      channel='#officehours',
      text=msg
    )#.get()
  except SlackApiError as e:
    logging.error('Request to Slack API Failed: {}.'.format(e.response.status_code))
    logging.error(e.response)

if __name__ == "__main__":
  SLACK_BOT_TOKEN = os.environ[slack_token]
  slack_client = WebClient(SLACK_BOT_TOKEN)
  logging.debug("authorized slack client")

  # # For testing
  msg = "@channel Office Hours"
  # schedule.every(60).seconds.do(lambda: sendMessage(slack_client, msg))

  schedule.every().tuesday.at("11:00").do(lambda: sendMessage(slack_client, msg))
  schedule.every().thursday.at("11:00").do(lambda: sendMessage(slack_client, msg))
  schedule.every().tuesday.at("9:00").do(lambda: sendMessage(slack_client, msg))


  logging.info("entering loop")

  while True:
    schedule.run_pending()
    time.sleep(5) # sleep for 5 seconds between checks on the scheduler

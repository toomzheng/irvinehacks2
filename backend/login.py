import os
import agentql
from playwright.sync_api import sync_playwright
from pyairtable import Api
from dotenv import load_dotenv
import json
from openai import OpenAI
import typing_extensions as typing
from typing import TypedDict, List, Optional

# Load environment variables from .env file
load_dotenv()

# Get USER_NAME and PASSWORD from environment variables
USER_NAME = os.getenv("EMAIL")
PASSWORD = os.getenv("PASSWORD")
os.environ["AGENTQL_API_KEY"] = os.getenv("AGENTQL_API_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

def login():
    INITIAL_URL = "https://lookups.melissa.com/home/npo/"
    SIGN_IN_QUERY = """
    {
        sign_in_button
    }
    """
    EMAIL_AND_PASSWORD_QUERY = """
    {
        login_form{
            email_input
            password_input
            sign_in_btn
        }
    }
    """

    with sync_playwright() as playwright, playwright.chromium.launch(
        headless=False
    ) as browser:
        page = agentql.wrap(browser.new_page())
        page.goto(INITIAL_URL)

        # Click "Log In" button
        response = page.query_elements(SIGN_IN_QUERY)
        response.sign_in_button.click()
        page.wait_for_timeout(100)

        # Fill username & password
        response = page.query_elements(EMAIL_AND_PASSWORD_QUERY, mode="fast")
        response.login_form.email_input.fill(USER_NAME)
        response.login_form.password_input.fill(PASSWORD)
        response.login_form.sign_in_btn.click()

        page.wait_for_timeout(1000)
        page.wait_for_page_ready_state()

        # Save session state to file
        browser.contexts[0].storage_state(path="state.json")

        # Wait some extra time if needed
        page.wait_for_timeout(3000)


login()

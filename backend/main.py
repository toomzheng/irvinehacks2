# scraping_code.py

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
PERPLEXITY_API_KEY = os.getenv("PERPLEXITY_API_KEY")


class NonprofitRecommendation(TypedDict):
    name: str  # Name of the nonprofit
    description: str  # Brief description of relevance
    address: str  # Address from JSON
    website: str  # Website URL or "N/A"


# scraping_code.py


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


URL = "https://lookups.melissa.com/home/npo/"

NON_PROFIT_QUERY = """
{
    nonprofit[]{
        org_name
        address
    }
}
"""


def nonprofits(zip_code, interest=""):
    """
    Logs in (if needed) and scrapes nonprofit data for a given zip code from melissa.com.
    Uses Perplexity AI for recommendations, then structures the output using Gemini.
    Returns a list of structured nonprofit recommendations.
    """
    ZIP_CODE_QUERY = """
    {
        ZIP_code_input
        submit_btn
    }
    """

    zip_string = str(zip_code)
    perplexity_response = ""

    with sync_playwright() as playwright, playwright.chromium.launch(
        headless=True
    ) as browser:
        # If login state doesn't exist, do a fresh login
        if not os.path.exists("state.json"):
            print("No login state found, logging in...")
            login()

        # Reuse the stored login session
        context = browser.new_context(storage_state="state.json")
        page = agentql.wrap(context.new_page())

        page.goto(URL)

        page.wait_for_timeout(10)
        # Fill ZIP code & submit
        response = page.query_elements(ZIP_CODE_QUERY)
        response.ZIP_code_input.fill(zip_string)
        response.submit_btn.click()

        page.wait_for_timeout(10)

        # Scrape nonprofit data
        nonprofit_response = page.query_elements(NON_PROFIT_QUERY, mode="fast")
        nonprofit_data = nonprofit_response.nonprofit.to_data()

        # Debug: Print the scraped nonprofit data
        print("\nScraped Nonprofit Data:")
        print(json.dumps(nonprofit_data, indent=2))
        print("\nNumber of nonprofits found:", len(nonprofit_data))

    # Get recommendations from Perplexity
    client = OpenAI(
        api_key=PERPLEXITY_API_KEY,
        base_url="https://api.perplexity.ai",
    )

    nonprofits_string = json.dumps(nonprofit_data, indent=2)

    response_stream = client.chat.completions.create(
        model="sonar-pro",
        messages=[
            {
                "role": "system",
                "content": """IMPORTANT RULES:
1. ONLY recommend nonprofits that are EXPLICITLY listed in the provided JSON data
2. DO NOT make up or suggest nonprofits that are not in the JSON data
3. ONLY USE WEB SEARCH FOR LISTED NONPROFITS IN THE JSON DATA. IF FOUND, OUTPUT THESE WEBSITES ONLY. IF AN OUTPUTTED NONPROFIT DOES NOT HAVE A WEBSITE, WRITE OUT 'N/A'
4. ALWAYS provide recommendations from the available nonprofits, even if they're not perfect matches
5. ONLY SUGGEST 4 OF THE MOST RELEVANT NONPROFITS. If the nonprofits aren't exactly what the user is looking for, suggest them as alternative options that could still be valuable related to their interests
6. NEVER say you couldn't find relevant nonprofits - instead, suggest the closest matches and explain how they could be helpful
7. Include the exact organization name from the JSON data
8. ALWAYS BE POSITIVE IN YOUR RESPONSES AND BE CERTAIN IN YOUR STATEMENTS, DONT USE WORDS LIKE PROBABLY OR LIKELY. BE SPECIFIC AND NICHE ABOUT HOW THIS CAN CHANGE THE COMMUNITY.
9. SEARCH FOR SEOMTHING THEY'VE DONE RECENTLY. ONLY SEARCH THE WEB FOR THINGS RELATED TO THE NON-PROFITS PROVIDED IN THE JSON.

YOUR OUTPUT MUST BE IN THIS EXACT FORMAT:
[
  {
    "name": "[EXACT NAME FROM JSON]",
    "description": "[Brief explanation of relevance]",
    "website": "[URL or N/A]",
    "address": "[EXACT ADDRESS FROM JSON]"
  }
]

DO NOT include any text outside of this JSON structure.
---""",
            },
            {
                "role": "user",
                "content": f"List nonprofits relevant to {interest}:\n\n{nonprofits_string}",
            },
        ],
        stream=True,
    )

    # Collect the chunks from the streaming response
    perplexity_response = ""
    for chunk in response_stream:
        if chunk.choices[0].delta.content is not None:
            perplexity_response += chunk.choices[0].delta.content

    print("\nRaw Perplexity Response:", perplexity_response)  # Debug print

    # Parse the response as JSON
    try:
        parsed_response = json.loads(perplexity_response)
        print("\nParsed Response Type:", type(parsed_response))
        print("Parsed Response:", json.dumps(parsed_response, indent=2))
        # Return the parsed Python list directly
        return parsed_response
    except json.JSONDecodeError as e:
        print("Error parsing JSON:", e)
        print("Raw response:", perplexity_response)
        return []  # Return empty Python list

    # print("Perplexity Response:", perplexity_response)  # Debug log

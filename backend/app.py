# app.py
from fastapi import FastAPI
from typing import List
from pydantic import BaseModel
from main import nonprofits
import logging

# Set up debug logging
logging.basicConfig(level=logging.DEBUG)


class NonprofitRecommendation(BaseModel):
    name: str
    description: str
    address: str
    website: str


app = FastAPI(
    title="Nonprofit Search API",
    description="API to search for nonprofits by ZIP code and interest area",
    version="1.0.0",
)


@app.get("/")
def read_root():
    """
    Root endpoint that provides basic API information.
    """
    return {
        "message": "Welcome to the Nonprofit Search API",
        "endpoints": {
            "/nonprofits/{zip_code}": "Get nonprofit recommendations for a specific ZIP code and interest"
        },
    }


@app.get("/nonprofits/{zip_code}", response_model=List[NonprofitRecommendation])
def get_nonprofits(zip_code: int, interest: str = ""):
    """
    Get nonprofit recommendations for a specific ZIP code and interest area.

    Args:
        zip_code (int): The ZIP code to search for nonprofits
        interest (str): The type of nonprofits you're interested in (e.g., "education", "environment")

    Returns:
        List[NonprofitRecommendation]: A list of nonprofit recommendations with details
    """
    logging.debug(
        f"Received request for nonprofits in {zip_code} with interest {interest}"
    )
    result = nonprofits(zip_code, interest)
    logging.debug(f"Received result from nonprofits function: {result}")
    # Convert each dict to a NonprofitRecommendation model
    return [NonprofitRecommendation(**item) for item in result]

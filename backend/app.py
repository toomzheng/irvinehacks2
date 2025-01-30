# app.py
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
from main import nonprofits
import logging
import uvicorn

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

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
async def get_nonprofits(zip_code: int, interest: str = ""):
    """
    Get nonprofit recommendations for a specific ZIP code and interest area.

    Args:
        zip_code (int): The ZIP code to search for nonprofits
        interest (str): The type of nonprofits you're interested in (e.g., "education", "environment")

    Returns:
        List[NonprofitRecommendation]: A list of nonprofit recommendations with details
    """
    try:
        logging.debug(f"Received request for zip_code={zip_code}, interest={interest}")
        results = nonprofits(zip_code, interest)
        if not results:
            raise HTTPException(status_code=404, detail="No nonprofits found for the given criteria")
        return results
    except Exception as e:
        logging.error(f"Error processing request: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    uvicorn.run(app, host="0.0.0.0", port=port)

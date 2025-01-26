import requests
import json
import re


def is_valid_zip(zip_code):
    """Validate if the input is a valid 5-digit ZIP code"""
    return bool(re.match(r"^\d{5}$", zip_code))


def get_nonprofits(zip_code, interest):
    """Fetch nonprofit data for a given ZIP code and interest"""
    base_url = "http://localhost:8000"

    try:
        response = requests.get(
            f"{base_url}/nonprofits/{zip_code}", params={"interest": interest}
        )
        if response.status_code == 200:
            return response.json()["result"]
        else:
            return f"Error: API returned status code {response.status_code}"
    except requests.exceptions.ConnectionError:
        return (
            "Error: Could not connect to the API. Make sure the API server is running."
        )
    except Exception as e:
        return f"Error: {str(e)}"


def main():
    print("Welcome to the Nonprofit Search Tool!")
    print("This tool helps you find nonprofits based on your location and interests.")

    while True:
        # Get ZIP code from user
        zip_code = input("\nEnter a 5-digit ZIP code (or 'quit' to exit): ").strip()

        # Check for exit command
        if zip_code.lower() in ["quit", "q", "exit"]:
            print("Thank you for using the Nonprofit Search Tool!")
            break

        # Validate ZIP code
        if not is_valid_zip(zip_code):
            print("❌ Please enter a valid 5-digit ZIP code.")
            continue

        # Get interest from user
        interest = input(
            "\nWhat type of nonprofits are you interested in? (e.g., 'education', 'environment', 'healthcare'): "
        ).strip()

        # Fetch and display results
        print(
            f"\nFetching nonprofit data for ZIP code {zip_code} related to '{interest}'..."
        )
        result = get_nonprofits(zip_code, interest)
        print(result)


if __name__ == "__main__":
    main()

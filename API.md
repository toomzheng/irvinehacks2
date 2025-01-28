# Nonprofit Matcher API Documentation

## Overview
The Nonprofit Matcher API helps you find relevant nonprofits in a specific area based on interests or causes. It uses AI to analyze and match nonprofits with your specified interests.

## Base URL
```
https://1baf-128-195-97-44.ngrok-free.app
```

## Endpoints

### Get Nonprofit Recommendations
Returns a list of nonprofit organizations that match the specified location and interest.

#### HTTP Request
```http
GET /nonprofits/{zipCode}?interest={interest}
```

#### Path Parameters
| Parameter | Type   | Required | Description                          |
|-----------|--------|----------|--------------------------------------|
| zipCode   | string | Yes      | 5-digit US postal code              |

#### Query Parameters
| Parameter | Type   | Required | Description                                    |
|-----------|--------|----------|------------------------------------------------|
| interest  | string | Yes      | Type of nonprofit or area of interest          |

#### Example Request
```http
GET /nonprofits/92617?interest=Food%20banks
```

#### Response Format
```typescript
interface NonprofitRecommendation {
    name: string;        // Name of the nonprofit
    description: string; // Brief description of relevance
    address: string;     // Physical address
    website: string;     // Website URL or "N/A"
}
```

#### Example Response
```json
[
    {
        "name": "Second Harvest Food Bank",
        "description": "A local food bank providing meals to families in need through community partnerships and food distribution programs.",
        "address": "8014 Marine Way, Irvine, CA 92618",
        "website": "https://www.feedoc.org"
    },
    {
        "name": "Community Food Bank Network",
        "description": "Grassroots organization focusing on food security and nutrition education in local communities.",
        "address": "123 Main St, Irvine, CA 92617",
        "website": "https://www.communityfoodbank.org"
    }
]
```

#### Status Codes
| Status Code | Description                                           |
|-------------|-------------------------------------------------------|
| 200         | Success                                               |
| 400         | Bad Request - Missing required parameters             |
| 500         | Server Error - Failed to fetch or process nonprofits  |

#### Error Response
```json
{
    "error": "Error message description"
}
```

## Usage Tips
1. **Zip Code Format**: Ensure the zip code is a valid 5-digit US postal code
2. **Interest Suggestions**:
   - Food banks and meal services
   - Youth mentoring programs
   - Environmental conservation
   - Animal shelters and rescue
   - Senior care and companionship
   - Homeless shelter support
   - Educational tutoring
   - Community gardens
   - Mental health support
   - Disaster relief

## Rate Limiting
Please be mindful of API usage and implement appropriate rate limiting in your applications.

## Example Usage

### JavaScript/TypeScript
```typescript
async function getNonprofits(zipCode: string, interest: string) {
    try {
        const response = await fetch(
            `https://1baf-128-195-97-44.ngrok-free.app/nonprofits/${zipCode}?interest=${encodeURIComponent(interest)}`
        );
        
        if (!response.ok) {
            throw new Error('Failed to fetch nonprofits');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

### Python
```python
import requests

def get_nonprofits(zip_code: str, interest: str) -> list:
    url = f"https://1baf-128-195-97-44.ngrok-free.app/nonprofits/{zip_code}"
    params = {"interest": interest}
    
    response = requests.get(url, params=params)
    response.raise_for_status()
    
    return response.json()
```

## Support
For API support or questions, please open an issue in the GitHub repository.

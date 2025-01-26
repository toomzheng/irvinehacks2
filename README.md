# Unity Nonprofits 

A platform connecting people with local nonprofits based on their interests and location, making community involvement more accessible than ever.

## Quick Start 

### Prerequisites
- Node.js (v18 or higher)
- Python 3.8+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/unity-nonprofits.git
cd unity-nonprofits
```

2. Install frontend dependencies:
```bash
cd irvinehacks2
npm install
# or
yarn install
```

3. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

4. Set up environment variables:
- Create a `.env` file in the backend directory
- Add required environment variables:
```env
AGENTQL_API_KEY=your_agentql_key
MELISSA_API_KEY=your_melissa_key
```

5. Start the development servers:

Frontend:
```bash
npm run dev
# or
yarn dev
```

Backend:
```bash
cd backend
ngrok http 8000
uvicorn app:app --reload
python login.py
```

## Project Overview 

### Inspiration
On the way to Seaside in an Uber car, our retired driver's wish to give back more to his community inspired this project. His words, "I wish I could've done more work for my own community," sparked our mission to make community involvement more accessible.

### What it does 

Unity Nonprofits helps users:
- Find local nonprofits based on zip code and interests
- Save favorite organizations
- Get instant access to nonprofit information
- Connect with community service opportunities

### Technical Stack 

Frontend:
- Next.js with TypeScript
- TailwindCSS for styling
- Session storage for state management

Backend:
- FastAPI (Python)
- Melissa API integration
- Playwright with AgentQL for data scraping
- nGrok for API tunneling

### Features 

- Zip code-based nonprofit search
- Interest-based filtering
- Favorite organization saving
- Real-time nonprofit information
- Interactive loading screen with LeBron James highlights

## Future Development 

- User authentication system
- Enhanced API efficiency
- Community blog platform
- Event organization features
- Review system for nonprofit experiences

## Contributing 

We welcome contributions! Please feel free to submit a Pull Request.


## Acknowledgments 

- Melissa API for nonprofit data
- AgentQL for reliable web scraping
- Our Uber driver for the inspiration
- IrvineHacks 2025 for the opportunity

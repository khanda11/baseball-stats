Chin Music
Chin Music is an interactive web application designed for baseball enthusiasts to explore, predict, and play with MLB statistics. The app provides a comprehensive platform for engaging with historical and predicted player statistics, learning about MLB stat leaders, and testing knowledge with fun games.

Table of Contents
Features
Installation
Backend Overview
Frontend Overview
Games and Interactive Features
Usage
Technologies Used
Contributing
License
Features
AI-Driven Predictions: Leverage AI models to predict future performance based on historical data.
Interactive Stats Exploration: Rediscover MLB stat leaders with powerful search and filtering tools.
Guess the Player Game: Test your knowledge of MLB stat leaders with a fun, interactive guessing game.
Historical Data Integration: Data sourced directly from MLB's API, stored in a PostgreSQL database.
Installation
Prerequisites
Node.js and npm
Python 3.x
PostgreSQL
Virtualenv (or another virtual environment tool)
Backend Setup
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/chin-music.git
cd chin-music/backend
Create and activate a virtual environment:

bash
Copy code
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
Install backend dependencies:

bash
Copy code
pip install -r requirements.txt
Set up the PostgreSQL database and apply migrations:

bash
Copy code
python manage.py makemigrations
python manage.py migrate
Populate the database with data from MLB's API:

bash
Copy code
python manage.py fetch_mlb_data
Start the backend server:

bash
Copy code
python manage.py runserver
Frontend Setup
Navigate to the frontend directory:

bash
Copy code
cd ../frontend
Install frontend dependencies:

bash
Copy code
npm install
Start the frontend server:

bash
Copy code
npm start
Backend Overview
The backend of Chin Music is built with Django and integrates with a PostgreSQL database. It includes an AI component that uses machine learning models to analyze historical MLB data and predict future player performances.

Database: PostgreSQL is used to store historical MLB statistics, fetched and populated using MLB's API.
AI Component: The backend includes a machine learning model that forecasts player statistics based on historical data. This model is continuously updated with new data for accurate predictions.
Frontend Overview
The frontend is developed using React and Material-UI, providing an interactive and user-friendly experience. It includes several components to display data and manage user interactions, including:

Interactive Stats Section: Allows users to filter and explore historical MLB data. Users can generate comparison graphs to see how past players stack up against modern talent.
Guess the Player Game: A trivia game where users guess the player based on their league-leading stats and season. The game offers hints but penalizes incorrect answers with strikes.
Stat Predictions: Displays historical and predicted data with color differentiation, helping users visualize trends and future performance estimates.
Games and Interactive Features
Guess the Player
Description: Test your knowledge of your favorite childhood players! Each player in this game was a leader of a specific stat for a season in the last 50 years.
How to Play:
Guess the player based on their leading stat and season.
You have 3 strikes. Use them wisely!
Hints are available but come at the cost of a strike.
Interactive Stats
Description: Explore the top performers across various stats throughout MLB history.
Features:
Filter players by stats, teams, and seasons.
Generate comparison graphs to visualize player performances across eras.
Usage
Explore Historical Data: Navigate to the "Interactive Stats" section to explore and filter historical MLB data.
Play the Game: Visit the "Guess the Player Game" section to test your knowledge of MLB stat leaders.
View Predictions: Go to the "Stat Predictions" section to see AI-driven predictions of future player performances.
Technologies Used
Frontend: React, Material-UI
Backend: Django, Django REST Framework
Database: PostgreSQL
AI/ML: Scikit-Learn, Pandas, NumPy
APIs: MLB API
Contributing
We welcome contributions to Chin Music! If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

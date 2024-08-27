Chin Music is an interactive web application designed for baseball enthusiasts to explore, predict, and play with MLB statistics. The app provides a comprehensive platform for engaging with historical and predicted player statistics, learning about MLB stat leaders, and testing knowledge with fun games.


## Demo

[![Watch the demo](https://www.loom.com/share/c02ab1f0d0f0430a8d42c1f2f46651f4?t=0)

Click the image above to watch the demo of the "Chin Music" app!


AI-Driven Predictions: Leverage AI models to predict future performance based on historical data.
Interactive Stats Exploration: Rediscover MLB stat leaders with powerful search and filtering tools.
Guess the Player Game: Test your knowledge of MLB stat leaders with a fun, interactive guessing game.

Historical Data Integration: Data sourced directly from MLB's API, stored in a PostgreSQL database.


BACKEND OVERVIEW

The backend of Chin Music is built with Django and integrates with a PostgreSQL database. It includes an AI component that uses machine learning models to analyze historical MLB data and predict future player performances.

Database: PostgreSQL is used to store historical MLB statistics, fetched and populated using MLB's API.

AI Component: The backend includes a machine learning model that forecasts player statistics based on historical data. This model is continuously updated with new data for accurate predictions.

FRONTEND OVERVIEW

The frontend is developed using React and Material-UI, providing an interactive and user-friendly experience. It includes several components to display data and manage user interactions, including:

Interactive Stats Section: Allows users to filter and explore historical MLB data. Users can generate comparison graphs to see how past players stack up against modern talent.

Guess the Player Game: A trivia game where users guess the player based on their league-leading stats and season. The game offers hints but penalizes incorrect answers with strikes.

Stat Predictions: Displays historical and predicted data with color differentiation, helping users visualize trends and future performance estimates.

GAMES AND INTERACTIVE FEATURES

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


TECHNOLOGIES USED

Frontend: React, Material-UI
Backend: Django, Django REST Framework
Database: PostgreSQL
AI/ML: Scikit-Learn, Pandas, NumPy
APIs: MLB API


import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import logo from '../assets/Chin Music-.png'; 

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="logo-container">
        <img src={logo} alt="Chin Music Logo" className="logo" />
      </div>
      <div className="button-container">
        <div className="button-box">
          <Link to="/interactive-player" className="homepage-link">Interactive Player Stats</Link>
          <p className="description">Dive deep into your baseball fandom and interact with league superstars from your childhood! Explore detailed stats of top MLB players over the past decade. Compare players head-to-head, filter stats by year, team, and category, and dive deep into the data that makes the game exciting.</p>
        </div>
        <div className="button-box">
          <Link to="/guess-the-player" className="homepage-link">Guess the Player Game</Link>
          <p className="description">Test your baseball knowledge with our daily trivia game. You'll be given a stat leader's key stat and the year they led. Can you guess who it is? Be careful though—every wrong guess and hint costs you a strike!</p>
        </div>
        <div className="button-box">
          <Link to="/stat-prediction" className="homepage-link">AI Prediction Model</Link>
          <p className="description">Explore generated future stats of top players based on historical data! Use our AI-powered predictions to see how the future leaders for every stat might perform in the next 15 years.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

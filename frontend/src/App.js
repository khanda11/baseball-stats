import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage.js';
import StatLeaders from './components/StatLeaders';
import GuessThePlayer from './components/GuessThePlayer';
import PlayerComparison from './components/PlayerComparison.js';
import StatPrediction from './components/StatPrediction'; // Import the new component
import './App.css';
import logo from './assets/Chin Music_transparent-.png'; // Ensure correct path to the logo

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <Link to="/">
            <img src={logo} alt="Chin Music Logo" className="header-logo" />
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/interactive-player" element={<StatLeaders />} />
          <Route path="/guess-the-player" element={<GuessThePlayer />} />
          <Route path="/player-comparison" element={<PlayerComparison />} />
          <Route path="/stat-prediction" element={<StatPrediction statCategory="HomeRuns" />} /> {/* Example route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

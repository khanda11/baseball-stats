import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StatLeaders from './components/StatLeaders';
import GuessThePlayer from './components/GuessThePlayer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to MLB Stats</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Guess the Player</Link>
              </li>
              <li>
                <Link to="/stat-leaders">Stat Leaders</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<GuessThePlayer />} />
            <Route path="/stat-leaders" element={<StatLeaders />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

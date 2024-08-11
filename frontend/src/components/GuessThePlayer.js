import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './GuessThePlayer.css'; 

const GuessThePlayer = () => {
  const [player, setPlayer] = useState(null);
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState(null);
  const [strikes, setStrikes] = useState(0);
  const [revealTeam, setRevealTeam] = useState(false);
  const [revealStatValue, setRevealStatValue] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const navigate = useNavigate(); 

  useEffect(() => {
    fetchPlayer();
  }, []);

  const fetchPlayer = async () => {
    try {
      const response = await axios.get('/api/random-stat-leader/');
      setPlayer(response.data);
    } catch (error) {
      console.error('Error fetching player:', error);
    }
  };

  const handleGuess = async () => {
    if (strikes < 3) {
      try {
        const response = await axios.get(`/api/check-guess/?id=${player.id}&guess=${guess}`);
        if (response.data.correct) {
          setResult('Correct!');
          setGameOver(true);
        } else {
          setStrikes(prevStrikes => {
            const newStrikes = prevStrikes + 1;
            if (newStrikes >= 3) {
              setGameOver(true);
              setResult(`Incorrect! Strikes: ${newStrikes}.`);
            }
            return newStrikes;
          });
        }
      } catch (error) {
        console.error('Error checking guess:', error);
      }
    }
  };

  const handleRevealTeam = () => {
    if (!revealTeam && strikes < 3) {
      setRevealTeam(true);
      setStrikes(prevStrikes => {
        const newStrikes = prevStrikes + 1;
        if (newStrikes >= 3) {
          setGameOver(true);
          setResult(`Strikes: ${newStrikes}.`);
        }
        return newStrikes;
      });
    }
  };

  const handleRevealStatValue = () => {
    if (!revealStatValue && strikes < 3) {
      setRevealStatValue(true);
      setStrikes(prevStrikes => {
        const newStrikes = prevStrikes + 1;
        if (newStrikes >= 3) {
          setGameOver(true);
          setResult(`Strikes: ${newStrikes}.`);
        }
        return newStrikes;
      });
    }
  };

  const restartGame = () => {
    setGuess('');
    setResult(null);
    setStrikes(0);
    setRevealTeam(false);
    setRevealStatValue(false);
    setGameOver(false);
    fetchPlayer();
  };

  const handleNavigate = () => {
    navigate('/stat-leaders');
  };

  return (
    <div className="guess-the-player-container">
      <h2>Guess the Player</h2>
      {player && (
        <div className="player-info">
          <p>Stat Category: {player.stat_category}</p>
          <p>Season: {player.season}</p>
          {revealTeam && <p>Team: {player.team}</p>}
          {revealStatValue && <p>Stat Value: {player.stat_value}</p>}
          <p>Strikes: {strikes}</p>
          {gameOver && <p>Player Name: {player.name}</p>}
        </div>
      )}
      {!gameOver && (
        <>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter player name"
            className="guess-input"
            disabled={gameOver}
          />
          <div className="button-group">
            <button onClick={handleGuess} className="guess-button" disabled={gameOver}>Submit Guess</button>
            <button onClick={handleRevealTeam} className="reveal-button" disabled={revealTeam || strikes >= 3}>Reveal Team</button>
            <button onClick={handleRevealStatValue} className="reveal-button" disabled={revealStatValue || strikes >= 3}>Reveal Stat Value</button>
          </div>
        </>
      )}
      {result && <p className="result-message">{result}</p>}
      {gameOver && (
        <div className="button-group">
          <button onClick={restartGame} className="restart-button">Restart Game</button>
          <button onClick={handleNavigate} className="navigate-button">View Stat Leaders</button>
        </div>
      )}
    </div>
  );
};

export default GuessThePlayer;

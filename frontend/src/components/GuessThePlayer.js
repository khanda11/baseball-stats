import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Box, Button, Typography } from '@mui/material';
import './GuessThePlayer.css';

const GuessThePlayer = () => {
  const [player, setPlayer] = useState(null);
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState(null);
  const [strikes, setStrikes] = useState(0);
  const [revealTeam, setRevealTeam] = useState(false);
  const [revealStatValue, setRevealStatValue] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showRules, setShowRules] = useState(true);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [animateStrike, setAnimateStrike] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Event listener for Enter key to submit guess
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !gameOver) {
        handleGuess();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Clean up function to remove the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameOver, guess]); // Effect re-runs if 'gameOver' or 'guess' changes

  useEffect(() => {
    // Fetch player ONLY on initial load and when the game is restarted
    if (!gameOver) {
      fetchPlayer();
    }
  }, [gameOver]);

  const fetchPlayer = async () => {
    try {
      const response = await axios.get('/api/random-stat-leader/');
      setPlayer(response.data);
      setCorrectAnswer(response.data.name); // Store the correct players name
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
          setStrikes((prevStrikes) => {
            const newStrikes = prevStrikes + 1;
            triggerStrikeAnimation();
            if (newStrikes >= 3) {
              setGameOver(true);
              setResult(`Incorrect! The correct answer was ${correctAnswer}.`);
            }
            return newStrikes;
          });
        }
        setGuess('');
      } catch (error) {
        console.error('Error checking guess:', error);
      }
    }
  };

  const handleRevealTeam = () => {
    if (!revealTeam && strikes < 3) {
      setRevealTeam(true);
      addStrike();
    }
  };

  const handleRevealStatValue = () => {
    if (!revealStatValue && strikes < 3) {
      setRevealStatValue(true);
      addStrike();
    }
  };

  const addStrike = () => {
    setStrikes((prevStrikes) => {
      const newStrikes = prevStrikes + 1;
      triggerStrikeAnimation();
      if (newStrikes >= 3) {
        setGameOver(true);
        setResult(`Strikes: ${newStrikes}. The correct answer was ${correctAnswer}.`);
      }
      return newStrikes;
    });
  };

  const triggerStrikeAnimation = () => {
    setAnimateStrike(true);
    setTimeout(() => setAnimateStrike(false), 500);
  };

  const restartGame = () => {
    setGuess('');
    setResult(null);
    setStrikes(0);
    setRevealTeam(false);
    setRevealStatValue(false);
    setGameOver(false);
    setPlayer(null);  // Clear the current player before fetching a new one
    fetchPlayer(); 
  };

  const handleNavigate = () => {
    navigate('/interactive-player');
  };

  const handleCloseRules = () => {
    setShowRules(false);
  };

  return (
    <div className="guess-the-player-container">
      <h2>Guess the Player</h2>
      <Button
        onClick={() => setShowRules(true)}
        variant="contained"
        style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#d97e3b', color: 'white' }}
      >
        Show Rules
      </Button>

      {player && (
        <div className="player-info-box">
          <div className="stat-info">
            <div className="stat-group">
              <p><strong>While MLB Player led the league in</strong> {player.stat_category}</p>
              <p><strong>Season:</strong> {player.season}</p>
              {revealTeam && <p><strong>Team:</strong> {player.team}</p>}
              {revealStatValue && <p><strong>Stat Value:</strong> {player.stat_value}</p>}
            </div>
          </div>

          {result && (
            <div className="result-section">
              <p className="result-message">{result}</p>
            </div>
          )}
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
            {!revealTeam && (
              <button onClick={handleRevealTeam} className="reveal-button" disabled={strikes >= 3}>Reveal Team</button>
            )}
            {!revealStatValue && (
              <button onClick={handleRevealStatValue} className="reveal-button" disabled={strikes >= 3}>Reveal Stat Value</button>
            )}
          </div>
        </>
      )}

      <div className={`strikes-count ${animateStrike ? 'animate-strike' : ''}`}>
        <p style={{ fontSize: '24px', textAlign: 'center' }}><strong>Strikes:</strong> {strikes}</p>
      </div>

      {gameOver && (
        <div className="button-group">
          <button onClick={restartGame} className="restart-button">Restart Game</button>
          <button onClick={handleNavigate} className="navigate-button">View Stat Leaders</button>
        </div>
      )}

      <Modal
        open={gameOver}
        onClose={restartGame}
        aria-labelledby="game-over-title"
        aria-describedby="game-over-description"
      >
        <Box sx={{
          backgroundColor: '#f7e8dc',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '500px',
          margin: 'auto',
          marginTop: '10%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
          <Typography id="game-over-title" variant="h6" component="h2">
            Game Over
          </Typography>
          <Typography id="game-over-description" sx={{ mt: 2 }}>
            {result}
          </Typography>
          <Button onClick={restartGame} variant="contained" color="primary" sx={{ marginTop: '10px', backgroundColor: '#d97e3b', color: 'white' }}>
            Restart Game
          </Button>
        </Box>
      </Modal>

      <Modal
        open={showRules}
        onClose={handleCloseRules}
        aria-labelledby="rules-title"
        aria-describedby="rules-description"
      >
        <Box sx={{ backgroundColor: '#f7e8dc', padding: '20px', borderRadius: '8px', maxWidth: '500px', margin: 'auto', marginTop: '10%' }}>
          <Typography id="rules-title" variant="h6" component="h2">
            Game Rules
          </Typography>
          <Typography id="rules-description" sx={{ mt: 2 }}>
            Test your knowledge of your favorite childhood players! Each player on this game was the leader of one specific stat from a season in the last 50 years. Try to guess the player based on what stat they led the league in and during what season. You have 3 strikes before the game ends, so choose wisely!
          </Typography>
          <ul>
            <li>Enter the player's name you think matches the given stat and season.</li>
            <li>If you're unsure, you can reveal the player's team or stat value, but it will cost you a strike.</li>
            <li>You can only afford 3 strikes, so make every guess count!</li>
          </ul>
          <Button onClick={handleCloseRules} variant="contained" color="primary" sx={{ marginTop: '10px', backgroundColor: '#d97e3b', color: 'white' }}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default GuessThePlayer;

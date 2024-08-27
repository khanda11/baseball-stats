import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PlayerComparison = () => {
  const [players, setPlayers] = useState([]);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [comparisonData, setComparisonData] = useState([]);

  useEffect(() => {
    // Fetching player names
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('/api/stat-leaders/');
        const playerNames = [...new Set(response.data.map(item => item.player_name))];
        setPlayers(playerNames);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);

  const handleCompare = async () => {
    try {
      const response = await axios.get('/api/stat-leaders/');
      const data = response.data;

      const player1Data = data.filter(item => item.player_name === player1);
      const player2Data = data.filter(item => item.player_name === player2);

      const mergedData = player1Data.map((p1Stat) => {
        const p2Stat = player2Data.find(p2 => p2.stat_category === p1Stat.stat_category);
        return {
          statCategory: p1Stat.stat_category,
          [player1]: p1Stat.stat_value,
          [player2]: p2Stat ? p2Stat.stat_value : 0,
        };
      });

      setComparisonData(mergedData);
    } catch (error) {
      console.error('Error comparing players:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Compare MLB Players
      </Typography>
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Player 1</InputLabel>
          <Select
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            label="Player 1"
          >
            {players.map((player, index) => (
              <MenuItem key={index} value={player}>
                {player}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Player 2</InputLabel>
          <Select
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            label="Player 2"
          >
            {players.map((player, index) => (
              <MenuItem key={index} value={player}>
                {player}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleCompare} fullWidth>
          Compare Players
        </Button>
      </Paper>

      {comparisonData.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={comparisonData}>
            <XAxis dataKey="statCategory" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={player1} fill="#8884d8" />
            <Bar dataKey={player2} fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Container>
  );
};

export default PlayerComparison;

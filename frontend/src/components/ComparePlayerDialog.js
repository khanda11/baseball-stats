import React, { useState, useMemo } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ComparePlayerDialog = ({ open, onClose, selectedPlayer, statLeaders }) => {
  const [comparisonPlayers, setComparisonPlayers] = useState([selectedPlayer]);

  const availablePlayers = useMemo(() => {
    return statLeaders.filter(
      (player) => player.stat_category === selectedPlayer.stat_category && player.player_name !== selectedPlayer.player_name
    );
  }, [selectedPlayer, statLeaders]);

  const handleAddPlayer = (event) => {
    const playerToAdd = availablePlayers.find(
      (player) => player.player_name === event.target.value && !comparisonPlayers.includes(player)
    );

    if (playerToAdd && comparisonPlayers.length < 5) {
      setComparisonPlayers([...comparisonPlayers, playerToAdd]);
    }
  };

  const data = {
    labels: comparisonPlayers.map(player => `${player.player_name} (${player.season})`),
    datasets: [
      {
        label: selectedPlayer.stat_category,
        data: comparisonPlayers.map(player => player.stat_value),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const resultDescription = comparisonPlayers.length > 1
    ? `Comparing ${comparisonPlayers.length} players in the category of ${selectedPlayer.stat_category}.`
    : `Selected player: ${selectedPlayer.player_name} (${selectedPlayer.season}).`;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Compare Players</DialogTitle>
      <DialogContent>
        <Bar data={data} />
        <Typography variant="body1" style={{ marginTop: 20 }}>
          {resultDescription}
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Add Player to Compare</InputLabel>
          <Select onChange={handleAddPlayer} value="">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {availablePlayers.map((player, index) => (
              <MenuItem key={index} value={player.player_name}>
                {player.player_name} ({player.season})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComparePlayerDialog;

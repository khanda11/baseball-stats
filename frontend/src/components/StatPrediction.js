import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Container,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Snackbar,
  Alert,
  Modal,
  Box,
  Button
} from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)({
  maxWidth: '1200px',
  margin: '40px auto',
  padding: '30px',
  backgroundColor: '#ffffff',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '30px', 
});

const StyledFormControl = styled(FormControl)({
  margin: '20px 0',
  minWidth: 200,
});

const StyledTypography = styled(Typography)({
  marginBottom: '20px',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#693d3d',
});

const StyledSelect = styled(Select)({
  width: '100%',
  padding: '10px',
  fontSize: '1rem',
  border: '2px solid #9b5d46',
  borderRadius: '5px',
  backgroundColor: '#ffffff',
  color: '#5a4a42',
});

const InstructionsButton = styled(Button)({
  position: 'absolute',
  top: '10px',
  left: '10px',
  backgroundColor: '#d97e3b',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#b9632f',
  },
});

const ModalBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#f7e8dc',
  borderRadius: '8px',
  padding: '20px',
  maxWidth: '400px',
  textAlign: 'center',
});

const StyledButton = styled('button')({
  backgroundColor: '#d97e3b',
  color: '#ffffff',
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  marginTop: '20px',
  '&:hover': {
    backgroundColor: '#b9632f',
  },
});

const StatPrediction = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Complete Games');
  const [openModal, setOpenModal] = useState(true);

  const statCategories = [
    'At Bats', 'Batting Average', 'Blown Saves', 'Caught Stealing', 'Complete Games', 'Doubles',
    'Earned Runs', 'ERA', 'Extra-base Hits', 'Games Played', 'Hits', 'Holds', 'Home Runs', 'Innings Pitched',
    'Intentional Walks', 'Losses', 'Number of Pitches', 'On-base Percentage', 'OPS', 'Plate Appearances',
    'RBIs', 'Runs', 'Sacrifice Bunts', 'Sacrifice Flies', 'Saves', 'Shutouts', 'Slugging Percentage',
    'Stolen Bases', 'Strikeouts', 'Total Bases', 'Triples', 'Walks', 'WHIP', 'Wins'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/stat-leaders/');
        const statLeaders = response.data;

        const filteredHistoricalData = statLeaders
          .filter((item) => item.stat_category === selectedCategory && item.season >= 1974 && item.season <= 2023)
          .map((item) => ({
            season: item.season,
            stat_value: item.stat_value,
          }))
          .sort((a, b) => a.season - b.season);

        setHistoricalData(filteredHistoricalData);

        const predictionResponse = await axios.get(
          `/ml/predict-future-stats/?stat_category=${encodeURIComponent(selectedCategory)}`
        );

        const predictionData = predictionResponse.data.map((item) => ({
          season: item.season,
          predicted_stat_value: item.predicted_stat_value,
        }));

        setPredictions(predictionData);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const combinedData = {
    labels: [
      ...historicalData.map((item) => item.season),
      ...predictions.map((item) => item.season),
    ],
    datasets: [
      {
        label: 'Historical Data',
        data: historicalData.map((item) => ({ x: item.season, y: item.stat_value })),
        backgroundColor: '#804b4b',
      },
      {
        label: 'Predicted Data',
        data: predictions.map((item) => ({ x: item.season, y: item.predicted_stat_value })),
        backgroundColor: '#d97e3b',
      },
    ],
  };

  return (
    <StyledContainer>
      {/* Instructions Button */}
      <InstructionsButton onClick={() => setOpenModal(true)}>
        Instructions
      </InstructionsButton>

      {/* Introductory Modal */}
      <Modal
  open={openModal}
  onClose={handleCloseModal}
  aria-labelledby="intro-modal-title"
  aria-describedby="intro-modal-description"
>
  <ModalBox>
    <Typography id="intro-modal-title" variant="h6" component="h2">
      Welcome to MLB Stat Predictions
    </Typography>
    <Typography id="intro-modal-description" sx={{ mt: 2 }}>
      Dive into the world of MLB stat leaders! This tool exclusively showcases the top performer across various stats for every season. The data is color-coded to help you distinguish between <span style={{ color: '#804b4b' }}>historical stats</span> and <span style={{ color: '#d97e3b' }}>AI-driven predictions</span> for future seasons. Our advanced AI model analyzes past performances to forecast how your favorite players might excel in the coming years. Explore trends, compare leaders, and see how the stars of yesterday stack up against future projections!
    </Typography>
    <StyledButton onClick={handleCloseModal}>
      Close
    </StyledButton>
  </ModalBox>
</Modal>


      <StyledTypography variant="h4" gutterBottom>
        {selectedCategory} Trends (1974 - Future Predictions)
      </StyledTypography>

      <StyledFormControl variant="outlined">
        <InputLabel>Stat Category</InputLabel>
        <StyledSelect value={selectedCategory} onChange={handleCategoryChange}>
          {statCategories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </StyledSelect>
      </StyledFormControl>

      {loading ? (
        <CircularProgress />
      ) : (
        <Bar
          data={combinedData}
          options={{
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Year',
                },
                type: 'linear',
                position: 'bottom',
                min: 1974,
                max: 2038,
                ticks: {
                  callback: function (value) {
                    return value.toString().replace(/,/g, ''); 
                  },
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Stat Value',
                },
              },
            },
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  font: {
                    size: 14,
                  },
                  color: '#693d3d',
                },
              },
            },
          }}
        />
      )}

      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </StyledContainer>
  );
};

export default StatPrediction;

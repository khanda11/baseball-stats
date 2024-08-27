import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const PredictionBarChart = ({ data, statCategory }) => {
 
  const historicalData = data.filter(d => d.season <= 2023);
  const predictedData = data.filter(d => d.season > 2023);


  const chartData = {
    labels: data.map(d => d.season),
    datasets: [
      {
        label: 'Historical Data',
        data: historicalData.map(d => d.stat_value),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Predicted Data',
        data: predictedData.map(d => d.predicted_stat_value),
        backgroundColor: 'rgba(75, 192, 192, 0.6)', 
      }
    ],
  };

  return <Bar data={chartData} />;
};

export default PredictionBarChart;

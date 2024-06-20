import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const CafeteriaAttendeesChart = ({ data }) => {
  const labels = data.map(entry => entry.date);
  const attendees = data.map(entry => entry.value);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Attendees',
        data: attendees,
        fill: true,
        backgroundColor: 'rgba(47, 32, 243, 0.6)',
        borderColor: 'rgba(47, 32, 243, 0.3)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Dates',
        },
      },
      y: {
        beginAtZero: true,
        max: 6000,
        title: {
          display: true,
          text: 'Attendees',
          position: 'start',
        },
      },
    },
  };

  return (
    <Line data={chartData} options={options} />
  );
};

export default CafeteriaAttendeesChart;

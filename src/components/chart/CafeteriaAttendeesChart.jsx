import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CafeteriaAttendeesChart = ({ data }) => {
  const labels = data.map((entry) => entry.date);
  const attendees = data.map((entry) => entry.count);

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
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Dates',
        },
      },
      y: {
        beginAtZero: true,
        // max: 10,
        title: {
          display: true,
          text: 'Attendees',
          position: 'start',
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default CafeteriaAttendeesChart;

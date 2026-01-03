import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SplitSlide = ({ data }) => {
  const { hourly_distribution, latest_chat } = data;
  
  // hourly_distribution is { "Author1": [count0, count1...], "Author2": [...] }
  const authors = Object.keys(hourly_distribution || {});
  
  if (!hourly_distribution || authors.length < 2) return null;

  const chartData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: authors[0],
        data: hourly_distribution[authors[0]],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
      },
      {
        label: authors[1],
        data: hourly_distribution[authors[1]],
        backgroundColor: 'rgba(53, 162, 235, 0.7)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: 'white' }
      },
      title: {
        display: true,
        text: 'Who talks when?',
        color: 'white',
        font: { size: 20 }
      },
    },
    scales: {
      x: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      y: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } }
    }
  };

  return (
    <div className="slide split-slide" style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', backgroundColor: '#222', padding: '20px' }}>
      <div style={{ flex: 1, width: '100%', minHeight: '300px' }}>
        <Bar data={chartData} options={options} />
      </div>
      <div style={{ marginTop: '20px', color: '#ecf0f1' }}>
        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Latest chat ever: {latest_chat.time} by {latest_chat.author}</p>
      </div>
    </div>
  );
};

export default SplitSlide;

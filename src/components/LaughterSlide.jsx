import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const LaughterSlide = ({ data }) => {
  const { counts, longest_haha } = data;
  
  const winner = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);

  const chartData = {
    labels: Object.keys(counts),
    datasets: [
      {
        data: Object.values(counts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="slide laughter-slide">
      <h2>Laughter Analysis</h2>
      <p style={{ fontSize: '1rem', color: '#ccc', marginBottom: '20px' }}>
        A breakdown of our laughter. {winner} laughs the most in chat!
      </p>
      <div style={{ width: '300px', height: '300px', margin: '20px auto' }}>
        <Pie data={chartData} />
      </div>
      
      <div style={{ marginTop: '30px', textAlign: 'left', width: '80%' }}>
        <h3>Longest Laugh Award 🤣</h3>
        <p><strong>{longest_haha.author}</strong> went all out:</p>
        <p style={{ 
            wordBreak: 'break-all', 
            fontStyle: 'italic', 
            color: '#aaa',
            fontSize: '0.9rem',
            maxHeight: '100px',
            overflowY: 'auto'
        }}>
            "{longest_haha.text}"
        </p>
      </div>
    </div>
  );
};

export default LaughterSlide;

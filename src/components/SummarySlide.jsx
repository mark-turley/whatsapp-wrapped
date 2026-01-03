import React from 'react';
import { motion } from 'framer-motion';

const SummarySlide = ({ data }) => {
  return (
    <div className="slide summary-slide">
      <motion.div 
        className="summary-card"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
            backgroundColor: '#1f2c34',
            padding: '30px',
            borderRadius: '20px',
            width: '80%',
            maxWidth: '400px',
            textAlign: 'left',
            border: '1px solid #25D366'
        }}
      >
        <h2 style={{ color: '#25D366', marginTop: 0 }}>Our 2025 Wrapped</h2>
        <div style={{ margin: '20px 0' }}>
            <p><strong>Total Messages:</strong> {data.total_messages.count.toLocaleString()}</p>
            <p><strong>Top Emoji:</strong> {data.top_emojis[0]?.emoji}</p>
            <p><strong>Happiest Day:</strong> {data.happiest_day.date}</p>
            <p><strong>Love Count:</strong> {data.word_counts.love}</p>
        </div>
        <p style={{ textAlign: 'center', fontStyle: 'italic', marginTop: '30px' }}>
            To many more messages and memories in 2026. Happy Anniversary!
        </p>
      </motion.div>
      
      <button 
        style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#25D366',
            border: 'none',
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer'
        }}
        onClick={() => window.print()}
      >
        Save / Share
      </button>
    </div>
  );
};

export default SummarySlide;

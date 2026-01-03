import React from 'react';
import { motion } from 'framer-motion';
import { FaSun } from 'react-icons/fa';

const GoodmorningStreakSlide = ({ streak }) => {
  return (
    <div className="slide streak-slide" style={{ background: 'linear-gradient(135deg, #87CEEB 0%, #E0F7FA 100%)' }}>
      <h2 style={{ color: '#FF8C00' }}>The Goodmorning Streak</h2>
      <p style={{ color: '#555' }}>Longest consecutive days we both said "Good Morning"</p>
      
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        style={{ 
            fontSize: '8rem', 
            fontWeight: 'bold', 
            color: '#FF8C00',
            margin: '20px 0',
            textShadow: '0 0 20px rgba(255, 140, 0, 0.5)'
        }}
      >
        {streak}
      </motion.div>
      
      <h3 style={{ color: '#555' }}>Days</h3>
      <FaSun size={50} color="#FF8C00" style={{ marginTop: '20px' }} />
    </div>
  );
};

export default GoodmorningStreakSlide;

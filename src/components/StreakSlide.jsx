import React from 'react';
import { motion } from 'framer-motion';
import { FaMoon } from 'react-icons/fa';

const StreakSlide = ({ streak }) => {
  return (
    <div className="slide streak-slide">
      <h2>The Goodnight Streak</h2>
      <p>Longest consecutive days we both said "Goodnight"</p>
      
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        style={{ 
            fontSize: '8rem', 
            fontWeight: 'bold', 
            color: '#FDB813',
            margin: '20px 0',
            textShadow: '0 0 20px rgba(253, 184, 19, 0.5)'
        }}
      >
        {streak}
      </motion.div>
      
      <h3>Days</h3>
      <FaMoon size={40} color="#FDB813" style={{ marginTop: '20px' }} />
    </div>
  );
};

export default StreakSlide;

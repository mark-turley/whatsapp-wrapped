import React from 'react';
import { motion } from 'framer-motion';

const CombinedStreakSlide = ({ goodnightStreak, goodmorningStreak, data }) => {
  const gnStreak = goodnightStreak || data?.goodnight_streak;
  const gmStreak = goodmorningStreak || data?.goodmorning_streak;

  return (
    <div className="slide streak-slide">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Streak Champions 🏆
      </motion.h2>

      <div className="streak-container" style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginTop: '30px' }}>
        
        {/* Goodnight Streak */}
        <motion.div 
          className="streak-box"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '15px' }}
        >
          <h3>Longest Goodnight Streak 🌙</h3>
          <div className="streak-stat">
            <span className="streak-number" style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ffd700' }}>{gnStreak?.count || 0}</span> days
          </div>
          <p>from {gnStreak?.start || '?'} to {gnStreak?.end || '?'}</p>
        </motion.div>

        {/* Goodmorning Streak */}
        <motion.div 
          className="streak-box"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '15px' }}
        >
          <h3>Longest Goodmorning Streak ☀️</h3>
          <div className="streak-stat">
            <span className="streak-number" style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ffaa00' }}>{gmStreak?.count || 0}</span> days
          </div>
          <p>from {gmStreak?.start || '?'} to {gmStreak?.end || '?'}</p>
        </motion.div>

      </div>
    </div>
  );
};

export default CombinedStreakSlide;

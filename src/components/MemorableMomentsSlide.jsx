import React from 'react';
import { motion } from 'framer-motion';

const MemorableMomentsSlide = ({ moments }) => {
  return (
    <div className="slide memorable-slide">
      <h2>Top 5 Moments of 2025</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', maxWidth: '500px' }}>
        {moments.map((moment, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.3 }}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '15px',
              borderRadius: '10px',
              borderLeft: `5px solid ${['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A8'][index]}`
            }}
          >
            <p style={{ margin: 0, fontSize: '1.1rem' }}>{moment}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MemorableMomentsSlide;

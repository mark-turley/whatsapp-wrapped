import React from 'react';
import { motion } from 'framer-motion';

const PodiumSlide = ({ data }) => {
  // Sort top 3 for podium
  const top3 = data.slice(0, 3);
  // Reorder for podium: 2nd, 1st, 3rd
  const podiumOrder = [top3[1], top3[0], top3[2]];

  const fixEmoji = (e) => {
      if (!e) return e;
      // Force red heart if it looks like a heart variation
      if (['❤', '♥', '🤍', '🩶'].includes(e)) return '❤️';
      return e;
  };

  return (
    <div className="slide podium-slide">
      <h2>Our Emoji Language</h2>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', height: '300px', gap: '10px' }}>
        {podiumOrder.map((item, index) => {
            if (!item) return null;
            const height = index === 1 ? '200px' : index === 0 ? '150px' : '100px';
            const delay = index === 1 ? 0.5 : index === 0 ? 0.2 : 0.8;
            
            return (
                <motion.div
                    key={item.emoji}
                    initial={{ height: 0 }}
                    animate={{ height: height }}
                    transition={{ delay: delay, duration: 0.5 }}
                    style={{ 
                        width: '80px', 
                        backgroundColor: index === 1 ? '#FFD700' : index === 0 ? '#C0C0C0' : '#CD7F32',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px',
                        paddingTop: '10px'
                    }}
                >
                    <span style={{ fontSize: '2rem' }}>{fixEmoji(item.emoji)}</span>
                    <span style={{ fontSize: '0.8rem', color: '#000', marginTop: '5px' }}>{item.count}</span>
                </motion.div>
            );
        })}
      </div>
      <p style={{ marginTop: '20px' }}>We really overused the {fixEmoji(top3[0]?.emoji)} emoji this year.</p>
    </div>
  );
};

export default PodiumSlide;

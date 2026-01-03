import React from 'react';
import { motion } from 'framer-motion';
import { FaFlagCheckered } from 'react-icons/fa';

const RaceSlide = ({ data }) => {
  const { times, raw_seconds } = data;
  const authors = Object.keys(raw_seconds);
  
  // Determine winner (lowest time)
  const winner = authors.reduce((a, b) => raw_seconds[a] < raw_seconds[b] ? a : b);
  const maxTime = Math.max(...Object.values(raw_seconds));

  return (
    <div className="slide race-slide">
      <h2>The Speedy Responder</h2>
      
      <div style={{ width: '100%', marginTop: '50px', position: 'relative' }}>
        {authors.map((author, index) => {
            const isWinner = author === winner;
            const duration = raw_seconds[author];
            // Calculate position: Winner finishes first. 
            // We want to animate them moving right. 
            // Faster time = faster animation.
            
            return (
                <div key={author} style={{ marginBottom: '40px', position: 'relative' }}>
                    <div style={{ textAlign: 'left', marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '10px', fontWeight: 'bold' }}>{author[0]}</span>
                        <span style={{ fontSize: '0.8rem', color: '#aaa' }}>({times[author]})</span>
                    </div>
                    
                    <div style={{ 
                        width: '100%', 
                        height: '2px', 
                        backgroundColor: '#555', 
                        position: 'absolute', 
                        top: '35px', 
                        zIndex: 0 
                    }} />
                    
                    <motion.div
                        initial={{ left: '0%' }}
                        animate={{ left: '90%' }}
                        transition={{ 
                            duration: 2 + (duration / maxTime) * 2, // Scale duration based on response time
                            ease: "easeOut" 
                        }}
                        style={{
                            position: 'relative',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: isWinner ? '#25D366' : '#ff6b6b',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1,
                            color: 'white',
                            fontWeight: 'bold'
                        }}
                    >
                        {author[0]}
                    </motion.div>
                    
                    <div style={{ position: 'absolute', right: '5%', top: '15px', fontSize: '1.5rem' }}>
                        <FaFlagCheckered />
                    </div>
                </div>
            );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        style={{ marginTop: '30px', fontStyle: 'italic' }}
      >
        "{winner} takes {times[winner]}. The other takes... longer."
      </motion.div>
    </div>
  );
};

export default RaceSlide;

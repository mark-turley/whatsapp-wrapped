import React from 'react';
import { motion } from 'framer-motion';

const StarterSlide = ({ data }) => {
  const authors = Object.keys(data);
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  
  return (
    <div className="slide starter-slide">
      <h2>Conversation Starters</h2>
      <p style={{ fontSize: '0.9rem', color: '#aaa' }}>(Messages sent after &gt;6 hours of silence)</p>
      
      <div style={{ display: 'flex', width: '100%', height: '50px', marginTop: '40px', borderRadius: '25px', overflow: 'hidden' }}>
        {authors.map((author, index) => {
            const percentage = (data[author] / total) * 100;
            return (
                <motion.div
                    key={author}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{
                        height: '100%',
                        backgroundColor: index === 0 ? '#25D366' : '#34b7f1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden'
                    }}
                >
                    {percentage > 15 && `${Math.round(percentage)}%`}
                </motion.div>
            );
        })}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px' }}>
        {authors.map((author, index) => (
            <div key={author} style={{ color: index === 0 ? '#25D366' : '#34b7f1' }}>
                <strong>{author}</strong>
            </div>
        ))}
      </div>
      
      <p style={{ marginTop: '40px', fontStyle: 'italic' }}>
        "{authors[0]} starts the chat. {authors[1]} keeps it going."
      </p>
    </div>
  );
};

export default StarterSlide;

import React from 'react';
import { motion } from 'framer-motion';

const FirstMessageSlide = ({ messages }) => {
  return (
    <div className="slide first-message-slide">
      <h2>Where it all began...</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '30px', width: '90%' }}>
        {messages.map((msg, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, rotate: -5 }}
                animate={{ opacity: 1, rotate: index % 2 === 0 ? -2 : 2 }}
                transition={{ delay: index * 1 }}
                style={{
                    backgroundColor: '#f4e4bc', // Vintage paper color
                    color: '#333',
                    padding: '20px',
                    borderRadius: '5px',
                    boxShadow: '5px 5px 15px rgba(0,0,0,0.3)',
                    fontFamily: '"Courier New", Courier, monospace',
                    textAlign: 'left',
                    position: 'relative'
                }}
            >
                <div style={{ 
                    position: 'absolute', 
                    top: '-10px', 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    width: '100px',
                    height: '20px',
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    border: '1px solid #ccc'
                }}></div> {/* Tape effect */}
                
                <p style={{ fontSize: '0.8rem', marginBottom: '10px', borderBottom: '1px solid #aaa', paddingBottom: '5px' }}>
                    {msg.author} - {msg.date}
                </p>
                <p style={{ fontSize: '1.1rem' }}>{msg.message}</p>
            </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FirstMessageSlide;

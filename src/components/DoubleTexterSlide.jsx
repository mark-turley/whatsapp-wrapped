import React from 'react';
import { motion } from 'framer-motion';

const DoubleTexterSlide = ({ data }) => {
  const { winner, ratios } = data;
  
  return (
    <div className="slide double-texter-slide">
      <h2 style={{ marginBottom: '10px' }}>The "Double Texter" Award</h2>
      <p style={{ fontStyle: 'italic', marginBottom: '30px', color: '#aaa' }}>"I might be clingy, but you love it."</p>
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            backgroundColor: 'var(--whatsapp-green)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(37, 211, 102, 0.5)'
        }}
      >
        <span style={{ fontSize: '3rem' }}>🏆</span>
        <h3 style={{ margin: '10px 0', color: 'white' }}>{winner}</h3>
      </motion.div>

      <div style={{ marginTop: '40px', width: '80%' }}>
        {Object.entries(ratios).map(([author, ratio]) => (
            <div key={author} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span>{author}</span>
                    <span>{(ratio * 100).toFixed(1)}% double texts</span>
                </div>
                <div style={{ width: '100%', height: '10px', backgroundColor: '#333', borderRadius: '5px' }}>
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${ratio * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        style={{ height: '100%', backgroundColor: author === winner ? '#25D366' : '#888', borderRadius: '5px' }}
                    />
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default DoubleTexterSlide;

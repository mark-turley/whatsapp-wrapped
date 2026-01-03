import React from 'react';
import { motion } from 'framer-motion';

const IntroSlide = ({ data, onStart }) => {
  return (
    <div className="slide intro-slide">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {data.year}
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {data.title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        We talked a lot.
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
      >
        Like, a lot.
      </motion.p>
      
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 4.5 }}
        onClick={onStart}
        className="start-button"
        style={{
            marginTop: '2rem',
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            backgroundColor: 'var(--whatsapp-green)',
            border: 'none',
            borderRadius: '50px',
            color: 'white',
            cursor: 'pointer'
        }}
      >
        Let's see
      </motion.button>
    </div>
  );
};

export default IntroSlide;

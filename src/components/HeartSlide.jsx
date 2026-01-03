import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const HeartSlide = ({ data }) => {
  const { love, funny_word, funny_word_count } = data;
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = love;
    const duration = 7000; // 7 seconds
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic function for slow finish
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const currentCount = Math.floor(easeOut * end);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [love]);

  return (
    <div className="slide heart-slide">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
      >
        <FaHeart size={100} color="#ff6b6b" />
      </motion.div>
      
      <h2>We said "Love"</h2>
      <h1 style={{ fontSize: '4rem', color: '#ff6b6b' }}>{count}</h1>
      <h2>times.</h2>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 8 }} // Wait for count to finish
        style={{ marginTop: '3rem' }}
      >
        <p>But we said "{funny_word}" <strong>{funny_word_count}</strong> times.</p>
        <p>Priorities.</p>
      </motion.div>
    </div>
  );
};

export default HeartSlide;

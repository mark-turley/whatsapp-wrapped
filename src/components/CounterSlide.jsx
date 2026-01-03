import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CounterSlide = ({ data }) => {
  const { count, per_day } = data;
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = count;
    const duration = 7000; // 7 seconds
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic function for slow finish
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const currentCount = Math.floor(easeOut * end);
      setDisplayCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [count]);

  return (
    <div className="slide counter-slide">
      <h2>We exchanged</h2>
      <motion.div className="big-number" style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--whatsapp-green)' }}>
        {displayCount.toLocaleString()}
      </motion.div>
      <h2>messages this year.</h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 7.5 }}
        style={{ marginTop: '2rem', fontSize: '1.2rem', color: '#888' }}
      >
        That’s roughly {per_day} messages a day!
      </motion.p>
    </div>
  );
};

export default CounterSlide;

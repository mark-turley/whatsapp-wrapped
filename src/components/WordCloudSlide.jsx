import React from 'react';
import { motion } from 'framer-motion';

const WordCloudSlide = () => {
  return (
    <div className="slide wordcloud-slide" style={{ backgroundColor: '#000', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', position: 'relative', overflow: 'hidden' }}>
      <h2 style={{ color: 'white', marginTop: '80px', zIndex: 10, position: 'relative', textShadow: '0 2px 4px rgba(0,0,0,0.5)', textAlign: 'center', width: '90%' }}>The words that built our year.</h2>
      <motion.img 
        src="/heart_wordcloud_highres.png" 
        alt="Word Cloud" 
        style={{ 
            position: 'absolute',
            top: '10%', // Push down slightly to avoid text overlap if possible
            left: 0,
            width: '100%', 
            height: '90%', 
            objectFit: 'contain',
            zIndex: 0,
            opacity: 1
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.8, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
    </div>
  );
};

export default WordCloudSlide;

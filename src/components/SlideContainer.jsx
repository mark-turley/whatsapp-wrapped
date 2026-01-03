import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 20,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const SlideContainer = ({ children, direction, onNext, onPrev }) => {
  return (
    <div className="slide-container-wrapper">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={children.key}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            boxSizing: 'border-box'
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation Areas */}
      <div 
        style={{ position: 'absolute', top: 0, left: 0, width: '30%', height: '100%', zIndex: 10 }} 
        onClick={onPrev}
      />
      <div 
        style={{ position: 'absolute', top: 0, right: 0, width: '30%', height: '100%', zIndex: 10 }} 
        onClick={onNext}
      />
    </div>
  );
};

export default SlideContainer;

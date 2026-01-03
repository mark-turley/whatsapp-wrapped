import React, { useState } from 'react';
import { motion } from 'framer-motion';

const QuizSlide = ({ question, options, answer, onComplete }) => {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (option) => {
    if (revealed) return;
    setSelected(option);
    setRevealed(true);
    setTimeout(() => {
        onComplete();
    }, 2000);
  };

  const fixEmoji = (text) => {
    if (typeof text !== 'string') return text;
    return text.replace(/🤍|🩶|♥|❤/g, '❤️');
  };

  return (
    <div className="slide quiz-slide">
      <h2 style={{ marginBottom: '40px' }}>Pop Quiz! 🧠</h2>
      <h3 style={{ marginBottom: '40px' }}>{question}</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '80%' }}>
        {options.map((option, index) => {
            let bgColor = 'rgba(255,255,255,0.1)';
            if (revealed) {
                if (option === answer) bgColor = '#25D366'; // Correct
                else if (option === selected) bgColor = '#ff6b6b'; // Wrong
            }
            
            return (
                <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelect(option)}
                    style={{
                        padding: '20px',
                        fontSize: '1.2rem',
                        backgroundColor: bgColor,
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                    }}
                >
                    {fixEmoji(option)}
                </motion.button>
            );
        })}
      </div>
    </div>
  );
};

export default QuizSlide;

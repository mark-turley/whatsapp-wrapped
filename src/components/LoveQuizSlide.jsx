import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const LoveQuizSlide = ({ question, options, answer, data, savedSelection, onSelect }) => {
  const [selected, setSelected] = useState(savedSelection);
  const [revealed, setRevealed] = useState(!!savedSelection);
  const [count, setCount] = useState(0);

  // Derive values if not passed directly
  const loveCount = data.quiz?.love_count || 0;
  const funnyWord = "pookie";
  const funnyWordCount = data.word_counts?.funny_word_count || 0;

  const quizQuestion = question || "How many times did we say 'Love'?";
  const quizAnswer = answer || loveCount;
  
  // Generate options if not provided
  const quizOptions = options || [
    loveCount - 142,
    loveCount + 53,
    loveCount - 21,
    loveCount
  ].sort(() => Math.random() - 0.5);

  const handleSelect = (option) => {
    if (revealed) return;
    setSelected(option);
    setRevealed(true);
    if (onSelect) onSelect(option);
  };

  // Animation for the count up (only runs if revealed)
  useEffect(() => {
    if (revealed) {
        let start = 0;
        const end = loveCount;
        const duration = 4000; // 4 seconds
        const startTime = performance.now();

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentCount = Math.floor(easeOut * end);
          setCount(currentCount);

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
    }
  }, [revealed, loveCount]);

  return (
    <div className="slide love-quiz-slide" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      
      {!revealed ? (
        <>
            <h2 style={{ marginBottom: '40px' }}>Pop Quiz! 🧠</h2>
            <h3 style={{ marginBottom: '40px' }}>{quizQuestion}</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '80%', maxWidth: '400px' }}>
                {quizOptions.map((option, index) => (
                    <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSelect(option)}
                        style={{
                            padding: '20px',
                            fontSize: '1.2rem',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '10px',
                            color: 'white',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s'
                        }}
                    >
                        {option}
                    </motion.button>
                ))}
            </div>
        </>
      ) : (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            style={{ textAlign: 'center', width: '100%' }}
        >
            <div style={{ marginBottom: '20px' }}>
                {selected === quizAnswer ? (
                    <h2 style={{ color: '#25D366' }}>Correct! 🎉</h2>
                ) : (
                    <h2 style={{ color: '#ff6b6b' }}>Not quite! You guessed {selected}</h2>
                )}
            </div>

            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                style={{ display: 'inline-block' }}
            >
                <FaHeart size={100} color="#ff6b6b" />
            </motion.div>
            
            <h2>We said "Love"</h2>
            <h1 style={{ fontSize: '5rem', color: '#ff6b6b', margin: '10px 0' }}>{count}</h1>
            <h2>times.</h2>
            
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.5 }}
                style={{ marginTop: '3rem' }}
            >
                <h3>And we said "{funnyWord}" {funnyWordCount} times! 😂</h3>
            </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default LoveQuizSlide;

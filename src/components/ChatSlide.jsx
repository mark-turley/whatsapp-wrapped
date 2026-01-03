import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const ChatSlide = ({ data }) => {
  if (!data || !data.message) return null;

  return (
    <div className="slide chat-slide">
      <h2>Remember this?</h2>
      <motion.div 
        className="chat-bubble"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
            backgroundColor: '#075E54',
            padding: '15px',
            borderRadius: '20px',
            maxWidth: '90%',
            maxHeight: '60vh',
            overflowY: 'auto',
            textAlign: 'left',
            marginTop: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
        }}
      >
        <p style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '5px' }}>{data.date} - {data.author}</p>
        <div style={{ fontSize: '1rem', lineHeight: '1.4', color: 'white' }}>
            <ReactMarkdown>{data.message}</ReactMarkdown>
        </div>
      </motion.div>
      <p style={{ marginTop: '20px', fontStyle: 'italic', opacity: 0.7 }}>{data.context}</p>
    </div>
  );
};

export default ChatSlide;

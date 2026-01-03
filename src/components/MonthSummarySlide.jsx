import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from 'react-icons/fa';

const MonthSummarySlide = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  if (!data || data.length === 0) return null;

  const currentMonth = data[currentIndex];
  const { month, year, data: monthData } = currentMonth;

  const nextMonth = (e) => {
    e.stopPropagation();
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevMonth = (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const jumpToMonth = (index, e) => {
    e.stopPropagation();
    setCurrentIndex(index);
    setShowMenu(false);
  };

  return (
    <div className="slide month-summary-slide" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header with Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '10px' }}>
        <button onClick={prevMonth} disabled={currentIndex === 0} style={{ background: 'none', border: 'none', color: 'white', opacity: currentIndex === 0 ? 0.3 : 1, cursor: 'pointer' }}>
          <FaChevronLeft size={24} />
        </button>
        
        <div style={{ position: 'relative' }}>
          <h2 
            onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }} 
            style={{ margin: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--whatsapp-green)' }}
          >
            {month} {year} <FaCalendarAlt size={16} />
          </h2>
          
          {showMenu && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#333',
              borderRadius: '10px',
              padding: '10px',
              zIndex: 100,
              maxHeight: '300px',
              overflowY: 'auto',
              width: '200px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
            }}>
              {data.map((m, idx) => (
                <div 
                  key={idx} 
                  onClick={(e) => jumpToMonth(idx, e)}
                  style={{ 
                    padding: '8px', 
                    cursor: 'pointer', 
                    backgroundColor: idx === currentIndex ? '#075E54' : 'transparent',
                    borderRadius: '5px',
                    marginBottom: '2px',
                    color: 'white'
                  }}
                >
                  {m.month} {m.year}
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={nextMonth} disabled={currentIndex === data.length - 1} style={{ background: 'none', border: 'none', color: 'white', opacity: currentIndex === data.length - 1 ? 0.3 : 1, cursor: 'pointer' }}>
          <FaChevronRight size={24} />
        </button>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', width: '100%', padding: '0 10px' }}>
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Summary */}
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '15px', marginBottom: '15px', textAlign: 'left' }}>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>{monthData.summary}</p>
            </div>

            {/* Events List */}
            {monthData.events_list && (
              <div style={{ textAlign: 'left', marginBottom: '15px' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#FFD700', marginBottom: '5px' }}>Highlights</h3>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  {monthData.events_list.map((event, i) => (
                    <li key={i} style={{ fontSize: '0.9rem', marginBottom: '3px' }}>{event}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Memorable Moment */}
            <div style={{ textAlign: 'left', marginBottom: '15px' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#ff6b6b', marginBottom: '5px' }}>Memorable Moment</h3>
              <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>"{monthData.memorable_moment}"</p>
            </div>

            {/* Nice Text */}
            <div style={{ textAlign: 'right' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#34b7f1', marginBottom: '5px' }}>Nice Text</h3>
              <div style={{ 
                  backgroundColor: '#075E54', 
                  padding: '10px 15px', 
                  borderRadius: '15px 15px 0 15px',
                  display: 'inline-block',
                  maxWidth: '90%'
              }}>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>{monthData.nice_text}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div style={{ marginTop: '10px', fontSize: '0.8rem', opacity: 0.7 }}>
        {currentIndex + 1} / {data.length}
      </div>
    </div>
  );
};

export default MonthSummarySlide;

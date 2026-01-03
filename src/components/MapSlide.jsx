import React, { useState } from 'react';
import { FaMapMarkerAlt, FaRandom, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const MapSlide = ({ data }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [displayedPhotos, setDisplayedPhotos] = useState([]);

  const getRandomPhotos = (photos, count = 4) => {
    if (!photos || photos.length === 0) return [];
    
    // Always create a copy and shuffle it, even if we have fewer than 'count' photos
    // This ensures we get a new array reference (triggering re-render) 
    // and that the order changes even for small sets.
    const shuffled = [...photos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleLocationClick = (loc, e) => {
    e.stopPropagation();
    setSelectedLocation(loc);
    setDisplayedPhotos(getRandomPhotos(loc.photos));
  };

  const closeLocation = (e) => {
    e.stopPropagation();
    setSelectedLocation(null);
  };

  const handleShuffle = (e) => {
    e.stopPropagation();
    if (selectedLocation && selectedLocation.photos) {
      setDisplayedPhotos(getRandomPhotos(selectedLocation.photos));
    }
  };

  return (
    <div className="slide map-slide" style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: '#222', color: 'white', padding: '20px', overflowY: 'auto' }}>
      
      <AnimatePresence>
        {!selectedLocation ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <h2 style={{ marginBottom: '30px', textShadow: '0 0 5px black' }}>
              We went places.
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', maxWidth: '400px' }}>
              {data.map((loc, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => handleLocationClick(loc, e)}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    padding: '15px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <FaMapMarkerAlt size={24} color="#e74c3c" style={{ marginRight: '15px' }} />
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{loc.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaMapMarkerAlt size={30} color="#e74c3c" />
                <h2 style={{ margin: 0 }}>{selectedLocation.name}</h2>
              </div>
              <button onClick={closeLocation} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                <FaTimes size={24} />
              </button>
            </div>

            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '10px', marginBottom: '20px', maxHeight: '60vh' }}>
              {displayedPhotos.map((src, i) => (
                <div key={i} style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '10px' }}>
                    <img 
                        src={src} 
                        alt={`${selectedLocation.name} ${i}`} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    />
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>
                <button 
                    onClick={handleShuffle} 
                    style={{ 
                        backgroundColor: '#25D366', 
                        color: 'white', 
                        border: 'none', 
                        padding: '10px 20px', 
                        borderRadius: '20px', 
                        cursor: 'pointer', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
                    }}
                >
                    <FaRandom size={16} /> Shuffle Photos
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapSlide;

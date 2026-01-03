import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraphSlide = ({ data, happiestDay }) => {
  const scrollRef = useRef(null);
  
  // Calculate position of happiest day
  const totalPoints = data.labels.length;
  
  // Find closest week to happiest day
  const happiestDate = new Date(happiestDay.date);
  let closestIndex = 0;
  let minDiff = Infinity;
  
  data.labels.forEach((label, index) => {
      const labelDate = new Date(label);
      const diff = Math.abs(happiestDate - labelDate);
      if (diff < minDiff) {
          minDiff = diff;
          closestIndex = index;
      }
  });
  
  const targetIndex = closestIndex;
  
  // Map index to percentage offset
  // 0 -> 0%
  // total -> -200%
  // We want to center the happiest day.
  // The viewport is 1/3 (33.33%) of the total width.
  // The point is at (index / total) * 100% of the total width.
  // We want that point to be at the center of the viewport (16.66% of total width).
  // So we want to shift the container so that the point is at 16.66% of the screen.
  // x = 16.66% - point_position%
  // x = 16.66 - (index / total * 300) ? No.
  
  // Let's work in percentages of the container width (which is 300% of screen).
  // Viewport width = 33.33% of container.
  // Center of viewport = 16.66% of container.
  // Point position = (index / total) * 100% of container.
  // We want to move the container so that Point Position aligns with Center of Viewport.
  // offset = Center of Viewport - Point Position
  // offset = 16.66 - (index / total * 100)
  // But x is applied to the container.
  // If x is in %, it's % of the element's width (container width).
  // So x = 16.66 - (index / total * 100).
  
  // Let's verify:
  // If index = 0 (start), x = 16.66. This shifts right. We want x=0 for start.
  // Actually we want the point to be centered, but we can't scroll past the start.
  // So we clamp x between 0 and -66.66% (since -66.66% shows the last 1/3).
  
  // Wait, x is usually negative to scroll right.
  // If x = -33.33%, we have scrolled one viewport width.
  
  let targetX = 16.66 - (targetIndex / totalPoints * 100);
  
  // Clamp targetX
  // Max x is 0 (start)
  // Min x is -66.66 (end)
  targetX = Math.min(0, Math.max(-66.66, targetX));
  
  // Convert to string for framer motion
  const targetPercent = `${targetX}%`;

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Sentiment',
        data: data.data,
        borderColor: '#ff6b6b',
        backgroundColor: 'rgba(255, 107, 107, 0.5)',
        tension: 0.4,
        pointRadius: 0, // Hide points for cleaner look
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Our Vibe Graph',
        color: '#fff',
        font: { size: 20 }
      },
      tooltip: { enabled: false } // Hide tooltips/scores
    },
    scales: {
      y: {
        display: false, // Hide Y axis scores
        grid: { display: false },
      },
      x: {
        display: true, // Show X axis for week markers
        grid: { display: false, color: 'rgba(255,255,255,0.1)' },
        ticks: {
            color: 'rgba(255,255,255,0.5)',
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: 20,
            includeBounds: true,
            callback: function(val, index) {
                // Show "Week X" or Month
                const date = this.getLabelForValue(val);
                const d = new Date(date);
                return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }
        }
      }
    },
    animation: {
        duration: 0 // Disable initial chartjs animation to let framer handle the reveal
    }
  };

  return (
    <div className="slide graph-slide" style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
      
      {/* Scrolling Graph Container */}
      <motion.div 
        initial={{ x: 0 }}
        animate={{ x: ["0%", "-66.66%", targetPercent] }} // Scroll to end, then back to happiest day (centered)
        transition={{ 
            times: [0, 0.6, 1], // 60% of time scrolling to end, 40% going back
            duration: 12, // Faster overall (12s total)
            ease: "easeInOut" 
        }} 
        style={{ 
            display: 'flex', 
            width: '300%', // Triple width for zoom effect
            height: '70%',
            flexShrink: 0
        }}
      >
        <div style={{ flex: 1, height: '100%', padding: '20px' }}>
             <Line options={options} data={chartData} />
        </div>
      </motion.div>

      {/* Happiest Day Reveal */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 11, duration: 1 }} // Wait for scroll to finish (12s * 0.9 = 10.8s approx)
        style={{ 
            position: 'absolute', 
            bottom: '20px', 
            left: 0, 
            width: '100%', 
            textAlign: 'center',
            backgroundColor: 'rgba(0,0,0,0.8)',
            padding: '20px'
        }}
      >
        <h3 style={{ color: '#ff6b6b' }}>The Happiest Day</h3>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--whatsapp-green)' }}>{happiestDay.date}</p>
        <p style={{ fontSize: '1rem', maxWidth: '80%', margin: '10px auto', lineHeight: '1.4' }}>
            {happiestDay.explanation}
        </p>
      </motion.div>
    </div>
  );
};

export default GraphSlide;

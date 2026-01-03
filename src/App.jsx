import React, { useState, useEffect, useRef } from 'react';
import SlideContainer from './components/SlideContainer';
import IntroSlide from './components/IntroSlide';
import CounterSlide from './components/CounterSlide';
import SplitSlide from './components/SplitSlide';
import GraphSlide from './components/GraphSlide';
import PodiumSlide from './components/PodiumSlide';
import WordCloudSlide from './components/WordCloudSlide';
import MapSlide from './components/MapSlide';
import ChatSlide from './components/ChatSlide';
import SummarySlide from './components/SummarySlide';
import MonthSummarySlide from './components/MonthSummarySlide';
import MemorableMomentsSlide from './components/MemorableMomentsSlide';
import DoubleTexterSlide from './components/DoubleTexterSlide';
import RaceSlide from './components/RaceSlide';
import LaughterSlide from './components/LaughterSlide';
import FirstMessageSlide from './components/FirstMessageSlide';
import StarterSlide from './components/StarterSlide';
import QuizSlide from './components/QuizSlide';
import StreakSlide from './components/StreakSlide';
import GoodmorningStreakSlide from './components/GoodmorningStreakSlide';
import LoveQuizSlide from './components/LoveQuizSlide';
import wrappedData from './data/wrappedData.json';
import { motion } from 'framer-motion';
import './App.css';

const SONGS = [
  { file: 'black & white - Jeremy Zucker (Lyrics).mp3', start: 48 },
  { file: 'Maren Morris, Hozier - The Bones (Official Audio).mp3', start: 42 },
  { file: 'The Long And Winding Road (Remastered 2009).mp3', start: 13 },
  { file: 'Alex Warren - Ordinary (Lyrics).mp3', start: 55 },
  { file: 'Amble ~ Marlay Park (Lyrics).mp3', start: 45 },
  { file: 'Favourite - Fontaines D.C. (audio only).mp3', start: 40 },
  { file: 'Justin Bieber - DAISIES (Audio).mp3', start: 45 },
  { file: 'The Cranberries – Linger (Lyrics).mp3', start: 95 },
  { file: 'Lewis Capaldi - Pointless (Official Video).mp3', start: 45 },
  { file: 'James Blunt - 1973 (Lyrics).mp3', start: 50 },
  { file: 'Mumford & Sons, Hozier - Rubber Band Man.mp3', start: 40 },
  { file: 'Bless the Telephone.mp3', start: 30 },
  { file: 'mess is mine - vance joy __ lyrics.mp3', start: 48 },
  { file: 'Kodaline - Follow Your Fire (Lyrics _ Lyrics Video).mp3', start: 38 },
  { file: 'Man I Need - Olivia Dean (Lyrics).mp3', start: 45 },
  { file: 'Sam Fender — Rein Me In (feat. Olivia Dean) [Official Video].mp3', start: 40 },
  { file: 'ROLE MODEL - Sally, When The Wine Runs Out (Lyric Video).mp3', start: 35 },
  { file: 'Father John Misty - Real Love Baby.mp3', start: 42 },
  { file: 'The Kooks - Junk Of The Heart (Happy).mp3', start: 45 }
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  // Define the slide order
  const emojiOptions = ["😂", "🥺", "🔥"].filter(e => e !== wrappedData.quiz.top_emoji);
  emojiOptions.push(wrappedData.quiz.top_emoji);
  
  const slides = [
    { type: 'ghost' },
    { type: 'intro', data: wrappedData.intro },
    { type: 'first_message', data: wrappedData.first_messages },
    { type: 'quiz', question: "Who sent more messages this year?", options: wrappedData.authors, answer: wrappedData.quiz.more_messages },
    { type: 'counter', data: wrappedData.total_messages },
    { type: 'split', data: wrappedData.time_stats },
    { type: 'starter', data: wrappedData.conversation_starters },
    { type: 'double_texter', data: wrappedData.double_texter },
    { type: 'race', data: wrappedData.speedy_responder },
    { type: 'quiz', question: "What is our most used emoji?", options: emojiOptions, answer: wrappedData.quiz.top_emoji },
    { type: 'podium', data: wrappedData.top_emojis },
    { type: 'laughter', data: wrappedData.laughter },
    { type: 'love_quiz', data: wrappedData },
    { type: 'streak', streak: wrappedData.goodnight_streak },
    { type: 'goodmorning_streak', streak: wrappedData.goodmorning_streak },
    { type: 'graph', data: wrappedData.vibe_graph, happiestDay: wrappedData.happiest_day },
    { type: 'chat', data: { ...wrappedData.most_texts_day, message: wrappedData.most_texts_day.summary, author: "AI Summary", context: `On ${wrappedData.most_texts_day.date}, we sent ${wrappedData.most_texts_day.count} messages!` } },
    { type: 'wordcloud' },
    { type: 'map', data: wrappedData.travel_map },
    { type: 'month_summary', data: wrappedData.monthly_summaries },
    { type: 'memorable', moments: wrappedData.memorable_moments },
    { type: 'summary', data: wrappedData }
  ];

  const totalSlides = slides.length;

  // Ghost slide auto-advance
  useEffect(() => {
    if (currentSlide === 0 && slides[0].type === 'ghost') {
        const timer = setTimeout(() => {
            setIsPlaying(true);
            setCurrentSlide(1);
        }, 100);
        return () => clearTimeout(timer);
    }
  }, [currentSlide]);

  useEffect(() => {
    if (isPlaying) {
      // Calculate song index with logic to keep same song for paired slides
      let songIdx = 0;
      for (let i = 0; i <= currentSlide; i++) {
          const slide = slides[i];
          if (slide.type === 'ghost') continue;

          if (i > 0) {
              const prevSlide = slides[i-1];
              const currSlide = slides[i];
              
              // If current is Goodmorning Streak and prev is Streak, keep same song
              if (currSlide.type === 'goodmorning_streak' && prevSlide.type === 'streak') {
                  // Do not increment
              } 
              // If current is Podium (results) and prev is Quiz (emoji), keep same song
              else if (currSlide.type === 'podium' && prevSlide.type === 'quiz' && prevSlide.question.includes("emoji")) {
                  // Do not increment
              }
              // If current is Counter (messages) and prev is Quiz (messages), keep same song
              else if (currSlide.type === 'counter' && prevSlide.type === 'quiz' && prevSlide.question.includes("messages")) {
                  // Do not increment
              }
              else {
                  songIdx++;
              }
          }
      }
      const targetSongIndex = songIdx % SONGS.length;
      const song = SONGS[targetSongIndex];
      
      const currentSrc = audioRef.current.src;
      const currentFilename = currentSrc ? decodeURIComponent(currentSrc.split('/').pop()) : "";

      // Check if we need to change
      if (currentFilename !== song.file) {
          // Fade out
          const fadeOut = setInterval(() => {
              if (audioRef.current.volume > 0.1) {
                  audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.1);
              } else {
                  clearInterval(fadeOut);
                  audioRef.current.src = `/music/${song.file}`;
                  audioRef.current.currentTime = song.start;
                  audioRef.current.play().then(() => {
                      // Fade in
                      audioRef.current.volume = 0;
                      const fadeIn = setInterval(() => {
                          if (audioRef.current.volume < 0.5) {
                              audioRef.current.volume = Math.min(0.5, audioRef.current.volume + 0.1);
                          } else {
                              clearInterval(fadeIn);
                          }
                      }, 50);
                  }).catch(e => console.error("Audio play failed", e));
              }
          }, 50);
      }
    }
  }, [currentSlide, isPlaying]);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(currentSlide - 1);
    }
  };

  const startShow = () => {
    setIsPlaying(true);
    nextSlide();
  };

  // Autoplay on mount (user interaction usually required, but we can try)
  useEffect(() => {
      const playAudio = async () => {
          try {
              setIsPlaying(true);
          } catch (e) {
              console.log("Autoplay blocked", e);
          }
      };
      playAudio();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const renderSlide = () => {
    const slideDef = slides[currentSlide];
    const slideProps = { key: currentSlide }; // Force re-render for animation

    switch (slideDef.type) {
      case 'intro': return <IntroSlide {...slideProps} data={slideDef.data} onStart={startShow} />;
      case 'ghost': return <div style={{ width: '100%', height: '100%', background: '#000' }} />;
      case 'first_message': return <FirstMessageSlide {...slideProps} messages={slideDef.data} />;
      case 'quiz': return <QuizSlide {...slideProps} question={slideDef.question} options={slideDef.options} answer={slideDef.answer} onComplete={nextSlide} />;
      case 'counter': return <CounterSlide {...slideProps} data={slideDef.data} />;
      case 'split': return <SplitSlide {...slideProps} data={slideDef.data} />;
      case 'starter': return <StarterSlide {...slideProps} data={slideDef.data} />;
      case 'double_texter': return <DoubleTexterSlide {...slideProps} data={slideDef.data} />;
      case 'race': return <RaceSlide {...slideProps} data={slideDef.data} />;
      case 'podium': return <PodiumSlide {...slideProps} data={slideDef.data} />;
      case 'laughter': return <LaughterSlide {...slideProps} data={slideDef.data} />;
      case 'love_quiz': return <LoveQuizSlide {...slideProps} data={slideDef.data} />;
      case 'streak': return <StreakSlide {...slideProps} streak={slideDef.streak} />;
      case 'goodmorning_streak': return <GoodmorningStreakSlide {...slideProps} streak={slideDef.streak} />;
      case 'graph': return <GraphSlide {...slideProps} data={slideDef.data} happiestDay={slideDef.happiestDay} />;
      case 'chat': return <ChatSlide {...slideProps} data={slideDef.data} />;
      case 'wordcloud': return <WordCloudSlide {...slideProps} />;
      case 'map': return <MapSlide {...slideProps} data={slideDef.data} />;
      case 'month_summary': return <MonthSummarySlide {...slideProps} data={slideDef.data} />;
      case 'memorable': return <MemorableMomentsSlide {...slideProps} moments={slideDef.moments} />;
      case 'summary': return <SummarySlide {...slideProps} data={slideDef.data} />;
      default: return <IntroSlide {...slideProps} data={wrappedData.intro} onStart={startShow} />;
    }
  };

  return (
    <div className="app-container">
      {/* Background Animation */}
      <div className="background-animation">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-shape"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0.1
            }}
            animate={{ 
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 20 + Math.random() * 20, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: `hsl(${Math.random() * 360}, 70%, 80%)`,
              filter: 'blur(40px)',
              zIndex: 0
            }}
          />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
        <SlideContainer direction={direction} onNext={nextSlide} onPrev={prevSlide}>
          {renderSlide()}
        </SlideContainer>
      </div>
      
      {/* Progress Bar */}
      {currentSlide > 0 && (
        <div className="progress-bar" style={{ zIndex: 2 }}>
          {slides.slice(1).map((_, idx) => (
            <div 
              key={idx} 
              className={`progress-segment ${idx <= (currentSlide - 1) ? 'active' : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

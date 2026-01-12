import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface SyncCelebrationProps {
  score: number;
  onComplete: () => void;
}

export const SyncCelebration = ({ score, onComplete }: SyncCelebrationProps) => {
  const [status, setStatus] = useState('INITIALIZING...');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getTierData = () => {
    if (score === 100) return { color: '#fbbf24', audio: '/audio/100%.mp3', delay: 7000, label: "BOTANY GOD DETECTED" }; 
    if (score >= 80) return { color: '#10b981', audio: '/audio/80-90%.mp3', delay: 5000, label: "ELITE SYNC COMPLETE" };
    if (score >= 40) return { color: '#3b82f6', audio: '/audio/40-70%.mp3', delay: 4000, label: "UPLINK STABLE" };
    return { color: '#ef4444', audio: '/audio/below30%.mp3', delay: 3500, label: "CRITICAL LINK FAILURE" };
  };

  const tier = getTierData();

  useEffect(() => {
    audioRef.current = new Audio(tier.audio);
    audioRef.current.volume = 0.8;
    audioRef.current.play().catch(() => console.log("Audio blocked"));

    const timeline = async () => {
      await new Promise(r => setTimeout(r, 800));
      setStatus('ANALYZING NEURAL DATA...');
      
      await new Promise(r => setTimeout(r, 1200));
      setStatus(tier.label);

      // Trigger standard confetti or Rocket Firecrackers
      if (score === 100) {
        triggerRocketFirecrackers();
      } else if (score >= 80) {
        triggerStandardConfetti(tier.color);
      }

      await new Promise(r => setTimeout(r, tier.delay));
      onComplete();
    };

    timeline();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [score, onComplete, tier.audio]);

  // 🚀 Special Rocket Animation for 100%
  const triggerRocketFirecrackers = () => {
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 300 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      // Rockets shooting from random spots at the bottom
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const triggerStandardConfetti = (color: string) => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: [color, '#ffffff'] });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[250] flex flex-col items-center justify-center bg-[#020617] overflow-hidden"
    >
      {/* Neural Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,var(--tier-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--tier-color)_1px,transparent_1px)] bg-[size:45px_45px]" 
          style={{ '--tier-color': tier.color } as React.CSSProperties}
        />
      </div>

      {/* ROCKET STREAK ANIMATION (Only for 100%) */}
      {score === 100 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: '100vh', x: `${20 * i + 10}%`, opacity: 1 }}
              animate={{ y: '-10vh', opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
              className="absolute w-1 h-20 bg-gradient-to-t from-transparent to-yellow-400"
            />
          ))}
        </div>
      )}

      {/* Main UI */}
      <div className="relative z-20 flex flex-col items-center">
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          <div 
            className="w-56 h-56 rounded-full border-4 flex flex-col items-center justify-center backdrop-blur-3xl shadow-2xl"
            style={{ borderColor: tier.color, backgroundColor: `${tier.color}10`, boxShadow: `0 0 80px ${tier.color}40` }}
          >
            <motion.span 
              animate={score === 100 ? { y: [0, -10, 0] } : {}}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="text-8xl font-black text-white italic tracking-tighter"
            >
              {score}%
            </motion.span>
          </div>
        </motion.div>

        <div className="mt-16 text-center">
          <AnimatePresence mode="wait">
            <motion.h2 
              key={status}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-white text-4xl md:text-6xl font-black italic uppercase tracking-tighter"
            >
              {status}
            </motion.h2>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
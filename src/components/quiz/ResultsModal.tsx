import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Importing the atoms
import { RankBadge } from './ResultModal/RankBadge';
import { ScoreDisplay } from './ResultModal/ScoreDisplay';
import { ActionButtons } from './ResultModal/ActionButtons';
import { SyncCelebration } from './ResultModal/SyncCelebration'; // Import the new component

interface ResultsModalProps {
  score: number;
  onReview: () => void;
  onTerminate: () => void;
  onRestart: () => void;
}

export const ResultsModal = ({ score, onReview, onTerminate, onRestart }: ResultsModalProps) => {
  // 🚀 New State: Phase Controller
  const [phase, setPhase] = useState<'syncing' | 'display'>('syncing');

  // 🧠 Ego-Boosting Rank Data
  const getRankData = () => {
    if (score === 100) return { 
        title: "GOD Of Science • THE LEGEND", 
        sub: "SUPER INTELLIGENT. STATUS: UNTOUCHABLE.🔥🔥",
        color: "text-yellow-400", 
        border: "border-yellow-500/50",
        bg: "bg-yellow-400/10",
        glow: "shadow-[0_0_50px_rgba(250,204,21,0.4)]"
    };
    if (score >= 80) return { 
        title: "ELITE SCHOLAR", 
        sub: "Booyeah. The Ultimate Pro",
        color: "text-emerald-400", 
        border: "border-emerald-500/50",
        bg: "bg-emerald-400/10",
        glow: "shadow-[0_0_50px_rgba(16,185,129,0.3)]"
    };
    if (score >= 70) return { 
        title: "PROFESSIONAL", 
        sub: "ALMOST INTELLIGENT. TOO CLOSE TO QUIT NOW, RIGHT?",
        color: "text-cyan-400", 
        border: "border-cyan-500/40",
        bg: "bg-cyan-400/10",
        glow: "shadow-[0_0_50px_rgba(34,211,238,0.2)]"
    };
    if (score >= 60) return { 
        title: "EXPERT", 
        sub: "Science Buster. BUT CAN YOU HANDLE A REAL CHALLENGE?",
        color: "text-blue-400", 
        border: "border-blue-500/30",
        bg: "bg-blue-400/10",
        glow: "shadow-[0_0_50px_rgba(59,130,246,0.2)]"
    };
    if (score >= 50) return { 
        title: "SURVIVOR", 
        sub: "50/50 SPLIT. LET'S BOOM THE NEXT ROUND.",
        color: "text-indigo-400", 
        border: "border-indigo-500/30",
        bg: "bg-indigo-400/10",
        glow: "shadow-[0_0_40px_rgba(99,102,241,0.2)]"
    };
    if (score >= 40) return { 
        title: "THANOS",
        sub: "Failure is the Shadow of Success",
        color: "text-orange-400", 
        border: "border-orange-500/20",
        bg: "bg-orange-400/10",
        glow: "shadow-[0_0_30px_rgba(251,146,60,0.1)]"
    };
    return { 
        title: "DON'T GIVE UP", 
        sub: "A GENIUS ALWAYS LEARNS FROM MISTAKES",
        color: "text-red-400", 
        border: "border-red-500/20",
        bg: "bg-red-400/10",
        glow: "shadow-[0_0_30px_rgba(248,113,113,0.1)]"
    };
  };

  const rank = getRankData();

  return (
    <AnimatePresence mode="wait">
      {phase === 'syncing' ? (
        /* PHASE 1: M.O.A.N.A. CELEBRATION (Intro, Voices, Firecrackers) */
        <SyncCelebration 
          key="sync-celebration" 
          score={score} 
          onComplete={() => setPhase('display')} 
        />
      ) : (
        /* PHASE 2: FINAL RESULT CARD (Your original holder) */
        <motion.div 
          key="result-display"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617]/98 backdrop-blur-3xl p-4 overflow-hidden"
        >
          {/* Subtle Happy Hormone Glow in the background */}
          <div className={`absolute inset-0 opacity-10 ${rank.bg} animate-pulse pointer-events-none`} />

          <motion.div 
            initial={{ scale: 0.5, y: 100, opacity: 0 }} 
            animate={{ scale: 1, y: 0, opacity: 1 }} 
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            className={`bg-slate-950 border ${rank.border} p-8 md:p-10 rounded-[2.5rem] max-w-md w-full text-center relative ${rank.glow} overflow-hidden`}
          >
            {/* Sub-Components Orchestration */}
            <RankBadge title={rank.title} color={rank.color} bg={rank.bg} />
            
            <ScoreDisplay score={score} color={rank.color} />
            
            <div className="space-y-2 mb-10 relative z-10">
                <h3 className={`text-xl font-black uppercase tracking-tight drop-shadow-md ${rank.color}`}>
                    {rank.sub}
                </h3>
                <div className="flex justify-center gap-4 opacity-30">
                    <div className="h-[1px] w-8 bg-white self-center" />
                    <p className="text-[10px] text-white uppercase font-black tracking-[0.4em]">
                        Neural Index Updated
                    </p>
                    <div className="h-[1px] w-8 bg-white self-center" />
                </div>
            </div>

            <ActionButtons 
              score={score} 
              onRestart={onRestart} 
              onReview={onReview} 
              onTerminate={onTerminate} 
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Home, Sparkles, PlayCircle } from 'lucide-react';

interface ResultsModalProps {
  score: number;
  onReview: () => void;
  onTerminate: () => void;
  onRestart: () => void; // Added for the next round functionality
}

export const ResultsModal = ({ score, onReview, onTerminate, onRestart }: ResultsModalProps) => {
  
  const getRank = () => {
    if (score === 100) return { title: "NEURAL GENIUS", color: "text-yellow-400", bg: "bg-yellow-400/10" };
    if (score >= 80) return { title: "ELITE SCHOLAR", color: "text-emerald-400", bg: "bg-emerald-400/10" };
    if (score >= 50) return { title: "ADVANCED BOTANIST", color: "text-green-400", bg: "bg-green-400/10" };
    return { title: "INITIATE LEVEL", color: "text-slate-400", bg: "bg-slate-400/10" };
  };

  const rank = getRank();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/95 backdrop-blur-2xl p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20, opacity: 0 }} 
        animate={{ scale: 1, y: 0, opacity: 1 }} 
        className="bg-slate-900 border border-emerald-500/20 p-8 md:p-10 rounded-[3rem] max-w-md w-full text-center relative shadow-[0_0_50px_rgba(16,185,129,0.1)]"
      >
        {/* Decorative Top Bar - Green Gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />

        {/* Rank Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${rank.bg} ${rank.color} mb-6 border border-current/20`}>
          <Sparkles size={14} />
          <span className="text-[10px] font-black tracking-[0.2em] uppercase">{rank.title}</span>
        </div>

        {/* Trophy Icon */}
        <div className="w-20 h-20 bg-emerald-500/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20 rotate-3 hover:rotate-0 transition-transform duration-500">
          <Trophy size={40} className={rank.color} /> 
        </div>

        {/* Score Display */}
        <div className="mb-2">
          <span className="text-8xl font-black text-white tracking-tighter italic">
            {score}
          </span>
          <span className="text-2xl font-black text-emerald-500 ml-1">%</span>
        </div>
        
        <p className="text-[10px] text-emerald-100/60 mb-10 uppercase font-bold tracking-[0.3em] leading-relaxed">
          Botany Proficiency <br/> Sync Complete
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-3">
          {/* PRIMARY BUTTON: NEXT ROUND */}
          <button 
            onClick={onRestart} 
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 active:scale-95 group"
          >
            <PlayCircle size={16} className="group-hover:scale-110 transition-transform" /> 
            Initialize Next Round
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={onReview} 
              className="py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-bold text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw size={14} /> 
              Review
            </button>
            
            <button 
              onClick={onTerminate} 
              className="py-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
            >
              <Home size={14} /> 
              Exit
            </button>
          </div>
        </div>

        {/* Subtle Bottom Glow */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-20 bg-emerald-500/10 blur-[50px] pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};
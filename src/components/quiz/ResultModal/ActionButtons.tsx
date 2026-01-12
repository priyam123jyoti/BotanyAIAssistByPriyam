import React from 'react';
import { PlayCircle, Brain, Target } from 'lucide-react';

interface ActionButtonsProps {
  score: number;
  onRestart: () => void;
  onReview: () => void;
  onTerminate: () => void;
}

export const ActionButtons = ({ score, onRestart, onReview, onTerminate }: ActionButtonsProps) => (
  <div className="grid grid-cols-1 gap-4">
    <button 
      onClick={onRestart} 
      className={`group relative overflow-hidden py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all active:scale-95 shadow-2xl
        ${score >= 70 ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400' : 'bg-slate-800 text-white hover:bg-slate-700'}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-center justify-center gap-3 relative z-10">
        <PlayCircle size={20} /> 
        CLAIM NEXT ROUND
      </div>
      {score >= 70 && <div className="absolute inset-0 bg-emerald-400 animate-ping opacity-10 pointer-events-none" />}
    </button>

    <div className="grid grid-cols-2 gap-3">
      <button onClick={onReview} className="py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white/70 font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2">
        <Brain size={14} /> Re-Analyze
      </button>
      <button onClick={onTerminate} className="py-4 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 text-red-400/70 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2">
        <Target size={14} /> Abort
      </button>
    </div>
  </div>
);
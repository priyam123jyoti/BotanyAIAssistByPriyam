import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle, XCircle, Leaf } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

interface QuizInterfaceProps {
  question: Question;
  currentIdx: number;
  totalQuestions: number;
  userAnswer: number;
  isRecap: boolean;
  onAnswer: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onFinish: () => void;
}

export const QuizInterface = ({
  question,
  currentIdx,
  totalQuestions = 10,
  userAnswer,
  isRecap,
  onAnswer,
  onNext,
  onPrev,
  onFinish
}: QuizInterfaceProps) => {

  const getOptionStyle = (index: number) => {
    const isSelected = userAnswer === index;
    const isCorrect = question.correct === index;

    if (isRecap) {
      if (isCorrect) return "border-emerald-500 bg-emerald-500/15 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] z-10 scale-[1.02]";
      if (isSelected && !isCorrect) return "border-red-500 bg-red-500/10 text-red-400 opacity-90";
      return "border-white/10 bg-slate-800/40 text-slate-400 opacity-60"; 
    }

    if (isSelected) return "border-emerald-400 bg-emerald-400/10 text-emerald-50 shadow-[0_0_15px_rgba(52,211,153,0.2)] scale-[1.02]";
    return "border-white/10 hover:bg-emerald-500/5 hover:border-emerald-500/30 text-slate-300";
  };

  return (
    <div className="min-h-screen bg-[#020617] p-6 flex items-center justify-center font-mono selection:bg-emerald-500/30">
      {/* Subtle Background Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-3xl w-full bg-slate-900/40 border border-emerald-500/10 rounded-[2.5rem] p-8 md:p-12 relative shadow-2xl backdrop-blur-xl overflow-hidden">
        
        {/* PROGRESS BAR */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
          <motion.div 
            className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-green-300" 
            animate={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-2">
            <Leaf size={14} className="text-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-emerald-500 tracking-[0.2em] uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              {isRecap ? "Neural Review" : "Botanical Sync"}
            </span>
          </div>
          <span className="text-[10px] text-emerald-200/50 font-bold tracking-widest uppercase">
            Module {currentIdx + 1} <span className="text-emerald-900">|</span> {totalQuestions}
          </span>
        </div>

        {/* QUESTION TEXT */}
        <AnimatePresence mode='wait'>
          <motion.h2 
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-xl md:text-2xl font-bold text-white mb-10 leading-relaxed tracking-tight min-h-[80px]"
          >
            {question.question}
          </motion.h2>
        </AnimatePresence>

        {/* OPTIONS GRID */}
        <div className="grid grid-cols-1 gap-3 mb-12">
          {question.options.map((opt, i) => (
            <button
              key={i}
              disabled={isRecap}
              onClick={() => onAnswer(i)}
              className={`w-full p-5 rounded-2xl border text-left text-sm font-medium transition-all duration-300 flex justify-between items-center group ${getOptionStyle(i)}`}
            >
              <div className="flex items-center gap-4">
                <span className={`text-[10px] font-bold uppercase tracking-widest w-7 h-7 rounded-lg flex items-center justify-center border transition-colors ${userAnswer === i ? 'border-emerald-400 bg-emerald-400 text-slate-950' : 'border-white/10 text-emerald-500/50'}`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="leading-tight">{opt}</span>
              </div>
              
              {isRecap && (
                <div className="flex gap-2">
                  {question.correct === i && <CheckCircle size={20} className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />}
                  {userAnswer === i && question.correct !== i && <XCircle size={20} className="text-red-500" />}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* EXPLANATION BOX */}
        <AnimatePresence>
          {isRecap && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="p-6 bg-emerald-950/20 rounded-2xl border border-emerald-500/20 text-[12px] text-emerald-100/80 mb-8 leading-relaxed shadow-inner"
            >
              <span className="text-emerald-400 font-black tracking-[0.3em] uppercase text-[9px] block mb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"/> AI Botanical Analysis
              </span> 
              {question.explanation || "System analysis complete. No further anomalies detected in this node."}
            </motion.div>
          )}
        </AnimatePresence>

        {/* FOOTER NAVIGATION */}
        <div className="flex justify-between items-center pt-8 border-t border-emerald-500/10">
          <button 
            disabled={currentIdx === 0} 
            onClick={onPrev} 
            className="flex items-center gap-2 px-4 py-2 text-emerald-500/50 hover:text-emerald-400 disabled:opacity-0 transition-all text-xs font-bold tracking-[0.2em] uppercase"
          >
            <ChevronLeft size={16} /> Previous
          </button>
          
          {currentIdx === totalQuestions - 1 ? (
            <button 
              onClick={onFinish} 
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              {isRecap ? "Terminate Review" : "Finalize Sync"} <ChevronRight size={14} />
            </button>
          ) : (
            <button 
              onClick={onNext} 
              className="flex items-center gap-2 px-8 py-4 bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 transition-all text-[10px] font-black tracking-[0.3em] uppercase"
            >
              Next <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateBotanyQuiz } from '../services/jarvisAI';
import { ArrowLeft, Beaker, Trophy, CheckCircle, XCircle, RotateCcw, Home, ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 1. TOPICS ARRAY DEFINED OUTSIDE THE COMPONENT
const TOPICS = [
  { name: "Plant Anatomy", icon: "🌱" },
  { name: "Plant Physiology", icon: "💧" },
  { name: "Biochemistry", icon: "🧪" },
  { name: "Molecular Biology", icon: "🔬" },
  { name: "Genetics", icon: "🧬" },
  { name: "Plant Taxonomy", icon: "🏷️" },
  { name: "Angiosperms", icon: "🌸" },
  { name: "Gymnosperms", icon: "🌲" },
  { name: "Pteridophytes", icon: "🌿" },
  { name: "Bryophytes", icon: "🌱" },
  { name: "Mycology", icon: "🍄" },
  { name: "Phycology (Algae)", icon: "🌊" },
  { name: "Microbiology", icon: "🧫" },
  { name: "Plant Pathology", icon: "🍂" },
  { name: "Ethnobotany", icon: "🏺" },
  { name: "Economic Botany", icon: "💰" },
  { name: "Plant Biotechnology", icon: "⚙️" },
  { name: "Ecology & Evolution", icon: "🌎" },
  { name: "Bioinformatics", icon: "💻" },
  { name: "Palynology", icon: "🌾" }
];

export default function BotanyQuiz() {
  const navigate = useNavigate();
  
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>(new Array(10).fill(-1));
  const [loading, setLoading] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [isRecapMode, setIsRecapMode] = useState(false);

  const startQuiz = async (topic: string) => {
    setLoading(true);
    setSelectedTopic(topic);
    try {
      const data = await generateBotanyQuiz(topic);
      if (data && data.length > 0) {
        setQuestions(data);
        setCurrentIdx(0);
        setUserAnswers(new Array(10).fill(-1));
        setIsRecapMode(false);
        setShowResultsModal(false);
      }
    } catch (err) {
      console.error(err);
      alert("Neural Link Failed. Try again.");
      setSelectedTopic(null);
    } finally {
      setLoading(false);
    }
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, ans, idx) => 
      ans === questions[idx]?.correct ? score + 1 : score, 0
    );
  };

  const scorePercentage = (calculateScore() / 10) * 100;

  // --- LOADING SCREEN ---
  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center font-mono text-sky-500">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
        <Beaker size={40} />
      </motion.div>
      <p className="mt-4 animate-pulse tracking-widest text-xs uppercase">Initializing {selectedTopic} Data...</p>
    </div>
  );

  // --- TOPIC SELECTION ---
  if (!selectedTopic) return (
    <div className="min-h-screen bg-[#020617] p-8 text-white font-mono">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate('/jarvis-gateway')} className="mb-12 flex items-center gap-2 text-slate-200 font-bold hover:text-sky-400 transition-all text-xs tracking-widest">
          <ArrowLeft size={16} /> RETURN_TO_LAB
        </button>
        
        <h1 className="text-2xl font-black mb-8 text-green-600 tracking-tighter">SELECT KNOWLEDGE MODULE</h1>
        
        {/* Updated grid for 20 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-20">
          {TOPICS.map((topic) => (
            <button 
              key={topic.name} 
              onClick={() => startQuiz(topic.name)} 
              className="p-8 bg-slate-800/50 border border-green-600 rounded-3xl hover:border-sky-500/50 hover:bg-sky-500/5 transition-all text-left group"
            >
              <div className="text-2xl mb-2">{topic.icon}</div>
              <div className="text-[10px] text-green-400 mb-1 font-bold uppercase tracking-widest group-hover:text-sky-500">Module</div>
              <h3 className="font-bold uppercase text-white group-hover:tracking-widest transition-all text-sm">{topic.name}</h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // --- QUIZ INTERFACE ---
  const q = questions[currentIdx];
  if (!q) return null;

  return (
    <div className="min-h-screen bg-[#020617] p-6 flex items-center justify-center font-mono">
      <div className="max-w-2xl w-full bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 md:p-12 relative shadow-2xl overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
          <motion.div className="h-full bg-sky-500" animate={{ width: `${(currentIdx + 1) * 10}%` }} />
        </div>

        <div className="flex justify-between items-center mb-10">
          <span className="text-[10px] font-bold text-sky-500 tracking-widest uppercase">
            {isRecapMode ? "Neural Review" : `Protocol: ${selectedTopic}`}
          </span>
          <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Index {currentIdx + 1}/10</span>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-white mb-10 leading-relaxed tracking-tight">{q.question}</h2>

        <div className="space-y-3 mb-12">
          {q.options.map((opt: string, i: number) => {
            const isUserChoice = userAnswers[currentIdx] === i;
            const isCorrect = q.correct === i;
            let style = "border-white/5 bg-white/5 text-slate-400";
            if (!isRecapMode && isUserChoice) style = "border-sky-500 bg-sky-500/10 text-white shadow-[0_0_15px_rgba(14,165,233,0.1)]";
            if (isRecapMode) {
              if (isCorrect) style = "border-emerald-500 bg-emerald-500/20 text-emerald-400 font-bold";
              else if (isUserChoice && !isCorrect) style = "border-red-500 bg-red-500/20 text-red-400";
            }
            return (
              <button
                key={i}
                disabled={isRecapMode}
                onClick={() => {
                  const a = [...userAnswers];
                  a[currentIdx] = i;
                  setUserAnswers(a);
                }}
                className={`w-full p-4 rounded-2xl border text-left text-sm transition-all flex justify-between items-center ${style}`}
              >
                <span>{opt}</span>
                {isRecapMode && isCorrect && <CheckCircle size={18} className="text-emerald-500" />}
                {isRecapMode && isUserChoice && !isCorrect && <XCircle size={18} className="text-red-500" />}
              </button>
            );
          })}
        </div>

        {isRecapMode && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-sky-500/5 rounded-2xl border border-sky-500/20 text-[11px] text-slate-300 italic mb-8 leading-relaxed">
            <span className="text-sky-500 font-bold not-italic tracking-widest uppercase text-[9px] block mb-1">Jarvis Explanation:</span> 
            {q.explanation}
          </motion.div>
        )}

        <div className="flex justify-between items-center pt-8 border-t border-white/5">
          <button disabled={currentIdx === 0} onClick={() => setCurrentIdx(c => c - 1)} className="p-3 text-slate-500 hover:text-white disabled:opacity-0 transition-all">
             <ChevronLeft size={20} />
          </button>
          
          {currentIdx === 9 ? (
            <button onClick={() => setShowResultsModal(true)} className="bg-sky-500 text-slate-950 px-10 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-sky-500/20 hover:scale-105 transition-all">
              {isRecapMode ? "Close Review" : "Generate Score"}
            </button>
          ) : (
            <button onClick={() => setCurrentIdx(c => c + 1)} className="p-3 text-slate-500 hover:text-white transition-all">
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showResultsModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/98 backdrop-blur-xl p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-slate-900 border border-white/10 p-12 rounded-[3.5rem] max-w-md w-full text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-sky-500/20" />
              <div className="w-16 h-16 bg-sky-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-sky-500/20">
                <Trophy size={32} className="text-sky-500" /> 
              </div>
              <h2 className="text-[10px] font-black text-sky-500 uppercase tracking-[0.5em] mb-2">Assessment Complete</h2>
              <div className="text-7xl font-black text-white mb-4 tracking-tighter italic">{scorePercentage}<span className="text-sky-500 text-3xl">%</span></div>
              <p className="text-xs text-slate-500 mb-10 max-w-[200px] mx-auto leading-relaxed uppercase font-bold tracking-widest">Botany Proficiency Index</p>
              
              <div className="grid grid-cols-1 gap-3">
                <button onClick={() => { setIsRecapMode(true); setShowResultsModal(false); setCurrentIdx(0); }} className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-3">
                  <RotateCcw size={14} /> Review Neural Data
                </button>
                <button onClick={() => navigate('/jarvis-gateway')} className="w-full py-4 bg-sky-500 text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-sky-500/20 flex items-center justify-center gap-3">
                  <Home size={14} /> Terminate Session
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
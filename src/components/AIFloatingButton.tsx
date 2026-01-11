import { motion } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AIFloatingButton() {
  const navigate = useNavigate();

  const robotColors = [
    "#10b981", "#34d399", "#60a5fa", "#818cf8", "#a78bfa",
    "#fb7185", "#fb923c", "#facc15", "#22d3ee", "#ffffff"
  ];

  return (
    /* Fixed Container */
    <div className="fixed bottom-24 right-6 z-[100]">
      
      {/* 1. Bio-Luminescent Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-500 blur-2xl rounded-full"
      />

      {/* 2. The Main Button */}
      <motion.button
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => navigate('/jarvis-gateway')}
        className="relative group flex items-center gap-3 bg-slate-950/80 backdrop-blur-xl p-2 pr-6 rounded-full border border-white/20 shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:shadow-[0_0_50px_rgba(16,185,129,0.4)] transition-all duration-500"
      >
        {/* Animated Icon Container */}
        <div className="relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-teal-300 rounded-full opacity-20 blur-sm"
          />
          <div className="relative bg-gradient-to-br from-emerald-600 to-teal-700 p-3 rounded-full shadow-inner">
            <motion.div
              animate={{ color: robotColors }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex items-center justify-center"
            >
              <Bot size={22} />
            </motion.div>
          </div>
          
          <motion.div
            animate={{ y: [-10, 10, -10], x: [-1, 1, -1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-md"
          >
            <Sparkles size={10} className="text-emerald-600" />
          </motion.div>
        </div>

        {/* Static Text Label */}
        <div className="flex flex-col items-start leading-none">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em] mb-1">
            Research AI
          </span>
          <span className="text-sm font-medium text-slate-200">
            Meet Jarvis
          </span>
        </div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <motion.div 
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.8 }}
            className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
        </div>
      </motion.button>
    </div>
  );
}
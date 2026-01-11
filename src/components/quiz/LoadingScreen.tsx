import React from 'react';
import { motion } from 'framer-motion';
import { Beaker } from 'lucide-react';

interface Props {
  topic: string | null;
}

export const LoadingScreen = ({ topic }: Props) => (
  <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center font-mono text-sky-500">
    <div className="relative">
      {/* Spinning Outer Ring */}
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        className="absolute inset-0 border-2 border-t-sky-500 border-r-transparent border-b-sky-500/30 border-l-transparent rounded-full w-24 h-24 -m-6"
      />
      
      {/* Inner Icon */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }} 
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Beaker size={48} className="text-emerald-500" />
      </motion.div>
    </div>

    <h2 className="mt-12 text-xl font-black text-white tracking-widest uppercase">
      Accessing Neural Link
    </h2>
    <p className="mt-2 text-xs text-sky-500/70 font-bold tracking-[0.3em] uppercase animate-pulse">
      Generating {topic || "Module"} Protocol...
    </p>
  </div>
);
import React, { useState, useMemo, memo } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Topic } from './constants'; // Import the type we defined in Step 1

// --- 1. SUB-COMPONENT: TOPIC CARD (STYLING PRESERVED) ---
interface TopicCardProps {
  name: string;
  icon: string;
  onClick: (topic: string) => void;
}

const TopicCard = memo(({ name, icon, onClick }: TopicCardProps) => (
  <motion.button
    layout
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    whileHover={{ scale: 1.02, backgroundColor: "rgba(14, 165, 233, 0.05)" }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onClick(name)}
    className="relative p-6 bg-slate-800/50 border border-green-600/30 rounded-3xl hover:border-sky-500/50 transition-colors text-left group overflow-hidden"
  >
    {/* Jarvis Scanline Effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    
    <div className="text-3xl mb-3 filter drop-shadow-lg">{icon}</div>
    <div className="text-[10px] text-green-500/80 mb-1 font-bold uppercase tracking-widest group-hover:text-sky-400 transition-colors">
      Module
    </div>
    <h3 className="font-bold uppercase text-slate-100 group-hover:text-white group-hover:tracking-wider transition-all duration-300 text-sm">
      {name}
    </h3>
  </motion.button>
));

TopicCard.displayName = 'TopicCard';

// --- 2. MAIN COMPONENT (STYLING PRESERVED) ---
interface TopicSelectionProps {
  subjectTitle: string; // New: e.g., "PHYSICS"
  topics: Topic[];      // New: The dynamic list
  onStart: (topic: string) => void;
  onBack: () => void;
}

export const TopicSelection = ({ subjectTitle, topics, onStart, onBack }: TopicSelectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter based on the specific topics passed in
  const filteredTopics = useMemo(() => {
    if (!searchQuery) return topics;
    return topics.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, topics]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] p-6 md:p-12 text-white font-mono selection:bg-sky-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <button 
              onClick={onBack} 
              className="group flex items-center gap-2 text-slate-400 font-bold hover:text-sky-400 transition-all text-xs tracking-[0.2em] mb-4"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
              RETURN_TO_LAB
            </button>
            <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-700 tracking-tighter uppercase">
              {subjectTitle} Modules
            </h1>
          </div>

          {/* SEARCH BAR */}
          <div className="relative group w-full md:w-96">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-500 group-focus-within:text-sky-500 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="SEARCH DATABASE..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 rounded-full py-4 pl-12 pr-6 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 transition-all placeholder:text-slate-600 uppercase"
            />
          </div>
        </div>

        {/* GRID SECTION */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pb-20"
        >
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic) => (
              <TopicCard 
                key={topic.name} 
                name={topic.name} 
                icon={topic.icon} 
                onClick={onStart} 
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20 opacity-50">
              <p className="text-sky-500 font-bold tracking-widest uppercase text-xs">No matching data found in archives.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
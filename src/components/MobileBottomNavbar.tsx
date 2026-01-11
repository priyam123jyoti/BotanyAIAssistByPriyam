import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Globe, Image, Briefcase, BookOpen } from 'lucide-react';

export default function MobileBottomNavbar() {
  const [active, setActive] = useState('Home');

  const tabs = [
    { name: 'Home', icon: Home },
    { name: 'Study Abroad', icon: Globe },
    { name: 'Albums', icon: Image },
    { name: 'Career Hub', icon: Briefcase },
    { name: 'Books', icon: BookOpen },
  ];

  return (
    <div className="md:hidden fixed bottom-2 left-0 right-0 px-6 z-[100]">
      <div className="bg-white/80 backdrop-blur-xl border border-emerald-100 shadow-2xl shadow-emerald-900/10 rounded-[2rem] px-4 py-3 flex justify-between items-center relative">
        
        {tabs.map((tab) => {
          const isActive = active === tab.name;
          const Icon = tab.icon;

          return (
            <button
              key={tab.name}
              onClick={() => setActive(tab.name)}
              className="relative flex flex-col items-center justify-center w-12 h-10 transition-colors duration-300"
            >
              {/* Active Background Glow */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-emerald-50 rounded-2xl"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}

              <Icon 
                size={20} 
                className={`relative z-10 transition-colors duration-300 ${
                  isActive ? 'text-emerald-700' : 'text-purple-700'
                }`} 
              />
              
              {isActive && (
                <motion.span 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[8px] font-bold text-emerald-800 uppercase tracking-widest mt-1 relative z-10"
                >
                  {tab.name}
                </motion.span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
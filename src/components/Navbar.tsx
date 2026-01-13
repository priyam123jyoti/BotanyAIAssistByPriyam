import { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, ChevronDown, Globe } from 'lucide-react';
import { supabase } from '../supabase'; 
import { useAuth } from '../contexts/AuthProvider'; 

export default function Navbar({ user: propUser }: { user: any }) {
  const [activeTab, setActiveTab] = useState('Home');
  const { user: contextUser } = useAuth(); 
  
  const user = propUser || contextUser;

  const handleAuth = async () => {
    if (user) {
      // 1. Sign out and stay on the current page
      await supabase.auth.signOut(); 
    } else {
      // 2. Sign in and return specifically to the HOME page (root)
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // Changed from '/jarvis-gateway' to just the base origin (Home)
          redirectTo: window.location.origin, 
        },
      });
    }
  };

  const navLinks = [
    { name: 'Home', hasDropdown: false },
    { name: 'Study Abroad', hasDropdown: false },
    { name: 'Albums', hasDropdown: true },
    { name: 'Career Hub', hasDropdown: false },
    { name: 'Books', hasDropdown: false },
  ];

  return (
    <nav className="w-full flex items-center justify-between px-8 py-6 bg-transparent font-sans relative z-50">
      
      {/* 1. Left Side: Botanical Logo */}
      <div className="flex items-center gap-2 cursor-pointer group">
        <div className="p-2 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition-colors">
          <Leaf className="text-emerald-700" size={24} />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-xl font-bold text-emerald-950 tracking-tight font-display">
            Botany<span className="text-emerald-600">Rise</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-emerald-600/80 font-semibold">
            Research & Nature
          </span>
        </div>
      </div>

      {/* 2. Center: The "Greenhouse" Glass Pill Menu */}
      <div className="hidden md:flex items-center bg-white/60 backdrop-blur-xl px-1.5 py-1.5 rounded-full shadow-lg shadow-emerald-100/50 border border-emerald-100/50">
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => setActiveTab(link.name)}
            className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              activeTab === link.name ? 'text-white' : 'text-emerald-800 hover:text-emerald-600'
            }`}
          >
            {activeTab === link.name && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-linear-to-r from-emerald-600 to-green-600 rounded-full shadow-md shadow-emerald-200"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ zIndex: -1 }} 
              />
            )}
            <span className="flex items-center gap-1 z-10 relative">
              {link.name}
              {link.hasDropdown && <ChevronDown size={14} className={activeTab === link.name ? "text-emerald-100" : "text-emerald-400"} />}
            </span>
          </button>
        ))}
        <div className="w-px h-5 bg-emerald-200/50 mx-2"></div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50 rounded-full transition-colors">
          <Globe size={16} className="text-emerald-600" />
          <span>EN</span>
          <ChevronDown size={14} className="opacity-50" />
        </button>
      </div>

      {/* 3. Right Side: Premium Action Button */}
      <div>
        <button
          onClick={handleAuth}
          className="bg-emerald-900 text-emerald-50 text-sm font-medium px-6 py-2.5 rounded-full shadow-lg shadow-emerald-900/20 border border-emerald-800 transition-all duration-300 ease-in-out hover:bg-emerald-800 hover:scale-105 hover:shadow-xl hover:shadow-emerald-900/30 cursor-pointer flex items-center gap-2"
        >
          {user ? 'Logout' : 'Login / Register'}
        </button>
      </div>

    </nav>
  );
}
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// 1. Page Imports
import Home from './pages/Home';
import JarvisGateway from './pages/JarvisGateway'; 
import BotanyQuiz from './pages/BotanyQuiz';  // ADD THIS
import AIHub from './pages/AIHub'; 

export default function App() {
  const location = useLocation();

  return (
    <div className="bg-[#020617] min-h-screen selection:bg-emerald-500/30">
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          
          {/* Main Home Page */}
          <Route path="/" element={<Home />} />

          {/* STEP 1: The 4-Card Selection Page */}
          <Route path="/jarvis-gateway" element={<JarvisGateway />} />

          {/* STEP 2: The New Specialized Modes */}
          <Route path="/quiz" element={<BotanyQuiz />} />

          {/* Original AI Hub (if you still use it) */}
          <Route path="/ai-hub" element={<AIHub />} />

        </Routes>
      </AnimatePresence>

    </div>
  );
}
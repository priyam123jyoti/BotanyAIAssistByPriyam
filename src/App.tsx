import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './contexts/AuthProvider'; 

// Page Imports
import Home from './pages/Home';
import JarvisGateway from './pages/JarvisGateway'; 
import BotanyQuiz from './pages/BotanyQuiz'; 
import AIHub from './pages/AIHub'; 

export default function App() {
  const location = useLocation();
  const { user, loading } = useAuth(); // Access global auth state

  // Prevent flickering by showing a loading screen while checking session
  if (loading) {
    return (
      <div className="h-screen w-full bg-[#020617] flex flex-col items-center justify-center font-mono">
        <div className="text-emerald-500 text-xl animate-pulse tracking-[0.2em]">
          INITIALIZING NEURAL LINK...
        </div>
        <div className="w-48 h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 animate-progress origin-left"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#020617] min-h-screen selection:bg-emerald-500/30">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          
          {/* Public Route */}
          <Route path="/" element={<Home />} />
          
          {/* Main Selection Hub - Passes user to the 3D interface */}
          <Route 
            path="/jarvis-gateway" 
            element={<JarvisGateway user={user} />} 
          />
          
          {/* Protected Quiz Route - Redirects to Home if not logged in */}
          <Route 
            path="/quiz" 
            element={user ? <BotanyQuiz user={user} /> : <Navigate to="/" replace />} 
          />

          {/* AI Chat Hub */}
          <Route path="/ai-hub" element={<AIHub />} />

        </Routes>
      </AnimatePresence>
    </div>
  );
}
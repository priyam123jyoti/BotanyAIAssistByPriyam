import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './contexts/AuthProvider'; 

// Page Imports
import Home from './pages/Home';
import JarvisGateway from './pages/JarvisGateway'; 
import Quiz from './pages/Quiz'; 
import AIHub from './pages/AIHub'; 
import AffiliateStore from './pages/AffiliateStore'; // 1. Import your new page

export default function App() {
  const location = useLocation();
  const { user, loading } = useAuth();

  // 🛡️ Global Loading State (Neural Link)
  if (loading) {
    return (
      <div className="h-screen w-full bg-[#020617] flex flex-col items-center justify-center font-mono">
        <div className="text-emerald-500 text-xl flex justify-center items-center text-center animate-pulse tracking-[0.2em]">
          SynapSeed : Powered by MoanaAI
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#020617] min-h-screen selection:bg-emerald-500/30">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          
          {/* Public Landing Page */}
          <Route path="/" element={<Home user={user} />} />

          {/* 🛒 Affiliate Store (Publicly accessible for India-wide growth) */}
          <Route path="/books" element={<AffiliateStore />} />
          
          {/* Protected Laboratory Gateway */}
          <Route 
            path="/jarvis-gateway" 
            element={user ? <JarvisGateway user={user} /> : <Navigate to="/" replace />} 
          />
          
          {/* 🚀 QUIZ ROUTE */}
          <Route 
            path="/quiz" 
            element={user ? <Quiz user={user} /> : <Navigate to="/" replace />} 
          />

          {/* AI Career & Research Hub */}
          <Route 
            path="/ai-hub" 
            element={user ? <AIHub /> : <Navigate to="/" replace />} 
          />

          {/* Fallback Redirects */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </AnimatePresence>
    </div>
  );
}
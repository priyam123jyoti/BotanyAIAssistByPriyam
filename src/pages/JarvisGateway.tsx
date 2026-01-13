import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion'; 
import type { User } from '@supabase/supabase-js';
import { 
  Microscope, 
  Trophy, 
  Globe2, 
  ArrowLeft, 
  Sparkles,
  BookOpen,
  LogOut, // Added for a sign-out button
  type LucideIcon 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase'; // Import your supabase client

import BackgroundAIModel from '../components/BackgroundAIModel';

// 1. Props Interface
interface JarvisGatewayProps {
  user: User | null;
}

// 2. Modes Configuration
interface Mode {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  path: string; 
}

const MODES: Mode[] = [
  { id: 'careers', title: "Physics Quiz", desc: "Time is Absolute?", icon: Microscope, color: "from-emerald-500 to-teal-400", path: "/careers" },
  { id: 'abroad', title: "Chemistry Quiz", desc: "Do you fear exceptions?", icon: Globe2, color: "from-blue-500 to-cyan-400", path: "/abroad-hub" },
  { id: 'quiz', title: "Botany Quiz", desc: "Not all green is Chlorophyll", icon: Trophy, color: "from-amber-500 to-orange-400", path: "/quiz" },
  { id: 'study-plan', title: "Zoology", desc: "Adaptation is intentional", icon: BookOpen, color: "from-purple-500 to-pink-400", path: "/study-hub" }

];

// 3. Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 1.0 } }, // Reduced delay for better feel
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95, filter: "blur(15px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", damping: 20, stiffness: 80 } },
};

// 4. Main Component
export default function JarvisGateway({ user }: JarvisGatewayProps) {
  const navigate = useNavigate();

  // Logic to handle sign out
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  // Get user name from Google Metadata
  const userName = user?.user_metadata?.full_name || "Guest Researcher";

  return (
    <div className="relative min-h-screen bg-[#020617] overflow-hidden flex flex-col">
      
      {/* LAYER 0: 3D ROBOT BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#10b981" />
          <Suspense fallback={null}>
            <BackgroundAIModel />
            <Environment preset="city" />
            <ContactShadows opacity={0.4} scale={10} blur={2} far={4.5} />
          </Suspense>
        </Canvas>
      </div>

      <div className="fixed inset-0 z-[1] bg-gradient-to-b from-[#020617]/40 via-transparent to-[#020617]" />

      <div className="relative z-10 flex-1 flex flex-col p-6 max-w-5xl mx-auto w-full font-sans">
        
        {/* Header Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8 pt-4"
        >
          <button 
            onClick={() => navigate('/')} 
            className="p-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl hover:bg-white/20 transition-all group"
          >
            <ArrowLeft size={20} className="text-white group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <div className="flex items-center gap-4">
             <div className="text-right">
                <h1 className="text-2xl font-black text-white tracking-tighter italic uppercase">
                  MOANA <span className="text-emerald-500 underline decoration-double underline-offset-4">LABS</span>
                </h1>
                <p className="text-[10px] font-bold text-emerald-500/50 uppercase tracking-[0.3em]">
                  {user ? `Active: ${userName}` : "Protocol Selection"}
                </p>
             </div>
             {user && (
               <button onClick={handleSignOut} className="p-2 text-white/50 hover:text-red-400 transition-colors">
                 <LogOut size={18} />
               </button>
             )}
          </div>
        </motion.nav>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">           
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Select Research Mode
            </span>
          </h2>
          <div className="h-1 w-16 bg-emerald-500 mt-6 rounded-full" />
        </motion.div>

        {/* Staggered Transparent Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20"
        >
          {MODES.map((mode) => (
            <motion.button
              key={mode.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5, backgroundColor: "rgba(255, 255, 255, 0.03)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(mode.path)} 
              className="group relative overflow-hidden p-6 bg-transparent backdrop-blur-md border border-white/10 rounded-[2.5rem] text-left hover:border-emerald-500/40 transition-all duration-500"
            >
              <div className="flex items-start gap-5 relative z-10">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${mode.color} shadow-lg shadow-emerald-500/10 group-hover:rotate-6 transition-transform duration-300`}>
                  <mode.icon size={26} className="text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {mode.title}
                    <Sparkles size={14} className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-slate-300/80 mt-1 leading-tight">{mode.desc}</p>
                </div>
              </div>
              <div className={`absolute -right-6 -bottom-6 w-32 h-32 bg-gradient-to-br ${mode.color} blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
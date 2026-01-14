import { useAuth } from '../contexts/AuthProvider'; 
import Navbar from '../components/Navbar'; 
import Chloroplast3D from '../components/Chloroplast3D';
import RightPanel from '../components/RightPanel';
import MobileBottomNavbar from '../components/MobileBottomNavbar';
import AIFloatingButton from '../components/AIFloatingButton';
import type { User } from '@supabase/supabase-js';

interface HomeProps {
  user: User | null;
}

export default function Home({ user: propUser }: HomeProps) {
  const { user: contextUser, loading } = useAuth();
  
  const user = propUser || contextUser;

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#020617] flex flex-col items-center p-5 justify-center font-mono text-center px-4">
        <div className="text-emerald-500 flex w-full justify-center items-center text-center text-xl animate-pulse tracking-[0.2em] mb-2">
          SYNAPSEED : POWERED BY MOANA
        </div>
        <div className="text-emerald-500/40 flex w-full justify-center items-center text-center flex-wrap text-[10px] uppercase tracking-widest">
          Please wait while we synchronize your neural interface...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f8fafc] flex flex-col overflow-hidden min-h-screen pb-15">
      <Navbar user={user} />
      
      <main className="flex-1 p-4 md:p-10">
        {/* Main Content Area */}
        <div className="flex flex-col xl:flex-row gap-8 max-w-[1600px] mx-auto w-full">
          
          {/* Left/Center Section: 3D Visualization and Core Panels */}
          <div className="flex-1 flex flex-col lg:flex-row gap-8">
            <div className="flex-1 min-h-[50vh] lg:min-h-[70vh]">
              <Chloroplast3D />
            </div>
            <div className="w-full lg:w-96">
              <RightPanel user={user} />
            </div>
          </div>
        </div>

   {/* Right Section: Educational Ads (Visible on Desktop) */}

      </main>
      
      <AIFloatingButton user={user} />
      <MobileBottomNavbar />
    </div>
  );
}
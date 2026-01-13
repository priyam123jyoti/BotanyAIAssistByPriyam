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
  
  // Use contextUser if propUser isn't available to ensure UI stays in sync
  const user = propUser || contextUser;

  // --- LOADING STATE ---
  // We still show the loading screen so the app can verify if you are logged in.
  // This prevents the Navbar from showing "Login" when you are actually logged in.
  if (loading) {
    return (
      <div className="h-screen w-full bg-[#020617] flex flex-col items-center justify-center font-mono text-center px-4">
        <div className="text-emerald-500 text-xl animate-pulse tracking-[0.2em] mb-2">
          SYNAPSEED : POWERED BY MOANA
        </div>
        <div className="text-emerald-500/40 text-[10px] uppercase tracking-widest">
          Synchronizing Neural Interface...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f8fafc] flex flex-col overflow-hidden min-h-screen pb-15">
      {/* Navbar will now correctly show "Logout" because we waited for 'loading' */}
      <Navbar user={user} />
      
      <main className="flex-1 p-4 md:p-10 flex flex-col md:flex-row gap-8">
        <div className={'flex flex-col w-full min-h-[70vh] gap-10 lg:flex-row'}>
           <Chloroplast3D />
           {/* RightPanel can now show user-specific data if you want */}
           <RightPanel user={user} />
        </div>
      </main>
      
      <AIFloatingButton user={user} />
      <MobileBottomNavbar />
    </div>
  );
}
// src/pages/Home.tsx
import Navbar from '../components/Navbar'; 
import Chloroplast3D from '../components/Chloroplast3D';
import RightPanel from '../components/RightPanel';
import MobileBottomNavbar from '../components/MobileBottomNavbar';
import AIFloatingButton from '../components/AIFloatingButton';
import type { User } from '@supabase/supabase-js'; // 1. Import the Type

// 2. Define the interface so TypeScript knows what "user" is
interface HomeProps {
  user: User | null;
}

// 3. Destructure 'user' from the props
export default function Home({ user }: HomeProps) {
  return (
    <div className="w-full bg-[#f8fafc] flex flex-col overflow-hidden min-h-screen pb-15">
      {/* 4. Pass the user down to child components */}
      <Navbar user={user} />
      
      <main className="flex-1 p-4 md:p-10 flex flex-col md:flex-row gap-8">
        <div className={'flex flex-col w-full min-h-[70vh] gap-10 lg:flex-row'}>
           <Chloroplast3D />
           <RightPanel user={user} />
        </div>
      </main>
      
      <AIFloatingButton user={user} />
      <MobileBottomNavbar />
    </div>
  );
}
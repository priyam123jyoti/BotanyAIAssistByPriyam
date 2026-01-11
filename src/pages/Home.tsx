// src/pages/Home.tsx
import Navbar from '../components/Navbar'; // Adjust paths as needed
import Chloroplast3D from '../components/Chloroplast3D';
import RightPanel from '../components/RightPanel';
import MobileBottomNavbar from '../components/MobileBottomNavbar';
import AIFloatingButton from '../components/AIFloatingButton';

export default function Home() {
  return (
    <div className="w-full bg-[#f8fafc] flex flex-col overflow-hidden min-h-screen pb-15">
      <Navbar />
      <main className="flex-1 p-4 md:p-10 flex flex-col md:flex-row gap-8">
        <div className={'flex flex-col w-full min-h-[70vh] gap-10 lg:flex-row'}>
           <Chloroplast3D />
           <RightPanel/>
        </div>
      </main>
      <AIFloatingButton />
      <MobileBottomNavbar />
    </div>
  );
}
import { ChevronLeft, RefreshCw } from 'lucide-react';

interface ChatHeaderProps {
  modeId: string;
  onExit: () => void;
}

export const ChatHeader = ({ modeId, onExit }: ChatHeaderProps) => (
  <header className="z-10 border-b border-sky-900/50 bg-[#020617]/80 backdrop-blur-md p-4 flex items-center justify-between">
    <button onClick={onExit} className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors group">
      <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      <span>EXIT HUB</span>
    </button>
    <div className="flex items-center gap-3">
      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      <h1 className="text-sm tracking-[0.2em] font-bold text-sky-100">
        JARVIS PROTOCOL: <span className="text-sky-400">{modeId.toUpperCase()}</span>
      </h1>
    </div>
    <button onClick={() => window.location.reload()} className="text-sky-900 hover:text-sky-400">
      <RefreshCw className="w-4 h-4" />
    </button>
  </header>
);
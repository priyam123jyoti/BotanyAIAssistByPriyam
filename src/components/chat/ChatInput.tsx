import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (text: string) => void;
  isLoading: boolean;
}

export const ChatInput = ({ onSend, isLoading }: ChatInputProps) => {
  const [input, setInput] = useState('');

  const handleAction = () => {
    if (!input.trim() || isLoading) return;
    onSend(input);
    setInput(''); // Clear input after sending
  };

  return (
    <footer className="p-4 bg-[#020617] border-t border-sky-900/30 z-10">
      <div className="max-w-4xl mx-auto relative flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAction()}
          placeholder="Upload research query or type command..."
          className="w-full bg-slate-900/50 border border-sky-900/50 rounded-full py-3 px-6 pr-14 text-sm focus:outline-none focus:border-sky-400 transition-all placeholder:text-slate-600"
          disabled={isLoading}
        />
        <button
          onClick={handleAction}
          disabled={isLoading || !input.trim()}
          className="absolute right-2 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 text-slate-900 p-2 rounded-full transition-all flex items-center justify-center"
        >
          <Send size={18} />
        </button>
      </div>
    </footer>
  );
};
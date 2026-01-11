import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { startJarvisChat } from '../services/jarvisAI';
import { Send, Bot, User, ChevronLeft, Loader2, RefreshCw } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function AIHub() {
  const location = useLocation();
  const navigate = useNavigate();
  const modeId = location.state?.mode || 'careers';
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [jarvis, setJarvis] = useState<any>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize Jarvis Service
  useEffect(() => {
    const instance = startJarvisChat(modeId);
    setJarvis(instance);
    setMessages([{ role: 'model', text: instance.introMessage }]);
  }, [modeId]);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !jarvis) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      // Map history to the format Groq expects (assistant instead of model)
      const chatHistory = messages.map(m => ({
        role: m.role === 'model' ? 'assistant' : 'user',
        content: m.text
      }));

      const aiResponse = await jarvis.sendMessage(userText, chatHistory);
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    } catch (error) {
      console.error("Neural Link Error:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "🚨 PROTOCOL ERROR: Neural link failed. Please check your network or API Key in the hub dashboard." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-mono relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* Header */}
      <header className="z-10 border-b border-sky-900/50 bg-[#020617]/80 backdrop-blur-md p-4 flex items-center justify-between">
        <button 
          onClick={() => navigate('/gateway')}
          className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors group"
        >
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

      {/* Chat Area */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth z-10 custom-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                  msg.role === 'user' ? 'bg-sky-900/30 border-sky-500 text-sky-400' : 'bg-blue-900/30 border-blue-500 text-blue-400'
                }`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
                  msg.role === 'user' 
                    ? 'bg-sky-600/20 border border-sky-500/30 text-sky-50' 
                    : 'bg-slate-800/50 border border-slate-700 text-slate-200'
                }`}>
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-900/30 border border-blue-500 flex items-center justify-center text-blue-400">
              <Bot size={16} />
            </div>
            <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl flex items-center gap-3">
              <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
              <span className="text-xs text-slate-400 animate-pulse">JARVIS is processing...</span>
            </div>
          </motion.div>
        )}
      </main>

      {/* Input Area */}
      <footer className="p-4 bg-[#020617] border-t border-sky-900/30 z-10">
        <div className="max-w-4xl mx-auto relative flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Upload research query or type command..."
            className="w-full bg-slate-900/50 border border-sky-900/50 rounded-full py-3 px-6 pr-14 text-sm focus:outline-none focus:border-sky-400 transition-all placeholder:text-slate-600"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 text-slate-900 p-2 rounded-full transition-all"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-600 mt-2 tracking-widest uppercase">
          Neural Link v2.0 // Secured Connection // Dhakuakhana Node
        </p>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #0c4a6e; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #0ea5e9; }
      `}</style>
    </div>
  );
}
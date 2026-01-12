import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Loader2 } from 'lucide-react';

export const MessageList = ({ messages, isLoading, scrollRef }: any) => (
  <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar z-10">
    <AnimatePresence initial={false}>
      {messages.map((msg: any, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
              msg.role === 'user' ? 'bg-sky-900/30 border-sky-500 text-sky-400' : 'bg-blue-900/30 border-blue-500 text-blue-400'
            }`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' ? 'bg-sky-600/20 border border-sky-500/30' : 'bg-slate-800/50 border border-slate-700'
            }`}>
              {msg.text}
            </div>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
    
    {isLoading && (
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-900/30 border border-blue-500 flex items-center justify-center text-blue-400"><Bot size={16} /></div>
        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl flex items-center gap-3">
          <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
          <span className="text-xs text-slate-400">JARVIS is processing...</span>
        </div>
      </div>
    )}
  </main>
);
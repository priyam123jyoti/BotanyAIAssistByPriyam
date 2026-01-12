import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { startJarvisChat } from '../services/moanaAI';

// Components
import { ChatHeader } from '../components/chat/ChatHeader';
import { MessageList } from '../components/chat/MessageList';
import { ChatInput } from '../components/chat/ChatInput';

export default function AIHub() {
  const location = useLocation();
  const navigate = useNavigate();
  const modeId = location.state?.mode || 'careers';

  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [jarvis, setJarvis] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const instance = startJarvisChat(modeId);
    setJarvis(instance);
    setMessages([{ role: 'model', text: instance.introMessage }]);
  }, [modeId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string) => {
    if (isLoading || !jarvis) return;
    setMessages(prev => [...prev, { role: 'user', text }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role === 'model' ? 'assistant' : 'user',
        content: m.text
      }));
      const response = await jarvis.sendMessage(text, history);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "🚨 PROTOCOL ERROR: Neural link failed." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-mono relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05)_0%,transparent_70%)] pointer-events-none" />

      <ChatHeader modeId={modeId} onExit={() => navigate('/gateway')} />

      <MessageList messages={messages} isLoading={isLoading} scrollRef={scrollRef} />

      <ChatInput onSend={handleSend} isLoading={isLoading} />

      <p className="text-center text-[10px] text-slate-600 mb-2 tracking-widest uppercase">
        Neural Link v2.0 by Priyam
      </p>
    </div>
  );
}
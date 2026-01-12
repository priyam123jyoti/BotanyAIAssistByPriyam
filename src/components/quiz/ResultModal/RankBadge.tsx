import React from 'react';
import { Sparkles } from 'lucide-react';

export const RankBadge = ({ title, color, bg }: { title: string; color: string; bg: string }) => (
  <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full ${bg} ${color} mb-8 border border-current/20 shadow-inner`}>
    <Sparkles size={16} className="animate-pulse" />
    <span className="text-xs font-black tracking-[0.3em] uppercase">{title}</span>
  </div>
);
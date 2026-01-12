import React from 'react';
import { motion } from 'framer-motion';

export const ScoreDisplay = ({ score, color }: { score: number; color: string }) => (
  <div className="relative mb-4 flex flex-col items-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="relative"
    >
      <span className={`text-9xl font-black ${color} tracking-tighter drop-shadow-2xl italic`}>
        {score}
      </span>
      <span className={`text-3xl font-black ${color} absolute -right-8 bottom-4`}>%</span>
    </motion.div>
  </div>
);
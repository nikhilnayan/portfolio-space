'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading with progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="loading-screen"
        >
          {/* Stonks Arrow */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mb-12"
          >
            {/* Arrow going up — the "stonks" vibe */}
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              className="relative z-10"
            >
              <motion.path
                d="M10 65 L35 35 L50 45 L70 15"
                stroke="#CCFF00"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
              {/* Arrow head */}
              <motion.path
                d="M60 15 L70 15 L70 25"
                stroke="#CCFF00"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              />
            </svg>

            {/* Stonks text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-[0.55rem] font-light tracking-[0.4em] uppercase text-cyber-lime/40 mt-3 text-center"
            >
              stonks ↗
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div
              className="h-full bg-cyber-lime/60"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[0.6rem] font-light tracking-[0.3em] uppercase text-white/20 mt-4"
          >
            {progress < 100 ? 'Initializing cosmos...' : 'Launch sequence complete'}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

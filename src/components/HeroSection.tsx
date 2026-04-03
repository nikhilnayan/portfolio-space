'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const taglines = [
  'Full-Stack Developer',
  'Digital Architect',
  'Cosmic Engineer',
  'Code Astronaut',
  'Pixel Wrangler',
  '// TODO: fix the universe',
  'npm install galaxy --save',
  'git push origin main 🚀',
];

export default function HeroSection() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="hero-subtitle mb-6 md:mb-8"
        >
          Portfolio &mdash; 2026
        </motion.p>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="hero-title mb-6"
        >
          Architecting
          <br />
          <span className="text-glow-lime">
            The{' '}
            <span className="text-cyber-lime">Cosmos</span>
            <span className="text-cyber-lime">.</span>
          </span>
        </motion.h1>

        {/* Rotating Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="h-8 flex items-center justify-center mb-12"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={taglineIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-sm md:text-base font-light tracking-[0.3em] uppercase text-white/40"
            >
              {taglines[taglineIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary"
          >
            <span>View Work</span>
            <span className="relative z-1">→</span>
          </button>
          <button
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary !border-white/20 !text-white/60 hover:!border-white/40 hover:!text-white"
          >
            <span>Get in Touch</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[0.65rem] font-light tracking-[0.3em] uppercase text-white/30">
          Scroll
        </span>
        <div className="w-[1px] h-8 relative overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-cyber-lime/60 to-transparent animate-scroll-indicator" />
        </div>
      </motion.div>
    </section>
  );
}

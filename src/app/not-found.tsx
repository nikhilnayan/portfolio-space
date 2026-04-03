'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] h-[1px] bg-white/40 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Astronaut */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center"
      >
        {/* ASCII Astronaut */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="text-5xl md:text-7xl mb-8"
        >
          🧑‍🚀
        </motion.div>

        {/* 404 Number */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[8rem] md:text-[12rem] font-thin leading-none tracking-[0.2em] text-white/10 mb-0"
        >
          404
        </motion.h1>

        {/* Skill Issue Caption */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-xl md:text-2xl font-extralight tracking-[0.25em] uppercase text-white/70 mb-3">
            Houston, we have a
          </h2>
          <p className="text-2xl md:text-4xl font-extralight tracking-[0.2em] uppercase mb-8">
            &quot;<span className="text-cyber-lime text-glow-lime">Skill Issue</span>&quot;
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-sm font-light tracking-[0.2em] text-white/25 mb-10 max-w-md mx-auto"
        >
          This page has drifted into the void.
          <br />
          Even our best telescopes can&apos;t find it.
        </motion.p>

        {/* Return Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Link href="/" className="btn-primary">
            <span>Return to Base</span>
            <span className="relative z-1">←</span>
          </Link>
        </motion.div>

        {/* Hidden joke */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="text-[0.5rem] text-white/8 tracking-[0.3em] uppercase mt-16 font-light"
        >
          git blame: the universe
        </motion.p>
      </motion.div>
    </div>
  );
}

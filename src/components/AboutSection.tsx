'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      className="relative z-10 py-40 md:py-56 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="section-title mb-10">About</h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-6 font-light">
              I&apos;m a passionate full-stack developer who builds at the intersection
              of elegant design and robust engineering. I believe the best digital
              experiences feel like magic &mdash; intuitive, beautiful, and effortless.
            </p>
            <p className="text-white/40 text-sm md:text-base leading-relaxed mb-8 font-light">
              From crafting pixel-perfect interfaces to architecting scalable backend
              systems, I bring a holistic approach to every project. Currently exploring
              the frontiers of AI, 3D web experiences, and whatever new technology
              catches my eye next.
            </p>

            {/* Stats */}
            <div className="flex gap-12">
              {[
                { number: '3+', label: 'Years' },
                { number: '20+', label: 'Projects' },
                { number: '∞', label: 'Curiosity' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-extralight text-cyber-lime tracking-wider">
                    {stat.number}
                  </div>
                  <div className="text-[0.65rem] font-light tracking-[0.25em] uppercase text-white/30 mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Abstract Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex items-center justify-center"
          >
            {/* Orbital rings visualization */}
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_30s_linear_infinite]" />
              {/* Middle ring */}
              <div className="absolute inset-6 rounded-full border border-white/10 animate-[spin_20s_linear_infinite_reverse]" />
              {/* Inner ring */}
              <div className="absolute inset-12 rounded-full border border-cyber-lime/15 animate-[spin_15s_linear_infinite]" />

              {/* Orbital dots */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyber-lime/60 animate-pulse-glow" />
              <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse-glow" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/3 left-2 w-1 h-1 rounded-full bg-cyber-lime/40 animate-pulse-glow" style={{ animationDelay: '2s' }} />

              {/* Center glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-cyber-lime/10 to-nebula-purple/20 blur-sm" />
                <div className="absolute w-4 h-4 rounded-full bg-cyber-lime/30" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

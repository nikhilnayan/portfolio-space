'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Skill {
  name: string;
  icon: string;
  category: string;
  easterEgg?: string;
}

const skills: Skill[] = [
  { name: 'React', icon: '⚛️', category: 'Frontend', easterEgg: '⚡' },
  { name: 'Next.js', icon: '▲', category: 'Frontend', easterEgg: '🔺' },
  { name: 'TypeScript', icon: '📘', category: 'Frontend', easterEgg: '😱' },
  { name: 'Three.js', icon: '🎮', category: 'Frontend', easterEgg: '🌀' },
  { name: 'Node.js', icon: '🟢', category: 'Backend', easterEgg: '🐸' },
  { name: 'Python', icon: '🐍', category: 'Backend', easterEgg: '🤯' },
  { name: 'PostgreSQL', icon: '🐘', category: 'Backend', easterEgg: '📈' },
  { name: 'Docker', icon: '🐳', category: 'DevOps', easterEgg: '🐋' },
  { name: 'AWS', icon: '☁️', category: 'DevOps', easterEgg: '💸' },
  { name: 'Git', icon: '🔀', category: 'DevOps', easterEgg: '🤡' },
  { name: 'Figma', icon: '🎨', category: 'Design', easterEgg: '✨' },
  { name: 'Tailwind', icon: '💨', category: 'Frontend', easterEgg: '🌬️' },
];

const categories = ['All', ...Array.from(new Set(skills.map((s) => s.category)))];

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative z-10 py-40 md:py-56 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title mb-4">Skills</h2>
          <p className="text-white/30 text-sm font-light tracking-[0.15em] mt-6 mb-12">
            Technologies I work with daily
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-light tracking-[0.2em] uppercase px-4 py-2 border transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'border-cyber-lime text-cyber-lime bg-cyber-lime/5'
                  : 'border-white/10 text-white/40 hover:border-white/25 hover:text-white/60 bg-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredSkills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="glass-card p-5 relative cursor-default group"
            >
              <div className="text-2xl mb-3">{skill.icon}</div>
              <h3 className="text-sm font-light tracking-[0.15em] text-white/80 mb-1">
                {skill.name}
              </h3>
              <p className="text-[0.6rem] font-light tracking-[0.2em] uppercase text-white/25">
                {skill.category}
              </p>

              {/* Easter Egg — appears on hover */}
              {skill.easterEgg && (
                <span
                  className="easter-egg-pikachu"
                  style={{
                    opacity: hoveredSkill === skill.name ? 1 : 0,
                    transform:
                      hoveredSkill === skill.name
                        ? 'scale(1)'
                        : 'scale(0.3)',
                  }}
                >
                  {skill.easterEgg}
                </span>
              )}

              {/* Hover glow line */}
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyber-lime transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>

        {/* Secret message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-center text-[0.6rem] text-white/10 mt-12 tracking-[0.3em] uppercase font-light"
        >
          hover the cards. you&apos;re welcome.
        </motion.p>
      </div>
    </section>
  );
}

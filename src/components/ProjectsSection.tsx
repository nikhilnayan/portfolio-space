'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: 'Nebula Dashboard',
    description:
      'A real-time analytics dashboard with dark theme and interactive data visualizations. Built for monitoring cosmic-scale deployments.',
    tags: ['React', 'TypeScript', 'D3.js', 'Node.js'],
    link: '#',
    github: '#',
    featured: true,
  },
  {
    title: 'Stellar API',
    description:
      'High-performance REST API handling 10k+ requests/sec with intelligent caching and rate limiting.',
    tags: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    link: '#',
    github: '#',
    featured: true,
  },
  {
    title: 'Quantum Chat',
    description:
      'End-to-end encrypted real-time messaging with WebSocket infrastructure and presence detection.',
    tags: ['Next.js', 'Socket.io', 'Prisma', 'TailwindCSS'],
    link: '#',
    github: '#',
  },
  {
    title: 'Orbit CMS',
    description:
      'Headless content management system with a visual page builder and markdown support.',
    tags: ['React', 'GraphQL', 'MongoDB', 'AWS'],
    link: '#',
    github: '#',
  },
  {
    title: 'Void Commerce',
    description:
      'Full-featured e-commerce platform with Stripe integration, inventory management, and admin panel.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Vercel'],
    github: '#',
  },
  {
    title: 'Cosmos ML Pipeline',
    description:
      'Machine learning pipeline for astronomical image classification with 97% accuracy.',
    tags: ['Python', 'TensorFlow', 'FastAPI', 'Docker'],
    github: '#',
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative z-10 py-40 md:py-56 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title mb-4">Projects</h2>
          <p className="text-white/30 text-sm font-light tracking-[0.15em] mt-6 mb-16">
            Selected work from the last light-year
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              onMouseEnter={() => setHoveredProject(i)}
              onMouseLeave={() => setHoveredProject(null)}
              className={`glass-card p-6 md:p-7 flex flex-col justify-between relative overflow-hidden group ${
                project.featured ? 'md:col-span-2 lg:col-span-1 lg:row-span-1' : ''
              }`}
            >
              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 text-[0.55rem] font-light tracking-[0.2em] uppercase text-cyber-lime/60 border border-cyber-lime/20 px-2 py-0.5">
                  Featured
                </div>
              )}

              {/* Project Number */}
              <div className="text-[0.6rem] font-light tracking-[0.25em] text-white/15 mb-4">
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-extralight tracking-[0.1em] mb-3 text-white/90 group-hover:text-cyber-lime transition-colors duration-300">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-sm font-light text-white/35 leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.6rem] font-light tracking-[0.15em] uppercase text-white/25 border border-white/8 px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4">
                {project.link && (
                  <a
                    href={project.link}
                    className="text-xs font-light tracking-[0.15em] uppercase text-white/40 hover:text-cyber-lime transition-colors duration-300 flex items-center gap-1.5"
                  >
                    <span>Live</span>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-50">
                      <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="0.8" />
                    </svg>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    className="text-xs font-light tracking-[0.15em] uppercase text-white/40 hover:text-cyber-lime transition-colors duration-300"
                  >
                    GitHub
                  </a>
                )}
              </div>

              {/* Hover glow effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    hoveredProject === i
                      ? 'radial-gradient(circle at 50% 50%, rgba(204, 255, 0, 0.03) 0%, transparent 70%)'
                      : 'none',
                }}
              />

              {/* Bottom lime accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-cyber-lime/60 to-cyber-lime/0 transition-all duration-700 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

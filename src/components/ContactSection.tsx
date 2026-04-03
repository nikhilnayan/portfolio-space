'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com', icon: '◈' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: '◇' },
  { name: 'Twitter', url: 'https://twitter.com', icon: '◆' },
  { name: 'Email', url: 'mailto:hello@example.com', icon: '▹' },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate send
    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative z-10 py-40 md:py-56 px-6 md:px-12"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mx-auto mb-4">Contact</h2>
          <p className="text-white/30 text-sm font-light tracking-[0.15em] mt-6">
            Let&apos;s build something extraordinary
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-[0.65rem] font-light tracking-[0.25em] uppercase text-white/30 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                className="w-full bg-transparent border-b border-white/10 py-3 text-sm font-light text-white/80 tracking-wider focus:outline-none focus:border-cyber-lime/50 transition-colors duration-300 placeholder:text-white/15"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-[0.65rem] font-light tracking-[0.25em] uppercase text-white/30 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                className="w-full bg-transparent border-b border-white/10 py-3 text-sm font-light text-white/80 tracking-wider focus:outline-none focus:border-cyber-lime/50 transition-colors duration-300 placeholder:text-white/15"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-[0.65rem] font-light tracking-[0.25em] uppercase text-white/30 mb-2">
                Message
              </label>
              <textarea
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                rows={5}
                className="w-full bg-transparent border-b border-white/10 py-3 text-sm font-light text-white/80 tracking-wider focus:outline-none focus:border-cyber-lime/50 transition-colors duration-300 resize-none placeholder:text-white/15"
                placeholder="Tell me about your project..."
                required
              />
            </div>
            <button type="submit" className="btn-primary mt-4">
              <span>{isSent ? 'Transmission Sent ✓' : 'Send Transmission'}</span>
              <span className="relative z-1">→</span>
            </button>
          </motion.form>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <p className="text-white/25 text-sm font-light tracking-wider leading-relaxed mb-10">
              Based on Earth (for now). Available for freelance work, collaborations,
              and interesting conversations about the universe.
            </p>

            <div className="space-y-4">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-4 py-3 border-b border-white/5 group hover:border-cyber-lime/20 transition-all duration-300"
                >
                  <span className="text-cyber-lime/40 group-hover:text-cyber-lime transition-colors duration-300 text-sm">
                    {link.icon}
                  </span>
                  <span className="text-sm font-light tracking-[0.15em] text-white/40 group-hover:text-white/80 transition-colors duration-300">
                    {link.name}
                  </span>
                  <span className="ml-auto text-xs text-white/10 group-hover:text-white/30 transition-colors duration-300 group-hover:translate-x-1 transform">
                    →
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Hidden credit */}
            <p className="text-[0.55rem] text-white/10 tracking-[0.2em] uppercase mt-12 font-light">
              Designed & built with ☕ and existential dread
            </p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1 }}
        className="mt-32 pt-8 border-t border-white/5 text-center"
      >
        <p className="text-[0.6rem] font-light tracking-[0.3em] uppercase text-white/15">
          © 2026 &mdash; Crafted in the void
        </p>
      </motion.footer>
    </section>
  );
}

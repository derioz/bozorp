import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AboutSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="lore"
      ref={ref}
      className="w-full py-32 bg-[#0a0206] relative scroll-mt-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[#ff0033]/5 rounded-full blur-[200px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full lg:w-1/2 order-2 lg:order-1 relative group"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Hover Glow */}
              <motion.div
                className="absolute -inset-4 bg-[#ff0033]/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#ff0033]/30 to-transparent mix-blend-overlay z-10" />

              {/* Image with Parallax Effect */}
              <motion.div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBjIhh9gfxR7Fyw1DHJHtRk5zb7dSQtzKF8fPNlWYH6Zlobez3a-Xdkmr-3KRyn1ADIwQhvtu9eahFChqR3M41ljbUEXXEr4FX-8SVq6KWPlqZ6HIG3MNOzQnVxTSiI3NOKK1Wk9kYmuZtlYfKSKVAXwCTRnzVLW3GsieTX6gNXsaTkXd5sL23c8WiBHMlzUVDt8MAS-cTwLK9zszUc-k7q-eOkZyrDNG4BIe9D6Bp2bRQnqhbmsYCS49uo8igOax8EGpgJJ86bHXI")',
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />

              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#ff0033]/50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#ff0033]/50" />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-4 -right-4 bg-[#0a0004] border border-[#ff0033]/30 rounded-xl px-4 py-3 shadow-2xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#ff0033] text-2xl">auto_stories</span>
                <div>
                  <div className="text-white text-sm font-bold">Deep Lore</div>
                  <div className="text-gray-500 text-xs">Est. 2023</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full lg:w-1/2 flex flex-col gap-6 order-1 lg:order-2"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#ff0033]/10 border border-[#ff0033]/20 self-start"
            >
              <span className="w-2 h-2 rounded-full bg-[#ff0033] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#ff0033]">About The City</span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
              className="text-4xl lg:text-6xl font-display text-white leading-tight"
            >
              BEHIND THE{' '}
              <span
                style={{
                  background: 'linear-gradient(to right, #ff0033, #a200ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                CURTAIN
              </span>
            </motion.h2>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
              className="space-y-4 text-gray-400 text-lg leading-relaxed font-light"
            >
              <p>
                Step into a city where chaos reigns. Our server lore is built on deep storytelling, serious roleplay, and a touch of madness. The government has collapsed, and the streets are run by those brave enough to take them.
              </p>
              <p>
                Whether you want to run a legitimate business, join the remaining police force, or rule the underground economy, the stage is set for you.
              </p>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
              className="flex gap-8 pt-4"
            >
              {[
                { value: '200+', label: 'Players' },
                { value: '50+', label: 'Custom Jobs' },
                { value: '24/7', label: 'Active' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7 }}
              className="pt-4"
            >
              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 text-white text-sm font-bold uppercase tracking-widest"
              >
                <span className="border-b-2 border-[#ff0033] pb-1 group-hover:text-[#ff0033] transition-colors">
                  Read Full Lore
                </span>
                <span className="material-symbols-outlined text-[#ff0033] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </motion.button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
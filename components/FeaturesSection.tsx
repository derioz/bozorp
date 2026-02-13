import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

// ============================================================================
// TYPES
// ============================================================================
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ============================================================================
// FEATURE CARD COMPONENT
// ============================================================================
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative p-8 rounded-2xl bg-[#0a0004]/60 backdrop-blur-sm border border-white/5 hover:border-[#ff0033]/30 transition-all duration-300 overflow-hidden"
    >
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff0033]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-1 bg-[#ff0033]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />

      {/* Icon Container */}
      <motion.div
        className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#ff0033]/20 to-transparent border border-[#ff0033]/30 flex items-center justify-center mb-6 group-hover:border-[#ff0033]/50 transition-colors"
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <span className="material-symbols-outlined text-3xl text-[#ff0033] group-hover:scale-110 transition-transform">
          {icon}
        </span>
      </motion.div>

      {/* Content */}
      <h3 className="relative text-xl font-display text-white mb-3 tracking-wide group-hover:text-[#ff0033] transition-colors">
        {title}
      </h3>
      <p className="relative text-gray-400 font-light text-sm leading-relaxed">
        {description}
      </p>

      {/* Bottom Accent Line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#ff0033] to-transparent"
        initial={{ width: 0 }}
        whileInView={{ width: '50%' }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
      />
    </motion.div>
  );
};

// ============================================================================
// FEATURES SECTION COMPONENT
// ============================================================================
const FeaturesSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: 'local_taxi',
      title: 'Custom Imports',
      description: '200+ Custom vehicles tailored for street racing and drifting.',
    },
    {
      icon: 'theater_comedy',
      title: 'Serious RP',
      description: 'Immersive storytelling where your choices actually matter.',
    },
    {
      icon: 'badge',
      title: 'Whitelisted Jobs',
      description: 'Police, EMS, DOJ and custom business ownership available.',
    },
    {
      icon: 'skull',
      title: 'Underground',
      description: 'Deep underground economy, drug labs, and heist progression.',
    },
  ];

  return (
    <section
      id="features"
      ref={ref}
      className="w-full py-32 bg-[#0a0206] relative scroll-mt-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#ff0033]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[150px]" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff0033]/10 border border-[#ff0033]/20 text-[#ff0033] text-xs font-bold uppercase tracking-[0.3em] mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff0033] animate-pulse" />
            Server Features
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-4">
            THE MAIN{' '}
            <span
              style={{
                background: 'linear-gradient(to right, #ff0033, #ff6666)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ATTRACTIONS
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Everything you need for an unforgettable roleplay experience
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
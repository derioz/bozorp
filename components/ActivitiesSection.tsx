import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

// ============================================================================
// TYPES
// ============================================================================
interface ActivityProps {
  title: string;
  tag: string;
  description: string;
  icon: string;
  color: string;
  image: string;
  riskLevel: number;
  index: number;
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ============================================================================
// ACTIVITY CARD COMPONENT
// ============================================================================
const ActivityCard: React.FC<ActivityProps> = ({
  title,
  tag,
  description,
  icon,
  color,
  image,
  riskLevel,
  index,
}) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group relative h-[260px] rounded-xl overflow-hidden bg-[#0a0004] border border-white/5 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] ${index === 6 ? 'md:col-span-2 lg:col-span-3' : ''
        }`}
      style={{
        boxShadow: `0 0 0 1px ${color}00`,
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="w-full h-full bg-cover bg-center grayscale contrast-125 brightness-[0.4] group-hover:grayscale-0 opacity-50 group-hover:opacity-70"
          style={{ backgroundImage: `url(${image})` }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050002] via-[#050002]/90 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050002]/20 to-[#050002] z-10 opacity-80" />
      </div>

      {/* Hover Glow */}
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none mix-blend-screen"
        style={{ background: `radial-gradient(circle at 50% 100%, ${color}, transparent 70%)` }}
      />

      {/* Content */}
      <div className="relative z-20 h-full p-5 flex flex-col justify-end">
        {/* Icon */}
        <motion.div
          className="absolute top-3 right-3 w-10 h-10 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all shadow-lg"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <span className="material-symbols-outlined text-xl text-gray-400 group-hover:text-white transition-colors">
            {icon}
          </span>
        </motion.div>

        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <span
            className="inline-flex items-center px-3 py-1 rounded text-[10px] font-bold uppercase tracking-[0.2em] border backdrop-blur-md"
            style={{
              borderColor: `${color}60`,
              color: color,
              backgroundColor: 'rgba(5,0,2,0.8)',
              boxShadow: `0 0 15px ${color}30`,
            }}
          >
            {tag}
          </span>
        </motion.div>

        {/* Title */}
        <h3 className="text-xl lg:text-2xl font-display text-white mb-1 drop-shadow-[0_2px_10px_rgba(0,0,0,1)] group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300 tracking-wide"
          style={{
            backgroundImage: `linear-gradient(to right, white, ${color})`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <motion.div
          className="relative overflow-hidden transition-all duration-500 max-h-[80px] group-hover:max-h-[160px] opacity-70 group-hover:opacity-100"
        >
          <p className="text-xs font-body text-gray-300 font-light leading-snug line-clamp-3">
            {description}
          </p>
        </motion.div>

        {/* Risk Meter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-3 pt-3 border-t border-white/10"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider font-display">
              Risk Level
            </span>
            <span
              className="text-[10px] font-bold uppercase tracking-wider font-display"
              style={{ color: color, textShadow: `0 0 10px ${color}80` }}
            >
              {riskLevel === 5 ? 'EXTREME' : riskLevel >= 3 ? 'MODERATE' : 'SAFE'}
            </span>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((level) => (
              <motion.div
                key={level}
                className="h-1.5 flex-1 rounded-sm skew-x-[-10deg]"
                style={{
                  backgroundColor: level <= riskLevel ? color : 'rgba(255,255,255,0.05)',
                  boxShadow: level <= riskLevel ? `0 0 8px ${color}80` : 'none',
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.1 * level }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Border Glow on Hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: `inset 0 0 0 1px ${color}40, 0 0 20px ${color}20`,
        }}
      />
    </motion.div>
  );
};

// ============================================================================
// ACTIVITIES SECTION COMPONENT
// ============================================================================
const ActivitiesSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const activities = [
    {
      title: 'TRUCKING',
      tag: 'Top Legal Job',
      description: 'Carry cargo, deliver loads, avoid road issues, and complete routes across San Andreas. Smooth, consistent, high-tier income.',
      icon: 'local_shipping',
      color: '#00f3ff',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop',
      riskLevel: 1,
    },
    {
      title: 'FISHING',
      tag: 'Chill & Profitable',
      description: 'Use bait, catch different fish types, sell at docks, and enjoy RNG bonuses. Relaxing gameplay with solid earning potential.',
      icon: 'set_meal',
      color: '#60a5fa',
      image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=2069&auto=format&fit=crop',
      riskLevel: 1,
    },
    {
      title: 'HUNTING',
      tag: 'Active + Rewarding',
      description: 'Track animals, hunt in wilderness zones, collect pelts, and take Hunt Master missions. Rewarding but requires patience.',
      icon: 'crisis_alert',
      color: '#4ade80',
      image: 'https://images.unsplash.com/photo-1475724017904-b712052c192a?q=80&w=2070&auto=format&fit=crop',
      riskLevel: 2,
    },
    {
      title: 'TAXI',
      tag: 'Starter Job',
      description: 'Pick up NPC passengers, learn the map, and earn steady fares. Perfect for new players learning the city.',
      icon: 'local_taxi',
      color: '#facc15',
      image: 'https://images.unsplash.com/photo-1556122071-e404eaedb77f?q=80&w=1934&auto=format&fit=crop',
      riskLevel: 2,
    },
    {
      title: 'MALL SALES',
      tag: 'Low Risk',
      description: 'Buy items from the mall and sell them to NPCs around the map. Low-risk, low-stress, solid for casual players.',
      icon: 'shopping_bag',
      color: '#f472b6',
      image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop',
      riskLevel: 1,
    },
    {
      title: 'ACCESSORIES',
      tag: 'Side-Hustle',
      description: 'Sell higher-tier accessories like handbags and specialty caps to specific NPCs. Great filler work between major jobs.',
      icon: 'diamond',
      color: '#c084fc',
      image: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=2070&auto=format&fit=crop',
      riskLevel: 1,
    },
    {
      title: 'DRUG ECONOMY',
      tag: 'High Risk • High Reward',
      description: 'Farm, process, cut, and sell illegal product. Impacted heavily by police presence. Own the streets or end up in cuffs.',
      icon: 'science',
      color: '#ef4444',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop',
      riskLevel: 5,
    },
  ];

  return (
    <section
      id="hustle"
      ref={ref}
      className="w-full py-32 bg-[#050002] relative scroll-mt-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050002] via-transparent to-[#050002]" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#ff0033]/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff0033]/10 border border-[#ff0033]/20 text-[#ff0033] text-xs font-bold uppercase tracking-[0.3em] mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff0033] animate-pulse" />
            Welcome To The City
          </motion.span>

          <h2 className="text-4xl md:text-6xl font-display text-white mb-8 tracking-wide">
            CHOOSE YOUR{' '}
            <span className="relative inline-block">
              <motion.span
                className="absolute -inset-2 blur-lg bg-[#ff0033]/30"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span
                className="relative z-10"
                style={{
                  background: 'linear-gradient(to right, #ff0033, #ff5e00)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                HUSTLE
              </span>
            </span>
          </h2>

          <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Every job is optional, every path works solo, and every system rewards time and effort in different ways.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {activities.map((act, index) => (
            <ActivityCard key={index} {...act} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
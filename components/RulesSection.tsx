import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

// ============================================================================
// TYPES
// ============================================================================
interface Rule {
  id: string;
  title: string;
  icon: string;
  description: string;
  punishment: string;
  order: number;
}

// Fallback rules in case Firestore is unreachable
const FALLBACK_RULES: Rule[] = [
  { id: '1', title: 'Community Respect', icon: 'handshake', punishment: 'Ban', description: 'We are a community first. Disrespect, toxicity, hate speech, or harassment will not be tolerated. Treat everyone with basic human decency.', order: 1 },
  { id: '2', title: 'Microphone Required', icon: 'mic', punishment: 'Kick / Warn', description: 'A working, decent quality microphone is mandatory. English communication required at all times. No mic = No RP.', order: 2 },
  { id: '3', title: 'Powergaming', icon: 'bolt', punishment: 'Warn / Ban', description: 'Do not force roleplay outcomes on others. No impossible actions (talking while dead, lifting cars, etc.). Give others a chance to react. Do not abuse game mechanics.', order: 3 },
  { id: '4', title: 'Metagaming', icon: 'psychology', punishment: 'Ban', description: 'Using out-of-character information (Discord, streams, map glitches) in-game is strictly forbidden. Your character only knows what they see and hear in the city.', order: 4 },
  { id: '5', title: 'New Life Rule (NLR)', icon: 'local_hospital', punishment: 'Warn / Ban', description: 'If you respawn at the hospital, you forget the immediate events leading to your death. You cannot return to the scene for 15 minutes. You cannot seek revenge for that specific incident.', order: 5 },
  { id: '6', title: 'Safe Zones (Green Zones)', icon: 'shield', punishment: 'Ban', description: 'Violence and criminal activity are prohibited in neutral grounds: Hospitals & Medical Centers, Police Departments, City Hall / Government Buildings.', order: 6 },
  { id: '7', title: 'Combat Logging', icon: 'power_settings_new', punishment: 'Ban', description: 'Logging out during an active roleplay scene, police chase, or combat to avoid consequences is an instant ban.', order: 7 },
  { id: '8', title: 'Deathmatching (RDM/VDM)', icon: 'person_cancel', punishment: '1-Week Ban', description: 'You must have valid RP initiation before harming another player. No shooting without conversation or buildup. No vehicle attacks without reason. No harming someone without an in-character motive.', order: 8 },
];

// ============================================================================
// COMPONENT
// ============================================================================
const RulesSection: React.FC = () => {
  const [openRule, setOpenRule] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [rules, setRules] = useState<Rule[]>(FALLBACK_RULES);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const q = query(collection(db, 'rules'), orderBy('order', 'asc'));
        const snap = await getDocs(q);
        if (snap.size > 0) {
          setRules(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Rule)));
        }
      } catch (err) {
        console.error('Failed to fetch rules from Firestore, using fallback:', err);
      }
    };
    fetchRules();
  }, []);

  const visibleRules = showAll ? rules : rules.slice(0, 4);

  return (
    <section
      id="rules"
      ref={ref}
      className="w-full py-32 bg-[#080205] relative overflow-hidden scroll-mt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-20" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#ff0033]/5 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-[1024px] mx-auto px-6 relative z-10">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff0033]/10 border border-[#ff0033]/20 text-gray-400 text-xs font-bold uppercase tracking-[0.3em] mb-6"
          >
            <span className="material-symbols-outlined text-sm text-[#ff0033]">gavel</span>
            Code of Conduct
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-display text-white mb-6">
            SERVER{' '}
            <span
              style={{
                background: 'linear-gradient(to right, #ff0033, #a200ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              RULES
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            Ignorance of the law excuses no one. Read them.
          </p>
        </motion.div>

        {/* Rules Accordion */}
        <motion.div
          layout
          className="flex flex-col gap-3"
        >
          <AnimatePresence mode='popLayout'>
            {visibleRules.map((rule, index) => (
              <motion.div
                layout
                key={rule.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`group rounded-xl border border-l-4 transition-all duration-300 overflow-hidden ${openRule === rule.id
                  ? 'bg-[#0f0409] border-white/10 border-l-[#ff0033] shadow-[0_4px_30px_rgba(255,0,51,0.1)]'
                  : 'bg-[#0a0004] border-white/5 border-l-gray-800 hover:bg-[#0f0409] hover:border-l-[#ff0033]/50'
                  }`}
              >
                <motion.button
                  onClick={() => setOpenRule(openRule === rule.id ? null : rule.id)}
                  className="w-full p-5 flex items-center justify-between text-left"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <span
                      className={`text-xl md:text-2xl font-display w-12 text-center transition-colors ${openRule === rule.id ? 'text-[#ff0033]' : 'text-gray-600 group-hover:text-gray-400'
                        }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="flex items-center gap-4">
                      <motion.div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${openRule === rule.id
                          ? 'bg-[#ff0033]/20 text-[#ff0033]'
                          : 'bg-white/5 text-gray-500 group-hover:bg-white/10 group-hover:text-gray-300'
                          }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className="material-symbols-outlined text-xl">{rule.icon}</span>
                      </motion.div>
                      <h3
                        className={`text-base md:text-lg font-bold uppercase tracking-wide transition-colors font-display ${openRule === rule.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                          }`}
                      >
                        {rule.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      className={`hidden md:flex items-center gap-2 px-3 py-1 bg-black/40 border border-white/5 transition-opacity skew-x-[-10deg] ${openRule === rule.id ? 'opacity-100' : 'opacity-50'
                        }`}
                    >
                      <span className="text-[10px] font-bold uppercase text-red-400 font-display skew-x-[10deg]">
                        {rule.punishment}
                      </span>
                    </div>

                    <motion.span
                      animate={{ rotate: openRule === rule.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`material-symbols-outlined text-gray-500 ${openRule === rule.id ? 'text-[#ff0033]' : ''
                        }`}
                    >
                      expand_more
                    </motion.span>
                  </div>
                </motion.button>

                <AnimatePresence initial={false}>
                  {openRule === rule.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-8 pl-[20px] md:pl-[108px] md:pr-12 border-t border-white/5 pt-6">
                        <div className="md:hidden mb-4 inline-block">
                          <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest border border-red-500/20 px-2 py-1 bg-red-500/5 font-display">
                            Penalty: {rule.punishment}
                          </span>
                        </div>
                        <p className="text-gray-300">{rule.description}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <motion.button
            onClick={() => setShowAll(!showAll)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-3 bg-transparent border border-white/10 hover:border-[#ff0033]/50 transition-all duration-300 flex items-center gap-3 backdrop-blur-sm rounded-xl"
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
            <span className="font-bold uppercase tracking-[0.2em] text-xs text-gray-400 group-hover:text-white transition-colors font-display">
              {showAll ? 'Show Less Rules' : 'Show All Rules'}
            </span>
            <motion.span
              animate={{ rotate: showAll ? 180 : 0 }}
              className="material-symbols-outlined text-gray-400 group-hover:text-[#ff0033] transition-colors"
            >
              expand_more
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default RulesSection;
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';

// ============================================================================
// NAVIGATION CONFIGURATION
// ============================================================================
const navLinks = [
  { name: 'Home', id: 'home', href: '#home' },
  { name: 'Lore', id: 'lore', href: '#lore' },
  { name: 'Features', id: 'features', href: '#features' },
  { name: 'Gallery', id: 'gallery', href: '#gallery' },
  { name: 'Hustle', id: 'hustle', href: '#hustle' },
  { name: 'Rules', id: 'rules', href: '#rules' },
];

// ============================================================================
// COMPONENT
// ============================================================================
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'lore', 'features', 'gallery', 'hustle', 'rules'];
      const scrollPosition = window.scrollY + 300;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((window.scrollY / totalHeight) * 100, 100);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto w-full max-w-[1100px] px-4">
        {/* ========================================
            GLASSMORPHIC NAVBAR CONTAINER
            ======================================== */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            marginTop: scrolled ? 12 : 24,
            paddingTop: scrolled ? 12 : 16,
            paddingBottom: scrolled ? 12 : 16,
          }}
          transition={{
            y: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
            marginTop: { type: 'spring', stiffness: 300, damping: 30 },
            paddingTop: { type: 'spring', stiffness: 300, damping: 30 },
            paddingBottom: { type: 'spring', stiffness: 300, damping: 30 },
          }}
          className="relative mx-auto"
        >
          {/* Main Navbar Glass Container */}
          <motion.div
            animate={{
              borderRadius: scrolled ? 16 : 24,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative bg-[#0a0004]/80 backdrop-blur-xl border border-white/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden hover:border-[#ff0033]/20 hover:shadow-[0_20px_80px_-15px_rgba(255,0,51,0.15)] transition-colors duration-300"
          >
            {/* Ambient Gradient Glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute bottom-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-[#ff0033]/30 to-transparent" />
            </div>

            {/* Scroll Progress Bar */}
            <div className="absolute top-0 left-0 h-[2px] w-full bg-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-[#ff0033] via-[#ff4466] to-[#ff0033] relative"
                animate={{ width: `${scrollProgress}%` }}
                transition={{ duration: 0.1 }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff0033] rounded-full blur-sm animate-pulse" />
              </motion.div>
            </div>

            {/* Content */}
            <div className="relative flex items-center justify-between px-6 md:px-8">
              {/* ========================================
                  LOGO
                  ======================================== */}
              <a
                href="#home"
                className="flex items-center gap-3 group relative py-2"
                aria-label="Go to Home"
              >
                {/* Logo Glow */}
                <motion.div
                  className="absolute -inset-2 bg-[#ff0033]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <motion.div
                  animate={{ scale: scrolled ? 0.9 : 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-10 h-10 md:w-11 md:h-11 border border-white/10 group-hover:border-[#ff0033]/50 rounded-xl flex items-center justify-center bg-[#0a0004]/80 backdrop-blur-sm relative z-10 shadow-inner transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ff0033]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="material-symbols-outlined text-[#ff0033] text-xl md:text-2xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                      skull
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    opacity: scrolled ? 0 : 1,
                    width: scrolled ? 0 : 'auto',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="overflow-hidden"
                >
                  <span className="text-lg md:text-xl text-white font-display tracking-widest leading-none group-hover:text-[#ff0033] transition-colors duration-300 whitespace-nowrap">
                    BOZO<span className="text-[#ff0033] group-hover:text-white transition-colors duration-300">RP</span>
                  </span>
                  <span className="block text-[9px] text-gray-500 tracking-[0.3em] uppercase font-body group-hover:text-gray-400 transition-colors whitespace-nowrap">
                    San Andreas
                  </span>
                </motion.div>
              </a>

              {/* ========================================
                  DESKTOP NAVIGATION - Animated Pills
                  ======================================== */}
              <nav className="hidden md:flex items-center">
                <div className="flex items-center bg-[#050002]/50 rounded-xl p-1 border border-white/5">
                  {navLinks.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      className="relative px-4 py-2 group"
                      onMouseEnter={() => setHoveredLink(item.id)}
                      onMouseLeave={() => setHoveredLink(null)}
                      onClick={() => setActiveSection(item.id)}
                    >
                      {/* Hover Background */}
                      <AnimatePresence>
                        {hoveredLink === item.id && (
                          <motion.div
                            layoutId="navbar-hover"
                            className="absolute inset-0 bg-white/5 rounded-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Active Indicator */}
                      {activeSection === item.id && (
                        <motion.div
                          layoutId="navbar-active"
                          className="absolute inset-0 bg-[#ff0033]/10 border border-[#ff0033]/20 rounded-lg"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}

                      {/* Link Text */}
                      <motion.span
                        className={`relative z-10 text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200 ${activeSection === item.id
                            ? 'text-[#ff0033]'
                            : 'text-gray-400 group-hover:text-white'
                          }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.name}
                      </motion.span>

                      {/* Active Glow Dot */}
                      {activeSection === item.id && (
                        <motion.div
                          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#ff0033] rounded-full shadow-[0_0_8px_#ff0033]"
                          layoutId="navbar-dot"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </a>
                  ))}
                </div>
              </nav>

              {/* ========================================
                  ACTION BUTTONS
                  ======================================== */}
              <div className="flex items-center gap-3">
                {/* Connect Button - Desktop */}
                <motion.div
                  animate={{
                    scale: scrolled ? 0 : 1,
                    opacity: scrolled ? 0 : 1,
                    width: scrolled ? 0 : 'auto',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="hidden sm:block overflow-hidden"
                >
                  <a href="fivem://connect/cfx.re/join/emvjbd">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative overflow-hidden group/btn px-5 py-2.5 bg-[#ff0033] hover:bg-[#ff1a4a] border border-[#ff0033]/50 text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,0,51,0.3)] hover:shadow-[0_0_30px_rgba(255,0,51,0.5)] rounded-xl"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                      <span className="relative z-10 text-[10px] font-bold uppercase tracking-widest font-display flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">play_arrow</span>
                        Connect
                      </span>
                    </motion.button>
                  </a>
                </motion.div>

                {/* Compact Connect - When Scrolled */}
                <motion.div
                  animate={{
                    scale: scrolled ? 1 : 0,
                    opacity: scrolled ? 1 : 0,
                    width: scrolled ? 'auto' : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="hidden sm:block overflow-hidden"
                >
                  <a href="fivem://connect/cfx.re/join/emvjbd">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-[#ff0033] hover:bg-[#ff1a4a] rounded-xl flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,0,51,0.3)] hover:shadow-[0_0_25px_rgba(255,0,51,0.5)] transition-all duration-300"
                    >
                      <span className="material-symbols-outlined text-lg">play_arrow</span>
                    </motion.button>
                  </a>
                </motion.div>

                {/* Mobile Menu Toggle */}
                <motion.button
                  className="md:hidden text-gray-300 p-2 hover:text-white transition-colors relative rounded-xl hover:bg-white/5"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle Menu"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="material-symbols-outlined text-2xl">
                    {isMenuOpen ? 'close' : 'menu'}
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* ========================================
              MOBILE MENU - Animated Dropdown
              ======================================== */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="md:hidden mt-3 mx-auto max-w-[350px]"
              >
                <div className="bg-[#0a0004]/95 border border-[#ff0033]/20 backdrop-blur-xl rounded-2xl relative p-4 shadow-[0_20px_60px_-15px_rgba(255,0,51,0.2)]">
                  {/* Decorative Header */}
                  <div className="flex items-center justify-center gap-3 mb-4 opacity-50">
                    <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#ff0033]" />
                    <span className="text-[10px] font-display tracking-widest uppercase text-[#ff0033]">
                      Navigation
                    </span>
                    <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#ff0033]" />
                  </div>

                  {/* Menu Items */}
                  <div className="flex flex-col gap-1">
                    {navLinks.map((item, idx) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`group relative flex items-center justify-between px-4 py-3 text-sm font-bold uppercase tracking-widest transition-all duration-300 rounded-xl overflow-hidden ${activeSection === item.id
                            ? 'bg-[#ff0033]/10 border border-[#ff0033]/30 text-[#ff0033]'
                            : 'hover:bg-white/5 border border-transparent text-gray-400 hover:text-white'
                          }`}
                        onClick={() => {
                          setActiveSection(item.id);
                          setIsMenuOpen(false);
                        }}
                      >
                        <span className="relative z-10">{item.name}</span>
                        {activeSection === item.id && (
                          <motion.span
                            className="material-symbols-outlined text-sm"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          >
                            star
                          </motion.span>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                      </motion.a>
                    ))}

                    {/* Mobile CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-4 pt-4 border-t border-white/10 border-dashed"
                    >
                      <a href="fivem://connect/cfx.re/join/emvjbd" className="block">
                        <Button
                          variant="primary"
                          className="w-full !h-12 text-xs font-display tracking-widest shadow-lg shadow-[#ff0033]/20"
                        >
                          <span className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">play_arrow</span>
                            CONNECT NOW
                          </span>
                        </Button>
                      </a>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  );
};

export default Navbar;
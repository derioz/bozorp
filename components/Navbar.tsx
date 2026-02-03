import React, { useState, useEffect, useRef } from 'react';
import Button from './ui/Button';

// Utility for Magnetic Effect
const MagneticLink: React.FC<{
  children: React.ReactNode;
  href: string;
  isActive: boolean;
  onClick: () => void
}> = ({ children, href, isActive, onClick }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const x = (clientX - (left + width / 2)) * 0.3; // Magnetic strength
    const y = (clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      className="relative px-5 py-2 group/link cursor-pointer transition-transform duration-200 ease-out"
    >
      {/* Active Glow/Underline */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-primary transition-all duration-300 ${isActive ? 'w-full opacity-100 shadow-[0_0_10px_#ff0033]' : 'w-0 opacity-0'}`}
      ></div>

      {/* Hover Glitch BG */}
      <div className="absolute inset-0 bg-white/5 skew-x-12 opacity-0 group-hover/link:opacity-100 transition-all duration-300 rounded-sm"></div>

      <span className={`relative z-10 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 font-display ${isActive ? 'text-primary' : 'text-gray-400 group-hover/link:text-white'}`}>
        {children}
      </span>
    </a>
  );
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const navRef = useRef<HTMLElement>(null);

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

  const navLinks = [
    { name: 'Home', id: 'home', href: '#home' },
    { name: 'Lore', id: 'lore', href: '#lore' },
    { name: 'Features', id: 'features', href: '#features' },
    { name: 'Gallery', id: 'gallery', href: '#gallery' },
    { name: 'Hustle', id: 'hustle', href: '#hustle' },
    { name: 'Rules', id: 'rules', href: '#rules' },
  ];

  return (
    <header
      ref={navRef}
      className={`fixed left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex justify-center pointer-events-none ${scrolled ? 'top-4' : 'top-8'}`}
    >
      <div className="pointer-events-auto w-full max-w-[1200px] px-4 md:px-0 perspective-[1000px]">

        {/* TICKET CONTAINER */}
        <div
          className={`relative mx-auto transition-all duration-700 ease-out group ${scrolled ? 'h-16 max-w-[900px] rotate-x-0' : 'h-24 max-w-[1200px] hover:rotate-x-2'}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* 1. Ticket Body */}
          <div
            className="absolute inset-0 bg-[#0f0409]/90 backdrop-blur-xl border border-white/5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-[0_0_40px_-10px_rgba(255,0,51,0.2)]"
            style={{
              clipPath: 'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px)',
              borderRadius: '4px'
            }}
          >
            {/* Texture & Ambient Light */}
            <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

            {/* Perforated Lines */}
            <div className="absolute left-3 top-0 bottom-0 w-[1px] border-l border-dashed border-white/10 group-hover:border-primary/20 transition-colors"></div>
            <div className="absolute right-3 top-0 bottom-0 w-[1px] border-r border-dashed border-white/10 group-hover:border-primary/20 transition-colors"></div>

            {/* Progress Fuse */}
            <div className="absolute top-0 left-0 h-[2px] w-full bg-white/5">
              <div
                className="h-full bg-gradient-to-r from-primary/0 via-primary to-orange-500 relative transition-all duration-100 ease-linear shadow-[0_0_15px_rgba(255,0,51,0.8)]"
                style={{ width: `${scrollProgress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500/20 rounded-full blur-md animate-pulse"></div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full animate-ping"></div>
              </div>
            </div>
          </div>

          {/* 2. Content Layer */}
          <div className="relative h-full flex items-center justify-between px-8 md:px-12 z-20">

            {/* Logo */}
            <a href="#home" className="flex items-center gap-4 group/logo relative" aria-label="Go to Home">
              <div className={`relative transition-all duration-500 ${scrolled ? 'scale-75' : 'scale-100'}`}>
                {/* Animated Glow */}
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-lg opacity-0 group-hover/logo:opacity-60 transition-opacity duration-500"></div>

                <div className="w-10 h-10 md:w-12 md:h-12 border border-white/10 group-hover/logo:border-primary/50 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md relative z-10 shadow-inner group-active/logo:scale-95 transition-all">
                  <span className="material-symbols-outlined text-gray-400 group-hover/logo:text-primary transition-colors duration-300 text-xl md:text-2xl animate-[spin_20s_linear_infinite]">settings</span>
                  <span className="material-symbols-outlined text-white text-lg absolute group-hover/logo:scale-110 transition-transform">skull</span>
                </div>
              </div>

              <div className={`flex flex-col font-display transition-all duration-500 ${scrolled ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                <span className="text-xl text-white tracking-widest leading-none drop-shadow-md group-hover/logo:text-primary transition-colors">BOZO<span className="text-primary group-hover/logo:text-white transition-colors">RP</span></span>
                <span className="text-[9px] text-gray-500 tracking-[0.4em] uppercase font-body group-hover/logo:text-gray-300 transition-colors">Admit One</span>
              </div>
            </a>

            {/* Desktop Navigation - Magnetic Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((item) => (
                <MagneticLink
                  key={item.id}
                  href={item.href}
                  isActive={activeSection === item.id}
                  onClick={() => setActiveSection(item.id)}
                >
                  {item.name}
                </MagneticLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <div className={`hidden sm:block transition-all duration-500 ${scrolled ? 'scale-90 opacity-0 w-0 overflow-hidden' : 'scale-100 opacity-100'}`}>
                <a href="fivem://connect/cfx.re/join/emvjbd">
                  <button className="relative overflow-hidden group/btn px-6 py-2 bg-white/5 hover:bg-primary border border-white/10 hover:border-primary text-gray-300 hover:text-white transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(255,0,51,0.4)] rounded-sm">
                    <span className="relative z-10 text-[10px] font-bold uppercase tracking-widest font-display">
                      Join City
                    </span>
                  </button>
                </a>
              </div>

              <button
                className="md:hidden text-gray-300 p-2 hover:text-white transition-colors relative active:scale-90"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
              >
                <span className="material-symbols-outlined text-3xl drop-shadow-md">
                  {isMenuOpen ? 'close' : 'airplane_ticket'}
                </span>
              </button>
            </div>
          </div>

          {/* Corner Notches */}
          <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-background-dark rounded-full z-30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] ring-1 ring-white/10"></div>
          <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-background-dark rounded-full z-30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] ring-1 ring-white/10"></div>
        </div>

        {/* Mobile Menu - The Reveal */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] mx-auto max-w-[320px] ${isMenuOpen ? 'max-h-[500px] opacity-100 mt-4 translate-y-0' : 'max-h-0 opacity-0 mt-0 -translate-y-10'}`}
        >
          <div className="bg-[#0f0409]/95 border border-primary/20 backdrop-blur-xl rounded-2xl relative p-4 shadow-[0_10px_40px_-10px_rgba(255,0,51,0.15)]">

            {/* Decorative Header Line */}
            <div className="flex items-center justify-between mb-4 px-2 opacity-50">
              <span className="h-px w-8 bg-primary"></span>
              <span className="text-[10px] font-display tracking-widest uppercase text-primary">Menu</span>
              <span className="h-px w-8 bg-primary"></span>
            </div>

            <div className="flex flex-col gap-2">
              {navLinks.map((item, idx) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`group relative flex items-center justify-between px-4 py-3 text-sm font-bold uppercase tracking-widest transition-all duration-300 rounded-lg overflow-hidden border border-transparent ${activeSection === item.id ? 'bg-primary/10 border-primary/30 text-primary' : 'hover:bg-white/5 hover:border-white/10 text-gray-400 hover:text-white'}`}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMenuOpen(false);
                  }}
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  <span className="relative z-10">{item.name}</span>
                  {activeSection === item.id && (
                    <span className="material-symbols-outlined text-sm animate-pulse relative z-10">star</span>
                  )}

                  {/* Slide BG */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </a>
              ))}

              <div className="mt-4 pt-4 border-t border-white/10 border-dashed">
                <a href="fivem://connect/cfx.re/join/emvjbd">
                  <Button variant="primary" className="w-full !h-12 text-xs font-display tracking-widest shadow-lg shadow-primary/20">
                    CONNECT NOW
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
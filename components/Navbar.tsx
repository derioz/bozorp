import React, { useState, useEffect, useRef } from 'react';
import Button from './ui/Button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Handle Compact Mode
      setScrolled(window.scrollY > 50);

      // 2. Handle Active Section Logic
      const sections = ['home', 'lore', 'features', 'hustle', 'rules'];
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

      // 3. Handle Progress Calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((window.scrollY / totalHeight) * 100, 100);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home', href: '#home' },
    { name: 'Lore', id: 'lore', href: '#lore' },
    { name: 'Features', id: 'features', href: '#features' },
    { name: 'Hustle', id: 'hustle', href: '#hustle' },
    { name: 'Rules', id: 'rules', href: '#rules' },
  ];

  return (
    <header 
        ref={navRef} 
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-out flex justify-center pointer-events-none ${scrolled ? 'top-4' : 'top-8'}`}
    >
      <div className="pointer-events-auto w-full max-w-[1200px] px-4 md:px-0">
        
        {/* TICKET CONTAINER */}
        <div 
            className={`relative mx-auto transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group ${scrolled ? 'h-16 max-w-[900px]' : 'h-24 max-w-[1200px]'}`}
        >
          {/* 1. The Ticket Body Shape */}
          <div 
             className="absolute inset-0 bg-[#0f0409] border border-[#2a0a15] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] overflow-hidden"
             style={{
                 clipPath: 'polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)',
                 borderRadius: '2px'
             }}
          >
             {/* Texture Noise */}
             <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
             
             {/* Perforated Lines (Vertical Side Accents) */}
             <div className="absolute left-2 top-0 bottom-0 w-[2px] border-l-2 border-dashed border-white/10"></div>
             <div className="absolute right-2 top-0 bottom-0 w-[2px] border-r-2 border-dashed border-white/10"></div>

             {/* Burning Fuse Progress Bar (Top Edge) */}
             <div className="absolute top-0 left-0 h-[2px] bg-white/5 w-full">
                 <div 
                    className="h-full bg-gradient-to-r from-transparent via-primary to-orange-400 relative"
                    style={{ width: `${scrollProgress}%` }}
                 >
                     {/* The Spark */}
                     <div className="absolute right-0 -top-1 w-3 h-3 bg-orange-500 rounded-full blur-[2px] animate-pulse"></div>
                     <div className="absolute right-0 -top-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
                 </div>
             </div>
          </div>

          {/* 2. Content Layer */}
          <div className="relative h-full flex items-center justify-between px-6 md:px-10 z-20">
            
            {/* Logo Stamp */}
            <a href="#home" className="flex items-center gap-3 group/logo relative">
               <div className={`relative transition-all duration-300 ${scrolled ? 'scale-75' : 'scale-100'}`}>
                   {/* Circle Stamp BG */}
                   <div className="absolute inset-0 bg-primary rounded-full blur-md opacity-20 group-hover/logo:opacity-40 animate-pulse-slow"></div>
                   <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-primary/50 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-sm relative z-10">
                       <span className="material-symbols-outlined text-primary text-xl md:text-2xl animate-[spin_10s_linear_infinite]">settings</span>
                       <span className="material-symbols-outlined text-white text-lg absolute">skull</span>
                   </div>
               </div>
               <div className={`flex flex-col font-circus transition-all duration-300 ${scrolled ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                   <span className="text-xl text-white tracking-widest leading-none">BOZO<span className="text-primary">RP</span></span>
                   <span className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">Admit One</span>
               </div>
            </a>
            
            {/* Desktop Navigation - Ticket Stubs */}
            <nav className="hidden md:flex items-center gap-2">
              {navLinks.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a 
                    key={item.name}
                    href={item.href}
                    onClick={() => setActiveSection(item.id)}
                    className="relative px-4 py-2 group/link"
                  >
                    {/* Active Stamp Effect */}
                    <div 
                        className={`absolute inset-0 border-2 border-primary rounded-md opacity-0 transition-all duration-300 scale-110 rotate-2 ${isActive ? 'opacity-100 scale-100 rotate-[-2deg]' : ''}`}
                        style={{ borderStyle: 'dashed' }}
                    ></div>
                    
                    {/* Background Glitch on Hover */}
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover/link:opacity-100 transition-opacity skew-x-12"></div>

                    <span className={`relative z-10 text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${isActive ? 'text-primary drop-shadow-[0_0_8px_rgba(255,0,51,0.8)]' : 'text-gray-400 group-hover/link:text-white'}`}>
                        {item.name}
                    </span>
                  </a>
                );
              })}
            </nav>
            
            {/* Actions */}
            <div className="flex items-center gap-4">
              <div className={`hidden sm:block transition-all duration-300 ${scrolled ? 'scale-90' : 'scale-100'}`}>
                 <a href="fivem://connect/cfx.re/join/emvjbd">
                   <button className="relative overflow-hidden group/btn px-6 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/40 text-primary hover:text-white transition-all duration-300 skew-x-[-10deg]">
                      <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                      <span className="relative z-10 text-xs font-bold uppercase tracking-widest skew-x-[10deg] inline-block">
                        Join City
                      </span>
                   </button>
                 </a>
              </div>
              
              <button 
                className="md:hidden text-gray-300 p-2 hover:text-white transition-colors relative"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="material-symbols-outlined text-3xl">{isMenuOpen ? 'close' : 'airplane_ticket'}</span>
              </button>
            </div>
          </div>
          
          {/* Corner Notches (The "Ticket" Look) */}
          <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-background-dark rounded-full z-30 shadow-inner"></div>
          <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-background-dark rounded-full z-30 shadow-inner"></div>

        </div>

        {/* Mobile Menu - Ticket Roll Style */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] mx-auto max-w-[300px] ${isMenuOpen ? 'max-h-[400px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}>
           <div className="bg-[#0f0409] border border-[#2a0a15] rounded-b-xl relative p-2 shadow-2xl">
              <div className="absolute top-0 left-2 right-2 h-[2px] border-t-2 border-dashed border-white/10"></div>
              
              <div className="flex flex-col gap-1 pt-2">
                {navLinks.map((item) => (
                    <a 
                        key={item.name}
                        href={item.href}
                        className={`text-center py-3 text-sm font-bold uppercase tracking-widest transition-colors relative ${activeSection === item.id ? 'text-primary' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        onClick={() => {
                        setActiveSection(item.id);
                        setIsMenuOpen(false);
                        }}
                    >
                        {activeSection === item.id && (
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary material-symbols-outlined text-sm">label_important</span>
                        )}
                        {item.name}
                    </a>
                ))}
                <div className="p-2 mt-2 border-t border-white/5 border-dashed">
                     <a href="fivem://connect/cfx.re/join/emvjbd">
                        <Button variant="primary" className="w-full !h-10 text-xs">CONNECT NOW</Button>
                     </a>
                </div>
              </div>
           </div>
           {/* Bottom Torn Edge Effect */}
           <div className="h-2 w-full bg-[linear-gradient(45deg,transparent_33%,#0f0409_33%,#0f0409_66%,transparent_66%)] bg-[size:12px_8px] rotate-180"></div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
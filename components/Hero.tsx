import React, { useEffect, useState } from 'react';
import Button from './ui/Button';

const Hero: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 50;
      const y = (e.clientY / window.innerHeight - 0.5) * 50;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const tickerItems = [
    "🚨 LOS SANTOS POLICE DEPARTMENT HIRING: FAST TRACK APPLICATIONS OPEN 🚨",
    "STABLE ECONOMY • PLAYER OWNED BUSINESSES • CUSTOM IMPORTS",
    "CITY STATUS: HIGH POPULATION • ACTIVE STAFF",
    "ESTABLISHED GANG TERRITORIES • DRUG MANUFACTURING",
    "REALISTIC RP • SERIOUS STORYLINES • NO PAY TO WIN",
    "JOIN THE BEST FIVEM EXPERIENCE TODAY"
  ];

  return (
    <section id="home" className="relative w-full h-screen min-h-[900px] flex flex-col items-center justify-center overflow-hidden bg-[#050002]">

      {/* --- LAYER 1: BASE BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center grayscale contrast-125 brightness-[0.4] scale-110"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1444723121867-c61e74e36b1d?q=80&w=2053&auto=format&fit=crop")', // Dark city skyline
            transform: `translate(${offset.x * -0.1}px, ${offset.y * -0.1}px) scale(1.1)`
          }}
        ></div>
        {/* Color Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050002] via-[#050002]/40 to-[#050002]"></div>
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay"></div>
      </div>

      {/* --- LAYER 2: VISUAL EFFECTS --- */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        {/* Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none"></div>
      </div>

      {/* --- LAYER 3: ATMOSPHERE --- */}
      <div className="absolute inset-0 pointer-events-none z-[2]">
        {/* Subtle Particles instead of blood/balloons */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-float opacity-30"></div>
      </div>

      {/* --- LAYER 4: SPOTLIGHTS --- */}
      <div className="absolute inset-0 pointer-events-none z-[3]">
        <div className="absolute -top-[50%] left-[10%] w-[300px] h-[200%] bg-gradient-to-b from-white/5 via-white/5 to-transparent rotate-[20deg] blur-[100px] animate-[pulse_5s_ease-in-out_infinite]"></div>
        <div className="absolute -top-[50%] right-[10%] w-[300px] h-[200%] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent rotate-[-20deg] blur-[100px] animate-[pulse_4s_ease-in-out_infinite_reverse]"></div>
      </div>


      {/* --- LAYER 5: CONTENT --- */}
      <div className="relative z-10 w-full max-w-[1400px] px-6 flex flex-col items-center justify-center h-full pt-20">

        {/* Pre-Header */}
        <div
          className="mb-8 flex items-center gap-4 animate-[fadeIn_1s_ease-out]"
          style={{ transform: `translate(${-offset.x * 0.3}px, ${-offset.y * 0.3}px)` }}
        >
          <div className="h-[1px] w-12 bg-gray-500"></div>
          <span className="font-display font-bold uppercase tracking-[0.4em] text-xs text-gray-300 text-shadow-sm">
            San Andreas • Serious RP
          </span>
          <div className="h-[1px] w-12 bg-gray-500"></div>
        </div>

        {/* MAIN TITLE */}
        <div
          className="relative text-center perspective-1000 mb-10"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        >
          {/* Main Title */}
          <h1 className="relative font-circus leading-[0.9] tracking-normal select-none group cursor-default">
            <span className="block text-[15vw] md:text-[160px] text-white z-10 relative filter drop-shadow-[0_20px_20px_rgba(0,0,0,1)] transition-colors duration-300">
              BOZO
            </span>

            {/* Subtext */}
            <span style={{
              background: 'linear-gradient(to bottom, #ff0033, #991100)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }} className="block text-[8vw] md:text-[90px] font-circus relative z-20 -mt-2 md:-mt-8 tracking-widest uppercase transform skew-x-[-5deg]">
              ROLEPLAY
            </span>
          </h1>
        </div>

        {/* Description / Hook */}
        <div className="max-w-2xl text-center mb-12 backdrop-blur-md p-8 rounded-2xl border border-white/5 bg-[#0a0206]/60 shadow-2xl">
          <p className="text-xl text-gray-200 font-display font-light leading-relaxed">
            A serious roleplay experience where your story matters.
            <br />
            <span className="text-gray-400">Join a city built on </span>
            <span className="text-white font-bold">opportunity, crime,</span>
            <span className="text-gray-400"> and </span>
            <span className="text-primary font-bold">consequence.</span>
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs font-bold uppercase tracking-widest text-gray-500">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_lime]"></span>Economy Based</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_5px_red]"></span>Gang Wars</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-secondary rounded-full shadow-[0_0_5px_purple]"></span>Active PD</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto z-20">
          <a href="fivem://connect/cfx.re/join/emvjbd" className="w-full sm:w-auto group">
            <Button variant="primary" size="lg" className="w-full sm:w-auto !h-16 !px-12 text-xl font-circus tracking-widest border border-white/20 shadow-[0_0_30px_rgba(255,0,51,0.15)] group-hover:shadow-[0_0_50px_rgba(255,0,51,0.4)] group-hover:-translate-y-1 transition-all">
              CONNECT TO CITY
            </Button>
          </a>

          <a href="https://discord.gg/bozorp" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              icon="forum"
              className="w-full sm:w-auto !h-16 !px-10 text-lg font-display font-bold uppercase tracking-widest !border-[#5865F2]/50 !text-[#5865F2] hover:!bg-[#5865F2] hover:!text-white hover:!border-[#5865F2]"
            >
              Join Discord
            </Button>
          </a>
        </div>

      </div>

      {/* --- LAYER 6: BOTTOM TICKER --- */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-[#0a0004] border-t border-white/10 flex items-center overflow-hidden z-20">
        <div className="flex whitespace-nowrap animate-[marquee_40s_linear_infinite]">
          {[...tickerItems, ...tickerItems].map((text, i) => (
            <div key={i} className="flex items-center mx-12 gap-4 opacity-70 hover:opacity-100 transition-opacity">
              <span className="text-primary material-symbols-outlined text-base">emergency_home</span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-300 font-display">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Heavy Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050002_90%)] pointer-events-none z-10"></div>

    </section>
  );
};

export default Hero;
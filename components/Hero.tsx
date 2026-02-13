import React, { useEffect, useRef, useState, useMemo, MouseEvent } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Button from './ui/Button';

// ============================================================================
// TYPES
// ============================================================================
type Point = { x: number; y: number };

interface WaveConfig {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
}

type Particle = {
  left: string;
  top: string;
  size: number;
  travel: number;
  duration: number;
  delay: number;
};

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, filter: 'blur(20px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ============================================================================
// WAVE CONFIG - Dark Crimson Theme
// ============================================================================
const WAVE_PALETTE: WaveConfig[] = [
  { offset: 0, amplitude: 80, frequency: 0.002, color: 'rgba(255, 0, 51, 0.6)', opacity: 0.4 },
  { offset: Math.PI / 2, amplitude: 100, frequency: 0.0018, color: 'rgba(189, 0, 38, 0.5)', opacity: 0.35 },
  { offset: Math.PI, amplitude: 70, frequency: 0.0028, color: 'rgba(120, 0, 30, 0.4)', opacity: 0.3 },
  { offset: Math.PI * 1.5, amplitude: 90, frequency: 0.0015, color: 'rgba(80, 0, 20, 0.35)', opacity: 0.25 },
  { offset: Math.PI * 2, amplitude: 60, frequency: 0.0035, color: 'rgba(255, 255, 255, 0.15)', opacity: 0.15 },
];

// ============================================================================
// COMPONENT
// ============================================================================
const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 });
  const [spotlightPos, setSpotlightPos] = useState<{ x: number; y: number } | null>(null);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  // Generate floating particles
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 35 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 4 + 1,
        travel: Math.random() * 80 - 40,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 3,
      })),
    []
  );

  // Ticker items
  const tickerItems = [
    "🚨 LOS SANTOS POLICE DEPARTMENT HIRING: FAST TRACK APPLICATIONS OPEN 🚨",
    "STABLE ECONOMY • PLAYER OWNED BUSINESSES • CUSTOM IMPORTS",
    "CITY STATUS: HIGH POPULATION • ACTIVE STAFF",
    "ESTABLISHED GANG TERRITORIES • DRUG MANUFACTURING",
    "REALISTIC RP • SERIOUS STORYLINES • NO PAY TO WIN",
    "JOIN THE BEST FIVEM EXPERIENCE TODAY"
  ];

  // Canvas wave animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      targetMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    const drawWave = (wave: WaveConfig) => {
      const { width, height } = canvas;
      ctx.beginPath();
      ctx.moveTo(0, height);

      const mouseInfluence = mouseRef.current.x / width;
      const dynamicAmplitude = wave.amplitude * (0.8 + mouseInfluence * 0.4);
      const dynamicOffset = wave.offset + mouseRef.current.y * 0.001;

      for (let x = 0; x <= width; x += 5) {
        const y =
          height * 0.7 +
          Math.sin(x * wave.frequency + time + dynamicOffset) * dynamicAmplitude +
          Math.sin(x * wave.frequency * 0.5 + time * 0.7) * (dynamicAmplitude * 0.3);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, height * 0.5, 0, height);
      gradient.addColorStop(0, wave.color);
      gradient.addColorStop(1, 'rgba(5, 0, 2, 0.9)');

      ctx.fillStyle = gradient;
      ctx.globalAlpha = wave.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

      ctx.fillStyle = '#050002';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      WAVE_PALETTE.forEach(drawWave);

      time += 0.015;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Spotlight handler
  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setSpotlightPos(null);
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden scroll-mt-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ========================================
          LAYER 1: ANIMATED WAVE CANVAS
          ======================================== */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ background: '#050002' }}
      />

      {/* ========================================
          LAYER 2: GRADIENT OVERLAY
          ======================================== */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050002] via-transparent to-[#050002]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050002_80%)]" />
      </div>

      {/* ========================================
          LAYER 3: FLOATING PARTICLES
          ======================================== */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#ff0033]/40"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              boxShadow: `0 0 ${p.size * 2}px rgba(255, 0, 51, 0.3)`,
            }}
            animate={{
              y: [0, p.travel, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ========================================
          LAYER 4: DYNAMIC SPOTLIGHT
          ======================================== */}
      <AnimatePresence>
        {spotlightPos && (
          <motion.div
            key="spotlight"
            className="absolute z-[3] pointer-events-none rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 0.15,
              scale: 1,
              x: spotlightPos.x - 200,
              y: spotlightPos.y - 200,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{
              width: 400,
              height: 400,
              background: 'radial-gradient(circle, rgba(255,0,51,0.3) 0%, transparent 70%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* ========================================
          LAYER 5: MAIN CONTENT - SPLIT LAYOUT
          ======================================== */}
      <motion.div
        className="relative z-20 min-h-screen flex items-center justify-center px-6 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-[1400px] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">

          {/* LEFT SIDE - Text Content */}
          <motion.div
            variants={itemVariants}
            className="flex-1 text-center lg:text-left order-2 lg:order-1"
          >
            {/* Pre-Header Badge */}
            <motion.div
              variants={itemVariants}
              className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#0a0004]/80 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 backdrop-blur-md"
            >
              <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_lime] animate-pulse"></span>
              San Andreas • Serious RP
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6 leading-tight"
            >
              YOUR STORY.
              <br />
              <span
                style={{
                  background: 'linear-gradient(to right, #ff0033, #ff6666)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                YOUR RULES.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-400 mb-8 max-w-md mx-auto lg:mx-0"
            >
              A serious roleplay experience where your choices matter.
              Join a city built on <span className="text-white font-medium">opportunity, crime,</span> and{' '}
              <span className="text-[#ff0033] font-medium">consequence.</span>
            </motion.p>

            {/* Feature Tags */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10"
            >
              {[
                { label: 'Economy Based', color: 'bg-green-500' },
                { label: 'Gang Wars', color: 'bg-[#ff0033]' },
                { label: 'Active PD', color: 'bg-purple-500' },
              ].map((tag) => (
                <span key={tag.label} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 group">
                  <span className={`w-2 h-2 ${tag.color} rounded-full shadow-lg group-hover:scale-125 transition-transform`}></span>
                  {tag.label}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a href="fivem://connect/cfx.re/join/emvjbd" className="group">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto !h-14 !px-10 text-lg font-display tracking-widest border border-white/20 shadow-[0_0_40px_rgba(255,0,51,0.2)] group-hover:shadow-[0_0_60px_rgba(255,0,51,0.6)] group-hover:-translate-y-1 transition-all duration-300"
                >
                  CONNECT TO CITY
                </Button>
              </a>

              <a
                href="https://discord.gg/bozorp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  icon="forum"
                  className="w-full sm:w-auto !h-14 !px-8 text-base font-display font-medium uppercase tracking-widest !border-[#5865F2]/50 !text-[#5865F2] hover:!bg-[#5865F2] hover:!text-white hover:!border-[#5865F2] shadow-[0_0_30px_rgba(88,101,242,0.15)] transition-all duration-300"
                >
                  Join Discord
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - Logo */}
          <motion.div
            variants={logoVariants}
            className="relative flex-shrink-0 order-1 lg:order-2 group cursor-pointer"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            {/* Logo Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-full blur-[100px] bg-[#ff0033]/30"
              animate={{
                opacity: isLogoHovered ? 0.8 : 0.4,
                scale: isLogoHovered ? 1.3 : 1,
              }}
              transition={{ duration: 0.4 }}
            />

            {/* The Bozorp Logo */}
            <motion.img
              src="/bozorp-logo.png"
              alt="BOZORP - FiveM Roleplay Server"
              className="relative w-[280px] md:w-[350px] lg:w-[420px] h-auto drop-shadow-[0_0_60px_rgba(255,0,51,0.5)] select-none"
              animate={{
                filter: isLogoHovered
                  ? 'drop-shadow(0 0 80px rgba(255,0,51,0.8))'
                  : 'drop-shadow(0 0 60px rgba(255,0,51,0.5))',
                scale: isLogoHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
              draggable={false}
            />

            {/* Pulsing Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#ff0033]/30"
              style={{ transform: 'scale(1.1)' }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1.1, 1.15, 1.1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

        </div>
      </motion.div>

      {/* ========================================
          LAYER 6: BOTTOM TICKER
          ======================================== */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-[#0a0004]/90 border-t border-[#ff0033]/10 flex items-center overflow-hidden z-[1] backdrop-blur-md">
        <div className="flex whitespace-nowrap animate-[marquee_40s_linear_infinite]">
          {[...tickerItems, ...tickerItems].map((text, i) => (
            <div key={i} className="flex items-center mx-12 gap-4 opacity-60 hover:opacity-100 transition-opacity">
              <span className="text-[#ff0033] material-symbols-outlined text-base animate-pulse">
                emergency_home
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-300">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================
          LAYER 7: VIGNETTE OVERLAY
          ======================================== */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050002_100%)] pointer-events-none z-[5] opacity-70"></div>

      {/* Edge Glow Lines */}
      <div className="pointer-events-none absolute inset-0 z-[6]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff0033]/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-12 h-px bg-gradient-to-r from-transparent via-[#ff0033]/20 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
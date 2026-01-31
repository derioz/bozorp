import React, { useState } from 'react';
import { createPortal } from 'react-dom';

interface StatItemProps {
  icon: string;
  label: string;
  value: string | React.ReactNode;
  tooltipContent?: React.ReactNode;
}

// Tooltip Component: Renders via Portal to ensure it sits on top of everything
const Tooltip: React.FC<{ content: React.ReactNode, x: number, y: number }> = ({ content, x, y }) => {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div 
      className="fixed z-[9999] pointer-events-none w-[380px] p-6 rounded-xl bg-[#0a0206]/95 border border-primary/30 shadow-[0_0_50px_rgba(255,0,153,0.25)] backdrop-blur-xl animate-[fadeIn_0.3s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
      style={{ 
        left: x + 20, 
        top: y + 20,
        // Ensure tooltip stays on screen on mobile/smaller screens
        maxWidth: 'calc(100vw - 40px)', 
        transform: 'translateY(0)', // GPU acceleration hint
      }}
    >
      {/* Background Gradients & Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl pointer-events-none"></div>
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 blur-[60px] rounded-full pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-primary/50 to-transparent opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-left">
        {content}
      </div>
    </div>,
    document.body
  );
};

const StatItem: React.FC<StatItemProps> = ({ icon, label, value, tooltipContent }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <div 
        className={`flex-1 min-w-[240px] glass-panel rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 group border border-white/5 shadow-lg relative ${tooltipContent ? 'cursor-help hover:border-primary/50 hover:bg-white/5' : 'hover:bg-white/5'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
          {/* Icon Box */}
          <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 transition-all duration-300 group-hover:scale-110 ${tooltipContent ? 'group-hover:text-primary group-hover:bg-primary/10 group-hover:shadow-[0_0_20px_rgba(255,0,153,0.3)]' : 'group-hover:text-white group-hover:bg-primary/20'}`}>
              <span className="material-symbols-outlined text-2xl">{icon}</span>
          </div>
          
          {/* Text Content */}
          <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 group-hover:text-gray-300 transition-colors">{label}</p>
              <div className="text-xl font-circus text-white tracking-wide">{value}</div>
          </div>
          
          {/* Active Indicator for Tooltip Items */}
          {tooltipContent && (
             <div className="absolute top-3 right-3 flex gap-1">
                 <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
             </div>
          )}
      </div>
      
      {isHovered && tooltipContent && (
        <Tooltip content={tooltipContent} x={mousePos.x} y={mousePos.y} />
      )}
    </>
  );
};

const PoliceTooltipContent = () => (
  <div className="space-y-4 font-display">
      <div className="flex items-center gap-3 border-b border-primary/20 pb-3 mb-2">
         <div className="p-1.5 bg-primary/10 rounded-lg border border-primary/20">
            <span className="material-symbols-outlined text-primary text-xl block animate-pulse">local_police</span>
         </div>
         <h4 className="text-white font-bold uppercase tracking-widest text-sm text-shadow-sm">Law & Order Needed</h4>
      </div>
      
      <p className="text-xs text-gray-300 font-light leading-relaxed">
        Right now, the city is too comfortable. We need officers who will <strong className="text-primary font-bold">lay the law down</strong>, bring pressure, create RP, and make criminals think twice.
      </p>

      <div className="bg-[#1a050f]/80 p-3 rounded-lg border-l-2 border-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay"></div>
        <p className="text-xs italic text-gray-400 relative z-10">
          "This isn’t mall-cop RP. This is presence, patrols, traffic stops, investigations, and real consequences."
        </p>
      </div>
      
      <div className="space-y-2 pt-1">
        <span className="text-secondary font-bold text-[10px] uppercase tracking-wider block">🔹 What You Get</span>
        <ul className="text-xs text-gray-400 space-y-1.5 pl-1">
          <li className="flex items-center gap-2">
             <span className="w-1 h-1 bg-secondary rounded-full"></span>Immediate placement
          </li>
          <li className="flex items-center gap-2">
             <span className="w-1 h-1 bg-secondary rounded-full"></span>Clean systems
          </li>
          <li className="flex items-center gap-2">
             <span className="w-1 h-1 bg-secondary rounded-full"></span>A city that actually reacts to policing
          </li>
          <li className="flex items-center gap-2">
             <span className="w-1 h-1 bg-secondary rounded-full"></span>Room to promote, specialize & shape department
          </li>
          <li className="flex items-center gap-2">
             <span className="w-1 h-1 bg-secondary rounded-full"></span>Respect from staff and players alike
          </li>
        </ul>
      </div>

      <p className="text-xs text-gray-300 pt-3 border-t border-white/5">
        If you’re tired of dead departments, powerless cops, or servers that never back their police — <span className="text-white font-medium">this is your sign.</span>
      </p>
      
      <div className="text-center pt-2">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-circus text-sm tracking-[0.2em] animate-pulse">STEP UP. BADGE UP.</span>
      </div>
  </div>
);

const StatsBar: React.FC = () => {
  return (
    <div className="w-full relative z-10 px-4 py-12 bg-[#0a0206] border-b border-white/5">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      
      <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="flex flex-wrap gap-6 justify-center">
            <StatItem 
              icon="groups" 
              label="Population" 
              value="20+ (Growing)"
            />
             <StatItem 
              icon="dns" 
              label="Stability" 
              value={<span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> NO CRASHES</span>}
            />
             <StatItem 
              icon="schedule" 
              label="Uptime" 
              value="24/7 Online"
            />
             <StatItem 
              icon="local_police" 
              label="Recruiting" 
              value={<span className="text-primary group-hover:text-white transition-colors">POLICE (Open)</span>}
              tooltipContent={<PoliceTooltipContent />}
            />
          </div>
      </div>
    </div>
  );
};

export default StatsBar;
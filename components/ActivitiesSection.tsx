import React from 'react';

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

const ActivityCard: React.FC<ActivityProps> = ({ title, tag, description, icon, color, image, riskLevel, index }) => (
  <div className={`group relative h-[420px] rounded-3xl overflow-hidden bg-[#12030b] border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] ${index === 6 ? 'md:col-span-2 lg:col-span-3' : ''}`}>
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
          <div 
             className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-50"
             style={{ backgroundImage: `url(${image})` }}
          />
          {/* Gradient Overlays for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0206] via-[#0a0206]/90 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0206] z-10 opacity-80"></div>
      </div>

      {/* Hover Ambient Glow */}
      <div 
         className="absolute inset-0 z-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none mix-blend-screen"
         style={{ background: `radial-gradient(circle at 50% 100%, ${color}, transparent 60%)` }}
      ></div>

      {/* Content */}
      <div className="relative z-20 h-full p-8 flex flex-col justify-end">
          
          {/* Icon - Floats top right */}
          <div className="absolute top-6 right-6 w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300 group-hover:scale-110 shadow-lg">
             <span className="material-symbols-outlined text-3xl text-gray-300 group-hover:text-white transition-colors">{icon}</span>
          </div>

          {/* Tag - Slides in on hover */}
          <div className="mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 ease-out">
             <span 
                className="inline-flex items-center px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-[0.2em] border shadow-lg backdrop-blur-sm"
                style={{ borderColor: `${color}40`, color: color, backgroundColor: 'rgba(0,0,0,0.6)' }}
             >
                {tag}
             </span>
          </div>

          {/* Title */}
          <h3 className="text-3xl lg:text-4xl font-circus text-white mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
            {title}
          </h3>

          {/* Description - Expands on hover */}
          <div className="relative overflow-hidden transition-all duration-500 max-h-[80px] group-hover:max-h-[160px] opacity-70 group-hover:opacity-100">
             <p className="text-sm md:text-base font-body text-gray-300 font-light leading-relaxed">
               {description}
             </p>
          </div>

          {/* Risk Level Meter - Slides up on hover */}
          <div className="mt-6 pt-5 border-t border-white/10 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200 ease-out">
             <div className="flex items-center justify-between mb-2">
                 <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Risk Level</span>
                 <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: color }}>
                    {riskLevel === 5 ? 'EXTREME' : riskLevel >= 3 ? 'MODERATE' : 'SAFE'}
                 </span>
             </div>
             <div className="flex gap-1.5">
                {[1,2,3,4,5].map((level) => (
                    <div 
                        key={level} 
                        className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${level <= riskLevel ? '' : 'bg-white/5'}`}
                        style={{ 
                            backgroundColor: level <= riskLevel ? color : undefined,
                            boxShadow: level <= riskLevel ? `0 0 10px ${color}60` : 'none'
                        }}
                    />
                ))}
             </div>
          </div>

      </div>
  </div>
);

const ActivitiesSection: React.FC = () => {
  const activities = [
    {
      title: "TRUCKING",
      tag: "Top Legal Job",
      description: "Carry cargo, deliver loads, avoid road issues, and complete routes across San Andreas. Smooth, consistent, high-tier income. Great for solo grinders.",
      icon: "local_shipping",
      color: "#00f3ff",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop",
      riskLevel: 1
    },
    {
      title: "FISHING",
      tag: "Chill & Profitable",
      description: "Use bait, catch different fish types, sell at docks, and enjoy RNG bonuses. Relaxing gameplay with solid earning potential. Perfect for progression without stress.",
      icon: "set_meal",
      color: "#60a5fa",
      image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=2069&auto=format&fit=crop",
      riskLevel: 1
    },
    {
      title: "HUNTING",
      tag: "Active + Rewarding",
      description: "Track animals, hunt in wilderness zones, collect pelts, and take Hunt Master missions. Skill, accuracy, and pacing all matter. Rewarding but requires patience.",
      icon: "crisis_alert",
      color: "#4ade80",
      image: "https://images.unsplash.com/photo-1475724017904-b712052c192a?q=80&w=2070&auto=format&fit=crop",
      riskLevel: 2
    },
    {
      title: "TAXI",
      tag: "Starter Job",
      description: "Pick up NPC passengers, learn the map, and earn steady fares. Perfect for new players learning the city or anyone who wants something simple and social.",
      icon: "local_taxi",
      color: "#facc15",
      image: "https://images.unsplash.com/photo-1556122071-e404eaedb77f?q=80&w=1934&auto=format&fit=crop",
      riskLevel: 2
    },
    {
      title: "MALL SALES",
      tag: "Low Risk",
      description: "Buy items from the mall and sell them to NPCs around the map. A light hustle job with rotating fashion trends. Low-risk, low-stress, solid for casual players.",
      icon: "shopping_bag",
      color: "#f472b6",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop",
      riskLevel: 1
    },
    {
      title: "ACCESSORIES",
      tag: "Side-Hustle",
      description: "Sell higher-tier accessories like handbags and specialty caps to specific NPCs. Great filler work between major jobs. Works well for scavengers.",
      icon: "diamond",
      color: "#c084fc",
      image: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=2070&auto=format&fit=crop",
      riskLevel: 1
    },
    {
      title: "DRUG ECONOMY",
      tag: "High Risk • High Reward",
      description: "Farm, process, cut, and sell illegal product through various methods: street sales, narcos, smuggling, etc. Impacted heavily by police presence. High-variance and RP-heavy. Own the streets or end up in cuffs.",
      icon: "science",
      color: "#ef4444",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop",
      riskLevel: 5
    }
  ];

  return (
    <section id="hustle" className="w-full py-24 bg-[#0d0308] relative scroll-mt-20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-20">
                <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4 block animate-pulse">Welcome To The City</span>
                <h2 className="text-4xl md:text-6xl font-circus text-white mb-8">
                    CHOOSE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">HUSTLE</span>
                </h2>
                <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed">
                    Bozo RP gives you a full, living economy without forcing you into one playstyle. Every job is optional, every path works solo, and every system rewards time and effort in different ways.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activities.map((act, index) => (
                    <ActivityCard key={index} {...act} index={index} />
                ))}
            </div>
        </div>
    </section>
  );
};

export default ActivitiesSection;
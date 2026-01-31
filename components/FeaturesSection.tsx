import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-all duration-300 hover:-translate-y-2 group border border-white/5">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-surface-light to-transparent border border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/50 transition-colors">
            <span className="material-symbols-outlined text-3xl text-gray-300 group-hover:text-primary transition-colors">{icon}</span>
        </div>
        <h3 className="text-xl font-circus text-white mb-3 tracking-wide">{title}</h3>
        <p className="text-gray-400 font-light text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    { icon: "local_taxi", title: "Custom Imports", description: "200+ Custom vehicles tailored for street racing and drifting." },
    { icon: "theater_comedy", title: "Serious RP", description: "Immersive storytelling where your choices actually matter." },
    { icon: "badge", title: "Whitelisted Jobs", description: "Police, EMS, DOJ and custom business ownership available." },
    { icon: "skull", title: "Underground", description: "Deep underground economy, drug labs, and heist progression." }
  ];

  return (
    <section id="features" className="w-full py-32 bg-[#0a0206] relative scroll-mt-20">
      {/* Texture Background */}
      <div className="absolute inset-0 circus-stripes opacity-10 pointer-events-none"></div>
      
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em] mb-3 block">Server Features</span>
          <h2 className="text-4xl md:text-5xl font-circus text-white">THE MAIN <span className="text-primary">ATTRACTIONS</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
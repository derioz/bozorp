import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="lore" className="w-full py-24 bg-[#0a0206] relative scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="w-full lg:w-1/2 order-2 lg:order-1 relative group">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-10"></div>
               <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                  style={{
                      backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBjIhh9gfxR7Fyw1DHJHtRk5zb7dSQtzKF8fPNlWYH6Zlobez3a-Xdkmr-3KRyn1ADIwQhvtu9eahFChqR3M41ljbUEXXEr4FX-8SVq6KWPlqZ6HIG3MNOzQnVxTSiI3NOKK1Wk9kYmuZtlYfKSKVAXwCTRnzVLW3GsieTX6gNXsaTkXd5sL23c8WiBHMlzUVDt8MAS-cTwLK9zszUc-k7q-eOkZyrDNG4BIe9D6Bp2bRQnqhbmsYCS49uo8igOax8EGpgJJ86bHXI")'
                  }}
               ></div>
            </div>
            {/* Decoration */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-circus-stripes rounded-full opacity-20 -z-10 animate-spin-slow"></div>
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col gap-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 self-start">
                 <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                 <span className="text-xs font-bold uppercase tracking-widest text-gray-300">About The City</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-circus text-white leading-tight">
              BEHIND THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">CURTAIN</span>
            </h2>
            
            <div className="space-y-4 text-gray-400 text-lg leading-relaxed font-light">
              <p>
                Step into a city where chaos reigns. Our server lore is built on deep storytelling, serious roleplay, and a touch of madness. The government has collapsed, and the streets are run by those brave enough to take them.
              </p>
              <p>
                Whether you want to run a legitimate business, join the remaining police force, or rule the underground economy, the stage is set for you.
              </p>
            </div>
            
            <div className="pt-4">
                <button className="text-white text-sm font-bold uppercase tracking-widest border-b border-primary pb-1 hover:text-primary hover:border-white transition-colors">
                    Read Full Lore
                </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
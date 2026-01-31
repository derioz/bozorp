import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#150a11] border-t border-[#48233c] py-16 relative overflow-hidden">
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="max-w-[1024px] mx-auto px-6 relative z-10">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-12">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-3xl select-none animate-float">sentiment_very_dissatisfied</span>
              <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white uppercase tracking-tight select-none font-circus">
                    Bozo<span className="text-primary">RP</span>
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">Dark Circus Roleplay</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4 items-center">
              {/* YouTube */}
              <a 
                href="https://www.youtube.com/@bozorp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] hover:-translate-y-1"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a 
                href="https://www.tiktok.com/@bozorp1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-black hover:text-[#00f2ea] hover:border-[#00f2ea] hover:shadow-[0_0_20px_rgba(0,242,234,0.4)] hover:-translate-y-1"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>

              {/* Discord */}
              <a 
                href="https://discord.gg/bozorp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-[#5865F2] hover:text-white hover:border-[#5865F2] hover:shadow-[0_0_20px_rgba(88,101,242,0.4)] hover:-translate-y-1"
                aria-label="Discord"
              >
                 <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z"/>
                 </svg>
              </a>
            </div>
        </div>
        
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="text-xs text-gray-600 font-medium text-center md:text-left">
            <p>© 2024 BozoRP. All rights reserved.</p>
            <p className="mt-1 opacity-60">Not affiliated with Rockstar Games.</p>
          </div>

          {/* Vexel Studios Pill */}
          <a 
            href="http://vexelstudios.xyz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative"
          >
             <div className="relative overflow-hidden rounded-full bg-black/40 border border-white/5 px-5 py-2 flex items-center gap-3 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-black/60 hover:shadow-[0_0_20px_rgba(204,255,0,0.1)]">
                
                <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider group-hover:text-gray-300 transition-colors">
                    Created by
                </span>

                {/* CSS Logo Recreation */}
                <div className="flex items-baseline gap-[1px]">
                    <span className="font-display font-extrabold text-white text-lg tracking-tight relative group-hover:animate-pulse">
                        vexelstudios
                        {/* Glitch Effect Layers (Visible on Hover) */}
                        <span className="absolute inset-0 text-[#ccff00] opacity-0 group-hover:opacity-70 group-hover:translate-x-[1px] mix-blend-multiply transition-opacity">vexelstudios</span>
                        <span className="absolute inset-0 text-[#ff0099] opacity-0 group-hover:opacity-70 group-hover:-translate-x-[1px] mix-blend-multiply transition-opacity">vexelstudios</span>
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00] group-hover:scale-125 transition-transform duration-300"></span>
                </div>

                {/* Scanline Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none"></div>
             </div>
          </a>

        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
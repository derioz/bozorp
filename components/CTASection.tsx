import React, { useState } from 'react';
import Button from './ui/Button';

const CTASection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('cfx.re/join/emvjbd');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-32 bg-[#0a0206] relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,153,0.05),transparent_70%)] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      {/* Animated Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse] pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Text & Context */}
            <div className="text-left space-y-8">
                <div>
                    <span className="inline-block py-1 px-3 rounded bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4 animate-pulse">
                        Live Status: Online 🟢
                    </span>
                    <h2 className="text-5xl md:text-7xl font-circus text-white leading-none drop-shadow-xl">
                        READY TO <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">ENTER HELL?</span>
                    </h2>
                </div>
                
                <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md">
                    No applications. No waiting weeks for an interview. 
                    The gates are open, but survival is up to you. 
                    Connect now and carve your path in the chaos.
                </p>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col gap-2">
                        <span className="material-symbols-outlined text-secondary text-2xl">rocket_launch</span>
                        <span className="text-sm font-bold text-gray-200">Instant Connect</span>
                        <span className="text-xs text-gray-500">Jump straight into the action.</span>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col gap-2">
                        <span className="material-symbols-outlined text-primary text-2xl">groups</span>
                        <span className="text-sm font-bold text-gray-200">Active Community</span>
                        <span className="text-xs text-gray-500">Always someone to RP with.</span>
                    </div>
                </div>
            </div>

            {/* Right Column: Interactive Terminal */}
            <div className="relative">
                {/* Glow Effect behind card */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-50 animate-pulse-slow"></div>
                
                <div className="relative bg-[#12030b] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        </div>
                        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Connection Terminal</span>
                    </div>

                    <div className="space-y-6">
                        <a href="fivem://connect/cfx.re/join/emvjbd" className="block group">
                            <Button variant="primary" size="lg" className="w-full !text-lg !py-8 shadow-[0_0_30px_rgba(255,0,153,0.3)] group-hover:shadow-[0_0_50px_rgba(255,0,153,0.5)]">
                                <span className="mr-2">🚀</span> LAUNCH FIVEM
                            </Button>
                        </a>

                        <div className="relative group">
                            <label className="text-[10px] font-bold uppercase text-gray-500 mb-1 block pl-1">Direct Connect IP</label>
                            <div 
                                onClick={handleCopy}
                                className="flex items-center justify-between bg-black/50 border border-white/10 rounded-xl p-4 cursor-pointer hover:border-white/30 transition-colors group-hover:shadow-[0_0_20px_rgba(0,243,255,0.1)]"
                            >
                                <code className="font-mono text-secondary text-lg">cfx.re/join/emvjbd</code>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs font-bold uppercase transition-all duration-300 ${copied ? 'text-green-400 translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
                                        Copied!
                                    </span>
                                    <span className={`material-symbols-outlined text-gray-400 transition-all duration-300 ${copied ? 'scale-0' : 'scale-100'}`}>
                                        content_copy
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="text-center pt-2">
                            <a href="https://discord.gg/bozorp" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">
                                Need help connecting? Join Discord
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
      </div>
    </section>
  );
};

export default CTASection;
import React, { useState } from 'react';

interface Rule {
  id: number;
  title: string;
  icon: string;
  description: React.ReactNode;
  punishment: string;
}

const RulesSection: React.FC = () => {
  const [openRule, setOpenRule] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const rules: Rule[] = [
    // --- STANDARD RULES (1-7) ---
    {
        id: 1,
        title: "Community Respect",
        icon: "handshake",
        punishment: "Ban",
        description: (
            <div className="space-y-4">
                <p className="text-gray-300">We are a community first. Disrespect, toxicity, hate speech, or harassment towards players or staff will not be tolerated.</p>
                <p className="text-xs text-gray-400">Treat everyone with basic human decency.</p>
            </div>
        )
    },
    {
        id: 2,
        title: "Microphone Required",
        icon: "mic",
        punishment: "Kick / Warn",
        description: (
             <div className="space-y-4">
                <p className="text-gray-300">A working, decent quality microphone is mandatory. You must be able to communicate in English at all times.</p>
                <p className="text-xs text-gray-400">No mic = No RP.</p>
            </div>
        )
    },
    {
        id: 3,
        title: "Powergaming",
        icon: "bolt",
        punishment: "Warn / Ban",
        description: (
             <div className="space-y-4">
                <p className="text-gray-300">Do not force roleplay outcomes on others. You cannot do impossible things (e.g., talking while dead, lifting cars without equipment).</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-400 marker:text-primary">
                    <li>Give others a chance to react</li>
                    <li>Do not abuse game mechanics</li>
                </ul>
            </div>
        )
    },
    {
        id: 4,
        title: "Metagaming",
        icon: "psychology",
        punishment: "Ban",
        description: (
             <div className="space-y-4">
                <p className="text-gray-300">Using out-of-character information (Discord, streams, map glitches) in-game is strictly forbidden.</p>
                <p className="text-gray-400">Your character only knows what they see and hear in the city.</p>
            </div>
        )
    },
    {
        id: 5,
        title: "New Life Rule (NLR)",
        icon: "local_hospital",
        punishment: "Warn / Ban",
        description: (
             <div className="space-y-4">
                <p className="text-gray-300">If you are downed and respawn at the hospital, you forget the immediate events leading to your death.</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-400 marker:text-primary">
                    <li>You cannot return to the scene for 15 minutes</li>
                    <li>You cannot seek revenge for that specific incident</li>
                </ul>
            </div>
        )
    },
    {
        id: 6,
        title: "Safe Zones (Green Zones)",
        icon: "shield",
        punishment: "Ban",
        description: (
             <div className="space-y-4">
                <p className="text-gray-300">Violence and criminal activity are prohibited in neutral grounds.</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-400 marker:text-primary">
                    <li>Hospitals & Medical Centers</li>
                    <li>Police Departments</li>
                    <li>City Hall / Government Buildings</li>
                </ul>
            </div>
        )
    },
    {
        id: 7,
        title: "Combat Logging",
        icon: "power_settings_new",
        punishment: "Ban",
        description: (
             <div className="space-y-4">
                <p className="text-gray-300">Logging out during an active roleplay scene, police chase, or combat to avoid consequences is an instant ban.</p>
            </div>
        )
    },

    // --- SPECIFIC SERVER RULES (8-14) ---
    {
      id: 8,
      title: "Rejoining / Re-Injecting RP Scenes",
      icon: "update",
      punishment: "Admin Discretion",
      description: (
        <div className="space-y-4">
          <p className="text-gray-300">Once you leave a scene, you may not come back to influence it.</p>
          <div className="bg-white/5 p-3 rounded-lg border-l-2 border-primary">
            <p className="text-xs text-gray-400 uppercase mb-2 font-bold tracking-wider">Includes:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-300 marker:text-primary">
                <li>Driving away more than 1 block and returning</li>
                <li>Switching characters to re-enter</li>
                <li>Circling the scene repeatedly</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 9,
      title: "Exploiting",
      icon: "warning",
      punishment: "1-Month Ban + Character Wipe",
      description: (
        <div className="space-y-4">
          <p className="text-red-400 font-bold tracking-wide uppercase text-xs">Instantly Bannable. No Second Chances.</p>
          <p className="text-gray-400 text-sm mb-2">This includes:</p>
          <ul className="grid md:grid-cols-2 gap-3 text-gray-300">
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>Using emotes for advantage</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>Duplicating items</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>Modifying game files</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>Out-of-city money cheats</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>Leaving to avoid bleeding/EMS</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>Selling PD/EMS equipment</li>
          </ul>
        </div>
      )
    },
    {
      id: 10,
      title: "Deathmatching (RDM/VDM)",
      icon: "person_cancel",
      punishment: "1-Week Ban",
      description: (
        <div className="space-y-4">
          <p className="text-gray-300">You must have valid RP initiation before harming another player.</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-400 marker:text-red-500">
            <li>No shooting without conversation or buildup</li>
            <li>No vehicle attacks without reason</li>
            <li>No harming someone without an in-character motive</li>
          </ul>
        </div>
      )
    },
    {
      id: 11,
      title: "Breaking Realism / Serious Roleplay",
      icon: "theater_comedy",
      punishment: "1-Day Ban",
      description: (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
            <h4 className="text-secondary font-bold uppercase text-xs mb-3 tracking-widest border-b border-white/5 pb-2">Vehicle Rules</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• No stunt ramps or unrealistic jumps</li>
              <li>• Sedans/sports cars cannot climb steep mountains</li>
              <li>• City speeds should remain under 80mph</li>
              <li>• No intentional ramming</li>
              <li>• No flying aircraft low through the city</li>
            </ul>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
            <h4 className="text-secondary font-bold uppercase text-xs mb-3 tracking-widest border-b border-white/5 pb-2">Character Rules</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• No animals driving cars or holding guns</li>
              <li>• No aliens or supernatural creatures</li>
              <li>• You must value your life when threatened</li>
              <li>• If you comply and get downed anyway, that is NOT allowed</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 12,
      title: "Miscellaneous Rules",
      icon: "category",
      punishment: "Admin Discretion",
      description: (
        <ul className="grid md:grid-cols-2 gap-y-3 gap-x-8 text-gray-400 list-disc pl-4 marker:text-purple-500">
          <li>Characters must have realistic names</li>
          <li>No sexual puns, troll names, political names</li>
          <li>No cop-baiting</li>
          <li>No stealing emergency vehicles</li>
          <li>You may hold up PD/EMS, but not rob or kidnap them</li>
          <li>No torture or suicide RP</li>
          <li>No rape or sexual force RP</li>
          <li>Don’t be a fun sponge — don’t camp locations just to rob people</li>
        </ul>
      )
    },
    {
      id: 13,
      title: "Reporting Players",
      icon: "gavel",
      punishment: "Evidence Required",
      description: (
        <div className="space-y-4">
          <div className="p-3 bg-red-500/10 border-l-2 border-red-500 text-red-200 text-sm font-medium">
             Do NOT break character to report people.
          </div>
          <div className="grid md:grid-cols-2 gap-6">
             <div className="bg-white/5 p-4 rounded-lg">
                <h5 className="font-bold text-white mb-3 text-sm uppercase flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-primary">chat</span>
                    Use /report ONLY for:
                </h5>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc pl-4 marker:text-primary">
                   <li>Blatant RDM/VDM</li>
                   <li>Blatant OOC ruining RP</li>
                   <li>Hacking</li>
                   <li>Game-breaking issues</li>
                </ul>
             </div>
             <div className="bg-white/5 p-4 rounded-lg">
                <h5 className="font-bold text-white mb-2 text-sm uppercase flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#5865F2]">forum</span>
                    Discord Reports:
                </h5>
                <p className="text-xs mb-3 text-gray-500">For Metagaming, Realism, Rule Breaks:</p>
                <ol className="list-decimal pl-4 text-sm text-gray-400 space-y-1.5 marker:text-white">
                   <li>Stay in character</li>
                   <li>Finish the scene</li>
                   <li>File the report afterward</li>
                </ol>
             </div>
          </div>
          <p className="text-center text-xs text-gray-500 italic">Reports with no evidence will be ignored.</p>
        </div>
      )
    },
    {
      id: 14,
      title: "Streaming",
      icon: "videocam",
      punishment: "Ban (Metagaming)",
      description: (
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-300">
             <span className="material-symbols-outlined text-red-500 animate-pulse">live_tv</span>
             <p>Players may <strong className="text-red-400">NOT</strong>:</p>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-gray-400 marker:text-red-500">
            <li>Stream snipe</li>
            <li>Watch someone’s stream during RP</li>
            <li>Use viewer info as in-city knowledge</li>
          </ul>
          <div className="mt-2 p-2 bg-red-950/30 rounded border border-red-500/20 text-center">
            <p className="text-xs text-red-400 uppercase tracking-widest font-bold">This is all considered metagaming.</p>
          </div>
        </div>
      )
    }
  ];

  const visibleRules = showAll ? rules : rules.slice(0, 8);

  return (
    <section id="rules" className="w-full py-24 bg-[#080205] relative overflow-hidden scroll-mt-20">
      <div className="max-w-[1024px] mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <span className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Code of Conduct</span>
          <h2 className="text-4xl md:text-5xl font-circus text-white mb-6">
            SERVER <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">RULES</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            Ignorance of the law excuses no one. Read them.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {visibleRules.map((rule) => (
            <div 
               key={rule.id}
               className={`group rounded-xl border transition-all duration-300 overflow-hidden ${openRule === rule.id ? 'bg-[#150a11] border-primary/40 shadow-[0_4px_20px_rgba(0,0,0,0.4)]' : 'bg-[#0f0409] border-white/5 hover:bg-[#150a11] hover:border-white/10'}`}
            >
               <button 
                 onClick={() => setOpenRule(openRule === rule.id ? null : rule.id)}
                 className="w-full p-5 flex items-center justify-between text-left"
               >
                 <div className="flex items-center gap-4 md:gap-6">
                    <span className={`text-xl md:text-2xl font-circus w-12 text-center transition-colors ${openRule === rule.id ? 'text-primary' : 'text-white/10 group-hover:text-white/30'}`}>
                      {String(rule.id).padStart(2, '0')}
                    </span>
                    
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${openRule === rule.id ? 'bg-primary/20 text-primary' : 'bg-white/5 text-gray-500 group-hover:bg-white/10 group-hover:text-gray-300'}`}>
                           <span className="material-symbols-outlined text-xl">{rule.icon}</span>
                        </div>
                        <h3 className={`text-base md:text-xl font-bold uppercase tracking-wide transition-colors ${openRule === rule.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                          {rule.title}
                        </h3>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-4">
                    {/* Punishment Badge */}
                    <div className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/5 transition-opacity ${openRule === rule.id ? 'opacity-100' : 'opacity-50'}`}>
                        <span className="text-[10px] font-bold uppercase text-red-400">{rule.punishment}</span>
                    </div>
                    
                    <span className={`material-symbols-outlined text-gray-500 transition-transform duration-300 ${openRule === rule.id ? 'rotate-180 text-primary' : ''}`}>
                       expand_more
                    </span>
                 </div>
               </button>

               <div className={`transition-all duration-500 ease-in-out grid ${openRule === rule.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                     <div className="px-5 pb-8 pl-[20px] md:pl-[108px] md:pr-12 border-t border-white/5 mt-2 pt-6">
                        <div className="md:hidden mb-4 inline-block">
                          <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest border border-red-500/20 px-2 py-1 rounded bg-red-500/5">Penalty: {rule.punishment}</span>
                        </div>
                        {rule.description}
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        <div className="mt-10 flex justify-center">
             <button 
                onClick={() => setShowAll(!showAll)}
                className="group relative px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 rounded-full transition-all duration-300 flex items-center gap-3 backdrop-blur-sm"
             >
                <span className="font-bold uppercase tracking-widest text-sm text-gray-300 group-hover:text-white transition-colors">
                    {showAll ? 'Show Less Rules' : 'Show All Rules'}
                </span>
                <span className={`material-symbols-outlined text-gray-400 group-hover:text-primary transition-all duration-300 ${showAll ? 'rotate-180' : 'group-hover:translate-y-1'}`}>
                    expand_more
                </span>
             </button>
        </div>

      </div>
    </section>
  );
};

export default RulesSection;
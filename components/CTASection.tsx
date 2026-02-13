import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Button from './ui/Button';

const CTASection: React.FC = () => {
    const [copied, setCopied] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const handleCopy = () => {
        navigator.clipboard.writeText('cfx.re/join/emvjbd');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section
            ref={ref}
            className="w-full py-32 bg-[#0a0206] relative overflow-hidden flex flex-col items-center justify-center"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,51,0.08),transparent_70%)]" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Animated Rings */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#ff0033]/10 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Text & Context */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.8 }}
                        className="text-left space-y-8"
                    >
                        <div>
                            <motion.span
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ff0033]/10 border border-[#ff0033]/20 text-[#ff0033] text-xs font-bold uppercase tracking-widest mb-4"
                            >
                                <motion.span
                                    className="w-2 h-2 rounded-full bg-green-500"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                Live Status: Online
                            </motion.span>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ delay: 0.3 }}
                                className="text-5xl md:text-7xl font-display text-white leading-none"
                            >
                                READY TO <br />
                                <span
                                    style={{
                                        background: 'linear-gradient(to right, #ff0033, #a200ff)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    ENTER HELL?
                                </span>
                            </motion.h2>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-400 text-lg font-light leading-relaxed max-w-md"
                        >
                            No applications. No waiting weeks for an interview.
                            The gates are open, but survival is up to you.
                            Connect now and carve your path in the chaos.
                        </motion.p>

                        {/* Feature Cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.5 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {[
                                { icon: 'rocket_launch', title: 'Instant Connect', desc: 'Jump straight into the action.', color: 'text-cyan-400' },
                                { icon: 'groups', title: 'Active Community', desc: 'Always someone to RP with.', color: 'text-[#ff0033]' },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-[#ff0033]/30 flex flex-col gap-2 transition-colors"
                                >
                                    <span className={`material-symbols-outlined ${item.color} text-2xl`}>{item.icon}</span>
                                    <span className="text-sm font-bold text-gray-200">{item.title}</span>
                                    <span className="text-xs text-gray-500">{item.desc}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Interactive Terminal */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Glow Effect behind card */}
                        <motion.div
                            className="absolute -inset-4 bg-gradient-to-r from-[#ff0033]/20 to-purple-500/20 rounded-3xl blur-2xl"
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />

                        <div className="relative bg-[#0a0004] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl overflow-hidden">
                            {/* Terminal Header */}
                            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                                <div className="flex gap-2">
                                    <motion.div
                                        className="w-3 h-3 rounded-full bg-red-500/80"
                                        whileHover={{ scale: 1.2 }}
                                    />
                                    <motion.div
                                        className="w-3 h-3 rounded-full bg-yellow-500/80"
                                        whileHover={{ scale: 1.2 }}
                                    />
                                    <motion.div
                                        className="w-3 h-3 rounded-full bg-green-500/80"
                                        whileHover={{ scale: 1.2 }}
                                    />
                                </div>
                                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Connection Terminal</span>
                            </div>

                            <div className="space-y-6">
                                {/* Launch Button */}
                                <motion.a
                                    href="fivem://connect/cfx.re/join/emvjbd"
                                    className="block group"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        className="w-full !text-lg !py-8 shadow-[0_0_30px_rgba(255,0,51,0.3)] group-hover:shadow-[0_0_50px_rgba(255,0,51,0.5)] transition-shadow"
                                    >
                                        <span className="flex items-center justify-center gap-3">
                                            <span className="material-symbols-outlined text-2xl">play_arrow</span>
                                            LAUNCH FIVEM
                                        </span>
                                    </Button>
                                </motion.a>

                                {/* IP Copy Box */}
                                <div className="relative group">
                                    <label className="text-[10px] font-bold uppercase text-gray-500 mb-1 block pl-1">Direct Connect IP</label>
                                    <motion.div
                                        onClick={handleCopy}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        className="flex items-center justify-between bg-black/50 border border-white/10 rounded-xl p-4 cursor-pointer hover:border-[#ff0033]/30 transition-colors"
                                    >
                                        <code className="font-mono text-cyan-400 text-lg">cfx.re/join/emvjbd</code>
                                        <div className="flex items-center gap-2">
                                            <motion.span
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: copied ? 1 : 0, x: copied ? 0 : 10 }}
                                                className="text-xs font-bold uppercase text-green-400"
                                            >
                                                Copied!
                                            </motion.span>
                                            <motion.span
                                                animate={{ scale: copied ? 0 : 1 }}
                                                className="material-symbols-outlined text-gray-400"
                                            >
                                                content_copy
                                            </motion.span>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Help Link */}
                                <div className="text-center pt-2">
                                    <motion.a
                                        href="https://discord.gg/bozorp"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -2 }}
                                        className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-sm">help</span>
                                        Need help connecting? Join Discord
                                    </motion.a>
                                </div>
                            </div>

                            {/* Decorative Corners */}
                            <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#ff0033]/30" />
                            <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#ff0033]/30" />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default CTASection;
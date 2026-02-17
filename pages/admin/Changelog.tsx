import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/elevenlabs/card';
import { useAuth } from '../../contexts/AuthContext';

// --- Types for Vercel Deployment ---
interface VercelDeployment {
    uid: string;
    name: string;
    url: string; // The automatic deployment URL
    created: number; // Timestamp
    state: 'READY' | 'ERROR' | 'BUILDING' | 'QUEUED' | 'CANCELED';
    meta?: {
        githubCommitRef?: string; // Branch
        githubCommitMessage?: string;
        githubCommitSha?: string;
        githubCommitAuthorName?: string;
    };
}

const Changelog: React.FC = () => {
    const [deployments, setDeployments] = useState<VercelDeployment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Env Vars
    const PROJECT_ID = import.meta.env.VITE_VERCEL_PROJECT_ID;
    const TOKEN = import.meta.env.VITE_VERCEL_TOKEN;

    useEffect(() => {
        const fetchDeployments = async () => {
            if (!PROJECT_ID || !TOKEN) {
                setError("Missing API Credentials. Check .env.local");
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`https://api.vercel.com/v6/deployments?projectId=${PROJECT_ID}&limit=20&target=production`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });

                if (!res.ok) {
                    throw new Error(`API Error: ${res.statusText}`);
                }

                const data = await res.json();
                setDeployments(data.deployments || []);
            } catch (err: any) {
                setError(err.message || "Failed to fetch deployments");
            } finally {
                setLoading(false);
            }
        };

        fetchDeployments();
    }, []);

    // --- Helper: Parse Tags from Commit Message ---
    const getTags = (msg: string = "") => {
        const lower = msg.toLowerCase();
        const tags = [];
        if (lower.match(/\b(fix|bug)\b/)) tags.push({ label: 'BUG FIX', color: '#ff9900', bg: 'rgba(255,153,0,0.1)' });
        if (lower.match(/\b(feat|new|add)\b/)) tags.push({ label: 'NEW FEATURE', color: '#00ffea', bg: 'rgba(0,255,234,0.1)' });
        if (lower.match(/\b(style|ui|ux|design)\b/)) tags.push({ label: 'UI/UX', color: '#a200ff', bg: 'rgba(162,0,255,0.1)' });
        if (lower.match(/\b(hotfix)\b/)) tags.push({ label: 'HOTFIX', color: '#ff0033', bg: 'rgba(255,0,51,0.2)' });

        // Default
        if (tags.length === 0) tags.push({ label: 'UPDATE', color: '#888', bg: 'rgba(255,255,255,0.05)' });

        return tags;
    };

    return (
        <div className="space-y-8 pb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl lg:text-4xl font-display text-white tracking-wider mb-2">
                        System <span style={{ color: '#a200ff' }}>Changelog</span>
                    </h1>
                    <p className="text-gray-500 text-sm">Real-time deployment history from Vercel.</p>
                </div>

                {/* Brand Badge */}
                <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00ffea] animate-pulse" />
                    <span className="text-xs text-gray-400">Maintained by <strong>Vexel Studios</strong></span>
                </div>
            </motion.div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-32 rounded-xl bg-white/5 animate-pulse" />
                    ))}
                </div>
            ) : error ? (
                <div className="p-6 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400">
                    <h3 className="font-bold mb-2">Connection Error</h3>
                    <p>{error}</p>
                    <p className="text-xs mt-4 text-gray-500">Ensure VITE_VERCEL_TOKEN is set in .env.local</p>
                </div>
            ) : (
                <div className="grid gap-6 relative">
                    {/* Timeline Line */}
                    <div className="absolute left-[27px] top-6 bottom-6 w-[2px] bg-white/5 z-0" />

                    {deployments.map((dept, i) => {
                        const commitMsg = dept.meta?.githubCommitMessage || "Manual Deployment";
                        const tags = getTags(commitMsg);
                        const date = new Date(dept.created).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

                        return (
                            <motion.div
                                key={dept.uid}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="relative z-10 pl-16 group"
                            >
                                {/* Timeline Dot */}
                                <div className={`absolute left-4 top-6 w-6 h-6 rounded-full border-2 bg-[#0a0004] z-20 flex items-center justify-center transition-colors ${dept.state === 'READY' ? 'border-[#00ffea]' : dept.state === 'ERROR' ? 'border-[#ff0033]' : 'border-yellow-500'}`}>
                                    {dept.state === 'READY' && <div className="w-2 h-2 rounded-full bg-[#00ffea] shadow-[0_0_10px_#00ffea]" />}
                                    {dept.state === 'ERROR' && <div className="w-2 h-2 rounded-full bg-[#ff0033]" />}
                                    {dept.state === 'BUILDING' && <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />}
                                </div>

                                <Card className="bg-[#0a0004]/80 backdrop-blur-md border-white/5 hover:border-[#a200ff]/30 transition-all p-6 group-hover:bg-[#0f0409]">
                                    <div className="flex flex-col md:flex-row gap-4 md:items-start justify-between mb-4">
                                        <div>
                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {tags.map((t, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded"
                                                        style={{ color: t.color, backgroundColor: t.bg, border: `1px solid ${t.color}30` }}
                                                    >
                                                        {t.label}
                                                    </span>
                                                ))}
                                                {dept.state !== 'READY' && (
                                                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${dept.state === 'ERROR' ? 'text-red-500 border-red-500/30 bg-red-500/10' : 'text-yellow-500 border-yellow-500/30 bg-yellow-500/10'}`}>
                                                        {dept.state}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Commit Message */}
                                            <h3 className="text-xl text-white font-display tracking-wide mb-1">
                                                {commitMsg}
                                            </h3>

                                            {/* Metadata */}
                                            <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                                                <span className="flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-sm">person</span>
                                                    {dept.meta?.githubCommitAuthorName || "Unknown"}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-sm">schedule</span>
                                                    {date}
                                                </span>
                                                <a href={`https://${dept.url}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#a200ff] transition-colors">
                                                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                                                    View Deployment
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            <div className="pt-20 text-center pb-10">
                <p className="text-gray-600 text-xs uppercase tracking-[0.2em] font-medium">
                    Designed & Engineered by <span className="text-white">Vexel Studios</span>
                </p>
            </div>
        </div>
    );
};

export default Changelog;

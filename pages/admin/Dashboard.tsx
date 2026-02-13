import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';

interface DashStats {
    gallery: number;
    rules: number;
    staff: number;
}

const Dashboard: React.FC = () => {
    const { userProfile } = useAuth();
    const [stats, setStats] = useState<DashStats>({ gallery: 0, rules: 0, staff: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [gallerySnap, rulesSnap, staffSnap] = await Promise.all([
                    getDocs(collection(db, 'gallery')),
                    getDocs(collection(db, 'rules')),
                    getDocs(collection(db, 'users')),
                ]);
                setStats({
                    gallery: gallerySnap.size,
                    rules: rulesSnap.size,
                    staff: staffSnap.size,
                });
            } catch (err) {
                console.error('Failed to fetch stats:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { label: 'Gallery Items', value: stats.gallery, icon: 'photo_library', color: '#ff0033' },
        { label: 'Server Rules', value: stats.rules, icon: 'gavel', color: '#a200ff' },
        { label: 'Staff Members', value: stats.staff, icon: 'group', color: '#00ffea' },
    ];

    const quickLinks = [
        { label: 'Manage Gallery', icon: 'photo_library', to: '/admin/gallery', desc: 'Upload & organize media' },
        { label: 'Edit Rules', icon: 'gavel', to: '/admin/rules', desc: 'Add, edit, reorder rules' },
        { label: 'Manage Staff', icon: 'group', to: '/admin/staff', desc: 'Staff roles & profiles' },
        { label: 'My Profile', icon: 'person', to: '/admin/profile', desc: 'Edit your profile' },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl lg:text-4xl font-display text-white tracking-wider">
                    Welcome back,{' '}
                    <span
                        style={{
                            background: 'linear-gradient(to right, #ff0033, #a200ff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        {userProfile?.displayName || 'Admin'}
                    </span>
                </h1>
                <p className="text-gray-500 mt-2">Here's what's happening with your site.</p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {statCards.map((card, i) => (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#0a0004]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 group hover:border-white/10 transition-all"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: `${card.color}15` }}
                            >
                                <span className="material-symbols-outlined text-xl" style={{ color: card.color }}>{card.icon}</span>
                            </div>
                        </div>
                        <div className="text-3xl font-display text-white mb-1">
                            {loading ? (
                                <div className="w-8 h-8 bg-white/5 rounded-lg animate-pulse" />
                            ) : (
                                card.value
                            )}
                        </div>
                        <p className="text-gray-600 text-xs uppercase tracking-widest">{card.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Quick Links */}
            <div>
                <h2 className="text-white font-display tracking-wider text-sm mb-4 uppercase">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {quickLinks.map((link, i) => (
                        <motion.a
                            key={link.to}
                            href={link.to}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.05 }}
                            className="flex items-center gap-4 p-4 rounded-xl bg-[#0a0004]/60 border border-white/5 hover:border-[#ff0033]/30 hover:bg-[#0f0409] transition-all group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#ff0033]/10 transition-colors">
                                <span className="material-symbols-outlined text-gray-500 group-hover:text-[#ff0033] transition-colors">{link.icon}</span>
                            </div>
                            <div>
                                <p className="text-white text-sm font-medium">{link.label}</p>
                                <p className="text-gray-600 text-xs">{link.desc}</p>
                            </div>
                            <span className="material-symbols-outlined text-gray-700 ml-auto group-hover:text-[#ff0033] transition-colors">arrow_forward</span>
                        </motion.a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

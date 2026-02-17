import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Card } from "@/components/ui/elevenlabs/card";

interface StaffMember {
    id: string;
    displayName: string;
    role: string;
    subRoles: string[];
    title: string;
    bio: string;
    profilePicture: string;
    socialLinks: { discord?: string; twitter?: string };
    order: number;
    visible: boolean;
}

const ROLE_CONFIG: Record<string, { color: string; glow: string; label: string }> = {
    superadmin: { color: '#ff0033', glow: 'rgba(255,0,51,0.3)', label: 'FOUNDER' },
    admin: { color: '#a200ff', glow: 'rgba(162,0,255,0.3)', label: 'ADMIN' },
    staff: { color: '#00ffea', glow: 'rgba(0,255,234,0.25)', label: 'STAFF' },
};

// ============================================================================
// STAFF CARD
// ============================================================================
const StaffCard: React.FC<{ member: StaffMember; index: number; isInView: boolean; onSelect: (m: StaffMember) => void }> = ({
    member, index, isInView, onSelect,
}) => {
    const config = ROLE_CONFIG[member.role] || ROLE_CONFIG.staff;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 15 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: 15 }}
            transition={{ delay: 0.15 + index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group relative perspective-[1000px]"
            onClick={() => onSelect(member)}
        >
            <Card
                className="relative h-full border-white/5 bg-[#0a0004] overflow-hidden cursor-pointer transition-all duration-500 group-hover:scale-[1.03] group-hover:border-[#a200ff]/30 group-hover:shadow-[0_20px_60px_-20px_rgba(162,0,255,0.2)] !p-0 !gap-0"
            >
                {/* Image Area */}
                <div className="aspect-[4/5] relative overflow-hidden">
                    {member.profilePicture ? (
                        <img
                            src={member.profilePicture}
                            alt={member.displayName}
                            className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#0f0409] via-[#0a0004] to-[#0f0409] flex items-center justify-center">
                            <div className="relative">
                                <span className="material-symbols-outlined text-7xl relative" style={{ color: `${config.color}50` }}>
                                    person
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Enhanced Gradient Overlay for Text Visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#a200ff]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Role Indicator Bar */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-1"
                        style={{ backgroundColor: config.color, boxShadow: `0 0 10px ${config.color}` }}
                    />
                </div>

                {/* Content Overlay - Positioned appropriately */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end h-full pointer-events-none">
                    <div className="mt-auto">
                        {/* Role Badge */}
                        <div className="mb-3">
                            <span
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-[0.2em] border shadow-lg backdrop-blur-md"
                                style={{
                                    backgroundColor: `${config.color}`,
                                    color: '#000',
                                    borderColor: config.color
                                }}
                            >
                                {member.title || config.label}
                            </span>
                        </div>

                        {/* Sub-roles */}
                        {member.subRoles?.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                                {member.subRoles.map((sr) => (
                                    <span
                                        key={sr}
                                        className="text-[9px] uppercase tracking-[0.1em] font-bold px-2 py-1 rounded bg-black/60 text-white/80 border border-white/10"
                                    >
                                        {sr}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Name */}
                        <h3 className="text-white font-display text-2xl lg:text-3xl tracking-wide leading-none mb-2 drop-shadow-md">
                            {member.displayName}
                        </h3>

                        {/* Bio / Extra Info */}
                        <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-20 opacity-0 group-hover:opacity-100">
                            <p className="text-gray-300 text-sm font-light leading-relaxed mb-4 line-clamp-2">
                                {member.bio || "Staff Member"}
                            </p>

                            {/* Socials */}
                            <div className="flex gap-4 pointer-events-auto">
                                {member.socialLinks?.discord && (
                                    <span className="text-white/70 hover:text-white flex items-center gap-1 text-xs font-medium bg-white/10 px-2 py-1 rounded">
                                        <span className="material-symbols-outlined text-sm">chat</span> Discord
                                    </span>
                                )}
                                {member.socialLinks?.twitter && (
                                    <span className="text-white/70 hover:text-white flex items-center gap-1 text-xs font-medium bg-white/10 px-2 py-1 rounded">
                                        <span className="material-symbols-outlined text-sm">alternate_email</span> Twitter
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

// ============================================================================
// STAFF DETAIL MODAL
// ============================================================================
const StaffDetailModal: React.FC<{ member: StaffMember | null; onClose: () => void }> = ({ member, onClose }) => {
    if (!member) return null;
    const config = ROLE_CONFIG[member.role] || ROLE_CONFIG.staff;

    return (
        <AnimatePresence>
            {member && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 30 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0a0004]"
                    >
                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-30 p-1.5 rounded-full bg-black/50 backdrop-blur-sm hover:bg-white/10 transition-colors"
                        >
                            <span className="material-symbols-outlined text-gray-400 text-sm">close</span>
                        </button>

                        {/* Image / Header */}
                        <div className="relative h-72 overflow-hidden">
                            {member.profilePicture ? (
                                <img
                                    src={member.profilePicture}
                                    alt={member.displayName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-[#0f0409] to-black flex items-center justify-center">
                                    <span className="material-symbols-outlined text-8xl" style={{ color: `${config.color}30` }}>person</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0004] via-transparent to-transparent" />

                            {/* Glow line */}
                            <div
                                className="absolute bottom-0 left-0 right-0 h-[2px]"
                                style={{ background: `linear-gradient(to right, transparent, ${config.color}, transparent)` }}
                            />
                        </div>

                        {/* Content */}
                        <div className="p-6 -mt-10 relative z-10">
                            <span
                                className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.3em] font-black px-3 py-1.5 rounded-lg mb-3"
                                style={{
                                    color: config.color,
                                    backgroundColor: `${config.color}15`,
                                    border: `1px solid ${config.color}30`,
                                }}
                            >
                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.color }} />
                                {member.title || config.label}
                            </span>

                            {/* Sub-roles */}
                            {member.subRoles?.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {member.subRoles.map((sr) => (
                                        <span
                                            key={sr}
                                            className="text-[9px] uppercase tracking-[0.15em] font-bold px-2.5 py-1 rounded-md bg-white/[0.04] text-gray-400 border border-white/[0.08]"
                                        >
                                            {sr}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <h2 className="text-2xl font-display text-white tracking-wide mb-3">{member.displayName}</h2>

                            {member.bio && (
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">{member.bio}</p>
                            )}

                            {(member.socialLinks?.discord || member.socialLinks?.twitter) && (
                                <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
                                    {member.socialLinks.discord && (
                                        <span className="flex items-center gap-2 text-gray-500 text-xs px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
                                            <span className="material-symbols-outlined text-sm">chat</span>
                                            {member.socialLinks.discord}
                                        </span>
                                    )}
                                    {member.socialLinks.twitter && (
                                        <span className="flex items-center gap-2 text-gray-500 text-xs px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
                                            <span className="material-symbols-outlined text-sm">alternate_email</span>
                                            {member.socialLinks.twitter}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const StaffSection: React.FC = () => {
    const [staff, setStaff] = useState<StaffMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMember, setSelectedMember] = useState<StaffMember | null>(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const snap = await getDocs(collection(db, 'users'));
                const members = snap.docs
                    .map((d) => ({
                        id: d.id,
                        ...d.data(),
                        order: d.data().order ?? 99,
                        visible: d.data().visible !== false,
                        subRoles: d.data().subRoles || [],
                    } as StaffMember))
                    .filter((m) => m.visible);
                members.sort((a, b) => a.order - b.order);
                setStaff(members);
            } catch (err) {
                console.error('Failed to fetch staff:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStaff();
    }, []);

    if (!loading && staff.length === 0) return null;

    return (
        <>
            <section
                id="staff"
                ref={ref}
                className="w-full py-32 bg-[#050002] relative overflow-hidden scroll-mt-20"
            >
                {/* ---- BACKGROUNDS ---- */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Noise texture */}
                    <div className="absolute inset-0 opacity-[0.015]"
                        style={{
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
                        }}
                    />

                    {/* Gradient orbs */}
                    <motion.div
                        className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full blur-[200px]"
                        style={{ background: 'radial-gradient(circle, rgba(162,0,255,0.06) 0%, transparent 70%)' }}
                        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                        className="absolute -bottom-60 -left-40 w-[600px] h-[600px] rounded-full blur-[200px]"
                        style={{ background: 'radial-gradient(circle, rgba(255,0,51,0.04) 0%, transparent 70%)' }}
                        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
                        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Top divider */}
                    <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[#a200ff]/20 to-transparent" />

                    {/* Grid pattern */}
                    <div className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                            backgroundSize: '60px 60px',
                        }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/* ---- HEADER ---- */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-20"
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                            transition={{ delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff0033]/10 border border-[#ff0033]/20 text-[#ff0033] text-xs font-bold uppercase tracking-[0.3em] mb-6"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ff0033] animate-pulse" />
                            The Team
                        </motion.span>

                        <h2 className="text-4xl lg:text-6xl font-display text-white leading-tight mb-6">
                            MEET OUR{' '}
                            <span
                                style={{
                                    background: 'linear-gradient(to right, #ff0033, #a200ff)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                STAFF
                            </span>
                        </h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-gray-500 max-w-lg mx-auto text-base md:text-lg font-light"
                        >
                            The people keeping the city running and the chaos in check.
                        </motion.p>

                        {/* Decorative line under header */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="mx-auto mt-10 h-px w-40 origin-center"
                            style={{ background: 'linear-gradient(to right, transparent, #a200ff, transparent)' }}
                        />
                    </motion.div>

                    {/* ---- STAFF GRID ---- */}
                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="aspect-[3/4] rounded-2xl bg-white/[0.03] animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                            {staff.map((member, index) => (
                                <StaffCard
                                    key={member.id}
                                    member={member}
                                    index={index}
                                    isInView={isInView}
                                    onSelect={setSelectedMember}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Detail Modal */}
            <StaffDetailModal member={selectedMember} onClose={() => setSelectedMember(null)} />
        </>
    );
};

export default StaffSection;

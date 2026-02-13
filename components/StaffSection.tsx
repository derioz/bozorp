import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ShimmeringText } from '@/components/ui/elevenlabs/shimmering-text';

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
            <div
                className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 group-hover:scale-[1.03]"
                style={{
                    boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 20px 60px -20px ${config.glow}`,
                }}
            >
                {/* Animated border glow on hover */}
                <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
                    style={{
                        background: `linear-gradient(135deg, ${config.color}40, transparent 50%, ${config.color}20)`,
                        padding: '1px',
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'exclude',
                    }}
                />

                {/* Image */}
                <div className="aspect-[3/4] relative overflow-hidden bg-[#0a0004]">
                    {member.profilePicture ? (
                        <img
                            src={member.profilePicture}
                            alt={member.displayName}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#0f0409] via-[#0a0004] to-[#0f0409] flex items-center justify-center">
                            <div className="relative">
                                <div
                                    className="absolute inset-0 rounded-full blur-2xl opacity-30"
                                    style={{ backgroundColor: config.color }}
                                />
                                <span className="material-symbols-outlined text-7xl relative" style={{ color: `${config.color}50` }}>
                                    person
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Multi-layer gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Scan line effect */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
                        }}
                    />

                    {/* Top accent line */}
                    <div
                        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-80 transition-opacity duration-500"
                        style={{ background: `linear-gradient(to right, transparent, ${config.color}, transparent)` }}
                    />

                    {/* Bottom role glow bar */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[3px]"
                        style={{ background: `linear-gradient(to right, transparent, ${config.color}, transparent)` }}
                        initial={{ opacity: 0.4, scaleX: 0.5 }}
                        whileInView={{ opacity: 0.8, scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                    />
                </div>

                {/* Info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                    {/* Role tag */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="mb-2"
                    >
                        <span
                            className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.3em] font-black px-2.5 py-1 rounded-md backdrop-blur-sm"
                            style={{
                                color: config.color,
                                backgroundColor: `${config.color}15`,
                                border: `1px solid ${config.color}25`,
                            }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: config.color }} />
                            {member.title || config.label}
                        </span>
                    </motion.div>

                    {/* Sub-roles */}
                    {member.subRoles?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                            {member.subRoles.map((sr) => (
                                <span
                                    key={sr}
                                    className="text-[8px] uppercase tracking-[0.2em] font-bold px-2 py-0.5 rounded backdrop-blur-sm bg-white/[0.06] text-gray-400 border border-white/[0.08]"
                                >
                                    {sr}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Name */}
                    <h3 className="text-white font-display text-lg md:text-xl tracking-wide leading-tight">
                        {member.displayName}
                    </h3>

                    {/* Bio preview on hover */}
                    <AnimatePresence>
                        {member.bio && (
                            <motion.p
                                className="text-gray-400/80 text-xs mt-2 line-clamp-2 leading-relaxed"
                                initial={{ opacity: 0, height: 0 }}
                                whileHover={{ opacity: 1, height: 'auto' }}
                            >
                                {member.bio}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    {/* Social icons on hover */}
                    {(member.socialLinks?.discord || member.socialLinks?.twitter) && (
                        <div className="flex gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                            {member.socialLinks.discord && (
                                <span className="text-gray-500 hover:text-white text-[10px] tracking-wider transition-colors cursor-pointer flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">chat</span>
                                    {member.socialLinks.discord}
                                </span>
                            )}
                            {member.socialLinks.twitter && (
                                <span className="text-gray-500 hover:text-white text-[10px] tracking-wider transition-colors cursor-pointer flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">alternate_email</span>
                                    {member.socialLinks.twitter}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
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
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#a200ff]/[0.07] border border-[#a200ff]/15 text-gray-400 text-[10px] font-black uppercase tracking-[0.35em] mb-8"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#a200ff] animate-pulse" />
                            The Team
                        </motion.span>

                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-display text-white mb-5 leading-[0.9]">
                            MEET OUR{' '}
                            <ShimmeringText
                                text="STAFF"
                                color="#a200ff"
                                shimmerColor="#ff0033"
                                duration={3}
                                className="font-display"
                            />
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

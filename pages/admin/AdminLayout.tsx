import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
    { to: '/admin', icon: 'dashboard', label: 'Dashboard', end: true },
    { to: '/admin/gallery', icon: 'photo_library', label: 'Gallery' },
    { to: '/admin/rules', icon: 'gavel', label: 'Rules' },
    { to: '/admin/staff', icon: 'group', label: 'Staff' },
    { to: '/admin/profile', icon: 'person', label: 'Profile' },
];

const AdminLayout: React.FC = () => {
    const { userProfile, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    const sidebarContent = (
        <>
            {/* Logo */}
            <div className="p-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff0033] to-[#a200ff] flex items-center justify-center shadow-lg shadow-[#ff0033]/10">
                        <span className="material-symbols-outlined text-xl text-white">admin_panel_settings</span>
                    </div>
                    <div>
                        <h2 className="text-white font-display text-sm tracking-wider">BOZORP</h2>
                        <p className="text-gray-600 text-[10px] tracking-widest uppercase">Admin Panel</p>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                                ? 'bg-[#ff0033]/10 text-[#ff0033] border border-[#ff0033]/20'
                                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                            }`
                        }
                    >
                        <span className="material-symbols-outlined text-xl">{item.icon}</span>
                        <span className="tracking-wide">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* User */}
            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3 mb-3 px-2">
                    {userProfile?.profilePicture ? (
                        <img src={userProfile.profilePicture} alt="" className="w-9 h-9 rounded-full object-cover border border-white/10" />
                    ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ff0033]/30 to-[#a200ff]/30 flex items-center justify-center border border-white/10">
                            <span className="material-symbols-outlined text-sm text-gray-400">person</span>
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{userProfile?.displayName || 'Staff'}</p>
                        <p className="text-gray-600 text-[10px] uppercase tracking-widest">{userProfile?.role || 'member'}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:text-red-400 hover:bg-red-500/5 transition-all text-xs tracking-wider uppercase"
                >
                    <span className="material-symbols-outlined text-base">logout</span>
                    Sign Out
                </button>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-[#050002] flex">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 bg-[#0a0004]/80 backdrop-blur-xl border-r border-white/5 fixed h-full z-30">
                {sidebarContent}
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#0a0004]/90 backdrop-blur-xl border-b border-white/5 z-40 flex items-center px-4 gap-3">
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="p-2 rounded-lg hover:bg-white/5 text-gray-400"
                >
                    <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#ff0033] to-[#a200ff] flex items-center justify-center">
                        <span className="material-symbols-outlined text-sm text-white">admin_panel_settings</span>
                    </div>
                    <span className="text-white font-display text-xs tracking-wider">BOZORP ADMIN</span>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        />
                        <motion.aside
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-[#0a0004] border-r border-white/5 z-50 flex flex-col"
                        >
                            {sidebarContent}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 pt-14 lg:pt-0">
                <div className="p-6 lg:p-8 max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;

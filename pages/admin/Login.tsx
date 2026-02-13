import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, signup, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isSignUp) {
                if (!displayName.trim()) { setError('Display name is required.'); setLoading(false); return; }
                await signup(email, password, displayName.trim());
            } else {
                await login(email, password);
            }
            navigate('/admin');
        } catch (err: any) {
            setError(err.message || (isSignUp ? 'Sign up failed' : 'Login failed'));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        setError('');
        setLoading(true);
        try {
            await loginWithGoogle();
            navigate('/admin');
        } catch (err: any) {
            setError(err.message || 'Google login failed');
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsSignUp((prev) => !prev);
        setError('');
    };

    const inputBaseClass = 'w-full bg-[#0f0409] border border-white/10 rounded-xl px-10 py-3 text-white placeholder-gray-600 outline-none focus:border-[#ff0033]/50 focus:ring-1 focus:ring-[#ff0033]/20 transition-all text-sm';

    return (
        <div className="min-h-screen bg-[#050002] flex items-center justify-center relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#ff0033]/8 rounded-full blur-[200px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#a200ff]/8 rounded-full blur-[200px]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md mx-4"
            >
                {/* Card */}
                <div className="bg-[#0a0004]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/50">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#ff0033] to-[#a200ff] flex items-center justify-center shadow-lg shadow-[#ff0033]/20"
                        >
                            <span className="material-symbols-outlined text-3xl text-white">
                                {isSignUp ? 'person_add' : 'admin_panel_settings'}
                            </span>
                        </motion.div>
                        <h1 className="text-2xl font-display text-white tracking-wider">
                            {isSignUp ? 'CREATE ACCOUNT' : 'ADMIN PANEL'}
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            {isSignUp ? 'Sign up for staff access' : 'Staff access only'}
                        </p>
                    </div>

                    {/* Error */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Display Name (sign up only) */}
                        <AnimatePresence>
                            {isSignUp && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-1 overflow-hidden"
                                >
                                    <label className="text-xs text-gray-500 uppercase tracking-widest font-bold">Display Name</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-lg">badge</span>
                                        <input
                                            type="text"
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            className={inputBaseClass}
                                            placeholder="Your name"
                                            required={isSignUp}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-1">
                            <label className="text-xs text-gray-500 uppercase tracking-widest font-bold">Email</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-lg">mail</span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={inputBaseClass}
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs text-gray-500 uppercase tracking-widest font-bold">Password</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-lg">lock</span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={inputBaseClass}
                                    placeholder={isSignUp ? 'Min 6 characters' : '••••••••'}
                                    required
                                    minLength={isSignUp ? 6 : undefined}
                                />
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff0033] to-[#cc0029] text-white font-display tracking-wider text-sm hover:shadow-lg hover:shadow-[#ff0033]/20 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    {isSignUp ? 'CREATING ACCOUNT...' : 'SIGNING IN...'}
                                </span>
                            ) : (
                                isSignUp ? 'SIGN UP' : 'SIGN IN'
                            )}
                        </motion.button>
                    </form>

                    {/* Toggle Sign In / Sign Up */}
                    <div className="text-center mt-5">
                        <button
                            type="button"
                            onClick={toggleMode}
                            className="text-gray-500 text-xs hover:text-gray-300 transition-colors tracking-wider"
                        >
                            {isSignUp ? (
                                <>Already have an account? <span className="text-[#ff0033] font-bold">SIGN IN</span></>
                            ) : (
                                <>Don't have an account? <span className="text-[#a200ff] font-bold">SIGN UP</span></>
                            )}
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-gray-600 text-xs uppercase tracking-widest">or</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {/* Google Sign In */}
                    <motion.button
                        onClick={handleGoogle}
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-medium text-sm flex items-center justify-center gap-3 hover:bg-white/10 hover:border-white/20 transition-all disabled:opacity-50"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </motion.button>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-700 text-xs mt-6 tracking-wider">
                    BOZORP STAFF PORTAL
                </p>
            </motion.div>
        </div>
    );
};

export default Login;

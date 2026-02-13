import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { uploadToFiveManage } from '../../lib/fivemanage';

const ProfileSettings: React.FC = () => {
    const { user, userProfile } = useAuth();
    const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
    const [title, setTitle] = useState(userProfile?.title || '');
    const [bio, setBio] = useState(userProfile?.bio || '');
    const [profilePicture, setProfilePicture] = useState(userProfile?.profilePicture || '');
    const [discord, setDiscord] = useState(userProfile?.socialLinks?.discord || '');
    const [twitter, setTwitter] = useState(userProfile?.socialLinks?.twitter || '');
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const result = await uploadToFiveManage(file);
            setProfilePicture(result.url);
        } catch (err: any) {
            alert('Upload failed: ' + err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setSaving(true);
        try {
            await updateDoc(doc(db, 'users', user.uid), {
                displayName,
                title,
                bio,
                profilePicture,
                socialLinks: { discord, twitter },
            });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            console.error('Save failed:', err);
            alert('Save failed');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-2xl space-y-6">
            <div>
                <h1 className="text-2xl font-display text-white tracking-wider">PROFILE SETTINGS</h1>
                <p className="text-gray-600 text-sm">Customize how you appear on the website</p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                {/* Profile Picture */}
                <div className="bg-[#0a0004]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h3 className="text-white font-display tracking-wider text-xs uppercase mb-4">Profile Picture</h3>
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            {profilePicture ? (
                                <img src={profilePicture} alt="" className="w-24 h-24 rounded-2xl object-cover border-2 border-white/10" />
                            ) : (
                                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#ff0033]/20 to-[#a200ff]/20 flex items-center justify-center border-2 border-white/10">
                                    <span className="material-symbols-outlined text-4xl text-gray-600">person</span>
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={() => fileRef.current?.click()}
                                className="absolute inset-0 rounded-2xl bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            >
                                <span className="material-symbols-outlined text-white">{uploading ? 'hourglass_empty' : 'photo_camera'}</span>
                            </button>
                            <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Click to upload a profile picture</p>
                            <p className="text-gray-700 text-xs mt-1">Hosted on FiveManage • JPG, PNG, WebP</p>
                        </div>
                    </div>
                </div>

                {/* Basic Info */}
                <div className="bg-[#0a0004]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
                    <h3 className="text-white font-display tracking-wider text-xs uppercase mb-2">Basic Info</h3>

                    <div>
                        <label className="text-xs text-gray-500 uppercase tracking-widest font-bold block mb-1">Display Name</label>
                        <input
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full bg-[#0f0409] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#ff0033]/50 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-500 uppercase tracking-widest font-bold block mb-1">Title / Position</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Head Admin, Moderator"
                            className="w-full bg-[#0f0409] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#ff0033]/50 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-500 uppercase tracking-widest font-bold block mb-1">Bio</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows={3}
                            placeholder="A short bio about yourself..."
                            className="w-full bg-[#0f0409] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#ff0033]/50 transition-colors resize-none"
                        />
                    </div>
                </div>

                {/* Socials */}
                <div className="bg-[#0a0004]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
                    <h3 className="text-white font-display tracking-wider text-xs uppercase mb-2">Social Links</h3>

                    <div>
                        <label className="text-xs text-gray-500 uppercase tracking-widest font-bold block mb-1">Discord</label>
                        <input
                            value={discord}
                            onChange={(e) => setDiscord(e.target.value)}
                            placeholder="username#0000"
                            className="w-full bg-[#0f0409] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#ff0033]/50 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-500 uppercase tracking-widest font-bold block mb-1">Twitter / X</label>
                        <input
                            value={twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                            placeholder="@username"
                            className="w-full bg-[#0f0409] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#ff0033]/50 transition-colors"
                        />
                    </div>
                </div>

                {/* Preview Card */}
                <div className="bg-[#0a0004]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h3 className="text-white font-display tracking-wider text-xs uppercase mb-4">Preview</h3>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0f0409] border border-white/5">
                        {profilePicture ? (
                            <img src={profilePicture} alt="" className="w-14 h-14 rounded-full object-cover border-2 border-[#ff0033]/30" />
                        ) : (
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ff0033]/20 to-[#a200ff]/20 flex items-center justify-center border-2 border-white/10">
                                <span className="material-symbols-outlined text-2xl text-gray-500">person</span>
                            </div>
                        )}
                        <div>
                            <p className="text-white font-medium">{displayName || 'Your Name'}</p>
                            <p className="text-[#ff0033] text-xs uppercase tracking-widest">{title || 'Staff'}</p>
                            {bio && <p className="text-gray-500 text-xs mt-1 max-w-xs">{bio}</p>}
                        </div>
                    </div>
                </div>

                {/* Save */}
                <div className="flex items-center gap-4">
                    <motion.button
                        type="submit"
                        disabled={saving}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#ff0033] to-[#cc0029] text-white font-display tracking-wider text-sm hover:shadow-lg hover:shadow-[#ff0033]/20 transition-shadow disabled:opacity-50"
                    >
                        {saving ? 'SAVING...' : 'SAVE CHANGES'}
                    </motion.button>
                    {success && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-green-400 text-sm flex items-center gap-1"
                        >
                            <span className="material-symbols-outlined text-base">check_circle</span>
                            Saved!
                        </motion.span>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ProfileSettings;

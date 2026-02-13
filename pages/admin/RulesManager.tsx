import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    orderBy,
    query,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface RuleItem {
    id: string;
    title: string;
    icon: string;
    punishment: string;
    description: string;
    order: number;
}

const ICON_OPTIONS = [
    'handshake', 'mic', 'bolt', 'psychology', 'local_hospital',
    'shield', 'power_settings_new', 'person_cancel', 'gavel',
    'warning', 'block', 'visibility_off', 'groups', 'lock',
    'security', 'report', 'do_not_disturb', 'speed',
];

const RulesManager: React.FC = () => {
    const [rules, setRules] = useState<RuleItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<RuleItem | null>(null);

    // Form state
    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState('gavel');
    const [punishment, setPunishment] = useState('');
    const [description, setDescription] = useState('');

    const fetchRules = async () => {
        try {
            const q = query(collection(db, 'rules'), orderBy('order', 'asc'));
            const snap = await getDocs(q);
            setRules(snap.docs.map((d) => ({ id: d.id, ...d.data() } as RuleItem)));
        } catch (err) {
            console.error('Failed to fetch rules:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRules();
    }, []);

    const resetForm = () => {
        setTitle('');
        setIcon('gavel');
        setPunishment('');
        setDescription('');
        setEditing(null);
        setShowForm(false);
    };

    const handleEdit = (rule: RuleItem) => {
        setTitle(rule.title);
        setIcon(rule.icon);
        setPunishment(rule.punishment);
        setDescription(rule.description);
        setEditing(rule);
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editing) {
                await updateDoc(doc(db, 'rules', editing.id), {
                    title,
                    icon,
                    punishment,
                    description,
                });
            } else {
                await addDoc(collection(db, 'rules'), {
                    title,
                    icon,
                    punishment,
                    description,
                    order: rules.length + 1,
                    createdAt: serverTimestamp(),
                });
            }
            resetForm();
            setLoading(true);
            await fetchRules();
        } catch (err) {
            console.error('Save failed:', err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this rule?')) return;
        try {
            await deleteDoc(doc(db, 'rules', id));
            setRules((prev) => prev.filter((r) => r.id !== id));
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    const moveRule = async (index: number, direction: 'up' | 'down') => {
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === rules.length - 1)) return;
        const swapIndex = direction === 'up' ? index - 1 : index + 1;
        const newRules = [...rules];
        [newRules[index], newRules[swapIndex]] = [newRules[swapIndex], newRules[index]];
        setRules(newRules);
        try {
            await updateDoc(doc(db, 'rules', newRules[index].id), { order: index + 1 });
            await updateDoc(doc(db, 'rules', newRules[swapIndex].id), { order: swapIndex + 1 });
        } catch (err) {
            console.error('Reorder failed:', err);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display text-white tracking-wider">RULES MANAGER</h1>
                    <p className="text-gray-600 text-sm">{rules.length} rules</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff0033] to-[#cc0029] text-white font-medium text-sm hover:shadow-lg hover:shadow-[#ff0033]/20 transition-shadow"
                >
                    <span className="material-symbols-outlined text-lg">add</span>
                    Add Rule
                </motion.button>
            </div>

            {/* Form */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-[#0a0004]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                            <h3 className="text-white font-display tracking-wider text-sm mb-4">
                                {editing ? 'EDIT RULE' : 'NEW RULE'}
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase tracking-widest font-bold block mb-1">Title</label>
                                        <input
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="w-full bg-[#0f0409] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#ff0033]/50 transition-colors"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase tracking-widest font-bold block mb-1">Punishment</label>
                                        <input
                                            value={punishment}
                                            onChange={(e) => setPunishment(e.target.value)}
                                            placeholder="e.g. Ban, Warn / Ban"
                                            className="w-full bg-[#0f0409] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#ff0033]/50 transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500 uppercase tracking-widest font-bold block mb-2">Icon</label>
                                    <div className="flex flex-wrap gap-2">
                                        {ICON_OPTIONS.map((ic) => (
                                            <button
                                                key={ic}
                                                type="button"
                                                onClick={() => setIcon(ic)}
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${icon === ic
                                                        ? 'bg-[#ff0033]/20 text-[#ff0033] border border-[#ff0033]/30'
                                                        : 'bg-white/5 text-gray-500 border border-white/5 hover:bg-white/10'
                                                    }`}
                                            >
                                                <span className="material-symbols-outlined text-lg">{ic}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500 uppercase tracking-widest font-bold block mb-1">Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={4}
                                        className="w-full bg-[#0f0409] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#ff0033]/50 transition-colors resize-none"
                                        required
                                    />
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ff0033] to-[#cc0029] text-white text-sm font-medium"
                                    >
                                        {editing ? 'Save Changes' : 'Add Rule'}
                                    </motion.button>
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="px-6 py-2.5 rounded-xl border border-white/10 text-gray-500 text-sm hover:bg-white/5 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Rules List */}
            {loading ? (
                <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />
                    ))}
                </div>
            ) : rules.length === 0 ? (
                <div className="text-center py-20">
                    <span className="material-symbols-outlined text-5xl text-gray-700 mb-4 block">gavel</span>
                    <p className="text-gray-600 text-sm">No rules yet. Add your first one!</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {rules.map((rule, index) => (
                        <motion.div
                            key={rule.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03 }}
                            className="flex items-center gap-4 p-4 rounded-xl bg-[#0a0004]/60 border border-white/5 hover:border-white/10 transition-all group"
                        >
                            {/* Order controls */}
                            <div className="flex flex-col gap-0.5">
                                <button
                                    onClick={() => moveRule(index, 'up')}
                                    disabled={index === 0}
                                    className="text-gray-700 hover:text-white disabled:opacity-20 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm">keyboard_arrow_up</span>
                                </button>
                                <button
                                    onClick={() => moveRule(index, 'down')}
                                    disabled={index === rules.length - 1}
                                    className="text-gray-700 hover:text-white disabled:opacity-20 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                                </button>
                            </div>

                            {/* Number */}
                            <span className="text-lg font-display text-gray-700 w-8 text-center">
                                {String(index + 1).padStart(2, '0')}
                            </span>

                            {/* Icon */}
                            <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                                <span className="material-symbols-outlined text-lg text-gray-500">{rule.icon}</span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-medium truncate">{rule.title}</p>
                                <p className="text-gray-600 text-xs truncate">{rule.description}</p>
                            </div>

                            {/* Punishment badge */}
                            <span className="hidden sm:inline text-[10px] uppercase tracking-widest text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-1 rounded">
                                {rule.punishment}
                            </span>

                            {/* Actions */}
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit(rule)}
                                    className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm text-gray-400">edit</span>
                                </button>
                                <button
                                    onClick={() => handleDelete(rule.id)}
                                    className="p-1.5 rounded-lg hover:bg-red-500/20 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm text-red-400">delete</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RulesManager;

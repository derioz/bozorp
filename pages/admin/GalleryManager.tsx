import React, { useState, useEffect, useRef } from 'react';
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
import { uploadToFiveManage } from '../../lib/fivemanage';

interface GalleryItem {
    id: string;
    title: string;
    category: string;
    type: 'image' | 'video';
    src: string;
    order: number;
}

const GalleryManager: React.FC = () => {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<GalleryItem | null>(null);
    const [uploading, setUploading] = useState(false);

    // Form state
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState<'image' | 'video'>('image');
    const [src, setSrc] = useState('');
    const fileRef = useRef<HTMLInputElement>(null);

    const fetchItems = async () => {
        try {
            const q = query(collection(db, 'gallery'), orderBy('order', 'asc'));
            const snap = await getDocs(q);
            setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryItem)));
        } catch (err) {
            console.error('Failed to fetch gallery:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const resetForm = () => {
        setTitle('');
        setCategory('');
        setType('image');
        setSrc('');
        setEditing(null);
        setShowForm(false);
    };

    const handleEdit = (item: GalleryItem) => {
        setTitle(item.title);
        setCategory(item.category);
        setType(item.type);
        setSrc(item.src);
        setEditing(item);
        setShowForm(true);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const result = await uploadToFiveManage(file);
            setSrc(result.url);
        } catch (err: any) {
            alert('Upload failed: ' + err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editing) {
                await updateDoc(doc(db, 'gallery', editing.id), {
                    title,
                    category,
                    type,
                    src,
                });
            } else {
                await addDoc(collection(db, 'gallery'), {
                    title,
                    category,
                    type,
                    src,
                    order: items.length + 1,
                    createdAt: serverTimestamp(),
                });
            }
            resetForm();
            setLoading(true);
            await fetchItems();
        } catch (err) {
            console.error('Save failed:', err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this gallery item?')) return;
        try {
            await deleteDoc(doc(db, 'gallery', id));
            setItems((prev) => prev.filter((i) => i.id !== id));
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display text-white tracking-wider">GALLERY MANAGER</h1>
                    <p className="text-gray-600 text-sm">{items.length} items</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff0033] to-[#cc0029] text-white font-medium text-sm hover:shadow-lg hover:shadow-[#ff0033]/20 transition-shadow"
                >
                    <span className="material-symbols-outlined text-lg">add</span>
                    Add Item
                </motion.button>
            </div>

            {/* Form Modal */}
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
                                {editing ? 'EDIT ITEM' : 'NEW GALLERY ITEM'}
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
                                        <label className="text-xs text-gray-500 uppercase tracking-widest font-bold block mb-1">Category</label>
                                        <input
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full bg-[#0f0409] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#ff0033]/50 transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500 uppercase tracking-widest font-bold block mb-1">Type</label>
                                    <div className="flex gap-3">
                                        {(['image', 'video'] as const).map((t) => (
                                            <button
                                                key={t}
                                                type="button"
                                                onClick={() => setType(t)}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${type === t
                                                        ? 'bg-[#ff0033]/20 text-[#ff0033] border border-[#ff0033]/30'
                                                        : 'bg-white/5 text-gray-500 border border-white/5 hover:bg-white/10'
                                                    }`}
                                            >
                                                {t.charAt(0).toUpperCase() + t.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500 uppercase tracking-widest font-bold block mb-1">Image/Video</label>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <input
                                            value={src}
                                            onChange={(e) => setSrc(e.target.value)}
                                            placeholder="URL or upload below"
                                            className="flex-1 bg-[#0f0409] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#ff0033]/50 transition-colors"
                                        />
                                        <label className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-sm cursor-pointer hover:bg-white/5 transition-colors ${uploading ? 'opacity-50 pointer-events-none' : 'text-gray-400'}`}>
                                            <span className="material-symbols-outlined text-base">upload</span>
                                            {uploading ? 'Uploading...' : 'Upload'}
                                            <input ref={fileRef} type="file" accept="image/*,video/*" onChange={handleFileUpload} className="hidden" />
                                        </label>
                                    </div>
                                    {src && (
                                        <div className="mt-3 w-32 h-32 rounded-xl overflow-hidden border border-white/10">
                                            <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ff0033] to-[#cc0029] text-white text-sm font-medium"
                                    >
                                        {editing ? 'Save Changes' : 'Add Item'}
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

            {/* Items Grid */}
            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="aspect-[4/5] rounded-xl bg-white/5 animate-pulse" />
                    ))}
                </div>
            ) : items.length === 0 ? (
                <div className="text-center py-20">
                    <span className="material-symbols-outlined text-5xl text-gray-700 mb-4 block">photo_library</span>
                    <p className="text-gray-600 text-sm">No gallery items yet. Add your first one!</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {items.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="group relative rounded-xl overflow-hidden border border-white/5 hover:border-[#ff0033]/30 transition-all"
                        >
                            <div className="aspect-[4/5]">
                                <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <p className="text-white text-sm font-medium">{item.title}</p>
                                    <p className="text-gray-400 text-xs">{item.category}</p>
                                    <div className="flex gap-2 mt-3">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-sm text-white">edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/40 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-sm text-red-400">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {item.type === 'video' && (
                                <div className="absolute top-2 right-2 p-1 rounded-md bg-black/50 backdrop-blur">
                                    <span className="material-symbols-outlined text-xs text-white">videocam</span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GalleryManager;

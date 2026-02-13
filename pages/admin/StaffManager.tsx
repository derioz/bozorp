import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import {
    collection,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    setDoc,
    addDoc,
    writeBatch,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { uploadToFiveManage } from '../../lib/fivemanage';

interface StaffMember {
    id: string;
    email: string;
    displayName: string;
    role: 'superadmin' | 'admin' | 'staff';
    subRoles: string[];
    title: string;
    bio: string;
    profilePicture: string;
    socialLinks: { discord?: string; twitter?: string };
    order: number;
    visible: boolean;
}

interface Position {
    id: string;
    name: string;
}

const ROLE_COLORS: Record<string, string> = {
    superadmin: '#ff0033',
    admin: '#a200ff',
    staff: '#00ffea',
};

const ROLE_LABELS: Record<string, string> = {
    superadmin: 'Super Admin',
    admin: 'Admin',
    staff: 'Staff',
};

const INPUT_CLASS = 'w-full bg-[#0f0409] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#a200ff]/50 transition-colors placeholder:text-gray-700';
const LABEL_CLASS = 'block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2';

// ---- MODAL (top-level to avoid re-mount on parent re-render) ----
const Modal: React.FC<{ open: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({
    open, onClose, title, children,
}) => (
    <AnimatePresence>
        {open && (
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}
            >
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-[#0a0004] border border-white/10 rounded-2xl p-6 shadow-2xl"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-display text-white uppercase tracking-wider">{title}</h2>
                        <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined text-gray-500">close</span>
                        </button>
                    </div>
                    {children}
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

// ---- SUB-ROLE CHIP SELECTOR (top-level) ----
const SubRoleSelector: React.FC<{
    positions: Position[];
    selected: string[];
    onChange: (val: string[]) => void;
}> = ({ positions, selected, onChange }) => {
    const toggle = (role: string) => {
        onChange(selected.includes(role) ? selected.filter((r) => r !== role) : [...selected, role]);
    };
    return (
        <div>
            <label className={LABEL_CLASS}>Sub-Roles</label>
            <div className="flex flex-wrap gap-2">
                {positions.length === 0 && <p className="text-gray-700 text-xs">No positions created yet.</p>}
                {positions.map((pos) => {
                    const active = selected.includes(pos.name);
                    return (
                        <button
                            key={pos.id}
                            type="button"
                            onClick={() => toggle(pos.name)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${active
                                ? 'bg-[#a200ff]/20 text-[#a200ff] border-[#a200ff]/40'
                                : 'bg-white/[0.03] text-gray-500 border-white/5 hover:border-white/10'
                                }`}
                        >
                            {pos.name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const StaffManager: React.FC = () => {
    const { userProfile } = useAuth();
    const [staff, setStaff] = useState<StaffMember[]>([]);
    const [positions, setPositions] = useState<Position[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingMember, setEditingMember] = useState<StaffMember | null>(null);
    const [showPositionManager, setShowPositionManager] = useState(false);
    const [newPositionName, setNewPositionName] = useState('');
    const [saving, setSaving] = useState(false);
    const [orderChanged, setOrderChanged] = useState(false);

    // Add form state (no email/password — just display info)
    const [addForm, setAddForm] = useState({
        displayName: '',
        role: 'staff' as 'staff' | 'admin',
        title: '',
        subRoles: [] as string[],
    });

    // Edit form state
    const [editForm, setEditForm] = useState({
        displayName: '',
        role: 'staff' as 'superadmin' | 'admin' | 'staff',
        title: '',
        subRoles: [] as string[],
        bio: '',
        profilePicture: '',
        discord: '',
        twitter: '',
        visible: true,
    });

    // ---- FETCH ----
    const fetchStaff = async () => {
        try {
            const snap = await getDocs(collection(db, 'users'));
            const members = snap.docs.map((d) => ({
                id: d.id,
                ...d.data(),
                order: d.data().order ?? 99,
                visible: d.data().visible !== false,
                subRoles: d.data().subRoles || [],
            } as StaffMember));
            members.sort((a, b) => a.order - b.order);
            setStaff(members);
        } catch (err) {
            console.error('Failed to fetch staff:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchPositions = async () => {
        try {
            const snap = await getDocs(collection(db, 'positions'));
            setPositions(snap.docs.map((d) => ({ id: d.id, name: d.data().name } as Position)));
        } catch (err) {
            console.error('Failed to fetch positions:', err);
        }
    };

    useEffect(() => {
        fetchStaff();
        fetchPositions();
    }, []);

    const isSuperAdmin = userProfile?.role === 'superadmin';

    // ---- ADD STAFF ----
    const handleAddStaff = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const newDocRef = doc(collection(db, 'users'));
            await setDoc(newDocRef, {
                email: '',
                displayName: addForm.displayName,
                role: addForm.role,
                title: addForm.title,
                subRoles: addForm.subRoles,
                bio: '',
                profilePicture: '',
                socialLinks: {},
                order: staff.length,
                visible: true,
                createdAt: new Date().toISOString(),
            });
            setShowAddModal(false);
            setAddForm({ displayName: '', role: 'staff', title: '', subRoles: [] });
            await fetchStaff();
        } catch (err: any) {
            alert(err.message || 'Failed to add staff member.');
            console.error('Add staff failed:', err);
        } finally {
            setSaving(false);
        }
    };

    // ---- EDIT STAFF ----
    const openEditModal = (member: StaffMember) => {
        setEditingMember(member);
        setEditForm({
            displayName: member.displayName || '',
            role: member.role,
            title: member.title || '',
            subRoles: member.subRoles || [],
            bio: member.bio || '',
            profilePicture: member.profilePicture || '',
            discord: member.socialLinks?.discord || '',
            twitter: member.socialLinks?.twitter || '',
            visible: member.visible !== false,
        });
    };

    const handleEditStaff = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingMember) return;
        setSaving(true);
        try {
            await updateDoc(doc(db, 'users', editingMember.id), {
                displayName: editForm.displayName,
                role: editForm.role,
                title: editForm.title,
                subRoles: editForm.subRoles,
                bio: editForm.bio,
                profilePicture: editForm.profilePicture,
                socialLinks: { discord: editForm.discord || '', twitter: editForm.twitter || '' },
                visible: editForm.visible,
            });
            setEditingMember(null);
            await fetchStaff();
        } catch (err: any) {
            alert(err.message || 'Failed to update staff member.');
        } finally {
            setSaving(false);
        }
    };

    const handleEditImageUpload = async (file: File) => {
        try {
            setSaving(true);
            const result = await uploadToFiveManage(file);
            setEditForm((prev) => ({ ...prev, profilePicture: result.url }));
        } catch (err) {
            console.error('Upload failed:', err);
            alert('Image upload failed.');
        } finally {
            setSaving(false);
        }
    };

    // ---- TOGGLE VISIBILITY ----
    const toggleVisibility = async (member: StaffMember) => {
        try {
            const newVisible = !member.visible;
            await updateDoc(doc(db, 'users', member.id), { visible: newVisible });
            setStaff((prev) => prev.map((m) => m.id === member.id ? { ...m, visible: newVisible } : m));
        } catch (err) {
            console.error('Toggle visibility failed:', err);
        }
    };

    // ---- REMOVE ----
    const handleRemove = async (member: StaffMember) => {
        if (member.role === 'superadmin') { alert('Cannot remove the superadmin.'); return; }
        if (!confirm(`Remove ${member.displayName || 'this member'} from staff?`)) return;
        try {
            await deleteDoc(doc(db, 'users', member.id));
            setStaff((prev) => prev.filter((m) => m.id !== member.id));
        } catch (err) {
            console.error('Remove failed:', err);
        }
    };

    // ---- REORDER ----
    const handleReorder = (newOrder: StaffMember[]) => {
        setStaff(newOrder);
        setOrderChanged(true);
    };

    const saveOrder = async () => {
        setSaving(true);
        try {
            const batch = writeBatch(db);
            staff.forEach((member, index) => batch.update(doc(db, 'users', member.id), { order: index }));
            await batch.commit();
            setOrderChanged(false);
        } catch (err) { console.error('Reorder failed:', err); }
        finally { setSaving(false); }
    };

    // ---- POSITIONS ----
    const [positionSaving, setPositionSaving] = useState(false);

    const addPosition = async () => {
        if (!newPositionName.trim()) return;
        setPositionSaving(true);
        try {
            await addDoc(collection(db, 'positions'), { name: newPositionName.trim() });
            setNewPositionName('');
            await fetchPositions();
        } catch (err: any) {
            console.error('Add position failed:', err);
            alert(`Failed to add position: ${err.message || err}. Make sure the Firestore rules for the "positions" collection are deployed.`);
        } finally {
            setPositionSaving(false);
        }
    };

    const removePosition = async (id: string) => {
        if (!confirm('Delete this position?')) return;
        try {
            await deleteDoc(doc(db, 'positions', id));
            await fetchPositions();
        } catch (err: any) {
            console.error('Remove position failed:', err);
            alert(`Failed to remove position: ${err.message || err}`);
        }
    };



    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-2xl font-display text-white tracking-wider">STAFF MANAGER</h1>
                    <p className="text-gray-600 text-sm">{staff.length} members • {staff.filter(s => s.visible).length} visible</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {orderChanged && (
                        <motion.button
                            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                            onClick={saveOrder} disabled={saving}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl hover:bg-green-500/30 transition-all text-sm font-bold disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined text-sm">save</span>
                            Save Order
                        </motion.button>
                    )}
                    {isSuperAdmin && (
                        <button
                            onClick={() => setShowPositionManager(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] text-gray-400 border border-white/10 rounded-xl hover:bg-white/[0.06] transition-all text-sm font-bold"
                        >
                            <span className="material-symbols-outlined text-sm">badge</span>
                            Positions
                        </button>
                    )}
                    {isSuperAdmin && (
                        <motion.button
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#a200ff]/20 text-[#a200ff] border border-[#a200ff]/30 rounded-xl hover:bg-[#a200ff]/30 transition-all text-sm font-bold"
                        >
                            <span className="material-symbols-outlined text-sm">person_add</span>
                            Add Staff
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Drag-to-reorder hint */}
            {isSuperAdmin && staff.length > 1 && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-gray-600 text-xs">
                    <span className="material-symbols-outlined text-sm">drag_indicator</span>
                    Drag to reorder. Click the eye icon to toggle front-page visibility.
                </div>
            )}

            {/* Staff List */}
            {loading ? (
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-20 rounded-xl bg-white/5 animate-pulse" />
                    ))}
                </div>
            ) : staff.length === 0 ? (
                <div className="text-center py-20">
                    <span className="material-symbols-outlined text-5xl text-gray-700 mb-4 block">group</span>
                    <p className="text-gray-600 text-sm">No staff members found.</p>
                    {isSuperAdmin && (
                        <button onClick={() => setShowAddModal(true)} className="mt-4 text-[#a200ff] text-sm hover:underline">
                            Add your first staff member
                        </button>
                    )}
                </div>
            ) : (
                <Reorder.Group axis="y" values={staff} onReorder={handleReorder} className="space-y-3">
                    {staff.map((member) => (
                        <Reorder.Item
                            key={member.id}
                            value={member}
                            dragListener={isSuperAdmin}
                            className={`flex items-center gap-4 p-4 rounded-xl border transition-all group cursor-grab active:cursor-grabbing ${member.visible
                                ? 'bg-[#0a0004]/60 border-white/5 hover:border-white/10'
                                : 'bg-[#0a0004]/30 border-white/[0.03] opacity-50'
                                }`}
                        >
                            {/* Drag handle */}
                            {isSuperAdmin && (
                                <span className="material-symbols-outlined text-gray-700 group-hover:text-gray-500 transition-colors text-sm">drag_indicator</span>
                            )}

                            {/* Avatar */}
                            {member.profilePicture ? (
                                <img src={member.profilePicture} alt="" className="w-12 h-12 rounded-full object-cover border-2" style={{ borderColor: ROLE_COLORS[member.role] || '#333' }} />
                            ) : (
                                <div className="w-12 h-12 rounded-full flex items-center justify-center border-2" style={{ borderColor: ROLE_COLORS[member.role] || '#333', backgroundColor: `${ROLE_COLORS[member.role] || '#333'}15` }}>
                                    <span className="material-symbols-outlined text-xl" style={{ color: ROLE_COLORS[member.role] }}>person</span>
                                </div>
                            )}

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-medium truncate">{member.displayName || 'No Name'}</p>
                                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                    {member.title && <span className="text-gray-500 text-xs">{member.title}</span>}
                                    {member.subRoles?.length > 0 && (
                                        <div className="flex gap-1 flex-wrap">
                                            {member.subRoles.map((sr) => (
                                                <span key={sr} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-gray-600 border border-white/5">{sr}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Role Badge */}
                            <span
                                className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-lg border whitespace-nowrap"
                                style={{ color: ROLE_COLORS[member.role], backgroundColor: `${ROLE_COLORS[member.role]}15`, borderColor: `${ROLE_COLORS[member.role]}30` }}
                            >
                                {ROLE_LABELS[member.role] || member.role}
                            </span>

                            {/* Actions */}
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => toggleVisibility(member)} className="p-1.5 rounded-lg hover:bg-white/10 transition-all" title={member.visible ? 'Hide from front page' : 'Show on front page'}>
                                    <span className="material-symbols-outlined text-sm text-gray-400">{member.visible ? 'visibility' : 'visibility_off'}</span>
                                </button>
                                <button onClick={() => openEditModal(member)} className="p-1.5 rounded-lg hover:bg-white/10 transition-all" title="Edit">
                                    <span className="material-symbols-outlined text-sm text-gray-400">edit</span>
                                </button>
                                {isSuperAdmin && member.role !== 'superadmin' && (
                                    <button onClick={() => handleRemove(member)} className="p-1.5 rounded-lg hover:bg-red-500/20 transition-all" title="Remove">
                                        <span className="material-symbols-outlined text-sm text-red-400">person_remove</span>
                                    </button>
                                )}
                            </div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            )}

            {/* ---- ADD STAFF MODAL ---- */}
            <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Add Staff Member">
                <form onSubmit={handleAddStaff} className="space-y-4">
                    <div>
                        <label className={LABEL_CLASS}>Display Name</label>
                        <input type="text" required value={addForm.displayName} onChange={(e) => setAddForm((f) => ({ ...f, displayName: e.target.value }))} className={INPUT_CLASS} placeholder="John Doe" />
                    </div>
                    <div>
                        <label className={LABEL_CLASS}>Title / Position</label>
                        <select value={addForm.title} onChange={(e) => setAddForm((f) => ({ ...f, title: e.target.value }))} className={INPUT_CLASS}>
                            <option value="">Select a position...</option>
                            {positions.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                        </select>
                        <p className="text-gray-700 text-[10px] mt-1">Or type a custom title below</p>
                        <input type="text" value={addForm.title} onChange={(e) => setAddForm((f) => ({ ...f, title: e.target.value }))} className={`${INPUT_CLASS} mt-1`} placeholder="Custom title..." />
                    </div>
                    <div>
                        <label className={LABEL_CLASS}>Main Role</label>
                        <select value={addForm.role} onChange={(e) => setAddForm((f) => ({ ...f, role: e.target.value as any }))} className={INPUT_CLASS}>
                            <option value="staff">Staff</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <SubRoleSelector positions={positions} selected={addForm.subRoles} onChange={(val) => setAddForm((f) => ({ ...f, subRoles: val }))} />
                    <button type="submit" disabled={saving} className="w-full py-3 bg-[#a200ff] text-white font-bold rounded-xl hover:bg-[#a200ff]/80 transition-colors disabled:opacity-50 mt-2">
                        {saving ? 'Creating...' : 'Add Staff Member'}
                    </button>
                </form>
            </Modal>

            {/* ---- EDIT STAFF MODAL ---- */}
            <Modal open={!!editingMember} onClose={() => setEditingMember(null)} title={`Edit ${editingMember?.displayName || 'Staff'}`}>
                <form onSubmit={handleEditStaff} className="space-y-4">
                    <div>
                        <label className={LABEL_CLASS}>Display Name</label>
                        <input type="text" required value={editForm.displayName} onChange={(e) => setEditForm((f) => ({ ...f, displayName: e.target.value }))} className={INPUT_CLASS} />
                    </div>
                    <div>
                        <label className={LABEL_CLASS}>Title / Position</label>
                        <select value={editForm.title} onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))} className={INPUT_CLASS}>
                            <option value="">Select a position...</option>
                            {positions.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                        </select>
                        <input type="text" value={editForm.title} onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))} className={`${INPUT_CLASS} mt-1`} placeholder="Or type a custom title..." />
                    </div>
                    {isSuperAdmin && editingMember?.role !== 'superadmin' && (
                        <div>
                            <label className={LABEL_CLASS}>Main Role</label>
                            <select value={editForm.role} onChange={(e) => setEditForm((f) => ({ ...f, role: e.target.value as any }))} className={INPUT_CLASS}>
                                <option value="staff">Staff</option>
                                <option value="admin">Admin</option>
                                <option value="superadmin">Super Admin</option>
                            </select>
                        </div>
                    )}
                    <SubRoleSelector positions={positions} selected={editForm.subRoles} onChange={(val) => setEditForm((f) => ({ ...f, subRoles: val }))} />
                    <div>
                        <label className={LABEL_CLASS}>Bio</label>
                        <textarea value={editForm.bio} onChange={(e) => setEditForm((f) => ({ ...f, bio: e.target.value }))} className={`${INPUT_CLASS} resize-none h-24`} placeholder="Short bio..." />
                    </div>
                    <div>
                        <label className={LABEL_CLASS}>Profile Picture</label>
                        <div className="flex items-center gap-4">
                            {editForm.profilePicture ? (
                                <img src={editForm.profilePicture} alt="" className="w-16 h-16 rounded-full object-cover border border-white/10" />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                    <span className="material-symbols-outlined text-2xl text-gray-700">person</span>
                                </div>
                            )}
                            <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleEditImageUpload(f); }}
                                className="text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-white/5 file:text-gray-400 hover:file:bg-white/10 cursor-pointer" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={LABEL_CLASS}>Discord</label>
                            <input type="text" value={editForm.discord} onChange={(e) => setEditForm((f) => ({ ...f, discord: e.target.value }))} className={INPUT_CLASS} placeholder="username" />
                        </div>
                        <div>
                            <label className={LABEL_CLASS}>Twitter</label>
                            <input type="text" value={editForm.twitter} onChange={(e) => setEditForm((f) => ({ ...f, twitter: e.target.value }))} className={INPUT_CLASS} placeholder="@handle" />
                        </div>
                    </div>
                    {/* Visibility toggle */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div>
                            <p className="text-white text-sm font-medium">Front Page Visibility</p>
                            <p className="text-gray-600 text-xs">Show this member on the public site</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setEditForm((f) => ({ ...f, visible: !f.visible }))}
                            className={`relative w-12 h-7 rounded-full transition-colors ${editForm.visible ? 'bg-[#a200ff]' : 'bg-white/10'}`}
                        >
                            <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${editForm.visible ? 'left-6' : 'left-1'}`} />
                        </button>
                    </div>
                    <button type="submit" disabled={saving} className="w-full py-3 bg-[#a200ff] text-white font-bold rounded-xl hover:bg-[#a200ff]/80 transition-colors disabled:opacity-50 mt-2">
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </Modal>

            {/* ---- POSITION MANAGER MODAL ---- */}
            <Modal open={showPositionManager} onClose={() => setShowPositionManager(false)} title="Manage Positions">
                <p className="text-gray-500 text-xs mb-4">Create custom positions that can be assigned as titles or sub-roles to staff members.</p>
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={newPositionName}
                        onChange={(e) => setNewPositionName(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addPosition(); } }}
                        className={INPUT_CLASS}
                        placeholder="e.g. Community Manager"
                    />
                    <button onClick={addPosition} className="px-4 py-2 bg-[#a200ff] text-white rounded-xl text-sm font-bold hover:bg-[#a200ff]/80 transition-colors whitespace-nowrap">
                        Add
                    </button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {positions.length === 0 && <p className="text-gray-700 text-xs text-center py-4">No positions created yet.</p>}
                    {positions.map((pos) => (
                        <div key={pos.id} className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5">
                            <span className="text-white text-sm">{pos.name}</span>
                            <button onClick={() => removePosition(pos.id)} className="p-1 rounded hover:bg-red-500/20 transition-colors">
                                <span className="material-symbols-outlined text-sm text-red-400">delete</span>
                            </button>
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default StaffManager;

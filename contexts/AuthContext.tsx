import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    User,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../lib/firebase';

export interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    role: 'superadmin' | 'admin' | 'staff';
    title: string;
    bio: string;
    profilePicture: string;
    socialLinks: {
        discord?: string;
        twitter?: string;
    };
}

interface AuthContextType {
    user: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, displayName: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUserProfile = async (firebaseUser: User) => {
        try {
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            if (userDoc.exists()) {
                setUserProfile(userDoc.data() as UserProfile);
            } else {
                setUserProfile(null);
            }
        } catch (err: any) {
            console.error('Failed to fetch user profile:', err);
            if (err.code === 'permission-denied') {
                console.error('Check your Firestore Security Rules. The client does not have permission to read the user profile.');
            }
            setUserProfile(null);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                await fetchUserProfile(firebaseUser);
            } else {
                setUserProfile(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const login = async (email: string, password: string) => {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        await fetchUserProfile(cred.user);
    };

    const signup = async (email: string, password: string, displayName: string) => {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', cred.user.uid), {
            email,
            displayName,
            role: 'staff',
            title: '',
            bio: '',
            profilePicture: '',
            socialLinks: {},
            subRoles: [],
            visible: true,
            order: 99,
            createdAt: new Date().toISOString(),
        });
        await fetchUserProfile(cred.user);
    };

    const loginWithGoogle = async () => {
        const cred = await signInWithPopup(auth, googleProvider);
        await fetchUserProfile(cred.user);
    };

    const logout = async () => {
        await signOut(auth);
        setUserProfile(null);
    };

    return (
        <AuthContext.Provider value={{ user, userProfile, loading, login, signup, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

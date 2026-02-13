import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAi0x7YXRYlz7vAK9tHdqmcDuFlikeY8fE",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "bozorp-f714b.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "bozorp-f714b",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "bozorp-f714b.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "313710486512",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:313710486512:web:6322effb6157569e16b335",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-DXEQ49LQY4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;

/**
 * Seed script — run once to create the superadmin account and seed initial data.
 * Usage:  npx tsx scripts/seedAdmin.ts
 *
 * Requires the firebase-admin SDK (installed as a devDependency).
 * Also requires a service-account key placed at scripts/serviceAccountKey.json.
 *
 * Alternatively, you can create the user manually in the Firebase Console
 * and run this script only for the Firestore seeding portion.
 */

import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// ---- CONFIG ----
const ADMIN_EMAIL = 'ddj@outlook.com';
const ADMIN_PASSWORD = 'damon123';
const ADMIN_DISPLAY_NAME = 'Damon';

const RULES_SEED = [
    {
        title: 'Community Respect',
        icon: 'handshake',
        punishment: 'Ban',
        description: 'We are a community first. Disrespect, toxicity, hate speech, or harassment will not be tolerated. Treat everyone with basic human decency.',
        order: 1,
    },
    {
        title: 'Microphone Required',
        icon: 'mic',
        punishment: 'Kick / Warn',
        description: 'A working, decent quality microphone is mandatory. English communication required at all times. No mic = No RP.',
        order: 2,
    },
    {
        title: 'Powergaming',
        icon: 'bolt',
        punishment: 'Warn / Ban',
        description: 'Do not force roleplay outcomes on others. No impossible actions (talking while dead, lifting cars, etc.). Give others a chance to react. Do not abuse game mechanics.',
        order: 3,
    },
    {
        title: 'Metagaming',
        icon: 'psychology',
        punishment: 'Ban',
        description: 'Using out-of-character information (Discord, streams, map glitches) in-game is strictly forbidden. Your character only knows what they see and hear in the city.',
        order: 4,
    },
    {
        title: 'New Life Rule (NLR)',
        icon: 'local_hospital',
        punishment: 'Warn / Ban',
        description: 'If you respawn at the hospital, you forget the immediate events leading to your death. You cannot return to the scene for 15 minutes. You cannot seek revenge for that specific incident.',
        order: 5,
    },
    {
        title: 'Safe Zones (Green Zones)',
        icon: 'shield',
        punishment: 'Ban',
        description: 'Violence and criminal activity are prohibited in neutral grounds: Hospitals & Medical Centers, Police Departments, City Hall / Government Buildings.',
        order: 6,
    },
    {
        title: 'Combat Logging',
        icon: 'power_settings_new',
        punishment: 'Ban',
        description: 'Logging out during an active roleplay scene, police chase, or combat to avoid consequences is an instant ban.',
        order: 7,
    },
    {
        title: 'Deathmatching (RDM/VDM)',
        icon: 'person_cancel',
        punishment: '1-Week Ban',
        description: 'You must have valid RP initiation before harming another player. No shooting without conversation or buildup. No vehicle attacks without reason. No harming someone without an in-character motive.',
        order: 8,
    },
];

const GALLERY_SEED = [
    { title: 'Neon Nights', category: 'City Life', type: 'image', src: 'https://images.unsplash.com/photo-1542259684-250878c772e4?q=80&w=2072&auto=format&fit=crop', order: 1 },
    { title: 'The Enforcer', category: 'Characters', type: 'image', src: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2074&auto=format&fit=crop', order: 2 },
    { title: 'High Stakes', category: 'Action', type: 'image', src: 'https://images.unsplash.com/photo-1624138784181-2999e96fb4ae?q=80&w=2070&auto=format&fit=crop', order: 3 },
    { title: 'Heist Prep', category: 'Missions', type: 'video', src: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop', order: 4 },
    { title: 'Midnight Run', category: 'Vehicles', type: 'image', src: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?q=80&w=1951&auto=format&fit=crop', order: 5 },
    { title: 'Underground', category: 'Locations', type: 'image', src: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop', order: 6 },
];

// ---- MAIN ----
async function main() {
    // Try to load service account key
    let serviceAccount: ServiceAccount;
    try {
        serviceAccount = (await import('./serviceAccountKey.json', { assert: { type: 'json' } })).default as ServiceAccount;
    } catch {
        console.error('❌ Could not load scripts/serviceAccountKey.json');
        console.error('   Download it from Firebase Console → Project Settings → Service Accounts → Generate new private key');
        process.exit(1);
    }

    const app = initializeApp({ credential: cert(serviceAccount) });
    const authAdmin = getAuth(app);
    const dbAdmin = getFirestore(app);

    // 1. Create the superadmin user in Firebase Auth
    let uid: string;
    try {
        const existing = await authAdmin.getUserByEmail(ADMIN_EMAIL);
        uid = existing.uid;
        console.log(`✅ Auth user already exists: ${uid}`);
    } catch {
        const newUser = await authAdmin.createUser({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
            displayName: ADMIN_DISPLAY_NAME,
        });
        uid = newUser.uid;
        console.log(`✅ Created auth user: ${uid}`);
    }

    // 2. Create the Firestore user profile
    await dbAdmin.collection('users').doc(uid).set({
        uid,
        email: ADMIN_EMAIL,
        displayName: ADMIN_DISPLAY_NAME,
        role: 'superadmin',
        title: 'Founder & Head Admin',
        bio: '',
        profilePicture: '',
        socialLinks: {},
        createdAt: FieldValue.serverTimestamp(),
    }, { merge: true });
    console.log('✅ Firestore user profile created/updated');

    // 3. Seed rules
    const rulesRef = dbAdmin.collection('rules');
    const existingRules = await rulesRef.get();
    if (existingRules.empty) {
        for (const rule of RULES_SEED) {
            await rulesRef.add({ ...rule, createdAt: FieldValue.serverTimestamp() });
        }
        console.log(`✅ Seeded ${RULES_SEED.length} rules`);
    } else {
        console.log(`⏭️  Rules already exist (${existingRules.size}), skipping seed`);
    }

    // 4. Seed gallery
    const galleryRef = dbAdmin.collection('gallery');
    const existingGallery = await galleryRef.get();
    if (existingGallery.empty) {
        for (const item of GALLERY_SEED) {
            await galleryRef.add({ ...item, createdAt: FieldValue.serverTimestamp() });
        }
        console.log(`✅ Seeded ${GALLERY_SEED.length} gallery items`);
    } else {
        console.log(`⏭️  Gallery already exists (${existingGallery.size}), skipping seed`);
    }

    console.log('\n🎉 Seed complete! You can now login with:');
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
}

main().catch(console.error);

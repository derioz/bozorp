# BOZORP

> "Welcome to the Greatest Show on Earth... that never ends."

A premium, immersive website and admin panel for the **BozoRP** roleplay community. Built with React, Vite, Tailwind CSS, Firebase, and Framer Motion.

---

## 🎪 Features

### Public Website
- **Dark Themed Landing Page** — Custom aesthetic with neon accents, animated gradients, and premium typography.
- **Interactive Gallery** — Bento grid media gallery with lightbox, hover animations, and glitch effects.
- **Staff Section** — Animated staff cards with role-colored accents, glow effects, and click-to-view detail modals. Displays sub-roles, bios, and social links.
- **Rules & Guidelines** — Clean, accessible layout for server rules pulled from Firestore.
- **Clips Section** — Embedded Twitch clips showcase.
- **Notification System** — Real-time notifications for ticket replies and updates.
- **Responsive Design** — Fully optimized for mobile, tablet, and desktop.

### Admin Panel (`/admin`)
- **Authentication** — Email/password sign-in **and sign-up**, plus Google OAuth.
- **Staff Manager** — Full staff CRUD:
  - **Add Staff** — Simple form (display name, role, title, sub-roles). No email/password needed — accounts are created through the sign-up page.
  - **Edit Staff** — Update name, role, title, bio, profile picture (via FiveManage upload), social links (Discord, Twitter), visibility, and sub-roles.
  - **Visibility Toggle** — Eye icon to show/hide staff on the public website. Hidden members appear at 50% opacity in admin.
  - **Custom Positions** — Create and manage custom positions (e.g., "Community Manager") that can be assigned as titles or sub-roles.
  - **Sub-Roles** — Multi-select chip selector; displayed as pill badges on public staff cards.
  - **Drag-to-Reorder** — Drag staff cards to change display order, then save.
  - **Role-Based Access** — Superadmin manages all staff and positions. Admins manage staff below their level.
- **Rules Manager** — CRUD for server rules.
- **Gallery Manager** — CRUD for gallery images.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Vite](https://vitejs.dev/) | Build tool |
| [React](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations & drag-to-reorder |
| [Firebase Auth](https://firebase.google.com/docs/auth) | Authentication (email/password + Google) |
| [Cloud Firestore](https://firebase.google.com/docs/firestore) | Database |
| [FiveManage](https://www.fivemanage.com/) | Image uploads |

---

## 🔥 Firebase Setup

1. **Create a project** at [Firebase Console](https://console.firebase.google.com/).
2. **Register a Web app** and copy the config values.
3. **Enable Auth providers**: Go to **Authentication → Sign-in method** and enable:
   - Email/Password
   - Google
4. **Create Firestore Database**: Start in production mode.
5. **Deploy security rules**: Copy the contents of `firestore.rules` into **Firestore → Rules** and publish. This includes rules for `users`, `rules`, `gallery`, and `positions` collections.

### Firestore Collections

| Collection | Purpose |
|---|---|
| `users` | Staff member profiles (role, title, bio, visibility, sub-roles, order) |
| `positions` | Custom positions for titles and sub-roles |
| `rules` | Server rules |
| `gallery` | Gallery images |

---

## ⚙️ Environment Variables

Create a `.env.local` file (or set in your hosting provider):

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_FIVEMANAGE_API_KEY=your_fivemanage_key
```

See `.env.example` for the full template.

---

## 🚀 Local Development

```bash
# Clone
git clone https://github.com/derioz/bozorp.git
cd bozorp

# Install
npm install

# Dev server
npm run dev

# Production build
npm run build
```

---

## 🌐 Deployment (Vercel)

1. **Import** your repo at [vercel.com/dashboard](https://vercel.com/dashboard).
2. Vercel auto-detects Vite. Defaults:
   - Build: `npm run build`
   - Output: `dist`
3. Add your **Environment Variables** in the Vercel project settings.
4. **Deploy**.

### Custom Domain DNS

Add a **CNAME** record at your registrar:

| Type | Name | Value |
|---|---|---|
| CNAME | `bozorp` | `cname.vercel-dns.com` |

For a root domain, add an **A** record pointing to `76.76.21.21`.

---

## 📝 Usage Guide

### First-Time Setup
1. Deploy the app and open the admin panel at `/admin/login`.
2. Click **SIGN UP** to create your first account with email and password.
3. In Firebase Console → Firestore, find your user document in the `users` collection and change the `role` field to `superadmin`.
4. Refresh the admin panel — you now have full superadmin access.

### Managing Staff
1. Go to **Staff** in the admin sidebar.
2. Click **Positions** to create custom positions first (e.g., "Community Manager", "Developer").
3. Click **Add Staff** to add a new staff member (name, role, title, sub-roles).
4. Click the **pencil icon** to edit any staff member's details, profile picture, bio, or social links.
5. Click the **eye icon** to toggle visibility on the public website.
6. **Drag** staff rows to reorder, then click **Save Order**.

### Managing Rules & Gallery
- Use the **Rules** and **Gallery** tabs in the admin sidebar for CRUD operations.

---

## 👤 Author

**Damon**

## 📄 License

MIT

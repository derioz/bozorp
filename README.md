# BOZORP - Dark Circus Roleplay

> "Welcome to the Greatest Show on Earth... that never ends."

A premium, immersive landing page for the **Dark Circus** roleplay server. Built with React, Vite, and Tailwind CSS.

## 🎪 Features

-   **Dark Circus Theme**: A custom aesthetic blending dark neon, grunge textures, and high-contrast typography.
-   **Interactive Gallery**: A "Bento Grid" style media gallery with lightbox support, hover animations, and glitch effects.
-   **Lore & Professions**: Detailed sections for server backstory ("The Lore") and job opportunities ("The Hustle").
-   **Rules & Guidelines**: A clean, accessible layout for server rules.
-   **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
-   **Modern Tech Stack**:
    -   ⚡ [Vite](https://vitejs.dev/) - Blazing fast build tool.
    -   ⚛️ [React](https://react.dev/) - UI Library.
    -   🎨 [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling.
    -   🧱 [TypeScript](https://www.typescriptlang.org/) - Type safety.

## 🚀 Deployment (Vercel)

This project is optimized for deployment on **Vercel**.

1.  **Fork this Repository**: Click the "Fork" button in the top right of this page to create your own copy.
2.  **Import to Vercel**:
    -   Go to [Vercel Dashboard](https://vercel.com/dashboard).
    -   Click **"Add New..."** -> **"Project"**.
    -   Select your forked `bozorp` repository.
3.  **Configure Project**:
    -   **Framework Preset**: Vercel should automatically detect `Vite`.
    -   **Root Directory**: `./` (default).
    -   **Build Command**: `npm run build` (default).
    -   **Output Directory**: `dist` (default).
4.  **Environment Variables** (Optional): Add any required env vars (see Firebase section below).
5.  **Deploy**: Click **"Deploy"**.

## 🔥 Firebase Setup

The project is designed to integrate with Firebase for Authentication and Firestore.

1.  **Create a Firebase Project**: Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  **Register App**: Add a "Web" app to your project.
3.  **Get Credentials**: Copy the `firebaseConfig` object values.
4.  **Configure Environment**:
    -   Create a `.env` file locally (or add Environment Variables in Vercel):
    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```
5.  **Enable Services**:
    -   **Authentication**: Enable "Google" and "Email/Password" providers.
    -   **Firestore**: Create a database (start in Test Mode for development).
    -   **Storage**: Enable storage if you plan to upload user content.

## 🛠️ Local Development

1.  **Clone the repo**:
    ```bash
    git clone https://github.com/your-username/bozorp.git
    cd bozorp
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start development server**:
    ```bash
    npm run dev
    ```

## 📄 License

MIT

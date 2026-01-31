<div align="center">

# 🎪 BOZORP - Dark Circus Roleplay

### *Where Chaos Meets Opportunity*

[![Live Site](https://img.shields.io/badge/Live-bozorp.vexelstudios.xyz-ff0033?style=for-the-badge)](http://bozorp.vexelstudios.xyz)
[![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-181717?style=for-the-badge&logo=github)](https://github.com/derioz/bozorp)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

**Created by [Vexel Studios](http://vexelstudios.xyz)** ✨

</div>

---

## 🌟 Overview

**Bozorp** is a premium, immersive web experience for a **FiveM Roleplay Server** featuring a dark circus aesthetic. Built with cutting-edge web technologies, this project delivers a visually stunning, mobile-responsive interface that captivates visitors and drives server engagement.

---

## ✨ Features

### 🎨 **Visual Excellence**
- **Dark Circus Aesthetic** with custom gradients and animations
- **Responsive Design** optimized for all devices
- **Interactive Components** with smooth transitions
- **Gradient Text Effects** using inline webkit styles for maximum compatibility
- **Custom Ticket-Style Navigation** with animated progress bar

### 🚀 **Performance**
- **Lightning-Fast Load Times** via Vite bundling
- **Optimized Production Build** with code splitting
- **SEO-Ready** with proper meta tags and semantic HTML
- **CDN-Delivered TailwindCSS** for instant styling

### 📱 **Sections**
- **Hero Section** - Immersive landing with parallax effects
- **About/Lore** - Server backstory and narrative
- **Features** - Key server highlights
- **Activities (Hustle)** - Economy and job system showcase
- **Rules** - Server guidelines
- **CTA (Call-to-Action)** - Direct server connection

---

## 🛠️ Tech Stack

### **Frontend Framework**
| Technology | Version | Purpose |
|------------|---------|---------|
| ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black&style=flat-square) | `19.2.4` | Component-based UI framework |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square) | `5.8.2` | Type-safe JavaScript |
| ![React DOM](https://img.shields.io/badge/-React%20DOM-61DAFB?logo=react&logoColor=black&style=flat-square) | `19.2.4` | DOM rendering for React |

### **Build Tools & Development**
| Technology | Version | Purpose |
|------------|---------|---------|
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white&style=flat-square) | `6.2.0` | Ultra-fast build tool and dev server |
| ![Vite Plugin React](https://img.shields.io/badge/-@vitejs/plugin--react-646CFF?logo=vite&logoColor=white&style=flat-square) | `5.0.0` | Official Vite plugin for React |
| ![Node Types](https://img.shields.io/badge/-@types/node-339933?logo=node.js&logoColor=white&style=flat-square) | `22.14.0` | TypeScript definitions for Node.js |

### **Styling**
| Technology | Version | Purpose |
|------------|---------|---------|
| ![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square) | `CDN` | Utility-first CSS framework |
| **Custom CSS** | - | Webkit gradient text fixes, animations |
| **Google Fonts** | - | Rye, Spline Sans, Noto Sans, Material Symbols |

### **Deployment**
| Technology | Purpose |
|------------|---------|
| ![GitHub Pages](https://img.shields.io/badge/-GitHub%20Pages-181717?logo=github&logoColor=white&style=flat-square) | Static site hosting |
| **Custom DNS** | `bozorp.vexelstudios.xyz` subdomain |

---

## 📦 Installation

### Prerequisites
- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### Setup

```bash
# Clone the repository
git clone https://github.com/derioz/bozorp.git

# Navigate to project directory
cd bozorp

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:3000`

---

## 🏗️ Build & Deploy

### Local Build
```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

The production files will be generated in the `docs/` folder.

### GitHub Pages Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "your message"
   git push origin main
   ```

2. **Configure GitHub Pages**
   - Go to Repository Settings → Pages
   - Source: **Deploy from a branch**
   - Branch: `main` / Folder: `/docs`
   - Save

3. **Custom Domain Setup**
   - The `CNAME` file in `/public` contains: `bozorp.vexelstudios.xyz`
   - Add DNS record at your domain provider:
     - **Type**: `CNAME`
     - **Host**: `bozorp`
     - **Value**: `derioz.github.io`

---

## 📁 Project Structure

```
bozorp/
├── components/           # React components
│   ├── Navbar.tsx       # Ticket-style navigation
│   ├── Hero.tsx         # Landing section
│   ├── AboutSection.tsx # Lore/backstory
│   ├── ActivitiesSection.tsx # Economy showcase
│   ├── FeaturesSection.tsx
│   ├── RulesSection.tsx
│   ├── CTASection.tsx
│   ├── StatsBar.tsx
│   ├── Footer.tsx
│   └── ui/
│       └── Button.tsx   # Reusable button component
├── public/
│   └── CNAME           # Custom domain configuration
├── docs/               # Production build output
├── App.tsx             # Main app component
├── index.tsx           # Entry point
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies & scripts
```

---

## 🎨 Key Features Breakdown

### 🎟️ **Ticket-Style Navbar**
- Animated progress bar showing scroll position
- Responsive mobile menu
- Active section highlighting

### 🌆 **Hero Section**
- Parallax mouse-tracking effects
- Animated ticker at bottom
- Gradient text with webkit compatibility
- Direct FiveM server connection link

### 💼 **Activities/Economy System**
- Interactive cards with hover effects
- Risk level indicators
- Job categories (Trucking, Fishing, Hunting, Drug Economy, etc.)

### 📜 **Rules Section**
- Tabbed interface for different rule categories
- Expandable rule cards
- Clean, readable layout

---

## 🔄 Project Handover

This project is prepared for seamless transfer to a new owner.

### Transfer Checklist

✅ **GitHub Repository Transfer**
- Transfer repo ownership via GitHub Settings → Transfer Ownership
- New owner updates the remote URL locally

✅ **Custom Domain Reconfiguration**
- Update `public/CNAME` with new domain (if applicable)
- Update DNS CNAME record to point to new GitHub username

✅ **Environment Variables**
- Transfer any API keys (e.g., `GEMINI_API_KEY` in `.env.local`)
- Update repository secrets in GitHub Settings

✅ **Rebuild & Deploy**
```bash
npm run build
git add .
git commit -m "chore: update domain/ownership"
git push
```

---

## 🐛 Known Issues & Fixes

### ✅ Gradient Text Visibility
**Issue**: Gradient text was invisible in some browsers  
**Fix**: Replaced Tailwind utility classes with inline styles using explicit webkit properties

---

## 📄 License

This project is private and proprietary.  
**Created exclusively for the Bozorp Roleplay Server by Vexel Studios.**

---

## 🤝 Credits

**Designed & Developed by:**  
[**Vexel Studios**](http://vexelstudios.xyz)

**Technologies:**  
React • TypeScript • Vite • TailwindCSS • GitHub Pages

---

<div align="center">

### 🎭 *Welcome to the Show*

**Questions or Issues?** Contact [Vexel Studios](http://vexelstudios.xyz)

Made with ❤️ by Vexel Studios

</div>

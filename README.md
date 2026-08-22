# 🎵 MJ Player

A tribute web application dedicated to the King of Pop **Michael Jackson**. Browse his discography, explore his legacy, and listen to tracks from 9 iconic albums all wrapped in a premium dark-and-gold interface.

**[Live Demo →](https://github.com/IanCopyPaste/MJ_Player)**

---

## ✨ Features

### 🏠 Home Page
- **Hero section** with a full-screen background slideshow of MJ photos that auto-rotates every 3 seconds
- **Typewriter animation** cycling through "Legend", "Performer", and "Icon"
- Career stats at a glance — 13 Grammy Awards, 750M+ records sold
- **Top 5 albums** horizontal scroll rail with ranked album cards
- "Why Michael Jackson still matters" feature grid

### 💿 Albums Page
- Full discography of **9 albums** containing **100 tracks**
- Accordion-style album dropdowns with staggered fade-in animations
- Album artwork thumbnails with a subtle gold ring border
- One-click track selection that opens the player instantly
- Responsive layout that adapts to any screen size

### 🎧 Music Player
- **Floating modal player** positioned in the bottom-right corner
- Full-size album art display with the close button overlaid on the artwork
- Play/pause, previous/next track controls
- Seekable progress bar with current & total time display
- Volume slider with mouse-wheel support
- Smooth open/close animations

### 🧭 Navigation
- Fixed header with **glassmorphism** blur effect that solidifies on scroll
- Active page indicator with gold underline animation
- Responsive mobile menu with animated hamburger toggle (Escape key to close)
- **Smooth scroll-to-top** on every page navigation

---

## 🎨 Design

The entire UI follows a cohesive **dark luxury** aesthetic:

| Token | Value | Usage |
|---|---|---|
| `--mj-black` | `#080808` | Page backgrounds |
| `--mj-dark` | `#111111` | Card / panel surfaces |
| `--mj-red` | `#a00000` | Primary action buttons |
| `--mj-bright-red` | `#d00000` | Button gradient highlights |
| `--mj-gold` | `#d4af37` | Accent color, borders, labels |
| `--mj-gold-light` | `#f0d675` | Hover states, stat numbers |
| `--mj-white` | `#f5f5f5` | Body text |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 19](https://react.dev/) |
| Routing | [React Router 8](https://reactrouter.com/) |
| Build Tool | [Vite 7](https://vite.dev/) |
| Styling | Vanilla CSS (no utility frameworks) |
| Linting | ESLint 9 with React hooks plugin |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/IanCopyPaste/MJ_Player.git
cd MJ_Player

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
MJ_Player/
├── public/                  # Static assets (songs, favicon)
├── src/
│   ├── assets/              # Images (album covers, hero photos, icons)
│   ├── components/
│   │   ├── Header.jsx       # Fixed nav with glassmorphism & mobile menu
│   │   ├── Footer.jsx       # Site footer with GitHub link
│   │   ├── PlayerModal.jsx  # Floating music player modal
│   │   ├── ButtonHeeHee.jsx # Reusable song button list
│   │   └── css/             # Component-scoped stylesheets
│   ├── css/                 # Page-level stylesheets
│   ├── App.jsx              # Root layout, audio engine, route definitions
│   ├── HomePage.jsx         # Landing page with hero & featured albums
│   ├── AlbumsPage.jsx       # Full discography with accordion dropdowns
│   └── main.jsx             # Entry point with BrowserRouter
├── songs.js                 # Song database (100 tracks across 9 albums)
├── index.html               # HTML shell
├── vite.config.js           # Vite configuration
└── package.json
```

---

## 📜 Albums Included

| # | Album | Year |
|---|---|---|
| 1 | Got to Be There | 1972 |
| 2 | Ben | 1972 |
| 3 | Music & Me | 1973 |
| 4 | Forever, Michael | 1975 |
| 5 | Off the Wall | 1979 |
| 6 | Thriller | 1982 |
| 7 | Bad | 1987 |
| 8 | Dangerous | 1991 |
| 9 | Invincible | 2001 |

---

## 👤 Author

**Ian Adote** — [@IanCopyPaste](https://github.com/IanCopyPaste)

---

## 📄 License

This project is for educational and personal use. All music, images, and trademarks related to Michael Jackson belong to their respective rights holders.
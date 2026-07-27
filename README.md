# 🚀 HACK26 — Modern Hackathon Registration Platform

A high-performance, production-quality frontend prototype of a modern Hackathon Registration Website built for software development team recruitment portfolios. Features rich interactive design, bespoke animation systems, multi-step registration flows, state management, and a full-featured admin management dashboard.

---

## ✨ Features & Highlights

### 🎨 Frontend UI & Micro-Interactions
- **Floating Capsule Navbar**: Compact 75% width pill header featuring active scroll-section tracking, theme toggle, and smooth anchor navigation.
- **Hero Section & Live Countdown**: Real-time event countdown timer, ambient blur blobs, interactive spotlight cursor, and statistical callout strip.
- **Alternating Interactive Schedule**: Dynamic event roadmap displaying completed, current, and upcoming stages on alternating timeline sides with clean vector nodes.
- **3D Tilt Prize Pool Cards**: Interactive 3D perspective cards leveraging Framer Motion transform math with tier badges and prize breakdowns.
- **Multi-Step Registration Flow**: 3-step registration wizard (Personal Info $\rightarrow$ Track Selection $\rightarrow$ Team & Experience) with validation and success state handling.
- **Sponsors Carousel**: Infinite-scrolling marquee carousel with fallback card rendering.
- **FAQ Accordion**: Interactive animated accordion for quick attendee inquiry resolution.
- **Dark Mode Support**: Deep dark theme powered by `next-themes` with tailored color-mix borders and high-contrast surfaces.

### 🛡️ Admin Dashboard (`/admin`)
- **Event Metrics & Analytics**: Real-time metrics overview (Total Registrations, Team Count, Track Popularity, Status).
- **Registration Table Management (`/admin/registrations`)**: Search, filter by track, and manage attendee details.
- **Live Event Settings (`/admin/settings`)**: Dynamic configuration control panel allowing live updates to event name, tagline, dates, prizes, and schedule直接 syncing to global Zustand state.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Library & Logic**: [React 19](https://react.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme Manager**: [Next Themes](https://github.com/pacocoursey/next-themes)

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── admin/               # Admin Portal (Overview, Registrations Table, Settings)
│   ├── globals.css          # Global CSS Design Tokens & Typography Scale
│   ├── layout.tsx           # Root Layout with Theme Provider & Custom Cursor
│   └── page.tsx             # Public Landing Page
├── components/
│   ├── ui/                  # Reusable UI primitives (Button, Badge, TiltCard, Eyebrow)
│   ├── sections/            # Landing Page Sections (Hero, About, Schedule, Prizes, etc.)
│   ├── AnnouncementBar.tsx   # Dismissable Announcement Notification
│   ├── CustomCursor.tsx     # Custom Pointer Interaction Layer
│   ├── Footer.tsx           # Site Footer
│   └── Navbar.tsx           # Floating Header Navigation
├── hooks/                   # Custom Hooks (useCountdown, useTiltEffect, useCursorPosition)
├── store/                   # Global Config & Registration Store (Zustand)
└── lib/                     # Utility Functions (clsx, tailwind-merge)
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18.0 or later) installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/hack26-registration.git
   cd hack26-registration
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build

To test the optimized production build:

```bash
npm run build
npm run start
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

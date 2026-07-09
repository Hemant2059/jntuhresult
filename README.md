# JNTUH Results

[![Next.js](https://img.shields.io/badge/Next.js-16-blue?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-blue?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Rust](https://img.shields.io/badge/Backend-Rust-orange?logo=rust&logoColor=white)](https://www.rust-lang.org/)

A fast, student-friendly portal to check **JNTUH B.Tech and B.Pharmacy results** instantly. Built with **Next.js 16**, **Rust API**, and **ShadCN UI**.

> **Live:** [jntuhresultbp.vercel.app](https://jntuhresultbp.vercel.app)

---

## Features

### Result Checking
- **Semester Results** — subject-wise marks, grades, credits, SGPA
- **Academic Results** — full history, CGPA, semester-wise breakdown
- **Class Results** — toppers, rankings, statistical charts
- **All Results Transcript** — combined view across all semesters
- **Notifications** — latest JNTUH result notifications with hall ticket lookup

### Tools
- **SGPA Calculator** — regulation & degree aware, with visual grade breakdown
- **CGPA Calculator** — weighted & simple average methods, semester management
- **Grading System** — complete grade reference for all regulations

### Content
- **8 Blog Articles** — step-by-step guides, tips, regulation explanations
- **About, Contact, Privacy, Terms, Disclaimer** pages

### Technical
- Dark/light theme with eye-friendly color palette
- Mobile-first responsive design
- Framer Motion animations
- SEO optimized with JSON-LD structured data, canonical URLs, sitemap
- Google AdSense & Analytics integration
- Custom 404 and error boundary pages

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4, ShadCN UI, Framer Motion |
| Backend | Rust (Actix-web), scraping JNTUH official results |
| Deployment | Vercel (frontend), Render (backend) |

---

## Project Structure

```
├── app/
│   ├── page.tsx                    # Homepage
│   ├── semester/page.tsx           # Semester result form
│   ├── academic/page.tsx           # Academic result form
│   ├── classresult/page.tsx        # Class result form
│   ├── allresult/page.tsx          # All results transcript
│   ├── notifications/              # JNTUH notifications
│   ├── sgpa-calculator/            # SGPA calculator
│   ├── cgpa-calculator/            # CGPA calculator
│   ├── grading-system/             # Grade reference
│   ├── blog/                       # 8 blog articles
│   ├── about/                      # About page
│   ├── contact/                    # Contact form
│   ├── privacy/                    # Privacy policy
│   ├── terms/                      # Terms of service
│   ├── disclaimer/                 # Disclaimer
│   ├── layout.tsx                  # Root layout (SEO, analytics, ads)
│   ├── globals.css                 # Tailwind + custom theme
│   ├── sitemap.ts                  # Dynamic sitemap
│   ├── not-found.tsx               # Custom 404
│   └── error.tsx                   # Error boundary
├── components/
│   ├── blog-post-layout.tsx        # Blog layout with TOC, share, progress
│   ├── notification-form.tsx       # Notification search form
│   ├── result-info-section.tsx     # Result page info content
│   └── ui/                         # ShadCN components
├── action/
│   └── results.ts                  # Server actions for API calls
├── lib/
│   └── utils.ts                    # Utility functions
└── .env.local                      # NEXT_PUBLIC_API_URL config
```

---

## Setup

### Prerequisites
- Node.js 18+
- pnpm
- Rust (for backend)

### Frontend

```bash
git clone https://github.com/Hemant2059/jntuhresult.git
cd jntuhresult
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Backend

The Rust API is hosted separately at `jntuh-api-rust/`. See that directory for setup instructions.

---

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://jntuh-api.onrender.com
```

---

## Author

**Hemant Pandey**

- [GitHub](https://github.com/Hemant2059)

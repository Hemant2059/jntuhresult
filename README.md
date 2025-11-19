# JNTUH Results Portal

[![Next.js](https://img.shields.io/badge/Next.js-13-blue?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-blue?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-7.6-pink?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

A fast, friendly, and clean interface to check **JNTUH academic, semester, and class results** instantly. Built with **Next.js**, **ShadCN UI**, and **Framer Motion**, this portal is mobile-friendly and student-oriented.

---

## Features

### Hero Section

- Eye-catching heading with animation.
- Brief description explaining the portal.
- Highlights quick and easy result checking.

### Feature Cards

- **Academic Result**: Complete academic overview including CGPA and grade history.
- **Semester Result**: View SGPA, subject-wise marks, and semester performance.
- **Class Result**: Check class toppers, rankings, and statistical charts.
- Interactive hover effects with smooth animations.

### FAQ Section

- Student-friendly Frequently Asked Questions.
- Collapsible accordion style using **ShadCN UI**.
- Smooth **fade-in animations** on scroll with **Framer Motion**.
- Covers common queries:

  - How to check results
  - Downloading results
  - Mobile access
  - Data safety
  - Handling discrepancies

### Footer

- Clean and minimal footer showing copyright.

---

## Technologies Used

- [Next.js 13/14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- Tailwind CSS

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/jntuh-results-portal.git
cd jntuh-results-portal
```

2. **Install dependencies**

```bash
pnpm install
# or
npm install
```

3. **Run the development server**

```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
.
├── app/
│   └── page.tsx         # Home page with hero, feature cards, and FAQ
├── components/
│   └── ui/
│       └── accordion.tsx  # ShadCN Accordion component
├── public/              # Static assets (images, icons)
├── styles/              # Tailwind global styles
├── package.json
└── README.md
```

---

## Usage

- Click on the feature cards to navigate to **Academic**, **Semester**, or **Class Result** pages.
- Scroll down to the FAQ section for common queries.
- Expand/collapse FAQ items to view answers.
- Fully responsive and mobile-friendly.

---

## Future Improvements

- Add a **search by roll number** functionality.
- Connect to a **live JNTUH results API**.
- Add user authentication for **personalized dashboard**.
- Add **download PDF** and **print** options for results.
- Add **light/dark mode** toggle for better UX.

---

## License

This project is licensed under the **MIT License**.

---

## Author

**Hemant Pandey**

- [LinkedIn](https://www.linkedin.com/)
- [GitHub](https://github.com/)

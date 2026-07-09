import { Metadata } from "next";
import Home from "./home-client";

export const metadata: Metadata = {
  title: "JNTUH Results 2026 | B.Tech & B.Pharmacy R22, R25 Results",
  description:
    "Check your JNTUH B.Tech and B.Pharmacy results instantly. Supports all regulations R13-R25. SGPA calculator, CGPA calculator, and academic result analysis.",
  keywords: ["JNTUH results", "JNTUH B.Tech results", "JNTUH B.Pharmacy results", "JNTUH SGPA", "JNTUH CGPA", "JNTUH results 2026", "JNTUH R22 results", "JNTUH R25 results"],
  alternates: { canonical: "https://jntuhresultbp.vercel.app" },
  openGraph: {
    title: "JNTUH Results 2026 | B.Tech & B.Pharmacy Results",
    description: "Check your JNTUH B.Tech and B.Pharmacy results instantly. Supports all regulations R13-R25.",
    url: "https://jntuhresultbp.vercel.app",
    type: "website",
  },
};

export default function HomePage() {
  return <Home />;
}

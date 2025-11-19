import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://yourwebsite.com"),
  title: {
    default: "JNTU Results | Fast & Accurate B.Tech Results Checker",
    template: "%s | JNTU Results",
  },
  description:
    "Instant JNTU B.Tech and B.Pharmacy results checker with SGPA, CGPA calculator, backlog info, hall ticket search, and subject-wise analysis.",
  keywords: [
    "JNTU Results",
    "JNTUH B.Tech Results",
    "JNTUH B.Pharmacy Results",
    "SGPA Calculator",
    "CGPA Calculator",
    "JNTU Hall Ticket",
    "Semester Result Checker",
    "Engineering Results",
    "University Results",
    "Fast Result Checker",
    "Accurate Results",
    "Student Portal",
    "JNTU Result Analysis",
    "JNTU Backlog Info",
    "JNTU Subject-wise Marks",
  ],
  openGraph: {
    title: "JNTU Results – Fastest Result Checker",
    description:
      "Check JNTU B.Tech/M.Tech results instantly with SGPA + CGPA. Accurate, fast, student-friendly.",
    url: "https://jntuhresultbp.vercel.app",
    siteName: "JNTU Results Portal",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JNTU Results – Instant Result Checker",
    description: "Fastest JNTU result lookup.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "JNTU Results Portal",
            url: "https://yourwebsite.com",
            logo: "https://yourwebsite.com/logo.png",
            sameAs: ["https://facebook.com", "https://instagram.com"],
          }),
        }}
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}

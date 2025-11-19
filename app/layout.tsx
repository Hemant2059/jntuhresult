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
  metadataBase: new URL("https://jntuhresultbp.vercel.app"),
  title: {
    default:
      "JNTUH Results | Fast & Accurate B.Tech and B.Pharmacy Results Checker",
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
    title: "JNTUH Results – Fastest Result Checker",
    description:
      "Check JNTUH B.Tech/B.Pharmacy results instantly with SGPA + CGPA. Accurate, fast, student-friendly.",
    url: "https://jntuhresultbp.vercel.app",
    siteName: "JNTUH Results Portal",
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
    title: "JNTUH Results – Instant Result Checker",
    description: "Fastest JNTUH result lookup.",
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

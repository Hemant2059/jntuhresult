import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jntuhresultbp.vercel.app"),
  title: {
    default:
      "JNTUH Results Vercel | Fast & Accurate B.Tech and B.Pharmacy Results Checker",
    template: "%s | JNTUH Results",
  },
  description:
    "Instant JNTUH B.Tech and B.Pharmacy results checker with SGPA, CGPA calculator, backlog info, hall ticket search, and subject-wise analysis.",
  keywords: [
    "jntuh vercel",
    "jntuh results vercel",
    "jntuh",
    "jntuh results",
    "JNTU Results",
    "JNTUH B.Tech Results",
    "JNTUH B.Pharmacy Results",
    "JNTUH M.Tech Results",
    "JNTUH MBA Results",
    "JNTUH MCA Results",
    "SGPA Calculator",
    "CGPA Calculator",
    "JNTUH Hall Ticket",
    "Semester Result Checker",
    "Engineering Results",
    "Pharmacy Results",
    "University Results",
    "Fast Result Checker",
    "JNTU Result Analysis",
    "JNTU Backlog Info",
    "JNTU Subject-wise Marks",
    "JNTUH Grade Points",
    "JNTUH Academic Records",
    "JNTUH Transcript",
    "JNTUH Supplementary Results",
    "JNTUH Revaluation Results",
    "JNTUH Online Results",
    "JNTUH Exam Results",
    "How to check JNTUH results",
    "JNTUH result portal",
    "btech 1-1 results",
    "btech 1-2 results",
    "btech 2-1 results",
    "btech 2-2 results",
    "btech 3-1 results",
    "btech 3-2 results",
    "btech 4-1 results",
    "btech 4-2 results",
    "bpharmacy 1-1 results",
    "bpharmacy 1-2 results",
    "bpharmacy 2-1 results",
    "bpharmacy 2-2 results",
    "bpharmacy 3-1 results",
    "bpharmacy 3-2 results",
    "bpharmacy 4-1 results",
    "bpharmacy 4-2 results",
  ],
  openGraph: {
    title: "JNTUH Results – Fastest Result Checker",
    description:
      "Check JNTUH B.Tech/B.Pharmacy results instantly with SGPA + CGPA. Accurate, fast, student-friendly.",
    url: "https://jntuhresultbp.vercel.app",
    siteName: "JNTUH Results Vercel",
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
  alternates: {
    canonical: "https://jntuhresultbp.vercel.app",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "JNTUH Results Vercel",
      alternateName: ["JNTUH Results Vercel", "JNTU Result Checker"],
      url: "https://jntuhresultbp.vercel.app",
      potentialAction: {
        "@type": "SearchAction",
        target:
          "https://jntuhresultbp.vercel.app/academic?hallticket={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "JNTUH Results Vercel",
      url: "https://jntuhresultbp.vercel.app",
      logo: "https://jntuhresultbp.vercel.app/logo.png",
    },
  ];

  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />

        {/* Google Verification */}
        <meta
          name="google-site-verification"
          content="hb7T1JTtI-p5rLAWqhiYKc3BJySemkcYXlu5PEJspGs"
        />

        {/* Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-5786755591893406" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
        <GoogleAnalytics gaId="G-N72VLSMGFL" />
      </body>
    </html>
  );
}

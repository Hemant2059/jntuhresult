import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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
    "SGPA Calculator",
    "CGPA Calculator",
    "JNTUH Hall Ticket",
    "Semester Result Checker",
    "Engineering Results",
    "University Results",
    "Fast Result Checker",
    "JNTU Result Analysis",
    "JNTU Backlog Info",
    "JNTU Subject-wise Marks",
    "btech 1-1 results",
    "btech 1-2 results",
    "btech 2-1 results",
    "btech 2-2 results",
    "btech 3-1 results",
    "btech 3-2 results",
    "btech 4-1 results",
    "btech 4-2 results",
    "bpharmcy 1-1 results",
    "bpharmcy 1-2 results",
    "bpharmcy 2-1 results",
    "bpharmcy 2-2 results",
    "bpharmcy 3-1 results",
    "bpharmcy 3-2 results",
    "bpharmcy 4-1 results",
    "bpharmcy 4-2 results",
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
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://jntuhresultbp.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteNameSchema = {
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
  };
  return (
    <html lang="en">
      <head>
        {/* Structured Data for Site Name */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteNameSchema),
          }}
        />
        <meta
          name="google-site-verification"
          content="hb7T1JTtI-p5rLAWqhiYKc3BJySemkcYXlu5PEJspGs"
        />
        <meta name="google-adsense-account" content="ca-pub-5786755591893406" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

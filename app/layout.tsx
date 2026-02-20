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
      "JNTUH Results 2026 | Fast B.Tech, B.Pharmacy R22, R25 Results Checker",
    template: "%s | JNTUH Results",
  },
  description:
    "Instant JNTUH B.Tech, B.Pharmacy results checker for R22, R25 regulations. Check semester results, SGPA, CGPA, backlog info, supplementary results. Fast, accurate, free.",
  keywords: [
    "jntuh results",
    "jntuh results 2026",
    "jntuh vercel",
    "jntuh btech results",
    "jntuh bpharmacy results",
    "jntuh r22 results",
    "jntuh r25 results",
    "jntuh btech r22 results",
    "jntuh bpharmacy r22 results",
    "jntuh btech r25 results",
    "jntuh bpharmacy r25 results",
    "JNTU Results",
    "JNTUH B.Tech Results",
    "JNTUH B.Pharmacy Results",
    "JNTUH M.Tech Results",
    "JNTUH MBA Results",
    "JNTUH MCA Results",
    "JNTUH R22 Results",
    "JNTUH R25 Results",
    "JNTUH R18 Results",
    "SGPA Calculator",
    "CGPA Calculator",
    "JNTUH SGPA",
    "JNTUH CGPA",
    "JNTUH Hall Ticket",
    "JNTUH Semester Results",
    "JNTUH Supplementary Results",
    "JNTUH Revaluation Results",
    "JNTUH Backlog Results",
    "JNTUH RC RV Results",
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
    "JNTUH Online Results",
    "JNTUH Exam Results",
    "How to check JNTUH results",
    "JNTUH result portal",
    "jntuh results jntuhac.in",
    "btech 1-1 results jntuh",
    "btech 1-2 results jntuh",
    "btech 2-1 results jntuh",
    "btech 2-2 results jntuh",
    "btech 3-1 results jntuh",
    "btech 3-2 results jntuh",
    "btech 4-1 results jntuh",
    "btech 4-2 results jntuh",
    "bpharmacy 1-1 results jntuh",
    "bpharmacy 1-2 results jntuh",
    "bpharmacy 2-1 results jntuh",
    "bpharmacy 2-2 results jntuh",
    "bpharmacy 3-1 results jntuh",
    "bpharmacy 3-2 results jntuh",
    "bpharmacy 4-1 results jntuh",
    "bpharmacy 4-2 results jntuh",
    "jntuh results login",
    "jntuh results direct link",
    "jntuh exam results 2026",
    "jntuh regular results",
    "jntuh supply results",
  ],
  authors: [{ name: "JNTUH Results" }],
  creator: "JNTUH Results",
  publisher: "JNTUH Results",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "JNTUH Results 2026 | B.Tech B.Pharmacy R22 R25 Results Checker",
    description:
      "Check JNTUH B.Tech/B.Pharmacy R22, R25 results instantly with SGPA, CGPA. Fast, accurate, free. Also check supplementary, revaluation results.",
    url: "https://jntuhresultbp.vercel.app",
    siteName: "JNTUH Results",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JNTUH Results - Fast B.Tech B.Pharmacy Results Checker",
      },
    ],
    locale: "en_IN",
    alternateLocale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JNTUH Results 2026 | B.Tech B.Pharmacy R22 R25",
    description:
      "Instant JNTUH B.Tech B.Pharmacy results checker. Fast, free, accurate.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://jntuhresultbp.vercel.app",
    languages: {
      en: "https://jntuhresultbp.vercel.app",
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
      name: "JNTUH Results",
      alternateName: ["JNTUH Results", "JNTU Result Checker", "JNTUH B.Tech Results", "JNTUH B.Pharmacy Results"],
      url: "https://jntuhresultbp.vercel.app",
      description: "Fast and accurate JNTUH B.Tech, B.Pharmacy results checker for R22, R25 regulations. Check semester results, SGPA, CGPA, supplementary results.",
      publisher: {
        "@type": "Organization",
        name: "JNTUH Results",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://jntuhresultbp.vercel.app/academic?hallticket={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "JNTUH Results",
      url: "https://jntuhresultbp.vercel.app",
      logo: "https://jntuhresultbp.vercel.app/logo.png",
      sameAs: [
        "https://twitter.com/jntuhresults",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "hp2059712@gmail.com",
        contactType: "customer service",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How to check JNTUH results?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Visit jntuhresultbp.vercel.app, enter your 10-digit hall ticket number, and click search to view your results instantly.",
          },
        },
        {
          "@type": "Question",
          name: "What regulations are supported?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We support JNTUH B.Tech and B.Pharmacy results for R22, R25, R18, R16, R15, and R13 regulations.",
          },
        },
        {
          "@type": "Question",
          name: "Are the results accurate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we fetch results directly from the official JNTUH API. However, always verify with the official university portal.",
          },
        },
      ],
    },
  ];

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
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
        <GoogleAnalytics gaId="G-N72VLSMGFL" />
      </body>
    </html>
  );
}

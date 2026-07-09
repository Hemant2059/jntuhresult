import { Metadata } from "next";
import ContactPage from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the JNTUH Results team. Have questions, feedback, or need support? Reach out to us via email or contact form.",
  alternates: { canonical: "https://jntuhresultbp.vercel.app/contact" },
  openGraph: {
    title: "Contact Us - JNTUH Results",
    description: "Get in touch with the JNTUH Results team for questions, feedback, or support.",
    url: "https://jntuhresultbp.vercel.app/contact",
    type: "website",
  },
};

export default function Contact() {
  return <ContactPage />;
}

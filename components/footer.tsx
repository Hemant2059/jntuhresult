"use client";

import Link from "next/link";
import { GraduationCap, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Navigation",
      links: [
        { label: "Home", href: "/" },
        { label: "Academic Result", href: "/academic" },
        { label: "Semester Result", href: "/semester" },
        { label: "Class Result", href: "/classresult" },
        { label: "All Results", href: "/allresult" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Disclaimer", href: "/disclaimer" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "Official Results", href: "http://results.jntuh.ac.in", external: true },
        { label: "About Us", href: "/about" },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-6 lg:px-8 print:hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-blue-600 rounded-xl text-white group-hover:rotate-12 transition-transform">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">JNTUH RESULT</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Providing fast, accurate, and easy-to-read academic results for JNTUH students. Built with focus on user experience and data clarity.
            </p>
          </div>

          {/* Links Sections */}
          {sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      className="text-sm text-gray-500 hover:text-blue-600 hover:underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} JNTUH Result Dashboard. Not affiliated with JNTUH.
          </p>
          <p className="text-sm text-gray-400 flex items-center gap-1.5">
            Built for students with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

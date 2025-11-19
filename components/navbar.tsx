"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/academic", label: "Academic Result" },
    { href: "/semester", label: "Semester Result" },
    { href: "/classresult", label: "Class Result" },
  ];

  const closeMenu = () => setOpen(false);

  return (
    <nav className="p-4 flex items-center justify-between mx-4 border-b relative print:hidden">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold hover:opacity-80 transition">
        Jntuh Result
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-6 font-semibold">
        {navLinks.map((item) => (
          <li
            key={item.href}
            className={
              pathname === item.href ? "underline font-bold" : "hover:underline"
            }
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>

      {/* Mobile Toggle Button */}
      <button
        className="md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={28} />
      </button>

      {/* Dark background overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          onClick={closeMenu}
        />
      )}

      {/* Slide-In Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-40 p-6 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={closeMenu} aria-label="Close menu">
            <X size={26} />
          </button>
        </div>

        <ul className="flex flex-col gap-6 font-semibold">
          {navLinks.map((item) => (
            <li
              key={item.href}
              className={
                pathname === item.href
                  ? "underline font-bold"
                  : "hover:underline"
              }
            >
              <Link href={item.href} onClick={closeMenu}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

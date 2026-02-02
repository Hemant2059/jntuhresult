"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/academic", label: "Academic Result" },
    { href: "/semester", label: "Semester Result" },
    { href: "/allresult", label: "All Results" },
    { href: "/classresult", label: "Class Result" },
  ];

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md print:hidden">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 px-6 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link
            href="/"
            className="-m-1.5 p-1.5 text-2xl font-bold tracking-tight text-blue-600 hover:opacity-90 transition-opacity"
          >
            JNTUH RESULT
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold leading-6 transition-colors hover:text-blue-600 ${
                pathname === item.href ? "text-blue-600" : "text-gray-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button asChild size="sm" variant="outline" className="rounded-full">
            <Link href="/academic">Search Result</Link>
          </Button>
        </div>
      </nav>

    </header>

    {/* Mobile Slide-In Sidebar */}
    {open && (
      <div className="lg:hidden">
        {/* Dark background overlay */}
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={closeMenu} />
        
        <div className="fixed inset-y-0 right-0 z-50 w-full lg:hidden overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 text-xl font-bold text-blue-600" onClick={closeMenu}>
              JNTUH RESULT
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={closeMenu}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 ${
                      pathname === item.href ? "text-blue-600" : "text-gray-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Button asChild className="w-full rounded-xl">
                  <Link href="/academic" onClick={closeMenu}>Search Result</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);
};

export default Navbar;

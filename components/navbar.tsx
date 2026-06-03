"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Moon, Sun, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  const toggleDark = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    setDark(html.classList.contains("dark"));
  };

  const navLinks = [
    { href: "/academic", label: "Academic" },
    { href: "/semester", label: "Semester" },
    { href: "/allresult", label: "All Results" },
    { href: "/classresult", label: "Class" },
  ];

  const closeMenu = () => setOpen(false);

  const linkClass = (href: string) =>
    `text-sm font-semibold leading-6 transition-colors hover:text-blue-600 ${
      pathname === href ? "text-blue-600" : "text-gray-700 dark:text-gray-300"
    }`;

  const mobileLinkClass = (href: string) =>
    `-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
      pathname === href ? "text-blue-600" : "text-gray-900 dark:text-gray-100"
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200/60 dark:border-gray-800/60 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md print:hidden">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 px-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link
              href="/"
              className="-m-1.5 p-1.5 text-xl sm:text-2xl font-bold tracking-tight text-blue-600 hover:opacity-90 transition-opacity"
            >
              JNTUH RESULT
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleDark}
              className="rounded-md p-2.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              type="button"
              className="rounded-md p-2.5 text-gray-700 dark:text-gray-300"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-8">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-3">
            <button
              type="button"
              onClick={toggleDark}
              className="rounded-full p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Button asChild size="sm" variant="outline" className="rounded-full">
              <Link href="/notifications">
                <Bell className="h-4 w-4 mr-1.5" />
                Notifications
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      {open && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={closeMenu} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-950 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 text-xl font-bold text-blue-600" onClick={closeMenu}>
                JNTUH RESULT
              </Link>
              <button
                type="button"
                className="rounded-md p-2.5 text-gray-700 dark:text-gray-300"
                onClick={closeMenu}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-800">
                <div className="space-y-2 py-6">
                  {navLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className={mobileLinkClass(item.href)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="space-y-3 py-6">
                  <Button asChild className="w-full rounded-xl">
                    <Link href="/notifications" onClick={closeMenu}>Notifications</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full rounded-xl gap-2"
                    onClick={() => { toggleDark(); closeMenu(); }}
                  >
                    {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    {dark ? "Light Mode" : "Dark Mode"}
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

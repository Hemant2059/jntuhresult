import Link from "next/link";
import { Search, Home, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist. Check JNTUH results, use our SGPA/CGPA calculators, or browse our helpful guides.",
  alternates: { canonical: "https://jntuhresultbp.vercel.app/not-found" },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <div className="h-20 w-20 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-6xl font-black text-foreground mb-3">404</h1>
          <h2 className="text-xl font-bold text-foreground mb-2">Page Not Found</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            <Home className="h-4 w-4" />
            Go to Homepage
          </Link>
          <Link
            href="/semester"
            className="flex items-center justify-center gap-2 w-full py-3 bg-secondary text-foreground font-bold rounded-xl hover:bg-accent transition-colors"
          >
            Check Semester Results
          </Link>
          <Link
            href="/academic"
            className="flex items-center justify-center gap-2 w-full py-3 bg-secondary text-foreground font-bold rounded-xl hover:bg-accent transition-colors"
          >
            Check Academic Results
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground mb-3">Popular pages</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: "SGPA Calculator", href: "/sgpa-calculator" },
              { label: "CGPA Calculator", href: "/cgpa-calculator" },
              { label: "Blog", href: "/blog" },
              { label: "Grading System", href: "/grading-system" },
              { label: "Notifications", href: "/notifications" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 bg-secondary text-xs font-semibold text-foreground rounded-lg hover:bg-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JNTUH Results Guide & Updates",
  description:
    "Read the latest JNTUH result updates, guides on checking B.Tech and B.Pharmacy results, SGPA/CGPA calculators, and exam preparation tips.",
  alternates: { canonical: "https://jntuhresultbp.vercel.app/blog" },
};

const articles = [
  {
    slug: "how-to-check-jntuh-results",
    title: "How to Check JNTUH B.Tech & B.Pharmacy Results Online",
    description:
      "A complete step-by-step guide to checking your JNTUH results using hall ticket number. Learn how to access semester results, SGPA, and CGPA instantly.",
    date: "2026-01-15",
    readTime: "5 min read",
  },
  {
    slug: "understanding-sgpa-cgpa",
    title: "Understanding SGPA and CGPA in JNTUH: Complete Guide",
    description:
      "Learn how SGPA and CGPA are calculated at JNTUH. Understand the grading system, credit system, and how your grades affect your academic record.",
    date: "2026-01-20",
    readTime: "7 min read",
  },
  {
    slug: "jntuh-regulations-explained",
    title: "JNTUH Regulations (R13 to R25): What Students Need to Know",
    description:
      "A detailed comparison of JNTUH regulations from R13 to R25. Understand curriculum changes, grading patterns, and eligibility criteria.",
    date: "2026-02-01",
    readTime: "8 min read",
  },
  {
    slug: "jntuh-backlog-supplementary-exams",
    title: "JNTUH Backlog & Supplementary Exams: Complete Guide",
    description:
      "Everything you need to know about JNTUH supplementary exams, backlog rules, eligibility, and how to clear failed subjects effectively.",
    date: "2026-02-10",
    readTime: "6 min read",
  },
  {
    slug: "jntuh-revaluation-process",
    title: "JNTUH Revaluation (RC/RV) Process: How to Apply and What to Expect",
    description:
      "Step-by-step guide to applying for JNTUH revaluation and re-verification. Learn about fees, timelines, and how results are updated.",
    date: "2026-02-20",
    readTime: "5 min read",
  },
  {
    slug: "tips-to-improve-jntuh-results",
    title: "10 Tips to Improve Your JNTUH Exam Results",
    description:
      "Practical study tips and strategies for JNTUH B.Tech and B.Pharmacy students to improve their grades and academic performance.",
    date: "2026-03-01",
    readTime: "6 min read",
  },
  {
    slug: "btech-vs-bpharmacy",
    title: "JNTUH B.Tech vs B.Pharmacy: Which Course to Choose?",
    description:
      "Detailed comparison of JNTUH B.Tech and B.Pharmacy programs including syllabus, career options, salary, and which course is better for you.",
    date: "2026-03-10",
    readTime: "7 min read",
  },
  {
    slug: "download-jntuh-results-pdf",
    title: "How to Download JNTUH Results as PDF",
    description:
      "Step-by-step guide to downloading your JNTUH B.Tech and B.Pharmacy results as PDF files. Save your marks sheets and grade reports offline.",
    date: "2026-03-15",
    readTime: "4 min read",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background dark:bg-background">
      <div className="bg-card dark:bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-14 sm:py-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">JNTUH Results Guide</h1>
              <p className="text-muted-foreground text-sm mt-1">Helpful articles and updates for JNTUH students</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group bg-card dark:bg-card rounded-3xl border border-border p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {article.title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {article.description}
              </p>

              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                Read Article <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

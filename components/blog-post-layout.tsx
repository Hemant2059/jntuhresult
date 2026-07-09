"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft, Calendar, Clock, Share2, Twitter, Copy, Check,
  ChevronUp, BookOpen, User, ArrowRight,
} from "lucide-react";

const ALL_ARTICLES = [
  { slug: "how-to-check-jntuh-results", title: "How to Check JNTUH B.Tech & B.Pharmacy Results Online", description: "A complete step-by-step guide to checking your JNTUH results using hall ticket number.", date: "2026-01-15", readTime: "5 min read", category: "Results" },
  { slug: "understanding-sgpa-cgpa", title: "Understanding SGPA and CGPA in JNTUH: Complete Guide", description: "Learn how SGPA and CGPA are calculated at JNTUH.", date: "2026-01-20", readTime: "7 min read", category: "Grading" },
  { slug: "jntuh-regulations-explained", title: "JNTUH Regulations (R13 to R25): What Students Need to Know", description: "A detailed comparison of JNTUH regulations from R13 to R25.", date: "2026-02-01", readTime: "8 min read", category: "Regulations" },
  { slug: "jntuh-backlog-supplementary-exams", title: "JNTUH Backlog & Supplementary Exams: Complete Guide", description: "Everything about JNTUH supplementary exams, backlog rules, and eligibility.", date: "2026-02-10", readTime: "6 min read", category: "Exams" },
  { slug: "jntuh-revaluation-process", title: "JNTUH Revaluation (RC/RV) Process: How to Apply", description: "Step-by-step guide to applying for JNTUH revaluation.", date: "2026-02-20", readTime: "5 min read", category: "Exams" },
  { slug: "tips-to-improve-jntuh-results", title: "10 Tips to Improve Your JNTUH Exam Results", description: "Practical study tips and strategies for JNTUH students.", date: "2026-03-01", readTime: "6 min read", category: "Study Tips" },
  { slug: "btech-vs-bpharmacy", title: "JNTUH B.Tech vs B.Pharmacy: Which Course to Choose?", description: "Detailed comparison of JNTUH B.Tech and B.Pharmacy programs.", date: "2026-03-10", readTime: "7 min read", category: "Courses" },
  { slug: "download-jntuh-results-pdf", title: "How to Download JNTUH Results as PDF", description: "Step-by-step guide to downloading your JNTUH results as PDF files.", date: "2026-03-15", readTime: "4 min read", category: "Results" },
];

interface BlogPostLayoutProps {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  description: string;
  children: ReactNode;
}

function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
      <div
        className="h-full bg-linear-to-r from-primary to-primary/80 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function TableOfContents() {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;
    const els = article.querySelectorAll("h2, h3");
    const items = Array.from(els).map((el, i) => {
      const id = `heading-${i}`;
      el.id = id;
      return { id, text: el.textContent || "", level: el.tagName === "H2" ? 2 : 3 };
    });
    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActiveId(e.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    items.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  if (headings.length < 2) return null;

  return (
    <nav className="hidden xl:block sticky top-28 space-y-1">
      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
        On This Page
      </h4>
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className={`block text-[13px] leading-snug py-1 border-l-2 transition-all ${
            h.level === 3 ? "pl-5" : "pl-3"
          } ${
            activeId === h.id
              ? "border-blue-600 text-primary font-semibold"
              : "border-transparent text-muted-foreground hover:text-foreground dark:hover:text-white hover:border-gray-300"
          }`}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );
}

function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://jntuhresultbp.vercel.app/blog/${slug}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mr-1">Share</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="h-8 w-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-primary transition-colors"
      >
        <Twitter className="h-3.5 w-3.5" />
      </a>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="h-8 w-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-primary transition-colors"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
      <button
        onClick={copyLink}
        className="h-8 w-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-foreground dark:hover:text-white transition-colors"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 h-11 w-11 rounded-full bg-primary text-white shadow-lg shadow-primary/30 flex items-center justify-center hover:bg-primary/90 transition-all animate-in fade-in slide-in-from-bottom-4"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}

function RelatedArticles({ currentSlug }: { currentSlug: string }) {
  const related = ALL_ARTICLES.filter((a) => a.slug !== currentSlug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <section className="mt-16 pt-10 border-t border-border">
      <h2 className="text-xl font-bold text-foreground mb-6">Related Articles</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {related.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group p-5 bg-secondary dark:bg-secondary rounded-2xl border border-border hover:border-primary/30 hover:bg-card dark:hover:bg-gray-800 transition-all"
          >
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider">{article.category}</span>
            <h3 className="text-sm font-bold text-foreground mt-1.5 mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h3>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              <span className="h-0.5 w-0.5 rounded-full bg-gray-300 dark:bg-gray-600" />
              <span>{article.readTime}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function AuthorSection() {
  return (
    <div className="mt-12 p-6 bg-secondary dark:bg-secondary rounded-2xl border border-border flex items-start gap-4">
      <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
        <User className="h-5 w-5 text-primary" />
      </div>
      <div>
        <p className="text-sm font-bold text-foreground">JNTUH Results Team</p>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          We help JNTUH B.Tech and B.Pharmacy students check their results instantly, calculate SGPA/CGPA,
          and stay updated with the latest notifications. Our platform supports all regulations from R13 to R25.
        </p>
      </div>
    </div>
  );
}

export default function BlogPostLayout({ slug, title, date, readTime, description, children }: BlogPostLayoutProps) {
  const article = ALL_ARTICLES.find((a) => a.slug === slug);
  const category = article?.category || "Guide";

  return (
    <>
      <ReadingProgressBar />
      <BackToTop />

      {/* JSON-LD Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            description,
            datePublished: date,
            dateModified: date,
            author: { "@type": "Organization", name: "JNTUH Results" },
            publisher: {
              "@type": "Organization",
              name: "JNTUH Results",
              logo: { "@type": "ImageObject", url: "https://jntuhresultbp.vercel.app/og-image.png" },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": `https://jntuhresultbp.vercel.app/blog/${slug}` },
          }),
        }}
      />

      <main className="min-h-screen bg-background dark:bg-background">
        {/* Hero */}
        <div className="bg-card dark:bg-card border-b border-border">
          <div className="max-w-6xl mx-auto px-6 py-10 sm:py-16">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mb-6 group"
            >
              <div className="h-7 w-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-all">
                <ArrowLeft className="h-3.5 w-3.5" />
              </div>
              All Articles
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-primary text-[11px] font-bold rounded-lg uppercase tracking-wider">
                {category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
              <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight max-w-3xl">
              {title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {description}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <ShareButtons title={title} slug={slug} />
            </div>
          </div>
        </div>

        {/* Content + TOC */}
        <div className="max-w-6xl mx-auto px-6 py-10 sm:py-14">
          <div className="flex gap-12">
            {/* Main content */}
            <article className="flex-1 min-w-0 max-w-3xl">
              <div className="prose prose-gray dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-foreground dark:prose-headings:text-white
                prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed
                prose-li:text-gray-600 dark:prose-li:text-gray-400
                prose-strong:text-foreground dark:prose-strong:text-white
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-blue-900/10 prose-blockquote:rounded-r-xl prose-blockquote:py-1
                prose-code:text-primary prose-code:bg-blue-50 dark:prose-code:bg-blue-900/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
                prose-ol:marker:text-primary prose-ul:marker:text-primary
                prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl
                prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-lg"
              >
                {children}
              </div>

              <AuthorSection />
              <RelatedArticles currentSlug={slug} />

              {/* CTA */}
              <div className="mt-10 p-6 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-border">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">Found this helpful?</h3>
                    <p className="text-xs text-muted-foreground mt-1 mb-3">
                      Check your JNTUH results instantly with our fast and reliable platform.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Link href="/semester" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors">
                        Semester Results <ArrowRight className="h-3 w-3" />
                      </Link>
                      <Link href="/academic" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-card dark:bg-card text-foreground text-xs font-bold rounded-lg border border-border hover:border-primary/30 transition-colors">
                        Academic Results <ArrowRight className="h-3 w-3" />
                      </Link>
                      <Link href="/sgpa-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-card dark:bg-card text-foreground text-xs font-bold rounded-lg border border-border hover:border-primary/30 transition-colors">
                        SGPA Calculator <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar TOC */}
            <div className="hidden xl:block w-56 shrink-0">
              <TableOfContents />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

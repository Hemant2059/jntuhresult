import BlogPostLayout from "@/components/blog-post-layout";
import Link from "next/link";

export const metadata = {
  title: "How to Download JNTUH Results as PDF",
  description:
    "Step-by-step guide to downloading your JNTUH B.Tech and B.Pharmacy results as PDF files. Save your marks sheets and grade reports offline.",
  alternates: { canonical: "https://jntuhresultbp.vercel.app/blog/download-jntuh-results-pdf" },
};

export default function BlogPost() {
  return (
    <BlogPostLayout
      slug="download-jntuh-results-pdf"
      title="How to Download JNTUH Results as PDF"
      date="2026-03-15"
      readTime="4 min read"
      description="Step-by-step guide to downloading your JNTUH results as PDF files."
    >
      <p>
        Having a PDF copy of your results is essential for <strong>job applications, higher education admissions, and personal records</strong>.
        Here&apos;s how to download them in seconds.
      </p>

      <h2>Why Download as PDF?</h2>

      <div className="not-prose my-6 grid sm:grid-cols-2 gap-3">
        {[
          { use: "Job Applications", desc: "Companies require semester-wise mark sheets during placements." },
          { use: "Higher Education", desc: "Universities ask for academic transcripts for admission." },
          { use: "Personal Records", desc: "Keep a backup for future reference." },
          { use: "Visa Applications", desc: "Some countries require academic records for student visas." },
          { use: "Scholarships", desc: "Academic performance proof is needed for many scholarships." },
          { use: "Government Exams", desc: "UPSC, GATE, and PSU applications need mark sheets." },
        ].map((item, i) => (
          <div key={i} className="flex gap-3 p-3 bg-secondary dark:bg-secondary rounded-lg border border-border">
            <span className="text-primary font-bold mt-0.5">→</span>
            <div>
              <div className="text-sm font-bold text-foreground">{item.use}</div>
              <div className="text-xs text-muted-foreground">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <h2>Method 1: One-Click Download (Recommended)</h2>

      <p>Our platform has a built-in PDF download for all result types.</p>

      <div className="not-prose my-6 space-y-4">
        <div className="p-5 bg-secondary dark:bg-secondary rounded-xl border border-border">
          <div className="text-sm font-bold text-primary mb-3">Download Semester Results</div>
          <div className="space-y-2">
            {[
              "Go to jntuhresultbp.vercel.app/semester",
              "Enter your hall ticket number and select semester",
              'Click "Show Result"',
              'Click the "Download PDF" or "Print" button',
              'Select "Save as PDF" in the print dialog',
            ].map((step, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="h-5 w-5 rounded bg-primary text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</div>
                <span className="text-sm text-muted-foreground">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 bg-secondary dark:bg-secondary rounded-xl border border-indigo-100 dark:border-indigo-800">
          <div className="text-sm font-bold text-primary mb-3">Download Academic Results</div>
          <div className="space-y-2">
            {[
              "Go to jntuhresultbp.vercel.app/academic",
              'Enter your hall ticket number and click "View Results"',
              "Use the print/download option",
              "Save the PDF to your device",
            ].map((step, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="h-5 w-5 rounded bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</div>
                <span className="text-sm text-muted-foreground">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2>Method 2: Browser Print Feature</h2>

      <p>If you can&apos;t find a direct download button, use your browser&apos;s print feature:</p>

      <div className="not-prose my-6 p-5 bg-secondary dark:bg-secondary rounded-xl border border-border">
        <div className="space-y-3">
          {[
            "Fetch your results on our platform as usual",
            'Press Ctrl + P (Windows) or Cmd + P (Mac)',
            'Select "Save as PDF" in the destination dropdown',
            "Adjust layout — Portrait for semester, Landscape for wide tables",
            'Click Save and choose your location',
          ].map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="h-5 w-5 rounded bg-gray-900 dark:bg-gray-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</div>
              <span className="text-sm text-muted-foreground">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <h2>Method 3: On Mobile</h2>

      <div className="not-prose my-6 p-5 bg-secondary dark:bg-secondary rounded-xl border border-purple-100 dark:border-purple-800">
        <div className="space-y-3">
          {[
            "Open our website on your mobile browser (Chrome, Safari)",
            "Fetch your results as usual",
            "Tap the browser menu (three dots) → Share or Print",
            'Select "Save as PDF" or Print option',
            "On iOS, use the share sheet to save to Files or send via email",
          ].map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="h-5 w-5 rounded bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</div>
              <span className="text-sm text-muted-foreground">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <h2>Tips for Better PDF Quality</h2>

      <div className="not-prose my-6 p-5 bg-secondary dark:bg-secondary rounded-xl border border-amber-200 dark:border-amber-800">
        <ul className="text-sm text-amber-800 dark:text-amber-300 space-y-2">
          <li className="flex gap-2"><span className="font-bold">•</span> Use <strong>Portrait</strong> for semester results, <strong>Landscape</strong> for wide academic tables</li>
          <li className="flex gap-2"><span className="font-bold">•</span> Enable <strong>&quot;Background graphics&quot;</strong> in print settings for colors</li>
          <li className="flex gap-2"><span className="font-bold">•</span> Set margins to <strong>&quot;None&quot;</strong> or <strong>&quot;Minimum&quot;</strong> for a cleaner look</li>
          <li className="flex gap-2"><span className="font-bold">•</span> Name files clearly — like <strong>&quot;JNTUH_3-1_Results_22XX.pdf&quot;</strong></li>
        </ul>
      </div>

      <h2>Frequently Asked Questions</h2>

      <div className="not-prose my-6 space-y-3">
        <div className="p-4 bg-secondary dark:bg-secondary rounded-xl border border-border">
          <div className="text-sm font-bold text-foreground mb-1">Is the PDF officially valid?</div>
          <p className="text-sm text-muted-foreground">
            The PDF from our platform is for <strong>reference purposes</strong>.
            For official verification, always use the results from the official JNTUH portal.
          </p>
        </div>
        <div className="p-4 bg-secondary dark:bg-secondary rounded-xl border border-border">
          <div className="text-sm font-bold text-foreground mb-1">Can I download results for multiple semesters?</div>
          <p className="text-sm text-muted-foreground">
            Yes. Fetch each semester separately and download individual PDFs.
            Use our <Link href="/academic" className="text-primary hover:underline font-semibold">Academic Results</Link> page to see all semesters at once.
          </p>
        </div>
      </div>
    </BlogPostLayout>
  );
}

import BlogPostLayout from "@/components/blog-post-layout";
import Link from "next/link";

export const metadata = {
  title: "How to Check JNTUH B.Tech & B.Pharmacy Results Online",
  description:
    "A complete step-by-step guide to checking your JNTUH results using hall ticket number. Learn how to access semester results, SGPA, and CGPA instantly.",
  alternates: { canonical: "https://jntuhresultbp.vercel.app/blog/how-to-check-jntuh-results" },
};

export default function BlogPost() {
  return (
    <BlogPostLayout
      slug="how-to-check-jntuh-results"
      title="How to Check JNTUH B.Tech & B.Pharmacy Results Online"
      date="2026-01-15"
      readTime="5 min read"
      description="A complete step-by-step guide to checking your JNTUH results using hall ticket number."
    >
      <p>
        Every semester, thousands of students across Telangana wait for their JNTUH results.
        The official portal at <strong>results.jntuh.ac.in</strong> often crashes under heavy traffic.
      </p>
      <p>
        Our platform gives you a <strong>faster, more reliable</strong> way to access the same results.
      </p>

      <h2>What You Need Before Checking</h2>

      <div className="not-prose my-6 grid sm:grid-cols-3 gap-3">
        <div className="p-4 bg-secondary dark:bg-secondary rounded-xl border border-border">
          <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Hall Ticket Number</div>
          <p className="text-sm text-muted-foreground">Your unique 10-digit number printed on your exam hall ticket.</p>
        </div>
        <div className="p-4 bg-secondary dark:bg-secondary rounded-xl border border-indigo-100 dark:border-indigo-800">
          <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Semester</div>
          <p className="text-sm text-muted-foreground">Know which semester you want: 1-1, 1-2, 2-1, 2-2, 3-1, 3-2, 4-1, or 4-2.</p>
        </div>
        <div className="p-4 bg-secondary dark:bg-secondary rounded-xl border border-purple-100 dark:border-purple-800">
          <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Internet</div>
          <p className="text-sm text-muted-foreground">A stable connection on your phone, laptop, or computer.</p>
        </div>
      </div>

      <h2>Check Semester Results (SGPA)</h2>

      <div className="not-prose my-6 space-y-3">
        {[
          { step: "1", title: "Open the Result Page", desc: "Go to jntuhresultbp.vercel.app/semester on your browser." },
          { step: "2", title: "Select Your Semester", desc: "Pick your semester from the dropdown — for example, 3-1 for Third Year, First Semester." },
          { step: "3", title: "Enter Hall Ticket Number", desc: "Type your 10-digit hall ticket number. No spaces, no typos." },
          { step: "4", title: "Click Show Result", desc: "Hit the button and wait a couple of seconds for results to load." },
          { step: "5", title: "View Your Results", desc: "Subject-wise marks, grades, credits, and SGPA appear in a detailed table." },
        ].map((item) => (
          <div key={item.step} className="flex gap-4 p-4 bg-secondary dark:bg-secondary rounded-xl border border-border">
            <div className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0">
              {item.step}
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">{item.title}</div>
              <div className="text-sm text-muted-foreground mt-0.5">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <h2>Check Academic Results (CGPA)</h2>

      <p>
        Want to see your <strong>full academic history</strong> and overall CGPA?
        It&apos;s just as easy.
      </p>

      <div className="not-prose my-6 space-y-3">
        {[
          { step: "1", title: "Open Academic Results", desc: "Go to jntuhresultbp.vercel.app/academic." },
          { step: "2", title: "Enter Hall Ticket", desc: "Type your 10-digit hall ticket number." },
          { step: "3", title: "View Full Record", desc: "Click \"View Results\" — your CGPA, total credits, and semester-wise breakdown appear instantly." },
        ].map((item) => (
          <div key={item.step} className="flex gap-4 p-4 bg-secondary dark:bg-secondary rounded-xl border border-border">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
              {item.step}
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">{item.title}</div>
              <div className="text-sm text-muted-foreground mt-0.5">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <h2>Check All Exam Results</h2>

      <p>
        Need your <strong>complete examination history</strong> — regular, supplementary, and revaluation?
        Head to the All Results page.
      </p>

      <div className="not-prose my-6 space-y-3">
        {[
          { step: "1", title: "Open All Results", desc: "Go to jntuhresultbp.vercel.app/allresult." },
          { step: "2", title: "Enter Hall Ticket", desc: "Type your 10-digit hall ticket number." },
          { step: "3", title: "Browse Everything", desc: "Every exam result from first year to final year — all in one place." },
        ].map((item) => (
          <div key={item.step} className="flex gap-4 p-4 bg-secondary dark:bg-secondary rounded-xl border border-border">
            <div className="h-8 w-8 rounded-lg bg-purple-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
              {item.step}
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">{item.title}</div>
              <div className="text-sm text-muted-foreground mt-0.5">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <h2>Common Mistakes to Avoid</h2>

      <div className="not-prose my-6 p-4 bg-secondary dark:bg-secondary rounded-xl border border-amber-200 dark:border-amber-800">
        <div className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-2">Before you submit, double-check these:</div>
        <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1.5">
          <li>Even <strong>one wrong digit</strong> in your hall ticket will return no results.</li>
          <li>Results may take <strong>24-48 hours</strong> to appear after official declaration.</li>
          <li>If results aren&apos;t loading, the JNTUH server may be <strong>under maintenance</strong> — try again later.</li>
          <li>Always verify with the <strong>official JNTUH portal</strong> for official academic records.</li>
        </ul>
      </div>

      <h2>Frequently Asked Questions</h2>

      <div className="not-prose my-6 space-y-3">
        <div className="p-4 bg-secondary dark:bg-secondary rounded-xl border border-border">
          <div className="text-sm font-bold text-foreground mb-1">Can I check results for any regulation?</div>
          <p className="text-sm text-muted-foreground">
            Yes. We support <strong>R22, R25, R18, R16, R15, and R13</strong> for both B.Tech and B.Pharmacy.
          </p>
        </div>
        <div className="p-4 bg-secondary dark:bg-secondary rounded-xl border border-border">
          <div className="text-sm font-bold text-foreground mb-1">Is my data safe?</div>
          <p className="text-sm text-muted-foreground">
            Absolutely. We only display official results fetched from the JNTUH API. <strong>We do not store any personal information.</strong>
          </p>
        </div>
        <div className="p-4 bg-secondary dark:bg-secondary rounded-xl border border-border">
          <div className="text-sm font-bold text-foreground mb-1">Can I download my results?</div>
          <p className="text-sm text-muted-foreground">
            Yes! All results can be <strong>downloaded as PDF</strong> for your records with a single click.
          </p>
        </div>
      </div>
    </BlogPostLayout>
  );
}

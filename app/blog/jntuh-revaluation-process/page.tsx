import BlogPostLayout from "@/components/blog-post-layout";
import Link from "next/link";

export const metadata = {
  title: "JNTUH Revaluation (RC/RV) Process: How to Apply",
  description:
    "Step-by-step guide to applying for JNTUH revaluation and re-verification. Learn about fees, timelines, and how results are updated.",
  alternates: { canonical: "https://jntuhresultbp.vercel.app/blog/jntuh-revaluation-process" },
};

export default function BlogPost() {
  return (
    <BlogPostLayout
      slug="jntuh-revaluation-process"
      title="JNTUH Revaluation (RC/RV) Process: How to Apply and What to Expect"
      date="2026-02-20"
      readTime="5 min read"
      description="Step-by-step guide to applying for JNTUH revaluation and re-verification."
    >
      <p>
        If your exam marks don&apos;t reflect your actual performance, JNTUH offers a <strong>revaluation (RV)</strong> and <strong>re-verification (RC)</strong> process.
        Here&apos;s exactly how it works.
      </p>

      <h2>Revaluation vs Re-verification</h2>

      <div className="not-prose my-6 grid sm:grid-cols-2 gap-4">
        <div className="p-5 bg-secondary dark:bg-secondary rounded-xl border border-border">
          <div className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Revaluation (RV)</div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your <strong>entire answer sheet</strong> is re-evaluated by a different examiner.
            Checks for marking errors, totaling mistakes, and unvalued answers.
          </p>
        </div>
        <div className="p-5 bg-secondary dark:bg-secondary rounded-xl border border-indigo-100 dark:border-indigo-800">
          <div className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Re-verification (RC)</div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A <strong>lighter process</strong> — your answer sheet is checked for totaling errors and whether all answers were evaluated.
            Less comprehensive than full revaluation.
          </p>
        </div>
      </div>

      <h2>How to Apply</h2>

      <div className="not-prose my-6 space-y-3">
        {[
          { step: "1", title: "Check Notification", desc: "After results are declared, JNTUH releases a revaluation notification with deadlines." },
          { step: "2", title: "Apply Through College", desc: "Submit your application through your college examination cell within the deadline." },
          { step: "3", title: "Pay the Fee", desc: "Pay the revaluation fee — typically ₹500-₹1000 per subject depending on the type." },
          { step: "4", title: "Submit Application", desc: "Submit the application form with required documents and fee receipt." },
          { step: "5", title: "Wait for Results", desc: "Revaluation results are usually declared within 2-4 weeks." },
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

      <h2>Important Rules</h2>

      <div className="not-prose my-6 p-5 bg-secondary dark:bg-secondary rounded-xl border border-amber-200 dark:border-amber-800">
        <ul className="text-sm text-amber-800 dark:text-amber-300 space-y-2">
          <li className="flex gap-2"><span className="font-bold">•</span> <strong>Deadline is strict</strong> — late applications are not accepted under any circumstances.</li>
          <li className="flex gap-2"><span className="font-bold">•</span> <strong>Fee is non-refundable</strong> — even if your marks don&apos;t change.</li>
          <li className="flex gap-2"><span className="font-bold">•</span> <strong>Marks can go up or down</strong> — your revalued marks are final and binding.</li>
          <li className="flex gap-2"><span className="font-bold">•</span> <strong>Apply wisely</strong> — it takes time and money, so only apply if you&apos;re confident.</li>
        </ul>
      </div>

      <h2>When to Apply vs When Not To</h2>

      <div className="not-prose my-6 grid sm:grid-cols-2 gap-4">
        <div className="p-5 bg-secondary dark:bg-secondary rounded-xl border border-green-100 dark:border-green-800">
          <div className="text-sm font-bold text-green-700 dark:text-green-400 mb-2">Apply If...</div>
          <ul className="text-sm text-green-800 dark:text-green-300 space-y-1.5">
            <li>• You attempted the paper well but got low marks</li>
            <li>• You suspect a totaling error</li>
            <li>• You narrowly missed passing by a few marks</li>
            <li>• The gap between expected and actual marks is significant</li>
          </ul>
        </div>
        <div className="p-5 bg-secondary dark:bg-secondary rounded-xl border border-red-100 dark:border-red-800">
          <div className="text-sm font-bold text-red-700 dark:text-red-400 mb-2">Don&apos;t Apply If...</div>
          <ul className="text-sm text-red-800 dark:text-red-300 space-y-1.5">
            <li>• You didn&apos;t prepare well and hope for a miracle</li>
            <li>• You&apos;re just disappointed with the result</li>
            <li>• The marks you received are reasonable</li>
            <li>• You can&apos;t afford to wait 2-4 weeks</li>
          </ul>
        </div>
      </div>

      <h2>Check Revaluation Results</h2>

      <div className="not-prose my-6 grid sm:grid-cols-2 gap-3">
        <Link href="/allresult" className="group p-4 bg-secondary dark:bg-secondary rounded-xl border border-border hover:border-primary/30 transition-colors text-center">
          <div className="text-sm font-bold text-primary group-hover:text-primary">All Results</div>
          <p className="text-xs text-muted-foreground mt-1">Updated marks after revaluation</p>
        </Link>
        <Link href="/notifications" className="group p-4 bg-secondary dark:bg-secondary rounded-xl border border-indigo-100 dark:border-indigo-800 hover:border-indigo-300 transition-colors text-center">
          <div className="text-sm font-bold text-primary group-hover:text-indigo-700">Notifications</div>
          <p className="text-xs text-muted-foreground mt-1">Latest RC/RV result declarations</p>
        </Link>
      </div>

      <h2>Frequently Asked Questions</h2>

      <div className="not-prose my-6 space-y-3">
        <div className="p-4 bg-secondary dark:bg-secondary rounded-xl border border-border">
          <div className="text-sm font-bold text-foreground mb-1">Can my marks decrease after revaluation?</div>
          <p className="text-sm text-muted-foreground">
            Yes. Marks can increase, decrease, or stay the same. The revalued marks are final.
          </p>
        </div>
        <div className="p-4 bg-secondary dark:bg-secondary rounded-xl border border-border">
          <div className="text-sm font-bold text-foreground mb-1">How long does revaluation take?</div>
          <p className="text-sm text-muted-foreground">
            Typically 2-4 weeks, but this varies depending on JNTUH&apos;s schedule.
          </p>
        </div>
        <div className="p-4 bg-secondary dark:bg-secondary rounded-xl border border-border">
          <div className="text-sm font-bold text-foreground mb-1">Is revaluation worth it?</div>
          <p className="text-sm text-muted-foreground">
            If you&apos;re confident about your performance and the marks gap is significant, it may be worth trying.
          </p>
        </div>
      </div>
    </BlogPostLayout>
  );
}

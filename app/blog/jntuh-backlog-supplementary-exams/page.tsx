import BlogPostLayout from "@/components/blog-post-layout";
import Link from "next/link";

export const metadata = {
  title: "JNTUH Backlog & Supplementary Exams: Complete Guide",
  description:
    "Everything you need to know about JNTUH supplementary exams, backlog rules, eligibility, and how to clear failed subjects effectively.",
  alternates: { canonical: "https://jntuhresultbp.vercel.app/blog/jntuh-backlog-supplementary-exams" },
};

export default function BlogPost() {
  return (
    <BlogPostLayout
      slug="jntuh-backlog-supplementary-exams"
      title="JNTUH Backlog & Supplementary Exams: Complete Guide"
      date="2026-02-10"
      readTime="6 min read"
      description="Everything about JNTUH supplementary exams, backlog rules, and eligibility."
    >
      <p>
        Backlogs are a reality for many JNTUH students.
        The good news? JNTUH provides <strong>supplementary exams</strong> as a second chance to clear failed subjects.
      </p>

      <h2>What is a Backlog?</h2>

      <p>
        A backlog is any subject you haven&apos;t passed — you received an <strong>&apos;F&apos; grade</strong> or below the minimum required grade.
      </p>

      <div className="not-prose my-6 p-4 bg-secondary dark:bg-secondary rounded-xl border border-amber-200 dark:border-amber-800">
        <div className="text-sm text-amber-800 dark:text-amber-300">
          <strong>Important:</strong> Having backlogs does <strong>not</strong> mean you are expelled.
          You simply need to reappear for those specific subjects.
        </div>
      </div>

      <h2>What are Supplementary Exams?</h2>

      <p>
        Supplementary exams (supply exams) are special exams conducted by JNTUH for students who failed in one or more subjects.
        They give you an <strong>additional opportunity</strong> to clear backlogs without losing an academic year.
      </p>

      <h2>Key Rules You Must Know</h2>

      <div className="not-prose my-6 space-y-3">
        {[
          { title: "Maximum Attempts", desc: "JNTUH allows multiple attempts for backlogs. Clear them as early as possible.", icon: "1" },
          { title: "Grace Marks", desc: "In some cases, JNTUH may award grace marks if you are close to passing.", icon: "2" },
          { title: "CGPA Impact", desc: "Backlogs bring down your CGPA. Clearing them with better grades can improve it.", icon: "3" },
          { title: "Degree Eligibility", desc: "You must clear ALL backlogs to receive your degree certificate.", icon: "4" },
          { title: "Placement Impact", desc: "Many companies require zero active backlogs during placement drives.", icon: "5" },
        ].map((item) => (
          <div key={item.icon} className="flex gap-4 p-4 bg-secondary dark:bg-secondary rounded-xl border border-border">
            <div className="h-8 w-8 rounded-lg bg-red-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
              {item.icon}
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">{item.title}</div>
              <div className="text-sm text-muted-foreground mt-0.5">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <h2>How Supplementary Exams Work</h2>

      <div className="not-prose my-6 space-y-3">
        {[
          { step: "1", title: "Notification", desc: "JNTUH releases supplementary exam notifications through its official website and affiliated colleges." },
          { step: "2", title: "Registration", desc: "Register through your college examination cell by paying the exam fee." },
          { step: "3", title: "Exam Schedule", desc: "The schedule is published separately. Check the official website for exact dates." },
          { step: "4", title: "Appear for Exam", desc: "Attend the exam for the specific subject(s) you want to clear." },
          { step: "5", title: "Results", desc: "Results are declared separately and can be checked on our platform." },
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

      <h2>Tips to Clear Backlogs Fast</h2>

      <div className="not-prose my-6 p-5 bg-secondary dark:bg-secondary rounded-xl border border-green-100 dark:border-green-800">
        <ul className="text-sm text-green-800 dark:text-green-300 space-y-2">
          <li className="flex gap-2"><span className="font-bold">1.</span> Focus on subjects with the <strong>most CGPA impact</strong> first.</li>
          <li className="flex gap-2"><span className="font-bold">2.</span> Solve <strong>previous year papers</strong> — supply exams follow similar patterns.</li>
          <li className="flex gap-2"><span className="font-bold">3.</span> Make sure you&apos;re studying the <strong>current syllabus</strong> for your regulation.</li>
          <li className="flex gap-2"><span className="font-bold">4.</span> Create a <strong>study schedule</strong> that covers all subjects before the exam date.</li>
          <li className="flex gap-2"><span className="font-bold">5.</span> Use <strong>YouTube lectures and online resources</strong> for difficult topics.</li>
        </ul>
      </div>

      <h2>Check Your Supplementary Results</h2>

      <div className="not-prose my-6 grid sm:grid-cols-2 gap-3">
        <Link href="/allresult" className="group p-4 bg-secondary dark:bg-secondary rounded-xl border border-border hover:border-primary/30 transition-colors text-center">
          <div className="text-sm font-bold text-primary group-hover:text-primary">All Results</div>
          <p className="text-xs text-muted-foreground mt-1">Shows all results including supplementary</p>
        </Link>
        <Link href="/notifications" className="group p-4 bg-secondary dark:bg-secondary rounded-xl border border-indigo-100 dark:border-indigo-800 hover:border-indigo-300 transition-colors text-center">
          <div className="text-sm font-bold text-primary group-hover:text-indigo-700">Notifications</div>
          <p className="text-xs text-muted-foreground mt-1">Stay updated with latest result declarations</p>
        </Link>
      </div>

      <h2>Frequently Asked Questions</h2>

      <div className="not-prose my-6 space-y-3">
        <div className="p-4 bg-secondary dark:bg-secondary rounded-xl border border-border">
          <div className="text-sm font-bold text-foreground mb-1">How many supplementary exams can I appear for?</div>
          <p className="text-sm text-muted-foreground">
            JNTUH allows multiple attempts. There is no strict limit, but clear backlogs as early as possible.
          </p>
        </div>
        <div className="p-4 bg-secondary dark:bg-secondary rounded-xl border border-border">
          <div className="text-sm font-bold text-foreground mb-1">Will my supply grade replace the original?</div>
          <p className="text-sm text-muted-foreground">
            Yes. The supplementary exam grade <strong>replaces</strong> your previous grade for that subject.
          </p>
        </div>
        <div className="p-4 bg-secondary dark:bg-secondary rounded-xl border border-border">
          <div className="text-sm font-bold text-foreground mb-1">Can I appear for supply exams while still studying?</div>
          <p className="text-sm text-muted-foreground">
            Yes. Students can appear for supplementary exams even while continuing their regular semesters.
          </p>
        </div>
      </div>
    </BlogPostLayout>
  );
}

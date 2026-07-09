import BlogPostLayout from "@/components/blog-post-layout";
import Link from "next/link";

export const metadata = {
  title: "JNTUH Regulations (R13 to R25): What Students Need to Know",
  description:
    "A detailed comparison of JNTUH regulations from R13 to R25. Understand curriculum changes, grading patterns, and eligibility criteria.",
  alternates: { canonical: "https://jntuhresultbp.vercel.app/blog/jntuh-regulations-explained" },
};

export default function BlogPost() {
  return (
    <BlogPostLayout
      slug="jntuh-regulations-explained"
      title="JNTUH Regulations (R13 to R25): What Students Need to Know"
      date="2026-02-01"
      readTime="8 min read"
      description="A detailed comparison of JNTUH regulations from R13 to R25."
    >
      <p>
        JNTUH updates its academic regulations every few years.
        Each batch of students is governed by a specific regulation — and it affects your <strong>grading, credits, and curriculum</strong>.
      </p>
      <p>
        Here&apos;s a clear breakdown of every regulation from R13 to R25.
      </p>

      <h2>What is a Regulation?</h2>

      <p>
        A regulation is the set of academic rules under which you were admitted.
        It determines your <strong>grading system, credit requirements, syllabus, and exam patterns</strong>.
      </p>

      <div className="not-prose my-6 p-4 bg-secondary dark:bg-secondary rounded-xl border border-border">
        <div className="text-sm text-blue-800 dark:text-blue-300">
          <strong>Quick tip:</strong> Your regulation is based on your <strong>year of admission</strong>, not the year you appear for exams.
        </div>
      </div>

      <h2>Regulation Timeline</h2>

      <div className="not-prose my-6 space-y-4">
        {[
          {
            reg: "R13",
            years: "2013 - 2016 Admissions",
            points: [
              "Choice Based Credit System (CBCS) introduced",
              "10-point grading scale adopted",
              "Minimum CGPA of 5.0 for degree",
              "25% internal + 75% external assessment",
            ],
          },
          {
            reg: "R15",
            years: "2015 - 2017 Admissions",
            points: [
              "Minor curriculum updates from R13",
              "Updated lab and workshop patterns",
              "Same 10-point grading scale",
              "Backlog rules slightly modified",
            ],
          },
          {
            reg: "R16",
            years: "2016 - 2018 Admissions",
            points: [
              "Significant syllabus restructuring",
              "Open elective courses introduced",
              "Minimum 160 credits for B.Tech",
              "Same 10-point grading maintained",
            ],
          },
          {
            reg: "R18",
            years: "2018 - 2022 Admissions",
            points: [
              "Outcome-Based Education (OBE) framework",
              "Programme Outcomes (POs) and Course Outcomes (COs) defined",
              "Continuous evaluation pattern",
              "Minor projects and internships mandatory",
            ],
          },
          {
            reg: "R22",
            years: "2022 - 2024 Admissions",
            points: [
              "Major overhaul aligned with NEP 2020",
              "Multiple exit options (Certificate, Diploma, Degree)",
              "Academic Bank of Credit (ABC) integration",
              "Updated grading and evaluation methodology",
            ],
          },
          {
            reg: "R25",
            years: "2025 onwards",
            points: [
              "Latest regulation for current admissions",
              "Enhanced practical and project-based learning",
              "Updated industry-relevant electives",
              "Flexible multidisciplinary credit system",
            ],
          },
        ].map((item) => (
          <div key={item.reg} className="p-5 bg-secondary dark:bg-secondary rounded-2xl border border-border">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-primary text-white text-sm font-black rounded-lg">{item.reg}</span>
              <span className="text-xs text-muted-foreground">{item.years}</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              {item.points.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2>How to Find Your Regulation</h2>

      <div className="not-prose my-6 space-y-3">
        {[
          { method: "Year of Admission", desc: "Your regulation matches when you joined the program." },
          { method: "Hall Ticket Number", desc: "The first two digits often indicate your admission year." },
          { method: "Check Your Results", desc: "Our platform auto-detects and displays your regulation." },
        ].map((item, i) => (
          <div key={i} className="flex gap-4 p-4 bg-secondary dark:bg-secondary rounded-xl border border-border">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
              {i + 1}
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">{item.method}</div>
              <div className="text-sm text-muted-foreground mt-0.5">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <h2>Check Your Results by Regulation</h2>

      <div className="not-prose my-6 grid sm:grid-cols-3 gap-3">
        <Link href="/semester" className="group p-4 bg-secondary dark:bg-secondary rounded-xl border border-border hover:border-primary/30 transition-colors text-center">
          <div className="text-sm font-bold text-primary group-hover:text-primary">Semester Results</div>
          <p className="text-xs text-muted-foreground mt-1">SGPA for any semester</p>
        </Link>
        <Link href="/academic" className="group p-4 bg-secondary dark:bg-secondary rounded-xl border border-indigo-100 dark:border-indigo-800 hover:border-indigo-300 transition-colors text-center">
          <div className="text-sm font-bold text-primary group-hover:text-indigo-700">Academic Results</div>
          <p className="text-xs text-muted-foreground mt-1">Complete CGPA and history</p>
        </Link>
        <Link href="/allresult" className="group p-4 bg-secondary dark:bg-secondary rounded-xl border border-purple-100 dark:border-purple-800 hover:border-purple-300 transition-colors text-center">
          <div className="text-sm font-bold text-primary group-hover:text-purple-700">All Results</div>
          <p className="text-xs text-muted-foreground mt-1">Complete exam history</p>
        </Link>
      </div>

      <h2>Frequently Asked Questions</h2>

      <div className="not-prose my-6 space-y-3">
        <div className="p-4 bg-secondary dark:bg-secondary rounded-xl border border-border">
          <div className="text-sm font-bold text-foreground mb-1">Does my regulation affect my result?</div>
          <p className="text-sm text-muted-foreground">
            Yes. Different regulations have different grading patterns, credit requirements, and pass criteria.
            The result checking process stays the same.
          </p>
        </div>
        <div className="p-4 bg-secondary dark:bg-secondary rounded-xl border border-border">
          <div className="text-sm font-bold text-foreground mb-1">Can I switch regulations?</div>
          <p className="text-sm text-muted-foreground">
            No. You are evaluated under the regulation you were admitted under. There is no option to switch.
          </p>
        </div>
        <div className="p-4 bg-secondary dark:bg-secondary rounded-xl border border-border">
          <div className="text-sm font-bold text-foreground mb-1">Which regulation is currently active?</div>
          <p className="text-sm text-muted-foreground">
            As of 2026, <strong>R22 and R25</strong> are active for current students.
            R18 and earlier apply to students admitted before 2022.
          </p>
        </div>
      </div>
    </BlogPostLayout>
  );
}

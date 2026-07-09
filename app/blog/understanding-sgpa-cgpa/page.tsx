import BlogPostLayout from "@/components/blog-post-layout";
import Link from "next/link";

export const metadata = {
  title: "Understanding SGPA and CGPA in JNTUH: Complete Guide",
  description:
    "Learn how SGPA and CGPA are calculated at JNTUH. Understand the grading system, credit system, and how your grades affect your academic record.",
  alternates: { canonical: "https://jntuhresultbp.vercel.app/blog/understanding-sgpa-cgpa" },
};

export default function BlogPost() {
  return (
    <BlogPostLayout
      slug="understanding-sgpa-cgpa"
      title="Understanding SGPA and CGPA in JNTUH: Complete Guide"
      date="2026-01-20"
      readTime="7 min read"
      description="Learn how SGPA and CGPA are calculated at JNTUH. Understand the grading system, credit system, and how your grades affect your academic record."
    >
      <p>
        Your SGPA and CGPA are the numbers that define your academic standing at JNTUH.
        They affect placements, higher education admissions, and scholarship eligibility.
      </p>
      <p>
        Here&apos;s everything you need to know — <strong>explained simply</strong>.
      </p>

      <h2>What is SGPA?</h2>

      <p>
        <strong>SGPA (Semester Grade Point Average)</strong> measures your performance in a single semester.
        It&apos;s the weighted average of all your grade points that semester.
      </p>

      <div className="not-prose my-6 p-5 bg-secondary dark:bg-secondary rounded-xl border border-border">
        <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Formula</div>
        <div className="text-lg font-mono font-bold text-foreground">
          SGPA = (Credit1 × GP1 + Credit2 × GP2 + ...) / (Total Credits)
        </div>
      </div>

      <h3>Example Calculation</h3>

      <p>
        Say you have 5 subjects with these credits and grade points:
      </p>

      <div className="not-prose my-6 overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
          <thead className="bg-secondary dark:bg-secondary">
            <tr>
              <th className="px-4 py-2.5 text-left font-bold text-foreground">Subject</th>
              <th className="px-4 py-2.5 text-center font-bold text-foreground">Credits</th>
              <th className="px-4 py-2.5 text-center font-bold text-foreground">Grade Point</th>
              <th className="px-4 py-2.5 text-center font-bold text-foreground">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr><td className="px-4 py-2.5 text-muted-foreground">Mathematics</td><td className="px-4 py-2.5 text-center text-muted-foreground">4</td><td className="px-4 py-2.5 text-center text-muted-foreground">8</td><td className="px-4 py-2.5 text-center font-bold text-foreground">32</td></tr>
            <tr><td className="px-4 py-2.5 text-muted-foreground">Data Structures</td><td className="px-4 py-2.5 text-center text-muted-foreground">3</td><td className="px-4 py-2.5 text-center text-muted-foreground">7</td><td className="px-4 py-2.5 text-center font-bold text-foreground">21</td></tr>
            <tr><td className="px-4 py-2.5 text-muted-foreground">Digital Logic</td><td className="px-4 py-2.5 text-center text-muted-foreground">3</td><td className="px-4 py-2.5 text-center text-muted-foreground">9</td><td className="px-4 py-2.5 text-center font-bold text-foreground">27</td></tr>
            <tr><td className="px-4 py-2.5 text-muted-foreground">Physics</td><td className="px-4 py-2.5 text-center text-muted-foreground">4</td><td className="px-4 py-2.5 text-center text-muted-foreground">8</td><td className="px-4 py-2.5 text-center font-bold text-foreground">32</td></tr>
            <tr><td className="px-4 py-2.5 text-muted-foreground">English</td><td className="px-4 py-2.5 text-center text-muted-foreground">3</td><td className="px-4 py-2.5 text-center text-muted-foreground">7</td><td className="px-4 py-2.5 text-center font-bold text-foreground">21</td></tr>
          </tbody>
        </table>
      </div>

      <div className="not-prose my-4 p-4 bg-secondary dark:bg-secondary rounded-xl border border-green-100 dark:border-green-800">
        <div className="text-sm text-green-800 dark:text-green-300">
          <strong>SGPA = 133 / 17 = 7.82</strong>
        </div>
      </div>

      <h2>What is CGPA?</h2>

      <p>
        <strong>CGPA (Cumulative Grade Point Average)</strong> is your overall average across all semesters.
        It represents your entire academic performance — not just one semester.
      </p>

      <div className="not-prose my-6 p-5 bg-secondary dark:bg-secondary rounded-xl border border-indigo-100 dark:border-indigo-800">
        <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Formula</div>
        <div className="text-lg font-mono font-bold text-foreground">
          CGPA = Total (Credits × Grade Points) across all semesters / Total Credits
        </div>
      </div>

      <h2>JNTUH Grading System</h2>

      <p>
        JNTUH uses a <strong>10-point grading scale</strong>. Here&apos;s what each grade means:
      </p>

      <div className="not-prose my-6 overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
          <thead className="bg-secondary dark:bg-secondary">
            <tr>
              <th className="px-4 py-2.5 text-left font-bold text-foreground">Grade</th>
              <th className="px-4 py-2.5 text-center font-bold text-foreground">Points</th>
              <th className="px-4 py-2.5 text-left font-bold text-foreground">Marks</th>
              <th className="px-4 py-2.5 text-left font-bold text-foreground">Meaning</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr><td className="px-4 py-2.5 font-bold text-foreground">O</td><td className="px-4 py-2.5 text-center font-bold text-primary">10</td><td className="px-4 py-2.5 text-muted-foreground">90-100</td><td className="px-4 py-2.5 text-muted-foreground">Outstanding</td></tr>
            <tr><td className="px-4 py-2.5 font-bold text-foreground">A+</td><td className="px-4 py-2.5 text-center font-bold text-primary">9</td><td className="px-4 py-2.5 text-muted-foreground">80-89</td><td className="px-4 py-2.5 text-muted-foreground">Excellent</td></tr>
            <tr><td className="px-4 py-2.5 font-bold text-foreground">A</td><td className="px-4 py-2.5 text-center font-bold text-primary">8</td><td className="px-4 py-2.5 text-muted-foreground">70-79</td><td className="px-4 py-2.5 text-muted-foreground">Very Good</td></tr>
            <tr><td className="px-4 py-2.5 font-bold text-foreground">B+</td><td className="px-4 py-2.5 text-center font-bold text-primary">7</td><td className="px-4 py-2.5 text-muted-foreground">60-69</td><td className="px-4 py-2.5 text-muted-foreground">Good</td></tr>
            <tr><td className="px-4 py-2.5 font-bold text-foreground">B</td><td className="px-4 py-2.5 text-center font-bold text-amber-600">6</td><td className="px-4 py-2.5 text-muted-foreground">50-59</td><td className="px-4 py-2.5 text-muted-foreground">Above Average</td></tr>
            <tr><td className="px-4 py-2.5 font-bold text-foreground">C</td><td className="px-4 py-2.5 text-center font-bold text-amber-600">5</td><td className="px-4 py-2.5 text-muted-foreground">40-49</td><td className="px-4 py-2.5 text-muted-foreground">Average</td></tr>
            <tr><td className="px-4 py-2.5 font-bold text-foreground">F</td><td className="px-4 py-2.5 text-center font-bold text-red-600">0</td><td className="px-4 py-2.5 text-muted-foreground">Below 40</td><td className="px-4 py-2.5 text-muted-foreground">Fail</td></tr>
          </tbody>
        </table>
      </div>

      <h2>What is a Good CGPA?</h2>

      <div className="not-prose my-6 space-y-2">
        {[
          { range: "8.0+", label: "Excellent", desc: "Eligible for top company placements and higher education.", color: "green" },
          { range: "7.0 - 7.9", label: "Good", desc: "Meets requirements for many companies and postgraduate programs.", color: "blue" },
          { range: "6.0 - 6.9", label: "Average", desc: "Qualifies for many companies but may have limited options.", color: "amber" },
          { range: "Below 6.0", label: "Needs Work", desc: "Focus on clearing backlogs and improving in remaining semesters.", color: "red" },
        ].map((item) => (
          <div key={item.range} className={`flex items-center gap-4 p-4 rounded-xl border ${
            item.color === "green" ? "bg-secondary dark:bg-secondary border-green-100 dark:border-green-800" :
            item.color === "blue" ? "bg-secondary dark:bg-secondary border-border" :
            item.color === "amber" ? "bg-secondary dark:bg-secondary border-amber-100 dark:border-amber-800" :
            "bg-secondary dark:bg-secondary border-red-100 dark:border-red-800"
          }`}>
            <div className={`text-lg font-black ${
              item.color === "green" ? "text-primary" :
              item.color === "blue" ? "text-primary" :
              item.color === "amber" ? "text-amber-600" : "text-red-600"
            }`}>{item.range}</div>
            <div>
              <div className="text-sm font-bold text-foreground">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <h2>Calculate Your SGPA & CGPA</h2>

      <p>
        Instead of doing the math yourself, use our instant calculators:
      </p>

      <div className="not-prose my-6 grid sm:grid-cols-2 gap-3">
        <Link href="/sgpa-calculator" className="group p-5 bg-secondary dark:bg-secondary rounded-xl border border-border hover:border-primary/30 transition-colors">
          <div className="text-sm font-bold text-primary mb-1">SGPA Calculator</div>
          <p className="text-xs text-muted-foreground">Enter your subjects and credits — get your semester GPA instantly.</p>
        </Link>
        <Link href="/cgpa-calculator" className="group p-5 bg-secondary dark:bg-secondary rounded-xl border border-indigo-100 dark:border-indigo-800 hover:border-indigo-300 transition-colors">
          <div className="text-sm font-bold text-primary mb-1">CGPA Calculator</div>
          <p className="text-xs text-muted-foreground">Add all semesters — get your cumulative GPA in seconds.</p>
        </Link>
      </div>
    </BlogPostLayout>
  );
}

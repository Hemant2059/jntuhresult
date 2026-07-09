import BlogPostLayout from "@/components/blog-post-layout";
import Link from "next/link";

export const metadata = {
  title: "10 Tips to Improve Your JNTUH Exam Results",
  description:
    "Practical study tips and strategies for JNTUH B.Tech and B.Pharmacy students to improve their grades and academic performance.",
  alternates: { canonical: "https://jntuhresultbp.vercel.app/blog/tips-to-improve-jntuh-results" },
};

export default function BlogPost() {
  return (
    <BlogPostLayout
      slug="tips-to-improve-jntuh-results"
      title="10 Tips to Improve Your JNTUH Exam Results"
      date="2026-03-01"
      readTime="6 min read"
      description="Practical study tips and strategies for JNTUH students to improve their grades."
    >
      <p>
        Struggling with your JNTUH results? You&apos;re not alone.
        Here are <strong>10 practical tips</strong> that can help you improve your grades — starting today.
      </p>

      <h2>1. Understand the Exam Pattern</h2>
      <p>Before you start studying, know how JNTUH exams are structured:</p>
      <div className="not-prose my-4 grid sm:grid-cols-3 gap-3">
        <div className="p-4 bg-secondary dark:bg-secondary rounded-xl border border-border text-center">
          <div className="text-2xl font-black text-primary">10-12</div>
          <div className="text-xs text-muted-foreground mt-1">Marks per long answer</div>
          <div className="text-xs text-gray-500 dark:text-gray-500">2-3 questions</div>
        </div>
        <div className="p-4 bg-secondary dark:bg-secondary rounded-xl border border-indigo-100 dark:border-indigo-800 text-center">
          <div className="text-2xl font-black text-primary">5</div>
          <div className="text-xs text-muted-foreground mt-1">Marks per short answer</div>
          <div className="text-xs text-gray-500 dark:text-gray-500">5-6 questions</div>
        </div>
        <div className="p-4 bg-secondary dark:bg-secondary rounded-xl border border-purple-100 dark:border-purple-800 text-center">
          <div className="text-2xl font-black text-primary">2</div>
          <div className="text-xs text-muted-foreground mt-1">Marks per very short</div>
          <div className="text-xs text-gray-500 dark:text-gray-500">5-6 questions</div>
        </div>
      </div>
      <p>Long answers carry the most weight — <strong>prioritize them</strong>.</p>

      <h2>2. Solve Previous Year Papers</h2>
      <div className="not-prose my-4 p-5 bg-secondary dark:bg-secondary rounded-xl border border-green-100 dark:border-green-800">
        <div className="text-sm font-bold text-green-700 dark:text-green-400 mb-2">Why this works:</div>
        <ul className="text-sm text-green-800 dark:text-green-300 space-y-1.5">
          <li>• JNTUH often <strong>repeats question patterns</strong> across semesters</li>
          <li>• You learn which topics are <strong>frequently asked</strong></li>
          <li>• You practice <strong>time management</strong> for the actual exam</li>
          <li>• You identify <strong>important formulas and concepts</strong></li>
        </ul>
      </div>
      <p>Solve at least <strong>5 years of previous papers</strong> for each subject.</p>

      <h2>3. Create a Study Schedule</h2>
      <p>Don&apos;t cram everything the night before. Build a schedule that:</p>
      <div className="not-prose my-4 space-y-2">
        {[
          "Covers all subjects at least 2 weeks before exams",
          "Allocates more time to difficult subjects",
          "Includes regular breaks to avoid burnout",
          "Has specific daily goals — like \"Complete Chapter 5 of Data Structures\"",
        ].map((item, i) => (
          <div key={i} className="flex gap-3 p-3 bg-secondary dark:bg-secondary rounded-lg border border-border">
            <span className="text-primary font-bold mt-0.5">✓</span>
            <span className="text-sm text-muted-foreground">{item}</span>
          </div>
        ))}
      </div>

      <h2>4. Focus on Internal Assessment</h2>
      <p>Internal assessment carries <strong>25% weightage</strong>. That&apos;s a quarter of your marks — don&apos;t ignore it.</p>
      <div className="not-prose my-4 p-4 bg-secondary dark:bg-secondary rounded-xl border border-amber-100 dark:border-amber-800">
        <ul className="text-sm text-amber-800 dark:text-amber-300 space-y-1.5">
          <li>• Attend all classes and maintain good attendance</li>
          <li>• Submit all assignments on time</li>
          <li>• Perform well in internal tests and lab exams</li>
          <li>• Participate in class activities</li>
        </ul>
      </div>

      <h2>5. Don&apos;t Skip Lab Sessions</h2>
      <p>Lab exams carry significant marks and are <strong>relatively easier to score</strong> than theory exams.</p>
      <div className="not-prose my-4 space-y-2">
        {[
          "Complete all lab experiments before the exam",
          "Understand the procedure — not just the output",
          "Maintain a proper lab record",
        ].map((item, i) => (
          <div key={i} className="flex gap-3 p-3 bg-secondary dark:bg-secondary rounded-lg border border-border">
            <span className="text-primary font-bold mt-0.5">→</span>
            <span className="text-sm text-muted-foreground">{item}</span>
          </div>
        ))}
      </div>

      <h2>6. Use Standard Textbooks</h2>
      <p>
        Stick to the <strong>JNTUH-prescribed textbooks</strong> for your regulation.
        They cover exactly what&apos;s needed for exams and are often the source of direct questions.
      </p>

      <h2>7. Form Study Groups</h2>
      <p>Studying with peers can be very effective. A small study group helps you:</p>
      <div className="not-prose my-4 grid sm:grid-cols-2 gap-3">
        {[
          "Discuss difficult concepts",
          "Quiz each other on important topics",
          "Share notes and resources",
          "Motivate each other to stay on track",
        ].map((item, i) => (
          <div key={i} className="flex gap-3 p-3 bg-secondary dark:bg-secondary rounded-lg border border-border">
            <span className="text-primary font-bold mt-0.5">•</span>
            <span className="text-sm text-muted-foreground">{item}</span>
          </div>
        ))}
      </div>

      <h2>8. Take Care of Your Health</h2>
      <p>Your health directly affects your performance.</p>
      <div className="not-prose my-4 p-4 bg-secondary dark:bg-secondary rounded-xl border border-green-100 dark:border-green-800">
        <div className="grid sm:grid-cols-2 gap-3 text-sm text-green-800 dark:text-green-300">
          <div>• Get <strong>7-8 hours of sleep</strong></div>
          <div>• Eat nutritious food and <strong>stay hydrated</strong></div>
          <div>• <strong>Exercise regularly</strong> to reduce stress</div>
          <div>• Take <strong>breaks between study sessions</strong></div>
        </div>
      </div>

      <h2>9. Use Online Resources</h2>
      <div className="not-prose my-4 space-y-3">
        {[
          { platform: "YouTube", desc: "NPTEL lectures, tutorial channels for your specific subjects" },
          { platform: "Websites", desc: "GeeksforGeeks, Tutorialspoint, Sanfoundry for programming subjects" },
          { platform: "Apps", desc: "Educational apps for quick revision and practice" },
        ].map((item, i) => (
          <div key={i} className="flex gap-4 p-3 bg-secondary dark:bg-secondary rounded-lg border border-border">
            <div className="text-sm font-bold text-primary shrink-0 w-20">{item.platform}</div>
            <div className="text-sm text-muted-foreground">{item.desc}</div>
          </div>
        ))}
      </div>

      <h2>10. Track Your Progress</h2>
      <p>Regularly check your results to understand where you stand.</p>
      <div className="not-prose my-6 grid sm:grid-cols-3 gap-3">
        <Link href="/semester" className="group p-4 bg-secondary dark:bg-secondary rounded-xl border border-border hover:border-primary/30 transition-colors text-center">
          <div className="text-sm font-bold text-primary group-hover:text-primary">Semester Results</div>
          <p className="text-xs text-muted-foreground mt-1">Check SGPA after each semester</p>
        </Link>
        <Link href="/academic" className="group p-4 bg-secondary dark:bg-secondary rounded-xl border border-indigo-100 dark:border-indigo-800 hover:border-indigo-300 transition-colors text-center">
          <div className="text-sm font-bold text-primary group-hover:text-indigo-700">Academic Results</div>
          <p className="text-xs text-muted-foreground mt-1">Track overall CGPA progress</p>
        </Link>
        <Link href="/classresult" className="group p-4 bg-secondary dark:bg-secondary rounded-xl border border-purple-100 dark:border-purple-800 hover:border-purple-300 transition-colors text-center">
          <div className="text-sm font-bold text-primary group-hover:text-purple-700">Class Analysis</div>
          <p className="text-xs text-muted-foreground mt-1">Compare with classmates</p>
        </Link>
      </div>
    </BlogPostLayout>
  );
}

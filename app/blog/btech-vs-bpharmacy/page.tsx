import BlogPostLayout from "@/components/blog-post-layout";
import Link from "next/link";

export const metadata = {
  title: "JNTUH B.Tech vs B.Pharmacy: Which Course to Choose?",
  description:
    "Detailed comparison of JNTUH B.Tech and B.Pharmacy programs including syllabus, career options, salary, and which course is better for you.",
  alternates: { canonical: "https://jntuhresultbp.vercel.app/blog/btech-vs-bpharmacy" },
};

export default function BlogPost() {
  return (
    <BlogPostLayout
      slug="btech-vs-bpharmacy"
      title="JNTUH B.Tech vs B.Pharmacy: Which Course to Choose?"
      date="2026-03-10"
      readTime="7 min read"
      description="Detailed comparison of JNTUH B.Tech and B.Pharmacy programs."
    >
      <p>
        Choosing between B.Tech and B.Pharmacy at JNTUH is one of the most important decisions after intermediate.
        Both offer excellent careers — but they differ significantly in <strong>curriculum, paths, and industry demand</strong>.
      </p>

      <h2>Program Overview</h2>

      <div className="not-prose my-6 grid sm:grid-cols-2 gap-4">
        <div className="p-5 bg-secondary dark:bg-secondary rounded-xl border border-border">
          <div className="text-sm font-bold text-primary uppercase tracking-wider mb-2">B.Tech</div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            4-year engineering program in specializations like <strong>CSE, ECE, ME, CE, EE, IT</strong>.
            Focuses on engineering principles, technical skills, and problem-solving.
          </p>
        </div>
        <div className="p-5 bg-secondary dark:bg-secondary rounded-xl border border-indigo-100 dark:border-indigo-800">
          <div className="text-sm font-bold text-primary uppercase tracking-wider mb-2">B.Pharmacy</div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            4-year program in <strong>pharmaceutical sciences, drug development, pharmacology, and healthcare</strong>.
            Aligned with PCI (Pharmacy Council of India) guidelines.
          </p>
        </div>
      </div>

      <h2>Curriculum Comparison</h2>

      <div className="not-prose my-6 overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
          <thead className="bg-secondary dark:bg-secondary">
            <tr>
              <th className="px-4 py-2.5 text-left font-bold text-foreground">Aspect</th>
              <th className="px-4 py-2.5 text-left font-bold text-foreground">B.Tech</th>
              <th className="px-4 py-2.5 text-left font-bold text-foreground">B.Pharmacy</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr><td className="px-4 py-2.5 font-medium text-foreground">Duration</td><td className="px-4 py-2.5 text-muted-foreground">4 Years (8 Semesters)</td><td className="px-4 py-2.5 text-muted-foreground">4 Years (8 Semesters)</td></tr>
            <tr><td className="px-4 py-2.5 font-medium text-foreground">Focus</td><td className="px-4 py-2.5 text-muted-foreground">Engineering & Technology</td><td className="px-4 py-2.5 text-muted-foreground">Pharmaceutical Sciences</td></tr>
            <tr><td className="px-4 py-2.5 font-medium text-foreground">Core Subjects</td><td className="px-4 py-2.5 text-muted-foreground">Programming, Circuits, Math</td><td className="px-4 py-2.5 text-muted-foreground">Pharmacology, Chemistry</td></tr>
            <tr><td className="px-4 py-2.5 font-medium text-foreground">Credits</td><td className="px-4 py-2.5 text-muted-foreground">~160-170</td><td className="px-4 py-2.5 text-muted-foreground">~160-170</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Career Paths</h2>

      <div className="not-prose my-6 grid sm:grid-cols-2 gap-4">
        <div className="p-5 bg-secondary dark:bg-secondary rounded-xl border border-border">
          <div className="text-sm font-bold text-primary mb-3">B.Tech Careers</div>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex gap-2"><span className="text-primary">•</span> Software Engineer — Google, Microsoft, Amazon, TCS</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Data Scientist — ML models, analytics</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Web Developer — frontend, backend, full-stack</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Embedded Systems — hardware-software integration</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Govt Jobs — GATE, PSU, Indian Engineering Services</li>
          </ul>
        </div>
        <div className="p-5 bg-secondary dark:bg-secondary rounded-xl border border-indigo-100 dark:border-indigo-800">
          <div className="text-sm font-bold text-primary mb-3">B.Pharmacy Careers</div>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex gap-2"><span className="text-primary">•</span> Pharmacist — hospitals, community pharmacies</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Pharma Industry — Dr. Reddy&apos;s, Cipla, Sun Pharma</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Drug Inspector — government compliance role</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Medical Representative — product promotion</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Higher Studies — M.Pharm, MBA Pharma</li>
          </ul>
        </div>
      </div>

      <h2>Salary Comparison</h2>

      <div className="not-prose my-6 overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
          <thead className="bg-secondary dark:bg-secondary">
            <tr>
              <th className="px-4 py-2.5 text-left font-bold text-foreground">Experience</th>
              <th className="px-4 py-2.5 text-center font-bold text-foreground">B.Tech</th>
              <th className="px-4 py-2.5 text-center font-bold text-foreground">B.Pharmacy</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr><td className="px-4 py-2.5 font-medium text-foreground">Fresher</td><td className="px-4 py-2.5 text-center font-bold text-primary">₹3-8 LPA</td><td className="px-4 py-2.5 text-center font-bold text-primary">₹2-4 LPA</td></tr>
            <tr><td className="px-4 py-2.5 font-medium text-foreground">3-5 Years</td><td className="px-4 py-2.5 text-center font-bold text-primary">₹8-15 LPA</td><td className="px-4 py-2.5 text-center font-bold text-primary">₹4-8 LPA</td></tr>
            <tr><td className="px-4 py-2.5 font-medium text-foreground">10+ Years</td><td className="px-4 py-2.5 text-center font-bold text-primary">₹20-40+ LPA</td><td className="px-4 py-2.5 text-center font-bold text-primary">₹10-20+ LPA</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground">*LPA = Lakhs Per Annum. Salaries vary by company, role, skills, and location.</p>

      <h2>Which Should You Choose?</h2>

      <div className="not-prose my-6 grid sm:grid-cols-2 gap-4">
        <div className="p-5 bg-secondary dark:bg-secondary rounded-xl border border-border">
          <div className="text-sm font-bold text-blue-700 dark:text-blue-400 mb-2">Choose B.Tech if you...</div>
          <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1.5">
            <li>• Enjoy technology and programming</li>
            <li>• Want diverse career options in IT and startups</li>
            <li>• Want the highest starting salary</li>
            <li>• Like problem-solving and building things</li>
          </ul>
        </div>
        <div className="p-5 bg-secondary dark:bg-secondary rounded-xl border border-indigo-100 dark:border-indigo-800">
          <div className="text-sm font-bold text-indigo-700 dark:text-indigo-400 mb-2">Choose B.Pharmacy if you...</div>
          <ul className="text-sm text-indigo-800 dark:text-indigo-300 space-y-1.5">
            <li>• Are interested in healthcare and medicine</li>
            <li>• Want a career in the pharmaceutical industry</li>
            <li>• Prefer stable government job opportunities</li>
            <li>• Enjoy chemistry and drug development</li>
          </ul>
        </div>
      </div>

      <h2>Check Your Results</h2>

      <div className="not-prose my-6 grid sm:grid-cols-3 gap-3">
        <Link href="/semester" className="group p-4 bg-secondary dark:bg-secondary rounded-xl border border-border hover:border-primary/30 transition-colors text-center">
          <div className="text-sm font-bold text-primary group-hover:text-primary">Semester Results</div>
          <p className="text-xs text-muted-foreground mt-1">Check SGPA</p>
        </Link>
        <Link href="/academic" className="group p-4 bg-secondary dark:bg-secondary rounded-xl border border-indigo-100 dark:border-indigo-800 hover:border-indigo-300 transition-colors text-center">
          <div className="text-sm font-bold text-primary group-hover:text-indigo-700">Academic Results</div>
          <p className="text-xs text-muted-foreground mt-1">View full CGPA</p>
        </Link>
        <Link href="/allresult" className="group p-4 bg-secondary dark:bg-secondary rounded-xl border border-purple-100 dark:border-purple-800 hover:border-purple-300 transition-colors text-center">
          <div className="text-sm font-bold text-primary group-hover:text-purple-700">All Results</div>
          <p className="text-xs text-muted-foreground mt-1">Complete history</p>
        </Link>
      </div>
    </BlogPostLayout>
  );
}

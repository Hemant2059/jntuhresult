import { Metadata } from "next";
import { GraduationCap, BookOpen, AlertCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "JNTUH Grading System & Grade Points Explained",
  description:
    "Complete guide to JNTUH grading system including 10-point scale, grade points, O/A+/A/B+/B/C/F grades, internal assessment, and how grades are calculated.",
  keywords: [
    "JNTUH Grading System", "JNTUH Grade Points", "JNTUH 10 Point Scale",
    "JNTUH O Grade", "JNTUH Passing Marks", "JNTUH Credit System",
  ],
  alternates: { canonical: "https://jntuhresultbp.vercel.app/grading-system" },
};

const gradeTable = [
  { grade: "O", point: "10", marks: "90 – 100", description: "Outstanding", color: "text-primary" },
  { grade: "A+", point: "9", marks: "80 – 89", description: "Excellent", color: "text-primary" },
  { grade: "A", point: "8", marks: "70 – 79", description: "Very Good", color: "text-primary" },
  { grade: "B+", point: "7", marks: "60 – 69", description: "Good", color: "text-primary" },
  { grade: "B", point: "6", marks: "50 – 59", description: "Above Average", color: "text-violet-600" },
  { grade: "C", point: "5", marks: "40 – 49", description: "Average", color: "text-amber-600" },
  { grade: "F", point: "0", marks: "Below 40", description: "Fail", color: "text-red-600" },
  { grade: "Ab", point: "0", marks: "—", description: "Absent", color: "text-gray-500" },
];

const bpharmGradeTable = [
  { grade: "O", point: "10", marks: "90 – 100", description: "Outstanding", color: "text-primary" },
  { grade: "A", point: "9", marks: "80 – 89", description: "Excellent", color: "text-primary" },
  { grade: "B", point: "8", marks: "70 – 79", description: "Very Good", color: "text-primary" },
  { grade: "C", point: "7", marks: "60 – 69", description: "Good", color: "text-primary" },
  { grade: "D", point: "6", marks: "50 – 59", description: "Average", color: "text-amber-600" },
  { grade: "F", point: "0", marks: "Below 50", description: "Fail", color: "text-red-600" },
  { grade: "Ab", point: "0", marks: "—", description: "Absent", color: "text-gray-500" },
];

export default function GradingSystemPage() {
  return (
    <main className="min-h-screen bg-background dark:bg-background">
      <div className="bg-card dark:bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-8 sm:py-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-primary">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">JNTUH Grading System</h1>
              <p className="text-muted-foreground text-sm mt-1">Complete guide to grade points, credits, and evaluation</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        {/* Introduction */}
        <section className="bg-card dark:bg-card rounded-3xl border border-border p-8 sm:p-12 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-4">Overview of JNTUH Grading System</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Jawaharlal Nehru Technological University Hyderabad (JNTUH) follows a <strong className="text-foreground">10-point grading system</strong> for 
              evaluating student performance in B.Tech, B.Pharmacy, M.Tech, MBA, and MCA programs. This system 
              was introduced to provide a standardized and objective method of assessing academic performance across 
              all affiliated colleges.
            </p>
            <p>
              Under this system, each subject is assigned a certain number of <strong className="text-foreground">credits</strong> based on 
              its importance and contact hours. Students earn grade points based on their marks in each subject, 
              and these grade points are used to calculate SGPA (Semester Grade Point Average) and CGPA 
              (Cumulative Grade Point Average).
            </p>
            <p>
              The grading system applies to all regulations from R13 onwards. However, <strong className="text-foreground">R22 and R25 B.Pharmacy 
              use a different grading scale</strong> (O/A/B/C/D) compared to all other programs (O/A+/A/B+/B/C).
            </p>
          </div>
        </section>

        {/* Grade Table */}
        <section className="bg-card dark:bg-card rounded-3xl border border-border p-8 sm:p-12 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-6">Grade Points & Marks Distribution</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-border rounded-xl overflow-hidden text-sm">
              <thead className="bg-secondary dark:bg-secondary">
                <tr>
                  <th className="px-5 py-3.5 text-left font-bold text-foreground">Grade</th>
                  <th className="px-5 py-3.5 text-left font-bold text-foreground">Grade Point</th>
                  <th className="px-5 py-3.5 text-left font-bold text-foreground">Marks Range</th>
                  <th className="px-5 py-3.5 text-left font-bold text-foreground">Classification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {gradeTable.map((row) => (
                  <tr key={row.grade} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className={`px-5 py-4 font-black text-lg ${row.color}`}>{row.grade}</td>
                    <td className="px-5 py-4 font-bold text-foreground">{row.point}</td>
                    <td className="px-5 py-4 text-muted-foreground">{row.marks}</td>
                    <td className="px-5 py-4 text-muted-foreground">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 p-4 bg-secondary dark:bg-secondary rounded-xl border border-amber-100 dark:border-amber-800 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Note:</strong> To pass a subject, students must score a minimum of <strong className="text-foreground">40 marks</strong> 
              (out of 100) which corresponds to grade point 5 (Grade C). Students scoring below 40 receive an F grade and must appear for supplementary exams.
            </p>
          </div>
        </section>

        {/* R22/R25 B.Pharmacy Grading */}
        <section className="bg-card dark:bg-card rounded-3xl border border-border p-8 sm:p-12 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-2">R22 & R25 B.Pharmacy Grading Scale</h2>
          <p className="text-muted-foreground mb-6">
            B.Pharmacy students under <strong className="text-foreground">R22 and R25 regulations</strong> use a simplified grading scale without + grades.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border border-border rounded-xl overflow-hidden text-sm">
              <thead className="bg-secondary dark:bg-secondary">
                <tr>
                  <th className="px-5 py-3.5 text-left font-bold text-foreground">Grade</th>
                  <th className="px-5 py-3.5 text-left font-bold text-foreground">Grade Point</th>
                  <th className="px-5 py-3.5 text-left font-bold text-foreground">Marks Range</th>
                  <th className="px-5 py-3.5 text-left font-bold text-foreground">Classification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {bpharmGradeTable.map((row) => (
                  <tr key={row.grade} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className={`px-5 py-4 font-black text-lg ${row.color}`}>{row.grade}</td>
                    <td className="px-5 py-4 font-bold text-foreground">{row.point}</td>
                    <td className="px-5 py-4 text-muted-foreground">{row.marks}</td>
                    <td className="px-5 py-4 text-muted-foreground">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 p-4 bg-secondary dark:bg-secondary rounded-xl border border-amber-100 dark:border-amber-800 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Note:</strong> For R22/R25 B.Pharmacy, the minimum passing grade is <strong className="text-foreground">D (grade point 6)</strong> 
              with a minimum of 50 marks. All other programs (B.Tech, M.Tech, MBA, MCA) and B.Pharmacy under earlier regulations (R13, R15, R18) use the standard scale above.
            </p>
          </div>
        </section>

        {/* Credit System */}
        <section className="bg-card dark:bg-card rounded-3xl border border-border p-8 sm:p-12 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-4">Understanding the Credit System</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Each subject in the JNTUH curriculum is assigned a specific number of <strong className="text-foreground">credits</strong>. 
              Credits represent the weightage of a subject in the overall grading. Subjects with more contact hours 
              or practical components typically carry more credits.
            </p>
            
            <h3 className="text-lg font-bold text-foreground pt-4">Typical Credit Distribution (B.Tech)</h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-border rounded-xl overflow-hidden text-sm">
                <thead className="bg-secondary dark:bg-secondary">
                  <tr>
                    <th className="px-5 py-3 text-left font-bold text-foreground">Subject Type</th>
                    <th className="px-5 py-3 text-left font-bold text-foreground">Typical Credits</th>
                    <th className="px-5 py-3 text-left font-bold text-foreground">Examples</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr><td className="px-5 py-3 text-muted-foreground">Theory Subjects</td><td className="px-5 py-3 text-muted-foreground">3 – 4 credits</td><td className="px-5 py-3 text-muted-foreground">Mathematics, Data Structures, OS</td></tr>
                  <tr><td className="px-5 py-3 text-muted-foreground">Lab / Practical</td><td className="px-5 py-3 text-muted-foreground">1.5 – 2 credits</td><td className="px-5 py-3 text-muted-foreground">Programming Lab, Chemistry Lab</td></tr>
                  <tr><td className="px-5 py-3 text-muted-foreground">Workshop / Drawing</td><td className="px-5 py-3 text-muted-foreground">1 – 2 credits</td><td className="px-5 py-3 text-muted-foreground">Engineering Drawing, Workshop</td></tr>
                  <tr><td className="px-5 py-3 text-muted-foreground">Open Elective</td><td className="px-5 py-3 text-muted-foreground">3 credits</td><td className="px-5 py-3 text-muted-foreground">Environmental Science, Management</td></tr>
                  <tr><td className="px-5 py-3 text-muted-foreground">Project / Seminar</td><td className="px-5 py-3 text-muted-foreground">6 – 10 credits</td><td className="px-5 py-3 text-muted-foreground">Final Year Project, Mini Project</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SGPA Calculation */}
        <section className="bg-card dark:bg-card rounded-3xl border border-border p-8 sm:p-12 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-4">How SGPA is Calculated</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              SGPA (Semester Grade Point Average) is calculated at the end of each semester using the following formula:
            </p>
            <div className="my-4 p-5 bg-secondary dark:bg-secondary rounded-xl border border-border">
              <p className="font-mono text-sm font-bold text-blue-700 dark:text-blue-300">
                SGPA = Σ (Credits × Grade Points) / Σ (Credits)
              </p>
            </div>
            
            <h3 className="text-lg font-bold text-foreground pt-2">Example Calculation</h3>
            <p>Suppose a student has the following grades in Semester 3-1:</p>
            <div className="overflow-x-auto">
              <table className="w-full border border-border rounded-xl overflow-hidden text-sm">
                <thead className="bg-secondary dark:bg-secondary">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold text-foreground">Subject</th>
                    <th className="px-4 py-3 text-center font-bold text-foreground">Credits</th>
                    <th className="px-4 py-3 text-center font-bold text-foreground">Grade</th>
                    <th className="px-4 py-3 text-center font-bold text-foreground">Grade Point</th>
                    <th className="px-4 py-3 text-center font-bold text-foreground">Credit × GP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr><td className="px-4 py-3 text-muted-foreground">Data Structures</td><td className="px-4 py-3 text-center text-muted-foreground">4</td><td className="px-4 py-3 text-center font-bold text-primary">A+</td><td className="px-4 py-3 text-center text-muted-foreground">9</td><td className="px-4 py-3 text-center font-bold text-foreground">36</td></tr>
                  <tr><td className="px-4 py-3 text-muted-foreground">Digital Electronics</td><td className="px-4 py-3 text-center text-muted-foreground">3</td><td className="px-4 py-3 text-center font-bold text-primary">A</td><td className="px-4 py-3 text-center text-muted-foreground">8</td><td className="px-4 py-3 text-center font-bold text-foreground">24</td></tr>
                  <tr><td className="px-4 py-3 text-muted-foreground">Mathematics III</td><td className="px-4 py-3 text-center text-muted-foreground">3</td><td className="px-4 py-3 text-center font-bold text-primary">B+</td><td className="px-4 py-3 text-center text-muted-foreground">7</td><td className="px-4 py-3 text-center font-bold text-foreground">21</td></tr>
                  <tr><td className="px-4 py-3 text-muted-foreground">DS Lab</td><td className="px-4 py-3 text-center text-muted-foreground">1.5</td><td className="px-4 py-3 text-center font-bold text-primary">O</td><td className="px-4 py-3 text-center text-muted-foreground">10</td><td className="px-4 py-3 text-center font-bold text-foreground">15</td></tr>
                  <tr><td className="px-4 py-3 text-muted-foreground">DE Lab</td><td className="px-4 py-3 text-center text-muted-foreground">1.5</td><td className="px-4 py-3 text-center font-bold text-primary">A+</td><td className="px-4 py-3 text-center text-muted-foreground">9</td><td className="px-4 py-3 text-center font-bold text-foreground">13.5</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-secondary dark:bg-secondary rounded-xl border border-green-100 dark:border-green-800">
              <p className="text-sm font-bold text-green-700 dark:text-green-300">
                SGPA = (36 + 24 + 21 + 15 + 13.5) / (4 + 3 + 3 + 1.5 + 1.5) = 109.5 / 13 = 8.42
              </p>
            </div>
          </div>
        </section>

        {/* CGPA Calculation */}
        <section className="bg-card dark:bg-card rounded-3xl border border-border p-8 sm:p-12 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-4">How CGPA is Calculated</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              CGPA (Cumulative Grade Point Average) is the overall average across all semesters. It is calculated using:
            </p>
            <div className="my-4 p-5 bg-secondary dark:bg-secondary rounded-xl border border-border">
              <p className="font-mono text-sm font-bold text-blue-700 dark:text-blue-300">
                CGPA = Σ (SGPA × Semester Credits) / Σ (Semester Credits)
              </p>
            </div>
            <p>
              Alternatively, you can calculate CGPA by taking the sum of (Credits × Grade Point) for all subjects 
              across all semesters, divided by the total credits earned.
            </p>
            <p>
              Use our <Link href="/academic" className="text-primary hover:underline font-medium">Academic Results</Link> tool 
              to instantly calculate your CGPA by entering your hall ticket number.
            </p>
          </div>
        </section>

        {/* Passing Criteria */}
        <section className="bg-card dark:bg-card rounded-3xl border border-border p-8 sm:p-12 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-4">Passing Criteria & Requirements</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                <span><strong className="text-foreground">Minimum Grade:</strong> Students must score at least Grade C (40 marks) in each subject to pass.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                <span><strong className="text-foreground">Minimum CGPA:</strong> A minimum CGPA of 5.0 is generally required for degree completion.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                <span><strong className="text-foreground">Internal Assessment:</strong> Typically 25% marks come from internal assessment (tests, assignments, attendance) and 75% from external examination.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                <span><strong className="text-foreground">Backlogs:</strong> Students who fail in any subject must clear it through supplementary exams before degree completion.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                <span><strong className="text-foreground">Grace Marks:</strong> JNTUH may award up to 2-4 grace marks in borderline cases to help students pass.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Check Results */}
        <section className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 sm:p-12 text-white">
          <div className="flex items-start gap-4">
            <BookOpen className="h-8 w-8 shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-3">Check Your Grades Now</h2>
              <p className="text-blue-100 leading-relaxed mb-6">
                Use our fast result checker to instantly view your SGPA, CGPA, and subject-wise grades. 
                Simply enter your hall ticket number to get started.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/semester" className="inline-flex items-center px-6 py-3 bg-card text-primary font-bold rounded-xl hover:bg-blue-50 transition-colors">
                  Check SGPA
                </Link>
                <Link href="/academic" className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400 transition-colors border border-blue-400">
                  Check CGPA
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

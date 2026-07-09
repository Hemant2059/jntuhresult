import { BookOpen, CheckCircle, Info, AlertTriangle } from "lucide-react";

interface InfoSectionProps {
  title: string;
  items: string[];
}

function InfoSection({ title, items }: InfoSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-bold text-foreground mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-muted-foreground text-sm leading-relaxed">
            <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface ResultInfoSectionProps {
  pageType: "semester" | "academic" | "allresult" | "classresult";
}

const content = {
  semester: {
    heading: "How to Check JNTUH Semester Results",
    description: "Follow these simple steps to view your semester-wise results and SGPA from the official JNTUH database.",
    steps: [
      "Select your semester (1-1, 1-2, 2-1, 2-2, 3-1, 3-2, 4-1, or 4-2) from the dropdown menu.",
      "Enter your 10-digit hall ticket number in the search field.",
      'Click the "Show Result" button to fetch your results instantly.',
      "Your subject-wise marks, grades, credits, and SGPA will be displayed in a detailed table.",
      "You can download or print your result for future reference.",
    ],
    faqs: [
      {
        q: "What is SGPA?",
        a: "SGPA (Semester Grade Point Average) is the average of grade points obtained in all subjects during a particular semester. It is calculated by dividing the sum of (credit x grade point) by the total credits.",
      },
      {
        q: "What if my result is not showing?",
        a: "Results may not be available if they haven't been officially released yet by JNTUH, or if there is temporary maintenance on the official portal. Try again after some time.",
      },
      {
        q: "Can I check results for any regulation?",
        a: "Yes, we support JNTUH results for R22, R25, R18, R16, R15, and R13 regulations for both B.Tech and B.Pharmacy programs.",
      },
    ],
  },
  academic: {
    heading: "JNTUH Academic Results & CGPA Overview",
    description: "Get a complete view of your academic journey at JNTUH including CGPA, total credits earned, and semester-wise performance history.",
    steps: [
      "Enter your 10-digit hall ticket number in the input field.",
      'Click "View Results" to fetch your complete academic record.',
      "View your overall CGPA, total credits, and subject-wise performance across all semesters.",
      "Track your academic progress from first year to final year.",
      "Download your complete academic report for records.",
    ],
    faqs: [
      {
        q: "What is CGPA?",
        a: "CGPA (Cumulative Grade Point Average) is the average of all SGPA values across semesters. It represents your overall academic performance throughout the entire course duration.",
      },
      {
        q: "How is CGPA calculated?",
        a: "CGPA = Sum of (SGPA x Semester Credits) / Total Credits. It takes into account all semesters and provides a weighted average based on credit hours.",
      },
      {
        q: "What are backlogs?",
        a: "Backlogs are subjects where you did not pass (grade below the minimum required). JNTUH allows students to appear for supplementary exams to clear backlogs.",
      },
    ],
  },
  allresult: {
    heading: "View All JNTUH Exam Results",
    description: "Access your complete examination history from first year to final year. This includes regular exams, supplementary exams, and revaluation results.",
    steps: [
      "Enter your 10-digit hall ticket number.",
      'Click "View Results" to load all your exam records.',
      "Browse through your complete result history organized by semester and exam type.",
      "View regular, supplementary (supply), and revaluation (RC/RV) results.",
      "Check individual subject grades, pass/fail status, and overall performance.",
    ],
    faqs: [
      {
        q: "What are supplementary results?",
        a: "Supplementary exams are conducted by JNTUH for students who failed in one or more subjects during regular exams. These give students another chance to clear their backlogs.",
      },
      {
        q: "What are RC/RV results?",
        a: "RC (Revaluation) and RV (Re-verification) results are published after rechecking answer sheets. If a student applies for revaluation and the marks change, the updated result is shown here.",
      },
      {
        q: "Can I see results for all semesters at once?",
        a: "Yes, this page shows your entire examination history from your first semester to the latest available results.",
      },
    ],
  },
  classresult: {
    heading: "JNTUH Class Result Analysis",
    description: "Analyze performance metrics for an entire class or a range of hall ticket numbers. Generate pass/fail statistics, topper lists, and subject-wise performance charts.",
    steps: [
      "Select the semester you want to analyze.",
      "Enter the starting and ending hall ticket numbers for the class range.",
      'Click "Analyze Class" to generate the report.',
      "View toppers, class rankings, subject pass/fail percentages, and performance distribution charts.",
      "Use the insights to understand class-level academic performance.",
    ],
    faqs: [
      {
        q: "What data does class analysis show?",
        a: "Class analysis displays toppers list, pass/fail ratio for each subject, grade distribution, average SGPA, and performance charts to help visualize batch performance.",
      },
      {
        q: "How many students can I analyze at once?",
        a: "You can analyze an entire class section by entering the range of hall ticket numbers. The tool fetches data for all students within that range.",
      },
      {
        q: "Is this data accurate?",
        a: "All data is fetched directly from the official JNTUH results API. However, always cross-verify with the official university portal for official purposes.",
      },
    ],
  },
};

export default function ResultInfoSection({ pageType }: ResultInfoSectionProps) {
  const data = content[pageType];

  return (
    <section className="max-w-4xl mx-auto mt-16 mb-12 px-4 sm:px-6">
      <div className="bg-card dark:bg-card rounded-3xl border border-border p-8 sm:p-12 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">{data.heading}</h2>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-8">
          {data.description}
        </p>

        <div className="space-y-10">
          <InfoSection title="Step-by-Step Guide" items={data.steps} />

          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {data.faqs.map((faq, i) => (
                <div key={i} className="bg-secondary dark:bg-secondary rounded-2xl p-5 border border-border">
                  <h4 className="font-bold text-foreground text-sm mb-2">{faq.q}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-secondary dark:bg-secondary rounded-2xl p-5 border border-amber-100 dark:border-amber-800 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-foreground text-sm mb-1">Disclaimer</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                This tool fetches results directly from the official JNTUH API. Always verify your results with the
                official university portal at{" "}
                <a href="http://results.jntuh.ac.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                  results.jntuh.ac.in
                </a>{" "}
                before making any academic decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import ClassResultForm from "@/components/classresult-form";
import ResultInfoSection from "@/components/result-info-section";

export const metadata = {
  title: "Class Analysis & Batch Performance",
  description:
    "Analyze JNTUH results for an entire class or hall ticket range. Generate pass/fail charts and subject-wise performance analysis instantly.",
  keywords: [
    "JNTUH Class Results", "JNTUH Batch Analysis", "College Result Analysis",
    "Subject-wise Pass Percentage", "JNTUH Statistics",
  ],
  alternates: { canonical: "https://jntuhresultbp.vercel.app/classresult" },
};

export default function ClassResultPage() {
  return (
    <main className="min-h-screen bg-background dark:bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <ClassResultForm />
      </div>
      <ResultInfoSection pageType="classresult" />
    </main>
  );
}

import AllResultsForm from "@/components/allresult-form";
import ResultInfoSection from "@/components/result-info-section";

export const metadata = {
  title: "Complete Examination History",
  description:
    "View all your JNTUH exam results from first year to final year in a single timeline. Complete academic scorecard with regular and supplementary results.",
  keywords: [
    "JNTUH All Exam Results", "JNTUH Result History", "JNTUH Student Record",
    "JNTUH Academic Scorecard", "JNTU Result Lookup",
  ],
  alternates: { canonical: "https://jntuhresultbp.vercel.app/allresult" },
};

export default function AllResultPage() {
  return (
    <main className="min-h-screen bg-background dark:bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <AllResultsForm />
      </div>
      <ResultInfoSection pageType="allresult" />
    </main>
  );
}

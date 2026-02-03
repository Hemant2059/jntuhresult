import AllResultsForm from "@/components/allresult-form";

export const metadata = {
  title: "JNTUH Complete Examination History Search",
  description:
    "View all your JNTUH exam results from first year to final year in a single timeline. Complete academic scorecard with regular and supplementary results.",
  keywords: [
    "JNTUH All Exam Results",
    "JNTUH Result History",
    "JNTUH Student Record",
    "JNTUH Academic Scorecard",
    "JNTU Result Lookup",
  ],
  alternates: {
    canonical: "https://jntuhresultbp.vercel.app/allresult",
  },
};

export default function AllResultPage() {
  return (
    <main className="min-h-screen bg-background">
      <h1 className="hidden">
        Check All Exam Results - JNTUH
      </h1>
      <div className="container mx-auto p-4 sm:p-8">
        <div className="space-y-8">
          <AllResultsForm />
        </div>
      </div>
    </main>
  );
}

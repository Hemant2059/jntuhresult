import AllResultsForm from "@/components/allresult-form";

export const metadata = {
  title: "JNTUH All Exam Results",
  description:
    "Check all your JNTUH exam results across all semesters in one place.",
  keywords: [
    "JNTUH",
    "All Results",
    "Exam History",
    "Results Checker",
    "Academic History",
  ],
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

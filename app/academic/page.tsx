import AcademicForm from "@/components/academic-form";
import ResultInfoSection from "@/components/result-info-section";

export const metadata = {
  title: "Academic Results & CGPA Checker",
  description:
    "Check your complete JNTUH academic history, including total credits, CGPA, and year-wise marks instantly by entering your roll number.",
  keywords: [
    "JNTUH Academic Results", "JNTUH CGPA Calculator", "JNTUH Credit History",
    "JNTUH Result Analysis", "JNTUH Hall Ticket Search",
  ],
  alternates: { canonical: "https://jntuhresultbp.vercel.app/academic" },
};

export default function AcademicPage() {
  return (
    <main className="min-h-screen bg-background dark:bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <AcademicForm />
      </div>
      <ResultInfoSection pageType="academic" />
    </main>
  );
}

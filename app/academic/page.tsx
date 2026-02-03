import AcademicForm from "@/components/academic-form";

export const metadata = {
  title: "JNTUH Academic Results & Degree CGPA Checker",
  description:
    "Check your complete JNTUH academic history, including total credits, CGPA, and year-wise marks instantly by entering your roll number.",
  keywords: [
    "JNTUH Academic Results",
    "JNTUH CGPA Checker",
    "JNTUH Credit History",
    "JNTUH Result Analysis",
    "JNTUH Hall Ticket Search",
  ],
  alternates: {
    canonical: "https://jntuhresultbp.vercel.app/academic",
  },
};

export default function AcademicPage() {
  return (
    <main className="min-h-screen bg-background">
      <h1 className="hidden">
        Academic Results Checker of a Particular Student of a Particular College
      </h1>
      <div className="container mx-auto p-4">
        <div className="space-y-8">
          <AcademicForm />
        </div>
      </div>
    </main>
  );
}

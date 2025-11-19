import AcademicForm from "@/components/academic-form";

export const metadata = {
  title: "JNTUH Academic Results",
  description:
    "Check JNTUH results, SGPA, CGPA, and academic results instantly.",
  keywords: [
    "JNTUH",
    "Semester Results",
    "SGPA",
    "CGPA",
    "Results Checker, JNTU, B.Tech result,BPharm result, Class result, jntuh results , result analysis",
  ],
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

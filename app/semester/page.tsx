import SemesterForm from "@/components/semester-form";
import ResultInfoSection from "@/components/result-info-section";

export const metadata = {
  title: "Semester Results & SGPA Checker",
  description:
    "Check your JNTUH semester-wise results and SGPA instantly. Fast, accurate access to B.Tech and B.Pharmacy marks sheets for all regulations.",
  keywords: [
    "JNTUH Semester Results", "JNTUH SGPA Checker", "JNTUH Marks Sheet",
    "JNTU Results Vercel", "B.Tech Semester Results",
  ],
  alternates: { canonical: "https://jntuhresultbp.vercel.app/semester" },
};

export default function SemesterPage() {
  return (
    <main className="min-h-screen bg-background dark:bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <SemesterForm />
      </div>
      <ResultInfoSection pageType="semester" />
    </main>
  );
}

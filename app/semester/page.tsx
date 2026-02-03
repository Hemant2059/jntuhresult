import SemesterForm from "@/components/semester-form";
export const metadata = {
  title: "JNTUH Semester Results & SGPA Checker",
  description:
    "Check your JNTUH semester-wise results and SGPA instantly. Fast, accurate access to B.Tech and B.Pharmacy marks sheets for all regulations.",
  keywords: [
    "JNTUH Semester Results",
    "JNTUH SGPA Checker",
    "JNTUH Marks Sheet",
    "JNTU Results Vercel",
    "B.Tech Semester Results",
  ],
  alternates: {
    canonical: "https://jntuhresultbp.vercel.app/semester",
  },
};

const SemesterPage = () => {
  return (
    <div className="flex justify-center">
      <div>
        <SemesterForm />
      </div>
    </div>
  );
};

export default SemesterPage;

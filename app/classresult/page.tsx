import ClassResultForm from "@/components/classresult-form";

export const metadata = {
  title: "JNTUH Class Analysis & Batch Performance Results",
  description:
    "Analyze JNTUH results for an entire class or hall ticket range. Generate pass/fail charts and subject-wise performance analysis instantly.",
  keywords: [
    "JNTUH Class Results",
    "JNTUH Batch Analysis",
    "College Result Analysis",
    "Subject-wise Pass Percentage",
    "JNTUH Statistics",
  ],
  alternates: {
    canonical: "https://jntuhresultbp.vercel.app/classresult",
  },
};
const ClassResultPage = () => {
  return (
    <div className="flex justify-center">
      <h1 className="hidden">
        Class Results of a Particular Semester of a Particular College
      </h1>
      <div>
        <ClassResultForm />
      </div>
    </div>
  );
};

export default ClassResultPage;

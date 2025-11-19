import ClassResultForm from "@/components/classresult-form";

export const metadata = {
  title: "JNTUH Class Results",
  description: "Check JNTUH results, SGPA, CGPA, and class results instantly.",
  keywords: [
    "JNTUH",
    "Semester Results",
    "SGPA",
    "CGPA",
    "Results Checker, JNTU, B.Tech result,BPharm result, Class result, jntuh results , result analysis",
  ],
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

import SemesterForm from "@/components/semester-form";
export const metadata = {
  title: "JNTUH Semester Results",
  description:
    "Check JNTUH results, SGPA, CGPA, and semester results instantly.",
  keywords: [
    "JNTUH",
    "Semester Results",
    "SGPA",
    "CGPA",
    "Results Checker, JNTU, B.Tech result,BPharm result, Class result, jntuh results , result analysis",
  ],
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

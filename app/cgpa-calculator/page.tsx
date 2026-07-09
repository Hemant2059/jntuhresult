import { Metadata } from "next";
import CgpaCalculator from "./cgpa-calculator-client";

export const metadata: Metadata = {
  title: "CGPA Calculator - JNTUH",
  description:
    "Calculate your JNTUH CGPA (Cumulative Grade Point Average) across all semesters. Supports weighted and simple average methods for all regulations.",
  keywords: ["CGPA calculator", "JNTUH CGPA", "cumulative grade point average", "JNTUH GPA calculator", "B.Tech CGPA", "B.Pharmacy CGPA"],
  alternates: { canonical: "https://jntuhresultbp.vercel.app/cgpa-calculator" },
  openGraph: {
    title: "CGPA Calculator - JNTUH",
    description: "Calculate your JNTUH CGPA across all semesters. Supports weighted and simple average methods.",
    url: "https://jntuhresultbp.vercel.app/cgpa-calculator",
    type: "website",
  },
};

export default function CgpaCalculatorPage() {
  return <CgpaCalculator />;
}

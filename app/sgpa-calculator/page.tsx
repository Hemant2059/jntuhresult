import { Metadata } from "next";
import SgpaCalculator from "./sgpa-calculator-client";

export const metadata: Metadata = {
  title: "SGPA Calculator - JNTUH",
  description:
    "Calculate your JNTUH SGPA (Semester Grade Point Average) instantly. Supports all regulations R13-R25 for B.Tech and B.Pharmacy with accurate grading.",
  keywords: ["SGPA calculator", "JNTUH SGPA", "semester grade point average", "JNTUH GPA calculator", "B.Tech SGPA", "B.Pharmacy SGPA"],
  alternates: { canonical: "https://jntuhresultbp.vercel.app/sgpa-calculator" },
  openGraph: {
    title: "SGPA Calculator - JNTUH",
    description: "Calculate your JNTUH SGPA instantly. Supports all regulations R13-R25 for B.Tech and B.Pharmacy.",
    url: "https://jntuhresultbp.vercel.app/sgpa-calculator",
    type: "website",
  },
};

export default function SgpaCalculatorPage() {
  return <SgpaCalculator />;
}

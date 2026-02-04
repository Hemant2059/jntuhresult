import branches from "@/lib/branch";
import colleges from "@/lib/college";
import React from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { downloadAsPDF } from "@/lib/download-pdf";

type Details = {
  NAME: string;
  Roll_No: string;
  COLLEGE_CODE: string;
  FATHER_NAME: string;
};

type SubjectData = {
  name: string;
  internal: string;
  external: string;
  total: string;
  grade: string;
  credits: string;
  rcrv: boolean;
};

type AcademicData = {
  Details: Details;
  Result: Record<string, SubjectData>;
  SGPA: string;
  History: any[];
};

const SemesterTable = ({
  data,
  semester,
  hideSGPA = false,
}: {
  data: AcademicData;
  semester: string;
  hideSGPA?: boolean;
}) => {
  const { Details, Result, SGPA } = data;
  const name = Details.NAME;
  const rollno = Details.Roll_No;
  const collegeCode = Details.COLLEGE_CODE as keyof typeof colleges;
  const collegeName = colleges[collegeCode];
  const branchKey = rollno.slice(6, 8) as keyof typeof branches;
  const branch = branches[branchKey];
  const failedSubjects = Object.entries(data.Result)
    .filter(([_, sub]) => sub.grade === "F")
    .map(([subCode, _]) => subCode);

  const [isExporting, setIsExporting] = React.useState(false);

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      await downloadAsPDF(
        `semester-result-${rollno}`,
        `Semester_Result_${rollno}`,
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    name && (
      <div className="max-w-5xl md:mx-auto space-y-8 pb-20 mx-0 px-1">
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-3xl border border-gray-100 shadow-sm gap-4 print:hidden">
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-900">
              Semester Results
            </h2>
            <p className="text-gray-500 text-sm">Semester performance report</p>
          </div>
          <Button
            onClick={handleDownload}
            disabled={isExporting}
            className="rounded-full px-6 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 gap-2 h-11 transition-all active:scale-95 w-full sm:w-auto"
          >
            {isExporting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {isExporting ? "Generating PDF..." : "Download as PDF"}
          </Button>
        </div>

        <div
          id={`semester-result-${rollno}`}
          className="border border-gray-100 rounded-2xl md:rounded-[2.5rem] p-2 sm:p-8 md:p-12 bg-white shadow-2xl shadow-blue-500/5 ring-1 ring-blue-50/50"
        >
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="hidden md:inline-flex items-center justify-center p-3 sm:p-4 bg-blue-50 rounded-2xl mb-4 sm:mb-6">
              <div className="h-8 w-8 sm:h-12 sm:w-12 text-blue-600 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 sm:h-8 sm:w-8"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                </svg>
              </div>
            </div>
            <h1 className="text-lg md:text-3xl font-extrabold text-gray-900 tracking-tight px-2">
              {collegeName}
            </h1>
            <p className="text-blue-600 font-semibold mt-2 tracking-wide uppercase text-xs sm:text-sm">
              {branch}
            </p>
          </div>

          {/* Student Dossier - Compact Mobile Version */}
          <div className="mb-6 sm:mb-12 p-2 sm:p-4 bg-gray-50/50 rounded-2xl sm:rounded-3xl border border-gray-100">
            {/* Mobile: 2 rows */}
            <div className="block sm:hidden space-y-2">
              <div className="grid grid-cols-3 gap-2 text-center pb-1">
                <div className="text-[10px] xs:text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Name
                </div>
                <div className="text-[10px] xs:text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Roll No
                </div>
                <div className="text-[10px] xs:text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Father's Name
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="text-[9px] sm:text-sm font-bold text-gray-900 wrap-break-word leading-tight">
                  {name}
                </div>
                <div className="text-[9px] sm:text-sm font-bold text-gray-900 wrap-break-word leading-tight">
                  {rollno}
                </div>
                <div className="text-[9px] sm:text-sm font-bold text-gray-900 wrap-break-word leading-tight">
                  {Details.FATHER_NAME}
                </div>
              </div>
            </div>

            {/* Desktop: 3 columns */}
            <div className="hidden sm:grid grid-cols-3 gap-6">
              <div className="text-center sm:text-left">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Student Name
                </p>
                <p className="font-bold text-gray-900 truncate">{name}</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Hall Ticket No
                </p>
                <p className="font-bold text-gray-900">{rollno}</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Father's Name
                </p>
                <p className="font-bold text-gray-900 truncate">
                  {Details.FATHER_NAME}
                </p>
              </div>
            </div>
          </div>

          {/* Semesters */}
          <div className="space-y-8 sm:space-y-10">
            <div className="overflow-hidden">
              <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                <div className="h-px flex-1 bg-gray-100" />
                <h3 className="text-[10px] sm:text-sm font-black text-gray-400 uppercase tracking-widest px-2 sm:px-4">
                  {semester} Sem
                </h3>
                <div className="h-px flex-1 bg-gray-100" />
              </div>

              {/* Desktop Table */}
              <div className="overflow-x-auto hidden sm:block">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-gray-100 italic">
                      <th className="text-left py-4 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter w-20">
                        Code
                      </th>
                      <th className="text-left py-4 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                        Subject Name
                      </th>
                      <th className="text-center py-4 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter w-16">
                        Internal
                      </th>
                      <th className="text-center py-4 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter w-16">
                        External
                      </th>
                      <th className="text-center py-4 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter w-16">
                        Total
                      </th>
                      <th className="text-center py-4 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter w-20">
                        Grade
                      </th>
                      <th className="text-center py-4 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter w-16">
                        Credits
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50/50">
                    {Object.entries(data.Result).map(([subCode, sub]) => {
                      const isFailed = failedSubjects.includes(subCode);
                      return (
                        <tr
                          key={subCode}
                          className="hover:bg-gray-50/30 transition-colors"
                        >
                          <td className="py-4 px-2 text-xs font-medium text-gray-500 font-mono">
                            {subCode}
                          </td>
                          <td className="py-4 px-2 text-sm font-semibold text-gray-900">
                            {sub.name}
                          </td>
                          <td className="py-4 px-2 text-center text-sm text-gray-600 font-mono">
                            {sub.internal}
                          </td>
                          <td className="py-4 px-2 text-center text-sm text-gray-600 font-mono">
                            {sub.external}
                          </td>
                          <td className="py-4 px-2 text-center text-sm font-bold text-gray-900 font-mono">
                            {sub.total}
                          </td>
                          <td className="py-4 px-2 text-center">
                            <span
                              className={`inline-flex items-center justify-center min-w-8 h-8 rounded-lg text-xs font-black ${
                                isFailed
                                  ? "bg-red-50 text-red-600"
                                  : "bg-blue-50 text-blue-600"
                              }`}
                            >
                              {sub.grade}
                            </span>
                          </td>
                          <td className="py-4 px-2 text-center text-sm font-bold text-gray-900 font-mono">
                            {sub.credits}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Compact Table - Each subject in one row */}
              <div className="sm:hidden">
                <div className="overflow-x-auto -mx-4 px-4">
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-1 font-bold text-gray-400 uppercase">
                          Subject
                        </th>
                        <th className="text-center py-2 px-1 font-bold text-gray-400 uppercase">
                          I
                        </th>
                        <th className="text-center py-2 px-1 font-bold text-gray-400 uppercase">
                          E
                        </th>
                        <th className="text-center py-2 px-1 font-bold text-gray-400 uppercase">
                          T
                        </th>
                        <th className="text-center py-2 px-1 font-bold text-gray-400 uppercase">
                          Gr
                        </th>
                        <th className="text-center py-2 px-1 font-bold text-gray-400 uppercase">
                          C
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {Object.entries(data.Result).map(([subCode, sub]) => {
                        const isFailed = failedSubjects.includes(subCode);
                        return (
                          <tr key={subCode} className="hover:bg-gray-50/50">
                            <td className="py-2 px-1">
                              <div className="text-[9px] font-mono text-gray-400">
                                {subCode}
                              </div>
                              <div className="text-[11px] font-semibold text-gray-900 leading-tight">
                                {sub.name}
                              </div>
                            </td>
                            <td className="py-2 px-1 text-center font-mono text-gray-600">
                              {sub.internal}
                            </td>
                            <td className="py-2 px-1 text-center font-mono text-gray-600">
                              {sub.external}
                            </td>
                            <td className="py-2 px-1 text-center font-bold text-gray-900">
                              {sub.total}
                            </td>
                            <td className="py-2 px-1 text-center">
                              <span
                                className={`inline-flex items-center justify-center w-6 h-6 rounded text-[10px] font-black ${
                                  isFailed
                                    ? "bg-red-50 text-red-600"
                                    : "bg-blue-50 text-blue-600"
                                }`}
                              >
                                {sub.grade}
                              </span>
                            </td>
                            <td className="py-2 px-1 text-center font-bold text-gray-900">
                              {sub.credits}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 flex justify-between items-center p-3 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-100">
                <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Semester SGPA
                </span>
                <span className="text-base sm:text-lg font-black text-gray-900">
                  {SGPA}
                </span>
              </div>
            </div>
          </div>

          {/* Final Performance Summary */}
          <div className="mt-8 bg-blue-600 rounded-3xl sm:rounded-4xl p-2 text-white shadow-xl shadow-blue-500/20">
            <div
              className={`grid gap-4 sm:gap-8 ${hideSGPA ? "grid-cols-2" : "grid-cols-3"}`}
            >
              <div
                className={`text-center ${!hideSGPA ? "border-r border-blue-400/30" : ""}`}
              >
                <p className="text-blue-100 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-1 sm:mb-2">
                  Backlogs
                </p>
                <p className="text-xl sm:text-3xl font-black">
                  {failedSubjects.length}
                </p>
              </div>
              <div
                className={`text-center ${!hideSGPA ? "border-r border-blue-400/30" : ""}`}
              >
                <p className="text-blue-100 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-1 sm:mb-2">
                  Credits
                </p>
                <p className="text-xl sm:text-3xl font-black">
                  {Object.values(data.Result)
                    .map((sub) => Number(sub.credits))
                    .reduce((a, b) => a + b, 0)}
                </p>
              </div>
              {!hideSGPA && (
                <div className="text-center">
                  <p className="text-blue-100 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-1 sm:mb-2">
                    SGPA
                  </p>
                  <p className="text-xl sm:text-4xl font-black text-white">
                    {SGPA}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SemesterTable;

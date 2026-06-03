"use client";
import React from "react";
import branches from "@/lib/branch";
import colleges from "@/lib/college";
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

type SemesterData = {
  Result: Record<string, SubjectData>;
  SGPA: number;
  Failed_Subjects: string[];
  History: any[];
};

type AcademicData = {
  Details: Details;
  Semesters: Record<string, SemesterData>;
  CGPA: number;
};

const AcademicTable = (data: AcademicData) => {
  const { Details, Semesters, CGPA } = data;
  const name = Details.NAME || "Unknown";
  const rollno = Details.Roll_No || "Unknown";
  const collegeCode = Details.COLLEGE_CODE as keyof typeof colleges;
  const collegeName = colleges[collegeCode] || "Unknown";
  const branchKey = rollno.slice(6, 8) as keyof typeof branches;
  const branch = branches[branchKey] || "Unknown";

  const [isExporting, setIsExporting] = React.useState(false);

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      await downloadAsPDF("academic-result-content", `Academic_Result_${rollno}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-5xl md:mx-auto space-y-8 pb-20 sm:px-0 mx-0 px-0">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-card p-4 sm:p-5 rounded-2xl border shadow-sm gap-3 print:hidden">
        <div>
          <h2 className="text-base sm:text-lg font-bold">Academic Overview</h2>
          <p className="text-muted-foreground text-xs">
            Review your full academic session history.
          </p>
        </div>
        <Button
          onClick={handleDownload}
          disabled={isExporting}
          className="rounded-full px-5 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 gap-1.5 h-9 text-xs transition-all active:scale-95 w-full sm:w-auto"
        >
          {isExporting ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Download className="h-3.5 w-3.5" />
          )}
          {isExporting ? "Generating PDF..." : "Download as PDF"}
        </Button>
      </div>

      <div
        id="academic-result-content"
        className="border rounded-2xl p-2 sm:p-6 md:p-8 bg-card shadow-xl shadow-blue-500/5 ring-1 ring-blue-50/50 dark:ring-blue-950/50"
      >
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="hidden md:inline-flex items-center justify-center p-2 sm:p-3 bg-muted rounded-xl mb-3 sm:mb-4">
            <div className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 sm:h-6 sm:w-6">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
              </svg>
            </div>
          </div>
          <h1 className="text-base md:text-2xl font-extrabold tracking-tight px-2">{collegeName}</h1>
          <p className="text-blue-600 font-semibold mt-1.5 tracking-wide uppercase text-xs">{branch}</p>
        </div>

        {/* Student Dossier */}
        <div className="mb-5 sm:mb-8 p-2 sm:p-3 bg-muted/50 rounded-xl sm:rounded-2xl border">
          <div className="block sm:hidden space-y-2">
            <div className="grid grid-cols-3 gap-2 text-center pb-1">
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Name</div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Roll No</div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Father</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="text-xs font-bold leading-tight break-words">{name}</div>
              <div className="text-xs font-bold leading-tight break-words">{rollno}</div>
              <div className="text-xs font-bold leading-tight break-words">{Details.FATHER_NAME}</div>
            </div>
          </div>
          <div className="hidden sm:grid grid-cols-3 gap-6">
            <div className="text-center sm:text-left">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Student Name</p>
              <p className="font-bold truncate">{name}</p>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Hall Ticket No</p>
              <p className="font-bold">{rollno}</p>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Father&apos;s Name</p>
              <p className="font-bold truncate">{Details.FATHER_NAME}</p>
            </div>
          </div>
        </div>

        {/* Semesters */}
        <div className="space-y-6 sm:space-y-8">
          {Object.entries(Semesters).map(([semKey, semesterData]) => (
            <div className="overflow-hidden" key={semKey}>
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="h-px flex-1 bg-border" />
                <h3 className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest px-2 sm:px-4">
                  {semKey} Sem
                </h3>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="overflow-x-auto hidden sm:block">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-border italic">
                      <th className="text-left py-3 px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-tighter w-20">Code</th>
                      <th className="text-left py-3 px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Subject Name</th>
                      <th className="text-center py-3 px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-tighter w-16">Int</th>
                      <th className="text-center py-3 px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-tighter w-16">Ext</th>
                      <th className="text-center py-3 px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-tighter w-16">Total</th>
                      <th className="text-center py-3 px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-tighter w-20">Grade</th>
                      <th className="text-center py-3 px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-tighter w-16">Credits</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {Object.entries(semesterData.Result).map(([subCode, sub]) => {
                      const isFailed = semesterData.Failed_Subjects.includes(subCode);
                      return (
                        <tr key={subCode} className="hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-2 text-xs font-medium text-muted-foreground font-mono">{subCode}</td>
                          <td className="py-3 px-2 text-sm font-semibold">{sub.name}</td>
                          <td className="py-3 px-2 text-center text-sm text-muted-foreground font-mono">{sub.internal}</td>
                          <td className="py-3 px-2 text-center text-sm text-muted-foreground font-mono">{sub.external}</td>
                          <td className="py-3 px-2 text-center text-sm font-bold font-mono">{sub.total}</td>
                          <td className="py-3 px-2 text-center">
                            <span className={`inline-flex items-center justify-center min-w-7 h-7 rounded-lg text-xs font-black ${isFailed ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400" : "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"}`}>
                              {sub.grade}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-center text-sm font-bold font-mono">{sub.credits}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="sm:hidden">
                <div className="overflow-x-auto -mx-4 px-4">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-1.5 px-1 font-bold text-muted-foreground uppercase text-[10px]">Subject</th>
                        <th className="text-center py-1.5 px-1 font-bold text-muted-foreground uppercase text-[10px]">I</th>
                        <th className="text-center py-1.5 px-1 font-bold text-muted-foreground uppercase text-[10px]">E</th>
                        <th className="text-center py-1.5 px-1 font-bold text-muted-foreground uppercase text-[10px]">T</th>
                        <th className="text-center py-1.5 px-1 font-bold text-muted-foreground uppercase text-[10px]">Gr</th>
                        <th className="text-center py-1.5 px-1 font-bold text-muted-foreground uppercase text-[10px]">C</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {Object.entries(semesterData.Result).map(([subCode, sub]) => {
                        const isFailed = semesterData.Failed_Subjects.includes(subCode);
                        return (
                          <tr key={subCode} className="hover:bg-muted/30">
                            <td className="py-1.5 px-1">
                              <div className="text-[10px] font-mono text-muted-foreground">{subCode}</div>
                              <div className="text-[11px] font-semibold leading-tight">{sub.name}</div>
                            </td>
                            <td className="py-1.5 px-1 text-center font-mono text-muted-foreground text-[11px]">{sub.internal}</td>
                            <td className="py-1.5 px-1 text-center font-mono text-muted-foreground text-[11px]">{sub.external}</td>
                            <td className="py-1.5 px-1 text-center font-bold text-[11px]">{sub.total}</td>
                            <td className="py-1.5 px-1 text-center">
                              <span className={`inline-flex items-center justify-center w-6 h-6 rounded text-[10px] font-black ${isFailed ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400" : "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"}`}>
                                {sub.grade}
                              </span>
                            </td>
                            <td className="py-1.5 px-1 text-center font-bold text-[11px]">{sub.credits}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-2 sm:mt-3 flex justify-between items-center p-2 sm:p-3 bg-muted/50 rounded-xl border">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Semester SGPA</span>
                <span className="text-sm sm:text-base font-black">{semesterData.SGPA}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Summary */}
        <div className="mt-8 sm:mt-10 bg-blue-600 rounded-2xl p-4 sm:p-6 text-white shadow-lg shadow-blue-500/20">
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            <div className="text-center border-r border-blue-400/30">
              <p className="text-blue-100 text-[9px] font-bold uppercase tracking-widest mb-1">Backlogs</p>
              <p className="text-xl sm:text-2xl font-black">
                {Object.values(Semesters).reduce((acc, sem) => acc + sem.Failed_Subjects.length, 0)}
              </p>
            </div>
            <div className="text-center border-r border-blue-400/30">
              <p className="text-blue-100 text-[9px] font-bold uppercase tracking-widest mb-1">Credits</p>
              <p className="text-xl sm:text-2xl font-black">
                {Object.values(Semesters).flatMap((sem) => Object.values(sem.Result).map((sub) => Number(sub.credits))).reduce((a, b) => a + b, 0)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-blue-100 text-[9px] font-bold uppercase tracking-widest mb-1">CGPA</p>
              <p className="text-xl sm:text-3xl font-black">{CGPA}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicTable;

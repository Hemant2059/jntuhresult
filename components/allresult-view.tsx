"use client";

import branches from "@/lib/branch";
import colleges from "@/lib/college";
import React from "react";
import { Download, Loader2, Calendar, Award, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { downloadAsPDF } from "@/lib/download-pdf";
import { Card, CardContent } from "./ui/card";

type SubjectData = {
  name: string;
  internal: string;
  external: string;
  total: string;
  grade: string;
  credits: string;
  rcrv: boolean;
};

type ExamEntry = {
  exam_code: string;
  type: "regular" | "rcrv" | string;
  result_url: string;
  Result: Record<string, SubjectData>;
};

type AllResultsData = {
  Details: {
    NAME: string;
    Roll_No: string;
    FATHER_NAME: string;
    COLLEGE_CODE: string;
    Regulation: string;
  };
  Results: Record<string, ExamEntry[]>;
};

const AllResultsView = ({ data }: { data: AllResultsData }) => {
  const { Details, Results } = data;
  const name = Details.NAME || "Unknown";
  const rollno = Details.Roll_No || "Unknown";
  const collegeCode = Details.COLLEGE_CODE as keyof typeof colleges;
  const collegeName = colleges[collegeCode] || `College Code: ${collegeCode}`;
  const branchKey = rollno.slice(6, 8) as keyof typeof branches;
  const branch = branches[branchKey] || "Unknown Branch";

  const [isExporting, setIsExporting] = React.useState(false);

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      await downloadAsPDF(`all-results-${rollno}`, `Full_Academic_History_${rollno}`);
    } finally {
      setIsExporting(false);
    }
  };

  const sortedSemesters = Object.keys(Results).sort((a, b) => {
    const [aYear, aSem] = a.split("-").map(Number);
    const [bYear, bSem] = b.split("-").map(Number);
    if (aYear !== bYear) return aYear - bYear;
    return aSem - bSem;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 px-4 sm:px-0">
      {/* Top Action Bar - Matching Academic Style */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-3xl border border-gray-100 shadow-sm gap-4 print:hidden">
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-bold text-gray-900">Academic History</h2>
          <p className="text-gray-500 text-sm">Review your complete examination history across all sessions.</p>
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
          {isExporting ? "Generating PDF..." : "Download Full PDF"}
        </Button>
      </div>

      <div id={`all-results-${rollno}`} className="border border-gray-100 rounded-[2.5rem] p-8 md:p-12 bg-white shadow-2xl shadow-blue-500/5 ring-1 ring-blue-50/50">
        
        {/* Header Section with SVG - Replicating Academic */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-blue-50 rounded-2xl mb-6">
            <div className="h-12 w-12 text-blue-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight text-center uppercase">{collegeName}</h1>
          <p className="text-blue-600 font-semibold mt-2 tracking-wide uppercase text-sm text-center">{branch}</p>
        </div>

        {/* Student Dossier Group - Replicating Academic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
          <div className="text-center sm:text-left">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Student Name</p>
            <p className="font-bold text-gray-900 truncate">{name}</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Hall Ticket No</p>
            <p className="font-bold text-gray-900">{rollno}</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Father's Name</p>
            <p className="font-bold text-gray-900 truncate">{Details.FATHER_NAME}</p>
          </div>
        </div>

        {/* Semesters Loop */}
        <div className="space-y-16">
          {sortedSemesters.map((semKey) => (
            <div key={semKey} className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-100" />
                <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] whitespace-nowrap px-4">
                  Semester {semKey.replace("-", " ")}
                </h2>
                <div className="h-px flex-1 bg-gray-100" />
              </div>

              {/* Multiple Exams per Semester */}
              <div className="space-y-10">
                {Results[semKey].map((exam, idx) => (
                  <div key={`${semKey}-${idx}`} className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-blue-600" />
                        <span className="text-xs font-bold text-gray-900 uppercase">
                          Exam: <span className="text-blue-600 font-mono ml-1">{exam.exam_code}</span>
                        </span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        exam.type === "regular" 
                          ? "bg-blue-600 text-white" 
                          : "bg-amber-100 text-amber-700 border border-amber-200"
                      }`}>
                        {exam.type}
                      </span>
                    </div>

                    {/* Table Desktop - Replicating Academic */}
                    <div className="overflow-x-auto hidden sm:block border border-gray-50 rounded-2xl">
                      <table className="w-full min-w-[600px]">
                        <thead>
                          <tr className="border-b border-gray-100 italic">
                            <th className="text-left py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-tighter w-20">Code</th>
                            <th className="text-left py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Subject Name</th>
                            <th className="text-center py-4 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter w-16">I</th>
                            <th className="text-center py-4 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter w-16">E</th>
                            <th className="text-center py-4 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter w-16">T</th>
                            <th className="text-center py-4 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter w-20">Grade</th>
                            <th className="text-center py-4 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter w-16">C</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50/50 text-sm">
                          {Object.entries(exam.Result).map(([subCode, sub]) => {
                            const isFailed = sub.grade === "F" || sub.grade === "Ab";
                            return (
                              <tr key={subCode} className="hover:bg-gray-50/30 transition-colors">
                                <td className="py-4 px-4 text-xs font-medium text-gray-500 font-mono">{subCode}</td>
                                <td className="py-4 px-4 font-semibold text-gray-900">{sub.name}</td>
                                <td className="py-4 px-2 text-center text-gray-600 font-mono">{sub.internal}</td>
                                <td className="py-4 px-2 text-center text-gray-600 font-mono">{sub.external}</td>
                                <td className="py-4 px-2 text-center font-bold text-gray-900 font-mono">{sub.total}</td>
                                <td className="py-4 px-2 text-center">
                                  <span className={`inline-flex items-center justify-center min-w-8 h-8 rounded-lg text-xs font-black ${
                                    isFailed ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
                                  }`}>
                                    {sub.grade}
                                  </span>
                                </td>
                                <td className="py-4 px-2 text-center font-bold text-gray-900 font-mono">{sub.credits}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Cards - Replicating Academic */}
                    <div className="sm:hidden space-y-3">
                      {Object.entries(exam.Result).map(([subCode, sub]) => {
                        const isFailed = sub.grade === "F" || sub.grade === "Ab";
                        return (
                          <div key={subCode} className="p-4 border border-gray-100 rounded-2xl bg-gray-50/30 space-y-3">
                            <div className="flex justify-between items-start">
                              <span className="text-[10px] font-mono text-gray-400">{subCode}</span>
                              <span className={`inline-flex items-center justify-center min-w-6 h-6 rounded text-[10px] font-black ${
                                isFailed ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
                              }`}>
                                {sub.grade}
                              </span>
                            </div>
                            <p className="text-sm font-bold text-gray-900 leading-tight">{sub.name}</p>
                            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-gray-100">
                              <div className="text-center">
                                <p className="text-[8px] font-bold text-gray-400 uppercase">Int</p>
                                <p className="text-xs font-medium">{sub.internal}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-[8px] font-bold text-gray-400 uppercase">Ext</p>
                                <p className="text-xs font-medium">{sub.external}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-[8px] font-bold text-gray-400 uppercase">Tot</p>
                                <p className="text-xs font-bold">{sub.total}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-[8px] font-bold text-gray-400 uppercase">Cre</p>
                                <p className="text-xs font-bold">{sub.credits}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend / Info Footer */}
        <div className="mt-16 bg-blue-600 rounded-4xl p-8 text-white shadow-xl shadow-blue-500/20 text-center">
          <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-2 italic">Official Academic Transcript Record</p>
          <div className="h-px w-24 bg-blue-400/30 mx-auto mb-4" />
          <p className="text-sm font-medium text-blue-50 leading-relaxed max-w-2xl mx-auto">
            This document lists all official examination attempts including regular, supply, and revaluation results recorded for the hall ticket <span className="font-bold underline">{rollno}</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllResultsView;

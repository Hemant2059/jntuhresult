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
}: {
  data: AcademicData;
  semester: string;
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
      await downloadAsPDF(`semester-result-${rollno}`, `Semester_Result_${rollno}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    name && (
      <div className="max-w-4xl mx-auto space-y-6 pb-20 px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm gap-3 print:hidden">
          <p className="text-gray-500 text-sm font-medium italic text-center sm:text-left">Semester performance report</p>
          <Button
            onClick={handleDownload}
            disabled={isExporting}
            size="sm"
            className="rounded-xl px-5 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 gap-2 transition-all active:scale-95 w-full sm:w-auto"
          >
            {isExporting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
            {isExporting ? "Generating..." : "Download as PDF"}
          </Button>
        </div>

        <div
          id={`semester-result-${rollno}`}
          className="border border-gray-100 rounded-3xl p-6 md:p-10 bg-white shadow-xl shadow-indigo-500/5 ring-1 ring-indigo-50/50"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-xl md:text-2xl font-black text-gray-900 leading-tight uppercase tracking-tight">{collegeName}</h1>
            <div className="inline-block mt-2 px-3 py-1 bg-indigo-50 rounded-full">
              <p className="text-indigo-600 font-bold text-[10px] tracking-widest uppercase">{branch}</p>
            </div>
          </div>

          <div className="mb-8 p-5 bg-gray-50/50 rounded-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center sm:text-left">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Student</p>
              <p className="font-bold text-gray-900 break-words">{name}</p>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Roll No</p>
              <p className="font-bold text-gray-900">{rollno}</p>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Father's Name</p>
              <p className="font-bold text-gray-900 break-words">{Details.FATHER_NAME}</p>
            </div>
          </div>

          {/* Table Header Section */}
          <div className="bg-gray-100 py-2 text-center rounded-lg mb-4">
            <h4 className="text-[10px] font-black tracking-widest text-gray-400 uppercase">{semester} Semester Performance</h4>
          </div>

          {/* Results Desktop Table */}
          <div className="hidden sm:block overflow-hidden mb-8 border border-gray-50 rounded-2xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead className="bg-white">
                  <tr className="border-b border-gray-100">
                    <th className="py-4 px-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-tighter w-20">Code</th>
                    <th className="py-4 px-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-tighter">Subject</th>
                    <th className="py-4 px-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-tighter w-16">I</th>
                    <th className="py-4 px-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-tighter w-16">E</th>
                    <th className="py-4 px-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-tighter w-16">T</th>
                    <th className="py-4 px-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-tighter">Grade</th>
                    <th className="py-4 px-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-tighter">Credits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {Object.entries(Result).map(([subCode, sub]) => {
                    const isFailed = failedSubjects.includes(subCode);
                    return (
                      <tr key={subCode} className="hover:bg-gray-50/30 transition-colors">
                        <td className="py-4 px-4 text-xs font-mono text-gray-500">{subCode}</td>
                        <td className="py-4 px-4 text-sm font-semibold text-gray-900">{sub.name}</td>
                        <td className="py-4 px-4 text-center text-xs text-gray-500">{sub.internal}</td>
                        <td className="py-4 px-4 text-center text-xs text-gray-500">{sub.external}</td>
                        <td className="py-4 px-4 text-center text-sm font-bold text-gray-900">{sub.total}</td>
                        <td className="py-4 px-4 text-center">
                          <span className={`inline-flex items-center justify-center min-w-6 h-7 rounded text-[10px] font-black ${
                            isFailed ? "bg-red-50 text-red-600" : "bg-indigo-50 text-indigo-600"
                          }`}>
                            {sub.grade}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center text-sm font-bold text-gray-900 font-mono">{sub.credits}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Results Mobile Cards */}
          <div className="sm:hidden space-y-4 mb-8">
             {Object.entries(Result).map(([subCode, sub]) => {
               const isFailed = failedSubjects.includes(subCode);
               return (
                 <div key={subCode} className="p-4 border border-gray-100 rounded-2xl bg-gray-50/30 space-y-3">
                   <div className="flex justify-between items-start">
                     <span className="text-[10px] font-mono text-gray-400">{subCode}</span>
                     <span className={`inline-flex items-center justify-center min-w-6 h-6 rounded text-[10px] font-black ${
                       isFailed ? "bg-red-50 text-red-600" : "bg-indigo-50 text-indigo-600"
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

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Backlogs</p>
              <p className="text-2xl font-black text-gray-900">{failedSubjects.length}</p>
            </div>
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Credits</p>
              <p className="text-2xl font-black text-gray-900">
                {Object.values(data.Result).map((sub) => Number(sub.credits)).reduce((a, b) => a + b, 0)}
              </p>
            </div>
            <div className="col-span-2 lg:col-span-1 p-5 bg-indigo-600 rounded-2xl flex flex-col items-center text-white shadow-lg shadow-indigo-500/20">
              <p className="text-indigo-100 text-[10px] font-bold uppercase tracking-widest mb-1">SGPA</p>
              <p className="text-3xl font-black">{SGPA}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SemesterTable;

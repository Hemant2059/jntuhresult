"use client";

import branches from "@/lib/branch";
import colleges from "@/lib/college";
import { useRef, useMemo } from "react";

type SubjectData = { name: string; internal: string; external: string; total: string; grade: string; credits: string; rcrv?: boolean };
type ExamEntry = { exam_code: string; type: string; result_url: string; Result: Record<string, SubjectData> };
type AllResultsData = { Details: { NAME: string; Roll_No: string; FATHER_NAME: string; COLLEGE_CODE: string; Regulation: string }; Results: Record<string, ExamEntry[]> };

interface Props { data: AllResultsData; onClose?: () => void; }

function grade(g: string) { const u = g.toUpperCase(); return u === "A+" || u === "A_PLUS" ? "A+" : u; }

const SEM_SHORT: Record<string, string> = { "1-1": "I-I", "1-2": "I-II", "2-1": "II-I", "2-2": "II-II", "3-1": "III-I", "3-2": "III-II", "4-1": "IV-I", "4-2": "IV-II" };

function Content({ data }: { data: AllResultsData }) {
  const d = data.Details;
  const rollno = d.Roll_No || "";
  const collegeCode = d.COLLEGE_CODE as keyof typeof colleges;
  const branchKey = rollno.slice(6, 8) as keyof typeof branches;
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });

  const sortedSemesters = useMemo(() =>
    Object.keys(data.Results).sort((a, b) => {
      const [ay, as_] = a.split("-").map(Number);
      const [by, bs_] = b.split("-").map(Number);
      return ay !== by ? ay - by : as_ - bs_;
    }), [data.Results]);

  return (
    <div className="w-[794px] bg-white text-black flex flex-col p-4" style={{ fontFamily: "Times New Roman, serif" }}>
      <div className="border-[4px] border-double border-gray-800 p-4 flex flex-col relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]" style={{ printColorAdjust: "exact", WebkitPrintColorAdjust: "exact" }}>
          <span className="text-[120px] font-bold -rotate-45 tracking-widest text-center uppercase leading-tight text-gray-800 select-none">JNTUH<br/>HYDERABAD</span>
        </div>

        <div className="text-center border-b-2 border-gray-800 pb-2 mb-2 z-10 relative">
          <h1 className="text-[18px] font-extrabold tracking-wider uppercase mb-1 text-gray-900">Jawaharlal Nehru Technological University Hyderabad</h1>
          <div className="inline-block border-2 border-gray-800 px-4 py-1 rounded-full bg-white shadow-sm mt-1">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-gray-900">Academic History Report</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[9px] mb-2 z-10 relative">
          <div className="flex items-end"><span className="font-bold w-20 shrink-0 pb-0.5">Hall Ticket No:</span><span className="font-mono font-bold text-[10px] border-b border-gray-500 flex-1 pb-0.5">{rollno}</span></div>
          <div className="flex items-end"><span className="font-bold w-20 shrink-0 pb-0.5">Course:</span><span className="border-b border-gray-500 flex-1 font-semibold pb-0.5">{branches[branchKey] || ""}</span></div>
          <div className="flex items-end"><span className="font-bold w-20 shrink-0 pb-0.5">Student Name:</span><span className="font-bold text-[10px] border-b border-gray-500 flex-1 uppercase pb-0.5">{d.NAME}</span></div>
          <div className="flex items-end"><span className="font-bold w-20 shrink-0 pb-0.5">Father Name:</span><span className="border-b border-gray-500 flex-1 font-semibold uppercase pb-0.5">{d.FATHER_NAME}</span></div>
          <div className="flex items-end col-span-2"><span className="font-bold w-20 shrink-0 pb-0.5">College:</span><span className="border-b border-gray-500 flex-1 font-semibold pb-0.5">{colleges[collegeCode] || collegeCode}</span></div>
        </div>

        <div className="z-10 relative space-y-3">
          {sortedSemesters.map((semKey) => {
            const exams = data.Results[semKey];
            return (
              <div key={semKey} className="border border-gray-400 rounded-sm overflow-hidden">
                <div className="bg-gray-100 text-gray-900 border-b border-gray-500 text-[8px] font-bold text-center py-0.5 uppercase tracking-widest">
                  {SEM_SHORT[semKey] || semKey}
                </div>
                {exams.map((exam, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between px-1 py-0.5 bg-gray-50 border-b border-gray-300">
                      <span className="text-[6.5px] font-bold uppercase">Exam: <span className="font-mono">{exam.exam_code}</span></span>
                      <span className={`px-1.5 py-0.5 rounded text-[6px] font-black uppercase ${exam.type === "regular" ? "bg-blue-600 text-white" : "bg-amber-100 text-amber-800"}`}>{exam.type}</span>
                    </div>
                    <table className="w-full text-[6.5px] border-collapse">
                      <thead>
                        <tr className="border-b border-gray-300">
                          <th className="border-r border-gray-300 p-0.5 text-center w-5">S.No</th>
                          <th className="border-r border-gray-300 p-0.5 text-left">Subject Title</th>
                          <th className="border-r border-gray-300 p-0.5 text-center w-6">Int</th>
                          <th className="border-r border-gray-300 p-0.5 text-center w-6">Ext</th>
                          <th className="border-r border-gray-300 p-0.5 text-center w-7">Total</th>
                          <th className="border-r border-gray-300 p-0.5 text-center w-7">Grade</th>
                          <th className="p-0.5 text-center w-6">Cred</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(exam.Result).map(([code, sub], i) => {
                          const g = grade(sub.grade);
                          const pass = g !== "F" && g !== "AB";
                          return (
                            <tr key={code} className="border-b border-gray-200 last:border-b-0">
                              <td className="border-r border-gray-300 p-0.5 text-center">{i + 1}</td>
                              <td className="border-r border-gray-300 p-0.5">{sub.name}</td>
                              <td className="border-r border-gray-300 p-0.5 text-center">{sub.internal || "-"}</td>
                              <td className="border-r border-gray-300 p-0.5 text-center">{sub.external || "-"}</td>
                              <td className="border-r border-gray-300 p-0.5 text-center font-bold">{sub.total || "-"}</td>
                              <td className={`border-r border-gray-300 p-0.5 text-center font-bold ${pass ? "text-green-800" : "text-red-700"}`}>{g}</td>
                              <td className="p-0.5 text-center">{sub.credits}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div className="mt-auto pt-8 z-10 relative">
          <div className="grid grid-cols-3 text-[9px] text-center font-semibold">
            <div><div className="border-t border-gray-800 pt-2 mx-auto w-24 mt-6">Principal</div></div>
            <div><div className="border-t border-gray-800 pt-2 mx-auto w-24 mt-6">HOD</div></div>
            <div><div className="border-t border-gray-800 pt-2 mx-auto w-24 mt-6">Class Teacher</div></div>
          </div>
          <p className="text-center text-[6px] text-gray-400 mt-2 leading-tight">
            Generated by <span className="font-semibold">jntuhresultbp.vercel.app</span> — Not an official JNTUH document. Verify with official sources.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AllResultMemo({ data, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) { window.print(); return; }
    const styles = Array.from(document.querySelectorAll("style, link[rel=stylesheet]")).map(el => el.outerHTML).join("");
    printWindow.document.write(`<html><head><title>Transcript - ${data.Details.Roll_No}</title>${styles}<style>
      *{print-color-adjust:exact!important;-webkit-print-color-adjust:exact!important}
      @page{margin:0;size:A4 portrait}
      body{margin:0;display:flex;justify-content:center}
    </style></head><body>${ref.current?.innerHTML || ""}</body></html>`);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex flex-col" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 z-20 shrink-0" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold text-xs sm:text-sm dark:text-white">Transcript Preview</h3>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button onClick={handlePrint} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white text-[10px] sm:text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors">Print</button>
          {onClose && <button onClick={onClose} className="px-2 sm:px-3 py-1.5 sm:py-2 text-gray-500 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 text-[10px] sm:text-xs font-bold">Close</button>}
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-white dark:bg-gray-900" onClick={(e) => e.stopPropagation()}>
        <div className="inline-block p-2 sm:p-4" ref={ref}>
          <Content data={data} />
        </div>
      </div>
    </div>
  );
}

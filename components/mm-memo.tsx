"use client";

import branches from "@/lib/branch";
import colleges from "@/lib/college";
import { useRef } from "react";

type SubjectData = { name: string; internal: string; external: string; total: string; grade: string; credits: string; rcrv?: boolean };

interface MmMemoProps {
  data: { Details: { NAME: string; Roll_No: string; FATHER_NAME: string; COLLEGE_CODE: string }; Result: Record<string, SubjectData>; SGPA: string };
  semester: string;
  onClose?: () => void;
}

const SEM_LABEL: Record<string, string> = { "1-1": "I-I", "1-2": "I-II", "2-1": "II-I", "2-2": "II-II", "3-1": "III-I", "3-2": "III-II", "4-1": "IV-I", "4-2": "IV-II" };

function grade(g: string) { const u = g.toUpperCase(); return u === "A+" || u === "A_PLUS" ? "A+" : u; }

function Content({ data, semester }: MmMemoProps) {
  const d = data.Details;
  const rollno = d.Roll_No || "";
  const collegeCode = d.COLLEGE_CODE as keyof typeof colleges;
  const branchKey = rollno.slice(6, 8) as keyof typeof branches;

  const subjects = Object.entries(data.Result);
  const creditsTotal = subjects.reduce((s, [, sub]) => s + Number(sub.credits || 0), 0);
  
  const hasFailed = subjects.some(([, sub]) => {
    const g = grade(sub.grade);
    return g === "F" || g === "AB";
  });
  const overallResult = hasFailed ? "FAILED" : "PASSED";

  return (
    <div className="w-[794px] h-[1123px] bg-white text-black flex flex-col p-4" style={{ fontFamily: "Times New Roman, serif" }}>
      <div className="flex-1 border-[4px] border-double border-gray-800 p-6 flex flex-col relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]" style={{ printColorAdjust: "exact", WebkitPrintColorAdjust: "exact" }}>
          <span className="text-[120px] font-bold -rotate-45 tracking-widest text-center uppercase leading-tight text-gray-800 select-none">JNTUH<br/>HYDERABAD</span>
        </div>

        <div className="text-center border-b-2 border-gray-800 pb-4 mb-5 z-10 relative">
          <h1 className="text-[22px] font-extrabold tracking-wider uppercase mb-2 text-foreground">Jawaharlal Nehru Technological University Hyderabad</h1>
          <div className="inline-block border-2 border-gray-800 px-6 py-2 rounded-full bg-white shadow-sm mt-1">
            <p className="text-[13px] font-extrabold uppercase tracking-widest text-foreground">Marks Memo (MM)</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-[11px] mb-6 z-10 relative">
          <div className="flex items-end"><span className="font-bold w-24 shrink-0 pb-1">Hall Ticket No:</span><span className="font-mono font-bold text-sm border-b border-gray-500 flex-1 pb-1">{rollno}</span></div>
          <div className="flex items-end"><span className="font-bold w-16 shrink-0 pb-1">Course:</span><span className="border-b border-gray-500 flex-1 font-semibold pb-1">{branches[branchKey] || ""}</span></div>
          <div className="flex items-end"><span className="font-bold w-24 shrink-0 pb-1">Student Name:</span><span className="font-bold text-sm border-b border-gray-500 flex-1 uppercase pb-1">{d.NAME}</span></div>
          <div className="flex items-end"><span className="font-bold w-16 shrink-0 pb-1">Semester:</span><span className="border-b border-gray-500 flex-1 font-semibold pb-1">{SEM_LABEL[semester] || semester}</span></div>
          <div className="flex items-end"><span className="font-bold w-24 shrink-0 pb-1">Father's Name:</span><span className="border-b border-gray-500 flex-1 font-semibold uppercase pb-1">{d.FATHER_NAME}</span></div>
          <div className="flex items-end"><span className="font-bold w-16 shrink-0 pb-1">College:</span><span className="border-b border-gray-500 flex-1 font-semibold pb-1">{colleges[collegeCode] || collegeCode}</span></div>
        </div>

        <div className="flex-1 z-10 relative">
          <table className="w-full text-[11px] border-collapse mb-6">
            <thead>
              <tr className="bg-gray-100 border-t-2 border-b-2 border-gray-800 text-foreground">
                <th className="border border-gray-400 p-2 text-center w-10 font-bold">Sl.No</th>
                <th className="border border-gray-400 p-2 text-center w-20 font-bold">Code</th>
                <th className="border border-gray-400 p-2 text-left font-bold">Name of the Subject</th>
                <th className="border border-gray-400 p-2 text-center w-12 font-bold">Int</th>
                <th className="border border-gray-400 p-2 text-center w-12 font-bold">Ext</th>
                <th className="border border-gray-400 p-2 text-center w-12 font-bold">Total</th>
                <th className="border border-gray-400 p-2 text-center w-14 font-bold">Grade</th>
                <th className="border border-gray-400 p-2 text-center w-14 font-bold">Credits</th>
                <th className="border border-gray-400 p-2 text-center w-16 font-bold">Result</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map(([code, sub], idx) => {
                const g = grade(sub.grade);
                const pass = g !== "F" && g !== "AB";
                return (
                  <tr key={code} className="border-b border-gray-300">
                    <td className="border-x border-gray-400 p-2 text-center">{idx + 1}</td>
                    <td className="border-x border-gray-400 p-2 text-center font-mono">{code}</td>
                    <td className="border-x border-gray-400 p-2 font-medium">{sub.name}{sub.rcrv && <span className="text-amber-700 font-bold ml-1 text-[9px]">(RC)</span>}</td>
                    <td className="border-x border-gray-400 p-2 text-center">{sub.internal || "-"}</td>
                    <td className="border-x border-gray-400 p-2 text-center">{sub.external || "-"}</td>
                    <td className="border-x border-gray-400 p-2 text-center font-bold">{sub.total || "-"}</td>
                    <td className={`border-x border-gray-400 p-2 text-center font-bold ${pass ? "text-green-800" : "text-red-700"}`}>{g}</td>
                    <td className="border-x border-gray-400 p-2 text-center">{sub.credits}</td>
                    <td className={`border-x border-gray-400 p-2 text-center font-bold ${pass ? "text-green-800" : "text-red-700"}`}>{pass ? "PASS" : "FAIL"}</td>
                  </tr>
                );
              })}
              <tr className="border-t border-gray-800 bg-gray-50">
                 <td colSpan={7} className="border-x border-gray-400 p-2 text-right font-bold">Total Credits</td>
                 <td className="border-x border-gray-400 p-2 text-center font-bold text-sm">{creditsTotal}</td>
                 <td className="border-x border-gray-400 p-2"></td>
              </tr>
            </tbody>
          </table>

          <div className="mt-2 flex justify-between items-center border-2 border-gray-800 p-4 bg-gray-50/80 rounded-sm">
            <div className="flex gap-8 text-[11.5px]">
              {Number(data.SGPA) > 0 && <span className="font-bold text-foreground">Semester Grade Point Average (SGPA): <span className="text-sm ml-1 bg-white px-2 py-0.5 border border-gray-300 rounded">{Number(data.SGPA).toFixed(2)}</span></span>}
            </div>
            <div className="text-[11.5px] font-bold text-foreground flex items-center">
              Semester Result: <span className={`ml-2 text-sm px-3 py-1 rounded border ${overallResult === "PASSED" ? "bg-green-100 border-green-400 text-green-800" : "bg-red-100 border-red-400 text-red-800"}`}>{overallResult}</span>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-16 z-10 relative">
          <div className="grid grid-cols-3 text-[10px] text-center font-semibold">
            <div><div className="border-t border-gray-800 pt-2 mx-auto w-24 mt-12">Principal</div></div>
            <div><div className="border-t border-gray-800 pt-2 mx-auto w-24 mt-12">HOD</div></div>
            <div><div className="border-t border-gray-800 pt-2 mx-auto w-24 mt-12">Class Teacher</div></div>
          </div>
          <p className="text-center text-[6px] text-gray-400 mt-2 leading-tight">
            Generated by <span className="font-semibold">jntuhresultbp.vercel.app</span> — Not an official JNTUH document. Verify with official sources.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MmMemo({ data, semester, onClose }: MmMemoProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) { window.print(); return; }
    const styles = Array.from(document.querySelectorAll("style, link[rel=stylesheet]")).map(el => el.outerHTML).join("");
    printWindow.document.write(`<html><head><title>MM - ${data.Details.Roll_No}</title>${styles}<style>
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
      <div className="bg-card dark:bg-card border-b dark:border-gray-700 flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 z-20 shrink-0" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold text-xs sm:text-sm dark:text-white">MM Preview</h3>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button onClick={handlePrint} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary text-white text-[10px] sm:text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors">Print</button>
          {onClose && <button onClick={onClose} className="px-2 sm:px-3 py-1.5 sm:py-2 text-gray-500 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 text-[10px] sm:text-xs font-bold">Close</button>}
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-card dark:bg-card" onClick={(e) => e.stopPropagation()}>
        <div className="inline-block p-2 sm:p-4" ref={ref}>
          <Content data={data} semester={semester} />
        </div>
      </div>
    </div>
  );
}

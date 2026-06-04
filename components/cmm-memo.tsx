"use client";

import branches from "@/lib/branch";
import colleges from "@/lib/college";
import { useRef, useMemo } from "react";

function getAwardClass(cgpa: number, hasFailed: boolean, clearHistory: boolean): { label: string; short: string } {
  if (hasFailed) return { label: "FAILED", short: "FAIL" };
  if (cgpa <= 0) return { label: "PASSED", short: "PASS" };
  if (cgpa >= 7.75 && clearHistory) return { label: "First Class with Distinction", short: "FC-DIST" };
  if (cgpa >= 6.75) return { label: "First Class", short: "FC" };
  if (cgpa >= 6.00) return { label: "Second Class", short: "SC" };
  if (cgpa >= 5.00) return { label: "Pass Class", short: "PC" };
  return { label: "Not Eligible (CGPA below 5.00)", short: "FAIL" };
}

type SubjectData = { name: string; internal: string; external: string; total: string; grade: string; credits: string; rcrv?: boolean };
type HistoryEntry = { exam_code: string; type: string; year: number; result: any };
type SemesterEntry = { Result: Record<string, SubjectData>; SGPA: number | string; Failed_Subjects?: string[]; History?: HistoryEntry[] };

interface CmmMemoProps {
  data: { Details: { NAME: string; Roll_No: string; FATHER_NAME: string; COLLEGE_CODE: string }; Semesters: Record<string, SemesterEntry>; CGPA: number };
  onClose?: () => void;
}

function grade(g: string) { const u = g.toUpperCase(); return u === "A+" || u === "A_PLUS" ? "A+" : u; }

const YEAR_SEMS = [["1-1", "1-2"], ["2-1", "2-2"], ["3-1", "3-2"], ["4-1", "4-2"]];
const SEM_SHORT: Record<string, string> = { "1-1": "I-I", "1-2": "I-II", "2-1": "II-I", "2-2": "II-II", "3-1": "III-I", "3-2": "III-II", "4-1": "IV-I", "4-2": "IV-II" };
const YEAR_LABEL: Record<string, string> = { "1": "I YEAR", "2": "II YEAR", "3": "III YEAR", "4": "IV YEAR" };

function Content({ data }: { data: CmmMemoProps["data"] }) {
  const d = data.Details;
  const rollno = d.Roll_No || "";
  const collegeCode = d.COLLEGE_CODE as keyof typeof colleges;
  const branchKey = rollno.slice(6, 8) as keyof typeof branches;
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
  
  const isLateralEntry = rollno[4] === "5";

  const years = useMemo(() => {
    return YEAR_SEMS.map(([s1, s2]) => {
      const left = data.Semesters[s1];
      const right = data.Semesters[s2];
      const isFirstYear = s1 === "1-1";

      if (!left && !right) {
        if (isFirstYear && isLateralEntry) {
           return { yearKey: s1[0], s1, s2, leftSGPA: null, rightSGPA: null, rows: [], isLateralEntryBlank: true };
        }
        return null;
      }
      const leftSubjects = left ? Object.entries(left.Result) : [];
      const rightSubjects = right ? Object.entries(right.Result) : [];
      const maxLen = Math.max(leftSubjects.length, rightSubjects.length);
      const rows: Array<{ left: [string, SubjectData] | null; right: [string, SubjectData] | null }> = [];
      for (let i = 0; i < maxLen; i++) {
        rows.push({ left: leftSubjects[i] || null, right: rightSubjects[i] || null });
      }
      return { yearKey: s1[0], s1, s2, leftSGPA: left?.SGPA, rightSGPA: right?.SGPA, rows };
    }).filter(Boolean);
  }, [data.Semesters, isLateralEntry]);

  const totalCredits = useMemo(() =>
    Object.values(data.Semesters).reduce((acc, sem) =>
      acc + Object.values(sem.Result).reduce((s, sub) => s + Number(sub.credits || 0), 0), 0
  ), [data.Semesters]);

  const hasFailed = useMemo(() => {
    return Object.values(data.Semesters).some((sem) => 
      Object.values(sem.Result).some((sub) => {
        const g = grade(sub.grade);
        return g === "F" || g === "AB";
      })
    );
  }, [data.Semesters]);

  const clearHistory = useMemo(() => {
    return !Object.values(data.Semesters).some((sem) =>
      (sem.History || []).some((h: HistoryEntry) => h.type === "supply")
    );
  }, [data.Semesters]);

  const award = useMemo(() => getAwardClass(data.CGPA, hasFailed, clearHistory), [data.CGPA, hasFailed, clearHistory]);

  return (
    <div className="w-[794px] h-[1123px] bg-white text-black flex flex-col p-4" style={{ fontFamily: "Times New Roman, serif" }}>
      <div className="flex-1 border-[4px] border-double border-gray-800 p-4 flex flex-col relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]" style={{ printColorAdjust: "exact", WebkitPrintColorAdjust: "exact" }}>
          <span className="text-[120px] font-bold -rotate-45 tracking-widest text-center uppercase leading-tight text-gray-800 select-none">JNTUH<br/>HYDERABAD</span>
        </div>

        <div className="text-center border-b-2 border-gray-800 pb-2 mb-2 z-10 relative">
          <h1 className="text-[18px] font-extrabold tracking-wider uppercase mb-1 text-gray-900">Jawaharlal Nehru Technological University Hyderabad</h1>
          <div className="inline-block border-2 border-gray-800 px-4 py-1 rounded-full bg-white shadow-sm mt-1">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-gray-900">Consolidated Marks Memo (CMM)</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[9px] mb-4 z-10 relative">
          <div className="flex items-end"><span className="font-bold w-20 shrink-0 pb-0.5">Hall Ticket No:</span><span className="font-mono font-bold text-[10px] border-b border-gray-500 flex-1 pb-0.5">{rollno}</span></div>
          <div className="flex items-end"><span className="font-bold w-20 shrink-0 pb-0.5">Course:</span><span className="border-b border-gray-500 flex-1 font-semibold pb-0.5">{branches[branchKey] || ""}</span></div>
          <div className="flex items-end"><span className="font-bold w-20 shrink-0 pb-0.5">Student Name:</span><span className="font-bold text-[10px] border-b border-gray-500 flex-1 uppercase pb-0.5">{d.NAME}</span></div>
          <div className="flex items-end"><span className="font-bold w-20 shrink-0 pb-0.5">Father Name:</span><span className="border-b border-gray-500 flex-1 font-semibold uppercase pb-0.5">{d.FATHER_NAME}</span></div>
          <div className="flex items-end col-span-2"><span className="font-bold w-20 shrink-0 pb-0.5">College:</span><span className="border-b border-gray-500 flex-1 font-semibold pb-0.5">{colleges[collegeCode] || collegeCode}</span></div>
        </div>

        <div className="flex-1 space-y-1.5 z-10 relative">
          {years.map((year: any) => {
            if (!year) return null;
            if (year.isLateralEntryBlank) {
              return (
                <div key={year.yearKey} className="border border-gray-500 rounded-sm overflow-hidden flex flex-col h-[180px] bg-gray-50/40">
                  <div className="bg-gray-100 text-gray-900 border-b border-gray-500 text-[8px] font-bold text-center py-0.5 uppercase tracking-widest">
                    {YEAR_LABEL[year.yearKey] || `${year.yearKey} YEAR`}
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <span className="text-[12px] font-bold text-gray-600 uppercase tracking-widest italic border-b-2 border-gray-300 pb-1 px-4">
                      Directly admitted to second year
                    </span>
                  </div>
                </div>
              );
            }
            return (
              <div key={year.yearKey} className="border border-gray-500 rounded-sm overflow-hidden">
                <div className="bg-gray-100 text-gray-900 border-b border-gray-500 text-[8px] font-bold text-center py-0.5 uppercase tracking-widest">
                  {YEAR_LABEL[year.yearKey] || `${year.yearKey} YEAR`}
                </div>

                <table className="w-full text-[6.5px] border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-400">
                      <th className="border-r border-gray-400 p-0.5 text-center w-5 font-bold">S.No</th>
                      <th className="border-r border-gray-400 p-0.5 text-left font-bold">Subject Title</th>
                      <th className="border-r border-gray-400 p-0.5 text-center w-6 font-bold">Int</th>
                      <th className="border-r border-gray-400 p-0.5 text-center w-6 font-bold">Ext</th>
                      <th className="border-r border-gray-400 p-0.5 text-center w-7 font-bold">Total</th>
                      <th className="border-r border-gray-400 p-0.5 text-center w-7 font-bold">Grade</th>
                      <th className="border-r border-gray-400 p-0.5 text-center w-6 font-bold">Cred</th>
                      <th className="p-0.5 text-center w-1.5 bg-gray-200" />
                      <th className="border-r border-gray-400 p-0.5 text-center w-5 font-bold">S.No</th>
                      <th className="border-r border-gray-400 p-0.5 text-left font-bold">Subject Title</th>
                      <th className="border-r border-gray-400 p-0.5 text-center w-6 font-bold">Int</th>
                      <th className="border-r border-gray-400 p-0.5 text-center w-6 font-bold">Ext</th>
                      <th className="border-r border-gray-400 p-0.5 text-center w-7 font-bold">Total</th>
                      <th className="border-r border-gray-400 p-0.5 text-center w-7 font-bold">Grade</th>
                      <th className="p-0.5 text-center w-6 font-bold">Cred</th>
                    </tr>
                    <tr className="bg-gray-100 border-b border-gray-400 text-[6px] font-bold text-gray-800">
                      <th colSpan={7} className="border-r border-gray-400 p-0.5 text-center tracking-wider">{SEM_SHORT[year.s1] || year.s1}</th>
                      <th className="p-0.5 w-1.5 bg-gray-200" />
                      <th colSpan={7} className="p-0.5 text-center tracking-wider">{SEM_SHORT[year.s2] || year.s2}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {year.rows.map((row: any, idx: number) => (
                      <tr key={idx} className="border-b border-gray-300 last:border-b-0 leading-tight">
                        <td className="border-r border-gray-300 p-0.5 text-center">{row.left ? idx + 1 : ""}</td>
                        <td className="border-r border-gray-300 p-0.5 truncate max-w-[100px]">{row.left ? <>{row.left[1].name}{row.left[1].rcrv ? <span className="text-amber-700 font-bold ml-0.5">(RC)</span> : ""}</> : ""}</td>
                        <td className="border-r border-gray-300 p-0.5 text-center">{row.left ? row.left[1].internal || "-" : ""}</td>
                        <td className="border-r border-gray-300 p-0.5 text-center">{row.left ? row.left[1].external || "-" : ""}</td>
                        <td className="border-r border-gray-300 p-0.5 text-center font-bold">{row.left ? row.left[1].total || "-" : ""}</td>
                        <td className={`border-r border-gray-300 p-0.5 text-center font-bold ${row.left && grade(row.left[1].grade) !== "F" && grade(row.left[1].grade) !== "AB" ? "text-green-800" : row.left ? "text-red-700" : ""}`}>{row.left ? grade(row.left[1].grade) : ""}</td>
                        <td className="border-r border-gray-400 p-0.5 text-center">{row.left ? row.left[1].credits : ""}</td>

                        <td className="border-r border-gray-400 p-0.5 text-center bg-gray-200" />

                        <td className="border-r border-gray-300 p-0.5 text-center">{row.right ? idx + 1 : ""}</td>
                        <td className="border-r border-gray-300 p-0.5 truncate max-w-[100px]">{row.right ? <>{row.right[1].name}{row.right[1].rcrv ? <span className="text-amber-700 font-bold ml-0.5">(RC)</span> : ""}</> : ""}</td>
                        <td className="border-r border-gray-300 p-0.5 text-center">{row.right ? row.right[1].internal || "-" : ""}</td>
                        <td className="border-r border-gray-300 p-0.5 text-center">{row.right ? row.right[1].external || "-" : ""}</td>
                        <td className="border-r border-gray-300 p-0.5 text-center font-bold">{row.right ? row.right[1].total || "-" : ""}</td>
                        <td className={`border-r border-gray-300 p-0.5 text-center font-bold ${row.right && grade(row.right[1].grade) !== "F" && grade(row.right[1].grade) !== "AB" ? "text-green-800" : row.right ? "text-red-700" : ""}`}>{row.right ? grade(row.right[1].grade) : ""}</td>
                        <td className="p-0.5 text-center">{row.right ? row.right[1].credits : ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {(year.leftSGPA || year.rightSGPA) && (
                  <div className="flex justify-between text-[7px] bg-gray-100 border-t border-gray-400">
                     <div className="w-[calc(50%-3px)] border-r border-gray-400 p-0.5 text-right pr-4">
                       {year.leftSGPA && Number(year.leftSGPA) > 0 && <span className="font-bold text-gray-800">SGPA ({SEM_SHORT[year.s1]}): {Number(year.leftSGPA).toFixed(2)}</span>}
                     </div>
                     <div className="w-1.5 bg-gray-200 border-r border-gray-400" />
                     <div className="w-[calc(50%-3px)] p-0.5 text-right pr-4">
                       {year.rightSGPA && Number(year.rightSGPA) > 0 && <span className="font-bold text-gray-800">SGPA ({SEM_SHORT[year.s2]}): {Number(year.rightSGPA).toFixed(2)}</span>}
                     </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-2 flex justify-between items-center border-2 border-gray-800 p-2 bg-gray-50/80 rounded-sm z-10 relative">
          <div className="text-[7px] font-bold text-gray-700">
            Total Credits: <span className="text-[9px] ml-1 bg-white px-1.5 py-0.5 border border-gray-300 rounded">{totalCredits}</span>
          </div>
          {data.CGPA > 0 && (
            <div className="text-[7px] font-bold text-gray-700">
              CGPA: <span className="text-[9px] ml-1 bg-white px-1.5 py-0.5 border border-gray-300 rounded">{data.CGPA.toFixed(2)}</span>
            </div>
          )}
          <div className="text-[10px] font-bold text-gray-900 flex items-center gap-2">
            <span className="text-[7px] text-gray-600 uppercase tracking-wider">Award:</span>
            <span className={`px-2 py-0.5 rounded border text-[10px] font-black tracking-wide ${award.short === "FAIL" ? "bg-red-100 border-red-400 text-red-800" : "bg-green-100 border-green-400 text-green-800"}`}>
              {award.label.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="mt-auto pt-10 z-10 relative">
          <div className="grid grid-cols-3 text-[9px] text-center font-semibold">
            <div><div className="border-t border-gray-800 pt-2 mx-auto w-24 mt-6">Principal</div></div>
            <div><div className="border-t border-gray-800 pt-2 mx-auto w-24 mt-6">HOD</div></div>
            <div><div className="border-t border-gray-800 pt-2 mx-auto w-24 mt-6">Class Teacher</div></div>
          </div>
          <p className="text-center text-[5px] text-gray-400 mt-2 leading-tight">
            Generated by <span className="font-semibold">jntuhresultbp.vercel.app</span> — Not an official JNTUH document. Verify with official sources.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CmmMemo({ data, onClose }: CmmMemoProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) { window.print(); return; }
    const styles = Array.from(document.querySelectorAll("style, link[rel=stylesheet]")).map(el => el.outerHTML).join("");
    printWindow.document.write(`<html><head><title>CMM - ${data.Details.Roll_No}</title>${styles}<style>
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
        <h3 className="font-bold text-xs sm:text-sm dark:text-white">CMM Preview</h3>
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

"use client";

import { useState, useMemo } from "react";
import { Calculator, Plus, Trash2, RotateCcw, Info, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

interface Subject {
  id: number;
  name: string;
  credits: number;
  grade: string;
}

interface Semester {
  id: number;
  name: string;
  subjects: Subject[];
}

const REGULATIONS = ["R25", "R22", "R18", "R17", "R16", "R15", "R13"];
const DEGREES = ["btech", "bpharmacy"];
const MAX_SEMESTERS = 10;

const GRADE_MAPS: Record<string, { label: string; point: number }[]> = {
  r22_bpharmacy: [
    { label: "O", point: 10 },
    { label: "A", point: 9 },
    { label: "B", point: 8 },
    { label: "C", point: 7 },
    { label: "D", point: 6 },
    { label: "F", point: 0 },
    { label: "Ab", point: 0 },
  ],
  default: [
    { label: "O", point: 10 },
    { label: "A+", point: 9 },
    { label: "A", point: 8 },
    { label: "B+", point: 7 },
    { label: "B", point: 6 },
    { label: "C", point: 5 },
    { label: "F", point: 0 },
    { label: "Ab", point: 0 },
  ],
};

function getGradeOptions(regulation: string, degree: string) {
  if (degree === "bpharmacy" && (regulation === "R22" || regulation === "R25")) return GRADE_MAPS.r22_bpharmacy;
  return GRADE_MAPS.default;
}

const CREDIT_OPTIONS = [1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 8, 10];
const SEMESTER_NAMES = ["1-1", "1-2", "2-1", "2-2", "3-1", "3-2", "4-1", "4-2", "5-1", "5-2"];

let nextId = 1;
let nextSemId = 1;

function getDefaultSemesters(): Semester[] {
  return SEMESTER_NAMES.slice(0, 4).map((name) => ({
    id: nextSemId++,
    name,
    subjects: Array.from({ length: 6 }, () => ({
      id: nextId++,
      name: `Subject ${nextId - 1}`,
      credits: 3,
      grade: "B+",
    })),
  }));
}

export default function CgpaCalculator() {
  const [regulation, setRegulation] = useState("R25");
  const [degree, setDegree] = useState("btech");
  const [method, setMethod] = useState<"weighted" | "simple">("weighted");
  const [semesters, setSemesters] = useState<Semester[]>(getDefaultSemesters);

  const gradeOptions = useMemo(() => getGradeOptions(regulation, degree), [regulation, degree]);

  const getGradePoint = (gradeLabel: string): number => {
    const found = gradeOptions.find((g) => g.label === gradeLabel);
    return found ? found.point : 0;
  };

  const addSemester = () => {
    if (semesters.length >= MAX_SEMESTERS) return;
    const nameIdx = semesters.length;
    setSemesters([
      ...semesters,
      { id: nextSemId++, name: SEMESTER_NAMES[nameIdx] || `${Math.floor(nameIdx / 2) + 1}-${nameIdx % 2 === 0 ? 1 : 2}`, subjects: [
        { id: nextId++, name: "Subject 1", credits: 3, grade: "B+" },
        { id: nextId++, name: "Subject 2", credits: 3, grade: "B+" },
        { id: nextId++, name: "Subject 3", credits: 3, grade: "B+" },
        { id: nextId++, name: "Subject 4", credits: 3, grade: "B+" },
        { id: nextId++, name: "Subject 5", credits: 3, grade: "B+" },
        { id: nextId++, name: "Subject 6", credits: 3, grade: "B+" },
      ]},
    ]);
  };

  const removeSemester = (id: number) => {
    if (semesters.length <= 1) return;
    setSemesters(semesters.filter((s) => s.id !== id));
  };

  const updateSemesterName = (id: number, name: string) => {
    setSemesters(semesters.map((s) => (s.id === id ? { ...s, name } : s)));
  };

  const addSubjectToSemester = (semId: number) => {
    setSemesters(semesters.map((s) =>
      s.id === semId
        ? { ...s, subjects: [...s.subjects, { id: nextId++, name: `Subject ${s.subjects.length + 1}`, credits: 3, grade: "B+" }] }
        : s
    ));
  };

  const removeSubjectFromSemester = (semId: number, subId: number) => {
    setSemesters(semesters.map((s) =>
      s.id === semId
        ? { ...s, subjects: s.subjects.filter((sub) => sub.id !== subId) }
        : s
    ));
  };

  const updateSubject = (semId: number, subId: number, field: keyof Subject, value: string | number) => {
    setSemesters(semesters.map((s) =>
      s.id === semId
        ? { ...s, subjects: s.subjects.map((sub) => (sub.id === subId ? { ...sub, [field]: value } : sub)) }
        : s
    ));
  };

  const resetAll = () => {
    nextId = 1;
    nextSemId = 1;
    setSemesters(getDefaultSemesters());
  };

  // Compute SGPAs for each semester
  const semesterData = useMemo(() => {
    return semesters.map((sem) => {
      const totalCredits = sem.subjects.reduce((sum, s) => sum + s.credits, 0);
      const totalPoints = sem.subjects.reduce((sum, s) => sum + s.credits * getGradePoint(s.grade), 0);
      const sgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
      const hasFailed = sem.subjects.some((s) => s.grade === "F" || s.grade === "Ab");
      return { ...sem, totalCredits, totalPoints, sgpa, hasFailed };
    });
  }, [semesters, gradeOptions]);

  // CGPA calculation
  const { cgpa, totalCredits, totalPoints, methodLabel } = useMemo(() => {
    const semData = semesterData.filter((s) => s.totalCredits > 0);
    const tc = semData.reduce((sum, s) => sum + s.totalCredits, 0);
    const tp = semData.reduce((sum, s) => sum + s.totalPoints, 0);

    if (method === "weighted") {
      // Σ(all credits×grades) / Σ(all credits) across all semesters
      return { cgpa: tc > 0 ? (tp / tc) : 0, totalCredits: tc, totalPoints: tp, methodLabel: "Weighted Average (All subjects combined)" };
    } else {
      // Simple average of SGPAs
      const validSgpas = semData.filter((s) => !s.hasFailed).map((s) => s.sgpa);
      const avg = validSgpas.length > 0 ? validSgpas.reduce((a, b) => a + b, 0) / validSgpas.length : 0;
      return { cgpa: avg, totalCredits: tc, totalPoints: tp, methodLabel: "Simple Average (of semester SGPAs)" };
    }
  }, [semesterData, method]);

  const hasFailed = semesterData.some((s) => s.hasFailed);
  const cgpaFormatted = cgpa.toFixed(2);
  const totalSubjects = semesters.reduce((sum, s) => sum + s.subjects.length, 0);

  return (
    <main className="min-h-screen bg-background dark:bg-background">
      <div className="bg-card dark:bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-8 sm:py-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-secondary text-primary">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">CGPA Calculator</h1>
              <p className="text-muted-foreground text-sm mt-0.5">Calculate your cumulative grade point average across all semesters</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Settings */}
        <Card className="shadow-sm overflow-hidden mb-6">
          <div className="h-1 bg-linear-to-r from-green-600 to-emerald-600" />
          <CardContent className="p-5 sm:p-6">
            <h2 className="text-lg font-bold mb-4">Settings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Regulation</label>
                <NativeSelect value={regulation} onChange={(e) => setRegulation(e.target.value)} className="h-10 w-full rounded-xl text-sm">
                  {REGULATIONS.map((r) => (<NativeSelectOption key={r} value={r}>{r}</NativeSelectOption>))}
                </NativeSelect>
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Degree</label>
                <NativeSelect value={degree} onChange={(e) => setDegree(e.target.value)} className="h-10 w-full rounded-xl text-sm">
                  {DEGREES.map((d) => (<NativeSelectOption key={d} value={d}>{d === "btech" ? "B.Tech" : "B.Pharmacy"}</NativeSelectOption>))}
                </NativeSelect>
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">CGPA Method</label>
                <NativeSelect value={method} onChange={(e) => setMethod(e.target.value as "weighted" | "simple")} className="h-10 w-full rounded-xl text-sm">
                  <NativeSelectOption value="weighted">Weighted (recommended)</NativeSelectOption>
                  <NativeSelectOption value="simple">Simple Average</NativeSelectOption>
                </NativeSelect>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              {degree === "bpharmacy" && (regulation === "R22" || regulation === "R25")
                ? "R22/R25 B.Pharmacy: O(10)/A(9)/B(8)/C(7)/D(6)"
                : "O(10)/A+(9)/A(8)/B+(7)/B(6)/C(5)"}
              {" · "}
              {method === "weighted"
                ? "Weighted: Σ(all credits × grades) / Σ(all credits)"
                : "Simple: average of each semester's SGPA"}
            </p>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Semesters */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-foreground">Semesters ({semesters.length})</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={resetAll} className="rounded-xl gap-1.5">
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </Button>
                <Button size="sm" onClick={addSemester} disabled={semesters.length >= MAX_SEMESTERS} className="rounded-xl gap-1.5 bg-green-600 hover:bg-green-700 disabled:opacity-50">
                  <Plus className="h-3.5 w-3.5" /> Add Semester
                </Button>
              </div>
            </div>

            {semesterData.map((sem, semIdx) => (
              <Card key={sem.id} className="shadow-sm overflow-hidden">
                <div className="h-1 bg-linear-to-r from-green-600 to-emerald-600" />
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-400">#{semIdx + 1}</span>
                      <Input
                        value={sem.name}
                        onChange={(e) => updateSemesterName(sem.id, e.target.value)}
                        className="h-8 w-24 rounded-lg text-sm font-bold"
                        placeholder="Sem name"
                      />
                      {sem.hasFailed && (
                        <span className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/30 px-2 py-0.5 rounded">FAIL</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-xs text-muted-foreground">SGPA </span>
                        <span className={`text-lg font-black ${sem.hasFailed ? "text-red-600" : "text-primary"}`}>
                          {sem.hasFailed ? "FAIL" : sem.sgpa.toFixed(2)}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSemester(sem.id)}
                        disabled={semesters.length <= 1}
                        className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="hidden sm:grid grid-cols-12 gap-2 px-1 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      <div className="col-span-4">Subject</div>
                      <div className="col-span-2">Credits</div>
                      <div className="col-span-3">Grade</div>
                      <div className="col-span-2">Points</div>
                      <div className="col-span-1" />
                    </div>

                    {sem.subjects.map((sub) => {
                      const gp = getGradePoint(sub.grade);
                      const pts = sub.credits * gp;
                      return (
                        <div key={sub.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center p-2 bg-secondary dark:bg-secondary rounded-lg">
                          <div className="col-span-4">
                            <Input
                              value={sub.name}
                              onChange={(e) => updateSubject(sem.id, sub.id, "name", e.target.value)}
                              className="h-8 rounded-lg text-sm"
                              placeholder="Subject"
                            />
                          </div>
                          <div className="col-span-2">
                            <NativeSelect
                              value={String(sub.credits)}
                              onChange={(e) => updateSubject(sem.id, sub.id, "credits", parseFloat(e.target.value))}
                              className="h-8 w-full rounded-lg text-sm"
                            >
                              {CREDIT_OPTIONS.map((c) => (<NativeSelectOption key={c} value={String(c)}>{c} cr</NativeSelectOption>))}
                            </NativeSelect>
                          </div>
                          <div className="col-span-3">
                            <NativeSelect
                              value={sub.grade}
                              onChange={(e) => updateSubject(sem.id, sub.id, "grade", e.target.value)}
                              className="h-8 w-full rounded-lg text-sm"
                            >
                              {gradeOptions.map((g) => (<NativeSelectOption key={g.label} value={g.label}>{g.label} ({g.point})</NativeSelectOption>))}
                            </NativeSelect>
                          </div>
                          <div className="col-span-2 text-center">
                            <span className="text-sm font-bold text-foreground">{sub.credits} × {gp} = <span className={pts > 0 ? "text-primary" : "text-red-600"}>{pts}</span></span>
                          </div>
                          <div className="col-span-1 flex justify-end">
                            <Button variant="ghost" size="sm" onClick={() => removeSubjectFromSemester(sem.id, sub.id)} disabled={sem.subjects.length <= 1} className="h-7 w-7 p-0 text-gray-400 hover:text-red-600">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Button variant="outline" size="sm" onClick={() => addSubjectToSemester(sem.id)} className="mt-3 rounded-lg gap-1 text-xs">
                    <Plus className="h-3 w-3" /> Add Subject
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Result Sidebar */}
          <div className="space-y-4">
            <Card className="shadow-sm overflow-hidden sticky top-24">
              <div className="h-1 bg-linear-to-r from-primary to-primary/80" />
              <CardContent className="p-6">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Your CGPA</h3>

                <div className="text-center mb-6">
                  <div className={`text-6xl font-black mb-1 ${hasFailed ? "text-red-600" : "text-primary"}`}>
                    {hasFailed ? "FAIL" : cgpaFormatted}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {hasFailed ? "Contains failed subjects" :
                     parseFloat(cgpaFormatted) >= 9 ? "Outstanding!" :
                     parseFloat(cgpaFormatted) >= 8 ? "Excellent!" :
                     parseFloat(cgpaFormatted) >= 7 ? "Good job!" :
                     parseFloat(cgpaFormatted) >= 6 ? "Keep improving!" :
                     parseFloat(cgpaFormatted) >= 5 ? "You passed!" :
                     "Needs improvement"}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{methodLabel}</div>
                </div>

                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Semesters</span>
                    <span className="font-bold text-foreground">{semesters.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Subjects</span>
                    <span className="font-bold text-foreground">{totalSubjects}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Credits</span>
                    <span className="font-bold text-foreground">{totalCredits}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Points</span>
                    <span className="font-bold text-foreground">{totalPoints}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Semester Breakdown</h4>
                  <div className="space-y-2">
                    {semesterData.map((sem) => (
                      <div key={sem.id} className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{sem.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">{sem.totalCredits}cr</span>
                          <span className={`font-bold ${sem.hasFailed ? "text-red-600" : "text-primary"}`}>
                            {sem.hasFailed ? "FAIL" : sem.sgpa.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-card dark:bg-card rounded-3xl border border-border p-8 sm:p-12 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Info className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">How is CGPA Calculated?</h2>
          </div>
          <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
            <p>
              <strong className="text-foreground">CGPA (Cumulative Grade Point Average)</strong> is the overall grade point average across all semesters.
            </p>

            <h3 className="text-lg font-bold text-foreground pt-4">Method 1: Weighted Average (Recommended)</h3>
            <p>Takes every subject from every semester and computes one weighted average. Most accurate representation of your overall performance.</p>
            <div className="p-4 bg-secondary dark:bg-secondary rounded-xl font-mono text-sm font-bold text-center">
              CGPA = Σ (all credits × all grades) across all semesters / Σ (all credits)
            </div>

            <h3 className="text-lg font-bold text-foreground pt-4">Method 2: Simple Average</h3>
            <p>Computes each semester's SGPA first, then takes the average of those SGPAs. Simpler but treats each semester equally regardless of credit load.</p>
            <div className="p-4 bg-secondary dark:bg-secondary rounded-xl font-mono text-sm font-bold text-center">
              CGPA = Σ (SGPA of each semester) / (number of semesters)
            </div>

            <h3 className="text-lg font-bold text-foreground pt-4">Grading Systems by Regulation</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 bg-secondary dark:bg-secondary rounded-xl border border-border">
                <h4 className="font-bold text-foreground text-sm mb-2">R22/R25 B.Pharmacy</h4>
                <p className="text-xs">O(10) → A(9) → B(8) → C(7) → D(6) → F(0)</p>
              </div>
              <div className="p-4 bg-secondary dark:bg-secondary rounded-xl border border-border">
                <h4 className="font-bold text-foreground text-sm mb-2">All Other Regulations</h4>
                <p className="text-xs">O(10) → A+(9) → A(8) → B+(7) → B(6) → C(5) → F(0)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState, useMemo } from "react";
import { Calculator, Plus, Trash2, RotateCcw, Info } from "lucide-react";
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

const REGULATIONS = ["R25", "R22", "R18", "R17", "R16", "R15", "R13"];
const DEGREES = ["btech", "bpharmacy"];

const GRADE_MAPS: Record<string, { label: string; point: number }[]> = {
  // R22 B.Pharmacy uses O/A/B/C/D
  r22_bpharmacy: [
    { label: "O", point: 10 },
    { label: "A", point: 9 },
    { label: "B", point: 8 },
    { label: "C", point: 7 },
    { label: "D", point: 6 },
    { label: "F", point: 0 },
    { label: "Ab", point: 0 },
  ],
  // All others use O/A+/A/B+/B/C
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
  if (degree === "bpharmacy" && (regulation === "R22" || regulation === "R25")) {
    return GRADE_MAPS.r22_bpharmacy;
  }
  return GRADE_MAPS.default;
}

const CREDIT_OPTIONS = [1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 8, 10];

let nextId = 1;

function getDefaultSubjects(): Subject[] {
  return Array.from({ length: 6 }, () => ({
    id: nextId++,
    name: `Subject ${nextId - 1}`,
    credits: 3,
    grade: "B+",
  }));
}

export default function SgpaCalculator() {
  const [regulation, setRegulation] = useState("R25");
  const [degree, setDegree] = useState("btech");
  const [subjects, setSubjects] = useState<Subject[]>(getDefaultSubjects);

  const gradeOptions = useMemo(() => getGradeOptions(regulation, degree), [regulation, degree]);

  const addSubject = () => {
    setSubjects([...subjects, { id: nextId++, name: `Subject ${nextId - 1}`, credits: 3, grade: "B+" }]);
  };

  const removeSubject = (id: number) => {
    if (subjects.length <= 1) return;
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const updateSubject = (id: number, field: keyof Subject, value: string | number) => {
    setSubjects(subjects.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const resetAll = () => {
    nextId = 1;
    setSubjects(getDefaultSubjects());
  };

  const getGradePoint = (gradeLabel: string): number => {
    const found = gradeOptions.find((g) => g.label === gradeLabel);
    return found ? found.point : 0;
  };

  const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
  const totalPoints = subjects.reduce((sum, s) => sum + s.credits * getGradePoint(s.grade), 0);
  const sgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";

  const hasFailed = subjects.some((s) => s.grade === "F" || s.grade === "Ab");

  return (
    <main className="min-h-screen bg-background dark:bg-background">
      <div className="bg-card dark:bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-8 sm:py-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-secondary text-primary">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">SGPA Calculator</h1>
              <p className="text-muted-foreground text-sm mt-0.5">Calculate your semester grade point average instantly</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Regulation & Degree Selection */}
        <Card className="shadow-sm overflow-hidden mb-6">
          <div className="h-1 bg-linear-to-r from-primary to-primary/80" />
          <CardContent className="p-5 sm:p-6">
            <h2 className="text-lg font-bold mb-4">Select Regulation & Degree</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Regulation</label>
                <NativeSelect
                  value={regulation}
                  onChange={(e) => setRegulation(e.target.value)}
                  className="h-10 w-full rounded-xl text-sm"
                >
                  {REGULATIONS.map((r) => (
                    <NativeSelectOption key={r} value={r}>{r}</NativeSelectOption>
                  ))}
                </NativeSelect>
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Degree</label>
                <NativeSelect
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="h-10 w-full rounded-xl text-sm"
                >
                  {DEGREES.map((d) => (
                    <NativeSelectOption key={d} value={d}>{d === "btech" ? "B.Tech" : "B.Pharmacy"}</NativeSelectOption>
                  ))}
                </NativeSelect>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              {degree === "bpharmacy" && (regulation === "R22" || regulation === "R25")
                ? "R22/R25 B.Pharmacy uses O/A/B/C/D grading (no + grades)"
                : "Uses O/A+/A/B+/B/C grading system"}
            </p>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="shadow-sm overflow-hidden">
              <div className="h-1 bg-linear-to-r from-primary to-primary/80" />
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold">Enter Your Subjects</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={resetAll} className="rounded-xl gap-1.5">
                      <RotateCcw className="h-3.5 w-3.5" />
                      Reset
                    </Button>
                    <Button size="sm" onClick={addSubject} className="rounded-xl gap-1.5 bg-primary hover:bg-primary/90">
                      <Plus className="h-3.5 w-3.5" />
                      Add Subject
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="hidden sm:grid grid-cols-12 gap-3 px-1 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    <div className="col-span-1">#</div>
                    <div className="col-span-4">Subject Name</div>
                    <div className="col-span-2">Credits</div>
                    <div className="col-span-3">Grade</div>
                    <div className="col-span-1 text-center">GP</div>
                    <div className="col-span-1" />
                  </div>

                  {subjects.map((subject, index) => {
                    const gp = getGradePoint(subject.grade);
                    return (
                      <div
                        key={subject.id}
                        className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center p-3 bg-secondary dark:bg-secondary rounded-xl"
                      >
                        <div className="col-span-1 text-sm font-bold text-gray-400 hidden sm:block">{index + 1}</div>
                        <div className="col-span-4">
                          <Input
                            placeholder="Subject name"
                            value={subject.name}
                            onChange={(e) => updateSubject(subject.id, "name", e.target.value)}
                            className="h-9 rounded-lg text-sm"
                          />
                        </div>
                        <div className="col-span-2">
                          <NativeSelect
                            value={String(subject.credits)}
                            onChange={(e) => updateSubject(subject.id, "credits", parseFloat(e.target.value))}
                            className="h-9 w-full rounded-lg text-sm"
                          >
                            {CREDIT_OPTIONS.map((c) => (
                              <NativeSelectOption key={c} value={String(c)}>
                                {c} cr
                              </NativeSelectOption>
                            ))}
                          </NativeSelect>
                        </div>
                        <div className="col-span-3">
                          <NativeSelect
                            value={subject.grade}
                            onChange={(e) => updateSubject(subject.id, "grade", e.target.value)}
                            className="h-9 w-full rounded-lg text-sm"
                          >
                            {gradeOptions.map((g) => (
                              <NativeSelectOption key={g.label} value={g.label}>
                                {g.label} ({g.point})
                              </NativeSelectOption>
                            ))}
                          </NativeSelect>
                        </div>
                        <div className="col-span-1 text-center">
                          <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${
                            gp >= 7 ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                            gp >= 5 ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400" :
                            "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                          }`}>
                            {gp}
                          </span>
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSubject(subject.id)}
                            disabled={subjects.length <= 1}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Result Sidebar */}
          <div className="space-y-4">
            <Card className="shadow-sm overflow-hidden sticky top-24">
              <div className="h-1 bg-linear-to-r from-primary to-primary/80" />
              <CardContent className="p-6">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Your SGPA</h3>
                
                <div className="text-center mb-6">
                  <div className={`text-6xl font-black mb-1 ${hasFailed ? "text-red-600" : "text-primary"}`}>
                    {hasFailed ? "FAIL" : sgpa}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {hasFailed ? "You have failed subjects" :
                     parseFloat(sgpa) >= 9 ? "Outstanding!" :
                     parseFloat(sgpa) >= 8 ? "Excellent!" :
                     parseFloat(sgpa) >= 7 ? "Good job!" :
                     parseFloat(sgpa) >= 6 ? "Keep improving!" :
                     parseFloat(sgpa) >= 5 ? "You passed!" :
                     "Needs improvement"}
                  </div>
                </div>

                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Credits</span>
                    <span className="font-bold text-foreground">{totalCredits}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Points</span>
                    <span className="font-bold text-foreground">{totalPoints}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subjects</span>
                    <span className="font-bold text-foreground">{subjects.length}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Grade Breakdown</h4>
                  <div className="space-y-2">
                    {subjects.map((s) => {
                      const gp = getGradePoint(s.grade);
                      return (
                        <div key={s.id} className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground truncate max-w-[120px]">{s.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">{s.credits}cr</span>
                            <span className={`font-bold ${
                              gp >= 7 ? "text-primary" : gp >= 5 ? "text-amber-600" : "text-red-600"
                            }`}>
                              {s.grade}
                            </span>
                          </div>
                        </div>
                      );
                    })}
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
            <h2 className="text-xl font-bold text-foreground">How is SGPA Calculated?</h2>
          </div>
          <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
            <p>
              <strong className="text-foreground">SGPA (Semester Grade Point Average)</strong> is the weighted average of grade points obtained in all subjects during a semester.
            </p>
            <p>The formula is:</p>
            <div className="p-4 bg-secondary dark:bg-secondary rounded-xl font-mono text-sm font-bold text-center">
              SGPA = Σ (Credits × Grade Point) / Σ (Credits)
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

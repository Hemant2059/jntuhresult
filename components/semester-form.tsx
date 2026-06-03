"use client";

import { useState, useRef, startTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Loader2, Search, BookOpen, RefreshCw } from "lucide-react";
import { semesterResult } from "@/action/results";
import SemesterTable from "./semester-table";
import { NativeSelect, NativeSelectOption } from "./ui/native-select";
import { useActionState } from "react";

async function clearCacheAndRetry(formData: FormData, retryAction: (formData: FormData) => void) {
  try {
    await fetch("https://jntuh-api.onrender.com/refresh-cache", { cache: 'no-store' });
  } catch {
    // silently fail
  }
  startTransition(() => {
    retryAction(formData);
  });
}

const SEMESTERS = [
  { value: "1-1", label: "Year 1, Semester 1" },
  { value: "1-2", label: "Year 1, Semester 2" },
  { value: "2-1", label: "Year 2, Semester 1" },
  { value: "2-2", label: "Year 2, Semester 2" },
  { value: "3-1", label: "Year 3, Semester 1" },
  { value: "3-2", label: "Year 3, Semester 2" },
  { value: "4-1", label: "Year 4, Semester 1" },
  { value: "4-2", label: "Year 4, Semester 2" },
];

export default function SemesterForm() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [hallticket, setHallticket] = useState("");
  const [semester, setSemester] = useState("");

  const [state, formAction, isPending] = useActionState(semesterResult, {
    success: false,
    data: null,
    error: null,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current ?? e.currentTarget;
    const fd = new FormData(form);
    startTransition(() => {
      formAction(fd);
    });
  };

  const isFormValid = hallticket.trim() && semester;

  return (
    <div className="space-y-6 my-4">
      <Card className="max-w-2xl mx-auto shadow-sm overflow-hidden print:hidden">
        <div className="h-1 bg-linear-to-r from-indigo-600 to-blue-600" />
        <CardContent className="p-5 sm:p-6">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-0.5">
              <BookOpen className="h-4 w-4 text-indigo-600" />
              <h2 className="text-xl font-bold">Semester Result</h2>
            </div>
            <p className="text-muted-foreground text-xs">
              Check your performance for a specific semester.
            </p>
          </div>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Hall Ticket No"
                  name="hallticket"
                  value={hallticket}
                  onChange={(e) => setHallticket(e.target.value.toUpperCase().replace(/\s+/g, ""))}
                  className="pl-9 h-10 rounded-xl text-sm"
                  maxLength={10}
                  minLength={10}
                  disabled={isPending}
                />
              </div>

              <div className="relative">
                <NativeSelect
                  name="semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  disabled={isPending}
                  className="h-10 w-full rounded-xl text-sm"
                >
                  <NativeSelectOption value="">
                    Select Semester
                  </NativeSelectOption>
                  {SEMESTERS.map((sem) => (
                    <NativeSelectOption key={sem.value} value={sem.value}>
                      {sem.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending || !isFormValid}
              className="w-full h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all active:scale-95 text-sm font-semibold"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  Searching Results...
                </>
              ) : (
                "Show Result"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isPending && (
        <Card className="max-w-2xl mx-auto p-8 text-center space-y-3 border-none shadow-none bg-transparent">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-indigo-100 dark:bg-indigo-900/30 animate-ping opacity-25" />
            <Loader2 className="h-8 w-8 animate-spin relative text-indigo-600" />
          </div>
          <div className="space-y-0.5">
            <p className="text-base font-semibold">Loading semester data</p>
            <p className="text-muted-foreground text-sm">Checking JNTUH database...</p>
          </div>
        </Card>
      )}

      {!isPending && state.error && (
        <Card className="max-w-2xl mx-auto p-4 border-destructive/20 bg-destructive/5 rounded-xl">
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
              <AlertCircle className="h-4 w-4 text-destructive" />
            </div>
            <div className="space-y-0.5 flex-1">
              <p className="font-bold text-destructive text-sm">Error Occurred</p>
              <p className="text-xs text-destructive/80">{state.error}</p>
              <Button variant="outline" size="sm" className="mt-2 h-8 text-xs" onClick={() => {
                  const form = formRef.current;
                  if (form) {
                    const fd = new FormData(form);
                    clearCacheAndRetry(fd, formAction);
                  }
                }}>
                <RefreshCw className="h-3 w-3 mr-1.5" />
                Clear Cache & Retry
              </Button>
            </div>
          </div>
        </Card>
      )}

      {state.success && state.data && !isPending && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <SemesterTable data={state.data} semester={semester} />
        </div>
      )}

      {!isPending && !state.success && !state.error && (
        <div className="max-w-2xl mx-auto py-12 text-center opacity-40">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground font-medium">
            Select semester and enter hall ticket
          </p>
        </div>
      )}
    </div>
  );
}

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
    await fetch("https://jntuh-api.vercel.app/refresh-cache", { cache: 'no-store' });
  } catch (e) {
    console.error("Failed to clear cache");
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
      <Card className="max-w-2xl mx-auto shadow-md border-gray-100 overflow-hidden print:hidden">
        <div className="p-1 bg-linear-to-r from-indigo-600 to-blue-600" />
        <CardContent className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Semester Result
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Check your performance for a specific semester.
            </p>
          </div>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Hall Ticket No"
                  name="hallticket"
                  value={hallticket}
                  onChange={(e) =>
                    setHallticket(
                      e.target.value.toUpperCase().replace(/\s+/g, ""),
                    )
                  }
                  className="pl-10 h-12 rounded-xl border-gray-200 focus:border-indigo-500 transition-all"
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
                  className="h-12 w-full rounded-xl border-gray-200 focus:border-indigo-500"
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
              className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all active:scale-95 text-base font-semibold"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching Results...
                </>
              ) : (
                "Show Result"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Loading */}
      {isPending && (
        <Card className="max-w-2xl mx-auto p-12 text-center space-y-4 border-none shadow-none bg-transparent">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-indigo-100 animate-ping opacity-25" />
            <Loader2 className="h-12 w-12 animate-spin relative text-indigo-600" />
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-900">
              Loading semester data
            </p>
            <p className="text-gray-500">Checking JNTUH database...</p>
          </div>
        </Card>
      )}

      {/* Error */}
      {!isPending && state.error && (
        <Card className="max-w-2xl mx-auto p-6 border-red-100 bg-red-50/50 rounded-2xl">
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div className="space-y-1 flex-1">
              <p className="font-bold text-red-900">Error Occurred</p>
              <p className="text-sm text-red-700">{state.error}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 border-red-200 text-red-700 hover:bg-red-100 hover:text-red-800"
                onClick={() => {
                  const form = formRef.current;
                  if (form) {
                    const fd = new FormData(form);
                    clearCacheAndRetry(fd, formAction);
                  }
                }}
              >
                <RefreshCw className="h-3.5 w-3.5 mr-2" />
                Clear Cache & Retry
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Success */}
      {state.success && state.data && !isPending && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <SemesterTable data={state.data} semester={semester} />
        </div>
      )}

      {/* Empty */}
      {!isPending && !state.success && !state.error && (
        <div className="max-w-2xl mx-auto py-12 text-center opacity-40">
          <BookOpen className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium">
            Select semester and enter hall ticket
          </p>
        </div>
      )}
    </div>
  );
}

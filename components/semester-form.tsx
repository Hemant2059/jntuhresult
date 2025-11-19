"use client";

import { useState, useRef, startTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { semesterResult } from "@/action/results";
import SemesterTable from "./semester-table";
import { NativeSelect, NativeSelectOption } from "./ui/native-select";
import { useActionState } from "react";

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
      {/* FORM */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-4 max-w-lg mx-auto print:hidden"
      >
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="text"
            placeholder="Enter your hall ticket number"
            name="hallticket"
            value={hallticket}
            onChange={(e) => setHallticket(e.target.value.toUpperCase())}
            className="flex-1"
            maxLength={10}
            minLength={10}
            disabled={isPending}
          />

          <NativeSelect
            name="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            disabled={isPending}
          >
            <NativeSelectOption value="">Select a semester</NativeSelectOption>
            {SEMESTERS.map((sem) => (
              <NativeSelectOption key={sem.value} value={sem.value}>
                {sem.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>

          <Button
            type="submit"
            disabled={isPending || !isFormValid}
            className="w-full sm:w-auto"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              "Search"
            )}
          </Button>
        </div>
      </form>

      {/* Loading */}
      {isPending && (
        <Card className="p-8 text-center space-y-2">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">
            Fetching your semester results...
          </p>
        </Card>
      )}

      {/* Error */}
      {!isPending && state.error && (
        <Card className="p-6 border-destructive/50 bg-destructive/5 max-w-2xl mx-auto">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
            <div>
              <p className="font-semibold text-destructive">Error</p>
              <p className="text-sm">{state.error}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Success */}
      {state.success && state.data && !isPending && (
        <div className="max-w-2xl mx-auto space-y-4">
          <SemesterTable data={state.data} semester={semester} />
        </div>
      )}

      {/* Empty */}
      {!isPending && !state.success && !state.error && (
        <Card className="p-8 text-center text-muted-foreground max-w-2xl mx-auto">
          <p>
            Enter your hall ticket number, select a semester, and click search
            to view results.
          </p>
        </Card>
      )}
    </div>
  );
}

"use client";

import { useRef, useState, startTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { classResult } from "@/action/results";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { useActionState } from "react";
import DataTable from "./data-table";
import ClassResultTable from "./classresult-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubjectPassFailChart from "./subjectpassfail-chart";

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

export default function ClassResultForm() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [semester, setSemester] = useState("");

  const [state, formAction, isPending] = useActionState(classResult, {
    success: false,
    data: null,
    error: null,
  });

  const isFormValid = start.trim() && end.trim() && semester !== "sem";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = formRef.current ?? e.currentTarget;
    const fd = new FormData(form);

    // Prevent the warning and handle async correctly
    startTransition(() => {
      formAction(fd);
    });
  };

  return (
    <div className="space-y-6 my-4 max-w-screen px-6">
      {/* Form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-4 print:hidden max-w-2xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="text"
            name="start"
            placeholder="Enter starting hall ticket number"
            value={start}
            onChange={(e) => setStart(e.target.value.toUpperCase())}
            className="flex-1"
            maxLength={10}
            minLength={10}
            disabled={isPending}
          />

          <Input
            type="text"
            name="end"
            placeholder="Enter ending hall ticket number"
            value={end}
            onChange={(e) => setEnd(e.target.value.toUpperCase())}
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
            <NativeSelectOption value="sem" disabled>
              Semester
            </NativeSelectOption>

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
      {state.error && !isPending && (
        <Card className="p-6 border-destructive/50 bg-destructive/5 max-w-2xl mx-auto">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-destructive">Error</p>
              <p className="text-sm">{state.error}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Success */}
      {state.success && state.data && !isPending && (
        <div className="space-y-4">
          <Tabs defaultValue="classTable">
            <TabsList>
              <TabsTrigger value="classTable">Class Result</TabsTrigger>
              <TabsTrigger value="dataTable">Table Result</TabsTrigger>
              <TabsTrigger value="datachart">Chart Result</TabsTrigger>
            </TabsList>
            <TabsContent value="classTable">
              <ClassResultTable data={state.data} semester={semester} />
            </TabsContent>
            <TabsContent value="dataTable">
              <DataTable data={state.data} semester={semester} />
            </TabsContent>
            <TabsContent value="datachart">
              <SubjectPassFailChart data={state.data} />
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Empty */}
      {!isPending && !state.success && !state.error && (
        <Card className="p-8 text-center text-muted-foreground max-w-2xl mx-auto">
          <p>
            Enter your hall ticket number, select a semester, and click search
            to view results
          </p>
        </Card>
      )}
    </div>
  );
}

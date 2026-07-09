"use client";

import { useRef, useState, startTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Loader2, Users } from "lucide-react";
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
  const [semester, setSemester] = useState("1-1");

  const [state, formAction, isPending] = useActionState(classResult, {
    success: false,
    data: null,
    error: null,
  });

  const isFormValid = start.trim() && end.trim() && semester !== "sem" && semester !== "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current ?? e.currentTarget;
    const fd = new FormData(form);
    startTransition(() => {
      formAction(fd);
    });
  };

  return (
    <div className="space-y-6 my-4 max-w-full px-0 sm:px-0">
      <Card className="max-w-4xl mx-auto shadow-sm overflow-hidden print:hidden">
        <div className="h-1 bg-linear-to-r from-purple-600 to-indigo-600" />
        <CardContent className="p-5 sm:p-6">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-0.5">
              <Users className="h-4 w-4 text-primary" />
              <h2 className="text-xl font-bold">Class Analysis</h2>
            </div>
            <p className="text-muted-foreground text-xs">
              Generate results and performance charts for an entire class range.
            </p>
          </div>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="relative">
                <Input
                  type="text"
                  name="start"
                  placeholder="Start Hall Ticket"
                  value={start}
                  onChange={(e) => setStart(e.target.value.toUpperCase().replace(/\s+/g, ""))}
                  className="h-10 rounded-xl text-sm"
                  maxLength={10}
                  minLength={10}
                  disabled={isPending}
                />
              </div>

              <div className="relative">
                <Input
                  type="text"
                  name="end"
                  placeholder="End Hall Ticket"
                  value={end}
                  onChange={(e) => setEnd(e.target.value.toUpperCase().replace(/\s+/g, ""))}
                  className="h-10 rounded-xl text-sm"
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
                  <NativeSelectOption value="sem" disabled>
                    Semester
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
              className="w-full h-10 rounded-xl bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/20 transition-all text-sm font-semibold"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  Analyzing Class Results...
                </>
              ) : (
                "Run Analysis"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isPending && (
        <Card className="max-w-4xl mx-auto p-8 text-center space-y-3 border-none shadow-none bg-transparent">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-purple-100 dark:bg-purple-900/30 animate-ping opacity-25" />
            <Loader2 className="h-8 w-8 animate-spin relative text-primary" />
          </div>
          <div className="space-y-0.5">
            <p className="text-base font-semibold">Processing range</p>
            <p className="text-muted-foreground text-sm">May take longer for large classes...</p>
          </div>
        </Card>
      )}

      {state.error && !isPending && (
        <Card className="max-w-4xl mx-auto p-4 border-destructive/20 bg-destructive/5 rounded-xl">
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
              <AlertCircle className="h-4 w-4 text-destructive" />
            </div>
            <div className="space-y-0.5">
              <p className="font-bold text-destructive text-sm">Analysis Error</p>
              <p className="text-xs text-destructive/80">{state.error}</p>
            </div>
          </div>
        </Card>
      )}

      {state.success && state.data && !isPending && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Tabs defaultValue="classTable" className="w-full">
            <div className="flex justify-center mb-6">
              <TabsList className="bg-muted/80 p-1 rounded-2xl border-none h-auto gap-1">
                <TabsTrigger
                  value="classTable"
                  className="rounded-xl px-6 py-2.5"
                >
                  Class Result
                </TabsTrigger>
                <TabsTrigger
                  value="dataTable"
                  className="rounded-xl px-6 py-2.5"
                >
                  Table View
                </TabsTrigger>
                <TabsTrigger
                  value="datachart"
                  className="rounded-xl px-6 py-2.5"
                >
                  Visual Chart
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="classTable">
              <ClassResultTable data={state.data} semester={semester} />
            </TabsContent>
            <TabsContent value="dataTable">
              <div className="bg-card rounded-3xl border shadow-sm p-6 w-full max-w-[100vw] overflow-hidden">
                <DataTable data={state.data} semester={semester} />
              </div>
            </TabsContent>
            <TabsContent value="datachart">
              <SubjectPassFailChart data={state.data} />
            </TabsContent>
          </Tabs>
        </div>
      )}

      {!isPending && !state.success && !state.error && (
        <Card className="max-w-4xl mx-auto p-6 text-center bg-muted/30 border-dashed border-2 rounded-2xl">
          <Users className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground font-medium text-sm mb-4">
            Enter hall ticket range to start analysis
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
            <div className="p-2.5 bg-card rounded-xl border">
              <p className="font-semibold mb-0.5">Start</p>
              <p>e.g. 26XXXXXX01</p>
            </div>
            <div className="p-2.5 bg-card rounded-xl border">
              <p className="font-semibold mb-0.5">End</p>
              <p>e.g. 26XXXXXXXXA9</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

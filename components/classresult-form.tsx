"use client";

import { useRef, useState, startTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Loader2, Users, Search } from "lucide-react";
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

  const isFormValid =
    start.trim() && end.trim() && semester !== "sem" && semester !== "";

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
    <div className="space-y-6 my-4 max-w-full px-4 sm:px-6">
      <Card className="max-w-4xl mx-auto shadow-md border-gray-100 overflow-hidden print:hidden">
        <div className="p-1 bg-linear-to-r from-purple-600 to-indigo-600" />
        <CardContent className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Class Analysis</h2>
            <p className="text-gray-500 text-sm mt-1">
              Generate results and performance charts for an entire class range.
            </p>
          </div>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Input
                  type="text"
                  name="start"
                  placeholder="Start Hall Ticket"
                  value={start}
                  onChange={(e) => setStart(e.target.value.toUpperCase())}
                  className="h-12 rounded-xl border-gray-200 focus:border-purple-500"
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
                  onChange={(e) => setEnd(e.target.value.toUpperCase())}
                  className="h-12 rounded-xl border-gray-200 focus:border-purple-500"
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
                  className="h-12 w-full rounded-xl border-gray-200 focus:border-purple-500"
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
              className="w-full h-12 rounded-xl bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/20 transition-all text-base font-semibold"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Class Results...
                </>
              ) : (
                "Run Analysis"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Loading */}
      {isPending && (
        <Card className="max-w-2xl mx-auto p-12 text-center space-y-4 border-none shadow-none bg-transparent">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-purple-100 animate-ping opacity-25" />
            <Loader2 className="h-12 w-12 animate-spin relative text-purple-600" />
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-900">
              Processing range
            </p>
            <p className="text-gray-500">
              This may take longer for large classes...
            </p>
          </div>
        </Card>
      )}

      {/* Error */}
      {state.error && !isPending && (
        <Card className="max-w-2xl mx-auto p-6 border-red-100 bg-red-50/50 rounded-2xl">
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-red-900">Analysis Error</p>
              <p className="text-sm text-red-700">{state.error}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Success */}
      {state.success && state.data && !isPending && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Tabs defaultValue="classTable" className="w-full">
            <div className="flex justify-center mb-6">
              <TabsList className="bg-gray-100/80 p-1 rounded-2xl border-none h-auto gap-1">
                <TabsTrigger
                  value="classTable"
                  className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Class Result
                </TabsTrigger>
                <TabsTrigger
                  value="dataTable"
                  className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Table View
                </TabsTrigger>
                <TabsTrigger
                  value="datachart"
                  className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Visual Chart
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="classTable">
              <ClassResultTable data={state.data} semester={semester} />
            </TabsContent>
            <TabsContent value="dataTable">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 w-full max-w-[100vw] overflow-hidden">
                <DataTable data={state.data} semester={semester} />
              </div>
            </TabsContent>
            <TabsContent value="datachart">
              <SubjectPassFailChart data={state.data} />
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Empty */}
      {!isPending && !state.success && !state.error && (
        <Card className="max-w-2xl mx-auto p-12 text-center bg-gray-50/50 border-dashed border-2 border-gray-200 rounded-3xl">
          <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium mb-6">
            Enter hall ticket range to start analysis
          </p>
          <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
            <div className="p-3 bg-white rounded-xl border border-gray-100">
              <p className="font-semibold text-gray-500 mb-1">Starters</p>
              <p>e.g. 26XXXXXX01</p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-gray-100">
              <p className="font-semibold text-gray-500 mb-1">Enders</p>
              <p>e.g. 26XXXXXXXXA9</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

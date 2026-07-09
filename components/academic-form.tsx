"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Loader2, Search } from "lucide-react";
import { academicResult } from "@/action/results";
import AcademicTable from "./academic-table";

export default function AcademicForm() {
  const [hallticket, setHallticket] = useState("");

  const [state, formAction, isPending] = useActionState(academicResult, {
    success: false,
    data: null,
    error: null,
  });

  return (
    <div className="space-y-6">
      <Card className="max-w-2xl mx-auto shadow-sm overflow-hidden print:hidden">
        <div className="h-1 bg-linear-to-r from-primary to-primary/80" />
        <CardContent className="p-5 sm:p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Academic History</h2>
            <p className="text-muted-foreground text-xs mt-0.5">
              Enter your 10-digit hall ticket to view complete academic performance.
            </p>
          </div>
          <form action={formAction} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="e.g. 20XXXXXXXX"
                  name="hallticket"
                  value={hallticket}
                  onChange={(e) => setHallticket(e.target.value.toUpperCase().replace(/\s+/g, ""))}
                  className="pl-9 h-10 rounded-xl text-sm"
                  disabled={isPending}
                  maxLength={10}
                />
              </div>
              <Button
                type="submit"
                disabled={isPending || hallticket.length !== 10}
                className="h-10 px-6 rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-blue-500/20 transition-all active:scale-95 w-full sm:w-auto text-sm"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                    Searching...
                  </>
                ) : (
                  "View Results"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {isPending && (
        <Card className="max-w-2xl mx-auto p-8 text-center space-y-3 border-none shadow-none bg-transparent">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-blue-100 dark:bg-blue-900/30 animate-ping opacity-25" />
            <Loader2 className="h-8 w-8 animate-spin relative text-primary" />
          </div>
          <div className="space-y-0.5">
            <p className="text-base font-semibold">Fetching your results</p>
            <p className="text-muted-foreground text-sm">This might take a moment...</p>
          </div>
        </Card>
      )}

      {state.error && !isPending && (
        <Card className="max-w-2xl mx-auto p-4 border-destructive/20 bg-destructive/5 rounded-xl">
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
              <AlertCircle className="h-4 w-4 text-destructive" />
            </div>
            <div className="space-y-0.5">
              <p className="font-bold text-destructive text-sm">Request Failed</p>
              <p className="text-xs text-destructive/80 leading-relaxed">{state.error}</p>
            </div>
          </div>
        </Card>
      )}

      {state.success && state.data && !isPending && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <AcademicTable {...state.data} />
        </div>
      )}

      {!isPending && !state.success && !state.error && (
        <div className="max-w-2xl mx-auto py-12 text-center opacity-40">
          <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground font-medium">Enter a hall ticket number above</p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
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
      <form
        action={formAction}
        className="space-y-4 max-w-2xl mx-auto print:hidden"
      >
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="text"
            placeholder="Enter your hall ticket number"
            name="hallticket"
            value={hallticket}
            onChange={(e) => setHallticket(e.target.value.toUpperCase())}
            className="flex-1"
            disabled={isPending}
          />
          <Button
            type="submit"
            disabled={isPending || !hallticket.trim()}
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

      {/* Loading State */}
      {isPending && (
        <Card className="p-8 text-center space-y-2">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Fetching your results...</p>
        </Card>
      )}

      {/* Error State */}
      {state.error && !isPending && (
        <Card className="p-6 border-destructive/50 bg-destructive/5">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-destructive">Error</p>
              <p className="text-sm text-foreground">{state.error}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Success State */}
      {state.success && state.data && !isPending && (
        <AcademicTable {...state.data} />
      )}

      {/* Empty State */}
      {!isPending && !state.success && !state.error && (
        <Card className="p-6 text-center text-muted-foreground">
          <p>Enter your hall ticket number and click search to view results</p>
        </Card>
      )}
    </div>
  );
}

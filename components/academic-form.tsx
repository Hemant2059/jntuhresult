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
      <Card className="max-w-2xl mx-auto shadow-md border-gray-100 overflow-hidden print:hidden">
        <div className="p-1 bg-gradient-to-r from-blue-600 to-indigo-600" />
        <CardContent className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Academic History</h2>
            <p className="text-gray-500 text-sm mt-1">Enter your hall ticket number to view your complete academic performance.</p>
          </div>
          <form action={formAction} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="e.g. 20XXXXXXXX"
                  name="hallticket"
                  value={hallticket}
                  onChange={(e) => setHallticket(e.target.value.toUpperCase())}
                  className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-500 transition-all"
                  disabled={isPending}
                />
              </div>
              <Button
                type="submit"
                disabled={isPending || !hallticket.trim()}
                className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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

      {/* Loading State */}
      {isPending && (
        <Card className="max-w-2xl mx-auto p-12 text-center space-y-4 border-none shadow-none bg-transparent">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-25" />
            <Loader2 className="h-12 w-12 animate-spin relative text-blue-600" />
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-900">Fetching your results</p>
            <p className="text-gray-500">This might take a moment...</p>
          </div>
        </Card>
      )}

      {/* Error State */}
      {state.error && !isPending && (
        <Card className="max-w-2xl mx-auto p-6 border-red-100 bg-red-50/50 rounded-2xl">
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-red-900">Request Failed</p>
              <p className="text-sm text-red-700 leading-relaxed">{state.error}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Success State */}
      {state.success && state.data && !isPending && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <AcademicTable {...state.data} />
        </div>
      )}

      {/* Empty State */}
      {!isPending && !state.success && !state.error && (
        <div className="max-w-2xl mx-auto py-12 text-center opacity-40">
          <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium">Ready to search your results</p>
        </div>
      )}
    </div>
  );
}

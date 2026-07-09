"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Loader2, Search, ArrowLeft, GraduationCap, ClipboardList, Send } from "lucide-react";
import { notificationResult } from "@/action/results";
import Link from "next/link";
import AllResultsView from "./allresult-view";
import SemesterTable from "./semester-table";

interface NotificationFormProps {
  notification: {
    title: string;
    url: string;
    degree: string;
    regulation: string;
    semester: string;
  };
}

export default function NotificationForm({ notification }: NotificationFormProps) {
  const [hallticket, setHallticket] = useState("");

  const getParam = (url: string, param: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.searchParams.get(param) || "null";
    } catch {
      const match = url.match(new RegExp(`[?&]${param}=([^&]*)`));
      return match ? decodeURIComponent(match[1]) : "null";
    }
  };

  const degree = getParam(notification.url, "degree");
  const examCode = getParam(notification.url, "examCode");
  const etype = getParam(notification.url, "etype");
  const type = getParam(notification.url, "type");
  const result = getParam(notification.url, "result");
  const grad = getParam(notification.url, "grad");

  const [state, formAction, isPending] = useActionState(notificationResult, {
    success: false,
    data: null,
    error: null,
  });

  const isAllResults = state.success && state.data && state.data.Results && !state.data.Result;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link
        href="/notifications"
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors group"
      >
        <div className="h-8 w-8 rounded-full bg-card border flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:border-blue-100 transition-all">
          <ArrowLeft size={16} />
        </div>
        Back to Notifications
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {(!state.success || isPending) && (
          <div className="lg:col-span-1 space-y-4">
            <Card className="shadow-md overflow-hidden">
              <div className="h-1.5 bg-linear-to-r from-primary to-primary/80" />
              <CardContent className="p-5">
                <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary mb-4">
                  <ClipboardList size={22} />
                </div>
                <h2 className="text-base font-black leading-tight mb-3">
                  {notification.title}
                </h2>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-muted-foreground font-medium">Degree:</span>
                    <span className="font-bold uppercase">{notification.degree}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 shrink-0" />
                    <span className="text-muted-foreground font-medium">Regulation:</span>
                    <span className="font-bold uppercase">{notification.regulation}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-600 shrink-0" />
                    <span className="text-muted-foreground font-medium">Semester:</span>
                    <span className="font-bold uppercase">{notification.semester}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl border border-border">
              <h4 className="flex items-center gap-1.5 text-blue-800 dark:text-blue-300 font-bold text-xs mb-1.5">
                <GraduationCap size={13} />
                Need Help?
              </h4>
              <p className="text-[11px] text-blue-700/70 dark:text-blue-300/70 leading-relaxed">
                Ensure you have your 10-digit hall ticket number ready. If results are not available, they might be under maintenance.
              </p>
            </div>
          </div>
        )}

        <div className={`${!state.success || isPending ? "lg:col-span-2" : "lg:col-span-3"} space-y-6`}>
          {!state.success || isPending ? (
            <Card className="shadow-md overflow-hidden">
              <CardContent className="p-5 sm:p-6">
                <div className="mb-5 text-center md:text-left">
                  <h2 className="text-xl font-black mb-1.5">View Results</h2>
                  <p className="text-muted-foreground text-xs font-medium">Enter your credentials to access your detailed result sheet.</p>
                </div>

                <form action={formAction} className="space-y-4">
                  <input type="hidden" name="degree" value={degree} />
                  <input type="hidden" name="examCode" value={examCode} />
                  <input type="hidden" name="etype" value={etype} />
                  <input type="hidden" name="type" value={type} />
                  <input type="hidden" name="result" value={result} />
                  <input type="hidden" name="grad" value={grad} />

                  <div className="space-y-2">
                    <label className="text-xs font-bold ml-1">Hall Ticket Number</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
                      </div>
                      <Input
                        type="text"
                        placeholder="e.g. 21XXXXXX01"
                        name="htno"
                        value={hallticket}
                        onChange={(e) => setHallticket(e.target.value.toUpperCase().replace(/\s+/g, ""))}
                        className="pl-10 h-11 rounded-xl bg-muted/30 focus:bg-card focus:ring-4 focus:ring-primary/10 transition-all text-base font-bold tracking-widest placeholder:tracking-normal placeholder:font-normal"
                        disabled={isPending}
                        maxLength={10}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending || hallticket.length !== 10}
                    className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 text-sm font-bold transition-all active:scale-[0.98] group"
                  >
                    {isPending ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Searching API...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Check Performance</span>
                        <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    )}
                  </Button>
                </form>

                {state.error && !isPending && (
                  <div className="mt-4 p-4 border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/20 rounded-xl flex gap-3">
                    <div className="h-7 w-7 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
                      <AlertCircle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-bold text-amber-800 dark:text-amber-300 text-xs leading-tight">Not Found</p>
                      <p className="text-xs text-amber-700/80 dark:text-amber-400/80 font-medium">{state.error}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : null}

          {state.success && state.data && !isPending && (
            <div className="animate-in zoom-in-95 duration-500">
              {isAllResults ? (
                <AllResultsView data={state.data} />
              ) : (
                <SemesterTable data={state.data} semester={notification.semester} hideSGPA={true} />
              )}
              <div className="mt-8 flex justify-center print:hidden">
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="rounded-2xl px-8"
                >
                  Clear and Search Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

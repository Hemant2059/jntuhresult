"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Loader2, Search, ArrowLeft, GraduationCap, ClipboardList, Send } from "lucide-react";
import { notificationResult } from "@/action/results";
import Link from "next/link";
import AllResultsView from "./allresult-view"; // Assuming this can display the result structure
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

  // Extract params from URL
  const getParam = (url: string, param: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.searchParams.get(param) || "null";
    } catch (e) {
      // If URL is invalid, try manual parsing
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

  // Determine which view to use based on data structure
  const isAllResults = state.success && state.data && state.data.Results && !state.data.Result;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link 
        href="/notifications" 
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors group"
      >
        <div className="h-8 w-8 rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-100 transition-all">
          <ArrowLeft size={16} />
        </div>
        Back to Notifications
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info Card - Hide when showing results to give more space */}
        {(!state.success || isPending) && (
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-none shadow-2xl shadow-blue-500/10 rounded-[2.5rem] overflow-hidden bg-white">
              <div className="h-2 bg-linear-to-r from-blue-600 to-indigo-600" />
              <CardContent className="p-8">
                <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                  <ClipboardList size={32} />
                </div>
                <h2 className="text-xl font-black text-gray-900 leading-tight mb-4">
                  {notification.title}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                    <span className="text-gray-500 font-medium">Degree:</span>
                    <span className="text-gray-900 font-bold uppercase">{notification.degree}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="h-2 w-2 rounded-full bg-indigo-600" />
                    <span className="text-gray-500 font-medium">Regulation:</span>
                    <span className="text-gray-900 font-bold uppercase">{notification.regulation}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="h-2 w-2 rounded-full bg-purple-600" />
                    <span className="text-gray-500 font-medium">Semester:</span>
                    <span className="text-gray-900 font-bold uppercase">{notification.semester}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100/50">
              <h4 className="flex items-center gap-2 text-blue-800 font-bold text-sm mb-2">
                <GraduationCap size={16} />
                Need Help?
              </h4>
              <p className="text-xs text-blue-700/70 leading-relaxed">
                Ensure you have your 10-digit hall ticket number ready. If results are not available, they might be under maintenance officially.
              </p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className={`${!state.success || isPending ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-6`}>
          {!state.success || isPending ? (
            <Card className="border-none shadow-2xl shadow-blue-500/10 rounded-[2.5rem] overflow-hidden bg-white">
              <CardContent className="p-8 md:p-12">
                <div className="mb-10 text-center md:text-left">
                  <h2 className="text-3xl font-black text-gray-900 mb-3">View Results</h2>
                  <p className="text-gray-500 font-medium">Enter your credentials to access your detailed result sheet.</p>
                </div>

                <form action={formAction} className="space-y-8">
                  {/* Hidden fields for extraction parameters */}
                  <input type="hidden" name="degree" value={degree} />
                  <input type="hidden" name="examCode" value={examCode} />
                  <input type="hidden" name="etype" value={etype} />
                  <input type="hidden" name="type" value={type} />
                  <input type="hidden" name="result" value={result} />
                  <input type="hidden" name="grad" value={grad} />

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-700 ml-1">Hall Ticket Number</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                      <Input
                        type="text"
                        placeholder="e.g. 21XXXXXX01"
                        name="htno"
                        value={hallticket}
                        onChange={(e) => setHallticket(e.target.value.toUpperCase().replace(/\s+/g, ""))}
                        className="pl-12 h-16 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all text-lg font-bold tracking-widest placeholder:tracking-normal placeholder:font-normal"
                        disabled={isPending}
                        maxLength={10}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending || hallticket.length !== 10}
                    className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 text-lg font-bold transition-all active:scale-[0.98] group"
                  >
                    {isPending ? (
                      <div className="flex items-center gap-3">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span>Searching API...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span>Check Performance</span>
                        <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </form>

                {state.error && !isPending && (
                  <div className="mt-8 p-6 border-red-100 bg-red-50/50 rounded-2xl flex gap-4 animate-in shake-1">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-red-900 leading-tight">Request Failed</p>
                      <p className="text-sm text-red-700/80 font-medium">{state.error}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : null}

          {/* Result View */}
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
                   className="rounded-2xl border-gray-200 px-8"
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

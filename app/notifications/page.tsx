import NotificationList from "@/components/notification-list";
import { Bell, RefreshCw } from "lucide-react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Exam Notifications & Updates",
  description:
    "Stay updated with the latest JNTUH B.Tech and B.Pharmacy result notifications, RC/RV results, supplementary exam schedules, and academic news.",
  alternates: { canonical: "https://jntuhresultbp.vercel.app/notifications" },
};

async function getNotifications(refresh: boolean = false) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "https://jntuh-api.onrender.com"}/notifications?refresh=${refresh}`,
      { cache: "no-store" },
    );
    if (!res.ok) throw new Error("Failed to fetch notifications");
    return res.json();
  } catch {
    return [];
  }
}

export default async function NotificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ refresh?: string }>;
}) {
  const { refresh } = await searchParams;
  const forceRefresh = refresh === "true";
  const notifications = await getNotifications(forceRefresh);

  return (
    <main className="min-h-screen bg-background dark:bg-background">
      <div className="bg-card dark:bg-card border-b border-border overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-blue-50),transparent)] dark:bg-[radial-gradient(ellipse_at_top_right,var(--color-blue-950),transparent)]" />
        <div className="max-w-7xl mx-auto px-6 py-14 sm:py-20 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Bell size={14} />
                Latest Updates
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                Exam <span className="text-primary">Notifications</span>
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                Browse through all recent JNTUH examination results, supplementary notices, and revaluation updates in one place.
              </p>
            </div>
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
              <div className="relative h-32 w-32 bg-card dark:bg-card shadow-2xl rounded-[2.5rem] flex items-center justify-center rotate-6 border-8 border-gray-50 dark:border-gray-800">
                <Bell size={56} className="text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        <div className="flex justify-end mb-6">
          <Link href="/notifications?refresh=true">
            <Button variant="outline" size="sm" className="gap-2 rounded-xl">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </Link>
        </div>
        <NotificationList notifications={notifications} />
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 border-t border-border">
        <div className="bg-card dark:bg-card rounded-3xl border border-border p-8 sm:p-12 shadow-sm space-y-8">
          <h2 className="text-2xl font-bold text-foreground">About JNTUH Exam Notifications</h2>
          
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              JNTUH regularly publishes examination notifications for B.Tech, B.Pharmacy, M.Tech, MBA, and MCA programs. 
              These notifications include result declarations, supplementary exam schedules, revaluation results, 
              and important academic updates. Staying updated with these notifications is crucial for students 
              to plan their academic activities and exam preparations.
            </p>

            <h3 className="text-lg font-bold text-foreground pt-4">Types of Notifications</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                <span><strong className="text-foreground">Regular Results:</strong> Semester-wise results for B.Tech and B.Pharmacy across all regulations (R13, R15, R16, R18, R22, R25).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                <span><strong className="text-foreground">RC/RV Results:</strong> Revaluation and re-verification results for students who applied for answer sheet rechecking.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                <span><strong className="text-foreground">Supplementary Results:</strong> Results for supplementary exams conducted for students with backlogs.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                <span><strong className="text-foreground">Exam Schedules:</strong> Upcoming examination timetables and center lists.</span>
              </li>
            </ul>

            <h3 className="text-lg font-bold text-foreground pt-4">How to Use Notifications</h3>
            <ol className="space-y-3 list-decimal pl-5">
              <li>Browse through the list of recent notifications above.</li>
              <li>Click on a notification to view its details and check results for that specific exam.</li>
              <li>Enter your hall ticket number on the result page to fetch your marks.</li>
              <li>Download or print your results for future reference.</li>
            </ol>

            <h3 className="text-lg font-bold text-foreground pt-4">Stay Updated</h3>
            <p>
              We fetch notifications directly from the official JNTUH API and update our portal as soon as new results are declared. 
              Bookmark this page and check regularly to never miss an important update about your JNTUH results.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

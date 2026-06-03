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
      `https://jntuh-api.onrender.com/notifications?refresh=${refresh}`,
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
    <main className="min-h-screen bg-[#fafafa] dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-blue-50),transparent)] dark:bg-[radial-gradient(ellipse_at_top_right,var(--color-blue-950),transparent)]" />
        <div className="max-w-7xl mx-auto px-6 py-14 sm:py-20 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Bell size={14} />
                Latest Updates
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Exam <span className="text-blue-600">Notifications</span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                Browse through all recent JNTUH examination results, supplementary notices, and revaluation updates in one place.
              </p>
            </div>
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-blue-600/10 blur-3xl rounded-full" />
              <div className="relative h-32 w-32 bg-white dark:bg-gray-800 shadow-2xl rounded-[2.5rem] flex items-center justify-center rotate-6 border-8 border-gray-50 dark:border-gray-800">
                <Bell size={56} className="text-blue-600" />
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
    </main>
  );
}

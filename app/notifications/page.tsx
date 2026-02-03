import NotificationList from "@/components/notification-list";
import { Bell, RefreshCw } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JNTUH Exam Notifications & Results Updates",
  description: "Stay updated with the latest JNTUH B.Tech and B.Pharmacy result notifications, RC/RV results, supplementary exam schedules, and academic news.",
  keywords: ["JNTUH Notifications", "JNTU Result Updates", "B.Tech Results", "B.Pharmacy Results", "RC/RV Results", "JNTUH Exam Cell"],
  alternates: {
    canonical: "https://jntuhresultbp.vercel.app/notifications",
  },
};

async function getNotifications() {
  try {
    const res = await fetch("https://jntuh-api.vercel.app/notifications?refresh=false");
    if (!res.ok) throw new Error("Failed to fetch notifications");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function NotificationsPage() {
  const notifications = await getNotifications();

  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* Header Section */}
      <div className="relative bg-white border-b overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-blue-50),transparent)]" />
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                <Bell size={14} className="animate-bounce" />
                Latest Updates
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                Exam <span className="text-blue-600">Notifications</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Browse through all recent JNTUH examination results, supplementary notices, and revaluation updates in one place.
              </p>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-blue-600/10 blur-3xl rounded-full" />
              <div className="relative h-40 w-40 bg-white shadow-2xl rounded-[2.5rem] flex items-center justify-center rotate-6 border-8 border-gray-50">
                <Bell size={64} className="text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-6 md:py-12">
        <NotificationList notifications={notifications} />
      </div>
    </main>
  );
}

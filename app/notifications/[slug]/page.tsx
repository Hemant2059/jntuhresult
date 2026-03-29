import NotificationForm from "@/components/notification-form";
import { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

interface NotificationPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ title?: string; url?: string; degree?: string; regulation?: string; semester?: string }>;
}

async function getNotifications() {
  const res = await fetch(
    "https://jntuh-api.vercel.app/notifications?refresh=false",
    { cache: 'no-store' }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function generateStaticParams() {
  const notifications = await getNotifications();
  return notifications.map((n: any) => ({
    slug: n.slug,
  }));
}
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

async function getNotificationBySlug(slug: string) {
  try {
    const notifications = await getNotifications();
    return notifications.find((n: any) => n.slug === slug);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: NotificationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const notification = await getNotificationBySlug(slug);

  if (!notification) {
    return {
      title: "Notification Not Found",
    };
  }

  const title = notification.short_title || notification.title;
  const description = `Check ${notification.degree} ${notification.semester} ${notification.type} results for ${notification.title}. Enter your hall ticket to fetch detailed academic marks and SGPA instantly.`;

  return {
    title,
    description,
    keywords: [
      notification.degree,
      notification.semester,
      notification.regulation,
      notification.type,
      "JNTUH Results",
      "Result Notification",
      notification.slug.replace(/-/g, " "),
    ],
    alternates: {
      canonical: `https://jntuhresultbp.vercel.app/notifications/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://jntuhresultbp.vercel.app/notifications/${slug}`,
    },
  };
}

export default async function NotificationDetailPage({
  params,
  searchParams,
}: NotificationPageProps) {
  const { slug } = await params;
  const sp = await searchParams;

  let notification;
  
  // Use search params if available (fast path - no API call needed)
  if (sp.title && sp.url && sp.degree) {
    notification = {
      title: sp.title,
      url: sp.url,
      degree: sp.degree,
      regulation: sp.regulation || "N/A",
      semester: sp.semester || "N/A",
    };
  } else {
    // Fallback to API fetch
    notification = await getNotificationBySlug(slug);
  }

  if (!notification) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-50/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative">
        <NotificationForm notification={notification} />
      </div>
    </main>
  );
}

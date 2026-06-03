import NotificationForm from "@/components/notification-form";
import { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { parseNotification } from "@/action/parse-notification";

interface NotificationPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ title?: string; url?: string; degree?: string; regulation?: string; semester?: string }>;
}

async function getNotifications() {
  try {
    const res = await fetch(
      "https://jntuh-api.onrender.com/notifications?refresh=false",
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateStaticParams() {
  try {
    const notifications = await getNotifications();
    if (!Array.isArray(notifications)) return [];
    return notifications.map((n: any, i: number) => ({
      slug: String(n.slug ?? n.title?.toLowerCase().replace(/\s+/g, "-") ?? `notification-${i}`),
    }));
  } catch {
    return [];
  }
}

async function getNotificationBySlug(slug: string) {
  try {
    const notifications = await getNotifications();
    return notifications.find((n: any) => n.slug === slug) || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: NotificationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const notification = await getNotificationBySlug(slug);

  if (!notification) {
    return { title: "Notification Not Found" };
  }

  const title = notification.short_title || notification.title;
  const description = `Check ${notification.degree} ${notification.semester} ${notification.type} results for ${notification.title}. Enter your hall ticket to fetch detailed academic marks and SGPA instantly.`;

  return {
    title,
    description,
    alternates: { canonical: `https://jntuhresultbp.vercel.app/notifications/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://jntuhresultbp.vercel.app/notifications/${slug}`,
    },
  };
}

export default async function NotificationDetailPage({ params, searchParams }: NotificationPageProps) {
  const { slug } = await params;
  const sp = await searchParams;

  let notification;

  if (sp.title && sp.url) {
    const parsed = parseNotification({ title: sp.title });
    notification = {
      title: sp.title,
      url: sp.url,
      degree: sp.degree || parsed.degree,
      regulation: sp.regulation || parsed.regulation,
      semester: sp.semester || parsed.semester,
    };
  } else {
    notification = await getNotificationBySlug(slug);
    if (notification) {
      const parsed = parseNotification(notification);
      notification = {
        ...notification,
        degree: parsed.degree,
        regulation: parsed.regulation,
        semester: parsed.semester,
        type: parsed.type,
        is_rcrv: parsed.is_rcrv,
        exam_date: parsed.exam_date,
        short_title: parsed.short_title,
      };
    }
  }

  if (!notification) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-gray-950">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-50/50 dark:bg-blue-950/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative">
        <NotificationForm notification={notification} />
      </div>
    </main>
  );
}

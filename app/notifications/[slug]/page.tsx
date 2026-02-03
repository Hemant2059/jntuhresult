import NotificationForm from "@/components/notification-form";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface NotificationPageProps {
  params: Promise<{ slug: string }>;
}

async function getNotifications() {
  const res = await fetch("https://jntuh-api.vercel.app/notifications?refresh=false");
  if (!res.ok) return [];
  return res.json();
}

export async function generateStaticParams() {
  const notifications = await getNotifications();
  return notifications.map((n: any) => ({
    slug: n.slug,
  }));
}

async function getNotificationBySlug(slug: string) {
  try {
    const notifications = await getNotifications();
    return notifications.find((n: any) => n.slug === slug);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function generateMetadata({ params }: NotificationPageProps): Promise<Metadata> {
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

export default async function NotificationDetailPage({ params }: NotificationPageProps) {
  const { slug } = await params;
  const notification = await getNotificationBySlug(slug);

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

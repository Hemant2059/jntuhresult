import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://jntuhresultbp.vercel.app";

  const semesters = [
    // B.Tech R18
    "btech-1-1-r18",
    "btech-1-2-r18",
    "btech-2-1-r18",
    "btech-2-2-r18",
    "btech-3-1-r18",
    "btech-3-2-r18",
    "btech-4-1-r18",
    "btech-4-2-r18",
    // B.Tech R22
    "btech-1-1-r22",
    "btech-1-2-r22",
    "btech-2-1-r22",
    "btech-2-2-r22",
    "btech-3-1-r22",
    "btech-3-2-r22",
    "btech-4-1-r22",
    "btech-4-2-r22",
    // B.Tech R25
    "btech-1-1-r25",
    "btech-1-2-r25",
    "btech-2-1-r25",
    "btech-2-2-r25",
    "btech-3-1-r25",
    "btech-3-2-r25",
    "btech-4-1-r25",
    "btech-4-2-r25",
    // B.Pharmacy R17
    "bpharmacy-1-1-r17",
    "bpharmacy-1-2-r17",
    "bpharmacy-2-1-r17",
    "bpharmacy-2-2-r17",
    "bpharmacy-3-1-r17",
    "bpharmacy-3-2-r17",
    "bpharmacy-4-1-r17",
    "bpharmacy-4-2-r17",
    // B.Pharmacy R22
    "bpharmacy-1-1-r22",
    "bpharmacy-1-2-r22",
    "bpharmacy-2-1-r22",
    "bpharmacy-2-2-r22",
    "bpharmacy-3-1-r22",
    "bpharmacy-3-2-r22",
    "bpharmacy-4-1-r22",
    "bpharmacy-4-2-r22",
    // B.Pharmacy R25
    "bpharmacy-1-1-r25",
    "bpharmacy-1-2-r25",
    "bpharmacy-2-1-r25",
    "bpharmacy-2-2-r25",
    "bpharmacy-3-1-r25",
    "bpharmacy-3-2-r25",
    "bpharmacy-4-1-r25",
    "bpharmacy-4-2-r25",
  ];

  const dynamicRoutes = semesters.map((slug) => ({
    url: `${baseUrl}/semester`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  // Fetch notifications for sitemap
  let notificationRoutes: any[] = [];
  try {
    const res = await fetch("https://jntuh-api.vercel.app/notifications?refresh=true");
    if (res.ok) {
      const notifications = await res.json();
      notificationRoutes = notifications.map((n: any) => ({
        url: `${baseUrl}/notifications/${n.slug}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.7,
      }));
    }
  } catch (e) {
    console.error("Failed to fetch notifications for sitemap", e);
  }

  return [
    {
      url: "https://jntuhresultbp.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://jntuhresultbp.vercel.app/semester",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://jntuhresultbp.vercel.app/academic",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://jntuhresultbp.vercel.app/classresult",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://jntuhresultbp.vercel.app/allresult",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://jntuhresultbp.vercel.app/notifications",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://jntuhresultbp.vercel.app/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://jntuhresultbp.vercel.app/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://jntuhresultbp.vercel.app/privacy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://jntuhresultbp.vercel.app/terms",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://jntuhresultbp.vercel.app/disclaimer",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...dynamicRoutes,
    ...notificationRoutes,
  ];
}

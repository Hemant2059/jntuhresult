import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://jntuhresultbp.vercel.app";

  const semesters = [
    "btech-1-1-r18",
    "btech-1-1-r18",
    "btech-2-1-r18",
    "btech-2-2-r18",
    "btech-3-1-r18",
    "btech-3-2-r18",
    "btech-4-1-r18",
    "btech-4-2-r18",
    "btech-1-1-r22",
    "btech-1-2-r22",
    "btech-2-1-r22",
    "btech-2-2-r22",
    "btech-3-1-r22",
    "btech-3-2-r22",
    "btech-4-1-r22",
    "btech-4-2-r22",
    "bpharmacy-1-1-r17",
    "bpharmacy-1-2-r17",
    "bpharmacy-2-1-r17",
    "bpharmacy-2-2-r17",
    "bpharmacy-3-1-r17",
    "bpharmacy-3-2-r17",
    "bpharmacy-4-1-r17",
    "bpharmacy-4-2-r17",
    "bpharmacy-1-1-r22",
    "bpharmacy-1-2-r22",
    "bpharmacy-2-1-r22",
    "bpharmacy-2-2-r22",
    "bpharmacy-3-1-r22",
    "bpharmacy-3-2-r22",
    "bpharmacy-4-1-r22",
    "bpharmacy-4-2-r22",
  ];

  const dynamicRoutes = semesters.map((slug) => ({
    url: `${baseUrl}/semester`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://jntuhresultbp.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "yearly",
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
    ...dynamicRoutes,
  ];
}

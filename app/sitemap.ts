export default function sitemap() {
  return [
    {
      url: "https://jntuhresultbp.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "daily",
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
  ];
}

import type { MetadataRoute } from "next";

const BASE_URL = "https://charangamalavida.es";
const LAST_SIGNIFICANT_UPDATE = new Date("2026-06-19");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: LAST_SIGNIFICANT_UPDATE,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${BASE_URL}/agenda`,
      lastModified: LAST_SIGNIFICANT_UPDATE,
      changeFrequency: "weekly",
      priority: 0.9
    }
  ];
}

import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { publications as fallbackPublications } from "@/lib/research-data";
import { siteUrl } from "@/lib/env";

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

const routes: Array<{ path: string; changeFrequency: ChangeFrequency; priority: number }> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/research", changeFrequency: "monthly", priority: 0.9 },
  { path: "/publications", changeFrequency: "weekly", priority: 0.9 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.9 },
  { path: "/lab", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/refund", changeFrequency: "yearly", priority: 0.3 },
];

async function getPublicationSlugs(): Promise<string[]> {
  const supabase = await createClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("publications")
      .select("slug")
      .eq("is_public", true);
    if (!error && data?.length) {
      return data.map((item) => String(item.slug)).filter(Boolean);
    }
  }
  return fallbackPublications.map((item) => item.slug);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date("2026-08-31T00:00:00.000Z");
  const slugs = await getPublicationSlugs();
  return [
    ...routes.map((route) => ({
      url: siteUrl + route.path,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...slugs.map((slug) => ({
      url: siteUrl + "/publications/" + slug,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

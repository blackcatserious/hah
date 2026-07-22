"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const publicationSchema = z.object({
  title: z.string().min(3).max(300),
  slug: z.string().min(3).max(220).regex(/^[a-z0-9-]+$/),
  kind: z.enum(["research_essay", "working_paper", "manuscript", "published"]),
  status_label: z.string().min(2).max(100),
  year: z.string().min(4).max(20),
  abstract: z.string().min(30).max(10000),
  keywords: z.string().max(1000),
  url: z.string().url().optional().or(z.literal("")),
  pdf_url: z.string().url().optional().or(z.literal("")),
  is_public: z.enum(["true", "false"]),
});

export async function createPublicationAction(formData: FormData) {
  const parsed = publicationSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect("/dashboard/publications?error=invalid");
  const supabase = await createClient();
  if (!supabase) redirect("/setup");
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/dashboard/publications");
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (profile?.role !== "admin") redirect("/dashboard");
  const data = parsed.data;
  const { error } = await supabase.from("publications").insert({
    author_id: user.id,
    title: data.title,
    slug: data.slug,
    kind: data.kind,
    status_label: data.status_label,
    year: data.year,
    abstract: data.abstract,
    keywords: data.keywords.split(",").map((item) => item.trim()).filter(Boolean),
    url: data.url || null,
    pdf_url: data.pdf_url || null,
    is_public: data.is_public === "true",
    published_at: data.is_public === "true" ? new Date().toISOString() : null,
  });
  if (error) redirect("/dashboard/publications?error=save");
  revalidatePath("/publications");
  redirect("/dashboard/publications?created=1");
}

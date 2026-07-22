"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const projectSchema = z.object({
  name: z.string().min(2).max(180),
  organisation: z.string().max(180).optional(),
  system_type: z.string().min(2).max(180),
  description: z.string().min(30).max(12000),
  decision_context: z.string().min(20).max(12000),
  affected_people: z.string().min(10).max(8000),
});

export async function createProjectAction(formData: FormData) {
  const parsed = projectSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect("/dashboard/projects/new?error=invalid");
  const supabase = await createClient();
  if (!supabase) redirect("/setup");
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/dashboard/projects/new");
  const { data, error } = await supabase.from("projects").insert({
    owner_id: user.id,
    ...parsed.data,
    status: "draft",
  }).select("id").single();
  if (error || !data) redirect("/dashboard/projects/new?error=save");
  redirect(`/dashboard/projects/${data.id}`);
}

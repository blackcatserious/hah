import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function getUser() {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
}

export async function requireUser() {
  const user = await getUser();
  if (!user) redirect("/login?next=/dashboard");
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  const supabase = await createClient();
  if (!supabase) redirect("/setup");
  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (data?.role !== "admin") redirect("/dashboard");
  return user;
}

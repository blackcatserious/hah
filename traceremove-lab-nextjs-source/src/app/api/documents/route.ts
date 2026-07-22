import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({ projectId: z.string().uuid(), path: z.string().min(5), name: z.string().min(1).max(400), mimeType: z.string().max(200), size: z.number().int().positive().max(25_000_000) });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid document metadata." }, { status: 400 });
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { data: project } = await supabase.from("projects").select("id").eq("id", parsed.data.projectId).eq("owner_id", user.id).maybeSingle();
  if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });
  const { error } = await supabase.from("documents").insert({ owner_id: user.id, project_id: parsed.data.projectId, storage_path: parsed.data.path, name: parsed.data.name, mime_type: parsed.data.mimeType, size_bytes: parsed.data.size, status: "uploaded" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

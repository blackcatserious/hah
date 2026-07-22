import { NextResponse } from "next/server";
import { assessmentInputSchema } from "@/lib/assessment-schema";
import { runAssessment } from "@/lib/ai";
import { createClient } from "@/lib/supabase/server";

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const parsed = assessmentInputSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "The assessment input is incomplete." }, { status: 400 });
    const supabase = await createClient();
    if (!supabase) return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    const { data: project } = await supabase.from("projects").select("id").eq("id", parsed.data.projectId).eq("owner_id", user.id).maybeSingle();
    if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });

    const result = await runAssessment(parsed.data);
    const { data, error } = await supabase.from("assessments").insert({
      owner_id: user.id,
      project_id: parsed.data.projectId,
      modules: parsed.data.modules,
      input_snapshot: parsed.data,
      result,
      overall_risk: result.overallRisk,
      score: result.score,
      status: "completed",
      model: process.env.OPENAI_API_KEY ? (process.env.OPENAI_MODEL || "gpt-5-mini") : "demo-engine",
    }).select("id").single();
    if (error || !data) return NextResponse.json({ error: error?.message || "Could not save assessment." }, { status: 500 });
    await supabase.from("projects").update({ status: "assessed", updated_at: new Date().toISOString() }).eq("id", parsed.data.projectId);
    return NextResponse.json({ id: data.id, result });
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : "Unexpected assessment error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

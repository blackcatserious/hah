import React from "react";
import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase/server";
import { ReportDocument } from "@/lib/report-pdf";
import { assessmentResultSchema } from "@/lib/assessment-schema";

export const maxDuration = 30;

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { data } = await supabase.from("assessments").select("created_at,result,projects(name,organisation)").eq("id", id).eq("owner_id", user.id).maybeSingle();
  if (!data) return NextResponse.json({ error: "Assessment not found." }, { status: 404 });
  const result = assessmentResultSchema.parse(data.result);
  const project = Array.isArray(data.projects) ? data.projects[0] : data.projects;
  const buffer = await renderToBuffer(React.createElement(ReportDocument, { title: project?.name || "AI system", organisation: project?.organisation, createdAt: data.created_at, result }));
  return new Response(new Uint8Array(buffer), {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `attachment; filename="traceremove-assessment-${id}.pdf"`,
      "cache-control": "private, no-store",
    },
  });
}

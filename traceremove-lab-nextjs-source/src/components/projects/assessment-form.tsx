"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AssessmentForm({ project }: { project: { id: string; name: string; description: string; decision_context: string; affected_people: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); setError("");
    const form = new FormData(event.currentTarget);
    const modules = form.getAll("modules").map(String);
    try {
      const response = await fetch("/api/assessments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          projectId: project.id,
          systemName: project.name,
          systemPurpose: project.description,
          decisionContext: project.decision_context,
          affectedPeople: project.affected_people,
          evidence: String(form.get("evidence") || ""),
          modules,
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Assessment failed.");
      router.push(`/dashboard/projects/${project.id}?assessment=${payload.id}`);
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Assessment failed.");
    } finally { setLoading(false); }
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="field"><label>Assessment modules</label>
        {[ ["epistemic","Epistemic risk"], ["responsibility","Responsibility map"], ["dignity","Dignity & contestability"], ["identity","Narrative identity impact"] ].map(([value,label]) => (
          <label key={value} style={{display:"flex",gap:9,alignItems:"center"}}><input type="checkbox" name="modules" value={value} defaultChecked /> {label}</label>
        ))}
      </div>
      <div className="field"><label htmlFor="evidence">Evidence summary or excerpts</label><textarea id="evidence" name="evidence" className="textarea" placeholder="Paste policy excerpts, model documentation, sample decisions, known limitations, complaints, or review procedures." /></div>
      {error && <p className="form-error">{error}</p>}
      <button className="button primary" type="submit" disabled={loading}>{loading ? "Analysing…" : "Run responsibility assessment →"}</button>
      <p className="form-help">Generated findings require human review. They are not legal advice or compliance certification.</p>
    </form>
  );
}

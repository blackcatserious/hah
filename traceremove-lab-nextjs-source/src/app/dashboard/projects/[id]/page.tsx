import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AssessmentForm } from "@/components/projects/assessment-form";
import { DocumentUploader } from "@/components/projects/document-uploader";
import type { AssessmentResult } from "@/lib/assessment-schema";

export const metadata = { title: "Assessment case" };

export default async function ProjectPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ assessment?: string }> }) {
  const { id } = await params;
  const query = await searchParams;
  const supabase = await createClient();
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const [{ data: project }, { data: documents }, { data: assessments }] = await Promise.all([
    supabase.from("projects").select("*").eq("id", id).eq("owner_id", user.id).maybeSingle(),
    supabase.from("documents").select("id,name,mime_type,size_bytes,status,created_at").eq("project_id", id).eq("owner_id", user.id).order("created_at", { ascending: false }),
    supabase.from("assessments").select("id,overall_risk,score,status,model,result,created_at").eq("project_id", id).eq("owner_id", user.id).order("created_at", { ascending: false }),
  ]);
  if (!project) notFound();
  const selected = assessments?.find((item) => item.id === query.assessment) || assessments?.[0];
  const result = selected?.result as AssessmentResult | undefined;

  return (
    <>
      <section className="case-hero">
        <div className="case-hero-main">
          <div className="case-breadcrumb"><Link href="/dashboard/projects">Case register</Link><span>/</span><span>{project.system_type}</span></div>
          <span className="overline">{project.status} / private case</span>
          <h1>{project.name}</h1>
          <p>{project.organisation || "Independent project"}</p>
        </div>
        <div className="case-hero-actions">
          {selected && <a className="button primary" href={`/api/reports/${selected.id}/pdf`}>Export report <span>↗</span></a>}
          <span>Updated {new Date(project.updated_at).toLocaleString()}</span>
        </div>
      </section>

      <section className="case-context panel">
        <div><span>System purpose</span><p>{project.description}</p></div>
        <div><span>Decision context</span><p>{project.decision_context}</p></div>
        <div><span>Affected people</span><p>{project.affected_people}</p></div>
      </section>

      <section className="workspace-section">
        <div className="workspace-section-head"><div><span className="overline">Assessment operation</span><h2>Evidence in. Argument out.</h2></div><span className="case-stage">STAGE 02–04 / 05</span></div>
        <div className="workspace-grid">
          <section className="panel assessment-card assessment-operation">
            <div className="assessment-card-head"><span>Assessment modules</span><span>AI-assisted / human review required</span></div>
            <h2>Apply the responsibility protocol.</h2>
            <AssessmentForm project={project} />
          </section>
          <aside className="panel assessment-card evidence-register">
            <div className="assessment-card-head"><span>Evidence register</span><span>{documents?.length || 0} files</span></div>
            <h2>Source material</h2>
            <DocumentUploader projectId={project.id} />
            <div className="evidence-list">
              {documents?.map((document, index) => (
                <div className="evidence-item" key={document.id}><span>{String(index + 1).padStart(2,"0")}</span><div><strong>{document.name}</strong><p>{document.mime_type || "document"} · {Math.round((document.size_bytes || 0) / 1024)} KB · {document.status}</p></div></div>
              ))}
              {!documents?.length && <div className="evidence-empty">No evidence has been uploaded.</div>}
            </div>
          </aside>
        </div>
      </section>

      <section className="workspace-section">
        <div className="workspace-section-head"><div><span className="overline">Version history</span><h2>Preserved analytical states.</h2></div></div>
        {assessments?.length ? (
          <div className="version-rail">
            {assessments.map((assessment, index) => (
              <Link key={assessment.id} className={selected?.id === assessment.id ? "active" : ""} href={`/dashboard/projects/${id}?assessment=${assessment.id}`}>
                <span>v{assessments.length - index}</span><strong>{assessment.overall_risk} risk</strong><em>{assessment.score}/100</em><small>{new Date(assessment.created_at).toLocaleDateString()}</small>
              </Link>
            ))}
          </div>
        ) : <div className="empty-state panel"><span>ASSESSMENT HISTORY / EMPTY</span><h3>No assessment version exists.</h3><p>Upload evidence or provide a documented evidence summary, then run one or more modules.</p></div>}
      </section>

      {selected && result && (
        <section className="workspace-section assessment-result">
          <div className="assessment-result-hero panel">
            <div><span className="overline">Assessment result / {new Date(selected.created_at).toLocaleDateString()}</span><h2>{result.overallRisk} governance risk</h2><p>{result.executiveSummary}</p></div>
            <div className="result-score" style={{ "--score": `${result.score * 3.6}deg` } as React.CSSProperties}><div><strong>{result.score}</strong><span>/100</span></div></div>
          </div>

          <div className="result-context-grid">
            <article className="panel"><span>System claim</span><h3>What others are asked to accept</h3><p>{result.systemClaim}</p></article>
            <article className="panel"><span>Residual uncertainty</span><h3>What remains unresolved</h3><ul>{result.unresolvedQuestions.map((item) => <li key={item}>{item}</li>)}</ul></article>
          </div>

          <div className="workspace-section-head result-section-head"><div><span className="overline">Findings</span><h2>Where the argument fails or remains incomplete.</h2></div></div>
          <div className="result-findings">
            {result.findings.map((finding, index) => (
              <article className={`result-finding severity-${finding.severity.toLowerCase()}`} key={`${finding.module}-${index}`}>
                <div className="result-finding-index"><span>{String(index + 1).padStart(2,"0")}</span><em>{finding.module}</em></div>
                <div><div className="result-finding-meta"><span>{finding.severity}</span><span>{finding.evidenceNeeded.length} evidence requirements</span></div><h3>{finding.title}</h3><p>{finding.analysis}</p><div className="recommendation"><span>Required response</span><p>{finding.recommendation}</p></div><div className="tag-row">{finding.evidenceNeeded.map((item) => <em key={item}>{item}</em>)}</div></div>
              </article>
            ))}
          </div>

          <div className="workspace-section-head result-section-head"><div><span className="overline">Responsibility architecture</span><h2>Who controls, explains, and repairs.</h2></div></div>
          <div className="responsibility-chain">
            {result.responsibilityMap.map((actor, index) => (
              <article key={actor.actor}><span>{String(index + 1).padStart(2,"0")}</span><div><h3>{actor.actor}</h3><p>{actor.role}</p><strong>{actor.accountability}</strong></div></article>
            ))}
          </div>

          <section className="next-actions panel">
            <div><span className="overline">Next actions</span><h2>What the institution must do next.</h2></div>
            <ol>{result.nextActions.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2,"0")}</span>{item}</li>)}</ol>
            <small>{result.disclaimer}</small>
          </section>
        </section>
      )}
    </>
  );
}

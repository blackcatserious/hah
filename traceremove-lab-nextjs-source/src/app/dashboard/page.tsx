import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Workspace" };

export default async function DashboardPage() {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const [{ count: projectCount }, { count: assessmentCount }, { data: subscription }, { data: recentProjects }] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }).eq("owner_id", user.id),
    supabase.from("assessments").select("id", { count: "exact", head: true }).eq("owner_id", user.id),
    supabase.from("subscriptions").select("plan,status,current_period_end").eq("user_id", user.id).maybeSingle(),
    supabase.from("projects").select("id,name,organisation,system_type,status,updated_at").eq("owner_id", user.id).order("updated_at", { ascending: false }).limit(4),
  ]);

  return (
    <>
      <section className="workspace-hero">
        <div><span className="overline">Workspace overview</span><h1>Build a record that can survive scrutiny.</h1><p className="hero-lead">Define the system, preserve evidence, run philosophical assessments, compare versions, and export a structured responsibility report.</p></div>
        <Link className="button primary" href="/dashboard/projects/new">Create case <span>↗</span></Link>
      </section>

      <div className="dashboard-grid dashboard-metrics">
        <div className="panel metric"><span>Active cases</span><strong>{projectCount || 0}</strong><small>systems under review</small></div>
        <div className="panel metric"><span>Assessment versions</span><strong>{assessmentCount || 0}</strong><small>preserved analytical records</small></div>
        <div className="panel metric"><span>Access</span><strong>{subscription?.plan || "Research"}</strong><small>{subscription?.status || "public + private foundation"}</small></div>
      </div>

      <section className="workspace-section">
        <div className="workspace-section-head"><div><span className="overline">Recent cases</span><h2>Continue an assessment.</h2></div><Link className="text-link" href="/dashboard/projects">All cases ↗</Link></div>
        {recentProjects?.length ? (
          <div className="case-grid">
            {recentProjects.map((project) => (
              <Link className="case-card panel" href={`/dashboard/projects/${project.id}`} key={project.id}>
                <div className="case-card-top"><span>{project.system_type}</span><i>{project.status}</i></div>
                <h3>{project.name}</h3>
                <p>{project.organisation || "Independent case"}</p>
                <div className="case-card-foot"><span>Updated {new Date(project.updated_at).toLocaleDateString()}</span><b>Open ↗</b></div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state panel"><span>CASE REGISTER / EMPTY</span><h3>No private case has been created.</h3><p>Start with one real AI system. The system record becomes the stable context for evidence, findings, responsibility mapping, and report versions.</p><Link className="button primary" href="/dashboard/projects/new">Define the first system <span>↗</span></Link></div>
        )}
      </section>

      <section className="workspace-section">
        <div className="workspace-section-head"><div><span className="overline">Assessment sequence</span><h2>One case, four forms of accountability.</h2></div></div>
        <div className="workspace-module-grid">
          <div><span>01</span><strong>Epistemic risk</strong><p>Claims, evidence, uncertainty, reliability.</p></div>
          <div><span>02</span><strong>Responsibility</strong><p>Control, authority, oversight, repair.</p></div>
          <div><span>03</span><strong>Contestability</strong><p>Explanation, review, appeal, remedy.</p></div>
          <div><span>04</span><strong>Identity impact</strong><p>Classification, authorship, recognition.</p></div>
        </div>
      </section>
    </>
  );
}

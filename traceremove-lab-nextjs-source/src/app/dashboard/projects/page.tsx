import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Cases" };

export default async function ProjectsPage() {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: projects } = await supabase.from("projects").select("id,name,organisation,system_type,status,updated_at,created_at").eq("owner_id", user.id).order("updated_at", { ascending: false });

  return (
    <>
      <section className="workspace-hero">
        <div><span className="overline">Case register</span><h1>Systems under philosophical and institutional review.</h1><p className="hero-lead">Each case preserves one stable system description, its evidence, assessment versions, responsibility map, and report history.</p></div>
        <Link className="button primary" href="/dashboard/projects/new">New case <span>↗</span></Link>
      </section>

      <section className="workspace-section">
        <div className="case-register-head"><span>{String(projects?.length || 0).padStart(2,"0")} cases</span><span>Private account scope</span></div>
        {!projects?.length ? (
          <div className="empty-state panel"><span>CASE REGISTER / EMPTY</span><h3>No AI system has been defined.</h3><p>Start with the system’s claimed function, decision context, affected people, and institutional owner. Analysis begins only after the object of judgment is made explicit.</p><Link className="button primary" href="/dashboard/projects/new">Define a system <span>↗</span></Link></div>
        ) : (
          <div className="case-register">
            {projects.map((project, index) => (
              <Link className="case-register-row" href={`/dashboard/projects/${project.id}`} key={project.id}>
                <span className="case-register-no">{String(index + 1).padStart(2,"0")}</span>
                <div><span className="case-register-meta">{project.system_type} · {project.status}</span><h2>{project.name}</h2><p>{project.organisation || "Independent case"}</p></div>
                <div className="case-register-date"><span>Updated</span><strong>{new Date(project.updated_at).toLocaleDateString()}</strong></div>
                <span className="case-register-arrow">↗</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

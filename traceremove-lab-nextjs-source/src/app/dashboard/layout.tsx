import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { signOutAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  if (!supabase) {
    return (
      <div className="dashboard-gate">
        <span className="overline">Configuration required</span>
        <h1>The workspace is ready for Supabase.</h1>
        <p className="hero-lead">Connect the database and authentication variables to activate accounts, cases, uploads, assessments, reports, and billing.</p>
        <div className="hero-actions"><Link className="button primary" href="/setup">Open setup checklist <span>↗</span></Link><Link className="button" href="/">Return to public site</Link></div>
      </div>
    );
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return (
      <div className="dashboard-gate auth-wrap">
        <span className="overline">Private workspace</span>
        <h1>Sign in to open the Laboratory.</h1>
        <p className="hero-lead">Cases, uploaded evidence, findings, and reports are separated from the public research archive.</p>
        <div className="hero-actions"><Link className="button primary" href="/login?next=/dashboard">Secure sign in <span>↗</span></Link><Link className="button" href="/">Public research site</Link></div>
      </div>
    );
  }

  const { data: profile } = await supabase.from("profiles").select("role,full_name").eq("id", user.id).maybeSingle();
  const isAdmin = profile?.role === "admin";

  return (
    <div className="dashboard-shell">
      <DashboardSidebar isAdmin={isAdmin} />
      <section className="dashboard-workspace">
        <header className="dashboard-header">
          <div><span className="workspace-kicker">Traceremove / AI Responsibility Laboratory</span><span className="workspace-user">{profile?.full_name || user.email}</span></div>
          <div className="workspace-header-actions"><span className="workspace-secure"><i /> Private environment</span><form action={signOutAction}><button className="button small" type="submit">Sign out</button></form></div>
        </header>
        <div className="dashboard-main">{children}</div>
      </section>
    </div>
  );
}

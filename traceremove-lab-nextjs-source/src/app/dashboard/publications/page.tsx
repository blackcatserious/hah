import { createClient } from "@/lib/supabase/server";
import { createPublicationAction } from "./actions";

export const metadata = { title: "Publications admin" };

export default async function PublicationsAdminPage({ searchParams }: { searchParams: Promise<{ error?: string; created?: string }> }) {
  const params = await searchParams;
  const supabase = await createClient();
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (profile?.role !== "admin") return <div className="panel empty">Administrator access is required.</div>;
  const { data: items } = await supabase.from("publications").select("id,title,kind,status_label,year,is_public,updated_at").order("updated_at", { ascending: false });

  return (
    <>
      <span className="overline">Research archive admin</span>
      <h1>Manage publications and working papers.</h1>
      <form className="panel card form" action={createPublicationAction} style={{maxWidth:900,marginTop:25}}>
        <div className="field"><label htmlFor="title">Title</label><input id="title" name="title" className="input" required /></div>
        <div className="grid two" style={{marginTop:0}}>
          <div className="field"><label htmlFor="slug">Slug</label><input id="slug" name="slug" className="input" required placeholder="machine-testimony" /></div>
          <div className="field"><label htmlFor="year">Year</label><input id="year" name="year" className="input" required defaultValue="2026" /></div>
          <div className="field"><label htmlFor="kind">Record type</label><select id="kind" name="kind" className="select" defaultValue="working_paper"><option value="research_essay">Research essay</option><option value="working_paper">Working paper</option><option value="manuscript">Manuscript</option><option value="published">Published</option></select></div>
          <div className="field"><label htmlFor="status_label">Status label</label><input id="status_label" name="status_label" className="input" required defaultValue="Working paper" /></div>
        </div>
        <div className="field"><label htmlFor="abstract">Abstract</label><textarea id="abstract" name="abstract" className="textarea" required /></div>
        <div className="field"><label htmlFor="keywords">Keywords, comma separated</label><input id="keywords" name="keywords" className="input" /></div>
        <div className="grid two" style={{marginTop:0}}><div className="field"><label htmlFor="url">Public record URL</label><input id="url" name="url" className="input" type="url" /></div><div className="field"><label htmlFor="pdf_url">PDF URL</label><input id="pdf_url" name="pdf_url" className="input" type="url" /></div></div>
        <div className="field"><label htmlFor="is_public">Visibility</label><select id="is_public" name="is_public" className="select" defaultValue="false"><option value="false">Private draft</option><option value="true">Public record</option></select></div>
        {params.error && <p className="form-error">The record could not be saved.</p>}
        {params.created && <p className="form-success">Publication record created.</p>}
        <button className="button primary" type="submit">Add publication record</button>
      </form>
      <section className="section"><span className="overline">Existing records</span><div className="table-wrap panel"><table><thead><tr><th>Title</th><th>Type</th><th>Status</th><th>Visibility</th></tr></thead><tbody>{items?.map((item) => <tr key={item.id}><td>{item.title}<div className="publication-meta">{item.year}</div></td><td>{item.kind}</td><td>{item.status_label}</td><td>{item.is_public ? "Public" : "Private"}</td></tr>)}</tbody></table></div></section>
    </>
  );
}

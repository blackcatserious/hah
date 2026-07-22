import { createClient } from "@/lib/supabase/server";
import { publications as fallbackPublications, type Publication } from "@/lib/research-data";
import { PublicationArchive } from "@/components/publications/publication-archive";

export const metadata = { title: "Research archive" };
export const revalidate = 60;

async function getPublications(): Promise<Publication[]> {
  const supabase = await createClient();
  if (!supabase) return fallbackPublications;
  const { data, error } = await supabase
    .from("publications")
    .select("id,title,slug,kind,status_label,year,abstract,keywords,url,pdf_url")
    .eq("is_public", true)
    .order("published_at", { ascending: false, nullsFirst: false });
  if (error || !data?.length) return fallbackPublications;
  return data.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    kind: item.kind,
    statusLabel: item.status_label,
    year: item.year,
    abstract: item.abstract,
    keywords: item.keywords || [],
    url: item.url,
    pdfUrl: item.pdf_url,
  }));
}

export default async function PublicationsPage() {
  const items = await getPublications();
  return (
    <>
      <section className="hero archive-hero">
        <div className="hero-index"><span>RESEARCH ARCHIVE</span><span>ESSAYS / WORKING PAPERS / MANUSCRIPTS</span></div>
        <h1>An archive should disclose the status of an argument, not merely display its title.</h1>
        <p className="hero-lead">Each record is labelled according to its actual stage. Drafts are not presented as peer-reviewed publications; public links are added only when a text has a verifiable external record.</p>
      </section>
      <section className="section"><PublicationArchive items={items} /></section>
    </>
  );
}

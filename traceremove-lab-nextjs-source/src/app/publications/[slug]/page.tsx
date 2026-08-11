import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { publications as fallbackPublications, type Publication } from "@/lib/research-data";
import { siteUrl } from "@/lib/env";

export const revalidate = 60;

const kindLabels: Record<string, string> = {
  research_essay: "Research essay",
  working_paper: "Working paper",
  manuscript: "Manuscript",
  published: "Published record",
};

async function getPublication(slug: string): Promise<Publication | null> {
  const supabase = await createClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("publications")
      .select("id,title,slug,kind,status_label,year,abstract,keywords,url,pdf_url")
      .eq("slug", slug)
      .eq("is_public", true)
      .maybeSingle();
    if (!error && data) {
      return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        kind: data.kind,
        statusLabel: data.status_label,
        year: data.year,
        abstract: data.abstract,
        keywords: data.keywords || [],
        url: data.url,
        pdfUrl: data.pdf_url,
      };
    }
  }
  return fallbackPublications.find((item) => item.slug === slug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const record = await getPublication(slug);
  if (!record) {
    return { title: "Record not found", robots: { index: false, follow: false } };
  }
  const description =
    record.abstract.length > 180 ? record.abstract.slice(0, 177).trimEnd() + "..." : record.abstract;
  const path = "/publications/" + record.slug;
  return {
    title: record.title,
    description,
    keywords: record.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: record.title,
      description,
      url: path,
    },
  };
}

export default async function PublicationRecordPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const record = await getPublication(slug);
  if (!record) {
    notFound();
  }
  const canonical = siteUrl + "/publications/" + record.slug;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: record.title,
    abstract: record.abstract,
    inLanguage: "en",
    datePublished: record.year,
    keywords: record.keywords.join(", "),
    creativeWorkStatus: record.statusLabel,
    url: canonical,
    mainEntityOfPage: canonical,
    author: { "@type": "Person", name: "Artur Ziganshin", url: siteUrl + "/about" },
    publisher: { "@type": "Organization", name: "Traceremove Research", url: siteUrl },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="hero record-hero">
        <div className="hero-index">
          <span>{kindLabels[record.kind] ?? "Archive record"}</span>
          <span>{record.year}</span>
          <span>{record.statusLabel}</span>
        </div>
        <h1>{record.title}</h1>
      </section>

      <section className="section">
        <div className="overline">Abstract</div>
        <p>{record.abstract}</p>
        {record.keywords.length > 0 ? (
          <div className="keyword-row">
            {record.keywords.map((keyword) => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>
        ) : null}
        <div className="publication-record-links record-links">
          {record.url ? (
            <a href={record.url} target="_blank" rel="noreferrer">
              Public record
            </a>
          ) : null}
          {record.pdfUrl ? (
            <a href={record.pdfUrl} target="_blank" rel="noreferrer">
              PDF
            </a>
          ) : null}
          <Link href="/publications">Back to the archive</Link>
        </div>
      </section>

      <section className="section panel">
        <div className="overline">Status of this record</div>
        <p>
          This entry is labelled {record.statusLabel.toLowerCase()}. The archive states the stage of an
          argument instead of presenting drafts as settled results, so a reader can judge how much weight
          the text is meant to carry.
        </p>
        <div className="overline">Citation</div>
        <p className="record-citation">
          Ziganshin, A. ({record.year}). {record.title}. Traceremove Research. {canonical}
        </p>
      </section>
    </>
  );
}

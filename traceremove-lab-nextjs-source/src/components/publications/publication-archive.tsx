"use client";

import { useMemo, useState } from "react";
import type { Publication } from "@/lib/research-data";

const filters = [
  ["all", "All records"],
  ["research_essay", "Research essays"],
  ["working_paper", "Working papers"],
  ["manuscript", "Manuscripts"],
] as const;

export function PublicationArchive({ items }: { items: Publication[] }) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const search = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesFilter = filter === "all" || item.kind === filter;
      const haystack = [item.title, item.abstract, item.statusLabel, ...item.keywords].join(" ").toLowerCase();
      return matchesFilter && (!search || haystack.includes(search));
    });
  }, [items, filter, query]);

  return (
    <div className="archive-system">
      <div className="archive-toolbar panel">
        <div className="archive-filters">
          {filters.map(([value, label]) => (
            <button key={value} type="button" className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>
          ))}
        </div>
        <label className="archive-search">
          <span>Search archive</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="identity, testimony, dignity…" />
        </label>
      </div>

      <div className="archive-count"><span>{String(visible.length).padStart(2, "0")} records</span><span>Transparent publication status</span></div>
      <div className="publication-index">
        {visible.map((item, index) => (
          <article key={item.id || item.slug} className="publication-record">
            <div className="publication-record-no">{String(index + 1).padStart(2, "0")}</div>
            <div className="publication-record-main">
              <div className="publication-record-meta"><span>{item.year}</span><span>{item.statusLabel}</span><span>{item.kind.replaceAll("_", " ")}</span></div>
              <h2>{item.title}</h2>
              <p>{item.abstract}</p>
              <div className="keyword-row">{item.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div>
            </div>
            <div className="publication-record-links">
              {item.url && <a href={item.url} target="_blank" rel="noreferrer">Public record ↗</a>}
              {item.pdfUrl && <a href={item.pdfUrl} target="_blank" rel="noreferrer">PDF ↗</a>}
              {!item.url && !item.pdfUrl && <span>Archive record</span>}
            </div>
          </article>
        ))}
        {!visible.length && <div className="panel empty">No archive record matches this query.</div>}
      </div>
    </div>
  );
}

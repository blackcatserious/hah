import Link from "next/link";
import { programmes, publications } from "@/lib/research-data";
import { ResearchConstellation } from "@/components/home/research-constellation";

const assessmentModules = [
  ["01", "Epistemic risk", "Tests what the system claims, what evidence supports it, and where confidence exceeds warrant."],
  ["02", "Responsibility architecture", "Locates control, oversight, explanation duties, and the capacity to repair harm."],
  ["03", "Dignity & contestability", "Examines whether affected people can understand, challenge, refuse, and obtain remedy."],
  ["04", "Narrative identity impact", "Assesses how profiling and algorithmic interpretation alter a person’s authorship of self."],
];

export default function HomePage() {
  return (
    <>
      <section className="hero hero-home">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-index">
              <span>ARTUR ZIGANSHIN</span>
              <span>PHILOSOPHY OF AI / APPLIED ETHICS</span>
            </div>
            <h1>AI does not merely answer. It reorganises who may speak, decide, and remain responsible.</h1>
            <p className="hero-lead">
              An independent research platform examining narrative identity, machine testimony,
              dignity, contestability, and the institutional distribution of responsibility in AI systems.
            </p>
            <div className="hero-actions">
              <Link className="button primary" href="/lab">Enter the laboratory <span>↗</span></Link>
              <Link className="button" href="/research">Read the research programme</Link>
            </div>
            <div className="hero-footnotes">
              <span><b>{programmes.length}</b> research programmes</span>
              <span><b>{publications.length}</b> texts in the archive</span>
              <span><b>4</b> assessment modules</span>
            </div>
          </div>
          <ResearchConstellation />
        </div>
      </section>

      <section className="section signal-section">
        <div className="section-heading split-heading">
          <div>
            <span className="overline">Research problem</span>
            <h2>The unresolved layer is not intelligence. It is legitimacy.</h2>
          </div>
          <p className="section-intro">
            Most AI governance begins after a system has already been framed as useful, objective,
            or inevitable. This programme begins earlier: with the claims, concepts, and power
            relations that make a system appear entitled to act.
          </p>
        </div>
        <div className="signal-grid">
          <article className="signal-card signal-card-large">
            <span className="signal-number">01</span>
            <div>
              <span className="eyebrow">Narrative authority</span>
              <h3>Who is authorised to describe a person?</h3>
              <p>AI systems increasingly produce consequential accounts of character, risk, competence, credibility, and identity. The philosophical problem is not only whether these accounts are accurate, but whether the subject can remain an author rather than an object of description.</p>
            </div>
          </article>
          <article className="signal-card">
            <span className="signal-number">02</span>
            <div><span className="eyebrow">Epistemic authority</span><h3>When does output become testimony?</h3><p>Fluency can create the social appearance of knowledge before the conditions of knowledge are present.</p></div>
          </article>
          <article className="signal-card">
            <span className="signal-number">03</span>
            <div><span className="eyebrow">Institutional authority</span><h3>Where does responsibility go?</h3><p>Distributed systems often distribute control while concentrating consequences on the affected person.</p></div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-heading split-heading">
          <div><span className="overline">Research architecture</span><h2>Six connected lines of inquiry.</h2></div>
          <Link className="text-link" href="/research">Full programme <span>↗</span></Link>
        </div>
        <div className="programme-index">
          {programmes.map((item, index) => (
            <article key={item.no} className={`programme-row ${index === 0 ? "featured" : ""}`}>
              <span className="programme-no">{item.no}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="programme-arrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section laboratory-preview panel">
        <div className="lab-preview-copy">
          <span className="overline">Applied laboratory</span>
          <h2>Turn philosophical analysis into an auditable instrument.</h2>
          <p>
            The paid workspace does not produce a generic ethics score. It creates a versioned
            argument: what the system claims, where evidence is missing, who remains responsible,
            what people are owed, and which risks cannot be designed away.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/dashboard/projects/new">Start an assessment <span>↗</span></Link>
            <Link className="button" href="/pricing">Access models</Link>
          </div>
        </div>
        <div className="module-stack">
          {assessmentModules.map(([no, title, copy]) => (
            <article key={no} className="module-row">
              <span>{no}</span>
              <div><strong>{title}</strong><p>{copy}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section archive-preview">
        <div className="section-heading split-heading">
          <div><span className="overline">Current archive</span><h2>Texts, manuscripts, and research essays.</h2></div>
          <Link className="text-link" href="/publications">Open archive <span>↗</span></Link>
        </div>
        <div className="archive-lines">
          {publications.slice(0, 4).map((item, index) => (
            <article key={item.slug} className="archive-line">
              <span className="archive-index">0{index + 1}</span>
              <div><span className="publication-meta">{item.year} · {item.statusLabel}</span><h3>{item.title}</h3></div>
              <div className="keyword-row">{item.keywords.slice(0, 3).map((keyword) => <span key={keyword}>{keyword}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section institutional-cta">
        <span className="overline">Institutional work</span>
        <h2>For organisations that need an argument, not a decorative ethics statement.</h2>
        <p>System assessment, responsibility architecture, executive workshops, and independent review of consequential AI deployments.</p>
        <Link className="button primary" href="/contact">Discuss an institutional audit <span>↗</span></Link>
      </section>
    </>
  );
}

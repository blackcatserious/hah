import Link from "next/link";
import { programmes } from "@/lib/research-data";

export const metadata = { title: "Research programme" };

const methods = [
  ["Conceptual analysis", "Clarify what the system claims to know, understand, predict, or decide before evaluating whether those claims are legitimate."],
  ["Normative inquiry", "Identify what is owed to affected people: recognition, explanation, consent, review, refusal, appeal, and remedy."],
  ["Institutional mapping", "Locate control and responsibility across providers, product teams, organisations, operators, and public authorities."],
  ["Applied evidence", "Use concrete digital systems, disputes, documents, and decision contexts to test philosophical abstractions against practice."],
];

export default function ResearchPage() {
  return (
    <>
      <section className="hero research-hero">
        <div className="hero-index"><span>RESEARCH PROGRAMME</span><span>IDENTITY / KNOWLEDGE / RESPONSIBILITY</span></div>
        <h1>Artificial intelligence is becoming part of the environment in which people become knowable.</h1>
        <p className="hero-lead">
          The programme studies AI not as an isolated technical object but as an institutional
          relation: a system that produces descriptions, recommendations, classifications, and
          decisions that others may treat as authoritative.
        </p>
      </section>

      <section className="section research-thesis panel">
        <span className="overline">Central thesis</span>
        <blockquote>When AI participates in the production of identity, knowledge, and public decisions, legitimacy depends on more than performance. It depends on authorship, warrant, contestability, and the preservation of responsibility.</blockquote>
        <div className="thesis-meta"><span>Research statement / 2026</span><Link href="/publications">Open related texts ↗</Link></div>
      </section>

      <section className="section">
        <div className="section-heading split-heading">
          <div><span className="overline">Research architecture</span><h2>Six lines of inquiry, one philosophical problem.</h2></div>
          <p className="section-intro">Each programme can stand independently, but the central concern remains the same: how computational authority changes the conditions under which persons and institutions may claim to know and act.</p>
        </div>
        <div className="research-programmes">
          {programmes.map((item, index) => (
            <article className={`research-programme ${index === 0 ? "lead" : ""}`} key={item.no}>
              <div className="research-programme-head"><span>{item.no}</span><em>{index === 0 ? "Primary programme" : "Connected programme"}</em></div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="research-question"><span>Question</span><strong>{item.question}</strong></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading split-heading"><div><span className="overline">Method</span><h2>From technical description to philosophical judgment.</h2></div><Link className="text-link" href="/lab">See the method in the Laboratory ↗</Link></div>
        <div className="method-grid">
          {methods.map(([title, copy], index) => (
            <article className="method-card" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className="section research-boundary panel">
        <div><span className="overline">Research boundary</span><h2>This is not an anti-technology programme.</h2></div>
        <p>The aim is not to reject AI or to assign it a fictional moral personality. The aim is to specify the epistemic, ethical, and institutional conditions under which its use can remain legitimate—and to identify situations in which those conditions are absent.</p>
      </section>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { laboratoryConcepts, laboratoryLenses, laboratoryProtocol } from "@/lib/research-data";
import { PublicDiagnostic } from "@/components/lab/public-diagnostic";

export function Laboratory() {
  const [lensIndex, setLensIndex] = useState(0);
  const [conceptIndex, setConceptIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const lens = laboratoryLenses[lensIndex];
  const concept = laboratoryConcepts[conceptIndex];
  const step = laboratoryProtocol[stepIndex];

  return (
    <>
      <section className="hero lab-hero">
        <div className="lab-hero-grid">
          <div>
            <div className="hero-index"><span>AI RESPONSIBILITY LABORATORY</span><span>PUBLIC METHOD / PRIVATE WORKSPACE</span></div>
            <h1>A system should not become powerful faster than it becomes answerable.</h1>
            <p className="hero-lead">
              The Laboratory examines what an AI system claims, what authorises those claims,
              who remains responsible, and whether affected people can contest the result.
            </p>
            <div className="hero-actions">
              <Link className="button primary" href="/dashboard/projects/new">Open a case <span>↗</span></Link>
              <Link className="button" href="#diagnostic">Run public diagnostic</Link>
            </div>
          </div>
          <div className="lab-manifesto panel">
            <div className="manifesto-top"><span>Operational premise</span><span>01 / 04</span></div>
            <blockquote>“The right answer is not enough without the right conditions for giving it.”</blockquote>
            <div className="manifesto-grid">
              <span>Evidence</span><span>Authority</span><span>Contestability</span><span>Remedy</span>
            </div>
          </div>
        </div>
      </section>

      <section id="diagnostic" className="section">
        <PublicDiagnostic />
      </section>

      <section className="section">
        <div className="section-heading split-heading">
          <div><span className="overline">01 — Inquiry lenses</span><h2>Begin with the question the system would prefer to avoid.</h2></div>
          <p className="section-intro">Each lens exposes a different form of authority: authority to claim knowledge, to interpret meaning, or to decide what happens to a person.</p>
        </div>
        <div className="lens-console panel">
          <div className="lens-nav">
            {laboratoryLenses.map((item, index) => (
              <button key={item.label} type="button" className={index === lensIndex ? "active" : ""} onClick={() => setLensIndex(index)} aria-pressed={index === lensIndex}>
                <span>0{index + 1}</span><strong>{item.label}</strong><em>{item.question}</em>
              </button>
            ))}
          </div>
          <div className="lens-output" aria-live="polite">
            <div className="lens-output-head"><span className="overline">Active lens</span><span>TR-LENS / 0{lensIndex + 1}</span></div>
            <h3>{lens.question}</h3>
            <p className="lens-description">{lens.description}</p>
            <div className="normative-stake"><span>Normative stake</span><p>{lens.stake}</p></div>
            <div className="investigation-list">
              {lens.items.map((item, index) => <div key={item}><span>0{index + 1}</span><p>{item}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading split-heading">
          <div><span className="overline">02 — Concept architecture</span><h2>Concepts are instruments, not decoration.</h2></div>
          <p className="section-intro">The map shows how epistemic and normative concepts depend on one another. Select a node to inspect its role in the method.</p>
        </div>
        <div className="concept-console panel">
          <div className="concept-map">
            <div className="concept-axis horizontal" /><div className="concept-axis vertical" />
            <div className="concept-core"><span>AI system</span><small>claim · action · institution</small></div>
            {laboratoryConcepts.map((item, index) => (
              <button key={item.label} type="button" className={`concept-node concept-node-${index + 1} ${index === conceptIndex ? "active" : ""}`} onClick={() => setConceptIndex(index)} aria-pressed={index === conceptIndex}>
                <i /><span>{item.label}</span>
              </button>
            ))}
          </div>
          <aside className="concept-readout" aria-live="polite">
            <span className="overline">Selected concept / 0{conceptIndex + 1}</span>
            <h3>{concept.label}</h3>
            <p>{concept.description}</p>
            <div className="tags"><span>Connected terms</span><div className="tag-row">{concept.relations.map((relation) => <em key={relation}>{relation}</em>)}</div></div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="section-heading split-heading">
          <div><span className="overline">03 — Assessment protocol</span><h2>From technical description to accountable judgment.</h2></div>
          <Link className="text-link" href="/dashboard/projects/new">Apply protocol to a system <span>↗</span></Link>
        </div>
        <div className="protocol-console panel">
          <div className="protocol-rail">
            {laboratoryProtocol.map(([title], index) => (
              <button key={title} type="button" className={index === stepIndex ? "active" : ""} onClick={() => setStepIndex(index)} aria-pressed={index === stepIndex}>
                <span>0{index + 1}</span><strong>{title}</strong>
              </button>
            ))}
          </div>
          <div className="protocol-output" aria-live="polite">
            <span className="overline">Protocol stage {stepIndex + 1} / {laboratoryProtocol.length}</span>
            <h3>{step[0]}</h3>
            <p>{step[1]}</p>
            <div className="protocol-marker"><i style={{ width: `${((stepIndex + 1) / laboratoryProtocol.length) * 100}%` }} /></div>
          </div>
        </div>
      </section>

      <section className="section institutional-cta lab-final">
        <span className="overline">Private workspace</span>
        <h2>Move from a public heuristic to a versioned, evidence-based assessment.</h2>
        <p>Upload documentation, run all four modules, preserve findings, compare versions, and export a structured report for internal review.</p>
        <div className="hero-actions"><Link className="button primary" href="/dashboard/projects/new">Create an assessment <span>↗</span></Link><Link className="button" href="/pricing">View access</Link></div>
      </section>
    </>
  );
}

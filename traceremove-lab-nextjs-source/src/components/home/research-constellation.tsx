"use client";

import { useState } from "react";

const nodes = [
  {
    id: "identity",
    label: "Narrative identity",
    code: "N-01",
    copy: "How algorithmic systems participate in the stories through which persons become intelligible to themselves and others.",
    x: 24,
    y: 26,
  },
  {
    id: "knowledge",
    label: "Machine testimony",
    code: "E-02",
    copy: "When an AI output may count as a reason for belief, and where fluency conceals an absence of warrant.",
    x: 73,
    y: 23,
  },
  {
    id: "responsibility",
    label: "Responsibility",
    code: "R-03",
    copy: "How duties are distributed across model providers, product teams, institutions, operators, and affected persons.",
    x: 79,
    y: 72,
  },
  {
    id: "dignity",
    label: "Contestability",
    code: "D-04",
    copy: "Whether people can understand, refuse, challenge, correct, and appeal consequential computational decisions.",
    x: 25,
    y: 76,
  },
];

export function ResearchConstellation() {
  const [active, setActive] = useState(0);
  const selected = nodes[active];

  return (
    <div className="constellation panel" aria-label="Interactive research constellation">
      <div className="constellation-topline">
        <span>Research topology</span>
        <span>04 connected fields</span>
      </div>
      <div className="constellation-stage">
        <div className="orbit orbit-a" />
        <div className="orbit orbit-b" />
        <div className="axis axis-x" />
        <div className="axis axis-y" />
        <div className="constellation-core">
          <span>AI</span>
          <small>as institutional<br />relation</small>
        </div>
        {nodes.map((node, index) => (
          <button
            key={node.id}
            type="button"
            className={`constellation-node ${index === active ? "active" : ""}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            onClick={() => setActive(index)}
            aria-pressed={index === active}
          >
            <i />
            <span>{node.code}</span>
          </button>
        ))}
      </div>
      <div className="constellation-readout" aria-live="polite">
        <span className="readout-code">{selected.code}</span>
        <div>
          <strong>{selected.label}</strong>
          <p>{selected.copy}</p>
        </div>
      </div>
    </div>
  );
}

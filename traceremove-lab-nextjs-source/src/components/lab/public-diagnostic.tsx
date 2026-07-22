"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Answers = {
  stakes: "low" | "medium" | "high";
  evidence: "strong" | "partial" | "weak";
  review: "required" | "available" | "absent";
  appeal: "clear" | "limited" | "none";
  identity: "none" | "indirect" | "direct";
};

const defaults: Answers = {
  stakes: "medium",
  evidence: "partial",
  review: "available",
  appeal: "limited",
  identity: "indirect",
};

function calculate(answers: Answers) {
  const epistemic = { strong: 24, partial: 58, weak: 86 }[answers.evidence];
  const responsibility = { required: 26, available: 54, absent: 88 }[answers.review];
  const contestability = { clear: 22, limited: 60, none: 92 }[answers.appeal];
  const identity = { none: 18, indirect: 55, direct: 85 }[answers.identity];
  const stakesMultiplier = { low: 0.78, medium: 1, high: 1.16 }[answers.stakes];
  const scores = {
    epistemic: Math.min(100, Math.round(epistemic * stakesMultiplier)),
    responsibility: Math.min(100, Math.round(responsibility * stakesMultiplier)),
    contestability: Math.min(100, Math.round(contestability * stakesMultiplier)),
    identity: Math.min(100, Math.round(identity * stakesMultiplier)),
  };
  const overall = Math.round(Object.values(scores).reduce((sum, value) => sum + value, 0) / 4);
  const level = overall >= 75 ? "Critical review required" : overall >= 55 ? "Material governance risk" : overall >= 35 ? "Moderate unresolved risk" : "Low preliminary concern";
  const next = overall >= 75
    ? "Do not rely on the system for consequential decisions until evidence, human authority, and appeal routes are materially redesigned."
    : overall >= 55
      ? "Commission a full responsibility assessment before scaling or formal institutional reliance."
      : overall >= 35
        ? "Document residual uncertainty and strengthen the weakest governance dimension before deployment."
        : "Maintain monitoring and preserve the current conditions of review and contestability.";
  return { scores, overall, level, next };
}

export function PublicDiagnostic() {
  const [answers, setAnswers] = useState<Answers>(defaults);
  const result = useMemo(() => calculate(answers), [answers]);

  function update<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  const dimensions = [
    ["Epistemic risk", result.scores.epistemic],
    ["Responsibility gap", result.scores.responsibility],
    ["Contestability deficit", result.scores.contestability],
    ["Identity impact", result.scores.identity],
  ] as const;

  return (
    <div className="diagnostic panel">
      <div className="diagnostic-header">
        <div><span className="overline">Public diagnostic / rule-based preview</span><h2>Build a preliminary risk profile.</h2></div>
        <span className="diagnostic-id">METHOD / TR-04</span>
      </div>

      <div className="diagnostic-grid">
        <form className="diagnostic-form" onSubmit={(event) => event.preventDefault()}>
          <DiagnosticField label="Consequences if the system is wrong" value={answers.stakes} onChange={(value) => update("stakes", value as Answers["stakes"])} options={[["low","Limited"],["medium","Material"],["high","Rights / life-changing"]]} />
          <DiagnosticField label="Traceability of evidence" value={answers.evidence} onChange={(value) => update("evidence", value as Answers["evidence"])} options={[["strong","Strong"],["partial","Partial"],["weak","Weak / opaque"]]} />
          <DiagnosticField label="Human decision authority" value={answers.review} onChange={(value) => update("review", value as Answers["review"])} options={[["required","Required"],["available","Available"],["absent","Absent"]]} />
          <DiagnosticField label="Appeal and correction" value={answers.appeal} onChange={(value) => update("appeal", value as Answers["appeal"])} options={[["clear","Clear route"],["limited","Limited"],["none","No meaningful route"]]} />
          <DiagnosticField label="Impact on a person’s identity or reputation" value={answers.identity} onChange={(value) => update("identity", value as Answers["identity"])} options={[["none","None"],["indirect","Indirect"],["direct","Direct classification"]]} />
        </form>

        <div className="diagnostic-result" aria-live="polite">
          <div className="risk-dial" style={{ "--risk": `${result.overall * 3.6}deg` } as React.CSSProperties}>
            <div><strong>{result.overall}</strong><span>/100</span></div>
          </div>
          <span className="risk-level">{result.level}</span>
          <div className="risk-bars">
            {dimensions.map(([label, score]) => (
              <div className="risk-bar" key={label}>
                <div><span>{label}</span><b>{score}</b></div>
                <i><em style={{ width: `${score}%` }} /></i>
              </div>
            ))}
          </div>
          <div className="diagnostic-next">
            <span>Preliminary reading</span>
            <p>{result.next}</p>
          </div>
          <Link className="button primary full" href="/dashboard/projects/new">Create a full assessment <span>↗</span></Link>
          <small>This public diagnostic is a transparent heuristic, not an AI-generated audit, legal opinion, or certification.</small>
        </div>
      </div>
    </div>
  );
}

function DiagnosticField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: [string, string][] }) {
  return (
    <fieldset className="diagnostic-field">
      <legend>{label}</legend>
      <div>
        {options.map(([optionValue, optionLabel]) => (
          <button key={optionValue} type="button" className={value === optionValue ? "active" : ""} onClick={() => onChange(optionValue)}>{optionLabel}</button>
        ))}
      </div>
    </fieldset>
  );
}

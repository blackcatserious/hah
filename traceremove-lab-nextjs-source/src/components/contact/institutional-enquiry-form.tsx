"use client";

import { useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function track(event: string, detail: Record<string, unknown> = {}) {
  const payload = { event, location: "institutional_contact", ...detail };
  window.dataLayer?.push(payload);
  window.dispatchEvent(new CustomEvent("traceremove:conversion", { detail: payload }));
}

export default function InstitutionalEnquiryForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      body.append(key, String(value));
    }

    setSubmitState("submitting");
    track("institutional_enquiry_started", {
      enquiry_type: formData.get("enquiry_type"),
      deployment_stage: formData.get("deployment_stage"),
    });

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (!response.ok) {
        throw new Error("Submission could not be stored");
      }

      track("institutional_enquiry_submitted", {
        enquiry_type: formData.get("enquiry_type"),
        deployment_stage: formData.get("deployment_stage"),
      });
      form.reset();
      setSubmitState("success");
    } catch {
      track("institutional_enquiry_failed");
      setSubmitState("error");
    }
  }

  return (
    <form
      className="form"
      name="institutional-enquiry"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="institutional-enquiry" />
      <input type="hidden" name="subject" value="New traceremove.dev institutional enquiry" />
      <input type="hidden" name="source" value="traceremove.dev/contact" />

      <p hidden aria-hidden="true">
        <label>Leave this field empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
      </p>

      <div className="field">
        <label htmlFor="enquiry_type">What do you need?</label>
        <select className="select" id="enquiry_type" name="enquiry_type" required defaultValue="">
          <option value="" disabled>Select an engagement</option>
          <option value="institutional_assessment">Institutional AI assessment</option>
          <option value="independent_review">Independent system review</option>
          <option value="executive_workshop">Executive workshop</option>
          <option value="research_collaboration">Research collaboration</option>
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18 }}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input className="input" id="name" name="name" autoComplete="name" maxLength={120} required />
        </div>
        <div className="field">
          <label htmlFor="work_email">Work email</label>
          <input className="input" id="work_email" name="work_email" type="email" autoComplete="email" maxLength={180} required />
        </div>
      </div>

      <div className="field">
        <label htmlFor="organisation">Organisation</label>
        <input className="input" id="organisation" name="organisation" autoComplete="organization" maxLength={160} required />
      </div>

      <div className="field">
        <label htmlFor="system_purpose">System and purpose</label>
        <textarea className="textarea" id="system_purpose" name="system_purpose" minLength={30} maxLength={2000} required placeholder="What does the system do, and where is it used?" />
      </div>

      <div className="field">
        <label htmlFor="decision_context">Decision or governance problem</label>
        <textarea className="textarea" id="decision_context" name="decision_context" minLength={30} maxLength={2000} required placeholder="Which decision, responsibility, evidence, or legitimacy question needs review?" />
      </div>

      <div className="field">
        <label htmlFor="affected_people">Who is affected?</label>
        <textarea className="textarea" id="affected_people" name="affected_people" minLength={15} maxLength={1200} required placeholder="People, teams, customers, citizens, or other groups affected by the system." />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18 }}>
        <div className="field">
          <label htmlFor="deployment_stage">Deployment stage</label>
          <select className="select" id="deployment_stage" name="deployment_stage" required defaultValue="">
            <option value="" disabled>Select a stage</option>
            <option value="concept">Concept / procurement</option>
            <option value="pilot">Pilot</option>
            <option value="live">Live deployment</option>
            <option value="incident">Incident or contested decision</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="deadline">Decision deadline (optional)</label>
          <input className="input" id="deadline" name="deadline" type="date" />
        </div>
      </div>

      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "var(--muted)", fontSize: 11, lineHeight: 1.55 }}>
        <input name="consent" type="checkbox" value="yes" required style={{ marginTop: 2 }} />
        <span>I agree that Traceremove may use this information to assess and reply to this enquiry.</span>
      </label>

      <p className="form-help">Do not send confidential documents or personal data in this first message. Secure document intake follows after scope review.</p>

      <button className="button" type="submit" disabled={submitState === "submitting"}>
        {submitState === "submitting" ? "Storing enquiry…" : "Request an assessment"}
      </button>

      {submitState === "success" && (
        <p className="form-success" role="status">Enquiry received. We will reply to the work email you supplied.</p>
      )}
      {submitState === "error" && (
        <p className="form-error" role="alert">
          The form could not be stored. Email{" "}
          <a href="mailto:support@traceremove.com?subject=AI%20Responsibility%20Laboratory%20Enquiry">support@traceremove.com</a>.
        </p>
      )}
    </form>
  );
}

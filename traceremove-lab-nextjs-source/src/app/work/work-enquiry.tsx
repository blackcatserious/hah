"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import styles from "./work.module.css";

export function WorkEnquiry() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [ready, setReady] = useState(false);
  const inFlight = useRef(false);
  const confirmation = useRef<HTMLDivElement>(null);
  useEffect(() => setReady(true), []);
  useEffect(() => { if (status === "sent") confirmation.current?.focus(); }, [status]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    for (const control of Array.from(form.elements)) {
      if ((control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement) && control.type !== "checkbox") control.value = control.value.trim();
    }
    const workflow = form.elements.namedItem("workflow") as HTMLTextAreaElement;
    workflow.setCustomValidity(workflow.value.length < 20 ? "Please describe the workflow in at least 20 characters." : "");
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const body = new URLSearchParams();
    for (const [key, value] of fields) if (typeof value === "string") body.set(key, value.trim());
    const params = new URLSearchParams(window.location.search);
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content"]) body.set(key, (params.get(key) || (key === "utm_campaign" ? "work-with-artur-pilot-2026" : "")).slice(0, 160));
    body.set("landing_path", window.location.pathname);
    inFlight.current = true;
    setStatus("sending");
    try {
      const response = await fetch("/__artur_forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(), signal: AbortSignal.timeout(20000),
      });
      if (!response.ok) throw new Error("The enquiry could not be submitted.");
      setStatus("sent");
      form.reset();
    } catch { setStatus("error"); }
    finally { inFlight.current = false; }
  }

  if (status === "sent") return <div className={styles.success} ref={confirmation} tabIndex={-1} aria-labelledby="enquiry-success"><span className={styles.label}>ENQUIRY RECEIVED</span><h3 id="enquiry-success">Thank you.</h3><p>Your enquiry has been submitted for scope review. If it fits the diagnostic, Artur will confirm the scope, timing and payment arrangements before booking.</p><p>No payment has been taken.</p></div>;

  return <form className={styles.form} name="work-with-artur" method="POST" action="/__artur_forms.html" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit}>
    <input type="hidden" name="form-name" value="work-with-artur" />
    <fieldset className={styles.fields} disabled={!ready || status === "sending"}>
    <legend className={styles.visuallyHidden}>Diagnostic enquiry</legend>
    <p hidden><label>Leave this empty<input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
    <div className={styles.formRow}>
      <label>Your name<input name="name" required maxLength={200} autoComplete="name" /></label>
      <label>Email<input name="email" type="email" required maxLength={320} autoComplete="email" /></label>
    </div>
    <label>Organisation and role<input name="organisation_role" required maxLength={240} placeholder="For example: product lead at…" autoComplete="organization-title" /></label>
    <label>One workflow to examine<textarea name="workflow" required minLength={20} maxLength={1500} rows={5} onInput={(event) => event.currentTarget.setCustomValidity("")} placeholder="What does the AI produce? What decision does it influence, and who is affected?" /></label>
    <label>How can someone challenge or correct the output?<textarea name="correction" required maxLength={1000} rows={3} placeholder="A short description is enough. ‘Not sure’ is a useful starting point." /></label>
    <label>Timing<select name="timing" required defaultValue=""><option value="" disabled>Select a timeframe</option><option>Within two weeks</option><option>This month</option><option>This quarter</option><option>Exploratory</option></select></label>
    <label className={styles.consent}><input name="consent" type="checkbox" value="enquiry-only" required /><span>I agree that Artur may use this information to assess and respond to my enquiry, as described <a href="#enquiry-privacy">below</a>.</span></label>
    <p className={styles.small}>Pilot fee: €750. Final quote and any applicable taxes are confirmed before booking.</p>
    <button className={styles.primary} type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending enquiry…" : "Request the diagnostic"}<span aria-hidden="true">↗</span></button>
    </fieldset>
    {status === "error" && <p className={styles.error} role="alert">The submission could not be confirmed. Your text is still here. Please retry or email <a href="mailto:artur@traceremove.com?subject=Work%20with%20Artur%20diagnostic">artur@traceremove.com</a>.</p>}
    <noscript><p>This form requires JavaScript. Please send your enquiry directly to <a href="mailto:artur@traceremove.com">artur@traceremove.com</a>.</p></noscript>
  </form>;
}

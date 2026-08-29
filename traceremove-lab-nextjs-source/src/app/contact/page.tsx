import Link from "next/link";
import InstitutionalEnquiryForm from "@/components/contact/institutional-enquiry-form";

export const metadata = {
  alternates: { canonical: "/contact" },
  title: "Institutional AI assessment enquiry",
  description: "Request an independent AI responsibility assessment, system review, or executive workshop directly from Traceremove.",
};

export default function ContactPage() {
  return (
    <>
      <section className="hero contact-hero">
        <div className="hero-index"><span>CONTACT</span><span>RESEARCH / AUDIT / WORKSHOP</span></div>
        <h1>Bring a system, a decision, and the responsibility problem it creates.</h1>
        <p className="hero-lead">Correspondence is open for academic collaboration, research discussion, institutional assessment, executive workshops, and independent review of consequential AI systems.</p>
      </section>

      <section className="section contact-grid">
        <div className="contact-primary panel">
          <span className="overline">Direct institutional intake</span>
          <h2>Describe the system and what is at stake.</h2>
          <p>Give us enough context to judge fit and scope: the system’s purpose, decision context, affected people, deployment stage, and the responsibility or governance problem that needs review.</p>
          <InstitutionalEnquiryForm />
          <div className="notice">
            Prefer email? Write to{" "}
            <a href="mailto:support@traceremove.com?subject=AI%20Responsibility%20Laboratory%20Enquiry">support@traceremove.com</a>{" "}
            with the subject “AI Responsibility Laboratory”.
          </div>
        </div>

        <div className="contact-routes">
          <article><span>01</span><div><h3>Research correspondence</h3><p>Discussion of papers, concepts, doctoral research, publications, and academic collaboration.</p></div></article>
          <article><span>02</span><div><h3>Institutional assessment</h3><p>Independent analysis of an AI system, evidence base, responsibility architecture, and contestability.</p></div></article>
          <article><span>03</span><div><h3>Executive workshop</h3><p>Focused sessions on machine testimony, responsibility laundering, narrative identity, or public-sector AI.</p></div></article>
        </div>
      </section>

      <section className="section contact-boundary panel">
        <div><span className="overline">Before contact</span><h2>The Laboratory is not a certification vendor.</h2></div>
        <p>It does not issue an “ethical AI” badge. It produces a structured analysis of claims, evidence, institutional roles, unresolved uncertainty, and the conditions required for legitimate reliance.</p>
        <Link className="button" href="/lab">Review the public method</Link>
      </section>
    </>
  );
}

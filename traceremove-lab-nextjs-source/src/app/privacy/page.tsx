import type { Metadata } from "next";
import Link from "next/link";

import {
  legalAddress,
  legalEmail,
  legalEntity,
  legalEstablishment,
  legalSupervisoryAuthority,
  legalUpdated,
  merchantOfRecord,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
  description:
    "How the Traceremove AI Responsibility Laboratory collects, processes, stores and deletes personal data, and the rights you hold over it.",
};

type Clause = { title: string; body: string[] };

type Processor = { name: string; purpose: string; location: string };

const processors: Processor[] = [
  {
    name: "Supabase",
    purpose: "Database, authentication, sign-in links and encrypted file storage for the private workspace",
    location: "Project hosted in Ireland, European Union",
  },
  {
    name: "Netlify",
    purpose: "Website hosting, server-side rendering, content delivery and institutional enquiry form storage",
    location: "United States, with edge delivery worldwide",
  },
  {
    name: "OpenAI",
    purpose: "Model inference for generated assessments, findings and summaries",
    location: "United States",
  },
  {
    name: merchantOfRecord,
    purpose: "Payment processing, invoicing, tax collection and subscription management as merchant of record",
    location: "United Kingdom and European Union",
  },
];

const clauses: Clause[] = [
  {
    title: "Who is responsible for your data",
    body: [
      legalEntity + " is the controller for personal data processed through traceremove.dev and the Laboratory workspace.",
      "We are established in " + legalEstablishment + ".",
      "You can reach us about anything in this policy at " + legalEmail + ". " + legalAddress + ".",
    ],
  },
  {
    title: "What we collect",
    body: [
      "Account data: your email address, the role assigned to your account, the time you signed in, and your subscription status.",\n      "Institutional enquiry data: your name, work email, organisation, engagement type, system purpose, decision context, affected groups, deployment stage, and any deadline you choose to provide.",
      "Workspace content: the projects you create, the documents and evidence you upload, the notes you write, and the assessments and reports generated from them. This can contain personal data if you choose to upload it.",
      "Technical data: request logs, IP address, browser type and error traces produced by our hosting and database providers, kept for security and debugging.",
      "Billing data: your name, billing country, tax identifiers and payment history. This is collected and held by our merchant of record, not by us. We see the invoice record and subscription status, never your full card number.",
      "We do not buy personal data from third parties and we do not run advertising trackers.",
    ],
  },
  {
    title: "Why we process it and on what basis",
    body: [
      "To provide the service you asked for, including running assessments and storing your evidence. Legal basis: performance of a contract.",\n      "To evaluate and reply to an institutional or research enquiry. Legal basis: steps at your request before entering a contract, or our legitimate interest in handling research correspondence.",
      "To keep the platform secure, prevent abuse and debug failures. Legal basis: our legitimate interest in a functioning and safe service.",
      "To take payment and meet tax and accounting obligations. Legal basis: contract and legal obligation.",
      "To send you service messages such as sign-in links, billing notices and material changes to these policies. Legal basis: contract.",
      "To send occasional research updates, only if you asked for them. Legal basis: consent, withdrawable at any time.",
    ],
  },
  {
    title: "How generated assessments work",
    body: [
      "When you run an assessment, the relevant extracts from your project and documents are sent to our model provider so that the analysis can be produced, then the result is stored in your workspace.",
      "Content sent through the provider commercial interface is not used to train its models.",
      "If you do not want a document analysed by a model, do not attach it to an assessment. You can keep it in the evidence register without running analysis on it.",
      "Do not upload special category data, medical records or material under specific legal protection unless you have a lawful basis and have told us in advance.",
    ],
  },
  {
    title: "International transfers",
    body: [
      "Your database, authentication records and uploaded files are stored in the European Union.",
      "Hosting, model inference and payment processing involve transfers outside the European Economic Area. Those transfers rely on the European Commission standard contractual clauses, and where applicable on the EU-US Data Privacy Framework.",
    ],
  },
  {
    title: "How long we keep data",
    body: [
      "Workspace content is kept until you delete it or until 30 days after your account is closed.",\n      "Institutional enquiries are kept while they are active and for as long as reasonably needed for follow-up, safeguarding and business records.",
      "Account records are kept while your account is active and for 12 months afterwards, so that we can answer questions about past work.",
      "Invoices and tax records are kept for the period required by tax law, which is normally between six and ten years depending on jurisdiction.",
      "Technical logs are kept for a short retention window, normally no more than 90 days.",
    ],
  },
  {
    title: "How we protect data",
    body: [
      "Every workspace table is protected by row level security, so one account cannot read another account records.",
      "Uploaded files sit in a private storage bucket that is not publicly addressable and is reachable only through short-lived signed links.",
      "Data is encrypted in transit and at rest. Administrative credentials are held only on the server side and never sent to the browser.",
      "No system is perfect. If a breach affects your rights we will tell you and the competent supervisory authority without undue delay.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "You can ask for a copy of your personal data, ask us to correct it, ask us to delete it, ask us to restrict processing, object to processing based on legitimate interests, and ask for your data in a portable format.",
      "Where processing rests on consent you can withdraw that consent at any time.",
      "Write to " + legalEmail + " and we will answer within one month. There is no charge for a reasonable request.",
      "If you are unhappy with our answer you can complain to the " + legalSupervisoryAuthority + ", which is our lead supervisory authority, or to the data protection authority of the country where you live.",
    ],
  },
  {
    title: "Cookies",
    body: [
      "We set only the cookies needed to keep you signed in and to protect the sign-in flow. They are strictly necessary and cannot be turned off without breaking authentication.",
      "We do not run advertising or cross-site tracking cookies, and we do not sell or share personal data for behavioural advertising.",
      "If we later add product analytics we will name the provider here and ask for consent where the law requires it.",
    ],
  },
  {
    title: "If you are in the United States",
    body: [
      "We operate in the United States as well as the European Union, and we hold everyone to the same standard: we do not sell personal data, we do not share it for cross-context behavioural advertising, and we never use workspace content for advertising of any kind.",
      "If you live in California, Colorado, Connecticut, Virginia or another state with a comprehensive privacy law, you can ask what we hold about you, request a copy, ask us to correct or delete it, and appeal if we refuse. Write to " + legalEmail + ".",
      "We do not discriminate against anyone who exercises these rights. Your price and your features stay exactly the same.",
    ],
  },
  {
    title: "Children",
    body: [
      "The service is intended for professional use by people aged 18 or over. We do not knowingly collect data from children.",
    ],
  },
  {
    title: "Changes to this policy",
    body: [
      "We may update this policy. Material changes are announced by email to account holders and by an updated date on this page.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="hero">
        <div className="hero-index">
          <span>LEGAL</span>
          <span>PRIVACY POLICY</span>
        </div>
        <h1>Privacy Policy</h1>
        <p className="hero-lead">
          What we collect, why we hold it, who processes it on our behalf, and the rights you hold
          over it. Last updated {legalUpdated}.
        </p>
      </section>

      {clauses.map((clause, index) => (
        <section className="section" key={clause.title}>
          <div className="section-heading">
            <span className="overline">{String(index + 1).padStart(2, "0")}</span>
            <h2>{clause.title}</h2>
          </div>
          {clause.body.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex}>{paragraph}</p>
          ))}
        </section>
      ))}

      <section className="section">
        <div className="section-heading">
          <span className="overline">Processors</span>
          <h2>Who processes data on our behalf</h2>
        </div>
        <div className="about-position-grid">
          {processors.map((processor) => (
            <article key={processor.name}>
              <h3>{processor.name}</h3>
              <p>{processor.purpose}</p>
              <p>{processor.location}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <span className="overline">Related</span>
          <h2>Other policies</h2>
        </div>
        <p>
          <Link href="/terms">Terms of Service</Link> &middot;{" "}
          <Link href="/refund">Refund Policy</Link> &middot;{" "}
          <Link href="/contact">Contact</Link>
        </p>
      </section>
    </>
  );
}

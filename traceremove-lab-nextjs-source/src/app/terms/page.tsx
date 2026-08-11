import type { Metadata } from "next";
import Link from "next/link";

import {
  legalAddress,
  legalEmail,
  legalEntity,
  legalEstablishment,
  legalJurisdiction,
  legalUpdated,
  merchantOfRecord,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: { canonical: "/terms" },
  description:
    "Terms governing access to the Traceremove AI Responsibility Laboratory, its public research archive and its private assessment workspace.",
};

type Clause = { title: string; body: string[] };

const clauses: Clause[] = [
  {
    title: "Who we are and what these terms cover",
    body: [
      legalEntity + " operates this service. In these terms Traceremove, we, us and our refer to that practice, and you refers to the person or organisation using the service.",
      "The service means the website at traceremove.dev, the public research archive, the public diagnostic tool, and the private Laboratory workspace, together with the assessments, exports and reports generated through them.",
      "By signing in or buying a subscription you accept these terms. If you do not accept them, do not use the service.",
    ],
  },
  {
    title: "Eligibility and accounts",
    body: [
      "The service is intended for professional use by people aged 18 or over. If you use it on behalf of an organisation you confirm that you are authorised to bind that organisation to these terms.",
      "Sign-in is passwordless: we send a single-use link to your email address. Keeping that mailbox secure is your responsibility, because anyone with access to it can reach your workspace.",
      "Tell us immediately if you believe someone has gained access to your account.",
    ],
  },
  {
    title: "Plans and what they include",
    body: [
      "Subscription tiers, their limits and their prices are described on the pricing page, which forms part of these terms.",
      "Institutional assessment engagements are not sold as subscriptions. They run under a separate written statement of work agreed in advance.",
      "We may adjust what a tier includes. If a change materially reduces the value of your active plan we will tell you at least 30 days beforehand and you may cancel without penalty.",
    ],
  },
  {
    title: "Payments, merchant of record and tax",
    body: [
      "Our order process is conducted by our online reseller " + merchantOfRecord + ", which is the merchant of record for all our orders. It handles the transaction, issues the invoice and answers billing enquiries.",
      "Applicable VAT, sales tax or equivalent is calculated and collected by the merchant of record. Its own terms and privacy notice apply to the payment itself, in addition to these terms.",
      "We never receive or store your full card number.",
    ],
  },
  {
    title: "Renewal, price changes and cancellation",
    body: [
      "Subscriptions renew automatically at the end of each billing period until they are cancelled.",
      "We will give at least 30 days notice by email before any price increase that affects your renewal.",
      "You can cancel at any time from the workspace or by writing to us. Cancellation stops the next renewal; your access continues until the end of the period you have already paid for.",
    ],
  },
  {
    title: "Refunds",
    body: [
      "Refunds are handled under our refund policy, which forms part of these terms and sets out the statutory withdrawal right as well as our own voluntary guarantee.",
    ],
  },
  {
    title: "Acceptable use",
    body: [
      "Do not use the service to break the law, to infringe anyone rights, or to harm other people.",
      "Do not attempt to bypass access controls, reach another customer data, probe or load-test the infrastructure, or scrape the archive at scale.",
      "Do not upload material you have no right to upload. Do not upload special category personal data, medical records, or material under specific legal protection unless you have a lawful basis for doing so and have told us in advance.",
      "Do not present output from the service as an official certification, accreditation or regulatory approval.",
    ],
  },
  {
    title: "Generated output is analysis, not advice",
    body: [
      "Assessments, risk scores, findings and reports are produced with the help of large language models. They can contain errors, omissions and confident-sounding mistakes.",
      "Nothing produced by the service is legal advice, and nothing certifies compliance with the EU AI Act, the GDPR or any other instrument. Competent human review is required before you rely on any output.",
      "You remain responsible for every decision you take about your own systems.",
    ],
  },
  {
    title: "Your content",
    body: [
      "You keep all rights in the projects, documents and evidence you upload.",
      "You grant us a limited licence to store and process that material solely in order to operate the service for you, which includes sending relevant extracts to our model provider to produce the analysis you requested.",
      "We do not use private workspace content to train models and we do not publish it.",
      "You can delete your content from the workspace at any time.",
    ],
  },
  {
    title: "Our intellectual property",
    body: [
      "The research archive, the assessment methodology, the module structure, the report templates, the site design and the code remain ours or our licensors.",
      "Your subscription is a non-exclusive, non-transferable right to use the service while it is active. It does not transfer ownership and does not permit resale, sublicensing, or building a competing assessment product from our materials.",
      "Reports you generate about your own systems are yours to use inside your organisation and to share with your regulators, auditors and clients.",
    ],
  },
  {
    title: "Availability and support",
    body: [
      "We aim to keep the service running continuously but do not promise uninterrupted availability on standard subscription tiers.",
      "Planned maintenance is announced where practical. Emergency maintenance may happen without notice.",
      "Support is provided by email during European business days.",
    ],
  },
  {
    title: "Third-party infrastructure",
    body: [
      "The service is built on third-party providers for hosting, database, authentication, storage, model inference and payments. They are listed in our privacy policy.",
      "Their failures can affect the service. We select them carefully but we do not control them.",
    ],
  },
  {
    title: "Disclaimers",
    body: [
      "Except where the law does not allow it, the service is provided as is and as available, without implied warranties of merchantability, fitness for a particular purpose or non-infringement.",
    ],
  },
  {
    title: "Limitation of liability",
    body: [
      "Nothing in these terms limits liability for death or personal injury caused by negligence, for fraud, or for anything else that cannot lawfully be limited.",
      "Subject to that, we are not liable for indirect or consequential loss, loss of profit, loss of business, loss of goodwill, regulatory fines, or loss of data that you could have prevented with your own backups.",
      "Subject to that, our total liability for all claims in any twelve month period is limited to the amount you paid us for the service during that period.",
    ],
  },
  {
    title: "Indemnity",
    body: [
      "You will cover our reasonable losses arising from your unlawful use of the service, from material you had no right to upload, or from your breach of these terms.",
    ],
  },
  {
    title: "Suspension and termination",
    body: [
      "We may suspend or close an account that breaches these terms, that puts the platform or other customers at risk, or where payment has failed and remains unresolved.",
      "Where a breach is not serious we will ask you to put it right first.",
      "After termination you can export your data for 30 days, after which we may delete it.",
    ],
  },
  {
    title: "Changes to these terms",
    body: [
      "We may update these terms. Material changes are announced by email to account holders and by an updated date on this page at least 30 days before they take effect for existing subscribers.",
    ],
  },
  {
    title: "Governing law and disputes",
    body: [
      "These terms are governed by the law of " + legalJurisdiction + ", and any dispute will be heard by the courts of that jurisdiction.",
      "We are established in " + legalEstablishment + ". Where a purchase is made through our United States operation, mandatory United States federal and state consumer law continues to apply to that purchase.",
      "Wherever you are, you keep the protection of the mandatory consumer rules of the country and, in the United States, the state where you live. Nothing in these terms takes those rights away.",
      "Please write to us first. Most issues are resolved by email within a few days.",
    ],
  },
  {
    title: "Contact",
    body: [
      legalEntity + ", established in " + legalEstablishment + ".",
      legalAddress + ".",
      "Email " + legalEmail + ".",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="hero">
        <div className="hero-index">
          <span>LEGAL</span>
          <span>TERMS OF SERVICE</span>
        </div>
        <h1>Terms of Service</h1>
        <p className="hero-lead">
          These terms govern access to traceremove.dev, the public research archive and the private
          Laboratory workspace. Last updated {legalUpdated}.
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
          <span className="overline">Related</span>
          <h2>Other policies</h2>
        </div>
        <p>
          <Link href="/privacy">Privacy Policy</Link> &middot;{" "}
          <Link href="/refund">Refund Policy</Link> &middot;{" "}
          <Link href="/pricing">Plans and pricing</Link>
        </p>
      </section>
    </>
  );
}

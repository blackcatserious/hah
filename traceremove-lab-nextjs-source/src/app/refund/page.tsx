import type { Metadata } from "next";
import Link from "next/link";

import { legalEmail, legalEntity, legalUpdated, merchantOfRecord } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Refund Policy",
  alternates: { canonical: "/refund" },
  description:
    "Cancellation, statutory withdrawal and refund rules for Traceremove subscriptions and institutional assessment engagements.",
};

type Clause = { title: string; body: string[] };

const clauses: Clause[] = [
  {
    title: "Who processes your refund",
    body: [
      "Our order process is conducted by our online reseller " + merchantOfRecord + ", which is the merchant of record for all our orders.",
      "That means the refund is issued by the merchant of record on our instruction, back to the payment method used for the original purchase. We decide whether a refund is due under this policy; they move the money.",
    ],
  },
  {
    title: "Statutory right of withdrawal",
    body: [
      "If you are a consumer in the European Union or the United Kingdom you have 14 days from the start of your subscription to withdraw from the contract without giving a reason.",
      "Because access to the workspace begins immediately, you accept that performance starts at once. If you then withdraw within the 14 day window we may retain a proportionate amount for the period you actually had access, and refund the rest.",
      "In practice we normally refund the full first payment rather than pro-rating it, as described in the next section.",
    ],
  },
  {
    title: "Our 14 day guarantee",
    body: [
      "Every customer, business or consumer, can ask for a full refund of the first payment on a new subscription within 14 days of that payment.",
      "You do not need to explain why. We would rather hear what did not work, but it is not a condition.",
      "This guarantee applies once per customer per plan. It is not intended as a way to use the platform repeatedly for free.",
    ],
  },
  {
    title: "Renewals",
    body: [
      "Renewal payments are not automatically refundable, because you have already had the service for the previous period and a renewal notice is sent in advance.",
      "However, if a renewal caught you by surprise and you have not used the workspace since it was charged, write to us within 14 days of the charge and we will refund it and cancel the subscription.",
      "Cancelling a subscription always stops the next renewal. It does not refund the period you are currently inside, and your access continues until that period ends.",
    ],
  },
  {
    title: "Annual plans",
    body: [
      "Annual payments follow the same rules: full refund within 14 days of the charge.",
      "After 14 days we do not refund the unused part of an annual term, but we will not charge you again and you keep access until the term ends.",
    ],
  },
  {
    title: "Institutional assessment engagements",
    body: [
      "Institutional assessments are not subscriptions. They are governed by the signed statement of work, which sets out fees, milestones and cancellation terms for that specific engagement.",
      "Where a deposit is agreed, it becomes non-refundable once fieldwork or document review has begun, because the work is scheduled against reserved time.",
      "If we cancel an engagement for reasons within our control, you get back everything you paid for work not yet delivered.",
    ],
  },
  {
    title: "When we may decline a refund",
    body: [
      "Where the request arrives outside the windows described above.",
      "Where the account was closed or suspended for breach of the terms of service.",
      "Where the pattern of use suggests the refund route is being used to obtain the service repeatedly without paying for it.",
      "We will always explain the reason in writing, and none of this removes your statutory rights.",
    ],
  },
  {
    title: "If we break something",
    body: [
      "If a defect on our side prevented you from using a feature you paid for, tell us. Where we cannot fix it within a reasonable time we will refund the affected period, regardless of any window in this policy.",
    ],
  },
  {
    title: "Failed payments",
    body: [
      "If a renewal payment fails, the merchant of record retries it and emails you. Access is suspended rather than deleted while this is unresolved.",
      "If payment is still unresolved after the retry period the subscription is cancelled. Your workspace content is retained for 30 days so that nothing is lost while you sort out the card.",
    ],
  },
  {
    title: "How to ask for a refund",
    body: [
      "Write to " + legalEmail + " from the email address on the account, and include the invoice or order reference from your receipt.",
      "We reply within 3 business days and, where a refund is due, instruct the merchant of record immediately.",
      "The money usually appears on the original payment method within 5 to 10 business days, depending on your bank.",
    ],
  },
  {
    title: "Chargebacks",
    body: [
      "Please write to us before raising a chargeback with your bank. A chargeback freezes the account while it is investigated and takes far longer than a direct refund.",
    ],
  },
  {
    title: "Contact",
    body: [
      legalEntity + ". Email " + legalEmail + ".",
    ],
  },
];

export default function RefundPage() {
  return (
    <>
      <section className="hero">
        <div className="hero-index">
          <span>LEGAL</span>
          <span>REFUND POLICY</span>
        </div>
        <h1>Refund Policy</h1>
        <p className="hero-lead">
          Cancellation, statutory withdrawal and refunds for subscriptions and institutional
          engagements. Last updated {legalUpdated}.
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
          <Link href="/terms">Terms of Service</Link> &middot;{" "}
          <Link href="/privacy">Privacy Policy</Link> &middot;{" "}
          <Link href="/pricing">Plans and pricing</Link>
        </p>
      </section>
    </>
  );
}

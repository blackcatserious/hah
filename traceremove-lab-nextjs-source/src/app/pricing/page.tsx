import Link from "next/link";
import { PaddleCheckout } from "@/components/billing/paddle-checkout";

export const metadata = { title: "Access" };

const plans = [
  {
    name: "Researcher",
    audience: "Individual inquiry",
    price: "€29",
    suffix: "/ month",
    priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_RESEARCHER,
    features: ["Private research library", "Saved public-diagnostic sessions", "5 assisted assessments each month", "Evidence notes and versioned reports"],
  },
  {
    name: "Professional",
    audience: "Consultants, legal and product teams",
    price: "€149",
    suffix: "/ month",
    priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_PROFESSIONAL,
    featured: true,
    features: ["30 full assessments each month", "Private document upload", "All four assessment modules", "Responsibility architecture", "PDF reports and version history"],
  },
  {
    name: "Team",
    audience: "Internal governance function",
    price: "€690",
    suffix: "/ month",
    priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_TEAM,
    features: ["Up to 10 users", "Shared cases and review workflow", "Audit trail", "Branded reports", "Institutional templates", "Priority review"],
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="hero pricing-hero">
        <div className="hero-index"><span>PLATFORM ACCESS</span><span>RESEARCH / PROFESSIONAL / INSTITUTIONAL</span></div>
        <h1>Do not buy an ethics score. Build a defensible record of judgment.</h1>
        <p className="hero-lead">Access supports private cases, evidence, assessment versions, responsibility maps, and structured reports. Institutional review is scoped separately because consequential systems cannot be responsibly assessed through a subscription form alone.</p>
      </section>

      <section className="section">
        <div className="pricing-grid strong-pricing">
          {plans.map((plan) => (
            <article key={plan.name} className={`price-card panel ${plan.featured ? "featured" : ""}`}>
              <div className="price-card-head"><span className="overline">{plan.name}</span>{plan.featured && <em>Recommended</em>}</div>
              <p className="price-audience">{plan.audience}</p>
              <div className="price">{plan.price} <small>{plan.suffix}</small></div>
              <ul className="feature-list">{plan.features.map((feature) => <li key={feature}><span>↳</span>{feature}</li>)}</ul>
              <PaddleCheckout priceId={plan.priceId} label={`Choose ${plan.name}`} />
            </article>
          ))}
        </div>
      </section>

      <section className="section institutional-offer panel">
        <div><span className="overline">Institutional assessment</span><h2>Independent review of a consequential AI system.</h2><p>For organisations requiring interviews, evidence review, responsibility architecture, written findings, workshops, and a remediation plan.</p></div>
        <div className="institutional-price"><span>Typical scope</span><strong>€5,000–€20,000</strong><small>Defined after system and evidence review</small><Link className="button primary" href="/contact">Request a scoped proposal <span>↗</span></Link></div>
      </section>

      <section className="section pricing-principles">
        <div><span>01</span><h3>No certification theatre</h3><p>The platform does not certify that a system is “ethical”. It documents arguments, evidence, unresolved risk, and responsibility.</p></div>
        <div><span>02</span><h3>Human review remains mandatory</h3><p>AI-assisted findings are treated as analytical material, not as final legal, moral, or institutional judgment.</p></div>
        <div><span>03</span><h3>Private evidence remains private</h3><p>Case files are separated from the public research archive and governed by account-level access controls.</p></div>
      </section>
    </>
  );
}

import Link from "next/link";

export const metadata = { title: "About Artur Ziganshin" };

const positions = [
  ["Narrative identity", "AI systems increasingly participate in the descriptions through which people become socially and institutionally legible."],
  ["Epistemic responsibility", "A fluent output should not acquire authority without traceable evidence, uncertainty, and a responsible human or institution."],
  ["Institutional ethics", "Responsibility cannot disappear into a chain of providers, models, interfaces, and operators."],
];

export default function AboutPage() {
  return (
    <>
      <section className="hero about-hero">
        <div className="hero-index"><span>ARTUR ZIGANSHIN</span><span>PHILOSOPHER / RESEARCHER / FOUNDER</span></div>
        <h1>Philosophy of AI grounded in the realities of digital systems.</h1>
        <p className="hero-lead">My research sits between philosophy of technology, epistemology, ethics, narrative identity, digital rights, and institutional responsibility. It asks what happens when computational systems become part of how people are described, judged, remembered, and governed.</p>
      </section>

      <section className="section about-statement panel">
        <div><span className="overline">Position</span><h2>AI ethics must remain connected to power, evidence, and remedy.</h2></div>
        <p>I am not interested in treating AI as a fictional moral person or in reducing ethics to a checklist. The relevant questions concern the institutions that build and deploy systems, the claims those systems are permitted to make, the persons who bear the consequences, and the routes through which error can be challenged and repaired.</p>
      </section>

      <section className="section">
        <div className="section-heading split-heading"><div><span className="overline">Research position</span><h2>Three commitments structure the work.</h2></div><Link className="text-link" href="/research">Read the full programme ↗</Link></div>
        <div className="about-position-grid">
          {positions.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="section">
        <div className="section-heading"><span className="overline">Background</span><h2>Academic formation and applied digital practice.</h2></div>
        <div className="about-timeline">
          <article><span>2012–2016</span><div><h3>BA in Philosophy</h3><p>Kazan Federal University. Philosophical formation in ethics, social philosophy, epistemology, and philosophy of technology.</p></div></article>
          <article><span>2016–2018</span><div><h3>MA in Philosophy</h3><p>Kazan Federal University. Continued research on technology, digital identity, rights, and the social consequences of networked systems.</p></div></article>
          <article><span>2019–present</span><div><h3>Digital systems and rights practice</h3><p>Applied work with online identity, information harms, privacy, reputation, cybersecurity, and the practical difficulty of locating responsibility across platforms and institutions.</p></div></article>
          <article><span>2025–2026</span><div><h3>AI philosophy research programme</h3><p>Current work on virtual and narrative identity, machine testimony, responsibility allocation, dignity, contestability, democratic oversight, belonging, and ethics of knowledge.</p></div></article>
        </div>
      </section>
    </>
  );
}

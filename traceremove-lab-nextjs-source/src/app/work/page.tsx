import type { Metadata } from "next";
import Link from "next/link";
import { WorkEnquiry } from "./work-enquiry";
import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Work with Artur — AI Authority Diagnostic",
  description: "Work with philosopher Artur Ziganshin on one consequential AI workflow. A 90-minute diagnostic, a map of authority and responsibility, and three priority recommendations.",
  alternates: { canonical: "https://traceremove.dev/work" },
  openGraph: {
    title: "Work with Artur Ziganshin",
    description: "Where does authority enter your AI workflow? A focused philosophical diagnostic for teams.",
    url: "https://traceremove.dev/work", type: "website",
  },
};

const questions = [
  ["Evidence", "What is allowed to count?", "Trace the sources, assumptions and uncertainties behind the output."],
  ["Authority", "Who can act on it?", "Locate the moment a prediction or summary becomes a reason to decide."],
  ["Contestability", "Who can challenge it?", "Examine whether an affected person has a meaningful way to object and seek correction."],
  ["Responsibility", "Who must answer?", "Identify the people with the power to intervene, correct the record or stop the process."],
];

export default function WorkPage() {
  return <div className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.kicker}><span>WORK WITH ARTUR</span><span>PHILOSOPHY INTO PRACTICE / 01</span></div>
      <div className={styles.heroGrid}>
        <div>
          <p className={styles.byline}>Artur Ziganshin <span>/ Artur Shi</span></p>
          <h1>Where does authority enter your <em>AI workflow?</em></h1>
          <p className={styles.lead}>When a system ranks, summarises, recommends or flags, its output can shape someone’s opportunities. I help teams examine who may rely on it, who can challenge it, and who remains responsible.</p>
          <a className={styles.primary} href="#enquiry">Request the diagnostic <span aria-hidden="true">↗</span></a>
          <a className={styles.secondary} href="https://arturziganshin.substack.com/">Read Who May Speak? ↗</a>
        </div>
        <aside className={styles.offer} aria-label="Diagnostic format and fee">
          <span className={styles.label}>THE PILOT</span>
          <h2>AI Authority &amp;<br/>Contestability<br/>Diagnostic</h2>
          <div className={styles.price}>€750 <span>pilot fee</span></div>
          <p>One workflow. One focused review.</p>
          <dl>
            <div><dt>Session</dt><dd>90 minutes · remote</dd></div>
            <div><dt>Deliverable</dt><dd>3–5-page authority map</dd></div>
            <div><dt>Priorities</dt><dd>Three recommendations</dd></div>
            <div><dt>Follow-up</dt><dd>30-minute clarification</dd></div>
          </dl>
          <p className={styles.small}>Scope, final price including any applicable taxes, and payment arrangements are confirmed in writing before booking. No payment is taken on this page.</p>
        </aside>
      </div>
    </section>

    <section className={styles.section} aria-labelledby="review-heading">
      <div className={styles.sectionHeading}><span className={styles.label}>01 / THE REVIEW</span><h2 id="review-heading">Four questions.<br/>One real decision path.</h2></div>
      <div className={styles.questions}>{questions.map(([label, title, copy], index) => <article key={label}>
        <span className={styles.label}>0{index + 1} · {label}</span><h3>{title}</h3><p>{copy}</p>
      </article>)}</div>
    </section>

    <section className={styles.section} aria-labelledby="map-heading">
      <div className={styles.sectionHeading}><span className={styles.label}>02 / WHAT YOU LEAVE WITH</span><h2 id="map-heading">A map your team<br/>can work from.</h2></div>
      <div className={styles.mapLayout}>
        <div className={styles.map}>
          <p className={styles.label}>ILLUSTRATIVE STRUCTURE · NOT A CLIENT CASE</p>
          <ol>{["Evidence & assumptions", "AI output", "Human approval", "Affected person", "Challenge & correction", "Responsible owner"].map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol>
        </div>
        <div className={styles.explanation}>
          <h3>Make the missing relationships visible.</h3>
          <p>The written review traces where authority enters the workflow, where a challenge can fail, and who has the power to correct the outcome.</p>
          <p>Three prioritised recommendations turn that analysis into a focused agenda for your team. Delivery is targeted within five business days of the session and confirmed before booking.</p>
          <p className={styles.small}>Best suited to founders, product leaders, research and policy teams with one concrete use of AI. Philosophical and institutional analysis; legal advice, compliance certification, technical implementation and security testing are outside the scope.</p>
        </div>
      </div>
    </section>

    <section className={styles.section} aria-labelledby="author-heading">
      <div className={styles.author}>
        <div><span className={styles.label}>YOUR PHILOSOPHER</span><h2 id="author-heading">Artur<br/>Ziganshin<span className={styles.dot}>.</span></h2><p>Building systems. Examining their power.</p></div>
        <div><p>I work on identity, machine testimony, contestability and institutional responsibility. My research asks who is authorised to describe a person, when computational output acquires authority, and how responsibility can be preserved across technological systems.</p>
          <div className={styles.links}><Link href="/about">About Artur ↗</Link><Link href="/publications">Research archive ↗</Link><a href="https://philpeople.org/profiles/artur-ziganshin">PhilPeople ↗</a></div>
          <p className={styles.small}>For talks, workshops and advisory sprints, email <a href="mailto:artur@traceremove.com?subject=Work%20with%20Artur%20%E2%80%94%20speaking%20enquiry">artur@traceremove.com</a> with your audience, date and format.</p>
        </div>
      </div>
    </section>

    <section className={styles.enquirySection} id="enquiry" aria-labelledby="enquiry-heading">
      <div><span className={styles.label}>03 / BEGIN WITH ONE WORKFLOW</span><h2 id="enquiry-heading">Bring the question<br/>that matters.</h2>
        <p>Describe what the system produces and what happens because of it. Artur reviews the fit, then confirms the scope, timing and payment arrangements before a session is booked.</p>
        <p className={styles.small}>An enquiry is not a booking or payment commitment. Please use a short, non-confidential description; do not include credentials, identity documents or personal case files.</p>
        <a href="mailto:artur@traceremove.com?subject=Work%20with%20Artur%20%E2%80%94%20diagnostic%20enquiry">Prefer email? artur@traceremove.com ↗</a>
      </div>
      <WorkEnquiry />
    </section>
    <section className={styles.privacy} id="enquiry-privacy" aria-labelledby="privacy-heading">
      <h2 id="privacy-heading">About your enquiry</h2>
      <p>Artur Ziganshin uses the contact and workflow information you provide to assess and respond to this enquiry. Submissions also include this page’s path and any campaign labels in its link, so the source of an enquiry can be understood. Website submissions are processed and stored through Netlify Forms in the site owner’s account. They do not subscribe you to a newsletter.</p>
      <p>Enquiries are retained while active and for as long as reasonably needed for follow-up and business records. To request access, correction or deletion, contact <a href="mailto:artur@traceremove.com">artur@traceremove.com</a>. Further information is in the <Link href="/privacy">Privacy Policy</Link>.</p>
    </section>
  </div>;
}

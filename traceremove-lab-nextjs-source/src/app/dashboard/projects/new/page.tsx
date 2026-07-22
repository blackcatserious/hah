import { createProjectAction } from "../actions";

export const metadata = { title: "New assessment case" };

export default async function NewProjectPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  return (
    <>
      <section className="workspace-hero new-case-hero">
        <div><span className="overline">New case / system definition</span><h1>Define the object of judgment before judging it.</h1><p className="hero-lead">The initial record becomes the stable context for evidence, findings, responsibility mapping, and every later report version.</p></div>
        <span className="case-stage">STAGE 01 / 05</span>
      </section>

      <form className="new-case-form" action={createProjectAction}>
        <section className="form-section panel">
          <div className="form-section-index"><span>01</span><strong>System identity</strong><p>What is being assessed and who owns the deployment?</p></div>
          <div className="form-section-fields">
            <div className="field"><label htmlFor="name">Project / system name</label><input className="input" id="name" name="name" required placeholder="e.g. Candidate screening assistant" /></div>
            <div className="grid two">
              <div className="field"><label htmlFor="organisation">Organisation</label><input className="input" id="organisation" name="organisation" placeholder="Deploying institution" /></div>
              <div className="field"><label htmlFor="system_type">System type</label><input className="input" id="system_type" name="system_type" placeholder="LLM assistant, scoring model, recommender…" required /></div>
            </div>
          </div>
        </section>

        <section className="form-section panel">
          <div className="form-section-index"><span>02</span><strong>Claimed function</strong><p>What does the system say it can do?</p></div>
          <div className="form-section-fields"><div className="field"><label htmlFor="description">Purpose and claimed function</label><textarea className="textarea" id="description" name="description" required placeholder="Describe the task, claimed capability, intended benefit, and limits currently acknowledged by the organisation." /></div></div>
        </section>

        <section className="form-section panel">
          <div className="form-section-index"><span>03</span><strong>Decision context</strong><p>Where does output become action?</p></div>
          <div className="form-section-fields"><div className="field"><label htmlFor="decision_context">Decision context</label><textarea className="textarea" id="decision_context" name="decision_context" required placeholder="What recommendation, classification, decision, denial, prioritisation, or intervention depends on the system?" /></div></div>
        </section>

        <section className="form-section panel">
          <div className="form-section-index"><span>04</span><strong>Affected persons</strong><p>Who bears the consequences?</p></div>
          <div className="form-section-fields"><div className="field"><label htmlFor="affected_people">Affected people and stakes</label><textarea className="textarea" id="affected_people" name="affected_people" required placeholder="Identify affected groups, vulnerabilities, possible harms, and what becomes difficult to reverse if the system is wrong." /></div></div>
        </section>

        {params.error && <p className="form-error">The case could not be saved. Review the fields and try again.</p>}
        <div className="new-case-submit"><p>Creating the case does not run an assessment. Evidence and modules are selected in the next stage.</p><button className="button primary" type="submit">Create case and continue <span>↗</span></button></div>
      </form>
    </>
  );
}

import OpenAI from "openai";
import { assessmentResultSchema, type AssessmentInput, type AssessmentResult } from "@/lib/assessment-schema";

const moduleInstructions = {
  epistemic: "Assess warranted reliance, evidence traceability, uncertainty communication, model limitations, synthetic coherence, and conditions of reliability.",
  responsibility: "Map developers, model providers, data controllers, deployers, operators, decision owners, oversight bodies, and affected people. Identify responsibility gaps and responsibility laundering.",
  dignity: "Assess explanation, human review, refusal, appeal, correction, remedy, recognition, proportionality, and whether the person is treated as more than a classified object.",
  identity: "Assess algorithmic profiling, narrative identity, imposed interpretation, algorithmic co-authorship, self-description, reputational persistence, and the right to contest or refuse an assigned identity.",
} as const;

function demoAssessment(input: AssessmentInput): AssessmentResult {
  const modules = input.modules;
  const findings = modules.map((module, index) => ({
    module,
    severity: index === 0 ? "high" as const : "moderate" as const,
    title: module === "epistemic" ? "Evidence and confidence are not yet separated" :
      module === "responsibility" ? "Final accountability is insufficiently allocated" :
      module === "dignity" ? "Contestability requires a defined operational path" :
      "The system may impose an externally authored profile",
    analysis: moduleInstructions[module] + " The supplied description does not yet provide enough operational evidence to establish that these safeguards are consistently implemented.",
    recommendation: "Define an accountable owner, measurable control, escalation route, evidence source, and review interval for this issue.",
    evidenceNeeded: ["Decision policy", "Human review procedure", "Example output and source evidence"],
  }));

  return {
    executiveSummary: `This preliminary assessment of ${input.systemName} identifies a material governance gap between the system's stated purpose and the evidence needed to justify reliance on its outputs. The result is a structured research assessment, not legal certification or a substitute for domain-specific testing.`,
    overallRisk: "high",
    score: 68,
    systemClaim: `${input.systemName} is presented as a system intended to ${input.systemPurpose.slice(0, 600)}. Its legitimacy depends on whether the stated decision context, evidence, human oversight, and remedy mechanisms match that claim.`,
    responsibilityMap: [
      { actor: "Model or infrastructure provider", role: "Provides technical capabilities and documents model limitations.", accountability: "Must not obscure known limitations, safety constraints, or material changes." },
      { actor: "Deploying organisation", role: "Defines the purpose, context, data, workflow, and acceptable use.", accountability: "Owns the decision to rely on the system and the safeguards surrounding that reliance." },
      { actor: "Human operator or decision owner", role: "Interprets outputs and makes or confirms consequential decisions.", accountability: "Must exercise meaningful review rather than rubber-stamping the system." },
      { actor: "Affected person", role: "Experiences the decision, classification, or recommendation.", accountability: "Must have access to explanation, correction, appeal, and remedy without bearing the burden of system design failures." },
    ],
    findings,
    unresolvedQuestions: [
      "Which claims are directly supported by evidence and which are inferred by the system?",
      "Who can reverse or correct an adverse outcome?",
      "How are failure patterns monitored after deployment?",
    ],
    nextActions: [
      "Create an evidence register for every consequential system claim.",
      "Assign a named decision owner and a named remedy owner.",
      "Document a human review and appeal procedure with response deadlines.",
      "Run the assessment again after controls and evidence have been added.",
    ],
    disclaimer: "This assessment is a philosophical and governance analysis. It is not legal advice, regulatory certification, a security audit, or a substitute for technical validation and stakeholder consultation.",
  };
}

export async function runAssessment(input: AssessmentInput): Promise<AssessmentResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return demoAssessment(input);

  const client = new OpenAI({ apiKey });
  const prompt = `You are the analytical engine of the AI Responsibility Laboratory founded by philosopher Artur Ziganshin.
Produce a rigorous, cautious, non-marketing assessment. Do not claim legal compliance or certification. Distinguish evidence from inference. Do not invent facts.

SYSTEM NAME: ${input.systemName}
SYSTEM PURPOSE: ${input.systemPurpose}
DECISION CONTEXT: ${input.decisionContext}
AFFECTED PEOPLE: ${input.affectedPeople}
SUPPLIED EVIDENCE: ${input.evidence || "No additional evidence supplied."}
SELECTED MODULES: ${input.modules.join(", ")}

MODULE REQUIREMENTS:
${input.modules.map((module) => `- ${module.toUpperCase()}: ${moduleInstructions[module]}`).join("\n")}

Return only JSON with this shape:
{
  "executiveSummary": string,
  "overallRisk": "low"|"moderate"|"high"|"critical",
  "score": number 0-100 where higher means greater risk,
  "systemClaim": string,
  "responsibilityMap": [{"actor":string,"role":string,"accountability":string}],
  "findings": [{"module":"epistemic"|"responsibility"|"dignity"|"identity","severity":"low"|"moderate"|"high"|"critical","title":string,"analysis":string,"recommendation":string,"evidenceNeeded":string[]}],
  "unresolvedQuestions": string[],
  "nextActions": string[],
  "disclaimer": string
}`;

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-5-mini",
    input: prompt,
  });
  const raw = response.output_text.trim().replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  const parsed = JSON.parse(raw);
  return assessmentResultSchema.parse(parsed);
}

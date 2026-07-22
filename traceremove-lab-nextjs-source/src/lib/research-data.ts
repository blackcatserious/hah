export type Publication = {
  id?: string;
  title: string;
  slug: string;
  kind: "research_essay" | "working_paper" | "manuscript" | "published";
  statusLabel: string;
  year: string;
  abstract: string;
  keywords: string[];
  url?: string | null;
  pdfUrl?: string | null;
};

export const publications: Publication[] = [
  {
    title: "Virtual and Narrative Identity in the Age of AI: Ethical and Epistemological Perspectives",
    slug: "virtual-narrative-identity-ai",
    kind: "research_essay",
    statusLabel: "Research essay",
    year: "2026",
    abstract:
      "Examines how AI systems reshape virtual and narrative identity through algorithmic co-authorship, with particular attention to authenticity, epistemic legitimacy, and the right to retain authorship over one’s self-narration.",
    keywords: ["narrative identity", "AI ethics", "algorithmic co-authorship"],
  },
  {
    title: "Epistemic Risk Surfaces in Large Language Models",
    slug: "epistemic-risk-surfaces-llms",
    kind: "working_paper",
    statusLabel: "Working paper",
    year: "2025–2026",
    abstract:
      "Develops a taxonomy of epistemic failure in large language models, distinguishing confident error, synthetic coherence, uncertainty compression, and context-sensitive reliability collapse.",
    keywords: ["epistemic risk", "LLM", "reliability"],
  },
  {
    title: "Linguistic Symbolism and Meaning Compression in Machine Learning",
    slug: "linguistic-symbolism-meaning-compression",
    kind: "working_paper",
    statusLabel: "Working paper",
    year: "2025–2026",
    abstract:
      "Explores the gap between linguistic fluency and semantic grounding by examining how symbolic structures are compressed in representation learning.",
    keywords: ["meaning", "grounding", "philosophy of language"],
  },
  {
    title: "Human Dignity Constraints for Autonomous Decision Systems",
    slug: "human-dignity-autonomous-systems",
    kind: "working_paper",
    statusLabel: "Working paper",
    year: "2025–2026",
    abstract:
      "Argues that dignity-preserving design requires more than fairness metrics and must include contestability, recognition, meaningful human review, and access to remedy.",
    keywords: ["dignity", "contestability", "automated decisions"],
  },
  {
    title: "Ethical Architecture: Design Principles for Normative AI",
    slug: "ethical-architecture-normative-ai",
    kind: "working_paper",
    statusLabel: "Working paper",
    year: "2025–2026",
    abstract:
      "Proposes design principles for embedding ethical constraints across models, interfaces, institutional roles, and remediation processes.",
    keywords: ["AI governance", "design ethics", "responsibility"],
  },
  {
    title: "Process Reliabilism and Machine Testimony",
    slug: "process-reliabilism-machine-testimony",
    kind: "working_paper",
    statusLabel: "Working paper",
    year: "2025–2026",
    abstract:
      "Investigates whether AI-generated outputs can function as testimony and what forms of human, institutional, and technical warrant must accompany them.",
    keywords: ["testimony", "reliabilism", "epistemology"],
  },
  {
    title: "The Chinese Room Revisited: LLMs and Understanding",
    slug: "chinese-room-llm-understanding",
    kind: "working_paper",
    statusLabel: "Working paper",
    year: "2025–2026",
    abstract:
      "Revisits the distinction between rule-governed symbol manipulation and understanding in the context of contemporary language models.",
    keywords: ["understanding", "Chinese room", "LLM"],
  },
  {
    title: "Democratic Oversight of AI Systems",
    slug: "democratic-oversight-ai-systems",
    kind: "working_paper",
    statusLabel: "Working paper",
    year: "2025–2026",
    abstract:
      "Defends democratic rather than merely technocratic governance of AI systems, with attention to public reason, responsibility, institutional contestability, and legitimacy.",
    keywords: ["democracy", "AI governance", "public institutions"],
  },
  {
    title: "Guardrails in UX Safety: Designing Protective User Experiences",
    slug: "guardrails-ux-safety",
    kind: "manuscript",
    statusLabel: "Manuscript",
    year: "2026",
    abstract:
      "A design-oriented ethics manuscript on protective user experiences, safety guardrails, and the normative role of interaction design.",
    keywords: ["UX safety", "guardrails", "design ethics"],
  },
];

export const programmes = [
  {
    no: "01",
    title: "Narrative identity & algorithmic co-authorship",
    description:
      "How AI-mediated systems alter self-understanding, life narratives, authenticity, and the distribution of authorship between people and computational systems.",
    question:
      "Under what epistemic and normative conditions can algorithmic participation in self-narration remain legitimate?",
  },
  {
    no: "02",
    title: "Epistemic responsibility & machine testimony",
    description:
      "How people and institutions should rely on AI outputs, allocate warranted trust, preserve uncertainty, and recognise reliability collapse.",
    question:
      "When does an AI output become a reason for belief rather than a persuasive linguistic event?",
  },
  {
    no: "03",
    title: "Dignity, contestability & public institutions",
    description:
      "Ethical constraints for systems that classify, rank, recommend, or decide in settings that affect rights, access, recognition, and opportunity.",
    question:
      "What must remain explainable, challengeable, and repairable when automated systems shape human outcomes?",
  },
  {
    no: "04",
    title: "Digital rights & responsibility in practice",
    description:
      "Research grounded in practical experience with digital systems, information harm, online identity, privacy, reputation, and the difficulty of locating responsibility.",
    question:
      "How should responsibility be distributed across developers, vendors, institutions, operators, and affected persons?",
  },
  {
    no: "05",
    title: "Philosophy of belonging",
    description:
      "A wider philosophical programme on relational ontology, freedom as secure belonging, institutions, affect, and resistance to reductive social fusion.",
    question:
      "What does it mean to belong without collapsing persons into a collective or treating freedom as isolation?",
  },
  {
    no: "06",
    title: "Ethics of knowledge & the noosphere",
    description:
      "A developing programme on responsibility in knowledge practices, scientific ethics, noosphere traditions, and the normative consequences of collective intellectual systems.",
    question:
      "How should responsibility be understood when knowledge is socially distributed, technically mediated, and institutionally organised?",
  },
];

export const laboratoryLenses = [
  {
    label: "Epistemic reliability",
    question: "When should an AI-generated claim be treated as a reason to believe something?",
    description:
      "Model outputs can be fluent, useful, and still poorly justified. This lens traces the conditions under which an answer deserves confidence rather than merely attention.",
    stake:
      "A system that sounds certain without warranted reliability can distort human judgment at scale.",
    items: [
      "What process produced the claim, and what evidence can it be traced back to?",
      "How does performance change under novelty, ambiguity, or adversarial framing?",
      "Where should uncertainty remain visible instead of being compressed into confidence?",
    ],
  },
  {
    label: "Meaning & grounding",
    question: "What separates linguistic competence from understanding?",
    description:
      "A model may reproduce the form of reference without a stable relation to what its words are about. This lens examines whether apparent meaning is grounded, borrowed, or simulated.",
    stake:
      "Treating fluent text as understanding risks confusing prediction with knowledge and representation with reference.",
    items: [
      "Does the system preserve reference when context, speaker, or domain changes?",
      "Which parts of an answer depend on social, embodied, or institutional background knowledge?",
      "Can users distinguish semantic fluency from warranted interpretation?",
    ],
  },
  {
    label: "Dignity & contestability",
    question: "What must remain open to challenge when AI shapes a consequential decision?",
    description:
      "Accuracy alone cannot legitimise systems that classify, rank, recommend, or exclude people. This lens identifies protections that preserve agency, recognition, and recourse.",
    stake:
      "Human dignity requires more than fair averages: it requires a place for refusal, explanation, and redress.",
    items: [
      "Can an affected person understand, challenge, and appeal the decision?",
      "Which human responsibilities are being displaced, obscured, or made irreversible?",
      "Does the institution provide meaningful remedy rather than a decorative explanation?",
    ],
  },
];

export const laboratoryConcepts = [
  {
    label: "Reliability",
    description:
      "A claim-forming process is reliable when it tends to produce true or well-supported outputs under relevant conditions.",
    relations: ["Justification", "Uncertainty", "Process"],
  },
  {
    label: "Machine testimony",
    description:
      "The question of whether AI output can function as testimony, and what human or institutional warrant must accompany it.",
    relations: ["Reliability", "Authority", "Accountability"],
  },
  {
    label: "Grounding",
    description:
      "The relation between symbols, concepts, and the world they are taken to represent.",
    relations: ["Meaning", "Reference", "Context"],
  },
  {
    label: "Agency",
    description:
      "The capacity to act, decide, and remain an author of one’s life in systems that mediate opportunities and outcomes.",
    relations: ["Dignity", "Choice", "Delegation"],
  },
  {
    label: "Dignity",
    description:
      "The requirement to treat people as ends in themselves rather than inputs to an optimisation pipeline.",
    relations: ["Recognition", "Agency", "Respect"],
  },
  {
    label: "Contestability",
    description:
      "The practical ability to question a decision, obtain reasons, introduce correction, and seek redress.",
    relations: ["Appeal", "Transparency", "Remedy"],
  },
];

export const laboratoryProtocol = [
  [
    "Frame the decision",
    "Name the decision, affected people, institutional setting, and consequences of a wrong output.",
  ],
  [
    "Map the claim",
    "Specify what the system is asserting, predicting, recommending, or deciding—and what evidence it relies on.",
  ],
  [
    "Test the conditions",
    "Identify when the system is reliable, when it fails, and which uncertainty must remain visible to the user.",
  ],
  [
    "Apply normative constraints",
    "Ask what is owed to affected people: explanation, consent, review, appeal, or a human decision-maker.",
  ],
  [
    "State residual risk",
    "Record what remains unknown and who is responsible for monitoring, correction, and remedy.",
  ],
] as const;

import { z } from "zod";

export const assessmentInputSchema = z.object({
  projectId: z.string().uuid(),
  systemName: z.string().min(2).max(200),
  systemPurpose: z.string().min(30).max(12000),
  decisionContext: z.string().min(20).max(12000),
  affectedPeople: z.string().min(10).max(8000),
  evidence: z.string().max(30000).optional().default(""),
  modules: z.array(z.enum(["epistemic", "responsibility", "dignity", "identity"])).min(1),
});

export const findingSchema = z.object({
  module: z.enum(["epistemic", "responsibility", "dignity", "identity"]),
  severity: z.enum(["low", "moderate", "high", "critical"]),
  title: z.string().min(3).max(180),
  analysis: z.string().min(20).max(5000),
  recommendation: z.string().min(10).max(3000),
  evidenceNeeded: z.array(z.string()).max(8),
});

export const assessmentResultSchema = z.object({
  executiveSummary: z.string().min(40).max(6000),
  overallRisk: z.enum(["low", "moderate", "high", "critical"]),
  score: z.number().min(0).max(100),
  systemClaim: z.string().min(20).max(3000),
  responsibilityMap: z.array(z.object({
    actor: z.string().min(2).max(180),
    role: z.string().min(5).max(1000),
    accountability: z.string().min(5).max(1000),
  })).min(2).max(12),
  findings: z.array(findingSchema).min(2).max(20),
  unresolvedQuestions: z.array(z.string()).min(1).max(12),
  nextActions: z.array(z.string()).min(1).max(12),
  disclaimer: z.string().min(20).max(1000),
});

export type AssessmentInput = z.infer<typeof assessmentInputSchema>;
export type AssessmentResult = z.infer<typeof assessmentResultSchema>;

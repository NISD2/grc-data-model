import { z } from "zod";

export const art28ChecklistSchema = z.object({
  onlyOnInstructions: z.boolean(),
  confidentiality: z.boolean(),
  security: z.boolean(),
  subProcessorApproval: z.boolean(),
  assistanceRights: z.boolean(),
  securityAndBreachAssistance: z.boolean(),
  deletionReturn: z.boolean(),
  auditRights: z.boolean(),
});
export type Art28Checklist = z.infer<typeof art28ChecklistSchema>;

export const subProcessorSchema = z.object({
  name: z.string().min(1),
  country: z.string().length(2),
  approved: z.boolean(),
});
export type SubProcessor = z.infer<typeof subProcessorSchema>;

export function isArt28Complete(c: Art28Checklist): boolean {
  return Object.values(c).every(Boolean);
}

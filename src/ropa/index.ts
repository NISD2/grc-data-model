import { z } from "zod";

export const lawfulBasisSchema = z.enum([
  "consent",
  "contract",
  "legal_obligation",
  "vital_interest",
  "public_task",
  "legitimate_interest",
]);
export type LawfulBasis = z.infer<typeof lawfulBasisSchema>;

export const recipientTypeSchema = z.enum([
  "processor",
  "joint_controller",
  "separate_controller",
  "authority",
  "internal",
]);
export type RecipientType = z.infer<typeof recipientTypeSchema>;

export const transferMechanismSchema = z.enum([
  "adequacy",
  "scc",
  "bcr",
  "derogation",
  "none",
]);
export type TransferMechanism = z.infer<typeof transferMechanismSchema>;

export const ropaRecipientSchema = z.object({
  name: z.string().min(1),
  type: recipientTypeSchema,
  supplierId: z.string().uuid().optional(),
});
export type RopaRecipient = z.infer<typeof ropaRecipientSchema>;

export const ropaEntrySchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  purpose: z.string().min(1),
  legalBasis: lawfulBasisSchema,
  legalBasisNote: z.string().optional(),

  dataCategories: z.array(z.string()).min(1),
  dataSubjectTypes: z.array(z.string()).min(1),

  recipients: z.array(ropaRecipientSchema),

  internationalTransfer: z.boolean(),
  transferMechanism: transferMechanismSchema,

  retentionMonths: z.number().int().nonnegative(),
  deletionProcedure: z.string(),

  isHighRisk: z.boolean(),
  automatedDecision: z.boolean(),

  linkedAssetIds: z.array(z.string().uuid()).default([]),
  linkedSupplierIds: z.array(z.string().uuid()).default([]),
  linkedTomsIds: z.array(z.string().uuid()).default([]),

  status: z.enum(["draft", "review", "approved", "archived"]),
  ownerUserId: z.string().uuid().optional(),
});
export type RopaEntry = z.infer<typeof ropaEntrySchema>;

export function ropaEntriesRequiringDpia(entries: RopaEntry[]): RopaEntry[] {
  return entries.filter((e) => e.isHighRisk || e.automatedDecision);
}

import { z } from "zod";

export const art32PropertySchema = z.enum([
  "confidentiality",
  "integrity",
  "availability",
  "resilience",
]);
export type Art32Property = z.infer<typeof art32PropertySchema>;

export const tomsCategorySchema = z.enum([
  "access",
  "encryption",
  "logging",
  "network",
  "backup",
  "organisational",
  "training",
  "retention",
  "integrity",
  "pseudonymisation",
]);
export type TomsCategory = z.infer<typeof tomsCategorySchema>;

export const tomsEntrySchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  category: tomsCategorySchema,
  implementation: z.string(),
  status: z.enum(["planned", "implemented", "verified", "deprecated"]),
  evidenceNote: z.string().optional(),
  art32Properties: z.array(art32PropertySchema).default([]),
  regimes: z.array(z.enum(["nis2", "gdpr"])).default([]),
});
export type TomsEntry = z.infer<typeof tomsEntrySchema>;

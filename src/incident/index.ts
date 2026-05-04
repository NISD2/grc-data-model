/**
 * Incident schema — placeholder with dual-regime breach flags.
 *
 * Real content migrated from NISD2 platform's `schema/tables/incidents.ts`.
 * Same incident row drives both NIS2 cyber notification (24h/72h/1mo)
 * and GDPR personal-data-breach notification (72h, Art. 33/34).
 */

import { z } from "zod";

export const breachAssessmentSchema = z.enum([
  "not_assessed",
  "no_breach",
  "breach_low_risk",
  "breach_high_risk",
]);
export type BreachAssessment = z.infer<typeof breachAssessmentSchema>;

export const incidentCoreSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  /** When the controller became aware (72h timer starts here, not at detection). */
  awarenessAt: z.string().datetime().optional(),
  detectedAt: z.string().datetime().optional(),
  requiresCyberNotification: z.boolean().default(false),
  requiresGdprNotification: z.boolean().default(false),
  breachAssessment: breachAssessmentSchema.default("not_assessed"),
  affectedDataSubjects: z.number().int().nonnegative().optional(),
});
export type IncidentCore = z.infer<typeof incidentCoreSchema>;

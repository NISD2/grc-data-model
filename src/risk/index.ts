/**
 * Risk schema — placeholder.
 *
 * Real content migrated from NISD2 platform's `schema/tables/risks.ts`.
 */

import { z } from "zod";

export const riskCoreSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  privacyImpact: z.boolean().default(false),
});
export type RiskCore = z.infer<typeof riskCoreSchema>;

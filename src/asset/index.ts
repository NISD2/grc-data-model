/**
 * Asset-core schema — placeholder.
 *
 * Real content migrated from NISD2 platform's `schema/tables/assets.ts`
 * in a follow-up.
 */

import { z } from "zod";

export const assetCoreSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  processesPersonalData: z.boolean().default(false),
});
export type AssetCore = z.infer<typeof assetCoreSchema>;

import { z } from "zod";

export const supplierRelationshipTypeSchema = z.enum([
  "processor",
  "joint_controller",
  "separate_controller",
  "internal",
]);
export type SupplierRelationshipType = z.infer<typeof supplierRelationshipTypeSchema>;

export const supplierCoreSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  relationshipType: supplierRelationshipTypeSchema,
  processesPersonalData: z.boolean().default(false),
});
export type SupplierCore = z.infer<typeof supplierCoreSchema>;

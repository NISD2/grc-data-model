/**
 * Cross-framework satisfaction — declares that signing one requirement
 * implies the same operational evidence exists for the linked requirement.
 *
 * Sign-off propagation is permissive: signing requirement A (e.g., NIS2 SUP-5.1)
 * automatically marks the linked requirement B (e.g., GDPR DPA-1) complete,
 * with both signed_off_by and signed_off_at copied from the source. Audit
 * trail captures the link via rationale + the source requirement reference.
 *
 * Bidirectional: signing either A or B propagates to the other.
 *
 * Scaling note: pairwise is the right shape for 2 frameworks (NIS2 + GDPR).
 * When seeding a 3rd framework (ISO 27001 / BSI Grundschutz / CRA), migrate
 * to a control_group + control_group_member abstraction — at 3+ frameworks,
 * pairwise rows scale N² per topic and groups become cheaper. See
 * sales/research/grc-data-model-extraction-plan.md for the migration shape.
 *
 * References: requirement
 */
import {
  pgTable,
  uuid,
  text,
  timestamp,
  unique,
  index,
} from "drizzle-orm/pg-core";
import { requirement } from "./requirement";

export const requirementSatisfaction = pgTable(
  "requirement_satisfaction",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    requirementAId: uuid("requirement_a_id")
      .references(() => requirement.id, { onDelete: "cascade" })
      .notNull(),
    requirementBId: uuid("requirement_b_id")
      .references(() => requirement.id, { onDelete: "cascade" })
      .notNull(),
    rationale: text("rationale"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    unique("uq_satisfaction_pair").on(table.requirementAId, table.requirementBId),
    index("idx_satisfaction_a").on(table.requirementAId),
    index("idx_satisfaction_b").on(table.requirementBId),
  ],
);

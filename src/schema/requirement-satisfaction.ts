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

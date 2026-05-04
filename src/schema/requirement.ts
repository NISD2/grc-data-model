/**
 * Requirements — Individual compliance checklist items
 *
 * The heart of the platform. Each row is one thing a company must do
 * (e.g., 1.1: "Management must formally approve risk measures").
 *
 * Organized into 5 semantic layers:
 *   1. WHAT  — The regulatory text
 *   2. WHY   — Business justification and legal context
 *   3. HOW   — Implementation guidance
 *   4. EVIDENCE — What "done" looks like
 *   5. SIZING — Effort, importance, prerequisites
 *
 * References: requirementCategory (which domain it belongs to)
 */
import { sql } from "drizzle-orm";
import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  integer,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import {
  evidenceTypeEnum,
  frequencyEnum,
  priorityEnum,
  requirementImportanceEnum,
  effortLevelEnum,
} from "../enums";
import { requirementCategory } from "./framework";

// ---------------------------------------------------------------------------
// Requirements
// ---------------------------------------------------------------------------

export const requirement = pgTable(
  "requirement",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    categoryId: uuid("category_id")
      .references(() => requirementCategory.id)
      .notNull(),
    code: varchar("code", { length: 20 }).notNull().unique(),
    parentId: uuid("parent_id"), // Self-ref: 1.1 → 1.1a, 1.1b

    // --- EVIDENCE — What "done" looks like ---
    evidenceType: evidenceTypeEnum("evidence_type").notNull(),

    // --- LAYER 5: SIZING ---
    importance: requirementImportanceEnum("importance").default("mandatory"),
    effort: effortLevelEnum("effort"),
    estimatedHours: integer("estimated_hours"),
    needsExternalHelp: boolean("needs_external_help").default(false),

    // --- Scheduling ---
    frequency: frequencyEnum("frequency").notNull(),
    priority: priorityEnum("priority").notNull(),

    // --- Applicability ---
    appliesToEssential: boolean("applies_to_essential").default(true),
    appliesToImportant: boolean("applies_to_important").default(true),
    appliesToKritis: boolean("applies_to_kritis").default(true),
    sectorSpecific: text("sector_specific")
      .array()
      .default(sql`'{}'::text[]`),
    minEmployees: integer("min_employees"),

    // --- Legal references ---
    legalRef: varchar("legal_ref", { length: 255 }),
    directiveArticle: varchar("directive_article", { length: 100 }),
    cirReference: varchar("cir_reference", { length: 255 }),
    cirApplicability: varchar("cir_applicability", { length: 20 }),
    enisaGuidanceRef: varchar("enisa_guidance_ref", { length: 255 }),

    // --- Penalty ---
    penaltyAmount: varchar("penalty_amount", { length: 255 }),

    // --- Module reference (links requirement to operational table) ---
    moduleRef: varchar("module_ref", { length: 50 }),

    // --- Sign-off metadata (which role should handle this requirement) ---
    requiredSignOffRole: varchar("required_sign_off_role", { length: 50 }),

    // --- BSI IT-Grundschutz cross-reference ---
    grundschutzRef: varchar("grundschutz_ref", { length: 100 }),

    // --- Template versioning (for regulation change tracking) ---
    templateVersion: integer("template_version").default(1).notNull(),

    // --- Metadata ---
    sortOrder: integer("sort_order").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("idx_requirement_category").on(table.categoryId),
    index("idx_requirement_parent").on(table.parentId),
    index("idx_requirement_priority").on(table.priority),
  ]
);

// ---------------------------------------------------------------------------
// Requirement Prerequisites — Dependency graph between requirements
//
// Example: 2.1 (risk policy) must be done before 2.4 (risk register)
// ---------------------------------------------------------------------------

export const requirementPrerequisite = pgTable(
  "requirement_prerequisite",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    requirementId: uuid("requirement_id")
      .references(() => requirement.id)
      .notNull(),
    prerequisiteId: uuid("prerequisite_id")
      .references(() => requirement.id)
      .notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("idx_req_prereq_pair").on(
      table.requirementId,
      table.prerequisiteId
    ),
  ]
);

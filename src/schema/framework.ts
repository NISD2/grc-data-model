/**
 * Compliance Frameworks — Regulatory frameworks and their requirement categories
 *
 * Multi-framework by design: NIS2/BSIG today, GDPR/ISO 27001/Arbeitsschutz tomorrow.
 * Each framework has ordered categories (the 12 NIS2 domains, etc.).
 */
import {
  pgTable,
  uuid,
  varchar,
  boolean,
  integer,
  timestamp,
  date,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { frameworkEnum } from "../enums";

// ---------------------------------------------------------------------------
// Compliance Frameworks — NIS2, GDPR, ISO 27001, etc.
// ---------------------------------------------------------------------------

export const complianceFramework = pgTable("compliance_framework", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: frameworkEnum("code").notNull().unique(),
  version: varchar("version", { length: 50 }),
  effectiveDate: date("effective_date"),
  isActive: boolean("is_active").default(true),
  /** Prefix for category codes in UI — e.g. "NIS2-", "DSGVO-" */
  codePrefix: varchar("code_prefix", { length: 20 }),
  /** Translation key for sidebar label — e.g. "nis2", "dsgvo" */
  sidebarLabel: varchar("sidebar_label", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("idx_framework_active").on(table.isActive),
]);

// ---------------------------------------------------------------------------
// Requirement Categories — The 12 NIS2 domains (extensible per framework)
// ---------------------------------------------------------------------------

export const requirementCategory = pgTable("requirement_category", {
  id: uuid("id").primaryKey().defaultRandom(),
  frameworkId: uuid("framework_id")
    .references(() => complianceFramework.id)
    .notNull(),
  code: varchar("code", { length: 10 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),

  // Direct links to source law text
  nis2Url: varchar("nis2_url", { length: 500 }),
  bsigUrl: varchar("bsig_url", { length: 500 }),

  /** Roles this category is relevant to — e.g. ["ciso", "cto"] */
  relevantRoles: jsonb("relevant_roles").$type<string[]>(),

  // BSI IT-Grundschutz cross-reference
  grundschutzModule: varchar("grundschutz_module", { length: 50 }),

  // Ordering
  sortOrder: integer("sort_order").notNull(),
  estimatedMinutes: integer("estimated_minutes"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("idx_category_framework").on(table.frameworkId),
]);

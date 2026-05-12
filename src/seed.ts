/**
 * Generic framework seeder.
 *
 * Lets any consumer of `@nisd2/grc-data-model` populate a Postgres database
 * with the framework reference data (compliance_framework, requirement_category,
 * requirement, requirement_satisfaction) from the TS const arrays in
 * `frameworks/*.ts` and `satisfaction-pairs.ts`.
 *
 * The caller supplies a Drizzle `db` instance bound to its own schema.
 * Cleanup is scoped strictly to the framework code; other frameworks and any
 * operational data (companies, assessments, incidents, suppliers, etc.) are
 * never touched.
 *
 * Example:
 *
 *   import { drizzle } from "drizzle-orm/node-postgres";
 *   import {
 *     euAiActCategories,
 *     getEuAiActRequirementsForCategory,
 *   } from "@nisd2/grc-data-model/frameworks";
 *   import { aiActNis2SatisfactionPairs } from "@nisd2/grc-data-model/satisfaction-pairs";
 *   import { seedFramework, linkSatisfactionPairs } from "@nisd2/grc-data-model/seed";
 *
 *   const db = drizzle(pool);
 *   await seedFramework(db, {
 *     code: "eu_ai_act",
 *     version: "2024/1689",
 *     effectiveDate: "2024-08-01",
 *     codePrefix: "AI-",
 *     sidebarLabel: "aiact",
 *     categories: euAiActCategories,
 *     getRequirements: getEuAiActRequirementsForCategory,
 *   });
 *
 *   await linkSatisfactionPairs(db, aiActNis2SatisfactionPairs);
 */
import { eq, inArray, and, type ExtractTablesWithRelations } from "drizzle-orm";
import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import { frameworkEnum } from "./enums";
import {
  complianceFramework,
  requirementCategory,
  requirement,
  requirementPrerequisite,
  requirementSatisfaction,
} from "./schema";
import type { FrameworkCategory, FrameworkRequirement } from "./frameworks/types";
import type { SatisfactionPair } from "./satisfaction-pairs";

export type FrameworkCode = (typeof frameworkEnum.enumValues)[number];

/**
 * Any Drizzle PgDatabase instance with relational query support.
 *
 * The consumer's app types the schema fully; the seeder only needs the four
 * tables this package owns, so the generics stay open.
 */
export type SeedDb = PgDatabase<
  PgQueryResultHKT,
  Record<string, unknown>,
  ExtractTablesWithRelations<Record<string, unknown>>
>;

export interface FrameworkSeedSpec {
  /** Must match a value in the `framework` pg enum. */
  code: FrameworkCode;
  /** Regulation version string, e.g. "2024/1689". */
  version: string;
  /** ISO date string of the regulation's effective date. */
  effectiveDate: string;
  /** UI prefix for category codes, e.g. "AI-". */
  codePrefix: string;
  /** Sidebar label / i18n key, e.g. "aiact". */
  sidebarLabel: string;
  categories: FrameworkCategory[];
  getRequirements: (slug: string) => FrameworkRequirement[];
}

export interface SeedResult {
  frameworkId: string;
  categoryCount: number;
  requirementCount: number;
}

/**
 * Seed a single framework (idempotent).
 *
 * Removes existing rows for the given framework code before re-inserting.
 * Other frameworks and unrelated tables are not touched.
 */
export async function seedFramework(
  db: SeedDb,
  spec: FrameworkSeedSpec,
): Promise<SeedResult> {
  const existing = await db
    .select({ id: complianceFramework.id })
    .from(complianceFramework)
    .where(eq(complianceFramework.code, spec.code))
    .limit(1);

  if (existing.length > 0 && existing[0]) {
    const fwId = existing[0].id;
    const cats = await db
      .select({ id: requirementCategory.id })
      .from(requirementCategory)
      .where(eq(requirementCategory.frameworkId, fwId));
    const catIds = cats.map((c) => c.id);

    if (catIds.length > 0) {
      const reqs = await db
        .select({ id: requirement.id })
        .from(requirement)
        .where(inArray(requirement.categoryId, catIds));
      const reqIds = reqs.map((r) => r.id);

      if (reqIds.length > 0) {
        await db
          .delete(requirementPrerequisite)
          .where(inArray(requirementPrerequisite.requirementId, reqIds));
        await db
          .delete(requirement)
          .where(inArray(requirement.id, reqIds));
      }
      await db
        .delete(requirementCategory)
        .where(eq(requirementCategory.frameworkId, fwId));
    }
  }

  const [fw] = await db
    .insert(complianceFramework)
    .values({
      code: spec.code,
      version: spec.version,
      effectiveDate: spec.effectiveDate,
      isActive: true,
      codePrefix: spec.codePrefix,
      sidebarLabel: spec.sidebarLabel,
    })
    .onConflictDoUpdate({
      target: complianceFramework.code,
      set: {
        version: spec.version,
        effectiveDate: spec.effectiveDate,
        isActive: true,
      },
    })
    .returning({ id: complianceFramework.id });

  if (!fw) {
    throw new Error(`Failed to insert framework ${spec.code}`);
  }

  let categoryCount = 0;
  let requirementCount = 0;

  for (const cat of spec.categories) {
    const [row] = await db
      .insert(requirementCategory)
      .values({
        frameworkId: fw.id,
        code: cat.code,
        slug: cat.slug,
        nis2Url: cat.nis2Url,
        bsigUrl: cat.bsigUrl || null,
        sortOrder: cat.sortOrder,
        estimatedMinutes: cat.estimatedMinutes,
        relevantRoles: cat.relevantRoles ?? null,
        grundschutzModule: cat.grundschutzModule ?? null,
      })
      .returning({ id: requirementCategory.id });
    if (!row) continue;
    categoryCount++;

    const reqs = spec.getRequirements(cat.slug);
    for (let i = 0; i < reqs.length; i++) {
      const r = reqs[i];
      if (!r) continue;
      await db.insert(requirement).values({
        categoryId: row.id,
        code: r.code,
        evidenceType: r.evidenceType,
        frequency: r.frequency,
        priority: r.priority,
        importance: r.importance,
        legalRef: r.legalRef || null,
        directiveArticle: r.directiveArticle || null,
        moduleRef: r.moduleRef || null,
        requiredSignOffRole: r.requiredSignOffRole || null,
        sortOrder: i,
      });
      requirementCount++;
    }
  }

  return { frameworkId: fw.id, categoryCount, requirementCount };
}

export interface LinkResult {
  linkedCount: number;
  skipped: string[];
}

/**
 * Insert cross-framework satisfaction pairs (idempotent).
 *
 * Pairs whose codes are not yet seeded are skipped silently and returned in
 * the `skipped` array so the caller can warn or retry.
 */
export async function linkSatisfactionPairs(
  db: SeedDb,
  pairs: readonly SatisfactionPair[],
): Promise<LinkResult> {
  let linkedCount = 0;
  const skipped: string[] = [];

  for (const [aCode, bCode, rationale] of pairs) {
    const aRows = await db
      .select({ id: requirement.id })
      .from(requirement)
      .where(eq(requirement.code, aCode))
      .limit(1);
    const bRows = await db
      .select({ id: requirement.id })
      .from(requirement)
      .where(eq(requirement.code, bCode))
      .limit(1);

    const a = aRows[0];
    const b = bRows[0];

    if (!a || !b) {
      skipped.push(`${aCode} <-> ${bCode}`);
      continue;
    }

    const already = await db
      .select({ id: requirementSatisfaction.id })
      .from(requirementSatisfaction)
      .where(
        and(
          eq(requirementSatisfaction.requirementAId, a.id),
          eq(requirementSatisfaction.requirementBId, b.id),
        ),
      )
      .limit(1);

    if (already.length > 0) {
      linkedCount++;
      continue;
    }

    await db.insert(requirementSatisfaction).values({
      requirementAId: a.id,
      requirementBId: b.id,
      rationale,
    });
    linkedCount++;
  }

  return { linkedCount, skipped };
}

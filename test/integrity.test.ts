import { describe, expect, test } from "vitest";
import {
  nis2Categories,
  getNis2RequirementsForCategory,
  gdprCategories,
  getGdprRequirementsForCategory,
} from "../src/frameworks";
import { nis2GdprSatisfactionPairs } from "../src/satisfaction-pairs";

const nis2Codes = new Set<string>();
for (const c of nis2Categories) for (const r of getNis2RequirementsForCategory(c.slug)) nis2Codes.add(r.code);

const gdprCodes = new Set<string>();
for (const c of gdprCategories) for (const r of getGdprRequirementsForCategory(c.slug)) gdprCodes.add(r.code);

describe("satisfaction pairs", () => {
  test("every NIS2 code references a real requirement", () => {
    for (const [a] of nis2GdprSatisfactionPairs) {
      expect(nis2Codes.has(a), `unknown NIS2 code: ${a}`).toBe(true);
    }
  });

  test("every GDPR code references a real requirement", () => {
    for (const [, b] of nis2GdprSatisfactionPairs) {
      expect(gdprCodes.has(b), `unknown GDPR code: ${b}`).toBe(true);
    }
  });

  test("rationale is non-empty for every pair", () => {
    for (const [a, b, rationale] of nis2GdprSatisfactionPairs) {
      expect(rationale.trim().length, `empty rationale for ${a} ↔ ${b}`).toBeGreaterThan(0);
    }
  });
});

describe("framework data", () => {
  test("NIS2 has no duplicate requirement codes", () => {
    const seen = new Set<string>();
    for (const c of nis2Categories) {
      for (const r of getNis2RequirementsForCategory(c.slug)) {
        expect(seen.has(r.code), `duplicate NIS2 code: ${r.code}`).toBe(false);
        seen.add(r.code);
      }
    }
  });

  test("GDPR has no duplicate requirement codes", () => {
    const seen = new Set<string>();
    for (const c of gdprCategories) {
      for (const r of getGdprRequirementsForCategory(c.slug)) {
        expect(seen.has(r.code), `duplicate GDPR code: ${r.code}`).toBe(false);
        seen.add(r.code);
      }
    }
  });

  test("category slugs are unique within each framework", () => {
    const nis2Slugs = nis2Categories.map((c) => c.slug);
    expect(new Set(nis2Slugs).size).toBe(nis2Slugs.length);
    const gdprSlugs = gdprCategories.map((c) => c.slug);
    expect(new Set(gdprSlugs).size).toBe(gdprSlugs.length);
  });
});

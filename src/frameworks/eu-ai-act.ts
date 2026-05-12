import type { FrameworkCategory, FrameworkRequirement } from "./types";
import { makeRequirementFactory } from "./types";

const mkReq = makeRequirementFactory("aiact-req");

export const euAiActCategories: FrameworkCategory[] = [
  { id: "aiact-cat-01", code: "AI-LIT", slug: "aiact-literacy",
    nis2Url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj", bsigUrl: "",
    sortOrder: 1, estimatedMinutes: 45, relevantRoles: ["ceo", "ciso", "hr_director"] },
  { id: "aiact-cat-02", code: "AI-PRO", slug: "aiact-prohibited",
    nis2Url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj", bsigUrl: "",
    sortOrder: 2, estimatedMinutes: 30, relevantRoles: ["legal", "ciso"] },
  { id: "aiact-cat-03", code: "AI-INV", slug: "aiact-inventory",
    nis2Url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj", bsigUrl: "",
    sortOrder: 3, estimatedMinutes: 60, relevantRoles: ["ciso", "cto"] },
  { id: "aiact-cat-04", code: "AI-RSK", slug: "aiact-risk-management",
    nis2Url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj", bsigUrl: "",
    sortOrder: 4, estimatedMinutes: 60, relevantRoles: ["ciso"] },
  { id: "aiact-cat-05", code: "AI-FRI", slug: "aiact-fundamental-rights",
    nis2Url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj", bsigUrl: "",
    sortOrder: 5, estimatedMinutes: 90, relevantRoles: ["legal", "ciso"] },
  { id: "aiact-cat-06", code: "AI-OVS", slug: "aiact-human-oversight",
    nis2Url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj", bsigUrl: "",
    sortOrder: 6, estimatedMinutes: 45, relevantRoles: ["ciso"] },
  { id: "aiact-cat-07", code: "AI-TRA", slug: "aiact-transparency",
    nis2Url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj", bsigUrl: "",
    sortOrder: 7, estimatedMinutes: 45, relevantRoles: ["legal", "cto"] },
  { id: "aiact-cat-08", code: "AI-INC", slug: "aiact-incident-reporting",
    nis2Url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj", bsigUrl: "",
    sortOrder: 8, estimatedMinutes: 40, relevantRoles: ["ciso"] },
  { id: "aiact-cat-09", code: "AI-DOC", slug: "aiact-technical-documentation",
    nis2Url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj", bsigUrl: "",
    sortOrder: 9, estimatedMinutes: 90, relevantRoles: ["cto", "ciso"] },
  { id: "aiact-cat-10", code: "AI-GPI", slug: "aiact-gpai",
    nis2Url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj", bsigUrl: "",
    sortOrder: 10, estimatedMinutes: 60, relevantRoles: ["cto"] },
];

const REQUIREMENTS_BY_SLUG: Record<string, () => FrameworkRequirement[]> = {
  "aiact-literacy": () => [
    mkReq("AI-LIT.1", "training", { priority: "P1", frequency: "annual", legalRef: "AI Act Art. 4", directiveArticle: "Art. 4", moduleRef: "training_record" }),
    mkReq("AI-LIT.2", "training", { priority: "P1", frequency: "every-3-years", legalRef: "AI Act Art. 4, Art. 26(2)", directiveArticle: "Art. 4", moduleRef: "training_record", requiredSignOffRole: "ceo" }),
  ],
  "aiact-prohibited": () => [
    mkReq("AI-PRO.1", "document", { priority: "P0", frequency: "on-change", legalRef: "AI Act Art. 5(1)(a)-(i)", directiveArticle: "Art. 5", moduleRef: "policy" }),
    mkReq("AI-PRO.2", "proof", { priority: "P0", frequency: "on-change", legalRef: "AI Act Art. 5", directiveArticle: "Art. 5" }),
  ],
  "aiact-inventory": () => [
    mkReq("AI-INV.1", "document", { priority: "P0", frequency: "ongoing", legalRef: "AI Act Art. 6, Art. 26", directiveArticle: "Art. 6", moduleRef: "asset" }),
    mkReq("AI-INV.2", "proof", { priority: "P0", frequency: "on-change", legalRef: "AI Act Art. 6, Art. 50", directiveArticle: "Art. 6", moduleRef: "asset" }),
    mkReq("AI-INV.3", "proof", { priority: "P1", frequency: "on-change", legalRef: "AI Act Art. 25", directiveArticle: "Art. 25" }),
  ],
  "aiact-risk-management": () => [
    mkReq("AI-RSK.1", "document", { priority: "P0", frequency: "one-time", legalRef: "AI Act Art. 9", directiveArticle: "Art. 9", moduleRef: "policy" }),
    mkReq("AI-RSK.2", "proof", { priority: "P1", frequency: "annual", legalRef: "AI Act Art. 9", directiveArticle: "Art. 9", moduleRef: "risk" }),
  ],
  "aiact-fundamental-rights": () => [
    mkReq("AI-FRI.1", "document", { priority: "P0", frequency: "on-change", legalRef: "AI Act Art. 27", directiveArticle: "Art. 27", moduleRef: "policy", requiredSignOffRole: "ceo" }),
  ],
  "aiact-human-oversight": () => [
    mkReq("AI-OVS.1", "proof", { priority: "P0", frequency: "on-change", legalRef: "AI Act Art. 14, Art. 26(2)", directiveArticle: "Art. 14" }),
    mkReq("AI-OVS.2", "proof", { priority: "P1", frequency: "annual", legalRef: "AI Act Art. 14", directiveArticle: "Art. 14" }),
  ],
  "aiact-transparency": () => [
    mkReq("AI-TRA.1", "document", { priority: "P1", frequency: "on-change", legalRef: "AI Act Art. 50(1)", directiveArticle: "Art. 50" }),
    mkReq("AI-TRA.2", "technical", { priority: "P1", frequency: "ongoing", legalRef: "AI Act Art. 50(2)", directiveArticle: "Art. 50" }),
    mkReq("AI-TRA.3", "proof", { priority: "P1", frequency: "on-change", legalRef: "AI Act Art. 50(4)", directiveArticle: "Art. 50" }),
  ],
  "aiact-incident-reporting": () => [
    mkReq("AI-INC.1", "document", { priority: "P0", frequency: "one-time", legalRef: "AI Act Art. 73", directiveArticle: "Art. 73", moduleRef: "policy" }),
    mkReq("AI-INC.2", "proof", { priority: "P0", frequency: "on-change", legalRef: "AI Act Art. 73", directiveArticle: "Art. 73", moduleRef: "incident" }),
  ],
  "aiact-technical-documentation": () => [
    mkReq("AI-DOC.1", "document", { priority: "P1", frequency: "on-change", legalRef: "AI Act Annex IV, Art. 11, Art. 18", directiveArticle: "Annex IV" }),
    mkReq("AI-DOC.2", "technical", { priority: "P1", frequency: "ongoing", legalRef: "AI Act Art. 12, Art. 19", directiveArticle: "Art. 12" }),
    mkReq("AI-DOC.3", "sign-off", { priority: "P0", frequency: "on-change", legalRef: "AI Act Art. 47, Annex V", directiveArticle: "Art. 47", requiredSignOffRole: "ceo" }),
  ],
  "aiact-gpai": () => [
    mkReq("AI-GPI.1", "document", { priority: "P1", frequency: "on-change", legalRef: "AI Act Art. 53(1)(a)", directiveArticle: "Art. 53" }),
    mkReq("AI-GPI.2", "document", { priority: "P1", frequency: "one-time", legalRef: "AI Act Art. 53(1)(c)", directiveArticle: "Art. 53" }),
    mkReq("AI-GPI.3", "document", { priority: "P1", frequency: "on-change", legalRef: "AI Act Art. 53(1)(d)", directiveArticle: "Art. 53" }),
    mkReq("AI-GPI.4", "proof", { priority: "P0", frequency: "ongoing", legalRef: "AI Act Art. 55", directiveArticle: "Art. 55" }),
  ],
};

export function getEuAiActRequirementsForCategory(slug: string): FrameworkRequirement[] {
  const builder = REQUIREMENTS_BY_SLUG[slug];
  if (!builder) return [];
  return builder();
}

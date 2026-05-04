import type {
  FrameworkCategory,
  FrameworkRequirement,
  EvidenceType,
  Frequency,
  Importance,
  Priority,
} from "./types";

let _id = 0;
function mkReq(
  code: string,
  evidenceType: EvidenceType,
  opts: {
    priority?: Priority;
    importance?: Importance;
    frequency?: Frequency;
    legalRef?: string;
    directiveArticle?: string;
    moduleRef?: string;
    requiredSignOffRole?: string;
  } = {},
): FrameworkRequirement {
  _id++;
  return {
    id: `gdpr-req-${_id}`,
    code,
    evidenceType,
    frequency: opts.frequency ?? "annual",
    priority: opts.priority ?? "P1",
    importance: opts.importance ?? "mandatory",
    legalRef: opts.legalRef ?? "",
    directiveArticle: opts.directiveArticle ?? null,
    moduleRef: opts.moduleRef ?? null,
    requiredSignOffRole: opts.requiredSignOffRole ?? null,
  };
}

export const gdprCategories: FrameworkCategory[] = [
  { id: "gdpr-cat-01", code: "DPA", slug: "gdpr-processor-agreements",
    nis2Url: "https://gdpr-info.eu/art-28-gdpr/", bsigUrl: "",
    sortOrder: 1, estimatedMinutes: 60, relevantRoles: ["legal", "ciso"] },
  { id: "gdpr-cat-02", code: "ROP", slug: "gdpr-records-of-processing",
    nis2Url: "https://gdpr-info.eu/art-30-gdpr/", bsigUrl: "",
    sortOrder: 2, estimatedMinutes: 90, relevantRoles: ["legal"] },
  { id: "gdpr-cat-03", code: "TOM", slug: "gdpr-toms",
    nis2Url: "https://gdpr-info.eu/art-32-gdpr/", bsigUrl: "",
    sortOrder: 3, estimatedMinutes: 60, relevantRoles: ["ciso"] },
  { id: "gdpr-cat-04", code: "BRC", slug: "gdpr-breach-response",
    nis2Url: "https://gdpr-info.eu/art-33-gdpr/", bsigUrl: "",
    sortOrder: 4, estimatedMinutes: 45, relevantRoles: ["ciso", "legal"] },
  { id: "gdpr-cat-05", code: "DSR", slug: "gdpr-data-subject-rights",
    nis2Url: "https://gdpr-info.eu/art-15-gdpr/", bsigUrl: "",
    sortOrder: 5, estimatedMinutes: 60, relevantRoles: ["legal"] },
];

const REQUIREMENTS_BY_SLUG: Record<string, () => FrameworkRequirement[]> = {
  "gdpr-processor-agreements": () => [
    mkReq("G-DPA.1", "document", { legalRef: "GDPR Art. 28(3)", directiveArticle: "Art. 28", moduleRef: "supplier", priority: "P1" }),
    mkReq("G-DPA.2", "document", { legalRef: "GDPR Art. 28(2)/(4)", directiveArticle: "Art. 28", moduleRef: "supplier", priority: "P1" }),
  ],
  "gdpr-records-of-processing": () => [
    mkReq("G-ROP.1", "document", { legalRef: "GDPR Art. 30(1)", directiveArticle: "Art. 30", moduleRef: "asset", priority: "P0" }),
  ],
  "gdpr-toms": () => [
    mkReq("G-TOM.1", "document", { legalRef: "GDPR Art. 32(1)", directiveArticle: "Art. 32", moduleRef: "policy", priority: "P0" }),
  ],
  "gdpr-breach-response": () => [
    mkReq("G-BRC.1", "document", { legalRef: "GDPR Art. 33", directiveArticle: "Art. 33", moduleRef: "policy", priority: "P0" }),
    mkReq("G-BRC.2", "document", { legalRef: "GDPR Art. 33(5)", directiveArticle: "Art. 33", moduleRef: "incident", priority: "P1" }),
  ],
  "gdpr-data-subject-rights": () => [
    mkReq("G-DSR.1", "document", { legalRef: "GDPR Art. 15-22", directiveArticle: "Art. 15-22", priority: "P1" }),
  ],
};

export function getGdprRequirementsForCategory(slug: string): FrameworkRequirement[] {
  const builder = REQUIREMENTS_BY_SLUG[slug];
  if (!builder) return [];
  return builder();
}

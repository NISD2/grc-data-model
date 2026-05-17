export interface FrameworkCategory {
  id: string;
  code: string;
  slug: string;
  sortOrder: number;
  estimatedMinutes: number;
  relevantRoles?: string[];
  grundschutzModule?: string;
  nis2Url: string;
  bsigUrl: string;
}

export type EvidenceType =
  | "document"
  | "proof"
  | "sign-off"
  | "technical"
  | "training";

export type Priority = "P0" | "P1" | "P2" | "P3";

export type Importance = "mandatory" | "recommended" | "enhanced";

export type Frequency =
  | "one-time"
  | "monthly"
  | "quarterly"
  | "semi-annual"
  | "annual"
  | "every-3-years"
  | "on-change"
  | "ongoing";

export interface FrameworkRequirement {
  id: string;
  code: string;
  evidenceType: EvidenceType;
  frequency: Frequency;
  priority: Priority;
  importance: Importance;
  legalRef: string;
  directiveArticle: string | null;
  cirReference: string | null;
  moduleRef: string | null;
  requiredSignOffRole: string | null;
}

export interface RequirementOptions {
  priority?: Priority;
  importance?: Importance;
  frequency?: Frequency;
  legalRef?: string;
  directiveArticle?: string;
  cirReference?: string;
  moduleRef?: string;
  requiredSignOffRole?: string;
}

export function makeRequirementFactory(idPrefix: string) {
  let n = 0;
  return function mkReq(
    code: string,
    evidenceType: EvidenceType,
    opts: RequirementOptions = {},
  ): FrameworkRequirement {
    n++;
    return {
      id: `${idPrefix}-${n}`,
      code,
      evidenceType,
      frequency: opts.frequency ?? "annual",
      priority: opts.priority ?? "P1",
      importance: opts.importance ?? "mandatory",
      legalRef: opts.legalRef ?? "",
      directiveArticle: opts.directiveArticle ?? null,
      cirReference: opts.cirReference ?? null,
      moduleRef: opts.moduleRef ?? null,
      requiredSignOffRole: opts.requiredSignOffRole ?? null,
    };
  };
}

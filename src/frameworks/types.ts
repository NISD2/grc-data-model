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
  moduleRef: string | null;
  requiredSignOffRole: string | null;
}

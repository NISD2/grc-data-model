/**
 * NIS2 ↔ GDPR field-level mapping.
 *
 * Each row asserts a relationship between an EU-level NIS2 obligation
 * and an EU-level GDPR obligation. Linktype indicates the nature of
 * the relationship — `shared_data` means the same row in our data
 * model serves both regimes; `parallel_workflow` means separate
 * obligations triggered by the same event.
 *
 * Sources: ENISA NIS2 Technical Implementation Guidance v1.0; EDPB
 * guidelines; cross-referenced against Paolo Carner's NIS2 SMB Toolkit
 * (CC BY 4.0).
 */

export type LinkType =
  | "shared_data"          // same row serves both regimes
  | "parallel_workflow"    // separate obligations, common trigger
  | "informational";       // related but not legally coupled

export interface MappingRow {
  nis2Article: string;
  gdprArticle: string;
  concept: string;
  linkType: LinkType;
  notes?: string;
}

export const nis2GdprMapping: MappingRow[] = [
  {
    nis2Article: "Art. 21(2)(d)",
    gdprArticle: "Art. 28",
    concept: "Supply-chain security ↔ Processor agreements",
    linkType: "shared_data",
    notes: "The supplier row is the same; NIS2 cares about supplier cybersecurity posture, GDPR cares about Art. 28 contract clauses on the same row.",
  },
  {
    nis2Article: "Art. 21(2)(h)",
    gdprArticle: "Art. 32(1)(a)",
    concept: "Cryptography measures",
    linkType: "shared_data",
    notes: "Same TOMs entry tagged with both regimes.",
  },
  {
    nis2Article: "Art. 21(2)(c)",
    gdprArticle: "Art. 32(1)(c)",
    concept: "Business continuity ↔ Availability and resilience",
    linkType: "shared_data",
  },
  {
    nis2Article: "Art. 21(2)(j)",
    gdprArticle: "Art. 32 (implicit)",
    concept: "Access control",
    linkType: "shared_data",
  },
  {
    nis2Article: "Art. 23",
    gdprArticle: "Art. 33/34",
    concept: "Incident reporting",
    linkType: "parallel_workflow",
    notes: "Same incident may trigger both: NIS2 24h/72h/1mo cyber notification AND GDPR 72h personal-data-breach notification. Different recipients (national CSIRT vs DPA), different content requirements.",
  },
  {
    nis2Article: "Art. 21(2)(i)",
    gdprArticle: "Art. 32 (implicit)",
    concept: "HR security ↔ persons authorised bound by confidentiality",
    linkType: "shared_data",
    notes: "Art. 28(3)(b) requires processor staff to be bound by confidentiality; same control under NIS2 personnel security.",
  },
  {
    nis2Article: "Art. 20(2)",
    gdprArticle: "Art. 39(1)(b)",
    concept: "Training",
    linkType: "shared_data",
    notes: "NIS2 management body training ↔ DPO duty to train staff. Different audiences within the same training programme.",
  },
];

/** Helper: filter mapping rows by NIS2 article. */
export function findByNis2Article(article: string): MappingRow[] {
  return nis2GdprMapping.filter((row) => row.nis2Article === article);
}

/** Helper: filter mapping rows by GDPR article. */
export function findByGdprArticle(article: string): MappingRow[] {
  return nis2GdprMapping.filter((row) => row.gdprArticle === article);
}

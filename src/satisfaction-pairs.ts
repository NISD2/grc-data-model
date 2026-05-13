/**
 * Cross-framework satisfaction pairs.
 *
 * Each tuple is `[codeA, codeB, rationale, kind?]` where `kind` defaults to
 * `"overlapping"`. Pairs marked `"equivalent"` describe a relationship where
 * the SAME underlying artefact (same record, same methodology, same incident
 * row) satisfies both requirements; the propagation engine treats those as
 * transitively composable. Pairs marked `"overlapping"` describe partial
 * conceptual overlap; propagation credits the direct neighbour but does not
 * compose transitively.
 */
export type EquivalenceKind = "equivalent" | "overlapping";

export type SatisfactionPair = readonly [
  codeA: string,
  codeB: string,
  rationale: string,
  kind?: EquivalenceKind,
];

export const nis2GdprSatisfactionPairs: SatisfactionPair[] = [
  ["5.1", "G-DPA.1", "Same supplier register; NIS2 §30(2) Nr. 4 ↔ GDPR Art. 28 DPA evidence.", "equivalent"],
  ["5.2", "G-DPA.1", "Contractual security clauses cover the same processor obligations as Art. 28 DPAs.", "equivalent"],
  ["5.2", "G-DPA.2", "Sub-processor lists live on the same supplier rows used for NIS2 governance and Art. 28(2)/(4).", "equivalent"],

  ["2.1", "G-ROP.1", "Asset classification methodology defines the systems recorded in the Art. 30 register."],
  ["2.2", "G-ROP.1", "Same asset inventory; NIS2 asset-classification ↔ GDPR Art. 30 records of processing.", "equivalent"],
  ["2.3", "G-ROP.1", "Asset criticality under NIS2 informs Art. 30/35 high-risk processing."],

  ["3.1", "G-BRC.1", "Same incident response procedure satisfies the NIS2 detection-to-notification flow and the GDPR Art. 33 breach response.", "equivalent"],
  ["3.2", "G-BRC.2", "Same incident rows; NIS2 detection/logging ↔ Art. 33(5) breach documentation.", "equivalent"],
  ["3.3", "G-BRC.1", "NIS2 24h/72h cascade and Art. 33's 72h breach notification share the same clock.", "equivalent"],
  ["3.5", "G-BRC.2", "Same final incident report: NIS2 §35 and Art. 33(5) share the root-cause evidence and lessons-learned write-up.", "equivalent"],

  ["2.4", "G-TOM.1", "CEO sign-off on the Art. 21(2) risk treatment plan attests the TOMs posture Art. 32 requires."],
];

export const aiActNis2SatisfactionPairs: SatisfactionPair[] = [
  ["AI-LIT.1", "8.1", "AI literacy training programme overlaps with the NIS2 cyber hygiene training under CIR 8.1."],
  ["AI-LIT.2", "1.1", "Management body AI training (Art. 4 + 26(2)) overlaps with the §38(3) BSIG management cybersecurity training."],
  ["AI-INV.1", "2.2", "Same inventory: AI systems are assets, so one register satisfies both the NIS2 asset list and the AI Act inventory.", "equivalent"],
  ["AI-RSK.1", "2.1", "AI risk management framework reuses the methodology defined for NIS2 risk management (CIR 2.1).", "equivalent"],
  ["AI-RSK.2", "2.3", "Annual AI risk review feeds the same asset-classification update NIS2 expects.", "equivalent"],
  ["AI-INC.1", "3.1", "AI incident response procedure overlaps with the NIS2 incident handling policy under CIR 3.1."],
  ["AI-INC.2", "3.3", "Same incident record; the AI Act 15-day MSA notification and NIS2 24h/72h CSIRT cascade share the underlying event.", "equivalent"],
];

export const aiActGdprSatisfactionPairs: SatisfactionPair[] = [
  ["AI-FRI.1", "G-TOM.1", "Fundamental Rights Impact Assessment overlaps with the GDPR Art. 35 DPIA when the AI system processes personal data."],
  ["AI-TRA.1", "G-ROP.1", "AI Act Art. 50 transparency to end users overlaps with GDPR Art. 13/14 information duties when the AI processes personal data."],
  ["AI-RSK.1", "G-TOM.1", "AI risk management framework under Art. 9 overlaps with the technical and organisational measures GDPR Art. 32 requires."],
  ["AI-DOC.1", "G-ROP.1", "Annex IV technical documentation overlaps with the GDPR Art. 30 records of processing when the AI system processes personal data."],
  ["AI-INC.1", "G-BRC.1", "AI Act Art. 73 incident response procedure overlaps with the GDPR Art. 33 breach response procedure when the incident involves personal data."],
];

export const craNis2SatisfactionPairs: SatisfactionPair[] = [
  ["CRA-VLN.1", "6.3", "Vulnerability handling procedures overlap with NIS2 vulnerability and patch management requirements."],
  ["CRA-VLN.3", "6.4", "Security updates without delay align with the NIS2 patch management cadence."],
  ["CRA-INC.1", "3.1", "Active-exploitation reporting reuses the same incident response procedure NIS2 expects.", "equivalent"],
  ["CRA-INC.2", "3.3", "Same record progresses through both clocks: CRA 24h/72h to ENISA + CSIRT and NIS2 24h/72h to CSIRT.", "equivalent"],
  ["CRA-INC.3", "3.5", "CRA 14-day final report and NIS2 final incident report share the same root-cause and mitigation evidence.", "equivalent"],
  ["CRA-IMP.1", "5.1", "Importer due diligence on manufacturers overlaps with the NIS2 supplier security policy."],
  ["CRA-IMP.2", "5.2", "Distributor checks overlap with NIS2 supplier contractual security clauses."],
  ["CRA-MFG.1", "2.1", "Per-product cybersecurity risk assessment reuses the methodology defined for NIS2 risk management (CIR 2.1).", "equivalent"],
  ["CRA-MFG.2", "2.4", "Management body sign-off on CRA risk assessment overlaps with the CEO sign-off NIS2 risk treatment plan requires."],
];

export const craAiActSatisfactionPairs: SatisfactionPair[] = [
  ["CRA-ESS.1", "AI-RSK.1", "Essential cybersecurity requirements (Annex I) overlap with AI risk management for high-risk AI systems with embedded digital elements; Art. 12 CRA presumption-of-conformity links the two."],
  ["CRA-DOC.1", "AI-DOC.1", "Annex VII technical documentation overlaps with AI Act Annex IV for products that are both PDE and high-risk AI."],
  ["CRA-INC.1", "AI-INC.1", "Active-exploitation reporting overlaps with the AI Act incident response procedure when the AI system is also a product with digital elements."],
  ["CRA-DOC.1", "AI-DOC.2", "Annex VII technical documentation includes the logging and traceability evidence Art. 12 AI Act requires."],
];

export const craGdprSatisfactionPairs: SatisfactionPair[] = [
  ["CRA-ESS.1", "G-TOM.1", "Essential cybersecurity requirements (Annex I) overlap with the technical and organisational measures GDPR Art. 32 requires when the product processes personal data."],
  ["CRA-VLN.1", "G-BRC.1", "Vulnerability handling procedures feed the GDPR Art. 33 breach response when a vulnerability leads to a personal-data breach."],
];

export const allSatisfactionPairs: SatisfactionPair[] = [
  ...nis2GdprSatisfactionPairs,
  ...aiActNis2SatisfactionPairs,
  ...aiActGdprSatisfactionPairs,
  ...craNis2SatisfactionPairs,
  ...craAiActSatisfactionPairs,
  ...craGdprSatisfactionPairs,
];

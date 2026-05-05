export type SatisfactionPair = readonly [
  nis2Code: string,
  gdprCode: string,
  rationale: string,
];

export const nis2GdprSatisfactionPairs: SatisfactionPair[] = [
  ["5.1", "G-DPA.1", "Same supplier register; NIS2 §30(2) Nr. 4 ↔ GDPR Art. 28 DPA evidence."],
  ["5.2", "G-DPA.1", "Contractual security clauses cover the same processor obligations as Art. 28 DPAs."],
  ["5.2", "G-DPA.2", "Sub-processor lists live on the same supplier rows used for NIS2 governance and Art. 28(2)/(4)."],

  ["2.1", "G-ROP.1", "Asset classification methodology defines the systems recorded in the Art. 30 register."],
  ["2.2", "G-ROP.1", "Same asset inventory; NIS2 asset-classification ↔ GDPR Art. 30 records of processing."],
  ["2.3", "G-ROP.1", "Asset criticality under NIS2 informs Art. 30/35 high-risk processing."],

  ["3.1", "G-BRC.1", "Incident response procedure covers the detection-to-notification flow Art. 33 requires."],
  ["3.2", "G-BRC.2", "Same incident rows; NIS2 detection/logging ↔ Art. 33(5) breach documentation."],
  ["3.3", "G-BRC.1", "NIS2 24h/72h cascade and Art. 33's 72h breach notification share the same clock."],
  ["3.5", "G-BRC.2", "Final incident report under NIS2 §35 documents the root-cause evidence Art. 33(5) requires."],

  ["2.4", "G-TOM.1", "CEO sign-off on the Art. 21(2) risk treatment plan attests the TOMs posture Art. 32 requires."],
];

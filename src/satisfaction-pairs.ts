/**
 * NIS2 ↔ GDPR cross-framework satisfaction pairs.
 *
 * Each tuple [nis2Code, gdprCode, rationale] declares: signing the NIS2
 * requirement implies the GDPR one is also satisfied (and vice versa),
 * because the same operational evidence supports both attestations.
 *
 * G-DSR.1 (data subject rights) is intentionally unmapped — DSAR has no
 * NIS2 mirror. G-TOM.1 maps only to NIS2 2.4 (CEO sign-off on the Art.
 * 21(2) risk treatment plan), which is the umbrella attestation; mapping
 * individual technical controls (encryption, MFA, BCP) to G-TOM.1 would
 * over-claim — Art. 32 requires the full TOMs set, not any single piece.
 *
 * Pairwise scaling note: this is the right shape for 2 frameworks. At
 * 3+ frameworks per topic, migrate to a control-group abstraction
 * (1 group + N members) — pairwise rows scale N² per topic at that point.
 */

export type SatisfactionPair = readonly [
  nis2Code: string,
  gdprCode: string,
  rationale: string,
];

export const nis2GdprSatisfactionPairs: SatisfactionPair[] = [
  // Supply chain — same supplier rows
  [
    "5.1", "G-DPA.1",
    "Both attest the supplier register with processor relationships. Same supplier rows; one click signs both NIS2 supply-chain register and GDPR Art. 28 DPA evidence.",
  ],
  [
    "5.2", "G-DPA.1",
    "Contractual security clauses with suppliers (NIS2 §30(2) Nr. 4) cover the same processor obligations evidenced for GDPR Art. 28 DPAs.",
  ],
  [
    "5.2", "G-DPA.2",
    "Sub-processor lists and contractual flow-down live on the same supplier rows used for NIS2 supplier governance and GDPR Art. 28(2)/(4) sub-processor approval.",
  ],

  // Asset inventory — same asset rows for personal-data processing
  [
    "2.1", "G-ROP.1",
    "Asset classification methodology defines the universe of systems whose personal-data processing is then recorded in the GDPR Art. 30 register — same dataset.",
  ],
  [
    "2.2", "G-ROP.1",
    "Both attest the asset inventory of systems handling personal data. Same asset rows; one click signs both NIS2 asset-classification and GDPR Art. 30 records of processing.",
  ],
  [
    "2.3", "G-ROP.1",
    "Asset criticality classification under NIS2 directly informs whether processing on that asset is high-risk under GDPR Art. 30/35 — same data.",
  ],

  // Incident detection + breach documentation — same incident workflow
  [
    "3.1", "G-BRC.1",
    "Incident response procedure under NIS2 covers the detection-to-notification flow that GDPR Art. 33 also requires for personal data breaches.",
  ],
  [
    "3.2", "G-BRC.2",
    "Both attest documented incidents. Same incident rows; one click signs both NIS2 detection/logging and GDPR Art. 33(5) breach documentation.",
  ],
  [
    "3.3", "G-BRC.1",
    "NIS2 24h/72h incident notification cascade and GDPR Art. 33's 72h breach notification share the same incident clock and dataset.",
  ],
  [
    "3.5", "G-BRC.2",
    "Final incident report under NIS2 §35 documents the same root-cause evidence required by GDPR Art. 33(5).",
  ],

  // TOMs — umbrella attestation only (CEO sign-off on Art. 21(2) plan)
  [
    "2.4", "G-TOM.1",
    "CEO sign-off on the NIS2 Art. 21(2) risk treatment plan attests the same operational TOMs posture required by GDPR Art. 32 — encryption, access control, BCP, monitoring as a managed whole.",
  ],
];

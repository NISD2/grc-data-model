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

export const iso27001Nis2SatisfactionPairs: SatisfactionPair[] = [
  // ── Governance (NIS2 1.x) ────────────────────────────────────────────────────
  ["IS-5.1", "1.3", "CEO commitment artefact under Cl. 5.1 is the same leadership accountability §38(1) BSIG requires.", "equivalent"],
  ["IS-5.1", "1.4", "CEO sign-off on the ISMS directly satisfies the NIS2 management accountability sign-off.", "equivalent"],
  ["IS-5.2", "1.2", "Information security policy (Cl. 5.2) is the governance document NIS2 §30(1) requires.", "equivalent"],
  ["IS-5.3", "1.2", "Documented roles and responsibilities (Cl. 5.3) fulfil the governance structure NIS2 Art. 20(1) requires."],
  ["A.5.1",  "1.2", "Policies for information security (A.5.1) overlap with the governance framework NIS2 §30(1) requires."],
  ["IS-9.3", "1.3", "Management review records (Cl. 9.3) evidence the leadership oversight NIS2 management accountability demands."],

  // ── Risk management (NIS2 2.x) ───────────────────────────────────────────────
  ["IS-6.1", "2.1", "Risk assessment methodology (Cl. 6.1) is the risk management methodology NIS2 CIR 2.1 requires.", "equivalent"],
  ["IS-8.2", "2.1", "Operational risk assessment (Cl. 8.2) re-runs the same methodology; same risk register satisfies both.", "equivalent"],
  ["IS-6.2", "2.4", "Risk treatment plan signed off under Cl. 6.2 is the CEO-signed treatment plan NIS2 CIR 1.1/2.1.1 requires.", "equivalent"],
  ["IS-8.3", "2.1", "Operational risk treatment (Cl. 8.3) implements the plan required by NIS2 CIR 2.1."],
  ["A.5.9",  "2.2", "Asset inventory (A.5.9) is the same register NIS2 CIR 12 / §28 BSIG requires for asset identification.", "equivalent"],
  ["A.8.1",  "2.2", "User endpoint device inventory (A.8.1) feeds the same asset register NIS2 mandates."],
  ["A.5.12", "2.3", "Information classification scheme (A.5.12) drives the asset criticality ratings NIS2 CIR 2.1.2 expects."],
  ["A.5.13", "2.3", "Information labelling (A.5.13) implements the classification that underpins NIS2 asset classification."],

  // ── Incident handling (NIS2 3.x) ─────────────────────────────────────────────
  ["A.5.24", "3.1", "IS incident management planning (A.5.24) produces the incident response policy NIS2 CIR 3.1 requires.", "equivalent"],
  ["A.5.25", "3.2", "Assessment of IS events (A.5.25) covers the detection and logging NIS2 CIR 3.2/3.4 expects.", "equivalent"],
  ["A.5.26", "3.1", "Response to IS incidents (A.5.26) implements the same response procedure; same incident record.", "equivalent"],
  ["A.5.26", "3.3", "Response execution under A.5.26 and the NIS2 24h/72h CSIRT cascade share the same underlying event record.", "equivalent"],
  ["A.5.27", "3.5", "Lessons-learned output (A.5.27) is the final incident report NIS2 CIR 3.6 / §35 BSIG requires.", "equivalent"],
  ["A.6.8",  "3.2", "IS event reporting channel (A.6.8) overlaps with NIS2 internal detection and reporting flows."],
  ["A.8.15", "3.2", "Logging controls (A.8.15) generate the evidence trail NIS2 CIR 3.2 expects for incident detection."],
  ["A.8.16", "3.2", "Monitoring activities (A.8.16) overlap with NIS2 detection and alerting requirements."],

  // ── Business continuity (NIS2 4.x) ───────────────────────────────────────────
  ["A.5.29", "4.1", "IS continuity policy (A.5.29) is the BCP framework document NIS2 CIR 4.1 requires.", "equivalent"],
  ["A.5.29", "4.2", "Same IS continuity policy covers the BCP plan content NIS2 CIR 4.1/4.3 requires."],
  ["A.5.29", "4.5", "Continuity policy requirements include testing obligations that map to NIS2 BCP exercise requirements."],
  ["A.5.30", "4.3", "ICT readiness for business continuity (A.5.30) maps directly to NIS2 ICT continuity requirements.", "equivalent"],
  ["A.8.13", "4.4", "Backup controls (A.8.13) satisfy the NIS2 backup management requirements under CIR 4.2.", "equivalent"],
  ["A.8.14", "4.3", "Redundancy of processing facilities (A.8.14) overlaps with NIS2 availability and resilience requirements."],

  // ── Supply chain (NIS2 5.x) ───────────────────────────────────────────────────
  ["A.5.19", "5.1", "Supplier relationship IS policy (A.5.19) is the supplier security policy NIS2 CIR 5.1-5.2 requires.", "equivalent"],
  ["A.5.20", "5.2", "IS requirements in supplier agreements (A.5.20) cover the contractual clauses NIS2 CIR 5.3 mandates.", "equivalent"],
  ["A.5.21", "5.2", "ICT supply chain IS management (A.5.21) overlaps with NIS2 supply-chain security contract requirements."],
  ["A.5.21", "5.3", "Same supplier risk assessment process satisfies both A.5.21 and the NIS2 CIR 5.4 monitoring obligation.", "equivalent"],
  ["A.5.22", "5.3", "Supplier service monitoring and review (A.5.22) covers the ongoing monitoring NIS2 CIR 5.4 requires."],
  ["A.5.22", "5.4", "Regular supplier reviews (A.5.22) generate the monitoring evidence NIS2 Art. 21(2)(d)/Art. 23 expects."],
  ["A.5.23", "5.2", "Cloud services IS requirements (A.5.23) extend supplier agreement controls to cloud providers as NIS2 requires."],

  // ── Procurement / vulnerability management (NIS2 6.x) ────────────────────────
  ["A.5.7",  "6.2", "Threat intelligence (A.5.7) provides the vulnerability intelligence NIS2 CIR 6.2-6.3 expects."],
  ["A.5.5",  "6.2", "Contacts with authorities (A.5.5) overlap with the NIS2 vulnerability disclosure and coordination channel."],
  ["A.8.8",  "6.3", "Technical vulnerability management (A.8.8) is the vulnerability scanning programme NIS2 CIR 6.5/6.10 requires.", "equivalent"],
  ["A.8.8",  "6.4", "Timely remediation under A.8.8 maps to the patch management cadence NIS2 CIR 6.6 mandates.", "equivalent"],
  ["A.8.25", "6.5", "Secure development lifecycle (A.8.25) overlaps with security-in-procurement requirements NIS2 CIR 6.4 expects."],
  ["A.8.29", "6.5", "Security testing in development (A.8.29) overlaps with the NIS2 secure-procurement acceptance criteria."],

  // ── Effectiveness (NIS2 7.x) ──────────────────────────────────────────────────
  ["IS-9.1", "7.1", "Monitoring, measurement and analysis (Cl. 9.1) produces the KPI evidence NIS2 CIR 7.1 requires.", "equivalent"],
  ["IS-9.2", "7.2", "Internal audit programme (Cl. 9.2) is the audit NIS2 CIR 7.2 requires; same audit records.", "equivalent"],
  ["IS-9.3", "7.3", "Management review sign-off (Cl. 9.3) satisfies the CEO-signed effectiveness attestation NIS2 CIR 7.3 requires.", "equivalent"],
  ["A.5.35", "7.2", "Independent review of information security (A.5.35) overlaps with the NIS2 effectiveness audit.", "equivalent"],
  ["A.5.36", "7.1", "Compliance with policies and standards (A.5.36) overlaps with the NIS2 policy-effectiveness measurement."],
  ["IS-10.1", "7.4", "Continual improvement records (Cl. 10.1) feed the ongoing security posture updates NIS2 CIR 7.4 expects."],

  // ── Training and awareness (NIS2 8.x) ────────────────────────────────────────
  ["A.6.3",  "8.1", "IS awareness, education and training (A.6.3) is the cyber hygiene training programme NIS2 CIR 8.1 requires.", "equivalent"],
  ["A.6.3",  "8.2", "Same training programme satisfies both A.6.3 employee awareness and NIS2 CIR 8.2 basic security training.", "equivalent"],
  ["IS-7.2", "8.2", "Competence records (Cl. 7.2) document the staff training NIS2 CIR 8.2 expects.", "equivalent"],
  ["IS-7.2", "8.3", "Same competence records cover management cybersecurity training under §38(3) BSIG / NIS2 Art. 20(2)."],
  ["A.6.3",  "8.3", "Management awareness training (A.6.3) overlaps with the NIS2 management-body training requirement."],

  // ── Cryptography (NIS2 9.x) ───────────────────────────────────────────────────
  ["A.8.24", "9.1", "Cryptography policy (A.8.24) is the cryptography policy NIS2 CIR 9.1 / BSI TR-02102 requires.", "equivalent"],
  ["A.8.5",  "9.2", "Secure authentication controls (A.8.5) implement the authentication technology NIS2 CIR 9.2-9.3 requires."],
  ["A.8.3",  "9.2", "Information access restriction (A.8.3) overlaps with NIS2 cryptographic access control requirements."],

  // ── Access control (NIS2 10.x) ───────────────────────────────────────────────
  ["A.5.15", "10.1", "Access control policy (A.5.15) is the access control policy NIS2 CIR 11.1 requires.", "equivalent"],
  ["A.5.16", "10.2", "Identity management (A.5.16) covers the identity and access management NIS2 CIR 11.2 mandates.", "equivalent"],
  ["A.5.17", "10.2", "Authentication information management (A.5.17) implements the privileged account controls NIS2 CIR 11.2/11.3 requires."],
  ["A.5.18", "10.3", "Access rights management (A.5.18) produces the change-controlled access evidence NIS2 CIR 11.2 expects.", "equivalent"],
  ["A.5.18", "10.4", "Periodic access rights review under A.5.18 maps to the quarterly access review NIS2 CIR 11.2 mandates.", "equivalent"],
  ["A.8.3",  "10.1", "Information access restriction (A.8.3) enforces the access control policy NIS2 CIR 11.1 requires."],

  // ── Authentication (NIS2 11.x) ───────────────────────────────────────────────
  ["A.8.5",  "11.1", "Secure authentication controls (A.8.5) implement the MFA/privileged-access requirement NIS2 CIR 11.7 mandates.", "equivalent"],
  ["A.8.2",  "11.1", "Privileged access rights controls (A.8.2) directly implement the privileged access management NIS2 CIR 11.7 requires.", "equivalent"],
  ["A.5.16", "11.2", "Identity management (A.5.16) underpins the network access control policy NIS2 CIR 12 expects."],
  ["A.8.20", "11.2", "Network security controls (A.8.20) implement the network segmentation NIS2 CIR 11.2/12 requires.", "equivalent"],
  ["A.8.22", "11.2", "Network segregation (A.8.22) directly satisfies the NIS2 network segmentation/zero-trust requirement.", "equivalent"],
];

export const allSatisfactionPairs: SatisfactionPair[] = [
  ...nis2GdprSatisfactionPairs,
  ...aiActNis2SatisfactionPairs,
  ...aiActGdprSatisfactionPairs,
  ...craNis2SatisfactionPairs,
  ...craAiActSatisfactionPairs,
  ...craGdprSatisfactionPairs,
  ...iso27001Nis2SatisfactionPairs,
];

# Changelog

## 0.7.0 - 2026-05-13

### Added
- 10 new cross-framework satisfaction pairs that fill the 4-way overlap landscape:
  - AI Act <-> GDPR: AI-RSK.1 <-> G-TOM.1, AI-DOC.1 <-> G-ROP.1, AI-INC.1 <-> G-BRC.1 (3 new, total 5)
  - CRA <-> NIS 2: CRA-INC.3 <-> 3.5, CRA-MFG.1 <-> 2.1, CRA-MFG.2 <-> 2.4 (3 new, total 9)
  - CRA <-> AI Act: CRA-INC.1 <-> AI-INC.1, CRA-DOC.1 <-> AI-DOC.2 (2 new, total 4)
  - CRA <-> GDPR: CRA-ESS.1 <-> G-TOM.1, CRA-VLN.1 <-> G-BRC.1 (2 new, the first GDPR <-> CRA pairs)
- New `craGdprSatisfactionPairs` const array.
- Integrity tests cover the new pair set (12 tests, all pass).

Direct propagation can now traverse single-step links across all four frameworks. Sign once on a NIS 2 risk methodology requirement and the matching GDPR Art. 32, AI Act Art. 9, and CRA Art. 13 obligations all complete in one go.

## 0.6.0 - 2026-05-13

### Added
- Generic seeder at `@nisd2/grc-data-model/seed`. `seedFramework(db, spec)` upserts a framework, its categories, and its requirements into a Postgres database; `linkSatisfactionPairs(db, pairs)` inserts cross-framework satisfaction pairs. Both are idempotent and scoped strictly to the rows they own.
- `FrameworkCode` type derived from the `frameworkEnum` pg enum values, so callers cannot pass an unknown code.
- `SeedDb` type alias for any Drizzle PgDatabase instance.

Consumer apps no longer need to hand-roll the framework-row plumbing. Example usage and full surface documented in `src/seed.ts`. The previous app-side `seed-aiact-cra.ts` script (~190 lines) now reads as ~70 lines of thin caller.

## 0.5.0 - 2026-05-13

### Added
- EU AI Act framework (Regulation (EU) 2024/1689): 10 categories, 24 requirements covering literacy (Art 4), prohibited practices (Art 5), inventory and classification (Art 6, 25, 26), risk management (Art 9), fundamental rights impact assessment (Art 27), human oversight (Art 14), transparency (Art 50), incident reporting (Art 73), technical documentation (Annex IV), GPAI obligations (Art 51-55).
- EU Cyber Resilience Act framework (Regulation (EU) 2024/2847): 10 categories, 20 requirements covering manufacturer obligations (Art 13), essential cybersecurity requirements (Annex I Part I), vulnerability handling (Annex I Part II), active-exploitation reporting (Art 14), conformity assessment (Art 24, 27), technical documentation (Annex VII), support period (Art 13(8)), SBOM, importer and distributor duties (Art 18, 19), open-source steward role (Art 24).
- Cross-framework satisfaction pairs: AI Act and NIS 2 (7 pairs), AI Act and GDPR (2 pairs), CRA and NIS 2 (6 pairs), CRA and AI Act (2 pairs).
- Two new framework enum values: `eu_ai_act`, `eu_cra`.
- Generic `SatisfactionPair` tuple now supports any two-framework pairing. Combined export `allSatisfactionPairs`.
- Integrity tests cover both new frameworks and all four new satisfaction-pair sets (11 tests total).

## 0.4.0 — 2026-05-09

### Added
- `assetSupplierOffering` table — bilateral asset×supplier-relationship row with service-type branch fields (saas / on_prem / pro_services / managed) for hosting region, SBOM provenance, NDA, privileged-access management, etc.
- `assetServiceTypeEnum` (saas / on_prem / pro_services / managed).

Both were previously in the consumer app despite FK-ing into `asset` and `supplier` (which already lived in this package). Relocated to keep bilateral GRC data with its peers; consumers see no behavior change.

## 0.3.0 — 2026-05-05

### Removed
- Supplier-portal-specific columns from `incident` (`customer_relationship_id`, `broadcast_status`, `broadcast_sent_at`, `broadcast_count`) and `asset` (`customer_relationship_id`, `service_type`, `service_description`, `data_processing_locations`, `saas_hosting_region`, `on_prem_*`, `pro_services_*`, `managed_*`). These were consumer-app-specific and didn't belong on a generic GRC schema.
- `assetServiceTypeEnum` and `supplierPublicationBroadcastStatusEnum` (consumed only by the removed columns).
- Cross-table FK constraints from incident/asset to supplier (no longer needed).

Consumers who used these fields should add their own join tables in their app.

## 0.2.0 — 2026-05-05

### Added
- Drizzle table definitions for the GRC core: `complianceFramework`, `requirementCategory`, `requirement`, `requirementPrerequisite`, `requirementSatisfaction`, `supplier`, `asset`, `risk`, `riskAsset`, `riskSupplier`, `incident`.
- Framework metadata for NIS2 (12 categories, 49 requirements) and GDPR (5 categories, 7 requirements).
- 11 NIS2↔GDPR satisfaction pairs with rationale.
- Article-level NIS2↔GDPR mapping (`/mappings/nis2-gdpr`).
- Integrity tests covering pair-code references, duplicate codes, slug uniqueness.

### Removed
- Zod-only scaffolds (`/ropa`, `/dpa`, `/toms`, `/supplier`, `/asset`, `/risk`, `/incident`) that described tables that didn't exist anywhere. Drizzle definitions now serve as the source of truth; Zod schemas can be derived via drizzle-zod when needed.
- 21 app-specific enums (Stripe billing, sales CRM, AI feature flags, app's notification system, app-only operational tables) that didn't belong in a shared GRC schema.

### Changed
- Cross-boundary FK constraints on package tables (e.g. `supplier.company_id`) are no longer declared in the package; the consuming app adds them via its own migration.

## 0.1.0 — 2026-04-30

Initial scaffold.

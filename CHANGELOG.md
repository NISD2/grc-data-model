# Changelog

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

# Changelog

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

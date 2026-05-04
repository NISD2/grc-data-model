# @nisd2/grc-data-model

**Relational data model for EU GRC.** Zod schemas as source of truth, JSON Schema export for non-TS consumers, with cross-framework mappings (NIS2 ↔ GDPR today, more later).

> Part of the [NISD2 open-source ecosystem](https://github.com/NISD2/eu-compliance-resources). For flat input forms, see [`@nisd2/nis2-gap-assessment-schema`](https://github.com/NISD2/nis2-gap-assessment-schema) (self-assessment) and [`@nisd2/nis2-supply-chain-questionnaire-schema`](https://github.com/NISD2/nis2-supply-chain-questionnaire-schema) (supplier security).

---

## Why this repo exists

GRC data is **relational**. A field on a Records of Processing Activity references a supplier. The DPA-checklist references a sub-processor list. A breach incident references the affected assets. A cross-framework mapping references everything.

Splitting these schemas across many repos breaks build-time validation and makes versioning a coordination problem. So they live together. Tree-shaking via subpath exports means consumers only ship what they import.

## Install

```bash
bun add @nisd2/grc-data-model
# or: npm / pnpm / yarn
```

## Usage

Import per subpath for tree-shaking:

```ts
import { ropaEntrySchema, type RopaEntry } from "@nisd2/grc-data-model/ropa";
import { art28ChecklistSchema, isArt28Complete } from "@nisd2/grc-data-model/dpa";
import { tomsEntrySchema } from "@nisd2/grc-data-model/toms";
import { nis2GdprMapping, findByNis2Article } from "@nisd2/grc-data-model/mappings/nis2-gdpr";

// Validate an inbound RoPA payload:
const ropa = ropaEntrySchema.parse(input);

// Look up GDPR articles related to a NIS2 measure-area:
const overlap = findByNis2Article("Art. 21(2)(d)");
```

Or import everything at once (less optimal for tree-shaking):

```ts
import * as Grc from "@nisd2/grc-data-model";
```

## Subpaths

| Subpath | What it exports |
|---|---|
| `/ropa` | RoPA entries, lawful basis, recipient types, transfer mechanisms |
| `/dpa` | Art. 28(3) 8-clause checklist, sub-processor schema |
| `/toms` | TOMs catalog with regime tags + Art. 32(1)(b) properties |
| `/supplier` | Supplier-core schema with relationship typing |
| `/asset` | Asset-core schema with personal-data flag |
| `/risk` | Risk schema with privacy-impact flag |
| `/incident` | Incident schema with dual-regime breach flags |
| `/mappings/nis2-gdpr` | Field-level NIS2 ↔ GDPR mapping data |

## Status

**v0.1.0 — early scaffold.** RoPA, DPA, TOMs, and the NIS2↔GDPR mapping are real schemas. Supplier / asset / risk / incident are placeholder cores; full schemas will be migrated from the NISD2 platform's Drizzle definitions in a follow-up.

The NISD2 hosted platform ([nisd2.eu](https://www.nisd2.eu)) will eventually consume this package as its source of truth — at which point these schemas become load-bearing rather than reference docs.

## Not legal advice

Schemas reflect our reading of the NIS2 Directive (EU 2022/2555), GDPR (Regulation EU 2016/679), CIR 2024/2690, and ENISA Technical Implementation Guidance. Consult qualified counsel for legal interpretation.

## Contributing

PRs and issues welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) (coming soon).

## Licence

Code: [MIT](./LICENSE). Content (descriptions, mapping data): [CC BY 4.0](./LICENSE-CONTENT). Cross-framework mapping rows that derive from third-party CC BY 4.0 sources (e.g. Paolo Carner's NIS2 SMB Toolkit) are credited inline in the mapping file.

Substantive issues or partnership questions: [contact@nisd2.eu](mailto:contact@nisd2.eu).

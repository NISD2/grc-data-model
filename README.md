# @nisd2/grc-data-model

Drizzle ORM schemas for NIS2 + GDPR compliance, plus framework metadata and the cross-framework satisfaction pairs that link them.

Used in production by [nisd2.eu](https://www.nisd2.eu).

## Install

```bash
bun add @nisd2/grc-data-model
```

## Use

```ts
import { supplier, asset, risk, incident } from "@nisd2/grc-data-model/schema";
import { nis2Categories, getNis2RequirementsForCategory } from "@nisd2/grc-data-model/frameworks";
import { nis2GdprSatisfactionPairs } from "@nisd2/grc-data-model/satisfaction-pairs";
```

Drizzle config:

```ts
schema: [
  "./node_modules/@nisd2/grc-data-model/src/enums.ts",
  "./node_modules/@nisd2/grc-data-model/src/schema/*.ts",
],
```

## Subpaths

| Subpath | Contents |
|---|---|
| `/schema` | Drizzle tables: framework, requirement, requirement-satisfaction, supplier, asset, risk, incident |
| `/enums` | All PG enums (incident severity, evidence type, transfer mechanism, etc.) |
| `/frameworks` | Categories + requirements for NIS2 (12 / 49) and GDPR (5 / 7) |
| `/satisfaction-pairs` | 11 NIS2↔GDPR pairs |
| `/mappings/nis2-gdpr` | Article-level concept mapping |

## Boundary

In: GRC core (suppliers, assets, risks, incidents, framework metadata, attestations).
Out: tenant root (`company`, `user`), audit log, notifications, portals — those belong with the consumer.

Cross-boundary FK constraints (e.g. `supplier.company_id → company.id`) are not declared in this package; the consumer's own migration adds them.

## Licence

MIT.

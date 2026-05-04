/**
 * Assets — IT/OT asset inventory
 *
 * Cross-domain table used by:
 *   02 Risk management  — asset-linked risks
 *   04 Business continuity — RTO/RPO targets, backup config
 *   09 Cryptography — encryption flags
 *   10 Access control — asset ownership
 *   11 Authentication — MFA deployment tracking
 *
 * References: companies
 */
import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  integer,
  timestamp,
  date,
  index,
} from "drizzle-orm/pg-core";
import { assetServiceTypeEnum } from "../enums";
import { supplier } from "./supplier";

export const asset = pgTable(
  "asset",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    companyId: uuid("company_id").notNull(),

    /**
     * Optional link to a supplier↔customer relationship row. When set, this
     * asset is OWNED by `companyId` (the supplier) but is DECLARED as
     * "managed for customer X" — the customer can read it via the
     * relationship's token-gated endpoint. When null, this is a regular
     * entity-side asset (no supplier-portal exposure).
     *
     * Replaces the previous parallel `supplier_managed_asset` table.
     */
    customerRelationshipId: uuid("customer_relationship_id").references(
      () => supplier.id,
      { onDelete: "cascade" },
    ),

    // Identity
    name: varchar("name", { length: 255 }).notNull(),
    type: varchar("type", { length: 100 }).notNull(),
    description: text("description"),

    /**
     * Service-type classification (supplier portal). Drives which "branch"
     * fields below are meaningful. Null for entity-side IT-inventory rows
     * — only assets exposed via the supplier portal need to declare a
     * service type. One supplier with multiple offerings = multiple asset
     * rows, each with its own service type.
     */
    serviceType: assetServiceTypeEnum("service_type"),

    /**
     * ENISA TIG §5.2(b) — clear and complete description of the ICT
     * product/service. Supplier-portal field. Distinct from `description`
     * which is the entity-side asset description.
     */
    serviceDescription: text("service_description"),

    /**
     * ENISA TIG §5.1.4 TIPS — countries/regions where the ICT product is
     * produced and customer data is processed. Supplier-portal field.
     */
    dataProcessingLocations: text("data_processing_locations"),

    // Grouping (BSI-200-2 §8.1 — identical assets grouped, e.g. "45 laptops")
    quantity: integer("quantity").default(1).notNull(),

    // Classification
    isOT: boolean("is_ot").default(false),
    isCritical: boolean("is_critical").default(false),
    owner: varchar("owner", { length: 255 }),
    location: varchar("location", { length: 255 }),

    // Technical
    ipAddress: varchar("ip_address", { length: 45 }),
    hostname: varchar("hostname", { length: 255 }),
    operatingSystem: varchar("operating_system", { length: 255 }),
    softwareVersion: varchar("software_version", { length: 255 }),

    // Access control (CIR 11.2 — per-asset access management, CIR 11.3 — privileged accounts)
    accessManagement: varchar("access_management", { length: 255 }), // e.g. "Entra ID RBAC", "SSH + Teleport", "CyberArk"
    privilegedAccountCount: integer("privileged_account_count").default(0),

    // Security posture
    hasMfa: boolean("has_mfa").default(false),
    encryptionAtRest: varchar("encryption_at_rest", { length: 100 }), // Algorithm from crypto policy (e.g., "AES-256-GCM")
    encryptionInTransit: varchar("encryption_in_transit", { length: 100 }), // TLS suite from crypto policy (e.g., "TLS_AES_256_GCM_SHA384")
    cryptoImplementation: varchar("crypto_implementation", { length: 255 }), // Tool/hardware (e.g., "BitLocker + TPM", "AWS KMS")
    hasBackup: boolean("has_backup").default(false),
    lastPatchDate: date("last_patch_date"),
    lastVulnScanDate: date("last_vuln_scan_date"),

    // Backup / recovery
    backupFrequency: varchar("backup_frequency", { length: 50 }),
    backupLocation: varchar("backup_location", { length: 255 }),
    lastBackupTestDate: date("last_backup_test_date"),
    rto: integer("rto"),
    rpo: integer("rpo"),

    // GDPR — does this asset process personal data? Triggers RoPA prefill prompt.
    processesPersonalData: boolean("processes_personal_data").default(false),

    // Lifecycle (CIR 2024/2690 Recital — end-of-life date)
    endOfLife: date("end_of_life"),

    // ─────────────────────────────────────────────────────────────────────
    // Supplier-portal branch fields — only meaningful when serviceType is
    // set. Each branch is keyed off serviceType so the form only renders
    // the matching block. Re-uses the existing `hasMfa`, `encryptionAtRest`,
    // `encryptionInTransit`, and `rto` columns above for the SaaS branch
    // (those are general asset attributes, not SaaS-only).
    // ─────────────────────────────────────────────────────────────────────

    // SaaS branch (BSI IT-Grundschutz OPS.2.2 Cloud-Nutzung)
    /** Where customer data is hosted. eu | de_only | global */
    saasHostingRegion: varchar("saas_hosting_region", { length: 20 }),

    // On-prem branch (BSI IT-Grundschutz CON.8 Software-Entwicklung)
    onPremSbomProvided: boolean("on_prem_sbom_provided"),
    onPremSignedReleases: boolean("on_prem_signed_releases"),
    onPremVulnerabilityDisclosurePolicy: boolean("on_prem_vulnerability_disclosure_policy"),
    /** Patch SLA for critical vulnerabilities, in hours. */
    onPremPatchSlaCriticalHours: integer("on_prem_patch_sla_critical_hours"),

    // Professional services branch (BSI IT-Grundschutz ORP.2 Personal + ORP.3)
    /** criminal | employment | both */
    proServicesBackgroundCheckScope: varchar("pro_services_background_check_scope", { length: 20 }),
    proServicesNdaInPlace: boolean("pro_services_nda_in_place"),
    proServicesCustomerPremisesPolicy: boolean("pro_services_customer_premises_policy"),

    // Managed service branch (BSI IT-Grundschutz OPS.1.2.5 Fernwartung + ORP.4)
    managedPrivilegedAccessMgmt: boolean("managed_privileged_access_mgmt"),
    managedSessionRecording: boolean("managed_session_recording"),
    managedOnCall24x7: boolean("managed_on_call_24x7"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("idx_asset_company").on(table.companyId),
    index("idx_asset_type").on(table.type),
    index("idx_asset_critical").on(table.isCritical),
    index("idx_asset_customer_relationship").on(table.customerRelationshipId),
    index("idx_asset_service_type").on(table.serviceType),
  ]
);

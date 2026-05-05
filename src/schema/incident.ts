import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  integer,
  timestamp,
  decimal,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import {
  incidentSeverityEnum,
  situationColorEnum,
  supplierPublicationBroadcastStatusEnum,
} from "../enums";
import { supplier } from "./supplier";

export const incident = pgTable(
  "incident",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    /** Owning company. For supplier broadcasts this is the supplier; for entity-side incidents this is the entity. */
    companyId: uuid("company_id").notNull(),

    /**
     * Optional link to a supplier↔customer relationship row. When set, this
     * incident is a SUPPLIER BROADCAST published TO that specific customer
     * — readable via the relationship's token-gated endpoint and tracked
     * in the broadcast queue (broadcastStatus, broadcastSentAt). When null,
     * this is a regular entity-side incident.
     *
     * Replaces the previous parallel `supplier_publication_event` table.
     */
    customerRelationshipId: uuid("customer_relationship_id").references(
      () => supplier.id,
      { onDelete: "cascade" },
    ),

    // Classification
    severity: incidentSeverityEnum("severity").notNull(),
    situationColor: situationColorEnum("situation_color").default("yellow"),
    title: varchar("title", { length: 500 }).notNull(),
    description: text("description").notNull(),

    // Timeline
    occurredAt: timestamp("occurred_at"),
    discoveredAt: timestamp("discovered_at").notNull(),
    resolvedAt: timestamp("resolved_at"),

    // CIA impact
    confidentialityImpacted: boolean("confidentiality_impacted").default(false),
    integrityImpacted: boolean("integrity_impacted").default(false),
    availabilityImpacted: boolean("availability_impacted").default(false),

    // Classification details
    isMalicious: boolean("is_malicious"),
    hasCrossBorderImpact: boolean("has_cross_border_impact").default(false),
    affectedCountries: text("affected_countries")
      .array()
      .default(sql`'{}'::text[]`),
    isTargeted: varchar("is_targeted", { length: 20 }),

    // Impact assessment
    affectedUsersCount: integer("affected_users_count"),
    affectedSystemsCount: integer("affected_systems_count"),
    estimatedFinancialDamage: decimal("estimated_financial_damage", {
      precision: 15,
      scale: 2,
    }),
    hasReputationalHarm: boolean("has_reputational_harm").default(false),
    serviceDeliveryImpact: text("service_delivery_impact"),

    // GDPR — Art. 4(12) personal-data-breach side. Same incident row may
    // trigger BSI 24/72/30 cyber notification AND LfDI 72h GDPR notification.
    requiresGdprNotification: boolean("requires_gdpr_notification").default(false),
    /** Number of data subjects (not "users") affected — Art. 33(3)(a). */
    dataSubjectsAffected: integer("data_subjects_affected"),
    /** When the relevant DPA was notified per Art. 33(1). */
    gdprNotifiedAt: timestamp("gdpr_notified_at"),
    /** When affected data subjects were informed per Art. 34 — required when breach poses high risk. */
    notifiedDataSubjectsAt: timestamp("notified_data_subjects_at"),

    // Root cause + remediation
    threatType: varchar("threat_type", { length: 255 }),
    rootCause: text("root_cause"),
    countermeasures: text("countermeasures"),
    preventiveMeasures: text("preventive_measures"),

    // Internal
    internalRef: varchar("internal_ref", { length: 100 }),
    createdBy: uuid("created_by"),

    // Supplier-broadcast queue (only meaningful when customerRelationshipId is set)

    /** Broadcast queue state — null for entity-side incidents. */
    broadcastStatus: supplierPublicationBroadcastStatusEnum("broadcast_status"),
    broadcastSentAt: timestamp("broadcast_sent_at"),
    broadcastCount: integer("broadcast_count").default(0),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("idx_incident_company").on(table.companyId),
    index("idx_incident_severity").on(table.severity),
    index("idx_incident_discovered").on(table.discoveredAt),
    index("idx_incident_customer_relationship").on(table.customerRelationshipId),
    index("idx_incident_broadcast_status").on(table.broadcastStatus),
  ]
);

import { pgEnum } from "drizzle-orm/pg-core";

export const planEnum = pgEnum("plan", ["free", "guided", "enterprise"]);

export const entityTypeEnum = pgEnum("entity_type", [
  "essential", // besonders wichtige Einrichtung
  "important", // wichtige Einrichtung
  "kritis", // Betreiber kritischer Anlagen (also essential, with extra requirements)
]);

export const evidenceTypeEnum = pgEnum("evidence_type", [
  "document", // Must produce a written document/policy
  "proof", // Must demonstrate implementation with evidence
  "sign-off", // Management approval/signature required
  "technical", // Technical control must be implemented
  "training", // Training completion records
]);

export const frequencyEnum = pgEnum("frequency", [
  "one-time",
  "monthly",
  "quarterly",
  "semi-annual",
  "annual",
  "every-3-years",
  "on-change", // When changes occur
  "ongoing", // Continuous
]);

export const priorityEnum = pgEnum("priority", [
  "P0", // Immediate - must have from day 1
  "P1", // Within 3 months
  "P2", // Within 6 months
  "P3", // Within 12 months
]);

export const itemStatusEnum = pgEnum("item_status", [
  "not_started",
  "in_progress",
  "completed",
  "not_applicable",
  "needs_review", // Completed but due for periodic review
  "approved", // Reviewer confirmed compliance
  "rejected", // Reviewer requires changes
]);


export const incidentSeverityEnum = pgEnum("incident_severity", [
  "near_miss", // Beinahevorfall - could have caused impact but didn't
  "incident", // Sicherheitsvorfall - caused impact but not significant
  "significant", // Erheblicher Sicherheitsvorfall - mandatory BSI reporting
]);

export const incidentReportTypeEnum = pgEnum("incident_report_type", [
  "early_warning", // 24h Frühe Erstmeldung
  "notification", // 72h Meldung
  "intermediate", // Zwischenmeldung (on BSI request)
  "final", // Abschlussbericht (1 month)
  "progress", // Fortschrittsbericht (if incident still ongoing at 1 month)
]);

export const situationColorEnum = pgEnum("situation_color", [
  "red", // Service outage (Dienstausfall)
  "orange", // Service impairment (Dienstbeeinträchtigung)
  "yellow", // Heightened anomalies (Erhöhte Auffälligkeiten)
  "gray", // No current incidents
]);


export const supplierAuditFrequencyEnum = pgEnum("supplier_audit_frequency", [
  "annual",
  "biennial",
  "on_change",
]);

export const supplierRiskLevelEnum = pgEnum("supplier_risk_level", [
  "critical", // Could take down core business operations
  "high", // Significant impact if compromised
  "medium", // Moderate impact
  "low", // Minimal impact
]);


export const evidenceStatusEnum = pgEnum("evidence_status", [
  "draft", // Uploaded but not yet submitted for review
  "in_review", // Submitted, awaiting reviewer approval
  "approved", // Accepted as valid evidence
  "rejected", // Reviewer rejected — needs re-upload or correction
  "expired", // Was approved but validity period has lapsed
]);


export const requirementImportanceEnum = pgEnum("requirement_importance", [
  "mandatory", // MUSS — legally required, no exceptions (BSI: Basis-Anforderung)
  "recommended", // SOLLTE — normally required, exceptions need documented justification (BSI: Standard)
  "enhanced", // KANN — additional for high-protection needs (BSI: Erhöhter Schutzbedarf)
]);


export const effortLevelEnum = pgEnum("effort_level", [
  "trivial", // < 1 day, single person, no external help
  "light", // 1-5 days, 1-2 people
  "moderate", // 1-4 weeks, may need internal coordination
  "significant", // 1-3 months, cross-team, may need consultant
  "major", // 3+ months, organizational change, likely needs external help
]);


export const frameworkEnum = pgEnum("framework", [
  "nis2", // NIS2 / BSIG 2025
  "gdpr", // GDPR / DSGVO (future)
  "arbeitsschutz", // Occupational Safety (future)
  "brandschutz", // Fire Protection (future)
  "iso27001", // ISO 27001:2022 (future)
  "bsi_grundschutz", // BSI IT-Grundschutz (future)
]);

export const supplierRelationshipTypeEnum = pgEnum("supplier_relationship_type", [
  "processor",            // GDPR Art. 28 — DPA + 8 clauses required
  "joint_controller",     // GDPR Art. 26 — arrangement required
  "separate_controller",  // disclosure only
  "internal",             // intra-group / no contract needed
]);

export const transferMechanismEnum = pgEnum("transfer_mechanism", [
  "adequacy",   // GDPR Art. 45
  "sccs",       // GDPR Art. 46 standard contractual clauses
  "bcr",        // GDPR Art. 47 binding corporate rules
  "derogation", // GDPR Art. 49
  "none",       // no transfer outside EEA
]);


export const changeTypeEnum = pgEnum("change_type", [
  "standard", // Pre-approved, routine (no individual approval)
  "normal", // Planned, needs CAB/security approval
  "emergency", // Urgent, retrospective approval required
]);

export const changeStatusEnum = pgEnum("change_status", [
  "draft",
  "submitted",
  "approved",
  "implementing",
  "implemented",
  "rolled_back",
  "closed",
]);

export const patchStatusEnum = pgEnum("patch_status", [
  "pending", // Known, not yet applied
  "applied", // Successfully deployed
  "exception", // Approved deferral with expiry date
  "not_applicable", // Does not affect this asset
]);

export const auditStatusEnum = pgEnum("audit_status", [
  "planned",
  "in_progress",
  "completed",
  "cancelled",
]);

export const findingSeverityEnum = pgEnum("finding_severity", [
  "critical", // System-wide risk, immediate action
  "major", // Significant risk, corrective action required
  "minor", // Limited risk, improvement opportunity
  "observation", // No risk, best-practice suggestion
]);

export const findingStatusEnum = pgEnum("finding_status", [
  "open",
  "in_progress",
  "resolved",
  "verified",
  "deferred",
]);

export const improvementSourceEnum = pgEnum("improvement_source", [
  "audit",
  "incident",
  "pentest",
  "management_review",
  "kpi_breach",
  "gap_analysis",
  "regulatory_change",
  "suggestion",
]);

export const treatmentStatusEnum = pgEnum("treatment_status", [
  "not_started",
  "in_progress",
  "completed",
  "verified",
]);

export const exerciseTypeEnum = pgEnum("exercise_type", [
  "tabletop", // Discussion-based scenario walkthrough
  "technical", // Hands-on technical simulation
  "red_team", // Adversarial testing
  "full_scale", // Full business continuity test
]);

export const kpiStatusEnum = pgEnum("kpi_status", [
  "green", // On target
  "amber", // At risk
  "red", // Below target
]);


export const notificationChannelEnum = pgEnum("notification_channel", [
  "email",
  "in_app",
  "webhook",
]);

export const notificationStatusEnum = pgEnum("notification_status", [
  "pending", // Queued for delivery
  "sent", // Delivered to channel
  "acknowledged", // User confirmed receipt
  "escalated", // Deadline passed without acknowledgment
  "cancelled", // No longer relevant (e.g., item completed before reminder)
]);

export const urgencyEnum = pgEnum("urgency", [
  "info", // Routine, >30d out
  "warning", // Important, 7-30d out
  "urgent", // <7d or P0
  "critical", // Overdue + mandatory
]);

export const vulnerabilityStatusEnum = pgEnum("vulnerability_status", [
  "discovered", // Found via scan/pentest/report
  "assessed", // Triaged and severity confirmed
  "treating", // Remediation in progress (patch, config change, etc.)
  "resolved", // Fixed and verified
  "accepted", // Risk accepted with documented justification
  "mitigated", // Compensating control in place
]);


export const aiDataSharingEnum = pgEnum("ai_data_sharing", [
  "none", // Only field names, types, requirement title
  "basic", // + sector, sub-sector, entity type, legal form
  "full", // + company name, employee count, annual revenue
]);


export const assetServiceTypeEnum = pgEnum("asset_service_type", [
  "saas",          // Cloud-hosted multi-tenant service
  "on_prem",       // Software the customer installs and runs themselves
  "pro_services",  // Consulting / professional services engagement
  "managed",       // Managed service (supplier operates customer infrastructure)
]);


export const supplierRelationshipStatusEnum = pgEnum("supplier_relationship_status", [
  "active", // Supplier invited the customer; access link is live
  "revoked", // Customer or supplier revoked access (replaces 'unsubscribed')
  "bounced", // Email delivery permanently failed
]);

export const supplierPublicationEventTypeEnum = pgEnum(
  "supplier_publication_event_type",
  [
    "questionnaire_updated",
    "certification_added",
    "certification_expiring",
    "incident_published",
    "subprocessor_changed",
    "service_catalog_changed",
  ],
);

export const supplierPublicationBroadcastStatusEnum = pgEnum(
  "supplier_publication_broadcast_status",
  [
    "queued", // Awaiting fan-out
    "sending", // Currently being dispatched
    "sent", // All recipients dispatched
    "failed", // Mass dispatch failure (retried by cron)
  ],
);


export const leadIntentEnum = pgEnum("lead_intent", [
  "entity", // Wants to use the NIS2 compliance side
  "supplier", // Wants to publish a profile
  "both", // Systemhaus — both sides
  "unknown", // Not yet declared
]);

export const SEED_DOCUMENTS = [
  {
    id: "doc-1",
    name: "Security Policy v2.3",
    content: `MEDIVAULT SECURITY POLICY — VERSION 2.3
Last Updated: January 2025

1. DATA ENCRYPTION
All data at rest is encrypted using AES-256. Data in transit is protected via TLS 1.3 minimum.
Encryption keys are managed through AWS KMS with automatic rotation every 90 days.

2. ACCESS CONTROL
MediVault enforces Role-Based Access Control (RBAC) across all systems.
MFA is mandatory for all employees and recommended for customers.
Zero-trust network architecture is implemented.

3. INCIDENT RESPONSE
MediVault maintains a 24/7 SOC.
Critical incidents responded to within 1 hour, high severity within 4 hours.
Customers notified of breaches within 72 hours per HIPAA and GDPR.

4. PENETRATION TESTING
Annual third-party penetration tests by CREST-certified firms.
Internal vulnerability scanning occurs weekly. Critical CVEs patched within 24 hours.

5. CERTIFICATIONS
MediVault holds SOC 2 Type II, HIPAA, and ISO 27001 certifications.
HITRUST CSF certification in progress, expected Q3 2025.`,
  },
  {
    id: "doc-2",
    name: "Privacy & Data Policy",
    content: `MEDIVAULT PRIVACY AND DATA HANDLING POLICY

COMPANY OVERVIEW
MediVault is a HIPAA-compliant health data management SaaS serving 500+ healthcare organizations.

DATA RESIDENCY
Customer data is stored in the customer's selected AWS region (US-East, EU-West, or AP-Southeast).
Data never leaves the selected region without explicit customer consent.

DATA RETENTION
Patient records: retained for contract duration + 7 years per HIPAA.
Audit logs: retained for 6 years. Deleted data purged within 30 days.

SUBPROCESSORS
AWS (infrastructure), Datadog (monitoring), SendGrid (email), Stripe (billing).
Customers notified of new subprocessors 30 days in advance.

DATA OWNERSHIP
Customers retain full ownership of all data. MediVault does not sell or use customer data for AI training.
Upon termination, data export within 5 business days; deletion within 30 days.`,
  },
  {
    id: "doc-3",
    name: "SLA & Uptime Commitment",
    content: `MEDIVAULT SERVICE LEVEL AGREEMENT

UPTIME COMMITMENT
99.9% uptime for paid tiers (Enterprise: 99.99%). Scheduled maintenance: max 4 hours/month, 2-6 AM EST Sunday.

SUPPORT TIERS
Standard: Email, 24-hour SLA, business hours.
Professional: Email + chat, 4-hour SLA, 16/5.
Enterprise: Dedicated CSM, 1-hour SLA, 24/7 phone + Slack.

SERVICE CREDITS
Below 99.9%: 10% credit. Below 99.0%: 25% credit. Below 95.0%: 50% credit.

DISASTER RECOVERY
RPO: 1 hour. RTO: 4 hours. Multi-region failover for Enterprise. Daily backup tests.`,
  },
  {
    id: "doc-4",
    name: "Compliance Overview",
    content: `MEDIVAULT COMPLIANCE AND REGULATORY OVERVIEW

HIPAA COMPLIANCE
Fully HIPAA-compliant Business Associate. BAAs available and required for all healthcare customers.
Annual risk assessments. Employee HIPAA training within 30 days of hire and annually.

GDPR COMPLIANCE
Full GDPR compliance for EU data subjects. DSARs fulfilled within 30 days.
DPAs available. EU-based Data Protection Officer appointed.

SOC 2 TYPE II
Most recent audit: November 2024. Covers Security, Availability, Confidentiality, Processing Integrity.

VULNERABILITY MANAGEMENT
Critical CVEs: 24h. High: 7 days. Medium: 30 days.
Bug bounty at hackerone.com/medivault, rewards up to $10,000.

THIRD-PARTY AUDITS
Annual audits by independent firms. Most recent: Ernst & Young, October 2024.`,
  },
  {
    id: "doc-5",
    name: "Product Features",
    content: `MEDIVAULT PRODUCT FEATURES

CORE PLATFORM
HL7 FHIR R4 compliant API. DICOM support. Real-time sync. Audit trail for all access.

INTEGRATIONS
SSO/SAML 2.0 with Okta, Azure AD, Ping. 50+ EHR integrations (Epic, Cerner, athenahealth).
REST and FHIR APIs. SDKs for Python, JavaScript, Java, .NET.

AI/ML FEATURES
FDA-cleared clinical decision support algorithms. Anomaly detection for lab values.
Automated ICD-10 coding assistance. NLP clinical notes summarization (beta).

PRICING
Starter: $299/month up to 5 providers. Professional: $999/month up to 50 providers. Enterprise: custom.`,
  },
];

export const SEED_QUESTIONNAIRE = `VENDOR SECURITY ASSESSMENT QUESTIONNAIRE
Submitted by: Northshore Regional Hospital — February 2025

1. What data encryption standards does your platform use for data at rest and in transit?
2. Is your platform HIPAA compliant? Do you provide Business Associate Agreements (BAAs)?
3. What certifications does your organization hold (e.g., SOC 2, ISO 27001)?
4. How do you handle data residency requirements? Can customer data be stored in specific regions?
5. What is your uptime SLA and what service credits are provided for downtime?
6. How quickly do you respond to security incidents, and how are customers notified of breaches?
7. What is your policy on penetration testing and vulnerability management?
8. Do you support Single Sign-On (SSO) and Multi-Factor Authentication (MFA)?
9. What is your data retention and deletion policy?
10. What third-party subprocessors do you use, and how are customers notified of changes?
11. What is your disaster recovery plan, including RPO and RTO?
12. Does your platform support GDPR compliance for EU data subjects?
13. What customer support tiers and response times do you offer?
14. Do you have a bug bounty or responsible disclosure program?
15. What AI or machine learning features does your platform offer, and are they FDA-cleared?`;

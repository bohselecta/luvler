# Compliance Checklist (HIPAA posture - MVP)

This maps app features to privacy and security controls. MVP is not a BA-covered PHI system; clinical sharing is consented and minimal.

## Data Domains
- User Personal: `users/{userId}/personal.json` (Blob)
- Clinical: `users/{userId}/clinical.json` (Blob)
- Anonymized Metrics: `metrics/aggregated.json`

## Controls
- Audit logs: `audit/{userId}/YYYY-MM.json`; surfaced in Privacy page
- Consent: explicit toggles; `lib/privacy.ts` and `components/shared/ConsentFlow` (planned)
- Revocation: immediate; sharing keys removed; logs updated
- Access: Clerk-authenticated UI; dev leniency only on public pages
- Storage: Vercel Blob JSON; access public for MVP demos; no PHI at rest
- SSR Guards: avoid Blob calls server-side for user data

## User Rights
- See who accessed data (last 5)
- Download and delete request endpoints (planned)
- Opt-in to research metrics; default off

## Next Steps to BA-readiness
- Private object storage with signed URLs
- Encryption at rest + KMS
- Formal DPA/BAA with vendors
- Data retention policy and deletion automation
- Incident response runbook

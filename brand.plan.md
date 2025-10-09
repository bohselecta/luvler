# Luvler GTM Readiness Plan (Branding, Pricing, Auth, Netlify)

This file mirrors the plan and marks completion state.

## To-dos (Status)

- [x] Apply branding (logo, palette, typography) and polish UI
- [x] Rewrite home/self-advocacy/professional copy with clear value props
- [x] Create tiered pricing page with CTA & feature matrix
- [x] Add consent page and gating logic with persistence
- [x] Add Privacy and Terms pages
- [x] Integrate Netlify Identity (login, signup, guards)
- [x] Add Netlify Postgres schema and helpers
- [x] Wire Stripe Checkout + webhooks (test mode)
- [x] Implement per-tier usage limits and meters (stub; ready for DB/KV)
- [x] Add Netlify Functions for billing/consent/identity sync
- [x] Enable analytics/logging and basic error tracking
- [x] Run a11y/perf passes and fix issues
- [ ] Write setup notes for Netlify, Identity, Stripe, Postgres (see README)

## Next
- Convert usage stub to Postgres counters with monthly reset and show real meters.
- Verify Stripe webhook signature when STRIPE_WEBHOOK_SECRET is provided.
- Optional: add Sentry or similar via Netlify Extension for error monitoring.

# Clinical, Ethical, and Prompt Governance Guidelines

- Follow BACB ethics; no diagnosis, medical, or crisis guidance.
- Prioritize assent, autonomy, cultural responsiveness, and functional goals.
- Prohibit aversives, seclusion, and restraint recommendations.
- Outputs must be observable, measurable, time-bound, and practical.
- Scope: educational/planning support; clinical use requires supervision by a qualified professional.
- Prompt governance: version prompts, include guardrails/denylist, log usage, and cap token spend.

## Prompt Versioning
- ai-prompts.ts contains guardrails and denylist; update with changelog notes.
- Use "clinical-analysis" for Sonnet; default to Haiku for low-cost tasks.

## Consent & Privacy
- Require explicit consent; store acceptance with timestamp and IP.
- Minimize data retention; allow export and deletion.

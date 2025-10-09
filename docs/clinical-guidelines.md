# Clinical Guidelines and Pilot Plan (MVP)

This document summarizes the evidence-aligned practices informing Luvler’s Friendship, Goal, and Reward Game modules, and outlines a lightweight pilot evaluation.

## Principles
- Autonomy-first: user chooses goals, pace, and sharing
- Concrete, small steps; avoid abstract framing
- Interest-based social contexts support motivation and initiation
- Sensory-aware defaults and structured turns reduce cognitive load

## Practices referenced (high level)
- Interest-based peer engagement and affinity groups
- Graduated exposure/micro-goals for social tasks
- Cognitive offloading via checklists and visible “next step” only
- Self‑reinforcement (“reward games”) and shaping attempts
- Reflection and generalization prompts after practice

Note: Formal citations to be compiled during pilot; this MVP uses widely accepted strategies from autism practice literature and behavior skills training patterns.

## Pilot evaluation plan (beta)
- Participants: teens/young adults using Companion; clinicians using Professional tools
- Duration: 8–12 weeks
- Measures (self-report + app metrics):
  - Confidence with social steps (Likert)
  - Rate of step completion and session streaks
  - Comfort with rooms (audio-only vs mixed modes)
  - Qualitative notes from reflections
- Privacy: opt-in; anonymized metrics only; audit logs surfaced to user

## Safety & Moderation
- Autistic-only default for group rooms; mixed optional
- Structured turns; moderators visible; clear rules pinned
- Report button + moderation actions (hide/warn/ban) with audit trail

## Clinician integration
- Parent-friendly translations and consented sharing
- Micro-goal decomposition with contextual “why this matters”
- Export summaries for sessions; revoke access anytime

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

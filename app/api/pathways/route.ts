import { auth } from '@clerk/nextjs/server'
import { getLimitForTier, incrementUsage, readUsage } from '@/lib/metering'
import { resolveTierForUser } from '@/lib/tier'
import Anthropic from '@anthropic-ai/sdk'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export async function POST(request: Request) {
  const { title = 'Say hello', interests = ['drawing'] } = await request.json().catch(() => ({})) as { title?: string; interests?: string[] }

  // soft metering: if signed in, enforce monthly credits
  try {
    const a = await auth()
    if (a.userId) {
      const tier = await resolveTierForUser(a.userId)
      const limit = getLimitForTier(tier)
      const usage = await readUsage(a.userId)
      if (usage.used >= limit) {
        return new Response(JSON.stringify({ ok: false, error: 'limit_exceeded', limit, used: usage.used }), { status: 429, headers: { 'Content-Type': 'application/json' } })
      }
    }
  } catch {}

  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
      const prompt = `You are an ABA-informed assistant following BACB ethics: prioritize assent, autonomy, and dignity; avoid coercion or aversives. Generate a short 5-step social pathway for the goal "${title}" using interests ${JSON.stringify(interests)}. Output STRICT JSON: {"steps":[{"order":1,"instruction":"...","tip":"..."}, ...]}.`;
      const msg = await anthropic.messages.create({
        model: process.env.ANTHROPIC_MODEL_HAIKU || 'claude-3-haiku-20240307',
        max_tokens: 300,
        temperature: 0.4,
        messages: [{ role: 'user', content: prompt }]
      })
      const text = (msg.content[0] as any)?.text || '{}'
      const parsed = JSON.parse(text)
      if (parsed?.steps?.length) {
        try {
          const a = await auth(); if (a.userId) await incrementUsage(a.userId, 1)
        } catch {}
        return new Response(JSON.stringify({ ok: true, title, steps: parsed.steps }), { headers: { 'Content-Type': 'application/json' } })
      }
    } catch (_) {
      // fall through to demo
    }
  }

  const steps = [
    { order: 1, instruction: `Pick a place related to ${interests[0] || 'an interest'}`, tip: 'Small, predictable venues work best' },
    { order: 2, instruction: 'Go during a quiet time', tip: 'Lower sensory load = easier first reps' },
    { order: 3, instruction: `Bring a small prop about ${interests[0] || 'your interest'}`, tip: 'Props make openings easier' },
    { order: 4, instruction: 'Give a short hello + one line about your prop', tip: 'End on success, do not force' },
    { order: 5, instruction: 'Log how it felt and one improvement for next time' },
  ]
  try { const a = await auth(); if (a.userId) await incrementUsage(a.userId, 1) } catch {}
  return new Response(JSON.stringify({ ok: true, title, steps }), { headers: { 'Content-Type': 'application/json' } })
}

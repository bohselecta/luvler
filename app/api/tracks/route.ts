import { auth } from '@clerk/nextjs/server'
import { getLimitForTier, incrementUsage, readUsage } from '@/lib/metering'
import { resolveTierForUser } from '@/lib/tier'
import Anthropic from '@anthropic-ai/sdk'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export async function POST(request: Request) {
  const { slug = 'illustration' } = await request.json().catch(() => ({})) as { slug?: string }
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
      const prompt = `Design a concise 5-step learning outline for topic "${slug}". Use plain language and progressive scaffolding. Output JSON: {"outline":[{"id":"a","title":"..."}, ...]}`
      const msg = await anthropic.messages.create({ model: process.env.ANTHROPIC_MODEL_HAIKU || 'claude-3-haiku-20240307', max_tokens: 250, temperature: 0.3, messages: [{ role: 'user', content: prompt }] })
      const text = (msg.content[0] as any)?.text || '{}'
      const parsed = JSON.parse(text)
      if (parsed?.outline?.length) {
        try { const a = await auth(); if (a.userId) await incrementUsage(a.userId, 1) } catch {}
        return new Response(JSON.stringify({ ok: true, slug, outline: parsed.outline }), { headers: { 'Content-Type': 'application/json' } })
      }
    } catch (_) {}
  }
  const outline = [
    { id: 'a', title: 'Gather 5 references' },
    { id: 'b', title: 'Copy one for line confidence' },
    { id: 'c', title: 'Gesture practice: 10× 30s' },
    { id: 'd', title: '1 study with shading' },
    { id: 'e', title: 'Share with 1 friend for feedback' },
  ]
  try { const a = await auth(); if (a.userId) await incrementUsage(a.userId, 1) } catch {}
  return new Response(JSON.stringify({ ok: true, slug, outline }), { headers: { 'Content-Type': 'application/json' } })
}

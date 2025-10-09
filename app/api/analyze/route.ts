import Anthropic from '@anthropic-ai/sdk'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const { goal, context } = await request.json().catch(() => ({})) as { goal?: string; context?: string }
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(JSON.stringify({ ok: true, notes: 'Demo: provide API key to enable clinical analysis.' }), { headers: { 'Content-Type': 'application/json' } })
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const prompt = `You are a BCBA-aligned assistant. Provide a brief functional analysis and ethical considerations for goal: "${goal || 'unspecified'}". Ensure assent-first, no aversives, emphasize naturalistic teaching, measurable criteria, and caregiver collaboration. Output JSON: {"analysis":"...","risks":"...","measures":["..."],"references":["..."]}`

  const msg = await anthropic.messages.create({
    model: process.env.ANTHROPIC_MODEL_SONNET || 'claude-3-5-sonnet-20241022',
    max_tokens: 600,
    temperature: 0.3,
    messages: [{ role: 'user', content: prompt }]
  })
  const text = (msg.content[0] as any)?.text || '{}'
  try {
    const parsed = JSON.parse(text)
    return new Response(JSON.stringify({ ok: true, ...parsed }), { headers: { 'Content-Type': 'application/json' } })
  } catch {
    return new Response(JSON.stringify({ ok: true, analysis: text }), { headers: { 'Content-Type': 'application/json' } })
  }
}



import { auth } from '@clerk/nextjs/server'
import { setTierForUser } from '@/lib/tier'

export async function POST(request: Request) {
  const a = await auth()
  if (!a.userId) return new Response('Unauthorized', { status: 401 })
  // Simple admin gate: allow if user is in ALLOWLIST
  const allow = (process.env.ADMIN_ALLOWLIST || '').split(',').map(s => s.trim()).filter(Boolean)
  if (!allow.includes(a.userId)) return new Response('Forbidden', { status: 403 })

  const { userId, tier, status } = await request.json().catch(() => ({})) as { userId?: string; tier?: string; status?: 'trial' | 'active' | 'canceled' }
  if (!userId || !tier) return new Response('Missing params', { status: 400 })
  await setTierForUser(userId, tier, status || 'active')
  return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } })
}



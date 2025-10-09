import { auth } from '@clerk/nextjs/server'
import { setTierForOrg } from '@/lib/tier'

export async function POST(request: Request) {
  const a = await auth()
  if (!a.userId) return new Response('Unauthorized', { status: 401 })
  const allow = (process.env.ADMIN_ALLOWLIST || '').split(',').map(s => s.trim()).filter(Boolean)
  if (!allow.includes(a.userId)) return new Response('Forbidden', { status: 403 })

  const { orgId, tier, status } = await request.json().catch(() => ({})) as { orgId?: string; tier?: string; status?: 'trial' | 'active' | 'canceled' }
  if (!orgId || !tier) return new Response('Missing params', { status: 400 })
  await setTierForOrg(orgId, tier, status || 'active')
  return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } })
}



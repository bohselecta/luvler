import { getLimitForTier, readUsage } from '@/lib/metering'
import { auth } from '@clerk/nextjs/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const explicitTier = searchParams.get('tier') || undefined
  let tier = explicitTier || 'free'
  try {
    const a = await auth()
    if (a.userId) {
      // TODO: read real tier from DB; default to explicit or free
      const usage = await readUsage(a.userId)
      const limit = getLimitForTier(tier)
      return new Response(JSON.stringify({ ok: true, tier, limit, used: usage.used }), { headers: { 'Content-Type': 'application/json' } })
    }
  } catch {}
  const limit = getLimitForTier(tier)
  return new Response(JSON.stringify({ ok: true, tier, limit, used: 0 }), { headers: { 'Content-Type': 'application/json' } })
}

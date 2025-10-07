import { list, put } from '@vercel/blob'

export type BillingRecord = { tier: string; status: 'trial' | 'active' | 'canceled'; updatedAt: number; orgId?: string }

function userKey(userId: string) {
  return `billing/users/${userId}.json`
}

export async function resolveTierForUser(userId: string, orgId?: string): Promise<string> {
  const key = userKey(userId)
  const { blobs } = await list({ prefix: key })
  const existing = blobs.find(b => b.pathname === key)
  if (!existing) return 'free'
  try {
    const res = await fetch(existing.url)
    const json = await res.json()
    if (json?.status === 'active' && typeof json?.tier === 'string') return json.tier
  } catch {}
  return 'free'
}

export async function setTierForUser(userId: string, tier: string, status: BillingRecord['status'] = 'active', orgId?: string) {
  const record: BillingRecord = { tier, status, updatedAt: Date.now(), orgId }
  await put(userKey(userId), JSON.stringify(record), { access: 'public', contentType: 'application/json', addRandomSuffix: false })
}



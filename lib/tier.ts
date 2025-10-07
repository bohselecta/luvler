import { list, put } from '@vercel/blob'

export type BillingRecord = { tier: string; status: 'trial' | 'active' | 'canceled'; updatedAt: number; orgId?: string }

function userKey(userId: string) {
  return `billing/users/${userId}.json`
}

function orgKey(orgId: string) {
  return `billing/orgs/${orgId}.json`
}

export async function resolveTierForUser(userId: string, orgId?: string): Promise<string> {
  // Prefer organization tier if present & active
  if (orgId) {
    const oKey = orgKey(orgId)
    const oList = await list({ prefix: oKey })
    const oFile = oList.blobs.find(b => b.pathname === oKey)
    if (oFile) {
      try {
        const res = await fetch(oFile.url)
        const json = await res.json()
        if (json?.status === 'active' && typeof json?.tier === 'string') return json.tier
      } catch {}
    }
  }

  // Fallback to user billing record
  const uKey = userKey(userId)
  const uList = await list({ prefix: uKey })
  const uFile = uList.blobs.find(b => b.pathname === uKey)
  if (!uFile) return 'free'
  try {
    const res = await fetch(uFile.url)
    const json = await res.json()
    if (json?.status === 'active' && typeof json?.tier === 'string') return json.tier
  } catch {}
  return 'free'
}

export async function setTierForUser(userId: string, tier: string, status: BillingRecord['status'] = 'active', orgId?: string) {
  const record: BillingRecord = { tier, status, updatedAt: Date.now(), orgId }
  await put(userKey(userId), JSON.stringify(record), { access: 'public', contentType: 'application/json', addRandomSuffix: false })
}

export async function setTierForOrg(orgId: string, tier: string, status: BillingRecord['status'] = 'active') {
  const record: BillingRecord = { tier, status, updatedAt: Date.now(), orgId }
  await put(orgKey(orgId), JSON.stringify(record), { access: 'public', contentType: 'application/json', addRandomSuffix: false })
}



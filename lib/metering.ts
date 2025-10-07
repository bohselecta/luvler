import { list, put } from '@vercel/blob'
import { TIERS } from './pricing'

export type UsageRecord = { used: number; updatedAt: number }

function getMonthKey(date = new Date()): string {
  const y = date.getUTCFullYear()
  const m = String(date.getUTCMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

export function getLimitForTier(tier: string): number {
  const found = TIERS.find(t => t.id === tier)
  if (!found) return 5
  // @ts-ignore - tiers may not all have analysesPerMonth
  return found.analysesPerMonth ?? 5
}

export async function readUsage(userId: string): Promise<UsageRecord> {
  const month = getMonthKey()
  const key = `usage/${month}/${userId}.json`
  const { blobs } = await list({ prefix: key })
  const existing = blobs.find(b => b.pathname === key)
  if (!existing) return { used: 0, updatedAt: Date.now() }
  try {
    const res = await fetch(existing.url)
    const json = await res.json()
    return { used: Number(json.used || 0), updatedAt: Number(json.updatedAt || Date.now()) }
  } catch {
    return { used: 0, updatedAt: Date.now() }
  }
}

export async function writeUsage(userId: string, record: UsageRecord): Promise<void> {
  const month = getMonthKey()
  const key = `usage/${month}/${userId}.json`
  await put(key, JSON.stringify(record), { access: 'public', contentType: 'application/json', addRandomSuffix: false })
}

export async function incrementUsage(userId: string, amount = 1): Promise<UsageRecord> {
  const current = await readUsage(userId)
  const next = { used: current.used + amount, updatedAt: Date.now() }
  await writeUsage(userId, next)
  return next
}



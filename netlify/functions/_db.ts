// Lightweight Postgres helper for Netlify Functions
// Attempts common env names; returns null if not configured

type QueryResult<T> = { rows: T[] }

export async function withDb<T>(fn: (client: any) => Promise<T>): Promise<T | null> {
  const url = process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.PG_CONNECTION_STRING
  if (!url) return null
  // Dynamic import to avoid bundling if unused
  const pg = await import('pg').catch(() => null as any)
  if (!pg) return null
  const client = new pg.Client({ connectionString: url })
  await client.connect()
  try {
    const result = await fn(client)
    return result
  } finally {
    await client.end().catch(() => {})
  }
}



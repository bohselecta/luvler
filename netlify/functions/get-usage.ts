export default async (request: Request) => {
  if (request.method === 'OPTIONS') return new Response(null, { status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } })
  if (request.method !== 'GET') return new Response('Method not allowed', { status: 405 })
  const url = new URL(request.url)
  const tier = url.searchParams.get('tier') || 'free'
  const limits: Record<string, number> = { free: 5, individual: 50, clinician: 300, clinic: 1500 }
  const limit = limits[tier] ?? 5
  // Demo value; replace with KV/Postgres-backed count
  const used = 0
  return new Response(JSON.stringify({ ok: true, used, limit }), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
}



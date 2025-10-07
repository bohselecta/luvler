export default async (request: Request) => {
  if (request.method === 'OPTIONS') return new Response(null, { status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } })
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  try {
    const { userId, version } = await request.json()
    const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0]
    // TODO: insert into Postgres (consents table) when DB is wired
    return new Response(JSON.stringify({ ok: true, userId, version, ip, at: new Date().toISOString() }), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid request' }), { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
  }
}



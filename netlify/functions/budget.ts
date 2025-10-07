export default async (request: Request) => {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  if (request.method === 'OPTIONS') return new Response(null, { status: 200, headers: { ...headers, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } })
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  const { jars = [] } = await request.json().catch(() => ({ jars: [{ name: 'Food', target: 150, spent: 92 }] }))
  const tips = ['Put 5 tokens into Food on Monday.', 'Set 1 fun token aside for Saturday.']
  return new Response(JSON.stringify({ ok: true, jars, tips }), { headers })
}



export default async (request: Request) => {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  if (request.method === 'OPTIONS') return new Response(null, { status: 200, headers: { ...headers, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } })
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  const { slug } = await request.json().catch(() => ({ slug: 'illustration' }))
  const outline = [
    { id: 'aleph', title: 'Aleph: one simple drawing', resources: ['Pencil', 'Paper'] },
    { id: 'bet', title: 'Bet option: scan or photo', resources: ['Phone camera'] },
  ]
  return new Response(JSON.stringify({ ok: true, outline, nextStep: outline[0] }), { headers })
}



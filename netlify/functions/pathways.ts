export default async (request: Request) => {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  if (request.method === 'OPTIONS') return new Response(null, { status: 200, headers: { ...headers, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } })
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  const body = await request.json().catch(() => ({ title: 'Say hello', interests: ['drawing'] }))
  // Demo response: 5 small steps
  const steps = [
    { order: 1, instruction: `Share one drawing you like`, tip: 'Use a photo if on paper' },
    { order: 2, instruction: `Ask: want to draw together for 10 minutes?`, tip: 'Offer two times' },
    { order: 3, instruction: `Schedule a short session`, tip: 'Set a timer' },
    { order: 4, instruction: `Share one kind note`, tip: 'Be specific' },
    { order: 5, instruction: `Plan a small follow‑up`, tip: 'Pick a day' },
  ]
  return new Response(JSON.stringify({ ok: true, id: 'demo-path', steps }), { headers })
}



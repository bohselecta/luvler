const demoClients = [
  { id: 'c1', name: 'Alex J.', age: 8 },
  { id: 'c2', name: 'Maya R.', age: 10 },
]

export async function GET() {
  return new Response(JSON.stringify({ ok: true, clients: demoClients }), { headers: { 'Content-Type': 'application/json' } })
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const created = { id: `c${demoClients.length + 1}`, ...body }
  demoClients.push(created)
  return new Response(JSON.stringify({ ok: true, client: created }), { headers: { 'Content-Type': 'application/json' } })
}

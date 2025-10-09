export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  return new Response(JSON.stringify({ ok: true, saved: true, body }), { headers: { 'Content-Type': 'application/json' } })
}

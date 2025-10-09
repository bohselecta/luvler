export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  // No-op in demo; in production send to analytics provider
  return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } })
}

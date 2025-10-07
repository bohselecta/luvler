export async function POST(request: Request) {
  const { jars = { needs: 50, fun: 20, learn: 15, give: 5, save: 10 } } = await request.json().catch(() => ({})) as { jars?: Record<string, number> }
  const tips = [
    'Put fun first: small treats reduce rebound spending later.',
    'Name your learn jar after your current skill to keep it salient.',
  ]
  return new Response(JSON.stringify({ ok: true, jars, tips }), { headers: { 'Content-Type': 'application/json' } })
}

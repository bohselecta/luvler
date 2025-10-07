export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const tier = searchParams.get('tier') || 'free'
  const limit = tier === 'free' ? 5 : tier === 'individual' ? 50 : tier === 'clinician' ? 300 : 1500
  const used = 1
  return new Response(JSON.stringify({ ok: true, tier, limit, used }), { headers: { 'Content-Type': 'application/json' } })
}

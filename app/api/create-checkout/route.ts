export async function POST() {
  // Demo stub: in production, call Stripe Checkout and return URL
  return new Response(JSON.stringify({ ok: true, checkoutUrl: '/pricing' }), { headers: { 'Content-Type': 'application/json' } })
}

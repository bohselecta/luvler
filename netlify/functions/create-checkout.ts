export default async (request: Request) => {
  if (request.method === 'OPTIONS') return new Response(null, { status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } })
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  try {
    const { tier } = await request.json()
    // TODO: call Stripe Checkout (test mode) when keys are set; return session URL
    return new Response(JSON.stringify({ ok: true, checkoutUrl: '#' , tier }), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid request' }), { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
  }
}



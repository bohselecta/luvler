export default async (request: Request) => {
  if (request.method === 'OPTIONS') return new Response(null, { status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } })
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  try {
    const { tier } = await request.json()
    const secret = process.env.STRIPE_SECRET_KEY
    const priceMapEnv = process.env.STRIPE_PRICE_MAP // JSON: {"individual":"price_x","clinician":"price_y","clinic":"price_z"}
    if (!secret || !priceMapEnv) {
      return new Response(JSON.stringify({ ok: true, checkoutUrl: '#', note: 'Stripe not configured' }), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
    }
    const priceMap = JSON.parse(priceMapEnv)
    const price = priceMap[tier] || priceMap['individual']
    const siteUrl = process.env.SITE_URL || 'http://localhost:8888'
    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secret}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        mode: 'subscription',
        'line_items[0][price]': price,
        'line_items[0][quantity]': '1',
        success_url: `${siteUrl}/dashboard?checkout=success`,
        cancel_url: `${siteUrl}/pricing?checkout=cancel`
      })
    })
    const data = await res.json() as any
    return new Response(JSON.stringify({ ok: true, checkoutUrl: data.url || '#'}), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid request' }), { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
  }
}



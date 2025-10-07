export default async (request: Request) => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  // In production: verify signature with STRIPE_WEBHOOK_SECRET
  // For demo: accept and return ok
  try {
    const body = await request.text()
    // TODO: parse event type and update subscriptions table
    return new Response('ok')
  } catch {
    return new Response('bad request', { status: 400 })
  }
}



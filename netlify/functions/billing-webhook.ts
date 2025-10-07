export default async (request: Request) => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  // TODO: verify Stripe signature, upsert subscription in Postgres
  return new Response('ok')
}



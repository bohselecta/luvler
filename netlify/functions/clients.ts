import { withDb } from './_db'

export default async (request: Request) => {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  if (request.method === 'OPTIONS') return new Response(null, { status: 200, headers: { ...headers, 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } })
  if (request.method === 'GET') {
    // Try DB; fallback to demo
    const out = await withDb(async (db) => {
      const res = await db.query('select id, first_name, last_name from clients order by created_at desc limit 100')
      return res.rows.map((r: any) => ({ id: r.id, firstName: r.first_name, lastName: r.last_name }))
    })
    const clients = out ?? [{ id: 'demo-1', firstName: 'Alex', lastName: 'Rivera' }]
    return new Response(JSON.stringify({ ok: true, clients }), { headers })
  }
  if (request.method === 'POST') {
    const body = await request.json().catch(() => ({}))
    const created = await withDb(async (db) => {
      const res = await db.query(
        'insert into clients (org_id, first_name, last_name, dob, guardian_name, notes) values ($1,$2,$3,$4,$5,$6) returning id, first_name, last_name',
        [body.orgId || null, body.firstName, body.lastName, body.dob || null, body.guardianName || null, body.notes || null]
      )
      const r = res.rows[0]
      return { id: r.id, firstName: r.first_name, lastName: r.last_name }
    })
    const client = created ?? { id: 'new', ...body }
    return new Response(JSON.stringify({ ok: true, client }), { headers })
  }
  return new Response('Method not allowed', { status: 405 })
}



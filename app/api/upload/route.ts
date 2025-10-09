import { put } from '@vercel/blob'

export async function POST(request: Request) {
  const form = await request.formData()
  const file = form.get('file') as File | null
  if (!file) return new Response(JSON.stringify({ ok: false, error: 'No file' }), { status: 400 })
  const blob = await put(`uploads/${Date.now()}-${file.name}`, file, { access: 'public' })
  return new Response(JSON.stringify({ ok: true, url: blob.url }), { headers: { 'Content-Type': 'application/json' } })
}



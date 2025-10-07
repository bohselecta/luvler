export async function POST(request: Request) {
  const { slug = 'illustration' } = await request.json().catch(() => ({})) as { slug?: string }
  const outline = [
    { id: 'a', title: 'Gather 5 references' },
    { id: 'b', title: 'Copy one for line confidence' },
    { id: 'c', title: 'Gesture practice: 10× 30s' },
    { id: 'd', title: '1 study with shading' },
    { id: 'e', title: 'Share with 1 friend for feedback' },
  ]
  return new Response(JSON.stringify({ ok: true, slug, outline }), { headers: { 'Content-Type': 'application/json' } })
}

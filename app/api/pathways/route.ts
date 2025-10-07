export async function POST(request: Request) {
  const { title = 'Say hello', interests = ['drawing'] } = await request.json().catch(() => ({})) as { title?: string; interests?: string[] }
  const steps = [
    { order: 1, instruction: `Pick a place related to ${interests[0] || 'an interest'}`, tip: 'Small, predictable venues work best' },
    { order: 2, instruction: 'Go during a quiet time', tip: 'Lower sensory load = easier first reps' },
    { order: 3, instruction: `Bring a small prop about ${interests[0] || 'your interest'}`, tip: 'Props make openings easier' },
    { order: 4, instruction: 'Give a short hello + one line about your prop', tip: 'End on success, do not force' },
    { order: 5, instruction: 'Log how it felt and one improvement for next time' },
  ]
  return new Response(JSON.stringify({ ok: true, title, steps }), { headers: { 'Content-Type': 'application/json' } })
}

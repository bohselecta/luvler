'use client';

import { useState } from 'react'

export function TrackMap() {
  const [outline, setOutline] = useState<{ id: string; title: string }[]>([])
  const [loading, setLoading] = useState(false)
  return (
    <div className="luvler-card">
      <h3 className="font-semibold text-gray-900">Track Map</h3>
      <p className="text-gray-700 mt-1">Aleph → Bet principle: one step unlocks the next.</p>
      <button
        onClick={async () => {
          setLoading(true)
          const res = await fetch('/api/tracks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slug: 'illustration' }) })
          const d = await res.json()
          setOutline((d.outline || []).map((n: any) => ({ id: n.id, title: n.title })))
          setLoading(false)
        }}
        className="luvler-button-primary mt-3"
      >{loading ? 'Loading…' : 'Load outline'}</button>
      {outline.length > 0 && (
        <ul className="mt-3 list-disc ml-5 text-gray-700">
          {outline.map(n => <li key={n.id}>{n.title}</li>)}
        </ul>
      )}
    </div>
  )
}



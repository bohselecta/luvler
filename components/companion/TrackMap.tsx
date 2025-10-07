'use client';

import { useEffect, useState } from 'react'

export function TrackMap({ defaultSlug, autoLoad }: { defaultSlug?: string; autoLoad?: boolean }) {
  const [outline, setOutline] = useState<{ id: string; title: string }[]>([])
  const [loading, setLoading] = useState(false)

  async function load(slug: string) {
    setLoading(true)
    try {
      const res = await fetch('/api/tracks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slug }) })
      const d = await res.json()
      setOutline((d.outline || []).map((n: any) => ({ id: n.id, title: n.title })))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (autoLoad) load(defaultSlug || 'illustration')
  }, [autoLoad, defaultSlug])

  return (
    <div className="luvler-card">
      <h3 className="font-semibold text-gray-900">Track Map</h3>
      <p className="text-gray-700 mt-1">Aleph → Bet principle: one step unlocks the next.</p>
      <button onClick={() => load(defaultSlug || 'illustration')} className="luvler-button-primary mt-3">
        {loading ? 'Loading…' : 'Load outline'}
      </button>
      {outline.length > 0 && (
        <ul className="mt-3 list-disc ml-5 text-gray-700">
          {outline.map(n => <li key={n.id}>{n.title}</li>)}
        </ul>
      )}
    </div>
  )
}



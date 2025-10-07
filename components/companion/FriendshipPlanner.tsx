'use client';

import { useEffect, useState } from 'react'

type Step = { order: number; instruction: string; tip?: string }

export function FriendshipPlanner({
  defaultTitle,
  defaultInterests,
  autoGenerate,
}: {
  defaultTitle?: string
  defaultInterests?: string[]
  autoGenerate?: boolean
}) {
  const [title, setTitle] = useState(defaultTitle || 'Say hello')
  const [interests, setInterests] = useState<string>((defaultInterests && defaultInterests.join(', ')) || 'drawing')
  const [steps, setSteps] = useState<Step[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setTitle(defaultTitle || 'Say hello')
    setInterests((defaultInterests && defaultInterests.join(', ')) || 'drawing')
  }, [defaultTitle, defaultInterests])

  useEffect(() => {
    if (!autoGenerate) return
    ;(async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/pathways', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: defaultTitle || 'Say hello', interests: defaultInterests || ['drawing'] })
        })
        const d = await res.json()
        setSteps(d.steps || [])
      } finally {
        setLoading(false)
      }
    })()
  }, [autoGenerate, defaultTitle, defaultInterests])

  return (
    <div className="luvler-card">
      <h3 className="font-semibold text-gray-900">Friendship Pathway</h3>
      <p className="text-gray-700 mt-1">Pick an interest and generate small social steps.</p>
      <div className="grid md:grid-cols-2 gap-3 mt-3">
        <input value={title} onChange={e => setTitle(e.target.value)} className="luvler-input" placeholder="Title" />
        <input value={interests} onChange={e => setInterests(e.target.value)} className="luvler-input" placeholder="Interests (comma separated)" />
      </div>
      <button
        onClick={async () => {
          setLoading(true)
          const res = await fetch('/api/pathways', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, interests: interests.split(',').map(s => s.trim()) }) })
          const d = await res.json()
          setSteps(d.steps || [])
          setLoading(false)
        }}
        className="luvler-button-primary mt-3"
      >{loading ? 'Generating…' : 'Generate plan'}</button>
      {steps.length > 0 && (
        <ol className="mt-4 space-y-2 list-decimal ml-5">
          {steps.map(s => (
            <li key={s.order} className="text-gray-900">
              <span className="font-medium">{s.instruction}</span>
              {s.tip && <span className="text-gray-600"> — {s.tip}</span>}
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}



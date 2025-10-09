'use client';

import { useState } from 'react'

type Jar = { name: string; target: number; spent: number }

export function BudgetJars() {
  const [jars, setJars] = useState<Jar[]>([
    { name: 'Food', target: 150, spent: 92 },
    { name: 'Transit', target: 60, spent: 20 },
    { name: 'Fun', target: 40, spent: 10 },
  ])
  const [tips, setTips] = useState<string[]>([])

  return (
    <div className="luvler-card">
      <h3 className="font-semibold text-gray-900">Budget Jars</h3>
      <p className="text-gray-700 mt-1">Analog-friendly jars. Move small amounts weekly.</p>
      <div className="grid md:grid-cols-3 gap-3 mt-3">
        {jars.map(j => {
          const pct = Math.min(100, Math.round((j.spent / Math.max(1, j.target)) * 100))
          return (
            <div key={j.name} className="border rounded-xl p-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{j.name}</span>
                <span className="text-sm text-gray-600">${j.spent}/${j.target}</span>
              </div>
              <div className="luvler-progress mt-2"><div className="luvler-progress-bar" style={{ width: `${pct}%` }} /></div>
              <div className="flex gap-2 mt-2">
                <button onClick={() => setJars(js => js.map(x => x.name === j.name ? { ...x, spent: Math.max(0, x.spent - 5) } : x))} className="luvler-button-secondary">-5</button>
                <button onClick={() => setJars(js => js.map(x => x.name === j.name ? { ...x, spent: x.spent + 5 } : x))} className="luvler-button-secondary">+5</button>
              </div>
            </div>
          )
        })}
      </div>
      <button onClick={async () => { const res = await fetch('/api/budget', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ jars }) }); const d = await res.json(); setTips(d.tips || []) }} className="luvler-button-primary mt-3">Get tips</button>
      {tips.length > 0 && (
        <ul className="mt-3 list-disc ml-5 text-gray-700">
          {tips.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      )}
    </div>
  )
}



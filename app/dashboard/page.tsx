"use client";
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [used, setUsed] = useState(0)
  const [limit, setLimit] = useState(5)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/get-usage?tier=free')
        const d = await res.json()
        if (d && d.ok) {
          setUsed(d.used ?? 0)
          setLimit(d.limit ?? 5)
        }
      } catch {}
      setLoading(false)
    })()
  }, [])

  const pct = Math.min(100, Math.round((used / Math.max(1, limit)) * 100))

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="text-gray-700 mt-2">Usage meters and account management will appear here.</p>
      <div className="luvler-card mt-6">
        <h2 className="font-semibold text-gray-900">Current Plan</h2>
        <p className="text-gray-700 mt-1">Free (Discovery) • {used}/{limit} analyses used this month</p>
        <div className="luvler-progress mt-3">
          <div className="luvler-progress-bar" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-4 flex gap-3">
          <button onClick={async () => { const res = await fetch('/api/get-usage?tier=free'); const d = await res.json(); if (d && d.ok) { setUsed(d.used ?? 0); setLimit(d.limit ?? 5) } }} className="luvler-button-secondary">Refresh usage</button>
          <button onClick={async () => { const res = await fetch('/api/create-checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tier: 'individual' }) }); const d = await res.json(); if (d.checkoutUrl) window.location.href = d.checkoutUrl }} className="luvler-button-primary">Upgrade</button>
        </div>
        {loading && <p className="text-xs text-gray-500 mt-2">Loading usage…</p>}
      </div>
    </div>
  )
}



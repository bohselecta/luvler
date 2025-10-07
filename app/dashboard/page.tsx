"use client";
export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="text-gray-700 mt-2">Usage meters and account management will appear here.</p>
      <div className="luvler-card mt-6">
        <h2 className="font-semibold text-gray-900">Current Plan</h2>
        <p className="text-gray-700 mt-1">Free (Discovery) • 0/5 analyses used this month</p>
        <div className="mt-4 flex gap-3">
          <button onClick={async () => { const res = await fetch('/api/get-usage'); const d = await res.json(); alert(`Used ${d.used} of ${d.limit}`) }} className="luvler-button-secondary">Refresh usage</button>
          <button onClick={async () => { const res = await fetch('/api/create-checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tier: 'individual' }) }); const d = await res.json(); if (d.checkoutUrl) window.location.href = d.checkoutUrl }} className="luvler-button-primary">Upgrade</button>
        </div>
      </div>
    </div>
  )
}



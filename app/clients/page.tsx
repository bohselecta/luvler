'use client';

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Client = { id: string; firstName: string; lastName: string }

export default function ClientsPage() {
  const [items, setItems] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ firstName: '', lastName: '', dob: '', guardianName: '' })

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/clients')
        const data = await res.json()
        if (data.clients) setItems(data.clients)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
        <button onClick={() => setShowForm(true)} className="luvler-button-primary">Add client</button>
      </div>
      <div className="luvler-card mt-6">
        {showForm && (
          <div className="mb-6">
            <h2 className="font-semibold text-gray-900">New client</h2>
            <div className="grid md:grid-cols-2 gap-3 mt-3">
              <input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} placeholder="First name" className="luvler-input" />
              <input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} placeholder="Last name" className="luvler-input" />
              <input value={form.dob} onChange={e => setForm({ ...form, dob: e.target.value })} placeholder="DOB (YYYY-MM-DD)" className="luvler-input" />
              <input value={form.guardianName} onChange={e => setForm({ ...form, guardianName: e.target.value })} placeholder="Guardian name (optional)" className="luvler-input" />
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={async () => {
                  const res = await fetch('/api/clients', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
                  const d = await res.json()
                  if (d && d.client) setItems([d.client, ...items])
                  setShowForm(false)
                  setForm({ firstName: '', lastName: '', dob: '', guardianName: '' })
                }}
                className="luvler-button-primary"
              >Save</button>
              <button onClick={() => setShowForm(false)} className="luvler-button-secondary">Cancel</button>
            </div>
          </div>
        )}
        {loading ? (
          <p className="text-gray-600">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-gray-600">No clients yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {items.map(c => (
              <li key={c.id} className="py-3 flex items-center justify-between">
                <span className="text-gray-900">{c.firstName} {c.lastName}</span>
                <Link href={`/clients/${c.id}`} className="text-primary-600 hover:underline">Open</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}



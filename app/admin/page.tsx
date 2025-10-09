'use client';

import { useEffect, useState } from 'react'

type UserRow = { userId: string; tier: string; used: number; limit: number }

export default function AdminPage() {
  const [userId, setUserId] = useState('')
  const [tier, setTier] = useState('individual')
  const [orgId, setOrgId] = useState('')
  const [rows, setRows] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(false)

  async function refreshSelf() {
    const u = await fetch('/api/get-usage').then(r => r.json()).catch(() => null)
    if (u?.ok) setRows([{ userId: 'me', tier: u.tier, used: u.used, limit: u.limit }])
  }

  useEffect(() => { refreshSelf() }, [])

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin</h1>
      <div className="luvler-card">
        <h2 className="font-semibold text-gray-900">Set user tier</h2>
        <div className="grid md:grid-cols-3 gap-3 mt-3">
          <input value={userId} onChange={e => setUserId(e.target.value)} placeholder="Clerk userId" className="luvler-input" />
          <select value={tier} onChange={e => setTier(e.target.value)} className="luvler-input">
            <option value="free">Free</option>
            <option value="individual">Individual</option>
            <option value="clinician">Clinician</option>
            <option value="clinic">Clinic / Team</option>
          </select>
          <button
            className="luvler-button-primary"
            disabled={loading || !userId}
            onClick={async () => {
              setLoading(true)
              await fetch('/api/admin/set-tier', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, tier }) })
              setLoading(false)
            }}
          >{loading ? 'Saving…' : 'Save'}</button>
        </div>
      </div>

      <div className="luvler-card mt-6">
        <h2 className="font-semibold text-gray-900">Set organization tier</h2>
        <div className="grid md:grid-cols-3 gap-3 mt-3">
          <input value={orgId} onChange={e => setOrgId(e.target.value)} placeholder="Clerk organizationId" className="luvler-input" />
          <select value={tier} onChange={e => setTier(e.target.value)} className="luvler-input">
            <option value="free">Free</option>
            <option value="individual">Individual</option>
            <option value="clinician">Clinician</option>
            <option value="clinic">Clinic / Team</option>
          </select>
          <button
            className="luvler-button-primary"
            disabled={loading || !orgId}
            onClick={async () => {
              setLoading(true)
              await fetch('/api/admin/set-org-tier', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ orgId, tier }) })
              setLoading(false)
            }}
          >{loading ? 'Saving…' : 'Save'}</button>
        </div>
      </div>

      <div className="luvler-card mt-6">
        <h2 className="font-semibold text-gray-900">Usage (you)</h2>
        <button className="luvler-button-secondary mt-3" onClick={refreshSelf}>Refresh</button>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500">
                <th className="py-2">User</th>
                <th className="py-2">Tier</th>
                <th className="py-2">Used</th>
                <th className="py-2">Limit</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2">{r.userId}</td>
                  <td className="py-2">{r.tier}</td>
                  <td className="py-2">{r.used}</td>
                  <td className="py-2">{r.limit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}



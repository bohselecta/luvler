'use client';

import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="luvler-card w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900">Sign in</h1>
        <p className="text-gray-600 mt-2 text-sm">Demo login (Netlify Identity wiring next).</p>
        <div className="mt-6 space-y-4">
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="luvler-input" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="luvler-input" />
          <button disabled={loading} className="luvler-button-primary w-full">{loading ? 'Signing in…' : 'Sign in'}</button>
        </div>
      </div>
    </div>
  )
}



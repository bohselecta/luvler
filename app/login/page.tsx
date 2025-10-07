'use client';

import { useState } from 'react'
import { useRouter } from 'next/navigation'
// Netlify Identity removed for Vercel migration. Keep demo stub.

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="luvler-card w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900">Sign in</h1>
        <p className="text-gray-600 mt-2 text-sm">Demo login — auth provider to be wired on Vercel.</p>
        <div className="mt-6 space-y-4">
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="luvler-input" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="luvler-input" />
          <button
            disabled={loading}
            onClick={async () => {
              setLoading(true)
              try {
                router.push('/dashboard')
              } finally {
                setLoading(false)
              }
            }}
            className="luvler-button-primary w-full"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  )
}



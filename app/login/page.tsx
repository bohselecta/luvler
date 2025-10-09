'use client';

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const DynamicSignIn = dynamic(async () => (await import('@clerk/nextjs')).SignIn, { ssr: false })

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="luvler-card w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign in</h1>
        {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? (
          <DynamicSignIn appearance={{ elements: { formButtonPrimary: 'luvler-button-primary' } }} redirectUrl="/dashboard" />
        ) : (
          <p className="text-gray-700">Set <code className="font-mono">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> and <code className="font-mono">CLERK_SECRET_KEY</code> in Vercel to enable Clerk.</p>
        )}
      </div>
    </div>
  )
}



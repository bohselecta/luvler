'use client';

import dynamic from 'next/dynamic'
const DynamicSignUp = dynamic(async () => (await import('@clerk/nextjs')).SignUp, { ssr: false })

export default function SignUpPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="luvler-card w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Create account</h1>
        {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? (
          <DynamicSignUp appearance={{ elements: { formButtonPrimary: 'luvler-button-primary' } }} redirectUrl="/dashboard" />
        ) : (
          <p className="text-gray-700">Set <code className="font-mono">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> and <code className="font-mono">CLERK_SECRET_KEY</code> in Vercel to enable Clerk.</p>
        )}
      </div>
    </div>
  )
}



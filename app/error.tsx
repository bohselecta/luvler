'use client';

import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => {
    // Basic client-side logging; extend with an Extension (e.g., Sentry) later
    // eslint-disable-next-line no-console
    console.error('App error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="luvler-card w-full max-w-lg text-center">
            <h1 className="text-2xl font-bold text-gray-900">Something went wrong</h1>
            <p className="text-gray-600 mt-2">Please try again. If the problem persists, contact support.</p>
            <button onClick={() => reset()} className="luvler-button-primary mt-6">Try again</button>
          </div>
        </div>
      </body>
    </html>
  )
}



'use client';

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    // fire on route change
    const controller = new AbortController()
    fetch('/api/log-client', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ t: 'pageview', path: pathname, ts: Date.now() }),
      signal: controller.signal
    }).catch(() => {})
    return () => controller.abort()
  }, [pathname])

  return null
}

// Lightweight client event logger
export async function logClientEvent(type: string, payload?: Record<string, any>) {
  if (typeof window === 'undefined') return
  try {
    await fetch('/api/log-client', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ t: type, ...payload, ts: Date.now() })
    })
  } catch {}
}



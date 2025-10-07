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



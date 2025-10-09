'use client';

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Client = { id: string; firstName: string; lastName: string }

export default function ClientDetail({ params }: { params: { id: string } }) {
  const [client, setClient] = useState<Client | null>(null)

  useEffect(() => {
    ;(async () => {
      const res = await fetch('/api/clients')
      const data = await res.json()
      const found = (data.clients || []).find((c: Client) => c.id === params.id) || (data.clients || [])[0]
      setClient(found || null)
    })()
  }, [params.id])

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link href="/clients" className="text-sm text-gray-600 hover:underline">← Back to clients</Link>
      <h1 className="text-3xl font-bold text-gray-900 mt-4">{client ? `${client.firstName} ${client.lastName}` : 'Client'}</h1>
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <div className="luvler-card md:col-span-2">
          <h2 className="font-semibold text-gray-900">Cases</h2>
          <p className="text-gray-600 mt-2">This section will list active and closed cases.</p>
        </div>
        <div className="luvler-card">
          <h2 className="font-semibold text-gray-900">Files</h2>
          <p className="text-gray-600 mt-2">Upload and manage client files.</p>
        </div>
      </div>
    </div>
  )
}



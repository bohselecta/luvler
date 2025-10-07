'use client';

import Link from 'next/link'
import { TIERS } from '@/lib/pricing'

const tiers = TIERS.map(t => ({
  id: t.id,
  name: t.name,
  price: t.priceMonthly === 'contact' ? 'Contact' : `$${t.priceMonthly}/mo`,
  description: t.id === 'individual' ? 'For parents and adults building independence routines.' : t.id === 'clinician' ? 'For solo BCBAs and therapists with client folders.' : t.id === 'clinic' ? '5 seats, pooled usage, roles and audit trail.' : t.id === 'free' ? 'Try Luvler with limited analyses and one saved plan.' : 'Custom plan for organizations.',
  features: t.features,
  cta: t.id === 'free' ? 'Get started' : t.id === 'clinic' || t.id === 'enterprise' ? 'Book a demo' : 'Start trial',
  highlighted: t.id === 'individual',
}))

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Pricing that respects your needs</h1>
          <p className="text-gray-700 mt-4">Simple tiers with fair‑use metering. Annual discounts available.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map(t => (
            <div key={t.id} className={`luvler-card ${t.highlighted ? 'ring-2 ring-primary-500' : ''}`}>
              <h2 className="text-xl font-bold text-gray-900">{t.name}</h2>
              <p className="text-3xl mt-2 font-extrabold text-gray-900">{t.price}</p>
              <p className="text-gray-600 mt-2">{t.description}</p>
              <ul className="mt-6 space-y-2">
                {t.features.map((f, i) => (
                  <li key={i} className="flex gap-2 items-start"><span className="text-primary-600">✓</span><span>{f}</span></li>
                ))}
              </ul>
              <div className="mt-6">
                <Link href="#" onClick={async (e) => { e.preventDefault(); await fetch('/api/create-checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tier: t.id }) }) }} className="luvler-button-primary w-full inline-flex justify-center">{t.cta}</Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="luvler-card">
            <h3 className="text-lg font-bold text-gray-900">What’s included</h3>
            <ul className="mt-4 space-y-2 text-gray-700 list-disc list-inside">
              <li>AI goal decomposition with clinical guardrails</li>
              <li>Autism-friendly design and accessibility features</li>
              <li>Data export and ownership assurance</li>
              <li>Consent-first workflow and privacy best practices</li>
            </ul>
          </div>
          <div className="luvler-card">
            <h3 className="text-lg font-bold text-gray-900">For Clinics</h3>
            <p className="text-gray-700 mt-2">Founding-clinic pricing for the first 50 clinics. We’ll help onboard your team and share best practices for families using Luvler between sessions.</p>
            <div className="mt-4">
              <Link href="#" className="luvler-button-secondary">Book a clinic demo</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



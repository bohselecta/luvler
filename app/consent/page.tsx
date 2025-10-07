'use client';

import { useState } from 'react'

export default function ConsentPage() {
  const [accepted, setAccepted] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Informed Use & Consent</h1>
        <p className="text-gray-700 mt-4">Luvler offers AI‑assisted goal planning and educational content. It is not a replacement for medical, legal, or clinical advice. For clinical use, work with a qualified professional (e.g., BCBA) who can supervise and individualize plans.</p>

        <div className="luvler-card mt-6">
          <h2 className="text-xl font-semibold text-gray-900">What Luvler does</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            <li>Generates step‑by‑step task analyses and SMART‑style goals</li>
            <li>Translates clinician language to parent‑friendly wording</li>
            <li>Offers sensory‑aware accommodations and supports</li>
          </ul>
        </div>

        <div className="luvler-card mt-6">
          <h2 className="text-xl font-semibold text-gray-900">What Luvler does not do</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            <li>No diagnosis, medication, or crisis guidance</li>
            <li>No coercive or aversive practices; assent and autonomy prioritized</li>
            <li>Not a substitute for individualized services or emergency care</li>
          </ul>
        </div>

        <div className="luvler-card mt-6">
          <h2 className="text-xl font-semibold text-gray-900">Your consent</h2>
          <label className="flex items-start gap-3 mt-3">
            <input type="checkbox" className="mt-1" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
            <span className="text-gray-700">I understand these limitations, and I consent to use Luvler for educational and planning purposes. For clinical decisions, I will consult a qualified professional.</span>
          </label>
          <button disabled={!accepted} className="luvler-button-primary mt-4 disabled:opacity-50">Continue</button>
        </div>
      </div>
    </div>
  )
}



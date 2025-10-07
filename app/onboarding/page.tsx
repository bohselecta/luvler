'use client';

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Role = 'neurodivergent' | 'family' | 'clinician' | 'ally' | 'exploring'

export default function OnboardingPage() {
  const router = useRouter()
  const [role, setRole] = useState<Role>('neurodivergent')
  const [interests, setInterests] = useState<string[]>([])
  const [goal, setGoal] = useState('')
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)

  const chips = ['illustration','anime','cooking','nature walks','games','lego','music']

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
      <p className="text-gray-700 mt-2">A quick setup for your Companion dashboard (demo).</p>

      <div className="luvler-card mt-6">
        <h2 className="font-semibold text-gray-900">Who is this for today?</h2>
        <div className="grid md:grid-cols-3 gap-2 mt-3">
          {(['neurodivergent','family','clinician','ally','exploring'] as Role[]).map(r => (
            <button key={r} onClick={() => setRole(r)} className={`px-4 py-2 rounded-xl border ${role===r?'border-primary-500 bg-primary-50':'border-gray-300'}`}>{r}</button>
          ))}
        </div>
      </div>

      <div className="luvler-card mt-6">
        <h2 className="font-semibold text-gray-900">Interests</h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {chips.map(c => (
            <button key={c} onClick={() => setInterests(prev => prev.includes(c) ? prev.filter(x=>x!==c) : [...prev, c])} className={`px-3 py-1 rounded-full border text-sm ${interests.includes(c)?'border-primary-500 bg-primary-50':'border-gray-300'}`}>{c}</button>
          ))}
        </div>
      </div>

      <div className="luvler-card mt-6">
        <h2 className="font-semibold text-gray-900">Top goal this week</h2>
        <textarea value={goal} onChange={e=>setGoal(e.target.value)} className="luvler-textarea mt-3" rows={3} placeholder="Example: say hello to a classmate after art class" />
      </div>

      <div className="luvler-card mt-6">
        <h2 className="font-semibold text-gray-900">Comfort settings</h2>
        <label className="flex items-center gap-2 mt-3 text-gray-700"><input type="checkbox" checked={reducedMotion} onChange={e=>setReducedMotion(e.target.checked)} /> Reduced motion</label>
        <label className="flex items-center gap-2 mt-2 text-gray-700"><input type="checkbox" checked={highContrast} onChange={e=>setHighContrast(e.target.checked)} /> High contrast</label>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => {
            try {
              localStorage.setItem('luvler_onboarding_v1', JSON.stringify({ role, interests, goal, comfort: { reducedMotion, highContrast } }))
            } catch {}
            router.push('/companion')
          }}
          className="luvler-button-primary"
        >Create my quick-start pack</button>
        <button onClick={() => router.push('/')} className="luvler-button-secondary">Skip</button>
      </div>
    </div>
  )
}



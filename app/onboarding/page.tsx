'use client';

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProcessingModality } from '@/lib/types'

type Role = 'neurodivergent' | 'family' | 'clinician' | 'ally' | 'exploring'

export default function OnboardingPage() {
  const router = useRouter()
  const [role, setRole] = useState<Role>('neurodivergent')
  const [interests, setInterests] = useState<string[]>([])
  const [goal, setGoal] = useState('')
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)

  // Enhanced onboarding state
  const [specialInterests, setSpecialInterests] = useState<string[]>([])
  const [processingModalities, setProcessingModalities] = useState<ProcessingModality[]>([])
  const [modalityDescription, setModalityDescription] = useState('')
  const [privacyConsent, setPrivacyConsent] = useState(false)
  const [communityPreference, setCommunityPreference] = useState<'autistic-only' | 'mixed'>('autistic-only')

  const chips = ['illustration','anime','cooking','nature walks','games','lego','music']

  // Processing modality options with examples
  const modalityOptions: { value: ProcessingModality; label: string; example: string }[] = [
    { value: 'narrative', label: 'Stories and narratives', example: 'Thinks in stories — can relate life experiences back to stories from somewhere' },
    { value: 'visual', label: 'Visual patterns and images', example: 'Thinks in pictures, diagrams, and visual relationships' },
    { value: 'systematic', label: 'Systems and how things connect', example: 'Sees patterns, processes, and logical connections between things' },
    { value: 'numerical', label: 'Numbers and data', example: 'Understands concepts through numbers, sequences, and quantitative relationships' },
    { value: 'kinesthetic', label: 'Physical movement and doing', example: 'Learns best by doing, moving, and hands-on experiences' },
    { value: 'musical', label: 'Music and sound', example: 'Processes information through rhythm, melody, and auditory patterns' },
    { value: 'other', label: 'Other', example: 'Describe your unique way of thinking below' }
  ]

  // Handle custom special interest input
  const [customInterest, setCustomInterest] = useState('')

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

      <div className="luvler-card mt-6">
        <h2 className="font-semibold text-gray-900">How do you think about the world?</h2>
        <p className="text-sm text-gray-600 mt-1 mb-4">Understanding how you process information helps us personalize your experience.</p>
        <div className="space-y-3">
          {modalityOptions.map(modality => (
            <label key={modality.value} className="flex items-start gap-3 p-3 border border-gray-200 rounded-xl hover:border-primary-300 cursor-pointer">
              <input
                type="checkbox"
                checked={processingModalities.includes(modality.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setProcessingModalities([...processingModalities, modality.value])
                  } else {
                    setProcessingModalities(processingModalities.filter(m => m !== modality.value))
                  }
                }}
                className="mt-0.5"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">{modality.label}</div>
                <div className="text-sm text-gray-600 mt-1">{modality.example}</div>
              </div>
            </label>
          ))}
        </div>
        {(processingModalities.includes('other') || modalityDescription) && (
          <textarea
            value={modalityDescription}
            onChange={e => setModalityDescription(e.target.value)}
            placeholder="Describe your unique way of thinking..."
            className="luvler-textarea mt-4"
            rows={3}
          />
        )}
      </div>

      <div className="luvler-card mt-6">
        <h2 className="font-semibold text-gray-900">Tell us more about your special interests</h2>
        <p className="text-sm text-gray-600 mt-1 mb-4">These help us create more relevant examples and analogies.</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {chips.map(c => (
            <button
              key={c}
              onClick={() => setSpecialInterests(prev => prev.includes(c) ? prev.filter(x=>x!==c) : [...prev, c])}
              className={`px-3 py-1 rounded-full border text-sm ${specialInterests.includes(c)?'border-primary-500 bg-primary-50':'border-gray-300'}`}
            >{c}</button>
          ))}
          {specialInterests.filter(i => !chips.includes(i)).map(c => (
            <button
              key={c}
              onClick={() => setSpecialInterests(prev => prev.filter(x=>x!==c))}
              className="px-3 py-1 rounded-full border border-primary-500 bg-primary-50 text-sm"
            >{c} ×</button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            value={customInterest}
            onChange={e => setCustomInterest(e.target.value)}
            placeholder="Add your own special interest..."
            className="luvler-input flex-1"
            onKeyPress={e => {
              if (e.key === 'Enter' && customInterest.trim()) {
                setSpecialInterests([...specialInterests, customInterest.trim()])
                setCustomInterest('')
              }
            }}
          />
          <button
            onClick={() => {
              if (customInterest.trim()) {
                setSpecialInterests([...specialInterests, customInterest.trim()])
                setCustomInterest('')
              }
            }}
            className="luvler-button-secondary px-4"
          >
            Add
          </button>
        </div>
      </div>

      <div className="luvler-card mt-6">
        <h2 className="font-semibold text-gray-900">Community preference</h2>
        <p className="text-sm text-gray-600 mt-1 mb-4">Who do you prefer to connect with in groups?</p>
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'autistic-only', label: 'Autistic-only rooms (recommended)' },
            { value: 'mixed', label: 'Mixed neurotype rooms' }
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setCommunityPreference(opt.value as any)}
              className={`px-3 py-1 rounded-full border text-sm ${communityPreference===opt.value?'border-primary-500 bg-primary-50':'border-gray-300'}`}
            >{opt.label}</button>
          ))}
        </div>
      </div>

      <div className="luvler-card mt-6">
        <h2 className="font-semibold text-gray-900">Privacy & Data</h2>
        <p className="text-sm text-gray-600 mt-1 mb-4">
          Your information is kept private and secure. You can change these settings anytime.
        </p>
        <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-xl">
          <input
            type="checkbox"
            checked={privacyConsent}
            onChange={e => setPrivacyConsent(e.target.checked)}
            className="mt-0.5"
          />
          <div className="flex-1">
            <div className="font-medium text-gray-900">I understand and consent to data collection</div>
            <div className="text-sm text-gray-600 mt-1">
              My data will be used to improve the tool and may be shared with clinicians only with my explicit permission.
              I can access, modify, or delete my data at any time.
            </div>
          </div>
        </label>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => {
            try {
              // Save enhanced onboarding data to v2
              const enhancedProfile = {
                role,
                interests,
                goal,
                comfort: { reducedMotion, highContrast },
                specialInterests,
                processingModalities,
                modalityDescription,
                privacyConsent,
                communityPreference
              }
              localStorage.setItem('luvler_onboarding_v2', JSON.stringify(enhancedProfile))

              // Also save to v1 for backwards compatibility
              localStorage.setItem('luvler_onboarding_v1', JSON.stringify({
                role, interests, goal, comfort: { reducedMotion, highContrast }
              }))
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



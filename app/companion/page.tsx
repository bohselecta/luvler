"use client";
import { FriendshipPlanner } from '@/components/companion/FriendshipPlanner'
import { EnergyMeter } from '@/components/companion/EnergyMeter'
import { BudgetJars } from '@/components/companion/BudgetJars'
import { TrackMap } from '@/components/companion/TrackMap'
import { useEffect, useState } from 'react'
export default function CompanionPage() {
  const [defaults, setDefaults] = useState<{ role?: string; interests?: string[]; goal?: string } | null>(null)
  const [showWelcome, setShowWelcome] = useState(false)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('luvler_onboarding_v1')
      if (raw) {
        setDefaults(JSON.parse(raw))
        setShowWelcome(true)
      }
    } catch {}
  }, [])
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Companion</h1>
      <p className="text-gray-700 mt-2">Dashboard for goals, friends, and creations (demo).</p>
      {showWelcome && (
        <div className="mt-4 p-4 border border-success-200 bg-success-50 rounded-xl flex items-center justify-between">
          <div className="text-success-900 text-sm">Quick‑start generated from your onboarding. You can change it anytime.</div>
          <div className="flex gap-2">
            <button onClick={() => setShowWelcome(false)} className="luvler-button-secondary">Dismiss</button>
            <a href="/onboarding" className="luvler-button-primary">Edit onboarding</a>
          </div>
        </div>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <EnergyMeter />
        <FriendshipPlanner
          defaultTitle={defaults?.goal || 'Say hello'}
          defaultInterests={defaults?.interests || ['drawing']}
          autoGenerate={true}
        />
        <BudgetJars />
        <TrackMap />
      </div>
    </div>
  )
}



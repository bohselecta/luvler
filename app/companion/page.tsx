"use client";
import { FriendshipPlanner } from '@/components/companion/FriendshipPlanner'
import { EnergyMeter } from '@/components/companion/EnergyMeter'
import { BudgetJars } from '@/components/companion/BudgetJars'
import { TrackMap } from '@/components/companion/TrackMap'
import { Heart, Target, Users } from 'lucide-react'
import Link from 'next/link'
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Companion</h1>
          <p className="text-gray-700 mt-2">Your confidence journey, one step at a time.</p>
        </div>
        <Link href="/privacy" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          Privacy Settings →
        </Link>
      </div>

      {showWelcome && (
        <div className="mb-8 p-4 border border-success-200 bg-success-50 rounded-xl flex items-center justify-between">
          <div className="text-success-900 text-sm">Quick‑start generated from your onboarding. You can change it anytime.</div>
          <div className="flex gap-2">
            <button onClick={() => setShowWelcome(false)} className="luvler-button-secondary">Dismiss</button>
            <a href="/onboarding" className="luvler-button-primary">Edit onboarding</a>
          </div>
        </div>
      )}

      {/* Main Feature Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link href="/companion/friends" className="group block">
          <div className="luvler-card group-hover:shadow-lg transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-pink-100 p-2 rounded-lg group-hover:scale-105 transition-transform">
                <Heart className="w-5 h-5 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Friendship Builder</h3>
            </div>
            <p className="text-sm text-gray-600">Build confidence through friendship, one small step at a time.</p>
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-pink-600 group-hover:text-pink-700">
              <span>Start exploring</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </Link>

        <Link href="/self-advocacy" className="group block">
          <div className="luvler-card group-hover:shadow-lg transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg group-hover:scale-105 transition-transform">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Goal Setting</h3>
            </div>
            <p className="text-sm text-gray-600">Break down tasks into clear, manageable steps you can follow.</p>
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600 group-hover:text-blue-700">
              <span>Set a goal</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </Link>

        <Link href="/companion/rewards" className="group block">
          <div className="luvler-card group-hover:shadow-lg transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-2 rounded-lg group-hover:scale-105 transition-transform">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Reward Games</h3>
            </div>
            <p className="text-sm text-gray-600">Create your own motivation system with rewards that matter to you.</p>
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-purple-600 group-hover:text-purple-700">
              <span>Create a game</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </Link>

        <Link href="/learn" className="group block">
          <div className="luvler-card group-hover:shadow-lg transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-2 rounded-lg group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Learning Tracks</h3>
            </div>
            <p className="text-sm text-gray-600">Explore creative tracks and build new skills at your own pace.</p>
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-green-600 group-hover:text-green-700">
              <span>Start learning</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Tools Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <EnergyMeter />
        <FriendshipPlanner
          defaultTitle={defaults?.goal || 'Say hello'}
          defaultInterests={defaults?.interests || ['drawing']}
          autoGenerate={true}
        />
        <BudgetJars />
        <TrackMap defaultSlug={(defaults?.interests && defaults.interests.includes('illustration')) ? 'illustration' : 'general'} autoLoad={true} />
      </div>
    </div>
  )
}



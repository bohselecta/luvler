'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, BookOpen, Users, Briefcase, ChevronRight, Sparkles, Target } from 'lucide-react';
import Image from 'next/image';

export default function RouterScreen() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const router = useRouter();

  const handlePathSelect = (path: 'self-advocacy' | 'professional') => {
    setSelectedPath(path);
    console.log(`Selected path: ${path}`);
    // Navigate to the selected path
    router.push(`/${path}`);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-[1280px] w-full px-4 md:px-8">
        {/* Header */}
        <div className="mb-16">
          <h1 className="mt-6 md:mt-10 text-[2.5rem] sm:text-[3rem] md:text-[4rem] leading-[1.1] font-semibold tracking-tight text-slate-900 max-w-4xl font-display">
            A neurodivergent life companion—at home and in clinic
          </h1>
          <p className="mt-4 md:mt-6 text-lg md:text-[22px] leading-[1.7] font-normal text-slate-600 max-w-[48ch] font-serif">
            Simple steps for your goals. Gentle tools for friendships, learning, and daily life. Built for how you think.
          </p>
        </div>

        {/* Hero: Two big doors */}
        <div className="grid gap-6 mb-12 md:grid-cols-12">
          {/* Companion Door */}
          <a
            href="/companion"
            className="group w-full bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-0 border border-gray-100 md:col-span-6 overflow-hidden"
            aria-label="Start Companion"
          >
            <div className="w-full" style={{ aspectRatio: '1 / 1' }}>
              <picture>
                <source srcSet="/hero-companion@2x.png" type="image/png" />
                <img src="/hero-companion.svg" alt="Companion hero placeholder" className="w-full h-full object-contain bg-gray-50" />
              </picture>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900">Start Companion</h2>
              <p className="text-slate-600 mt-2">Simple steps for goals. Gentle tools for friendships, learning, and daily life.</p>
              <div className="mt-4 inline-flex items-center gap-2 text-primary-600 font-medium group-hover:text-primary-700">
                <span>Start Companion</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>

          {/* Clinician Door */}
          <a
            href="/professional"
            className="group w-full bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-0 border border-gray-100 md:col-span-6 overflow-hidden"
            aria-label="See clinician tools"
          >
            <div className="w-full" style={{ aspectRatio: '1 / 1' }}>
              <picture>
                <source srcSet="/hero-clinician@2x.png" type="image/png" />
                <img src="/hero-clinician.svg" alt="Clinician hero placeholder" className="w-full h-full object-contain bg-gray-50" />
              </picture>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900">For Clinicians</h2>
              <p className="text-slate-600 mt-2">Clinic‑ready goals, parent‑friendly language, and consent‑first sharing.</p>
              <div className="mt-4 inline-flex items-center gap-2 text-secondary-600 font-medium group-hover:text-secondary-700">
                <span>See clinician tools</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>
        </div>

        {/* Features Preview */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
          <h3 className="text-2xl font-semibold text-slate-900 mb-6 text-center">What makes Luvler special?</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <img src="/spot-friendship.png" alt="Friendship spot art" className="w-24 h-20 object-contain mx-auto mb-4" />
              <h4 className="font-bold text-gray-900 mb-2">Friendship as Confidence</h4>
              <p className="text-gray-600">Build confidence with small, structured steps and interest‑based groups</p>
            </div>
            <div className="text-center">
              <img src="/spot-goals.png" alt="Goals spot art" className="w-24 h-20 object-contain mx-auto mb-4" />
              <h4 className="font-bold text-gray-900 mb-2">Personalized to How You Think</h4>
              <p className="text-gray-600">We adapt language and examples to your processing style and interests</p>
            </div>
            <div className="text-center">
              <img src="/spot-rewards.png" alt="Rewards spot art" className="w-24 h-20 object-contain mx-auto mb-4" />
              <h4 className="font-bold text-gray-900 mb-2">Your Autonomy Matters</h4>
              <p className="text-gray-600">You choose the goal, the pace, and who can see your data</p>
            </div>
            <div className="text-center">
              <img src="/spot-learn.png" alt="Learning spot art" className="w-24 h-20 object-contain mx-auto mb-4" />
              <h4 className="font-bold text-gray-900 mb-2">Learn, Your Way</h4>
              <p className="text-gray-600">Gentle tracks that fit your interests and energy</p>
            </div>
          </div>
        </div>

        {/* Companion Preview */}
        <div className="luvler-card mt-8">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">Companion: one clear step at a time</h3>
              <p className="text-gray-700">You choose the goal and the pace. We adapt to how you think and what you care about.</p>
              <div className="mt-4 inline-flex items-center gap-2 text-primary-600 font-medium">
                <a href="/companion" className="luvler-button-primary">Start Companion</a>
                <a href="#companion-how" className="luvler-button-secondary">See how it works</a>
              </div>
            </div>
            <div>
              <picture>
                <source srcSet="/preview-companion-desktop@2x.png" type="image/png" />
                <img src="/preview-companion-desktop.svg" alt="Companion dashboard preview placeholder" className="w-full rounded-xl border border-gray-200" />
              </picture>
            </div>
          </div>
        </div>

        {/* Removed research-backed rooms explainer to reduce cognitive load on first view */}

        {/* For Clinicians */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">For clinicians</h3>
              <p className="text-gray-700 mb-4">Design clinic‑ready goals your families can actually use. Translate to parent‑friendly steps. Share progress with clear consent.</p>
              <div className="inline-flex gap-2">
                <a href="/professional" className="luvler-button-secondary">See clinician tools</a>
                <a href="/pricing" className="luvler-button-secondary">Pricing</a>
              </div>
            </div>
            <div>
              <picture>
                <source srcSet="/preview-clinician-goal@2x.png" type="image/png" />
                <img src="/preview-clinician-goal.svg" alt="Clinician goal editor preview placeholder" className="w-full rounded-xl border border-gray-200" />
              </picture>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600">
          <p className="mb-2">All paths use evidence-based methods to help achieve goals with dignity and respect.</p>
          <p>Your data is private and secure.</p>
        </div>
      </div>
    </div>
  );
}

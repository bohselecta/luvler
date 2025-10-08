'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, BookOpen, Users, Briefcase, ChevronRight, Sparkles } from 'lucide-react';
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
            Evidence‑based goals with a gentle, autism‑friendly design
          </h1>
          <p className="mt-4 md:mt-6 text-lg md:text-[22px] leading-[1.7] font-normal text-slate-600 max-w-[48ch] font-serif">
            Luvler turns everyday goals into clear, step‑by‑step plans—grounded in ABA best practices and written in respectful, plain language for families and clinicians.
          </p>
        </div>

        {/* Path Selection Cards */}
        <div className="grid gap-6 mb-12 md:grid-cols-12">
          {/* Self-Advocacy Path */}
          <button
            onClick={() => handlePathSelect('self-advocacy')}
            className="group w-full bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-left border border-gray-100 hover:border-primary-200 md:col-span-6"
          >
            <div className="flex items-start gap-6">
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-4 rounded-2xl group-hover:scale-105 transition-transform flex-shrink-0">
                <Heart className="w-10 h-10 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">I am on the autism spectrum</h2>
                  <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium self-start sm:self-center">
                    Self-Advocacy
                  </div>
                </div>
                <p className="text-slate-600 text-[1rem] leading-[1.6] font-serif mb-6">
                  Get help breaking down tasks into clear, manageable steps you can follow at your own pace.
                </p>
                <div className="flex items-center gap-2 text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                  <span>Create my step‑by‑step plan</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </button>

          {/* Professional Path */}
          <button
            onClick={() => handlePathSelect('professional')}
            className="group w-full bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-left border border-gray-100 hover:border-secondary-200 md:col-span-6"
          >
            <div className="flex items-start gap-6">
              <div className="bg-gradient-to-br from-secondary-100 to-secondary-200 p-4 rounded-2xl group-hover:scale-105 transition-transform flex-shrink-0">
                <Users className="w-10 h-10 text-secondary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">I'm a clinician or caregiver</h2>
                  <div className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm font-medium self-start sm:self-center">
                    Professional
                  </div>
                </div>
                <p className="text-slate-600 text-[1rem] leading-[1.6] font-serif mb-6">
                  Access comprehensive ABA tools for clinicians and parents with evidence-based goal setting and progress tracking.
                </p>
                <div className="flex items-center gap-2 text-secondary-600 font-medium group-hover:text-secondary-700 transition-colors">
                  <span>Build a research‑backed plan</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Features Preview */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
          <h3 className="text-2xl font-semibold text-slate-900 mb-6 text-center">What makes Luvler special?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Autism-Friendly Design</h4>
              <p className="text-gray-600">Clear, predictable interface that respects sensory and cognitive differences</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-secondary-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">AI-Powered Support</h4>
              <p className="text-gray-600">Smart task breakdown and evidence-based goal setting</p>
            </div>
            <div className="text-center">
              <div className="bg-accent-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-accent-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Progress Tracking</h4>
              <p className="text-gray-600">Visual progress indicators and respectful celebration of achievements</p>
            </div>
          </div>
        </div>

        {/* Start Companion CTA */}
        <div className="luvler-card mt-8 text-center">
          <h3 className="text-xl font-bold text-gray-900">Ready to try the Companion?</h3>
          <p className="text-gray-700 mt-2">Answer 60 seconds of questions to get a quick‑start pack.</p>
          <div className="mt-4">
            <a href="/onboarding" className="luvler-button-primary">Start Companion</a>
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

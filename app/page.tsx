'use client';

import { useState } from 'react';
import { Heart, BookOpen, Users, Briefcase, ChevronRight, Sparkles } from 'lucide-react';

export default function RouterScreen() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const handlePathSelect = (path: 'self-advocacy' | 'professional') => {
    setSelectedPath(path);
    // In a real app, this would navigate to the appropriate page
    console.log(`Selected path: ${path}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mb-8 shadow-xl">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 font-display">
            Welcome to <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Luvler</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Love to learn, step by step. Choose your path to achieve your goals with care and understanding.
          </p>
        </div>

        {/* Path Selection Cards */}
        <div className="grid gap-6 mb-12">
          {/* Self-Advocacy Path */}
          <button
            onClick={() => handlePathSelect('self-advocacy')}
            className="group w-full bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-left border border-gray-100 hover:border-primary-200"
          >
            <div className="flex items-center gap-6">
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-4 rounded-2xl group-hover:scale-105 transition-transform">
                <Heart className="w-10 h-10 text-primary-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">I am on the autism spectrum</h2>
                  <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                    Self-Advocacy
                  </div>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Get help breaking down tasks into clear, manageable steps you can follow at your own pace.
                </p>
                <div className="mt-4 flex items-center gap-2 text-primary-600 font-medium">
                  <span>Start with love and understanding</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </button>

          {/* Professional Path */}
          <button
            onClick={() => handlePathSelect('professional')}
            className="group w-full bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-left border border-gray-100 hover:border-secondary-200"
          >
            <div className="flex items-center gap-6">
              <div className="bg-gradient-to-br from-secondary-100 to-secondary-200 p-4 rounded-2xl group-hover:scale-105 transition-transform">
                <Users className="w-10 h-10 text-secondary-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">I'm helping someone</h2>
                  <div className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm font-medium">
                    Professional
                  </div>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Access comprehensive ABA tools for clinicians and parents with evidence-based goal setting and progress tracking.
                </p>
                <div className="mt-4 flex items-center gap-2 text-secondary-600 font-medium">
                  <span>Professional support with care</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Features Preview */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">What makes Luvler special?</h3>
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

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600">
          <p className="mb-2">All paths use evidence-based methods to help achieve goals with dignity and respect.</p>
          <p>Your data is private and secure.</p>
        </div>
      </div>
    </div>
  );
}

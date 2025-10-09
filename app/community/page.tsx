'use client';

import { useState, useEffect } from 'react';
import { Users, Shield, MessageCircle, Flag, Heart, CheckCircle, AlertTriangle, MessageSquare } from 'lucide-react';
import { MessagePractice } from '@/components/companion/MessagePractice';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'groups' | 'safety' | 'practice'>('groups');
  const [showPractice, setShowPractice] = useState(false);
  const [neurotype, setNeurotype] = useState<'autistic-only' | 'mixed'>('autistic-only');

  const safetyFeatures = [
    {
      title: 'Moderation System',
      description: 'Community moderators ensure safe, respectful interactions',
      icon: Shield,
      status: 'active'
    },
    {
      title: 'Content Filtering',
      description: 'Automatic detection and removal of inappropriate content',
      icon: Flag,
      status: 'active'
    },
    {
      title: 'Anonymous Practice',
      description: 'Safe space to practice social communication without sending messages',
      icon: MessageSquare,
      status: 'active'
    },
    {
      title: 'Structured Groups',
      description: 'Small, interest-based groups with clear rules and facilitation',
      icon: Users,
      status: 'active'
    }
  ];

  const communityGuidelines = [
    'Respect everyone\'s communication style and preferences',
    'Share positive experiences and support others',
    'Report any concerns to moderators immediately',
    'Keep discussions focused on shared interests',
    'Be patient and understanding with different interaction styles',
    'Remember that everyone is here to build confidence'
  ];

  if (showPractice) {
    return (
      <MessagePractice
        initialPrompt="Say something positive about someone's special interest in a group discussion"
        onClose={() => setShowPractice(false)}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Community</h1>
        <p className="text-gray-700">Safe, structured spaces for neurodivergent connection and growth.</p>
        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-sm">
          Designed for teens/young adults. Moderators keep rooms age-appropriate. Virtual groups are an evidence-informed pilot; we measure outcomes.
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        {[
          { id: 'groups', label: 'Groups', icon: Users },
          { id: 'safety', label: 'Safety & Guidelines', icon: Shield },
          { id: 'practice', label: 'Practice Space', icon: MessageCircle }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium transition-colors ${
              activeTab === id
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Groups Tab */}
      {activeTab === 'groups' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-700">Room type</label>
            <select
              value={neurotype}
              onChange={(e) => setNeurotype(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="autistic-only">Autistic-only (safer, shared understanding)</option>
              <option value="mixed">Mixed neurotype</option>
            </select>
          </div>
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Interest-Based Groups</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Small, structured groups organized around shared special interests.
              Each group has clear rules, moderation, and facilitation to ensure safety and positive experiences.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">Coming Soon</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="luvler-card text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Pokemon Strategy</h3>
              <p className="text-sm text-gray-600 mb-3">Discuss deck building and tournament strategies</p>
              <div className="text-xs text-gray-500">Moderated • Interest-based</div>
            </div>

            <div className="luvler-card text-center">
              <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Art & Drawing</h3>
              <p className="text-sm text-gray-600 mb-3">Share techniques and inspiration</p>
              <div className="text-xs text-gray-500">Moderated • Creative focus</div>
            </div>

            <div className="luvler-card text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Music & Sound</h3>
              <p className="text-sm text-gray-600 mb-3">Share favorite songs and musical interests</p>
              <div className="text-xs text-gray-500">Moderated • Sensory-friendly</div>
            </div>
          </div>
        </div>
      )}

      {/* Safety Tab */}
      {activeTab === 'safety' && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Community Safety Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {safetyFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="luvler-card">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Icon className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-700">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="luvler-card">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Community Guidelines
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {communityGuidelines.map((guideline, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{guideline}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-900 mb-1">Report Concerns</h4>
                <p className="text-sm text-yellow-800 mb-3">
                  If you ever feel uncomfortable or notice inappropriate behavior, please report it immediately.
                  Moderators review all reports within 24 hours.
                </p>
                <button className="text-sm bg-yellow-200 text-yellow-900 px-3 py-1 rounded-lg hover:bg-yellow-300 transition-colors">
                  Report an Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Practice Tab */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Anonymous Practice Space</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Practice social communication in a completely safe environment.
              Write messages, get feedback, and build confidence without ever sending anything.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="luvler-card">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Why Practice Here?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  Completely private - messages are never sent
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  AI feedback on tone, clarity, and appropriateness
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  Practice different social scenarios safely
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  Build confidence through repetition
                </li>
              </ul>
            </div>

            <div className="luvler-card">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Practice Scenarios</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowPractice(true)}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">Starting Conversations</div>
                  <div className="text-sm text-gray-600">Greetings and icebreakers</div>
                </button>
                <button
                  onClick={() => setShowPractice(true)}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">Sharing Interests</div>
                  <div className="text-sm text-gray-600">Talking about what you love</div>
                </button>
                <button
                  onClick={() => setShowPractice(true)}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">Asking Questions</div>
                  <div className="text-sm text-gray-600">Keeping conversations going</div>
                </button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowPractice(true)}
              className="luvler-button-primary text-lg px-8 py-4"
            >
              Start Practicing Now
            </button>
            <p className="text-sm text-gray-600 mt-3">
              Your practice messages are completely private and for your eyes only.
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-100">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Community First</h3>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Safety, respect, and positive growth are at the heart of everything we do.
            Our community features are designed to create meaningful connections while prioritizing everyone's comfort and well-being.
          </p>
        </div>
      </div>
    </div>
  );
}



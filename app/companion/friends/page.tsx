'use client';

import { useRouter } from 'next/navigation';
import { Heart, Users, BookOpen, Target, MessageCircle, Calendar, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function FriendsPage() {
  const router = useRouter();

  const friendModules = [
    {
      title: 'Understanding Friendship',
      description: 'Explore what friendship means to you in a safe, private space',
      icon: Heart,
      path: '/companion/friends/explore',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      title: 'Practice at Home',
      description: 'Build confidence through safe, private exercises',
      icon: BookOpen,
      path: '/companion/friends/practice',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Find Meetups',
      description: 'Connect with others who share your special interests',
      icon: Users,
      path: '/companion/friends/meetups',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Reflect & Grow',
      description: 'Celebrate progress and learn from experiences',
      icon: Sparkles,
      path: '/companion/friends/reflection',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <button
          onClick={() => router.push('/companion')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          ← Back to Companion
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Friendship Builder</h1>
        <p className="text-gray-700">Build confidence through friendship, one small step at a time.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {friendModules.map((module, index) => {
          const Icon = module.icon;
          return (
            <Link
              key={index}
              href={module.path}
              className="group block"
            >
              <div className="luvler-card group-hover:shadow-lg transition-all duration-200">
                <div className="flex items-start gap-4">
                  <div className={`${module.bgColor} p-3 rounded-xl group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-6 h-6 ${module.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{module.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{module.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary-600 group-hover:text-primary-700">
                      <span>Start exploring</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-100">
        <div className="flex items-start gap-4">
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <Target className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">How Friendship Building Works</h3>
            <div className="text-gray-700 space-y-2">
              <p>• <strong>Understanding</strong>: Explore friendship privately and safely</p>
              <p>• <strong>Practice</strong>: Build skills through exercises you can do at home</p>
              <p>• <strong>Connect</strong>: Join meetups with others who share your interests</p>
              <p>• <strong>Reflect</strong>: Celebrate what worked and learn from experiences</p>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Every step is designed to respect your autonomy and build genuine confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

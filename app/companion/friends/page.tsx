'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Heart, Users, BookOpen, Target, MessageCircle, Calendar, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { SplitView } from '@/components/layout/SplitView';

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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Friendship Builder</h1>
        <p className="text-gray-700">One clear step at a time. Practice → Reflect → Generalize.</p>
      </div>

      {/* How it works (icon strip) */}
      <div className="luvler-card mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">How it works</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
              <Image src="/icon-understanding.svg" width={24} height={24} alt="Understanding icon" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Understanding</p>
              <p className="text-xs text-gray-600">Explore privately</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
              <Image src="/icon-practice.svg" width={24} height={24} alt="Practice icon" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Practice</p>
              <p className="text-xs text-gray-600">Build safely</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
              <Image src="/icon-connect.svg" width={24} height={24} alt="Connect icon" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Connect</p>
              <p className="text-xs text-gray-600">Meetups by interest</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
              <Image src="/icon-reflect.svg" width={24} height={24} alt="Reflect icon" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Reflect</p>
              <p className="text-xs text-gray-600">Celebrate & refine</p>
            </div>
          </div>
        </div>
      </div>

      <SplitView
        preset="dual"
        left={
          <div className="luvler-card">
            <h3 className="font-semibold text-gray-900 mb-2">Start here</h3>
            <div className="grid gap-3">
              <Link href="/companion/friends/explore" className="px-3 py-2 rounded-lg border hover:border-primary-300">Explore what friendship means</Link>
              <Link href="/companion/friends/practice" className="px-3 py-2 rounded-lg border hover:border-primary-300">Practice at home</Link>
              <Link href="/companion/friends/meetups" className="px-3 py-2 rounded-lg border hover:border-primary-300">Find meetups</Link>
            </div>
          </div>
        }
        center={
          <div className="grid md:grid-cols-2 gap-6">
            {friendModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <Link key={index} href={module.path} className="group block">
                  <div className="luvler-card group-hover:shadow-lg transition-all duration-200">
                    <div className="flex items-start gap-4">
                      <div className={`${module.bgColor} p-3 rounded-xl group-hover:scale-105 transition-transform`}>
                        <Icon className={`w-6 h-6 ${module.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{module.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{module.description}</p>
                        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary-600 group-hover:text-primary-700">
                          <span>Start</span>
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        }
      />
    </div>
  );
}

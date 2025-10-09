'use client';

import Image from 'next/image';
import { Heart, BookOpen, Home } from 'lucide-react';
import { UserButton } from '@clerk/nextjs'

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export function Header({
  title = "ABA Goal Setting Tool",
  subtitle,
  showBackButton = false,
  onBackClick
}: HeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <button
                onClick={onBackClick}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline transition-all"
              >
                <Home className="w-4 h-4" />
                Back to start
              </button>
            )}
            <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-2 rounded-2xl">
              <Image src="/logo.png" width={28} height={28} alt="" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-display">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" width={24} height={24} alt="" />
              <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent font-display">Luvler</span>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProgressHeaderProps {
  currentStage: number;
  totalStages: number;
  stageName: string;
  mode?: 'clinician' | 'user';
  onModeToggle?: (mode: 'clinician' | 'user') => void;
  onDemo?: () => void;
}

export function ProgressHeader({
  currentStage,
  totalStages,
  stageName,
  mode = 'clinician',
  onModeToggle,
  onDemo
}: ProgressHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-3 rounded-2xl">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-display">
                ABA Goal Setting Tool
              </h1>
              {/* Removed redundant stage counter; icon-only stepper remains elsewhere */}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Mode Toggle */}
            {onModeToggle && (
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-2xl p-1">
                <button
                  onClick={() => onModeToggle('clinician')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm ${
                    mode === 'clinician'
                      ? 'bg-white dark:bg-gray-800 text-primary-700 shadow-sm font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  👔 Clinician
                </button>
                <button
                  onClick={() => onModeToggle('user')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm ${
                    mode === 'user'
                      ? 'bg-white dark:bg-gray-800 text-secondary-700 shadow-sm font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  👨‍👩‍👧 Parent
                </button>
              </div>
            )}

            {onDemo && (
              <button
                onClick={onDemo}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-600 text-white rounded-2xl hover:from-primary-600 hover:to-secondary-700 transition-all shadow-lg text-sm font-medium"
              >
                ✨ Demo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

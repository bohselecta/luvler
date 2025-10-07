'use client';

import { Check } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ProgressIndicatorProps {
  stages: Array<{
    id: number;
    name: string;
    icon: LucideIcon;
  }>;
  currentStage: number;
  className?: string;
}

export function ProgressIndicator({ stages, currentStage, className = "" }: ProgressIndicatorProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {stages.map((stage, index) => (
        <div key={stage.id} className="flex flex-col items-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            index < currentStage
              ? 'bg-success-500 text-white'
              : index === currentStage
              ? 'bg-primary-600 text-white ring-4 ring-primary-200'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
          }`}>
            {index < currentStage ? (
              <Check className="w-6 h-6" />
            ) : (
              <stage.icon className="w-6 h-6" />
            )}
          </div>
          <span className={`text-xs mt-2 font-medium hidden sm:block ${
            index === currentStage ? 'text-primary-600' : 'text-gray-600 dark:text-gray-400'
          }`}>
            {stage.name}
          </span>
          {index < stages.length - 1 && (
            <div className={`flex-1 h-1 mx-3 transition-all ${
              index < currentStage ? 'bg-success-500' : 'bg-gray-200 dark:bg-gray-700'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}

interface StepProgressProps {
  completed: number;
  total: number;
  showLabels?: boolean;
  className?: string;
}

export function StepProgress({ completed, total, showLabels = true, className = "" }: StepProgressProps) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className={`space-y-3 ${className}`}>
      {showLabels && (
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900 dark:text-gray-100">Your Progress</h3>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {completed} of {total} done
          </span>
        </div>
      )}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
        <div
          className="bg-primary-500 h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ message = "Loading...", size = 'md' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className={`${sizeClasses[size]} border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4`} />
      <p className="text-gray-600 dark:text-gray-400 text-sm">{message}</p>
    </div>
  );
}

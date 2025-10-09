'use client';

import { useState, useEffect } from 'react';
import {
  Heart,
  Home,
  Moon,
  Sun,
  Type,
  CheckCircle2,
  Circle,
  RotateCcw,
  Sparkles,
  Lightbulb,
  Clock,
  Settings
} from 'lucide-react';
import { SelfAdvocacyGoal, SimpleStep, UserPreferences, TextSize } from '@/lib/types';
import { generateDemoSteps, buildSelfAdvocacyPrompt } from '@/lib/ai-prompts';
import { getProcessingModalities, getSpecialInterests } from '@/lib/personalization';

export default function SelfAdvocacyPage() {
  const [currentGoal, setCurrentGoal] = useState<SelfAdvocacyGoal | null>(null);
  const [userGoal, setUserGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showAllSteps, setShowAllSteps] = useState(false);

  // Accessibility preferences
  const [preferences, setPreferences] = useState<UserPreferences>({
    showAllSteps: false,
    reducedMotion: false,
    darkMode: false,
    textSize: 'normal',
    reminderPreference: 'none'
  });

  // Demo steps for testing
  const DEMO_STEPS: SimpleStep[] = [
    {
      id: '1',
      order: 1,
      instruction: 'Find a quiet space where you can focus',
      isCompleted: false,
      estimatedMinutes: 2,
      accommodationTip: 'If noise is distracting, use headphones with calming music or white noise'
    },
    {
      id: '2',
      order: 2,
      instruction: 'Get a notebook and pen, or open a notes app',
      isCompleted: false,
      estimatedMinutes: 1,
      accommodationTip: 'Having your tools ready helps you start'
    },
    {
      id: '3',
      order: 3,
      instruction: 'Write down the main thing you want to accomplish',
      isCompleted: false,
      estimatedMinutes: 3,
      accommodationTip: 'Keep it simple - just one sentence is enough'
    },
    {
      id: '4',
      order: 4,
      instruction: 'Break that thing into 3-5 smaller actions',
      isCompleted: false,
      estimatedMinutes: 5,
      accommodationTip: 'Each action should be something you can do in one sitting'
    },
    {
      id: '5',
      order: 5,
      instruction: 'Pick the first action and start working on it',
      isCompleted: false,
      estimatedMinutes: 15,
      accommodationTip: 'Set a timer if that helps you focus. 15-25 minutes is a good length.'
    },
    {
      id: '6',
      order: 6,
      instruction: 'Take a break when you finish (or when you need one)',
      isCompleted: false,
      estimatedMinutes: 5,
      accommodationTip: 'Breaks are productive. Do something you enjoy for a few minutes.'
    }
  ];

  const handleGenerateSteps = async () => {
    if (typeof window !== 'undefined' && !localStorage.getItem('luvler_consent_v1')) {
      alert('Please review and accept Informed Use before generating a plan.')
      window.location.href = '/consent'
      return
    }
    if (!userGoal.trim()) {
      alert('Please enter what you want to get done');
      return;
    }

    setIsGenerating(true);

    try {
      // Get user's personalization context
      const modalities = getProcessingModalities();
      const specialInterests = getSpecialInterests();

      // Try AI generation first
      if (process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || true) { // Always try for demo
        try {
          const prompt = buildSelfAdvocacyPrompt(userGoal.trim(), {
            processingModalities: modalities,
            specialInterests: specialInterests,
            taskType: 'self-advocacy'
          });

          // In a real implementation, this would call an API
          // For now, we'll simulate and use enhanced demo data
          await new Promise(resolve => setTimeout(resolve, 2000));

          const personalizedSteps = generateDemoSteps(userGoal.trim());

          const newGoal: SelfAdvocacyGoal = {
            id: `goal-${Date.now()}`,
            userId: 'demo-user',
            userGoal: userGoal.trim(),
            urgency: 'now',
            steps: personalizedSteps,
            accommodations: [
              'Take breaks when needed',
              'Use your preferred lighting',
              'Have water or snacks nearby',
              modalities.includes('visual') ? 'Use visual timers or checklists' : '',
              modalities.includes('kinesthetic') ? 'Incorporate movement breaks' : '',
              modalities.includes('narrative') ? 'Frame progress as a story' : ''
            ].filter(Boolean),
            estimatedTime: 'About 30 minutes total',
            completedSteps: [],
            startedAt: new Date(),
            preferences: { ...preferences },
            celebrationMessage: 'You completed all the steps! Great work taking charge of your goals.',
            achievements: []
          };

          setCurrentGoal(newGoal);
          setCurrentStepIndex(0);
          setIsGenerating(false);
          return;
        } catch (aiError) {
          console.warn('AI generation failed, falling back to demo:', aiError);
        }
      }

      // Fallback to basic demo
      const newGoal: SelfAdvocacyGoal = {
        id: `goal-${Date.now()}`,
        userId: 'demo-user',
        userGoal: userGoal.trim(),
        urgency: 'now',
        steps: DEMO_STEPS,
        accommodations: [
          'Take breaks when needed',
          'Use your preferred lighting',
          'Have water or snacks nearby'
        ],
        estimatedTime: 'About 30 minutes total',
        completedSteps: [],
        startedAt: new Date(),
        preferences: { ...preferences },
        celebrationMessage: 'You completed all the steps! Great work taking charge of your goals.',
        achievements: []
      };

      setCurrentGoal(newGoal);
      setCurrentStepIndex(0);
    } catch (error) {
      console.error('Error generating steps:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCompleteStep = (stepId: string) => {
    if (!currentGoal) return;

    const updatedSteps = currentGoal.steps.map(step =>
      step.id === stepId ? { ...step, isCompleted: true, completedAt: new Date() } : step
    );

    const updatedGoal = {
      ...currentGoal,
      steps: updatedSteps,
      completedSteps: [...currentGoal.completedSteps, stepId]
    };

    setCurrentGoal(updatedGoal);

    // Move to next incomplete step
    const nextIncompleteIndex = updatedSteps.findIndex(s => !s.isCompleted);
    if (nextIncompleteIndex !== -1) {
      setCurrentStepIndex(nextIncompleteIndex);
    }
  };

  const toggleStepCompletion = (stepId: string) => {
    if (!currentGoal) return;

    const updatedSteps = currentGoal.steps.map(step =>
      step.id === stepId ? { ...step, isCompleted: !step.isCompleted } : step
    );

    const updatedGoal = {
      ...currentGoal,
      steps: updatedSteps,
      completedSteps: updatedSteps.filter(s => s.isCompleted).map(s => s.id)
    };

    setCurrentGoal(updatedGoal);
  };

  const completedCount = currentGoal?.steps.filter(s => s.isCompleted).length || 0;
  const progressPercent = currentGoal ? (completedCount / currentGoal.steps.length) * 100 : 0;

  // Theme classes
  const bgColor = preferences.darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textColor = preferences.darkMode ? 'text-gray-100' : 'text-gray-900';
  const cardBg = preferences.darkMode ? 'bg-gray-800' : 'bg-white';
  const borderColor = preferences.darkMode ? 'border-gray-700' : 'border-gray-200';

  const textSizeClass = preferences.textSize === 'large' ? 'text-lg' : preferences.textSize === 'xlarge' ? 'text-xl' : 'text-base';

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} transition-colors`}>
      {/* Header */}
      <div className={`${cardBg} border-b ${borderColor} sticky top-0 z-10`}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-sm hover:underline transition-all"
            >
              <Home className="w-4 h-4" />
              Back to start
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setPreferences({...preferences, darkMode: !preferences.darkMode})}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title={preferences.darkMode ? "Light mode" : "Dark mode"}
              >
                {preferences.darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => {
                  const sizes: TextSize[] = ['normal', 'large', 'xlarge'];
                  const currentIndex = sizes.indexOf(preferences.textSize);
                  const nextIndex = (currentIndex + 1) % sizes.length;
                  setPreferences({...preferences, textSize: sizes[nextIndex]});
                }}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Text size"
              >
                <Type className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {!currentGoal ? (
          // Initial Input
          <div className="space-y-8">
            <div className={`${cardBg} rounded-3xl p-8 border ${borderColor} shadow-lg`}>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Heart className="w-4 h-4" />
                  Your Personal Assistant
                </div>
                <h1 className={`text-4xl font-bold mb-4 ${textSizeClass}`}>
                  What do you want to get done?
                </h1>
                <p className={`text-gray-600 dark:text-gray-400 ${textSizeClass} leading-relaxed`}>
                  Tell me what you need to do, and I'll break it down into clear, manageable steps you can follow at your own pace.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className={`block font-medium mb-3 ${textSizeClass}`}>
                    Your goal
                  </label>
                  <textarea
                    value={userGoal}
                    onChange={(e) => setUserGoal(e.target.value)}
                    placeholder="Example: I need to organize my workspace"
                    className={`w-full px-4 py-4 border-2 ${borderColor} rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200 ${textSizeClass} resize-none`}
                    rows={4}
                  />
                </div>

                <button
                  onClick={handleGenerateSteps}
                  disabled={isGenerating || !userGoal.trim()}
                  className={`w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg ${textSizeClass}`}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating your steps...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Create my step-by-step plan
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className={`${cardBg} rounded-3xl p-6 border ${borderColor} shadow-lg`}>
              <h3 className={`font-bold mb-4 ${textSizeClass}`}>Examples of things I can help with:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Clean my room",
                  "Make a grocery list",
                  "Write an email",
                  "Prepare for a meeting",
                  "Learn a new skill",
                  "Plan my week"
                ].map((example, i) => (
                  <button
                    key={i}
                    onClick={() => setUserGoal(example)}
                    className={`text-left p-4 rounded-xl border ${borderColor} hover:bg-primary-50 dark:hover:bg-primary-900 hover:border-primary-500 transition-all ${textSizeClass}`}
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Steps Display
          <div className="space-y-8">
            {/* Progress */}
            {preferences.showAllSteps && (
              <div className={`${cardBg} rounded-3xl p-6 border ${borderColor} shadow-lg`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`font-bold ${textSizeClass}`}>Your Progress</h2>
                  <span className={`text-sm font-medium ${textSizeClass}`}>
                    {completedCount} of {currentGoal.steps.length} done
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-primary-500 h-4 rounded-full transition-all duration-500"
                    style={{width: `${progressPercent}%`}}
                  />
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => setShowAllSteps(!showAllSteps)}
                className={`flex items-center gap-2 px-6 py-3 ${cardBg} border ${borderColor} rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all ${textSizeClass}`}
              >
                {showAllSteps ? (
                  <>Show one step at a time</>
                ) : (
                  <>Show all steps</>
                )}
              </button>

              <button
                onClick={() => {
                  setCurrentGoal(null);
                  setUserGoal('');
                }}
                className={`flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all ${textSizeClass}`}
              >
                <RotateCcw className="w-4 h-4" />
                Start over
              </button>
            </div>

            {/* Steps */}
            <div className="space-y-6">
              {showAllSteps ? (
                // All Steps View
                currentGoal.steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`${cardBg} rounded-3xl p-8 border-2 ${step.isCompleted ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : borderColor} shadow-lg`}
                  >
                    <div className="flex items-start gap-6">
                      <button
                        onClick={() => toggleStepCompletion(step.id)}
                        className="flex-shrink-0 mt-2"
                      >
                        {step.isCompleted ? (
                          <CheckCircle2 className="w-10 h-10 text-primary-500" />
                        ) : (
                          <Circle className="w-10 h-10 text-gray-400 hover:text-primary-500 transition-colors" />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`font-bold text-gray-500 dark:text-gray-400 ${textSizeClass}`}>
                            Step {index + 1}
                          </span>
                          {step.estimatedMinutes && (
                            <span className="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              ~{step.estimatedMinutes} min
                            </span>
                          )}
                        </div>
                        <p className={`font-medium mb-3 ${step.isCompleted ? 'line-through text-gray-500' : ''} ${textSizeClass} leading-relaxed`}>
                          {step.instruction}
                        </p>
                        {step.accommodationTip && !step.isCompleted && (
                          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                            <div className="flex items-start gap-2">
                              <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                              <p className={`text-blue-900 dark:text-blue-300 ${textSizeClass}`}>
                                {step.accommodationTip}
                              </p>
                            </div>
                          </div>
                        )}
                        {(step as any).contextualReason && (
                          <details className="mt-3">
                            <summary className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer transition-colors">
                              ▼ Why this matters (click to expand)
                            </summary>
                            <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                              <p className={`text-gray-700 dark:text-gray-300 ${textSizeClass}`}>
                                {(step as any).contextualReason}
                              </p>
                            </div>
                          </details>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // One Step at a Time View
                <div className={`${cardBg} rounded-3xl p-12 border-2 border-primary-500 shadow-xl`}>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                      Step {currentStepIndex + 1} of {currentGoal.steps.length}
                    </div>
                    <h2 className={`text-3xl font-bold mb-4 ${textSizeClass}`}>
                      {currentGoal.steps[currentStepIndex]?.instruction}
                    </h2>
                    {currentGoal.steps[currentStepIndex]?.estimatedMinutes && (
                      <p className="text-gray-600 dark:text-gray-400">
                        This usually takes about {currentGoal.steps[currentStepIndex].estimatedMinutes} minutes
                      </p>
                    )}
                  </div>

                  {currentGoal.steps[currentStepIndex]?.accommodationTip && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <p className={`text-blue-900 dark:text-blue-300 ${textSizeClass} leading-relaxed`}>
                          {currentGoal.steps[currentStepIndex].accommodationTip}
                        </p>
                      </div>
                    </div>
                  )}

                  {(currentGoal.steps[currentStepIndex] as any)?.contextualReason && (
                    <details className="mb-8">
                      <summary className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer transition-colors flex items-center gap-2">
                        <span>▼ Why this matters (click to expand)</span>
                      </summary>
                      <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <p className={`text-gray-700 dark:text-gray-300 ${textSizeClass} leading-relaxed`}>
                          {(currentGoal.steps[currentStepIndex] as any).contextualReason}
                        </p>
                      </div>
                    </details>
                  )}

                  <button
                    onClick={() => handleCompleteStep(currentGoal.steps[currentStepIndex].id)}
                    className={`w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl transition-all font-medium shadow-lg ${textSizeClass}`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    I completed this step
                  </button>

                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
                      disabled={currentStepIndex === 0}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentStepIndex(Math.min(currentGoal.steps.length - 1, currentStepIndex + 1))}
                      disabled={currentStepIndex === currentGoal.steps.length - 1}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Completion Celebration */}
            {completedCount === currentGoal.steps.length && completedCount > 0 && (
              <div className={`${cardBg} rounded-3xl p-12 border-2 border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-center shadow-xl`}>
                <div className="text-8xl mb-6">🎉</div>
                <h2 className={`text-4xl font-bold text-primary-700 dark:text-primary-300 mb-4 ${textSizeClass}`}>
                  You did it!
                </h2>
                <p className={`text-primary-600 dark:text-primary-400 mb-8 ${textSizeClass} leading-relaxed`}>
                  {currentGoal.celebrationMessage}
                </p>
                <button
                  onClick={() => {
                    setCurrentGoal(null);
                    setUserGoal('');
                  }}
                  className={`px-8 py-4 bg-primary-500 text-white rounded-2xl hover:bg-primary-600 transition-all font-medium ${textSizeClass}`}
                >
                  Start a new goal
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Heart, BookOpen, Users, Sparkles, ChevronRight, ArrowLeft } from 'lucide-react';
import { FriendshipStep } from '@/lib/types';
import { getProcessingModalities, getSpecialInterests } from '@/lib/personalization';

type FriendshipPhase = 'understanding' | 'practice' | 'opportunities' | 'confidence';

interface PhaseConfig {
  id: FriendshipPhase;
  title: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
}

export function FriendshipPlanner({
  defaultTitle,
  defaultInterests,
  autoGenerate,
}: {
  defaultTitle?: string;
  defaultInterests?: string[];
  autoGenerate?: boolean;
}) {
  const [currentPhase, setCurrentPhase] = useState<FriendshipPhase>('understanding');
  const [title, setTitle] = useState(defaultTitle || 'Make a friend who likes Pokemon')
  const [interests, setInterests] = useState<string>((defaultInterests && defaultInterests.join(', ')) || 'pokemon, games')
  const [steps, setSteps] = useState<FriendshipStep[]>([])
  const [loading, setLoading] = useState(false)
  const [completedPhases, setCompletedPhases] = useState<Set<FriendshipPhase>>(new Set())

  const phases: PhaseConfig[] = [
    {
      id: 'understanding',
      title: 'Understanding',
      description: 'Explore what friendship means to you',
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      id: 'practice',
      title: 'Practice',
      description: 'Build skills through safe exercises',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'opportunities',
      title: 'Opportunities',
      description: 'Find structured social connections',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'confidence',
      title: 'Confidence',
      description: 'Track progress and celebrate growth',
      icon: Sparkles,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  useEffect(() => {
    setTitle(defaultTitle || 'Make a friend who likes Pokemon')
    setInterests((defaultInterests && defaultInterests.join(', ')) || 'pokemon, games')
  }, [defaultTitle, defaultInterests])

  useEffect(() => {
    if (!autoGenerate) return
    generatePathway()
  }, [autoGenerate, defaultTitle, defaultInterests])

  const generatePathway = async () => {
    setLoading(true)
    try {
      // Get user's processing modalities for personalization
      const modalities = getProcessingModalities()
      const specialInterests = getSpecialInterests()

      const res = await fetch('/api/pathways', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          interests: interests.split(',').map(s => s.trim()),
          processingModalities: modalities,
          specialInterests: specialInterests,
          includeContextualReasons: true
        })
      })
      const d = await res.json()
      if (d.steps) {
        setSteps(d.steps)
        // Mark understanding phase as completed when we generate steps
        setCompletedPhases(new Set(['understanding']))
      }
    } finally {
      setLoading(false)
    }
  }

  const getStepsForPhase = (phase: FriendshipPhase) => {
    return steps.filter(step => step.phase === phase)
  }

  const markPhaseComplete = (phase: FriendshipPhase) => {
    const newCompleted = new Set(completedPhases)
    newCompleted.add(phase)
    setCompletedPhases(newCompleted)

    // Auto-advance to next phase if available
    const currentIndex = phases.findIndex(p => p.id === phase)
    if (currentIndex < phases.length - 1) {
      setCurrentPhase(phases[currentIndex + 1].id)
    }
  }

  const currentPhaseConfig = phases.find(p => p.id === currentPhase)!
  const phaseSteps = getStepsForPhase(currentPhase)

  return (
    <div className="space-y-6">
      {/* Phase Navigation */}
      <div className="flex items-center justify-center gap-2 md:gap-4">
        {phases.map((phase, index) => {
          const Icon = phase.icon
          const isCompleted = completedPhases.has(phase.id)
          const isCurrent = phase.id === currentPhase

          return (
            <div key={phase.id} className="flex items-center">
              <button
                onClick={() => setCurrentPhase(phase.id)}
                className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                  isCurrent ? 'bg-primary-50 border-2 border-primary-200' :
                  isCompleted ? 'bg-green-50 border-2 border-green-200' :
                  'bg-gray-50 border-2 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className={`${phase.bgColor} p-2 rounded-lg mb-2`}>
                  <Icon className={`w-4 h-4 ${isCurrent ? phase.color : isCompleted ? 'text-green-600' : 'text-gray-400'}`} />
                </div>
                <span className={`text-xs font-medium ${isCurrent ? 'text-primary-700' : isCompleted ? 'text-green-700' : 'text-gray-600'}`}>
                  {phase.title}
                </span>
              </button>
              {index < phases.length - 1 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1 hidden md:block" />
              )}
            </div>
          )
        })}
      </div>

      {/* Current Phase Content */}
      <div className="luvler-card">
        <div className="flex items-start gap-4 mb-6">
          <div className={`${currentPhaseConfig.bgColor} p-3 rounded-xl flex-shrink-0`}>
            <currentPhaseConfig.icon className={`w-6 h-6 ${currentPhaseConfig.color}`} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{currentPhaseConfig.title} Phase</h3>
            <p className="text-gray-600 mt-1">{currentPhaseConfig.description}</p>
          </div>
        </div>

        {/* Goal Input (Understanding Phase) */}
        {currentPhase === 'understanding' && (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What friendship goal would you like to work toward?
              </label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="luvler-input w-full"
                placeholder="e.g., Make a friend who likes Pokemon"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shared interests to build around
              </label>
              <input
                value={interests}
                onChange={e => setInterests(e.target.value)}
                className="luvler-input w-full"
                placeholder="e.g., pokemon, games, drawing"
              />
            </div>
            <button
              onClick={generatePathway}
              disabled={loading}
              className="luvler-button-primary w-full"
            >
              {loading ? 'Creating your pathway...' : 'Generate Friendship Pathway'}
            </button>
          </div>
        )}

        {/* Phase Steps */}
        {phaseSteps.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">
              {phaseSteps.length} step{phaseSteps.length !== 1 ? 's' : ''} for this phase:
            </h4>
            <div className="space-y-3">
              {phaseSteps.map((step, index) => (
                <div key={step.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary-100 text-primary-700 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{step.instruction}</p>
                      {step.tip && (
                        <p className="text-gray-600 text-sm mt-2 italic">💡 {step.tip}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {!completedPhases.has(currentPhase) && (
              <button
                onClick={() => markPhaseComplete(currentPhase)}
                className="luvler-button-primary w-full mt-4"
              >
                Complete {currentPhaseConfig.title} Phase
              </button>
            )}
          </div>
        )}

        {/* Phase-specific guidance */}
        {currentPhase === 'understanding' && steps.length === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">What happens in Understanding?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Explore what friendship means to you personally</li>
              <li>• Think about the kinds of connections that feel good</li>
              <li>• Consider what makes social interactions feel safe</li>
              <li>• This is a private, judgment-free space</li>
            </ul>
          </div>
        )}

        {currentPhase === 'practice' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">Practice Phase Tips</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Start small and build confidence gradually</li>
              <li>• Practice in low-pressure situations first</li>
              <li>• Focus on the process, not perfection</li>
              <li>• Your pace and comfort level matter most</li>
            </ul>
          </div>
        )}

        {currentPhase === 'opportunities' && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 mb-2">Finding Opportunities</h4>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Look for groups centered around your special interests</li>
              <li>• Start with virtual meetups if in-person feels overwhelming</li>
              <li>• Set personal goals for each social interaction</li>
              <li>• Remember: showing up is a success, regardless of outcome</li>
            </ul>
          </div>
        )}

        {currentPhase === 'confidence' && (
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
            <h4 className="font-medium text-pink-900 mb-2">Building Confidence</h4>
            <ul className="text-sm text-pink-800 space-y-1">
              <li>• Track your attempts, not just "successes"</li>
              <li>• Celebrate small wins and brave moments</li>
              <li>• Reflect on what you're learning about yourself</li>
              <li>• Your journey is uniquely yours - honor that</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}



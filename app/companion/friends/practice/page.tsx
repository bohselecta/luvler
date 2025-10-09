'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Play, CheckCircle, RotateCcw, Sparkles, MessageCircle, Users, Mic } from 'lucide-react';
import { logClientEvent } from '@/components/shared/analytics';

export default function PracticePage() {
  const router = useRouter();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());

  const practiceExercises = [
    {
      title: "Mirror Conversation Practice",
      description: "Practice social skills in a low-pressure environment",
      icon: MessageCircle,
      difficulty: "Beginner",
      duration: "5-10 minutes",
      instructions: [
        "Stand in front of a mirror in a quiet space",
        "Smile and say 'Hello! How are you doing?'",
        "Wait 3 seconds, then respond as if they answered",
        "Practice asking a follow-up question",
        "Try saying goodbye and waving"
      ],
      tips: [
        "Start slow and focus on clear pronunciation",
        "Notice how your facial expressions change",
        "It's okay if it feels awkward - that's normal!",
        "Try different tones of voice"
      ]
    },
    {
      title: "Greeting Role-Play",
      description: "Practice basic social greetings with a trusted person or pet",
      icon: Users,
      difficulty: "Beginner",
      duration: "10-15 minutes",
      instructions: [
        "Find a trusted person, family member, or even practice with a pet",
        "Start with eye contact and a smile",
        "Say 'Hi [name]! It's nice to see you!'",
        "Ask 'How are you doing today?'",
        "Listen to their response and ask one follow-up question",
        "End with 'It was great talking to you!'"
      ],
      tips: [
        "Choose someone you feel comfortable with",
        "Focus on listening more than talking",
        "Remember to smile and use their name",
        "If it doesn't go perfectly, that's okay - practice makes it better"
      ]
    },
    {
      title: "Conversation Starters",
      description: "Practice starting conversations about shared interests",
      icon: Sparkles,
      difficulty: "Intermediate",
      duration: "15-20 minutes",
      instructions: [
        "Choose a special interest you know they share",
        "Start with: 'I really like [interest]. What do you think?'",
        "Listen to their response carefully",
        "Ask follow-up questions: 'Why do you like that?' or 'What's your favorite part?'",
        "Share one related experience: 'I remember when...'",
        "Find a natural way to end the conversation"
      ],
      tips: [
        "Shared interests make conversations easier",
        "Ask open-ended questions (what, why, how)",
        "Take turns talking - don't dominate the conversation",
        "It's okay to have quiet moments"
      ]
    },
    {
      title: "Exit Strategy Practice",
      description: "Learn graceful ways to end conversations",
      icon: Mic,
      difficulty: "Intermediate",
      duration: "10 minutes",
      instructions: [
        "Practice different ways to end conversations:",
        "'It was really nice talking to you! I need to go now.'",
        "'I enjoyed our conversation. Maybe we can talk again sometime?'",
        "'Thanks for sharing that with me. Have a great day!'",
        "'I should get going, but this was fun!'"
      ],
      tips: [
        "Always be polite and positive",
        "Give a brief reason if it feels right",
        "Smile and make eye contact when saying goodbye",
        "Practice makes it feel more natural"
      ]
    }
  ];

  const markComplete = (exerciseIndex: number) => {
    const newCompleted = new Set(completedExercises);
    newCompleted.add(exerciseIndex);
    setCompletedExercises(newCompleted);
    try {
      const ex = practiceExercises[exerciseIndex]
      logClientEvent('practice.completed', { title: ex.title, difficulty: ex.difficulty })
    } catch {}
  };

  const resetExercise = (exerciseIndex: number) => {
    const newCompleted = new Set(completedExercises);
    newCompleted.delete(exerciseIndex);
    setCompletedExercises(newCompleted);
  };

  const currentExerciseData = practiceExercises[currentExercise];
  const Icon = currentExerciseData.icon;
  const isCompleted = completedExercises.has(currentExercise);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.push('/companion/friends')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Friendship Builder
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Practice at Home</h1>
        <p className="text-gray-700">Build social confidence through safe, private exercises you can do anytime.</p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto">
        {practiceExercises.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentExercise(index)}
            className={`flex-shrink-0 w-3 h-3 rounded-full transition-colors ${
              index === currentExercise ? 'bg-primary-500' :
              completedExercises.has(index) ? 'bg-green-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Current Exercise */}
      <div className="luvler-card mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className={`p-3 rounded-xl flex-shrink-0 ${
            isCompleted ? 'bg-green-100' : 'bg-primary-100'
          }`}>
            <Icon className={`w-6 h-6 ${
              isCompleted ? 'text-green-600' : 'text-primary-600'
            }`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-semibold text-gray-900">{currentExerciseData.title}</h2>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                currentExerciseData.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                currentExerciseData.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {currentExerciseData.difficulty}
              </span>
              <span className="text-sm text-gray-500">{currentExerciseData.duration}</span>
            </div>
            <p className="text-gray-700 mb-4">{currentExerciseData.description}</p>

            {isCompleted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Completed!</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Instructions:</h3>
          <ol className="space-y-2">
            {currentExerciseData.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700">
                <span className="bg-primary-100 text-primary-700 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                {instruction}
              </li>
            ))}
          </ol>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Helpful Tips:
          </h4>
          <ul className="space-y-1 text-sm text-blue-800">
            {currentExerciseData.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {isCompleted ? (
            <>
              <button
                onClick={() => resetExercise(currentExercise)}
                className="flex-1 luvler-button-secondary flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Practice Again
              </button>
              {currentExercise < practiceExercises.length - 1 && (
                <button
                  onClick={() => setCurrentExercise(currentExercise + 1)}
                  className="luvler-button-primary"
                >
                  Next Exercise →
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => markComplete(currentExercise)}
              className="w-full luvler-button-primary flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Mark as Completed
            </button>
          )}
        </div>
      </div>

      {/* Exercise Navigation */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {practiceExercises.map((exercise, index) => {
          const ExerciseIcon = exercise.icon;
          const isActive = index === currentExercise;
          const completed = completedExercises.has(index);

          return (
            <button
              key={index}
              onClick={() => setCurrentExercise(index)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isActive ? 'border-primary-500 bg-primary-50' :
                completed ? 'border-green-500 bg-green-50' :
                'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                completed ? 'bg-green-100' : 'bg-primary-100'
              }`}>
                <ExerciseIcon className={`w-4 h-4 ${
                  completed ? 'text-green-600' : 'text-primary-600'
                }`} />
              </div>
              <h4 className={`font-medium mb-1 ${
                isActive ? 'text-primary-900' : completed ? 'text-green-900' : 'text-gray-900'
              }`}>
                {exercise.title}
              </h4>
              <p className="text-xs text-gray-600 mb-2">{exercise.difficulty} • {exercise.duration}</p>
              {completed && (
                <div className="flex items-center gap-1 text-green-700">
                  <CheckCircle className="w-3 h-3" />
                  <span className="text-xs">Done</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Encouragement */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-100">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Remember</h3>
          <p className="text-gray-700 mb-4 max-w-2xl mx-auto">
            Practice at home is one of the most effective ways to build social confidence.
            These exercises are designed to be safe, repeatable, and confidence-building.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/70 rounded-lg p-4">
              <div className="font-medium text-gray-900 mb-1">Go at Your Pace</div>
              <div className="text-gray-600">There's no rush. Practice when you feel ready.</div>
            </div>
            <div className="bg-white/70 rounded-lg p-4">
              <div className="font-medium text-gray-900 mb-1">Track Your Progress</div>
              <div className="text-gray-600">Notice how conversations feel easier over time.</div>
            </div>
            <div className="bg-white/70 rounded-lg p-4">
              <div className="font-medium text-gray-900 mb-1">Celebrate Effort</div>
              <div className="text-gray-600">Every practice session is a win, regardless of outcome.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

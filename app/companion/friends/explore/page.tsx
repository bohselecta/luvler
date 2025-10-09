'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Users, MessageCircle, Sparkles, ArrowLeft, BookOpen } from 'lucide-react';

export default function ExplorePage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const explorationQuestions = [
    {
      title: "What does friendship mean to you?",
      subtitle: "Take your time to think about this. There's no right answer.",
      prompt: "Friendship can mean different things to different people. What does it look like in your life?",
      examples: [
        "Having someone to share interests with",
        "Someone who understands how I think",
        "Being able to be yourself around them",
        "Having fun together doing things you both enjoy"
      ]
    },
    {
      title: "What kinds of friendships appeal to you?",
      subtitle: "Different friendships serve different purposes.",
      prompt: "Think about the kinds of connections that would feel good to you.",
      examples: [
        "Sharing a special interest or hobby together",
        "Having someone to talk to about how you think",
        "Doing activities side by side (parallel play)",
        "Being part of a group with similar experiences"
      ]
    },
    {
      title: "What would make a friendship feel safe?",
      subtitle: "Safety is different for everyone.",
      prompt: "What would help you feel comfortable and yourself in a friendship?",
      examples: [
        "Being accepted for who you are",
        "Having clear expectations and boundaries",
        "Taking things at your own pace",
        "Being able to communicate your needs"
      ]
    }
  ];

  const [responses, setResponses] = useState<string[]>(new Array(explorationQuestions.length).fill(''));
  const [isComplete, setIsComplete] = useState(false);

  const handleNext = () => {
    if (currentQuestion < explorationQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (isComplete) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <button
            onClick={() => router.push('/companion/friends')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Friendship Builder
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Great exploration!</h1>
          <p className="text-gray-700">You've taken an important first step in understanding friendship on your terms.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="luvler-card">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              What's next?
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/companion/friends/practice')}
                className="w-full text-left p-3 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-colors"
              >
                <div className="font-medium text-gray-900">Practice at Home</div>
                <div className="text-sm text-gray-600">Build confidence through safe exercises</div>
              </button>
              <button
                onClick={() => router.push('/companion/friends/meetups')}
                className="w-full text-left p-3 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-colors"
              >
                <div className="font-medium text-gray-900">Find Meetups</div>
                <div className="text-sm text-gray-600">Connect with others who share your interests</div>
              </button>
            </div>
          </div>

          <div className="luvler-card">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-500" />
              Your friendship journey
            </h3>
            <div className="text-gray-700 space-y-2">
              <p>• You explored what friendship means to you</p>
              <p>• You thought about different types of connections</p>
              <p>• You considered what would make friendships feel safe</p>
              <p className="text-sm text-gray-600 mt-4">
                This foundation will help you build friendships that are right for you.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="bg-white p-3 rounded-xl shadow-sm">
              <BookOpen className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Remember</h3>
              <p className="text-gray-700 mb-4">
                Friendship is about finding people who make you feel good about being yourself.
                There's no rush, and it's okay to take things at your own pace.
              </p>
              <p className="text-sm text-gray-600">
                If you ever want to revisit these questions or explore more, you can come back anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = explorationQuestions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <button
          onClick={() => router.push('/companion/friends')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Friendship Builder
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Friendship — one clear step at a time</h1>
        <p className="text-gray-700">Try a step. Reflect. Then try it with a different person or place.</p>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / explorationQuestions.length) * 100}%` }}
            />
          </div>
          <span className="text-sm text-gray-600">
            {currentQuestion + 1} of {explorationQuestions.length}
          </span>
        </div>
      </div>

      <div className="luvler-card mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{question.title}</h1>
        <p className="text-gray-700 mb-6">{question.subtitle}</p>

        <div className="mb-6">
          <p className="text-gray-900 font-medium mb-3">{question.prompt}</p>
          <textarea
            value={responses[currentQuestion]}
            onChange={(e) => {
              const newResponses = [...responses];
              newResponses[currentQuestion] = e.target.value;
              setResponses(newResponses);
            }}
            placeholder="Take your time to think about this..."
            className="luvler-textarea w-full"
            rows={6}
          />
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-3">Some ideas to get you thinking:</p>
          <div className="flex flex-wrap gap-2">
            {question.examples.map((example, index) => (
              <button
                key={index}
                onClick={() => {
                  const newResponses = [...responses];
                  newResponses[currentQuestion] = example;
                  setResponses(newResponses);
                }}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="luvler-button-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="luvler-button-primary"
        >
          {currentQuestion === explorationQuestions.length - 1 ? 'Complete' : 'Next'}
        </button>
      </div>
    </div>
  );
}

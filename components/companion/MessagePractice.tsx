'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Send, RotateCcw, Lightbulb, CheckCircle, AlertCircle } from 'lucide-react';

interface MessagePracticeProps {
  onClose?: () => void;
  initialPrompt?: string;
}

interface FeedbackItem {
  type: 'positive' | 'suggestion' | 'concern';
  message: string;
  icon: any;
}

export function MessagePractice({ onClose, initialPrompt }: MessagePracticeProps) {
  const [currentStep, setCurrentStep] = useState<'prompt' | 'draft' | 'feedback' | 'reflect'>('prompt');
  const [prompt, setPrompt] = useState(initialPrompt || '');
  const [draftMessage, setDraftMessage] = useState('');
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [reflection, setReflection] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const samplePrompts = [
    "Say hello to someone in your Pokemon group and ask about their favorite card",
    "Share that you had a good day at school and ask how their day was",
    "Suggest going for a walk and ask if they'd like to join",
    "Share a fun fact about something you're interested in",
    "Ask someone about their weekend plans"
  ];

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
      setCurrentStep('draft');
    }
  }, [initialPrompt]);

  const handleSelectPrompt = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
    setCurrentStep('draft');
  };

  const handleAnalyzeMessage = async () => {
    if (!draftMessage.trim()) return;

    setIsAnalyzing(true);

    // Simulate AI analysis (in real app, this would call an API)
    setTimeout(() => {
      const analysis = analyzeMessage(draftMessage, prompt);
      setFeedback(analysis);
      setCurrentStep('feedback');
      setIsAnalyzing(false);
    }, 1500);
  };

  const analyzeMessage = (message: string, context: string): FeedbackItem[] => {
    const feedback: FeedbackItem[] = [];

    // Basic analysis logic (in real app, this would be AI-powered)
    if (message.length > 10) {
      feedback.push({
        type: 'positive',
        message: 'Good length - not too short, not overwhelming',
        icon: CheckCircle
      });
    }

    if (message.includes('?')) {
      feedback.push({
        type: 'positive',
        message: 'Includes a question - great for starting conversation!',
        icon: CheckCircle
      });
    }

    if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
      feedback.push({
        type: 'positive',
        message: 'Friendly greeting - helps create positive first impression',
        icon: CheckCircle
      });
    }

    // Suggestions
    feedback.push({
      type: 'suggestion',
      message: 'Consider adding something specific about yourself to make it more personal',
      icon: Lightbulb
    });

    if (message.length > 200) {
      feedback.push({
        type: 'concern',
        message: 'Message might be quite long - consider if a shorter version would work too',
        icon: AlertCircle
      });
    }

    return feedback;
  };

  const handleStartOver = () => {
    setCurrentStep('prompt');
    setPrompt('');
    setDraftMessage('');
    setFeedback([]);
    setReflection('');
  };

  const renderPrompt = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose a conversation starter</h3>
        <p className="text-gray-600 mb-4">
          Pick a scenario you'd like to practice, or enter your own situation.
        </p>

        <div className="space-y-3">
          {samplePrompts.map((samplePrompt, index) => (
            <button
              key={index}
              onClick={() => handleSelectPrompt(samplePrompt)}
              className="w-full text-left p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-900">{samplePrompt}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Or describe your own situation
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Tell my study partner I need to change our meeting time..."
            className="luvler-textarea w-full"
            rows={3}
          />
          <button
            onClick={() => prompt && setCurrentStep('draft')}
            disabled={!prompt.trim()}
            className="luvler-button-primary mt-3"
          >
            Practice This
          </button>
        </div>
      </div>
    </div>
  );

  const renderDraft = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Draft your message</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-blue-900 font-medium">Situation:</p>
          <p className="text-blue-800">{prompt}</p>
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Write your message
        </label>
        <textarea
          value={draftMessage}
          onChange={(e) => setDraftMessage(e.target.value)}
          placeholder="Type what you would say..."
          className="luvler-textarea w-full"
          rows={6}
        />

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setCurrentStep('prompt')}
            className="luvler-button-secondary"
          >
            Change Prompt
          </button>
          <button
            onClick={handleAnalyzeMessage}
            disabled={!draftMessage.trim() || isAnalyzing}
            className="luvler-button-primary flex-1"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Get Feedback
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  const renderFeedback = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Feedback on your message</h3>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <p className="text-gray-900 font-medium mb-2">Your message:</p>
          <p className="text-gray-800">"{draftMessage}"</p>
        </div>

        <div className="space-y-3">
          {feedback.map((item, index) => {
            const Icon = item.icon;
            const colorClasses = {
              positive: 'bg-green-50 border-green-200 text-green-900',
              suggestion: 'bg-blue-50 border-blue-200 text-blue-900',
              concern: 'bg-yellow-50 border-yellow-200 text-yellow-900'
            };

            return (
              <div key={index} className={`p-4 border rounded-lg ${colorClasses[item.type]}`}>
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{item.message}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setCurrentStep('draft')}
            className="luvler-button-secondary"
          >
            Edit Message
          </button>
          <button
            onClick={() => setCurrentStep('reflect')}
            className="luvler-button-primary flex-1"
          >
            Reflect & Continue
          </button>
        </div>
      </div>
    </div>
  );

  const renderReflection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Reflect on the practice</h3>
        <p className="text-gray-600 mb-4">
          Take a moment to think about what you learned and how you'll use this next time.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What did you notice about your message?
            </label>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="What worked well? What might you change next time?..."
              className="luvler-textarea w-full"
              rows={4}
            />
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">Practice Complete! 🎉</h4>
            <p className="text-sm text-green-800">
              You've successfully practiced a social interaction in a safe space.
              Each practice makes real conversations feel more comfortable.
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleStartOver}
            className="luvler-button-secondary flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Practice Another
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="luvler-button-primary flex-1"
            >
              Done for Now
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'prompt': return renderPrompt();
      case 'draft': return renderDraft();
      case 'feedback': return renderFeedback();
      case 'reflect': return renderReflection();
      default: return renderPrompt();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Anonymous Message Practice</h2>
        <p className="text-gray-600">
          Practice social messages safely without sending them. Get feedback to improve your communication skills.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {[
          { key: 'prompt', label: 'Choose' },
          { key: 'draft', label: 'Write' },
          { key: 'feedback', label: 'Feedback' },
          { key: 'reflect', label: 'Reflect' }
        ].map((step, index) => {
          const isCompleted = ['prompt', 'draft', 'feedback', 'reflect'].indexOf(currentStep) > index;
          const isCurrent = step.key === currentStep;

          return (
            <div key={step.key} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                isCompleted ? 'bg-green-500 text-white' :
                isCurrent ? 'bg-primary-500 text-white' :
                'bg-gray-200 text-gray-600'
              }`}>
                {isCompleted ? '✓' : index + 1}
              </div>
              <span className={`ml-2 text-sm ${isCurrent ? 'text-primary-700 font-medium' : 'text-gray-600'}`}>
                {step.label}
              </span>
              {index < 3 && (
                <div className={`w-8 h-0.5 ml-4 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="luvler-card">
        {renderCurrentStep()}
      </div>

      {/* Safety Notice */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <MessageCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Safe Practice Space</p>
            <p>Your messages are never sent or shared. This is just for you to practice and improve your communication skills.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

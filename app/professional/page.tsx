'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Users,
  Briefcase,
  BookOpen,
  RefreshCw,
  Download,
  ChevronRight,
  ChevronLeft,
  Check,
  AlertCircle,
  Lightbulb,
  Target,
  ClipboardCheck,
  TrendingUp,
  FileText,
  Menu,
  X,
  Heart,
  Home
} from 'lucide-react';
import { Goal, GoalMode, DemoGoalData } from '@/lib/types';

export default function ProfessionalToolPage() {
  const [mode, setMode] = useState<GoalMode>('clinician');
  const [currentStage, setCurrentStage] = useState(0);
  const [showChecklist, setShowChecklist] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Form state
  const [goalInput, setGoalInput] = useState('');
  const [age, setAge] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [domain, setDomain] = useState('');

  // Generated goal state
  const [generatedGoal, setGeneratedGoal] = useState<DemoGoalData | null>(null);

  const stages = [
    { id: 0, name: 'Goal Input', icon: Target },
    { id: 1, name: 'Analysis', icon: Sparkles },
    { id: 2, name: 'Task Planning', icon: ClipboardCheck },
    { id: 3, name: 'Implementation', icon: FileText },
    { id: 4, name: 'Tracking', icon: TrendingUp }
  ];

  const DEMO_DATA: DemoGoalData = {
    goalInput: "Help my 7-year-old son learn to wash his hands independently after using the bathroom",
    age: "7",
    skillLevel: "Can turn on water and wet hands, needs verbal prompts for all other steps",
    domain: "adaptive-behavior",

    smartGoal: {
      specific: "Student will independently complete the 8-step handwashing sequence after toileting",
      measurable: "90% accuracy (7/8 steps) without prompts across 3 consecutive trials per day",
      attainable: "Builds on existing skills (turns on water, wets hands). Prerequisites present.",
      relevant: "Critical self-care skill for health, hygiene, and independence",
      timeBound: "Within 12 weeks of systematic intervention"
    },

    taskSteps: [
      { id: 1, text: "Turn on water to lukewarm", prompt: "Gestural → Independent", mastery: "3/3 trials" },
      { id: 2, text: "Wet both hands under water", prompt: "Verbal → Independent", mastery: "3/3 trials" },
      { id: 3, text: "Apply soap (one pump)", prompt: "Model → Physical → Independent", mastery: "5/5 trials" },
      { id: 4, text: "Scrub for 20 seconds", prompt: "Model + song → Independent", mastery: "4/5 trials" },
      { id: 5, text: "Rinse hands thoroughly", prompt: "Gestural → Independent", mastery: "3/3 trials" },
      { id: 6, text: "Turn off water", prompt: "Gestural → Independent", mastery: "3/3 trials" },
      { id: 7, text: "Dry hands with towel", prompt: "Model → Independent", mastery: "3/3 trials" },
      { id: 8, text: "Dispose/hang towel", prompt: "Verbal → Independent", mastery: "3/3 trials" }
    ],

    implementation: {
      clinician: {
        method: "Backward Chaining with Total Task Presentation",
        dataCollection: "Daily task analysis data sheet (I/V/G/M/P prompting levels)",
        materials: ["Visual task analysis chart", "20-second timer", "Unscented soap", "Data sheets"],
        fidelity: ["Post visual chart at sink", "Use errorless teaching", "Immediate prompts", "Consistent reinforcement"]
      },
      parent: {
        activity: "Practice during bathroom routines",
        tips: ["Sing 'Happy Birthday' twice for scrubbing", "Use picture chart by sink", "Start with last step only", "Celebrate every attempt"],
        materials: ["Timer or song", "Picture chart", "Child-friendly soap", "Sticker chart"],
        troubleshooting: ["If sensory issues: try unscented soap", "If timing hard: use visual timer", "If overwhelmed: break into fewer steps"]
      }
    }
  };

  const handleDemo = () => {
    setGoalInput(DEMO_DATA.goalInput);
    setAge(DEMO_DATA.age);
    setSkillLevel(DEMO_DATA.skillLevel);
    setDomain(DEMO_DATA.domain);
    setCurrentStage(0);
  };

  const handleGenerate = () => {
    if (!goalInput || !domain) {
      alert('Please fill in the goal and domain');
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedGoal(DEMO_DATA);
      setIsGenerating(false);
      setCurrentStage(1);
    }, 2000);
  };

  const handleNext = () => {
    if (currentStage === 0 && !generatedGoal) {
      handleGenerate();
    } else if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };

  // Stage Content Components
  const Stage0Content = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-3xl p-8 border border-primary-200">
        <div className="flex items-start gap-6">
          <Target className="w-10 h-10 text-primary-600 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Tell Us About Your Goal</h2>
            <p className="text-gray-700 leading-relaxed">Describe what skill or behavior you'd like to work on. Our AI will help structure it into an evidence-based plan.</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            What skill would you like to teach? *
          </label>
          <textarea
            value={goalInput}
            onChange={(e) => setGoalInput(e.target.value)}
            placeholder="Example: Help my child learn to wash hands independently"
            className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none transition-all duration-200"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Age *</label>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g., 7"
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Domain *</label>
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
            >
              <option value="">Select...</option>
              <option value="communication">Communication</option>
              <option value="social-skills">Social Skills</option>
              <option value="adaptive-behavior">Adaptive Behavior</option>
              <option value="academic">Academic</option>
              <option value="self-regulation">Self-Regulation</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Current Skill Level
          </label>
          <textarea
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
            placeholder="What can they do now? What do they need help with?"
            className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none transition-all duration-200"
            rows={3}
          />
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-3xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-4">
          <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900 dark:text-blue-300">
            <p className="font-medium mb-2">Not sure how to describe your goal?</p>
            <p>Try the <button onClick={handleDemo} className="underline font-medium">Demo</button> to see an example, or just describe it naturally - our AI will help structure it!</p>
          </div>
        </div>
      </div>
    </div>
  );

  const Stage1Content = () => {
    if (!generatedGoal) return <div className="text-center py-16 text-gray-500">Generate a goal first</div>;

    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-3xl p-8 border border-primary-200">
          <div className="flex items-start gap-6">
            <Sparkles className="w-10 h-10 text-primary-600 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">AI Analysis Complete</h2>
              <p className="text-gray-700 leading-relaxed">Review the structured goal below. You can edit any component before moving forward.</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 space-y-6">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-xl mb-6">SMART Goal Breakdown</h3>

          {Object.entries(generatedGoal.smartGoal).map(([key, value]) => (
            <div key={key} className="border-l-4 border-primary-500 pl-6 py-4 bg-gray-50 dark:bg-gray-900/50 rounded-r-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-primary-600 uppercase tracking-wide">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
                {mode === 'clinician' && (
                  <Check className="w-5 h-5 text-primary-600" />
                )}
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{value}</p>
            </div>
          ))}
        </div>

        {mode === 'clinician' && (
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-3xl p-6 border border-primary-200">
            <div className="flex items-center gap-3 mb-3">
              <Check className="w-6 h-6 text-primary-600" />
              <span className="font-semibold text-primary-900 dark:text-primary-300">Evidence-Based Practice Validated</span>
            </div>
            <p className="text-sm text-primary-800 dark:text-primary-400 leading-relaxed">
              This goal aligns with NPDC standards and uses research-supported methodology (backward chaining, errorless teaching).
            </p>
          </div>
        )}
      </div>
    );
  };

  const Stage2Content = () => {
    if (!generatedGoal) return <div className="text-center py-16 text-gray-500">Generate a goal first</div>;

    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-3xl p-8 border border-primary-200">
          <div className="flex items-start gap-6">
            <ClipboardCheck className="w-10 h-10 text-primary-600 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Task Analysis</h2>
              <p className="text-gray-700 leading-relaxed">
                {mode === 'clinician'
                  ? 'Review the step-by-step breakdown with prompting hierarchy and mastery criteria.'
                  : 'Here are the steps broken down into simple, manageable parts.'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 dark:text-gray-100">Sequential Steps</h3>
            {mode === 'clinician' && (
              <span className="text-sm bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 px-3 py-1 rounded-full font-medium">
                Backward Chaining
              </span>
            )}
          </div>

          <div className="space-y-4">
            {generatedGoal.taskSteps.map((step, index) => (
              <div key={step.id} className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {step.id}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-gray-100 mb-2">{step.text}</p>
                    {mode === 'clinician' && (
                      <>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">Prompting:</span> {step.prompt}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">Mastery:</span> {step.mastery}
                        </p>
                      </>
                    )}
                    {mode === 'user' && index === 0 && (
                      <p className="text-sm text-primary-700 dark:text-primary-300 mt-2">
                        💡 Start here! Help with earlier steps, let them finish this one alone
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const Stage3Content = () => {
    if (!generatedGoal) return <div className="text-center py-16 text-gray-500">Generate a goal first</div>;

    const content = mode === 'clinician'
      ? generatedGoal.implementation.clinician
      : generatedGoal.implementation.parent;

    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-3xl p-8 border border-primary-200">
          <div className="flex items-start gap-6">
            <FileText className="w-10 h-10 text-primary-600 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Implementation Guide</h2>
              <p className="text-gray-700 leading-relaxed">
                {mode === 'clinician'
                  ? 'Detailed teaching protocols and data collection procedures.'
                  : 'Everything you need to start practicing at home today!'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 space-y-8">
          {mode === 'clinician' ? (
            <>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Teaching Method</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 bg-primary-50 dark:bg-primary-900/20 p-4 rounded-2xl border border-primary-200">
                  {(content as any).method}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Data Collection</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{(content as any).dataCollection}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Required Materials</h3>
                <ul className="space-y-2">
                  {(content as any).materials?.map((item: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-primary-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Fidelity Checklist</h3>
                <ul className="space-y-2">
                  {(content as any).fidelity?.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-primary-600 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">📅 Today's Activity</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 bg-secondary-50 dark:bg-secondary-900/20 p-4 rounded-2xl border border-secondary-200">
                  {(content as any).activity}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">✨ Helpful Tips</h3>
                <ul className="space-y-3">
                  {(content as any).tips?.map((tip: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-secondary-600 mt-0.5">💡</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">🎒 Materials Needed</h3>
                <div className="grid grid-cols-2 gap-3">
                  {(content as any).materials?.map((item: string, i: number) => (
                    <div key={i} className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-3 text-sm text-gray-700 dark:text-gray-300 border border-blue-200 dark:border-blue-800">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">💪 Troubleshooting</h3>
                <ul className="space-y-2">
                  {(content as any).troubleshooting?.map((tip: string, i: number) => (
                    <li key={i} className="text-sm text-gray-700 dark:text-gray-300 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-2xl border border-yellow-200 dark:border-yellow-800">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-4">
          <button className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl transition-all shadow-lg">
            <Download className="w-5 h-5" />
            Download Guide (PDF)
          </button>
        </div>
      </div>
    );
  };

  const Stage4Content = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-3xl p-8 border border-primary-200">
        <div className="flex items-start gap-6">
          <TrendingUp className="w-10 h-10 text-primary-600 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Progress Tracking</h2>
            <p className="text-gray-700 leading-relaxed">Monitor progress, celebrate wins, and adjust as needed.</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700">
        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-6">Sample Progress View</h3>
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-600">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Week 1</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">3/8 steps independent</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div className="bg-primary-600 h-3 rounded-full" style={{width: '38%'}}></div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Week 4</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">6/8 steps independent</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div className="bg-primary-600 h-3 rounded-full" style={{width: '75%'}}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Week 8</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">7/8 steps independent 🎉</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div className="bg-success-500 h-3 rounded-full" style={{width: '88%'}}></div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-success-50 dark:bg-success-900/20 rounded-2xl border border-success-200">
          <p className="text-sm font-medium text-success-900 dark:text-success-300 mb-3">🎉 Recent Celebration</p>
          <p className="text-sm text-success-800 dark:text-success-400 leading-relaxed">
            {mode === 'clinician'
              ? "Student achieved mastery criteria for steps 1-7. Ready to generalize to school setting."
              : "Your child washed their hands all by themselves yesterday! You both worked so hard for this moment! 🌟"}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-sm hover:underline transition-all"
              >
                <Home className="w-4 h-4" />
                Back to start
              </button>
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-3 rounded-2xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Luvler</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Stage {currentStage + 1} of {stages.length}: {stages[currentStage].name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Mode Toggle */}
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-2xl p-1">
                <button
                  onClick={() => setMode('clinician')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm ${
                    mode === 'clinician'
                      ? 'bg-white dark:bg-gray-800 text-primary-700 shadow-sm font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  Clinician
                </button>
                <button
                  onClick={() => setMode('user')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm ${
                    mode === 'user'
                      ? 'bg-white dark:bg-gray-800 text-secondary-700 shadow-sm font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Parent
                </button>
              </div>

              <button
                onClick={handleDemo}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-600 text-white rounded-2xl hover:from-primary-600 hover:to-secondary-700 transition-all shadow-lg text-sm font-medium"
              >
                <Sparkles className="w-4 h-4" />
                Demo
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 flex items-center justify-between">
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
                    React.createElement(stage.icon, { className: 'w-6 h-6' })
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
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {isGenerating ? (
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-16 flex flex-col items-center justify-center">
                <RefreshCw className="w-16 h-16 text-primary-600 animate-spin mb-6" />
                <p className="text-gray-700 dark:text-gray-300 font-medium text-lg">Analyzing goal with AI...</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">This may take a few seconds</p>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                {currentStage === 0 && <Stage0Content />}
                {currentStage === 1 && <Stage1Content />}
                {currentStage === 2 && <Stage2Content />}
                {currentStage === 3 && <Stage3Content />}
                {currentStage === 4 && <Stage4Content />}
              </div>
            )}

            {/* Navigation */}
            {!isGenerating && (
              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentStage === 0}
                  className="flex items-center gap-3 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <button className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all font-medium">
                  Save & Continue Later
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentStage === 0 && (!goalInput || !domain)}
                  className="flex items-center gap-3 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg"
                >
                  {currentStage === 0 && !generatedGoal ? 'Analyze Goal' : 'Next'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Checklist Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900 dark:text-gray-100">
                  {mode === 'clinician' ? 'Compliance' : 'Checklist'}
                </h3>
                <button
                  onClick={() => setShowChecklist(!showChecklist)}
                  className="lg:hidden"
                >
                  {showChecklist ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>

              <div className={`${showChecklist || 'hidden lg:block'}`}>
                {generatedGoal ? (
                  <div className="space-y-4">
                    {mode === 'clinician' ? (
                      <>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Compliance Check</h4>
                        <div className="space-y-3">
                          <label className="flex items-start gap-3 text-sm">
                            <input type="checkbox" className="mt-1" />
                            <span className="text-gray-700 dark:text-gray-300">Informed consent obtained & documented</span>
                          </label>
                          <label className="flex items-start gap-3 text-sm">
                            <input type="checkbox" className="mt-1" />
                            <span className="text-gray-700 dark:text-gray-300">Research-supported intervention methods</span>
                          </label>
                          <label className="flex items-start gap-3 text-sm">
                            <input type="checkbox" className="mt-1" />
                            <span className="text-gray-700 dark:text-gray-300">Observable & measurable criteria defined</span>
                          </label>
                          <label className="flex items-start gap-3 text-sm">
                            <input type="checkbox" className="mt-1" />
                            <span className="text-gray-700 dark:text-gray-300">Procedures clearly operationalized</span>
                          </label>
                        </div>
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <BookOpen className="w-4 h-4" />
                            <span>BACB Ethics Code Aligned</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Daily Checklist</h4>
                        <div className="space-y-3">
                          <label className="flex items-start gap-3 text-sm">
                            <input type="checkbox" className="mt-1" />
                            <span className="text-gray-700 dark:text-gray-300">Materials ready (soap, timer, chart)</span>
                          </label>
                          <label className="flex items-start gap-3 text-sm">
                            <input type="checkbox" className="mt-1" />
                            <span className="text-gray-700 dark:text-gray-300">Environment calm & prepared</span>
                          </label>
                          <label className="flex items-start gap-3 text-sm">
                            <input type="checkbox" className="mt-1" />
                            <span className="text-gray-700 dark:text-gray-300">Following steps from plan</span>
                          </label>
                          <label className="flex items-start gap-3 text-sm">
                            <input type="checkbox" className="mt-1" />
                            <span className="text-gray-700 dark:text-gray-300">Recorded progress/celebrated!</span>
                          </label>
                        </div>
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                          <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                            Remember: Progress over perfection! 🌟
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ClipboardCheck className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Checklist will appear after goal analysis
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

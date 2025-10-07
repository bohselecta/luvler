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
    <div className="space-y-10">
      <div className="flex items-start gap-4">
        <div className="bg-primary-100 p-3 rounded-xl">
          <Target className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Tell Us About Your Goal</h2>
          <p className="text-gray-600 leading-relaxed">Describe what skill or behavior you'd like to work on. Our AI will help structure it into an evidence-based plan.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 border border-gray-200 dark:border-gray-700 shadow-[0_8px_30px_rgba(0,0,0,0.08)] space-y-6">
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
            <label htmlFor="domain-select" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Domain *</label>
            <select
              id="domain-select"
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

      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-200 dark:border-amber-800">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-900 dark:text-amber-300">
            <p className="font-medium mb-1">Not sure how to describe your goal?</p>
            <p>Try the <button onClick={handleDemo} className="underline font-medium hover:no-underline">Demo</button> to see an example, or just describe it naturally—our AI will help structure it!</p>
          </div>
        </div>
      </div>
    </div>
  );

  const Stage1Content = () => {
    if (!generatedGoal) return <div className="text-center py-16 text-gray-500">Generate a goal first</div>;

    return (
      <div className="space-y-10">
        <div className="flex items-start gap-4">
          <div className="bg-primary-100 p-3 rounded-xl">
            <Sparkles className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Analysis Complete</h2>
            <p className="text-gray-600 leading-relaxed">Review the structured goal below. You can edit any component before moving forward.</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 border border-gray-200 dark:border-gray-700 shadow-[0_8px_30px_rgba(0,0,0,0.08)] space-y-6">
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
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5 border border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <Check className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-900 dark:text-green-300">Evidence-Based Practice Validated</span>
            </div>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
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
      <div className="space-y-10">
        <div className="flex items-start gap-4">
          <div className="bg-primary-100 p-3 rounded-xl">
            <ClipboardCheck className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Task Analysis</h2>
            <p className="text-gray-600 leading-relaxed">
              {mode === 'clinician'
                ? 'Review the step-by-step breakdown with prompting hierarchy and mastery criteria.'
                : 'Here are the steps broken down into simple, manageable parts.'}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 border border-gray-200 dark:border-gray-700 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
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
              <div key={step.id} className="bg-white dark:bg-gray-900/50 rounded-xl p-6 border-2 border-gray-100 dark:border-gray-600 hover:border-primary-200 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-500 text-white w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {step.id}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{step.text}</p>
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
                      <p className="text-sm text-primary-700 dark:text-primary-300 mt-2 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" /> Start here! Help with earlier steps, let them finish this one alone
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
      <div className="space-y-10">
        <div className="flex items-start gap-4">
          <div className="bg-primary-100 p-3 rounded-xl">
            <FileText className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Implementation Guide</h2>
            <p className="text-gray-600 leading-relaxed">
              {mode === 'clinician'
                ? 'Detailed teaching protocols and data collection procedures.'
                : 'Everything you need to start practicing at home today!'}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 border border-gray-200 dark:border-gray-700 shadow-[0_8px_30px_rgba(0,0,0,0.08)] space-y-8">
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
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  Today's Activity
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 bg-rose-50 dark:bg-rose-900/20 p-5 rounded-xl border border-rose-200">
                  {(content as any).activity}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  Helpful Tips
                </h3>
                <ul className="space-y-3">
                  {(content as any).tips?.map((tip: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 pl-2">
                      <span className="text-amber-500 mt-0.5">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Materials Needed</h3>
                <div className="grid grid-cols-2 gap-3">
                  {(content as any).materials?.map((item: string, i: number) => (
                    <div key={i} className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-sm text-gray-700 dark:text-gray-300 border border-blue-200 dark:border-blue-800">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  Troubleshooting
                </h3>
                <ul className="space-y-2">
                  {(content as any).troubleshooting?.map((tip: string, i: number) => (
                    <li key={i} className="text-sm text-gray-700 dark:text-gray-300 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-4">
          <button className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all shadow-sm font-medium">
            <Download className="w-5 h-5" />
            Download Guide (PDF)
          </button>
        </div>
      </div>
    );
  };

  const Stage4Content = () => (
    <div className="space-y-10">
      <div className="flex items-start gap-4">
        <div className="bg-primary-100 p-3 rounded-xl">
          <TrendingUp className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Progress Tracking</h2>
          <p className="text-gray-600 leading-relaxed">Monitor progress, celebrate wins, and adjust as needed.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 border border-gray-200 dark:border-gray-700 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
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

        <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200">
          <p className="text-sm font-semibold text-green-900 dark:text-green-300 mb-2 flex items-center gap-2">
            <Heart className="w-4 h-4 text-green-600" />
            Recent Celebration
          </p>
          <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
            {mode === 'clinician'
              ? "Student achieved mastery criteria for steps 1-7. Ready to generalize to school setting."
              : "Your child washed their hands all by themselves yesterday! You both worked so hard for this moment!"}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between gap-6">
            {/* Left: Back button */}
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Back to start</span>
            </button>

            {/* Center: Logo and stage */}
            <div className="flex items-center gap-3">
              <div className="bg-primary-500 p-2.5 rounded-xl">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">Luvler</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Stage {currentStage + 1} of {stages.length}</p>
              </div>
            </div>

            {/* Right: Mode Toggle and Demo */}
            <div className="flex items-center gap-3">
              {/* Mode Toggle */}
              <div className="hidden md:flex items-center gap-1 bg-gray-50 dark:bg-gray-700 rounded-xl p-1 border border-gray-200 dark:border-gray-600">
                <button
                  onClick={() => setMode('clinician')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-xs font-medium ${
                    mode === 'clinician'
                      ? 'bg-white dark:bg-gray-800 text-primary-600 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  Clinician
                </button>
                <button
                  onClick={() => setMode('user')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-xs font-medium ${
                    mode === 'user'
                      ? 'bg-white dark:bg-gray-800 text-primary-600 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  Parent
                </button>
              </div>

              <button
                onClick={handleDemo}
                className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all shadow-sm text-xs font-medium"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Demo</span>
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-5 flex items-center justify-center gap-2 md:gap-4">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex flex-col items-center flex-1 max-w-[100px]">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${
                  index < currentStage
                    ? 'bg-green-500 text-white'
                    : index === currentStage
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                }`}>
                  {index < currentStage ? (
                    <Check className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    React.createElement(stage.icon, { className: 'w-4 h-4 md:w-5 md:h-5' })
                  )}
                </div>
                <span className={`text-[10px] md:text-xs mt-1.5 font-medium text-center hidden sm:block ${
                  index === currentStage ? 'text-primary-600' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {stage.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {isGenerating ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-16 flex flex-col items-center justify-center">
                <RefreshCw className="w-14 h-14 text-primary-500 animate-spin mb-6" />
                <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg">Analyzing goal with AI...</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">This may take a few seconds</p>
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
                {currentStage === 0 && <Stage0Content />}
                {currentStage === 1 && <Stage1Content />}
                {currentStage === 2 && <Stage2Content />}
                {currentStage === 3 && <Stage3Content />}
                {currentStage === 4 && <Stage4Content />}
              </div>
            )}

            {/* Navigation */}
            {!isGenerating && (
              <div className="mt-8 flex items-center justify-between gap-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentStage === 0}
                  className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <button className="px-5 py-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all font-medium text-sm hidden md:block">
                  Save & Continue Later
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentStage === 0 && (!goalInput || !domain)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm text-sm"
                >
                  {currentStage === 0 && !generatedGoal ? 'Analyze Goal' : 'Next'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Checklist Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-6 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">
                  {mode === 'clinician' ? 'Compliance' : 'Checklist'}
                </h3>
                <button
                  onClick={() => setShowChecklist(!showChecklist)}
                  className="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  {showChecklist ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>

              <div className={`${showChecklist || 'hidden lg:block'}`}>
                {generatedGoal ? (
                  <div className="space-y-4">
                    {mode === 'clinician' ? (
                      <>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-sm">Compliance Check</h4>
                        <div className="space-y-2.5">
                          <label className="flex items-start gap-2.5 text-xs cursor-pointer">
                            <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-primary-500 focus:ring-primary-500" />
                            <span className="text-gray-700 dark:text-gray-300">Informed consent obtained & documented</span>
                          </label>
                          <label className="flex items-start gap-2.5 text-xs cursor-pointer">
                            <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-primary-500 focus:ring-primary-500" />
                            <span className="text-gray-700 dark:text-gray-300">Research-supported intervention methods</span>
                          </label>
                          <label className="flex items-start gap-2.5 text-xs cursor-pointer">
                            <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-primary-500 focus:ring-primary-500" />
                            <span className="text-gray-700 dark:text-gray-300">Observable & measurable criteria defined</span>
                          </label>
                          <label className="flex items-start gap-2.5 text-xs cursor-pointer">
                            <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-primary-500 focus:ring-primary-500" />
                            <span className="text-gray-700 dark:text-gray-300">Procedures clearly operationalized</span>
                          </label>
                        </div>
                        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>BACB Ethics Code Aligned</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-sm">Daily Checklist</h4>
                        <div className="space-y-2.5">
                          <label className="flex items-start gap-2.5 text-xs cursor-pointer">
                            <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-primary-500 focus:ring-primary-500" />
                            <span className="text-gray-700 dark:text-gray-300">Materials ready (soap, timer, chart)</span>
                          </label>
                          <label className="flex items-start gap-2.5 text-xs cursor-pointer">
                            <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-primary-500 focus:ring-primary-500" />
                            <span className="text-gray-700 dark:text-gray-300">Environment calm & prepared</span>
                          </label>
                          <label className="flex items-start gap-2.5 text-xs cursor-pointer">
                            <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-primary-500 focus:ring-primary-500" />
                            <span className="text-gray-700 dark:text-gray-300">Following steps from plan</span>
                          </label>
                          <label className="flex items-start gap-2.5 text-xs cursor-pointer">
                            <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-primary-500 focus:ring-primary-500" />
                            <span className="text-gray-700 dark:text-gray-300">Recorded progress & celebrated!</span>
                          </label>
                        </div>
                        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 bg-primary-50 dark:bg-primary-900/20 -mx-6 -mb-6 px-6 pb-6 rounded-b-2xl">
                          <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                            <Heart className="w-3.5 h-3.5 text-rose-400" />
                            Progress over perfection!
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

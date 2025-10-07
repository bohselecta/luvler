// Luvler ABA Tool - Cost-Optimized AI Prompts
// Designed for minimal token usage and maximum efficiency

import {
  AIPromptContext,
  SelfAdvocacyGoal,
  Goal,
  GoalInputData,
  ContextData,
  TextSize,
  GoalMode
} from './types';

// Clinical guardrails and safety constraints (non-diagnostic, ethics-aligned)
const CLINICAL_BOUNDARIES = `
Safety & Ethics Rules (follow strictly):
- Do NOT provide diagnoses, legal, medical, or crisis advice.
- Do NOT recommend restrictive practices (restraints, seclusion) or aversives.
- Keep within non-therapeutic guidance unless a licensed professional is involved.
- Goals must be observable, measurable, functional, and culturally respectful.
- Use person-first or identity-first language as preferred; never stigmatize.
- Encourage supervision by a qualified professional for clinical use.
- Provide supportive, non-coercive strategies; prioritize assent and autonomy.
`;

const CONTENT_DENYLIST = [
  'diagnose',
  'medication dosing',
  'crisis instructions',
  'physical restraint',
  'punishment procedures',
  'seclusion',
];

const appendGuardrails = (prompt: string): string => {
  const deny = CONTENT_DENYLIST.map(k => `- Avoid: ${k}`).join('\n');
  return `${prompt}\n\n${CLINICAL_BOUNDARIES}\n${deny}\nReturn only the requested fields.`;
};

// Model selection for cost optimization
export const selectModel = (taskType: string): string => {
  switch(taskType) {
    case 'self-advocacy':
      return 'claude-3-haiku-20240307'; // Cheapest - ~$0.25/1M tokens
    case 'goal-parsing':
      return 'claude-3-haiku-20240307'; // Simple parsing - cheap
    case 'clinical-analysis':
      return 'claude-3-5-sonnet-20241022'; // Complex analysis - higher quality
    case 'task-breakdown':
      return 'claude-3-5-sonnet-20241022'; // Complex task analysis
    default:
      return 'claude-3-haiku-20240307'; // Default to cheapest
  }
};

// Token usage tracking
export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  model: string;
  cost: number; // Estimated cost in USD
}

export const calculateCost = (usage: TokenUsage): number => {
  // Pricing as of 2024 (per 1M tokens)
  const pricing = {
    'claude-3-haiku-20240307': { input: 0.25, output: 1.25 },
    'claude-3-5-sonnet-20241022': { input: 3.0, output: 15.0 }
  };

  const modelPricing = pricing[usage.model as keyof typeof pricing] || pricing['claude-3-haiku-20240307'];
  return ((usage.inputTokens / 1000000) * modelPricing.input) + ((usage.outputTokens / 1000000) * modelPricing.output);
};

// Self-Advocacy Prompts (Optimized for Haiku - minimal tokens)
export const SELF_ADVOCACY_PROMPTS = {
  // Main goal breakdown prompt - target: 300-500 tokens
  generateSteps: (goal: string, preferences?: { textSize?: TextSize }): string => {
    const basePrompt = `Break down this goal into 5-7 clear, manageable steps.

Goal: "${goal}"

For each step:
1. Write one clear action (literal, no idioms)
2. Estimate time in minutes
3. Suggest one accommodation tip

Use literal language. Be direct and honest. Never be condescending.

Constraints:
- No medical/diagnostic advice. Keep supportive and optional.
- Respect autonomy; offer alternatives and sensory accommodations.

Return JSON: [{"id": "step1", "instruction": "Clear action here", "estimatedMinutes": 5, "accommodationTip": "Optional tip"}]`;

    // Adjust for text size preference
    if (preferences?.textSize === 'large' || preferences?.textSize === 'xlarge') {
      return appendGuardrails(basePrompt + '\n\nUse slightly longer, clearer explanations for each step.');
    }

    return appendGuardrails(basePrompt);
  },

  // Celebration message - target: 100-200 tokens
  generateCelebration: (completedSteps: number, totalSteps: number): string => {
    return `User completed ${completedSteps} of ${totalSteps} steps.

Generate a respectful, authentic celebration message (2-3 sentences). No condescension. Acknowledge their effort and autonomy.

Return only the celebration text, no JSON.`;
  },

  // Accommodation suggestions - target: 150-250 tokens
  generateAccommodations: (goal: string, context?: string): string => {
    return appendGuardrails(`Goal: "${goal}"${context ? `\nContext: ${context}` : ''}

Suggest 3-5 practical accommodations for sensory/cognitive needs. Be specific and actionable.

Return JSON: ["accommodation1", "accommodation2", "accommodation3"]`);
  }
};

// Clinical Analysis Prompts (Optimized for Sonnet - complex but efficient)
export const CLINICAL_PROMPTS = {
  // SMART goal parsing - target: 600-800 tokens
  parseGoal: (input: GoalInputData, context?: ContextData): string => {
    return appendGuardrails(`You are a BCBA creating evidence-based behavioral goals.

Goal: "${input.rawGoalText}"
Domain: ${input.domain}
Current level: "${input.skillLevel}"${context ? `
Age: ${context.childAge}
Communication: ${context.communicationStyle}
Environment: ${context.environmentalFactors.join(', ')}
Sensory: ${context.sensorySensitivities.join(', ')}
Previous: ${context.previousAttempts.join(', ')}` : ''}

Structure as SMART goal:
1. Specific: Observable behavior
2. Measurable: Quantified criteria
3. Attainable: Based on current level
4. Relevant: Functional significance
5. Time-bound: Realistic timeline

Include:
- Task breakdown (6-8 steps)
- Teaching method (forward/backward/total)
- Prerequisites
- Behavioral components (antecedents/behavior/consequences)
- Data collection plan

Return structured JSON matching Goal schema. Be specific, practical, evidence-based.`);
  },

  // Task analysis generation - target: 400-600 tokens
  generateTaskAnalysis: (goal: Goal, method: 'forward' | 'backward' | 'total'): string => {
    return appendGuardrails(`Generate detailed task analysis for this goal:

${goal.parsedGoal.specific}

Use ${method} chaining. Create 6-8 sequential steps.

Each step needs:
- Clear description
- Prompting hierarchy (independent → verbal → gestural → model → physical)
- Mastery criteria (e.g., "3/3 trials")
- Data collection method

Focus on observable, measurable components. Use evidence-based methodology.

Return JSON: [{"stepNumber": 1, "description": "...", "promptingLevel": "independent", "masteryCriterion": "...", "dataCollectionMethod": "..."}]`);
  },

  // Translation to parent language - target: 300-500 tokens
  translateToParent: (clinicianGoal: Goal): string => {
    return appendGuardrails(`Translate this professional goal to supportive parent-child language:

${clinicianGoal.clinicianLanguage}

Generate parent-friendly version with:
1. Plain language explanation
2. Simple home activities
3. Visual support suggestions
4. Encouraging tone (no condescension)
5. Sensory considerations
6. Natural reinforcement ideas

Return JSON: {"parentLanguage": "...", "visualSupports": [...], "homeActivities": [...], "encouragementTips": [...]} `);
  },

  // Compliance validation - target: 200-300 tokens
  validateCompliance: (goal: Goal): string => {
    return appendGuardrails(`Review this goal for BACB compliance and evidence-based practice:

Goal: ${goal.parsedGoal.specific}

Check:
- Observable/measurable criteria
- Evidence-based methodology
- Ethical considerations
- Cultural responsiveness
- Functional relevance

Return JSON: {"compliant": true/false, "issues": ["issue1", "issue2"], "suggestions": ["suggestion1"], "citations": ["research1"]}`);
  }
};

// Prompt templates for different user types
export const buildPrompt = (context: AIPromptContext): string => {
  switch(context.taskType) {
    case 'self-advocacy':
      return SELF_ADVOCACY_PROMPTS.generateSteps(context.userGoal, context.preferences);

    case 'goal-parsing':
      return CLINICAL_PROMPTS.parseGoal({
        rawGoalText: context.userGoal,
        domain: 'adaptive-behavior', // Default, will be overridden
        skillLevel: 'Basic understanding',
        communicationStyle: 'verbal'
      }, context.context);

    case 'clinical-analysis':
      return CLINICAL_PROMPTS.parseGoal({
        rawGoalText: context.userGoal,
        domain: 'adaptive-behavior',
        skillLevel: 'Basic understanding',
        communicationStyle: 'verbal'
      }, context.context);

    case 'task-breakdown':
      return CLINICAL_PROMPTS.generateTaskAnalysis(
        {} as Goal, // Will be populated
        'backward' // Default method
      );

    default:
      return SELF_ADVOCACY_PROMPTS.generateSteps(context.userGoal);
  }
};

// Cost estimation utilities
export const estimateTokenUsage = (taskType: string, goalLength: number): { min: number; max: number } => {
  const estimates = {
    'self-advocacy': { min: 300, max: 500 },
    'goal-parsing': { min: 400, max: 600 },
    'clinical-analysis': { min: 600, max: 800 },
    'task-breakdown': { min: 400, max: 600 }
  };

  const base = estimates[taskType as keyof typeof estimates] || estimates['self-advocacy'];

  // Adjust for goal length
  const lengthMultiplier = Math.max(1, goalLength / 50); // Base assumption: 50 chars per token

  return {
    min: Math.floor(base.min * lengthMultiplier),
    max: Math.floor(base.max * lengthMultiplier)
  };
};

// Response parsing utilities
export const parseSelfAdvocacyResponse = (response: string): any => {
  try {
    return JSON.parse(response);
  } catch {
    // Fallback: extract JSON-like content
    const jsonMatch = response.match(/\[.*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Invalid response format');
  }
};

export const parseClinicalResponse = (response: string): any => {
  try {
    return JSON.parse(response);
  } catch {
    // Fallback: try to extract structured content
    console.warn('Failed to parse clinical response as JSON, using fallback');
    return {
      parsedGoal: {
        specific: response.substring(0, 200),
        measurable: '80% accuracy',
        attainable: 'Based on current level',
        relevant: 'Functional skill',
        timeBound: 'Within 12 weeks'
      },
      taskBreakdown: []
    };
  }
};

// Error handling for AI responses
export const handleAIError = (error: any): string => {
  if (error.code === 'rate_limit_exceeded') {
    return 'Please wait a moment before trying again.';
  }
  if (error.code === 'insufficient_quota') {
    return 'API quota exceeded. Please try again later.';
  }
  if (error.code === 'invalid_api_key') {
    return 'API key issue. Please check your settings.';
  }
  return 'Something went wrong. Please try again.';
};

// Logging utilities for cost tracking
export const logTokenUsage = (usage: TokenUsage): void => {
  console.log(`AI Usage: ${usage.model} | ${usage.totalTokens} tokens | $${usage.cost.toFixed(4)}`);
};

// Demo data generators for testing
export const generateDemoSteps = (goal: string): any[] => {
  return [
    {
      id: '1',
      instruction: 'Find a quiet space where you can focus',
      estimatedMinutes: 2,
      accommodationTip: 'If noise is distracting, use headphones with calming music'
    },
    {
      id: '2',
      instruction: 'Get a notebook and pen, or open a notes app',
      estimatedMinutes: 1,
      accommodationTip: 'Having your tools ready helps you start'
    },
    {
      id: '3',
      instruction: 'Write down the main thing you want to accomplish',
      estimatedMinutes: 3,
      accommodationTip: 'Keep it simple - just one sentence is enough'
    },
    {
      id: '4',
      instruction: 'Break that thing into 3-5 smaller actions',
      estimatedMinutes: 5,
      accommodationTip: 'Each action should be something you can do in one sitting'
    },
    {
      id: '5',
      instruction: 'Pick the first action and start working on it',
      estimatedMinutes: 15,
      accommodationTip: 'Set a timer if that helps you focus. 15-25 minutes is a good length.'
    }
  ];
};

export const generateDemoClinicalGoal = (): any => {
  return {
    parsedGoal: {
      specific: 'Student will independently complete the 8-step handwashing sequence after toileting',
      measurable: '90% accuracy (7/8 steps) without prompts across 3 consecutive trials per day',
      attainable: 'Builds on existing skills (turns on water, wets hands). Prerequisites present.',
      relevant: 'Critical self-care skill for health, hygiene, and independence',
      timeBound: 'Within 12 weeks of systematic intervention'
    },
    taskBreakdown: [
      {
        stepNumber: 1,
        description: 'Turn on water to lukewarm',
        promptingLevel: 'gestural',
        masteryCriterion: '3/3 trials',
        dataCollectionMethod: 'Trial by trial data sheet'
      },
      {
        stepNumber: 2,
        description: 'Wet both hands under water',
        promptingLevel: 'verbal',
        masteryCriterion: '3/3 trials',
        dataCollectionMethod: 'Trial by trial data sheet'
      }
    ],
    teachingMethod: 'backward'
  };
};

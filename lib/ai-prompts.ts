// Luvler AI Prompts - Personalized for Processing Modalities and Special Interests

export interface PersonalizedPromptContext {
  processingModalities?: string[];
  specialInterests?: string[];
  userGoal?: string;
  taskType: 'self-advocacy' | 'friendship' | 'goal-setting' | 'general';
}

export function buildPersonalizedPrompt(context: PersonalizedPromptContext): string {
  const { processingModalities = [], specialInterests = [], taskType } = context;

  let personalizationInstructions = '';

  // Add processing modality guidance
  if (processingModalities.includes('narrative')) {
    personalizationInstructions += ' Use story-based analogies and examples. Frame guidance as narratives with clear beginnings, middles, and ends.';
  }
  if (processingModalities.includes('visual')) {
    personalizationInstructions += ' Include visual descriptions and spatial analogies. Describe steps as if drawing a picture or map.';
  }
  if (processingModalities.includes('systematic')) {
    personalizationInstructions += ' Use logical sequences and cause-effect explanations. Present information in clear, numbered steps with rationales.';
  }
  if (processingModalities.includes('numerical')) {
    personalizationInstructions += ' Include numbers, data, and quantitative approaches. Use measurements, counts, and statistical concepts.';
  }
  if (processingModalities.includes('kinesthetic')) {
    personalizationInstructions += ' Include physical actions and hands-on approaches. Describe steps as movements or physical processes.';
  }
  if (processingModalities.includes('musical')) {
    personalizationInstructions += ' Use rhythm, melody, and auditory analogies. Present information with patterns and sequences like music.';
  }

  // Add special interests context
  if (specialInterests.length > 0) {
    personalizationInstructions += ` Incorporate examples and analogies from these interests: ${specialInterests.join(', ')}.`;
  }

  // Task-specific guidance
  let taskGuidance = '';
  switch (taskType) {
    case 'self-advocacy':
      taskGuidance = 'Focus on building confidence and self-advocacy skills. Emphasize that the user\'s pace and comfort level matter most.';
      break;
    case 'friendship':
      taskGuidance = 'Focus on building social confidence through structured, interest-based connections. Emphasize safety and user autonomy.';
      break;
    case 'goal-setting':
      taskGuidance = 'Break down goals into small, manageable steps. Celebrate effort and progress, not perfection.';
      break;
    default:
      taskGuidance = 'Provide supportive, non-judgmental guidance that respects individual processing styles.';
  }

  return `${personalizationInstructions} ${taskGuidance}`.trim();
}

export function buildSelfAdvocacyPrompt(
  userGoal: string,
  context?: PersonalizedPromptContext
): string {
  const personalization = context ? buildPersonalizedPrompt(context) : '';

  return `You are an ABA-informed assistant following BACB ethics: prioritize assent, autonomy, and dignity; avoid coercion or aversives.

Generate a step-by-step plan for: "${userGoal}"

Create 5-8 clear, actionable steps that build confidence gradually. Each step should be:
- Observable and measurable
- Broken into smallest reasonable units
- Include accommodation tips for different processing styles
- Focus on success rather than perfection

${personalization}

Output STRICT JSON: {"steps":[{"id":"unique_id","order":1,"instruction":"Clear instruction","isCompleted":false,"estimatedMinutes":15,"accommodationTip":"Optional tip","contextualReason":"Why this step matters now"}]}`;
}

export function generateDemoSteps(userGoal: string): any[] {
  // Enhanced demo steps with contextual reasons
  return [
    {
      id: '1',
      order: 1,
      instruction: 'Find a quiet space where you can focus without interruptions',
      isCompleted: false,
      estimatedMinutes: 2,
      accommodationTip: 'If noise is distracting, use headphones with calming music or white noise',
      contextualReason: 'This creates a foundation for focused work by reducing sensory overload'
    },
    {
      id: '2',
      order: 2,
      instruction: 'Get a notebook and pen, or open a notes app on your device',
      isCompleted: false,
      estimatedMinutes: 1,
      accommodationTip: 'Choose writing tools that feel comfortable and familiar to you',
      contextualReason: 'Having the right tools ready makes starting the task feel easier'
    },
    {
      id: '3',
      order: 3,
      instruction: 'Write down the main thing you want to accomplish in 1-2 sentences',
      isCompleted: false,
      estimatedMinutes: 3,
      accommodationTip: 'Keep it simple - just one clear goal is enough to start',
      contextualReason: 'Writing it down makes abstract thoughts more concrete and manageable'
    },
    {
      id: '4',
      order: 4,
      instruction: 'Break that main goal into 3-5 smaller, specific actions',
      isCompleted: false,
      estimatedMinutes: 5,
      accommodationTip: 'Each action should be something you can complete in one sitting',
      contextualReason: 'Small steps feel less overwhelming and build momentum toward success'
    },
    {
      id: '5',
      order: 5,
      instruction: 'Pick the first small action and work on it for 15-25 minutes',
      isCompleted: false,
      estimatedMinutes: 20,
      accommodationTip: 'Set a timer if that helps you stay focused. You can always take breaks.',
      contextualReason: 'Starting with just one small action proves you can make progress'
    },
    {
      id: '6',
      order: 6,
      instruction: 'Take a break and do something you enjoy for 5-10 minutes',
      isCompleted: false,
      estimatedMinutes: 8,
      accommodationTip: 'Breaks are productive! They help you recharge and stay motivated.',
      contextualReason: 'Rest prevents burnout and makes it easier to continue working'
    }
  ];
}

export function buildFriendshipPathwayPrompt(
  goal: string,
  interests: string[],
  context?: PersonalizedPromptContext
): string {
  const personalization = context ? buildPersonalizedPrompt({ ...context, taskType: 'friendship' }) : '';

  return `You are an ABA-informed assistant following BACB ethics: prioritize assent, autonomy, and dignity; avoid coercion or aversives.

Generate a comprehensive 4-phase friendship pathway for the goal "${goal}" using interests ${JSON.stringify(interests)}.

The 4 phases are:
1. understanding - Explore what friendship means personally (2-3 steps)
2. practice - Build skills through safe exercises (3-4 steps)
3. opportunities - Find structured social connections (2-3 steps)
4. confidence - Track progress and celebrate growth (2-3 steps)

Each step should include:
- A contextualReason explaining why this step matters in the immediate context
- Practical, actionable instructions
- Tips for different comfort levels

${personalization}

Output STRICT JSON: {"steps":[{"id":"phase_step","order":1,"phase":"understanding","instruction":"Clear instruction","tip":"Helpful tip","contextualReason":"Why this matters now"}]}`;
}

export function buildGoalAnalysisPrompt(
  rawGoal: string,
  context?: PersonalizedPromptContext
): string {
  const personalization = context ? buildPersonalizedPrompt({ ...context, taskType: 'goal-setting' }) : '';

  return `You are an ABA-informed assistant following BACB ethics: prioritize assent, autonomy, and dignity; avoid coercion or aversives.

Analyze this goal and break it down using SMART criteria: "${rawGoal}"

Provide:
1. Specific: What exactly will be done?
2. Measurable: How will success be measured?
3. Attainable: Is this realistic given current skills?
4. Relevant: Why is this important to the person?
5. Time-bound: When should this be completed?

Also provide:
- 3-5 task-analyzed steps
- Potential accommodations
- Data collection suggestions

${personalization}

Output STRICT JSON: {"smart":{"specific":"...","measurable":"...","attainable":"...","relevant":"...","timeBound":"..."},"steps":[{"order":1,"description":"...","strategy":"..."}],"accommodations":["..."],"dataCollection":"..."}`;
}

// Legacy prompts for backwards compatibility
export const SELF_ADVOCACY_PROMPTS = {
  basePrompt: `You are a supportive assistant helping someone build self-advocacy skills.
Generate 5-8 clear steps for breaking down a goal into manageable actions.
Focus on building confidence and providing choices.`,
  accommodationPrompt: `Suggest accommodations that respect different processing styles and sensory needs.`
};
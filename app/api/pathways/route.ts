import { auth } from '@clerk/nextjs/server'
import { getLimitForTier, incrementUsage, readUsage } from '@/lib/metering'
import { resolveTierForUser } from '@/lib/tier'
import Anthropic from '@anthropic-ai/sdk'
import { buildFriendshipPathwayPrompt } from '@/lib/ai-prompts'
import { getProcessingModalities, getSpecialInterests } from '@/lib/personalization'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export async function POST(request: Request) {
  const {
    title = 'Make a friend who likes Pokemon',
    interests = ['pokemon', 'games'],
    processingModalities = [],
    specialInterests = [],
    includeContextualReasons = false
  } = await request.json().catch(() => ({})) as {
    title?: string;
    interests?: string[];
    processingModalities?: string[];
    specialInterests?: string[];
    includeContextualReasons?: boolean;
  }

  // soft metering: if signed in, enforce monthly credits
  try {
    const a = await auth()
    if (a.userId) {
      const tier = await resolveTierForUser(a.userId, a.orgId as string | undefined)
      const limit = getLimitForTier(tier)
      const usage = await readUsage(a.userId)
      if (usage.used >= limit) {
        return new Response(JSON.stringify({ ok: false, error: 'limit_exceeded', limit, used: usage.used }), { status: 429, headers: { 'Content-Type': 'application/json' } })
      }
    }
  } catch {}

  // Build personalized context for AI
  let personalizationContext = ''
  if (processingModalities.length > 0 || specialInterests.length > 0) {
    personalizationContext = ' Consider the user\'s processing style and interests when crafting guidance.'

    if (processingModalities.includes('narrative')) {
      personalizationContext += ' Use story-based analogies and examples since this person thinks in narratives.'
    }
    if (processingModalities.includes('visual')) {
      personalizationContext += ' Include visual descriptions and spatial analogies.'
    }
    if (processingModalities.includes('systematic')) {
      personalizationContext += ' Use logical sequences and cause-effect explanations.'
    }
    if (processingModalities.includes('kinesthetic')) {
      personalizationContext += ' Include physical actions and hands-on approaches.'
    }
    if (specialInterests.length > 0) {
      personalizationContext += ` Incorporate examples from their interests: ${specialInterests.join(', ')}.`
    }
  }

  if (process.env.ANTHROPIC_API_KEY) {
    try {
      // Get user's personalization context
      let userContext;
      try {
        const a = await auth();
        if (a.userId) {
          const modalities = getProcessingModalities();
          const interests = getSpecialInterests();
          userContext = {
            processingModalities: modalities,
            specialInterests: interests,
            taskType: 'friendship' as const
          };
        }
      } catch {}

      const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
      const prompt = buildFriendshipPathwayPrompt(title, interests, userContext);

      const msg = await anthropic.messages.create({
        model: process.env.ANTHROPIC_MODEL_HAIKU || 'claude-3-haiku-20240307',
        max_tokens: 1500,
        temperature: 0.4,
        messages: [{ role: 'user', content: prompt }]
      })
      const text = (msg.content[0] as any)?.text || '{}'
      const parsed = JSON.parse(text)
      if (parsed?.steps?.length) {
        try {
          const a = await auth(); if (a.userId) await incrementUsage(a.userId, 1)
        } catch {}
        return new Response(JSON.stringify({ ok: true, title, steps: parsed.steps }), { headers: { 'Content-Type': 'application/json' } })
      }
    } catch (error) {
      console.warn('AI pathway generation failed:', error)
      // fall through to demo
    }
  }

  // Enhanced demo data with 4 phases
  const demoSteps = [
    // Understanding phase
    {
      id: 'understanding_1',
      order: 1,
      phase: 'understanding',
      instruction: `Spend 5 minutes thinking about what friendship means to you, using examples from ${interests[0] || 'your interests'}`,
      tip: 'There\'s no right answer - this is just for you to explore',
      ...(includeContextualReasons && { contextualReason: 'This helps you understand friendship on your own terms' })
    },
    {
      id: 'understanding_2',
      order: 2,
      phase: 'understanding',
      instruction: 'Write down 3 qualities you value in potential friends',
      tip: 'Focus on what feels important to you personally',
      ...(includeContextualReasons && { contextualReason: 'This clarifies what you\'re looking for in connections' })
    },

    // Practice phase
    {
      id: 'practice_1',
      order: 3,
      phase: 'practice',
      instruction: `Practice a simple conversation starter about ${interests[0] || 'an interest'} in front of a mirror`,
      tip: 'Start small and build confidence gradually',
      ...(includeContextualReasons && { contextualReason: 'This builds comfort with social skills in a low-pressure way' })
    },
    {
      id: 'practice_2',
      order: 4,
      phase: 'practice',
      instruction: 'Role-play a short greeting with a trusted person or pet',
      tip: 'Practice makes the real thing feel more familiar',
      ...(includeContextualReasons && { contextualReason: 'This creates positive associations with social interactions' })
    },
    {
      id: 'practice_3',
      order: 5,
      phase: 'practice',
      instruction: 'Write down one thing you did well in each practice attempt',
      tip: 'Focus on effort and small successes',
      ...(includeContextualReasons && { contextualReason: 'This builds confidence by recognizing your progress' })
    },

    // Opportunities phase
    {
      id: 'opportunities_1',
      order: 6,
      phase: 'opportunities',
      instruction: `Look for a ${interests[0] || 'special interest'} group or meetup in your area or online`,
      tip: 'Start with virtual options if in-person feels overwhelming',
      ...(includeContextualReasons && { contextualReason: 'This connects you with people who already share your interests' })
    },
    {
      id: 'opportunities_2',
      order: 7,
      phase: 'opportunities',
      instruction: 'Set one small personal goal for your first meetup (like "say hello to one person")',
      tip: 'Keep goals achievable and focused on showing up',
      ...(includeContextualReasons && { contextualReason: 'This makes the experience feel manageable and success-focused' })
    },

    // Confidence phase
    {
      id: 'confidence_1',
      order: 8,
      phase: 'confidence',
      instruction: 'After any social attempt, write down one thing you\'re proud of',
      tip: 'Include both big and small achievements',
      ...(includeContextualReasons && { contextualReason: 'This celebrates your courage and builds positive momentum' })
    },
    {
      id: 'confidence_2',
      order: 9,
      phase: 'confidence',
      instruction: 'Notice how your comfort level changes over time',
      tip: 'Progress might not be linear - that\'s okay',
      ...(includeContextualReasons && { contextualReason: 'This helps you see your growth and build self-trust' })
    }
  ]

  try { const a = await auth(); if (a.userId) await incrementUsage(a.userId, 1) } catch {}
  return new Response(JSON.stringify({ ok: true, title, steps: demoSteps }), { headers: { 'Content-Type': 'application/json' } })
}

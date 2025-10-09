import { MeetupTemplate } from '@/lib/types'

// Pre-defined clinical meetup templates
const MEETUP_TEMPLATES: MeetupTemplate[] = [
  {
    id: 'drawing-circle',
    name: 'Drawing Circle',
    description: 'A relaxed space for sharing and discussing drawing techniques and art',
    targetAudience: 'People interested in visual arts and drawing',
    clinicalNotes: 'Structured sharing format helps manage turn-taking and reduces overwhelm',
    phases: [
      {
        name: 'Welcome & Introductions',
        duration: 10,
        description: 'Warm welcome and optional sharing of current art projects',
        prompts: [
          'Share one thing you\'re working on right now',
          'What medium are you most excited about trying?',
          'What drew you to this drawing circle?'
        ]
      },
      {
        name: 'Main Sharing',
        duration: 25,
        description: 'Structured sharing of techniques, tips, and work in progress',
        prompts: [
          'Share a technique you\'ve learned recently',
          'Show a piece you\'re proud of (optional)',
          'Ask for feedback on a specific challenge',
          'Share a favorite art supply or tool'
        ]
      },
      {
        name: 'Q&A and Discussion',
        duration: 15,
        description: 'Open discussion about art-related topics and questions',
        prompts: [
          'What art challenges are you facing?',
          'Share a resource or tutorial you recommend',
          'Discuss upcoming art shows or events',
          'Talk about inspiration and creativity'
        ]
      },
      {
        name: 'Wrap-up',
        duration: 5,
        description: 'Gratitude sharing and optional next meetup planning',
        prompts: [
          'One thing you enjoyed about today',
          'One thing you learned',
          'Would you like to share contact info with anyone?'
        ]
      }
    ],
    facilitationGuide: 'Keep discussions focused on art techniques and experiences. Encourage optional participation. Have backup prompts ready if conversation lags.'
  },

  {
    id: 'game-strategy',
    name: 'Game Strategy Discussion',
    description: 'Discuss game strategies, share tips, and connect over gaming interests',
    targetAudience: 'Gamers interested in strategy games, RPGs, and puzzle games',
    clinicalNotes: 'Game discussions can be highly engaging and help build conversational skills around shared interests',
    phases: [
      {
        name: 'Welcome & Gaming Check-in',
        duration: 10,
        description: 'Share current gaming activities and interests',
        prompts: [
          'What game are you playing right now?',
          'What genre do you enjoy most?',
          'Share a recent gaming achievement'
        ]
      },
      {
        name: 'Strategy Sharing',
        duration: 25,
        description: 'Discuss strategies, tips, and approaches to different games',
        prompts: [
          'Share a strategy that worked well for you',
          'Discuss a challenging level or boss',
          'Talk about character builds or team compositions',
          'Share a gaming tip or shortcut'
        ]
      },
      {
        name: 'Problem Solving',
        duration: 15,
        description: 'Help each other with gaming challenges and questions',
        prompts: [
          'Ask for help with a specific game mechanic',
          'Discuss difficult puzzles or quests',
          'Share solutions to common problems',
          'Recommend games for different skill levels'
        ]
      },
      {
        name: 'Gaming Social',
        duration: 5,
        description: 'Casual gaming-related chat and future meetup ideas',
        prompts: [
          'Share a funny gaming moment',
          'Talk about upcoming game releases',
          'Plan a co-op gaming session',
          'Exchange gaming usernames'
        ]
      }
    ],
    facilitationGuide: 'Encourage sharing of both successes and challenges. Keep discussions game-focused to maintain engagement. Have backup game-related topics ready.'
  },

  {
    id: 'special-interest-share',
    name: 'Special Interest Sharing',
    description: 'Share knowledge and enthusiasm about personal special interests',
    targetAudience: 'People with deep knowledge in specific topics or hobbies',
    clinicalNotes: 'Special interests provide natural conversation topics and can help build connections around shared passions',
    phases: [
      {
        name: 'Interest Introductions',
        duration: 10,
        description: 'Briefly introduce personal special interests and current fascinations',
        prompts: [
          'What\'s your main special interest right now?',
          'Share one fact you find fascinating',
          'What got you interested in this topic?'
        ]
      },
      {
        name: 'Deep Dive Sharing',
        duration: 25,
        description: 'Share detailed information and insights about special interests',
        prompts: [
          'Share an interesting fact or discovery',
          'Explain a concept you find elegant',
          'Discuss connections between different interests',
          'Share a resource or learning material'
        ]
      },
      {
        name: 'Q&A and Connections',
        duration: 15,
        description: 'Ask questions and explore how interests connect',
        prompts: [
          'Ask a question about someone else\'s interest',
          'Share how two interests relate to each other',
          'Discuss how you apply your interest in daily life',
          'Explore potential collaborations or joint projects'
        ]
      },
      {
        name: 'Interest Exchange',
        duration: 5,
        description: 'Share contact info for continued discussions',
        prompts: [
          'One thing you want to learn more about',
          'One person you\'d like to talk to more',
          'Future discussion topics or meetups',
          'Resource recommendations'
        ]
      }
    ],
    facilitationGuide: 'Embrace enthusiasm while keeping discussions accessible. Prepare to gently redirect if conversations become too niche. Encourage cross-interest connections.'
  },

  {
    id: 'walk-and-talk',
    name: 'Walk & Talk',
    description: 'Casual walking meetup with optional conversation topics',
    targetAudience: 'People who prefer movement and optional social interaction',
    clinicalNotes: 'Movement can reduce anxiety while providing optional social opportunities. Parallel participation is encouraged.',
    phases: [
      {
        name: 'Meeting & Starting Out',
        duration: 5,
        description: 'Gather and begin walking together',
        prompts: [
          'Share your walking route preference (optional)',
          'Mention any mobility considerations',
          'Set walking pace expectations'
        ]
      },
      {
        name: 'Optional Sharing',
        duration: 25,
        description: 'Share thoughts or experiences as desired - no pressure to participate',
        prompts: [
          'Share a recent positive experience',
          'Talk about a current interest or hobby',
          'Discuss local area features or parks',
          'Share thoughts on current events (optional)'
        ]
      },
      {
        name: 'Nature & Environment',
        duration: 15,
        description: 'Observe and discuss surroundings, weather, or natural elements',
        prompts: [
          'Notice something interesting in the environment',
          'Share favorite outdoor activities',
          'Discuss seasonal changes or weather',
          'Talk about favorite walking spots'
        ]
      },
      {
        name: 'Wrap-up & Next Time',
        duration: 5,
        description: 'End walk and discuss future meetups',
        prompts: [
          'Share one positive thing from today',
          'Suggest alternative meeting locations',
          'Express interest in future walks',
          'Exchange contact info if desired'
        ]
      }
    ],
    facilitationGuide: 'Emphasize that participation is completely optional. Keep pace comfortable for all. Have indoor backup plan for weather. Focus on parallel enjoyment rather than forced conversation.'
  }
]

export async function GET() {
  try {
    return new Response(JSON.stringify({
      success: true,
      templates: MEETUP_TEMPLATES
    }), { headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    console.error('Error fetching meetup templates:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch templates' }), { status: 500 })
  }
}

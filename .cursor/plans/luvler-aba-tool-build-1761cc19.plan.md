<!-- 1761cc19-94b3-4ca0-ac94-25e8335d30d4 53365bad-cfe5-4711-99c3-c2c89b157229 -->
# Luvler ABA Tool - Complete Build Plan

## Tech Stack

- Next.js 14+ (App Router) with TypeScript
- Tailwind CSS for styling
- Anthropic Claude API (Haiku for simple tasks, Sonnet for complex clinical analysis)
- Netlify Functions (serverless) for API routes
- Netlify Blobs for simple data storage
- React components adapted from existing TSX files

## Branding & Design System

### Color Palette (Heart/Love Theme)

- Primary: Warm coral/rose (#FF6B7A, #FF8BA0)
- Secondary: Soft purple (#A78BFA, #C4B5FD)
- Accent: Warm pink (#FCA5A5, #FBCFE8)
- Neutral: Warm grays with slight rose tint
- Success: Soft green (#86EFAC)
- Background: Cream/warm white gradients

### Typography & Visual Elements

- Rounded, friendly fonts (Inter/DM Sans)
- Heart icons and warm visual metaphors
- Soft shadows and gradients
- Rounded corners (more than current design)
- "Love to learn" messaging throughout

### Logo/Branding

- Heart + learning icon hybrid
- Tagline: "Love to learn, step by step" or "Learn with love"
- Warm, approachable, non-clinical aesthetic

## Project Structure

```
/Users/home/dev/ABA-tool/
├── app/
│   ├── layout.tsx (root layout, metadata, fonts)
│   ├── page.tsx (router screen)
│   ├── self-advocacy/
│   │   └── page.tsx (self-advocacy assistant)
│   ├── professional/
│   │   └── page.tsx (5-stage professional tool)
│   └── api/ (placeholder, actual APIs in netlify/functions)
├── components/
│   ├── router-screen.tsx
│   ├── self-advocacy/
│   │   ├── step-tracker.tsx
│   │   ├── progress-display.tsx
│   │   └── preferences-panel.tsx
│   ├── professional/
│   │   ├── stage-content.tsx
│   │   ├── compliance-checklist.tsx
│   │   └── goal-analysis.tsx
│   └── shared/
│       ├── header.tsx
│       └── theme-provider.tsx
├── lib/
│   ├── ai-prompts.ts (cost-optimized prompts)
│   ├── types.ts (TypeScript interfaces)
│   └── utils.ts (helper functions)
├── netlify/
│   └── functions/
│       ├── generate-steps.ts (self-advocacy AI)
│       ├── analyze-goal.ts (professional AI)
│       └── task-analysis.ts (professional AI)
├── public/
│   └── (images, icons)
├── styles/
│   └── globals.css (Tailwind + custom styles)
├── netlify.toml (Netlify configuration)
├── .env.example (API key template)
├── next.config.js
├── tailwind.config.ts (Luvler color scheme)
├── tsconfig.json
└── package.json
```

## Implementation Steps

### Phase 1: Project Setup & Configuration

**1.1 Initialize Next.js Project**

- Create Next.js 14+ app with TypeScript
- Install dependencies: `@anthropic-ai/sdk`, `lucide-react`, `tailwindcss`
- Configure Tailwind with Luvler color palette
- Set up TypeScript strict mode

**1.2 Netlify Configuration**

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"

[[redirects]]
  from = "/*"
  to = "/.netlify/functions/:splat"
  status = 200
  conditions = {path = ["/api/*"]}
```

**1.3 Environment Variables**

Create `.env.example`:

```
ANTHROPIC_API_KEY=your_api_key_here
NEXT_PUBLIC_SITE_URL=https://luvler.com
```

Configure in Netlify dashboard: Site settings → Environment variables

### Phase 2: Design System Implementation

**2.1 Tailwind Configuration** (`tailwind.config.ts`)

- Define Luvler color palette (coral, rose, warm purple)
- Custom fonts (rounded, friendly)
- Extended spacing for generous white space
- Animation presets (reduced motion support)

**2.2 Global Styles** (`styles/globals.css`)

- CSS custom properties for theme values
- Dark mode overrides (warm dark theme)
- Accessibility utilities (focus states, high contrast)

**2.3 Shared Components**

- Header with Luvler branding and heart logo
- Consistent button styles (rounded, warm colors)
- Card components with soft shadows
- Progress indicators with heart icons

### Phase 3: Router Screen (Entry Point)

**3.1 Main Router Page** (`app/page.tsx`)

Adapt from `intro-router.tsx` lines 109-186:

- Welcome screen with Luvler branding
- Three path options with heart/love imagery
- "Love to learn" messaging
- Smooth transitions and animations

**3.2 Branding Updates**

- Replace generic icons with heart-based design
- Add Luvler tagline and logo
- Warm color gradients (coral → pink → purple)
- Friendly, inviting copy

### Phase 4: Self-Advocacy Assistant

**4.1 Main Assistant Page** (`app/self-advocacy/page.tsx`)

Adapt from `intro-router.tsx` lines 189-478:

- Goal input with warm, encouraging design
- Dark mode toggle (warm dark theme)
- Text size controls
- Sensory-friendly preferences

**4.2 Step Tracker Component**

- One-at-a-time view (focused mode)
- All-steps view (overview mode)
- Heart icons for completion
- Progress bar with warm colors
- Accommodation tips in soft cards

**4.3 AI Integration** (`netlify/functions/generate-steps.ts`)

Cost-optimized prompt for Claude Haiku:

```typescript
// Target: 300-500 tokens per request
const SELF_ADVOCACY_PROMPT = `Break down this goal into 5-7 clear steps.
For each step:
- Write one clear action
- Estimate time in minutes
- Suggest one accommodation tip

Goal: ${userGoal}

Return JSON: [{id, instruction, estimatedMinutes, accommodationTip}]`;
```

### Phase 5: Professional Tool (5-Stage Workflow)

**5.1 Professional Tool Page** (`app/professional/page.tsx`)

Adapt from `aba-goal-final.tsx` with Luvler branding:

- 5 stages: Input → Analysis → Task Planning → Implementation → Tracking
- Mode toggle: Clinician vs Parent
- Progress bar between stages
- Compliance checklist sidebar

**5.2 Stage Components**

Each stage gets a component in `components/professional/`:

- **Stage 0**: Goal input form with domain selection
- **Stage 1**: SMART goal analysis with AI validation
- **Stage 2**: Task breakdown with prompting hierarchy
- **Stage 3**: Implementation guide (dual-mode translation)
- **Stage 4**: Progress tracking visualization

**5.3 AI Integration** (`netlify/functions/analyze-goal.ts`)

Use Claude Sonnet for complex analysis:

```typescript
// Target: 800-1200 tokens per request
const CLINICAL_PROMPT = `You are a BCBA. Analyze this goal:
${goalInput}

Generate:
1. SMART breakdown (5 components)
2. Task analysis (6-8 steps)
3. Teaching method
4. Data collection plan

Context: Age ${age}, Skill level: ${skillLevel}
Return structured JSON matching Goal schema.`;
```

**5.4 Compliance Checklist**

From `aba-goal-final.tsx` lines 123-224:

- Clinician: BACB ethics, research validation
- Parent: Daily implementation checklist
- Collapsible sidebar
- Checkboxes with persistence

### Phase 6: Cost Optimization Strategy

**6.1 Smart Model Selection**

```typescript
// lib/ai-prompts.ts
export const selectModel = (taskType: string) => {
  switch(taskType) {
    case 'self-advocacy':
      return 'claude-3-haiku-20240307'; // Cheapest
    case 'goal-parsing':
      return 'claude-3-haiku-20240307'; // Simple parsing
    case 'clinical-analysis':
      return 'claude-3-5-sonnet-20241022'; // Complex analysis
    default:
      return 'claude-3-haiku-20240307';
  }
};
```

**6.2 Prompt Engineering**

- Minimal system prompts (under 200 tokens)
- Direct JSON output (no markdown wrapping)
- Reusable prompt templates
- Batch similar requests when possible

**6.3 Response Caching**

Store generated goals in Netlify Blobs:

- Cache common goal patterns
- Reduce duplicate API calls
- 24-hour TTL for cached responses

**6.4 Token Usage Tracking**

Add logging to each Netlify Function:

```typescript
console.log(`Token usage: ${response.usage.input_tokens} in, ${response.usage.output_tokens} out`);
```

### Phase 7: Netlify Functions Implementation

**7.1 Generate Steps Function** (`netlify/functions/generate-steps.ts`)

```typescript
import Anthropic from '@anthropic-ai/sdk';

export default async (request: Request) => {
  const { goalInput } = await request.json();
  
  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  });
  
  const response = await client.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 500,
    messages: [{ 
      role: 'user', 
      content: `Break down: "${goalInput}" into 5-7 clear steps...` 
    }]
  });
  
  return new Response(JSON.stringify(response.content[0].text), {
    headers: { 'Content-Type': 'application/json' }
  });
};
```

**7.2 Analyze Goal Function** (`netlify/functions/analyze-goal.ts`)

Full SMART goal analysis with Sonnet

**7.3 Task Analysis Function** (`netlify/functions/task-analysis.ts`)

Detailed task breakdown with prompting hierarchies

### Phase 8: TypeScript Types & Interfaces

**8.1 Core Types** (`lib/types.ts`)

From specs document lines 238-388:

```typescript
interface SelfAdvocacyGoal {
  id: string;
  userId: string;
  userGoal: string;
  steps: SimpleStep[];
  accommodations: string[];
  preferences: UserPreferences;
}

interface Goal {
  id: string;
  mode: 'clinician' | 'user';
  rawGoalText: string;
  parsedGoal: SmartGoal;
  taskBreakdown: TaskStep[];
  implementation: ImplementationGuide;
}
```

### Phase 9: Accessibility & Autism-Friendly Features

**9.1 Sensory Accommodations**

- Dark mode with warm colors (not stark black/white)
- Reduced motion preferences
- Text size controls (normal/large/xlarge)
- High contrast mode option

**9.2 Cognitive Load Management**

- Progressive disclosure (one thing at a time)
- Clear visual hierarchy
- Predictable navigation
- No time pressure
- Frequent auto-save

**9.3 Language Guidelines**

- Literal, concrete language (no idioms)
- No condescending phrases
- Direct, honest feedback
- Respectful celebration messages

### Phase 10: Deployment & Testing

**10.1 Pre-Deployment Checklist**

- Test all Netlify Functions locally
- Verify environment variables in Netlify dashboard
- Test API key encryption/security
- Check responsive design on mobile
- Accessibility audit (WCAG AA)

**10.2 Netlify Deployment**

- Push to GitHub (user already connected)
- Netlify auto-deploys on push
- Configure custom domain: luvler.com
- Set up SSL certificate (automatic)

**10.3 Cost Monitoring Setup**

- Add token usage logging to all functions
- Create usage dashboard/spreadsheet
- Set up Anthropic API usage alerts
- Monitor Netlify function invocations

## Key Files to Create (Priority Order)

1. `package.json` - Dependencies and scripts
2. `tailwind.config.ts` - Luvler color scheme
3. `app/layout.tsx` - Root layout with branding
4. `app/page.tsx` - Router screen
5. `app/self-advocacy/page.tsx` - Self-advocacy assistant
6. `app/professional/page.tsx` - Professional tool
7. `netlify/functions/generate-steps.ts` - Self-advocacy AI
8. `netlify/functions/analyze-goal.ts` - Clinical AI
9. `lib/types.ts` - TypeScript interfaces
10. `lib/ai-prompts.ts` - Cost-optimized prompts
11. `netlify.toml` - Netlify configuration
12. `.env.example` - Environment template

## Cost Estimates (Monthly)

**Target: Under $10/month for 1000+ active users**

- Self-advocacy requests: ~400 tokens avg × $0.25/1M = $0.0001 per request
- Clinical analysis: ~1000 tokens avg × $3/1M (Sonnet) = $0.003 per request
- 1000 users, 5 goals each = 5000 requests
- Estimated cost: $1.50-5.00/month (mostly Haiku usage)

**Subscription Model**:

- Individuals: Free (self-advocacy path)
- Parents/Families: $5/month
- Clinics/Schools: $15/month per clinician
- Revenue goal: $50-100/month covers all costs + growth

## Success Metrics

- Page load: < 2 seconds
- AI response time: < 3 seconds (Haiku), < 5 seconds (Sonnet)
- Mobile responsive: 100%
- WCAG AA compliance: 100%
- Token efficiency: < 1000 tokens per complex goal
- User retention: Track goal completions

### To-dos

- [ ] Initialize Next.js 14 project with TypeScript, install dependencies (@anthropic-ai/sdk, lucide-react, tailwindcss), configure package.json with Netlify build scripts
- [ ] Create Tailwind config with Luvler color palette (coral/rose/purple), set up global CSS with dark mode, define typography and spacing for autism-friendly design
- [ ] Create netlify.toml with Next.js plugin, configure functions directory, set up environment variable template (.env.example)
- [ ] Create lib/types.ts with all interfaces (SelfAdvocacyGoal, Goal, TaskStep, etc.) from specifications document
- [ ] Build app/page.tsx router screen with Luvler branding, heart/love theme, three path options, adapting from intro-router.tsx
- [ ] Create app/self-advocacy/page.tsx with goal input, step tracker, progress display, accessibility controls (dark mode, text size), adapting from intro-router.tsx
- [ ] Create app/professional/page.tsx with 5-stage workflow, mode toggle, compliance checklist sidebar, adapting from aba-goal-final.tsx
- [ ] Create lib/ai-prompts.ts with cost-optimized prompts for self-advocacy (Haiku) and clinical analysis (Sonnet), include model selection logic and token usage tracking
- [ ] Implement netlify/functions/ with generate-steps.ts, analyze-goal.ts, task-analysis.ts using Anthropic SDK, environment variable handling, and error handling
- [ ] Build reusable components in components/shared/: header with Luvler logo, progress indicators, card layouts, button styles with heart theme
- [ ] Implement accessibility features: reduced motion support, high contrast mode, keyboard navigation, ARIA labels, sensory accommodations throughout all pages
- [ ] Test all Netlify Functions locally, verify responsive design, run accessibility audit, configure Netlify environment variables, deploy to luvler.com
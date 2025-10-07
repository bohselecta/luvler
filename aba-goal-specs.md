# Professional Behaviorism Goal-Setting Tool for Autism Spectrum
## Technical Specifications Document v1.0

---

## Executive Summary

This document outlines comprehensive specifications for an AI-enabled behavioral goal-setting and translation tool designed specifically for individuals on the autism spectrum. The tool serves dual purposes: enabling clinicians to create evidence-based behavioral intervention goals and facilitating parent-child communication translation for verbal autistic individuals.

---

## 1. Research Foundation

### Evidence-Based Practices
The tool is grounded in the following research-supported methodologies:

**Applied Behavior Analysis (ABA)**
- Evidence-based best practice recognized by US Surgeon General and American Psychological Association
- Focuses on antecedents (what happens before), behaviors (target actions), and consequences (what happens after)
- Utilizes positive reinforcement and systematic instruction
- Emphasizes breaking down complex skills into manageable components

**Task Analysis Framework**
- Systematic decomposition of complex behaviors into sequential steps
- Supports forward chaining (first step → last step)
- Supports backward chaining (last step → first step)
- Supports total task teaching (entire sequence with problematic steps broken down)

**SMART Goal Methodology**
- **S**pecific: Clearly defined outcomes targeting particular skills
- **M**easurable: Observable criteria with quantifiable data collection
- **A**ttainable: Realistic based on current skill level and prerequisites
- **R**elevant: Aligned with individual needs and family priorities
- **T**ime-bound: Specific timeframe for achievement

**Neurodivergent-Affirming Design Principles**
- Autism-friendly interface guidelines (clear, predictable, sensory-considerate)
- Executive function support for ADHD and autism
- Autonomy and self-advocacy centered
- Reduced cognitive load through progressive disclosure
- Literal language without idioms or metaphors
- Predictable navigation patterns
- Optional sensory adjustments (reduced motion, high contrast, dark mode)

**Key Research Sources:**
- National Professional Development Center on Autism Spectrum Disorders
- Behavior Analyst Certification Board (BACB) standards
- Meta-analyses on ABA efficacy (555+ participants across 14 RCTs)
- Evidence for communication interventions in minimally verbal children
- Neurodiversity-affirming design research
- Executive function support systems for ADHD/autism

---

## 2. Application Architecture - Branching Experience

### 2.1 Initial Router System

The application begins with a respectful, agency-centered question that routes users to the appropriate interface:

```
┌─────────────────────────────────────────┐
│     Welcome Screen (Initial Router)     │
├─────────────────────────────────────────┤
│                                         │
│  "Who is this tool for today?"          │
│                                         │
│  [I am on the autism spectrum]          │
│  [I'm helping someone on the spectrum]  │
│  [I'm a clinician/professional]         │
│                                         │
└─────────────────────────────────────────┘
              ↓         ↓         ↓
    ┌─────────┴────┬────┴────┬────┴─────────┐
    ↓              ↓         ↓              ↓
[Self-Advocacy] [Parent]  [Clinician]  [Skip/About]
 Assistant      Mode      Mode
```

**Router Logic:**
- **"I am on the spectrum"** → Neurodivergent-friendly self-advocacy assistant
- **"I'm helping someone"** → Parent/caregiver mode (simplified clinician view)
- **"I'm a clinician"** → Full professional tool with compliance features
- **"Skip/Tell me more"** → About page with option to choose later

### 2.2 Path A: Self-Advocacy Assistant (Neurodivergent-Friendly)

**Target Users:**
- Autistic individuals (all support needs levels)
- People with ADHD seeking executive function support
- Any neurodivergent person wanting autonomous goal management
- Adults and teens who can read and interact with digital interfaces

**Core Philosophy:**
- User is the expert on their own needs
- Agency-centered, not deficit-based
- Supportive without being condescending
- Celebrates neurodivergent ways of thinking
- Accommodates sensory and cognitive differences

**Interface Characteristics:**
- Clean, minimal design with high contrast
- Literal, direct language (no metaphors)
- Predictable navigation (no surprises)
- Step-by-step with clear progress indicators
- Optional reduced motion and dark mode
- No time pressure or countdown timers
- Gentle, authentic encouragement
- Clear "escape" or pause options
- Sensory-friendly color palette (blues, soft greens, neutrals)

**Workflow:**
```
1. What do you want to get done? (Free text input)
   ↓
2. AI breaks it down into clear steps
   ↓
3. Review steps (edit if needed)
   ↓
4. Follow along with checkboxes
   ↓
5. Track progress, celebrate completion
```

**Key Features:**
- **Simple Input**: "What do you need to do?" or "What's your goal?"
- **AI Processing**: Breaks down into autism-friendly steps
- **Clear Instructions**: One step at a time, literal language
- **Visual Progress**: Checkboxes and progress bars
- **Flexible Pacing**: No pressure, save and return anytime
- **Sensory Controls**: Adjust visual/motion preferences
- **Success Tracking**: Visual record of completed goals
- **Optional Reminders**: User controls all notifications
- **Energy Management**: Suggest breaks, acknowledge spoons/battery metaphor
- **Accommodation Suggestions**: AI suggests helpful modifications

### 2.3 Path B: Clinician/Parent Tool

This is the full professional tool we've already designed:
- 5-stage workflow
- SMART goal analysis
- Task analysis with teaching strategies
- Compliance checklists
- Dual-mode translation (clinician/parent)
- Progress tracking and data collection

## 2.4 Technology Stack - Unified Backend, Branching Frontend

**Shared Backend:**
- Same Claude API integration for all paths
- Same database schema for goals
- Unified authentication system
- Different prompt strategies per user type

**Frontend Branches:**
- **Router Component**: Initial selection screen
- **Self-Advocacy App**: Neurodivergent-friendly interface
- **Professional Tool**: Full clinician/parent interface
- **Shared Components**: Progress bars, checkboxes, data visualization

**AI Prompt Adaptation by Path:**

*Self-Advocacy Path:*
```
You are a supportive assistant helping an autistic/neurodivergent person 
accomplish their goal. Break down their goal into:
- Clear, literal steps (no idioms)
- Concrete actions they can see/do
- Appropriate chunk size (not too many at once)
- Accommodation suggestions
- Energy management tips
- Celebration of their approach

Use literal language. Be direct and honest. Never be condescending.
Respect their autonomy and expertise about themselves.
```

*Clinical Path:*
```
You are an expert BCBA creating evidence-based behavioral goals...
[Existing clinical prompt]
```

### 2.5 Neurodivergent Design Guidelines Implementation

**Visual Design:**
- High contrast mode (WCAG AAA)
- Clean, uncluttered layouts
- Consistent spacing and alignment
- Sans-serif fonts (OpenDyslexic optional)
- No flashing or auto-playing content
- Reduced motion option
- Dark mode support

**Language Guidelines:**
- Use literal, concrete language
- Avoid: "Don't worry," "Just relax," "It's easy"
- Use: "Here are the steps," "Take your time," "This might take practice"
- No infantilizing language
- Person-first OR identity-first (user choice)
- Acknowledge when things are hard

**Interaction Patterns:**
- Predictable navigation (always in same place)
- Clear visual indicators of current state
- No hidden navigation
- Confirmation before destructive actions
- Easy undo/redo
- Save progress automatically and frequently
- "Escape hatch" on every screen (save and exit)

**Cognitive Load Management:**
- One task per screen when possible
- Progressive disclosure
- Optional: Show all steps at once OR one at a time (user choice)
- Clear progress indicators
- No time pressure
- Optional reminders (never forced)

**Sensory Considerations:**
- Calm color palette (avoid bright reds, oranges)
- Optional: Mute all sounds
- Optional: Reduce motion/animation
- Optional: Increase text size
- Optional: Simplify visuals further

**Executive Function Support:**
- Break tasks into smallest possible steps
- Visual checklists
- Progress bars
- Time estimates (if helpful to user)
- Optional: Pomodoro-style breaks
- Acknowledge "spoons" or energy levels
- Suggest when to take breaks

### 2.6 Data Models - Extended for Self-Advocacy Path

```typescript
interface SelfAdvocacyGoal {
  id: string;
  userId: string;
  
  // User Input
  userGoal: string; // What they want to do, in their words
  urgency: 'now' | 'soon' | 'someday';
  energyLevel: 'low' | 'medium' | 'high'; // Optional
  
  // AI Generated
  steps: SimpleStep[];
  accommodations: string[];
  estimatedTime: string;
  
  // Progress
  completedSteps: string[];
  startedAt: Date;
  completedAt?: Date;
  
  // User Preferences
  preferences: {
    showAllSteps: boolean;
    reducedMotion: boolean;
    darkMode: boolean;
    textSize: 'normal' | 'large' | 'xlarge';
    reminderPreference: 'none' | 'gentle' | 'direct';
  };
  
  // Celebration
  celebrationMessage: string;
  achievements: string[];
}

interface SimpleStep {
  id: string;
  order: number;
  instruction: string; // Clear, literal instruction
  isCompleted: boolean;
  completedAt?: Date;
  estimatedMinutes?: number;
  notes?: string; // User can add their own notes
  accommodationTip?: string; // Optional suggestion
}
```

**Frontend:**
- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS for styling
- Shadcn/ui component library
- Zustand for state management

**Backend:**
- Next.js API Routes (serverless functions)
- Vercel Edge Functions for AI processing
- Vercel KV (Redis) for session storage
- Vercel Postgres for goal persistence

**AI Integration:**
- Anthropic Claude API (Sonnet 4.5)
- User-provided API key (stored encrypted in session)
- Streaming responses for real-time feedback
- Context-aware goal parsing and generation

**Authentication:**
- NextAuth.js with credential provider
- Demo mode with fake authentication
- Session management with JWT
- Role-based access (Clinician/User mode)

**Deployment:**
- Vercel hosting
- Environment variables for API configuration
- Edge runtime for optimal performance
- Automatic HTTPS and CDN

### 2.2 Data Models

```typescript
// Goal Structure
interface Goal {
  id: string;
  userId: string;
  mode: 'clinician' | 'user';
  
  // Input
  rawGoalText: string;
  domain: GoalDomain;
  currentSkillLevel: string;
  
  // Parsed Components (AI-generated)
  parsedGoal: {
    specific: string;
    measurable: MeasurableCriteria;
    attainable: AttainabilityAssessment;
    relevant: RelevanceContext;
    timeBound: TimeFrame;
  };
  
  // Task Analysis
  taskBreakdown: TaskStep[];
  teachingMethod: 'forward' | 'backward' | 'total';
  prerequisites: Prerequisite[];
  
  // Behavioral Components
  antecedents: Antecedent[];
  targetBehavior: Behavior;
  consequences: Consequence[];
  reinforcementSchedule: ReinforcementPlan;
  
  // Translation Components
  clinicianLanguage: string;
  parentChildLanguage: string;
  visualSupports: VisualAid[];
  
  // Progress Tracking
  baselineData: BaselineMetric[];
  progressMilestones: Milestone[];
  
  createdAt: Date;
  updatedAt: Date;
}

type GoalDomain = 
  | 'communication'
  | 'social-skills'
  | 'adaptive-behavior'
  | 'academic'
  | 'motor-skills'
  | 'self-regulation'
  | 'daily-living';

interface TaskStep {
  stepNumber: number;
  description: string;
  teachingStrategy: string;
  promptingLevel: 'independent' | 'verbal' | 'gestural' | 'model' | 'physical';
  masterycriterion: string;
  dataCollectionMethod: string;
}

interface MeasurableCriteria {
  metric: string;
  successRate: string; // e.g., "80% of opportunities"
  frequency: string; // e.g., "3 out of 5 trials"
  duration: string; // e.g., "for 10 consecutive minutes"
  dataCollectionTools: string[];
}
```

---

## 3. Core Features & Functionality

### 3.1 Progressive Disclosure Architecture

**Multi-Step Workflow (Replaces Single-Page Design)**

The application uses a wizard-style interface with clear stages, allowing users to focus on one aspect at a time:

```
Stage 1: Goal Input → Stage 2: AI Analysis → Stage 3: Task Planning → 
Stage 4: Implementation → Stage 5: Progress Tracking
```

**Benefits of Progressive Disclosure:**
- Reduces cognitive load
- Improves focus and comprehension
- Allows review/edit at each stage
- Prevents overwhelming users with information
- Enables saving progress at any stage
- Supports iterative refinement

### 3.2 Dual-Mode Interface

**Global Mode Selector (Persistent Across All Stages)**
```
┌─────────────────────────────────────────┐
│  [Clinician Mode] ⟷ [User Mode]        │
│  AI Goal Setting Tool - Stage 2 of 5    │
└─────────────────────────────────────────┘
```

**Clinician Mode Features:**
- Professional terminology and technical language
- Complete task analysis with teaching strategies
- Data collection protocols and progress monitoring
- IEP/BIP goal formatting options
- Detailed behavioral intervention components
- Evidence-based practice citations
- **Compliance Checklist:** BACB ethics, evidence-based practices
- **Fidelity Monitoring:** Implementation integrity tracking

**User Mode (Parent-Child Translation) Features:**
- Plain language explanations
- Visual communication supports
- Simple, actionable steps for home implementation
- Encouragement and validation language
- Communication scripts for parent-child dialogue
- Sensory consideration notes
- **Daily Implementation Checklist:** Step-by-step guide
- **Success Tracking:** Celebrate small wins
- **Troubleshooting Guide:** Common challenges and solutions

### 3.3 Five-Stage Workflow Architecture

**Stage 1: Goal Input & Context**
- User describes goal in natural language
- Gathers context: age, skill level, environment
- Domain selection and communication style
- Optional: sensory profile, previous attempts
- AI suggests clarifying questions if needed
- **Output:** Structured goal input ready for analysis

**Stage 2: AI Analysis & SMART Goal Review**
- AI parses goal into SMART components
- Displays behavioral analysis (ABC)
- Identifies prerequisite skills
- Assesses developmental appropriateness
- **Compliance Check:** Evidence-based practice validation
- **User Action:** Review and approve/refine analysis
- **Output:** Validated SMART goal ready for task breakdown

**Stage 3: Task Analysis & Planning**
- AI generates hierarchical task breakdown
- Visual task sequence with chaining method
- Editable steps (add, remove, reorder)
- Prompting hierarchy for each step
- Mastery criteria definition
- **Compliance Check:** Task analysis methodology validation
- **User Action:** Customize steps for individual needs
- **Output:** Finalized task analysis ready for implementation

**Stage 4: Implementation Guide**
- Teaching strategies and materials needed
- Data collection templates
- Visual supports recommendations
- **Clinician Mode:** Professional implementation protocol
- **Parent Mode:** Daily implementation checklist
- Troubleshooting common challenges
- **Compliance Check:** Fidelity of implementation guidelines
- **Output:** Complete implementation plan

**Stage 5: Progress Tracking & Adjustment**
- Data entry interface
- Progress visualization (graphs, charts)
- Milestone tracking
- Goal modification based on progress
- Celebration moments
- **Compliance Check:** Progress monitoring standards
- **Output:** Ongoing data and recommendations

### 3.4 Compliance & Quality Assurance System

**Clinician Compliance Checklist**
```typescript
interface ClinicianCompliance {
  ethicalStandards: {
    bcbaEthicsCode: boolean;
    informedConsent: boolean;
    confidentiality: boolean;
    culturalResponsiveness: boolean;
  };
  evidenceBasedPractice: {
    researchSupported: boolean;
    nationalStandardsAlignment: boolean;
    systematicInstruction: boolean;
    dataBasedDecisionMaking: boolean;
  };
  goalQuality: {
    observable: boolean;
    measurable: boolean;
    functionallyRelevant: boolean;
    sociallySignificant: boolean;
  };
  implementationIntegrity: {
    proceduresDefined: boolean;
    trainingProvided: boolean;
    fidelityMonitored: boolean;
    generalizationPlanned: boolean;
  };
}
```

**Automated Compliance Validation:**
- AI checks each goal component against standards
- Flags potential issues with suggestions
- Provides research citations for techniques
- Links to relevant BACB ethics guidelines
- Generates compliance report for documentation

**Parent Implementation Checklist**
```typescript
interface ParentImplementation {
  preparation: {
    materialsGathered: boolean;
    environmentSet: boolean;
    childReady: boolean;
    timeAllocated: boolean;
  };
  duringPractice: {
    followSteps: boolean;
    providePrompts: boolean;
    giveReinforcement: boolean;
    stayPositive: boolean;
  };
  afterPractice: {
    recordData: boolean;
    celebrateEffort: boolean;
    notesChallenges: boolean;
    planNextSession: boolean;
  };
  weeklyReview: {
    reviewProgress: boolean;
    adjustIfNeeded: boolean;
    shareWithTeam: boolean;
    selfCareCheck: boolean;
  };
}
```

**Interactive Checklist Features:**
- Check off items as completed
- Save progress automatically
- Reminder notifications (optional)
- Tips and explanations for each item
- Flag items needing help
- Connect with support resources

### 3.5 AI-Powered Goal Processing Pipeline

**Stage 1: Goal Input & Context Gathering**
```javascript
// User inputs natural language goal
const userInput = "I want my child to make eye contact when greeting others";

// System gathers context through AI conversation
const context = await gatherContext({
  childAge: number,
  currentSkillLevel: string,
  previousAttempts: string[],
  environmentalFactors: string[],
  sensorySensitivities: string[],
  communicationStyle: 'verbal' | 'minimally-verbal' | 'nonverbal' | 'AAC'
});
```

**Stage 2: AI Goal Parsing**
```javascript
// Claude API processes and structures the goal
const parsedGoal = await claudeAPI.parseGoal({
  input: userInput,
  context: context,
  prompt: `
    You are an expert BCBA (Board Certified Behavior Analyst) specializing in autism.
    Analyze this goal and structure it using ABA principles:
    
    1. Identify the target behavior in observable, measurable terms
    2. Determine antecedents (what happens before)
    3. Define consequences (what happens after)
    4. Break into SMART goal components
    5. Assess prerequisite skills needed
    6. Generate appropriate task analysis
    7. Suggest evidence-based teaching strategies
    
    Return structured JSON following the Goal schema.
  `
});
```

**Stage 3: Task Decomposition (Tautological Behavior Generator)**
```javascript
// AI generates hierarchical task breakdown
const taskAnalysis = await claudeAPI.generateTaskAnalysis({
  goal: parsedGoal,
  method: 'top-down-tautological',
  prompt: `
    Using top-down tautological decomposition:
    1. Start with the complete behavior
    2. Break into necessary subcomponents
    3. For each subcomponent, identify if it's atomic or needs further breakdown
    4. Continue until all steps are teachable units
    5. Define each step operationally
    6. Specify prompting hierarchy for each step
    7. Determine mastery criteria
    
    Example for "making eye contact when greeting":
    - Level 1: Complete greeting exchange with eye contact
      - Level 2A: Recognize greeting situation
        - Level 3A1: Notice person approaching
        - Level 3A2: Identify social cue (wave, "hello")
      - Level 2B: Initiate eye contact
        - Level 3B1: Look toward person's face
        - Level 3B2: Make eye contact for 1-2 seconds
      - Level 2C: Verbal/gestural greeting
        - Level 3C1: Say "hello" or wave
        - Level 3C2: Maintain eye contact during greeting
  `
});
```

**Stage 4: Dual-Language Translation**
```javascript
// Generate both clinician and parent-child versions
const translation = await claudeAPI.translateGoal({
  technicalGoal: parsedGoal,
  taskAnalysis: taskAnalysis,
  mode: currentMode,
  prompt: `
    Generate two versions of this goal:
    
    CLINICIAN VERSION:
    - Use professional ABA terminology
    - Include technical teaching procedures
    - Specify data collection protocols
    - Reference evidence-based practices
    
    PARENT-CHILD VERSION:
    - Use supportive, encouraging language
    - Break into simple home activities
    - Provide visual support suggestions
    - Explain "why" this matters in family context
    - Include tips for sensory considerations
    - Suggest natural reinforcers from daily routines
  `
});
```

### 3.6 UI/UX Workflow - Multi-Stage Interface

**Navigation Pattern:**
```
┌─────────────────────────────────────────────────────────┐
│  Header: [Mode Toggle] [Stage: 2/5] [Save] [Settings]  │
├─────────────────────────────────────────────────────────┤
│  Progress: [●]──[●]──[○]──[○]──[○]                     │
│           Input Analysis Task  Impl.  Track             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [Stage Content Area]                                   │
│                                                         │
│  [Compliance Checklist Sidebar - Collapsible]          │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  Footer: [← Previous] [Save & Continue Later] [Next →] │
└─────────────────────────────────────────────────────────┘
```

**Stage 1 Layout - Goal Input:**
```
┌──────────────────────────────────────────┐
│  Stage 1: Tell Us About Your Goal       │
├──────────────────────────────────────────┤
│                                          │
│  [Goal Description - Large Text Area]   │
│                                          │
│  [Context Cards - Age, Skill, Domain]   │
│                                          │
│  [Optional Details - Accordion]          │
│  └─ Sensory Profile                     │
│  └─ Communication Style                 │
│  └─ Previous Attempts                   │
│                                          │
│  [Demo Button] [Next: Analyze Goal →]   │
└──────────────────────────────────────────┘
```

**Stage 2 Layout - AI Analysis:**
```
┌──────────────────────────────────────────┬─────────────┐
│  Stage 2: Review AI Analysis             │ Compliance  │
│                                          │   Check     │
├──────────────────────────────────────────┤             │
│  [SMART Goal Accordion]                  │ ✓ Observable│
│  ├─ Specific [Edit]                      │ ✓ Measurable│
│  ├─ Measurable [Edit]                    │ ✓ Research  │
│  ├─ Attainable [Edit]                    │ ⚠ Timeline  │
│  ├─ Relevant [Edit]                      │             │
│  └─ Time-bound [Edit]                    │ [Details]   │
│                                          │             │
│  [ABC Analysis Cards]                    │             │
│  [Prerequisites List]                    │             │
│                                          │             │
│  [← Back] [Regenerate] [Approve & Next →]│             │
└──────────────────────────────────────────┴─────────────┘
```

**Stage 3 Layout - Task Analysis:**
```
┌──────────────────────────────────────────┬─────────────┐
│  Stage 3: Plan the Steps                 │ Methodology │
│                                          │   Check     │
├──────────────────────────────────────────┤             │
│  [Chaining Method Selector]              │ ✓ Sequential│
│  ○ Forward  ● Backward  ○ Total Task    │ ✓ Operational│
│                                          │ ✓ Criteria  │
│  [Visual Task Timeline]                  │ ✓ Prompting │
│  ┌─[1]──[2]──[3]──[4]──[5]──[6]─┐      │             │
│  │                                │      │ [Guide]     │
│  │ [Step Details - Expandable]   │      │             │
│  │ Step 1: Turn on water          │      │             │
│  │ • Description: [Edit]          │      │             │
│  │ • Prompting: [Dropdown]        │      │             │
│  │ • Mastery: [Input]             │      │             │
│  │ [Reorder ↑↓] [Remove ×]        │      │             │
│  │                                │      │             │
│  │ [+ Add Step]                   │      │             │
│  └────────────────────────────────┘      │             │
│                                          │             │
│  [← Back] [Save Draft] [Next: Implement →]│             │
└──────────────────────────────────────────┴─────────────┘
```

**Stage 4 Layout - Implementation Guide:**
```
┌──────────────────────────────────────────┬─────────────┐
│  Stage 4: Implementation Plan            │ Daily       │
│                                          │ Checklist   │
├──────────────────────────────────────────┤             │
│  [Clinician Mode]                        │ Preparation │
│  • Teaching Strategies                   │ □ Materials │
│  • Data Collection Protocol              │ □ Environment│
│  • Fidelity Checklist                    │ □ Child Ready│
│  • Professional Resources                │             │
│                                          │ Practice    │
│  [Parent Mode]                           │ □ Follow steps│
│  • Today's Activity Guide                │ □ Prompts   │
│  • Visual Supports to Print              │ □ Reinforce │
│  • Celebration Ideas                     │ □ Stay positive│
│  • When to Ask for Help                  │             │
│                                          │ After       │
│  [Materials Needed List]                 │ □ Record data│
│  [Download Implementation Guide PDF]     │ □ Celebrate │
│                                          │             │
│  [← Back] [Print All] [Start Tracking →] │ [Tips]      │
└──────────────────────────────────────────┴─────────────┘
```

**Stage 5 Layout - Progress Tracking:**
```
┌──────────────────────────────────────────┬─────────────┐
│  Stage 5: Track Progress                 │ Weekly      │
│                                          │ Review      │
├──────────────────────────────────────────┤             │
│  [Date Selector] [Add Session Data]      │ □ Progress  │
│                                          │ □ Adjust    │
│  [Progress Graph - Line Chart]           │ □ Share     │
│  100%┤                               ✓   │ □ Self-care │
│      │                           ✓       │             │
│   50%┤                   ✓   ✓           │ [Resources] │
│      │       ✓   ✓   ✓                   │             │
│    0%└───────────────────────────────    │             │
│      Week 1  2  3  4  5  6  7  8        │             │
│                                          │             │
│  [Milestone Tracker]                     │             │
│  ✓ Completed 3 steps independently       │             │
│  ✓ Maintained for 1 week                 │             │
│  ○ Generalized to school (in progress)   │             │
│                                          │             │
│  [Celebration Wall - Recent Wins]        │             │
│  [Modify Goal] [Generate Report]         │             │
│                                          │             │
│  [← Back to Implementation] [New Goal]   │             │
└──────────────────────────────────────────┴─────────────┘
```

**Responsive Mobile Layout:**
- Collapsible sidebar becomes bottom sheet
- Larger touch targets
- Simplified forms with progressive disclosure
- Swipe between stages
- Sticky progress bar at top

---

## 4. AI Integration Details

### 4.1 API Key Management

**User Flow:**
1. User signs in (demo credentials or creates account)
2. Settings page prompts for Anthropic API key
3. Key encrypted and stored in session (not database)
4. Key validated with test API call
5. Clear instructions with link to Anthropic console

**Security:**
```typescript
// API key encryption
import { encrypt, decrypt } from '@/lib/crypto';

async function storeAPIKey(key: string, sessionId: string) {
  const encrypted = encrypt(key, process.env.ENCRYPTION_KEY);
  await kv.set(`api_key:${sessionId}`, encrypted, {
    ex: 3600 // 1 hour expiration
  });
}

async function getAPIKey(sessionId: string): Promise<string> {
  const encrypted = await kv.get(`api_key:${sessionId}`);
  return decrypt(encrypted, process.env.ENCRYPTION_KEY);
}
```

### 4.2 Claude API Prompts

**System Prompt Template:**
```
You are an expert Board Certified Behavior Analyst (BCBA) specializing in Applied Behavior Analysis for individuals on the autism spectrum. Your role is to:

1. Analyze behavioral goals using evidence-based ABA principles
2. Structure goals following SMART criteria
3. Perform task analysis with top-down decomposition
4. Identify prerequisite skills and learning sequences
5. Suggest appropriate teaching strategies (DTT, NET, prompting hierarchies)
6. Recommend data collection methods
7. Consider sensory sensitivities and communication differences
8. Generate parent-friendly translations when requested

Always base recommendations on:
- Current research in ABA and autism intervention
- Individualized assessment of skill level
- Functional behavior analysis principles
- Positive behavior support strategies
- Evidence-based practices from NPDC and National Standards Project

When generating task analyses, use tautological decomposition:
- Start with the complete behavioral goal
- Recursively break down into necessary subcomponents
- Stop when reaching atomic, teachable units
- Define each step operationally (observable, measurable)
- Specify mastery criteria for each step

Output Format: Structured JSON matching the Goal schema provided.
```

**Goal Parsing Prompt:**
```
Given this natural language goal: "{userInput}"

And this context about the individual:
- Age: {age}
- Current skill level: {skillLevel}
- Communication style: {commStyle}
- Sensory profile: {sensoryProfile}
- Previous interventions: {previousAttempts}

Perform comprehensive ABA goal analysis:

1. TARGET BEHAVIOR ANALYSIS
   - Rewrite goal in observable, measurable terms
   - Identify behavior class and function
   - Consider developmental appropriateness

2. SMART GOAL STRUCTURE
   - Specific: Define exactly what behavior will change
   - Measurable: Quantify success criteria (%, frequency, duration)
   - Attainable: Assess based on current skill level and prerequisites
   - Relevant: Explain significance for independence/quality of life
   - Time-bound: Suggest realistic timeframe (typically 3-6 months)

3. TASK ANALYSIS
   - Break goal into 5-10 sequential steps
   - Use {chainMethod} chaining
   - Define each step clearly
   - Specify prompting strategy for each step
   - Suggest reinforcement schedule

4. BEHAVIORAL COMPONENTS
   - Antecedents: What should happen before behavior
   - Behavior: Operational definition
   - Consequences: Reinforcement plan
   - Setting events to consider
   - Discriminative stimuli

5. PREREQUISITE SKILLS
   - Identify skills needed before starting
   - Assess if prerequisites are met
   - Suggest preliminary goals if needed

6. TEACHING STRATEGIES
   - Recommend evidence-based methods (DTT, NET, video modeling, etc.)
   - Consider environmental modifications
   - Suggest visual supports
   - Address sensory considerations

7. DATA COLLECTION
   - Recommend measurement method (frequency, duration, latency, etc.)
   - Suggest data collection tools
   - Define baseline measurement
   - Specify progress monitoring schedule

Return as structured JSON. Be specific, practical, and evidence-based.
```

**Translation Prompt (Clinician → Parent-Child):**
```
You are translating a professional ABA goal into supportive, accessible language for parents and their autistic child.

Technical Goal:
{clinicianGoal}

Task Analysis:
{taskSteps}

Generate a parent-child friendly version that:

1. PARENT SECTION
   - Explain the goal in plain language
   - Describe why this skill matters for their child's independence
   - Break down steps into simple home activities
   - Provide encouragement and validation
   - Suggest natural opportunities to practice (during meals, playtime, routines)
   - Explain how to provide positive reinforcement authentically
   - Address common challenges with compassion

2. VISUAL SUPPORTS
   - Suggest picture schedules or social stories
   - Recommend visual timers or checklists
   - Describe how to create simple visual aids at home

3. SENSORY CONSIDERATIONS
   - Note potential sensory challenges in this skill
   - Suggest accommodations and modifications
   - Provide calming strategies if child becomes overwhelmed

4. COMMUNICATION TIPS
   - Model language to use with child
   - Suggest AAC support if applicable
   - Provide scripts for praising attempts (not just success)

5. CELEBRATION LANGUAGE
   - Frame progress positively
   - Acknowledge small wins
   - Emphasize child's strengths and efforts
   - Avoid deficit-based language

Tone: Warm, supportive, empowering, neurodiversity-affirming. Focus on collaboration and celebrating the child's unique way of learning.
```

### 4.3 Streaming Implementation

```typescript
// API Route: /api/generate-goal
import { OpenAIStream, StreamingTextResponse } from 'ai';

export async function POST(req: Request) {
  const { goalInput, context, sessionId } = await req.json();
  
  const apiKey = await getAPIKey(sessionId);
  
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'anthropic-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      stream: true,
      messages: [{
        role: 'user',
        content: buildGoalPrompt(goalInput, context)
      }],
      system: SYSTEM_PROMPT
    })
  });
  
  // Stream response to client
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
```

---

## 5. User Interface Components

### 5.1 Goal Input Form

**Fields:**
- Goal Description (large text area with AI parsing button)
- Domain Selection (dropdown: Communication, Social, Adaptive, etc.)
- Age/Grade Level
- Current Skill Level (text area)
- Communication Style (verbal/minimally verbal/nonverbal/AAC)
- Sensory Sensitivities (optional text area)
- Previous Interventions Tried (optional)
- Environment (school/home/community)

**AI Assistance:**
- "Help me describe this goal" button → guided prompts
- Real-time parsing as user types (debounced)
- Suggestions based on selected domain

### 5.2 Goal Analysis Display

**Sections:**
1. **SMART Goal Summary** (accordion)
   - Each component explained
   - Edit capability for each section

2. **Task Analysis** (visual timeline)
   - Numbered steps
   - Chaining method selector
   - Drag-to-reorder capability
   - Add/remove/edit steps

3. **Behavioral Components** (cards)
   - Antecedents list
   - Target behavior definition
   - Consequences/reinforcement plan
   - Visual ABC diagram

4. **Teaching Strategies** (expandable panels)
   - Recommended methods
   - Implementation tips
   - Required materials
   - Evidence-based practice citations

5. **Data Collection** (forms)
   - Baseline template
   - Progress monitoring template
   - Graph visualization options

### 5.3 Translation View (Side-by-Side)

```
┌─────────────────────────┬─────────────────────────┐
│   👔 CLINICIAN MODE     │  👨‍👩‍👧 PARENT-CHILD MODE │
├─────────────────────────┼─────────────────────────┤
│                         │                         │
│ Goal: Student will      │ Goal: [Child's Name]    │
│ initiate greetings to   │ will learn to say hello │
│ peers independently     │ to friends              │
│ without prompting in    │                         │
│ 8/10 opportunities      │ Why this matters:       │
│ across 3 consecutive    │ Making friends starts   │
│ days.                   │ with friendly greetings │
│                         │                         │
│ Task Analysis:          │ Steps at Home:          │
│ 1. Discriminate peer    │ 1. Practice noticing    │
│    in proximity         │    when someone is near │
│ 2. Orient body toward   │ 2. Turn to face them    │
│    peer                 │ 3. Make eye contact     │
│ 3. Establish eye        │    (if comfortable)     │
│    contact for 1-2 sec  │ 4. Say "hi" or wave     │
│ 4. Produce verbal       │                         │
│    greeting             │ Fun Practice Ideas:     │
│                         │ • Greeting stuffed      │
│ Teaching: NET approach  │   animals               │
│ Reinforcement: Social   │ • Waving at pets        │
│ praise + peer response  │ • "Hello" to mirror     │
│                         │                         │
│ Data: Frequency count   │ Celebrate Progress:     │
│ Record each opportunity │ Notice when [Child]     │
│                         │ tries to say hi, even   │
│                         │ if they need help!      │
└─────────────────────────┴─────────────────────────┘
```

### 5.4 Demo Mode

**Demo Button → Auto-fills:**
```javascript
const DEMO_GOAL = {
  goalText: "Help my 7-year-old son with autism learn to wash his hands independently",
  age: 7,
  skillLevel: "Can turn on water and wet hands, needs prompts for all other steps",
  domain: "adaptive-behavior",
  commStyle: "verbal",
  sensory: "Dislikes strong smells, prefers lukewarm water"
};
```

**Demo Flow:**
1. Click "Demo" button
2. Fields auto-populate
3. "Generate Goal" automatically triggered
4. AI processes in real-time (streaming)
5. Results appear in both modes simultaneously
6. Toggle between modes to see translation
7. "Clear & Start Fresh" button to reset

---

## 6. Data Persistence & Export

### 6.1 Save Goals

- Goals saved to Vercel Postgres
- Associated with user account
- Searchable by domain, date, child name
- Version history tracking

### 6.2 Export Options

**PDF Generation:**
- Professional IEP/BIP format
- Parent-friendly format
- Both formats in one document

**Formats:**
- PDF (printable)
- JSON (for other systems)
- CSV (for progress tracking)

**Templates:**
- IEP Goal format
- BIP format
- Progress Note format
- Home Program format

---

## 7. Authentication & Deployment

### 7.1 Fake Auth for Demo

```typescript
// Demo credentials
const DEMO_CREDENTIALS = {
  clinician: {
    email: 'clinician@demo.com',
    password: 'demo123',
    role: 'clinician'
  },
  parent: {
    email: 'parent@demo.com',
    password: 'demo123',
    role: 'user'
  }
};

// NextAuth config
export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Check against demo credentials
        // In production, check against database
        return user;
      }
    })
  ]
};
```

### 7.2 Vercel Deployment

**Environment Variables:**
```bash
# .env.local
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-app.vercel.app
DATABASE_URL=your-postgres-url
KV_URL=your-kv-url
ENCRYPTION_KEY=your-encryption-key
```

**Deployment Steps:**
1. Push to GitHub repository
2. Connect to Vercel
3. Configure environment variables
4. Enable Vercel Postgres and KV
5. Deploy
6. Test demo mode

---

## 8. Accessibility & Inclusivity

### Design Principles

**Neurodiversity-Affirming:**
- Avoid deficit-based language
- Celebrate unique learning styles
- Emphasize strengths and interests
- Support self-advocacy

**Accessibility Features:**
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader optimization
- High contrast mode
- Adjustable font sizes
- Reduced motion option

**Sensory Considerations:**
- Calm color palette (blues, greens)
- No auto-playing media
- Optional sound feedback
- Clean, uncluttered layout

---

## 9. Technical Requirements

### Performance Targets
- Initial page load: < 2s
- API response time: < 5s (with streaming)
- Lighthouse score: > 90

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Mobile Responsive
- Breakpoints: 640px, 768px, 1024px, 1280px
- Touch-friendly interface
- Optimized for tablets

---

## 10. Future Enhancements

**Phase 2 Features:**
- Progress tracking with graphs
- Multiple child profiles
- Team collaboration (share goals with teachers/therapists)
- Video modeling integration
- Social stories generator
- Visual schedule creator
- Data collection mobile app
- Automated progress reports

**Advanced AI Features:**
- Analyze uploaded videos of behavior
- Suggest modifications based on progress data
- Generate personalized reinforcement suggestions
- Predict goal timelines based on similar cases

---

## 11. Legal & Ethical Considerations

**Disclaimers:**
- Tool provides educational information, not clinical advice
- Users should consult with qualified BCBAs/professionals
- Goals should be reviewed by IEP teams
- AI suggestions are starting points, not prescriptions

**Privacy:**
- FERPA compliance for student data
- No sharing of personal information
- User data encrypted at rest and in transit
- API keys never stored in database
- Clear data retention policy

**Professional Standards:**
- Aligns with BACB ethical guidelines
- Follows IDEA requirements for IEP goals
- Evidence-based practice standards
- Cultural responsiveness

---

## 12. Development Timeline

**Week 1-2: Core Infrastructure**
- Next.js project setup
- Authentication system
- Database schema
- API key management

**Week 3-4: AI Integration**
- Claude API integration
- Prompt engineering and testing
- Streaming implementation
- Error handling

**Week 5-6: UI Development**
- Goal input interface
- Analysis display components
- Translation view
- Demo mode

**Week 7-8: Testing & Polish**
- Accessibility audit
- Performance optimization
- User testing with clinicians
- Documentation

**Week 9: Deployment**
- Vercel setup
- Environment configuration
- Demo mode testing
- Launch

---

## Conclusion

This tool bridges the critical gap between clinical behavioral analysis and practical family implementation. By leveraging AI to parse goals, perform task analysis, and translate between professional and family-friendly language, it empowers both clinicians and families to work collaboratively toward meaningful outcomes for individuals on the autism spectrum.

The tautological top-down decomposition approach ensures goals are broken into teachable components while maintaining the behavioral precision required for effective intervention. The dual-mode interface serves as a true translation tool, helping verbal autistic individuals and their families understand and implement evidence-based behavioral strategies.

---

**Version:** 1.0  
**Last Updated:** October 6, 2025  
**Prepared for:** Vercel Deployment with AI-enabled goal analysis
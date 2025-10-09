// Luvler ABA Tool - TypeScript Type Definitions
// Based on specifications from aba-goal-specs.md

export type GoalDomain =
  | 'communication'
  | 'social-skills'
  | 'adaptive-behavior'
  | 'academic'
  | 'motor-skills'
  | 'self-regulation'
  | 'daily-living';

export type GoalMode = 'clinician' | 'user';

export type ChainingMethod = 'forward' | 'backward' | 'total';

export type PromptingLevel = 'independent' | 'verbal' | 'gestural' | 'model' | 'physical';

export type CommunicationStyle = 'verbal' | 'minimally-verbal' | 'nonverbal' | 'AAC';

export type UrgencyLevel = 'now' | 'soon' | 'someday';

export type EnergyLevel = 'low' | 'medium' | 'high';

export type TextSize = 'normal' | 'large' | 'xlarge';

export type ReminderPreference = 'none' | 'gentle' | 'direct';

// Self-Advocacy Goal Interface
export interface SelfAdvocacyGoal {
  id: string;
  userId: string;

  // User Input
  userGoal: string; // What they want to do, in their words
  urgency: UrgencyLevel;
  energyLevel?: EnergyLevel; // Optional

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
    textSize: TextSize;
    reminderPreference: ReminderPreference;
  };

  // Celebration
  celebrationMessage: string;
  achievements: string[];
}

// Simple Step for Self-Advocacy
export interface SimpleStep {
  id: string;
  order: number;
  instruction: string; // Clear, literal instruction
  isCompleted: boolean;
  completedAt?: Date;
  estimatedMinutes?: number;
  notes?: string; // User can add their own notes
  accommodationTip?: string; // Optional suggestion
}

// Professional Goal Interface
export interface Goal {
  id: string;
  userId: string;
  mode: GoalMode;

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
  teachingMethod: ChainingMethod;
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

// Task Step for Professional Goals
export interface TaskStep {
  stepNumber: number;
  description: string;
  teachingStrategy: string;
  promptingLevel: PromptingLevel;
  masteryCriterion: string;
  dataCollectionMethod: string;
}

// SMART Goal Components
export interface MeasurableCriteria {
  metric: string;
  successRate: string; // e.g., "80% of opportunities"
  frequency: string; // e.g., "3 out of 5 trials"
  duration: string; // e.g., "for 10 consecutive minutes"
  dataCollectionTools: string[];
}

export interface AttainabilityAssessment {
  currentLevel: string;
  prerequisitesMet: boolean;
  developmentalAppropriateness: string;
  suggestedModifications?: string[];
}

export interface RelevanceContext {
  functionalSignificance: string;
  qualityOfLifeImpact: string;
  generalizationOpportunities: string[];
  maintenanceStrategies: string[];
}

export interface TimeFrame {
  duration: string; // e.g., "12 weeks"
  checkInFrequency: string; // e.g., "weekly"
  masteryTimeline: string; // e.g., "3-4 weeks per step"
}

// Behavioral Components
export interface Antecedent {
  type: 'trigger' | 'setting' | 'motivational';
  description: string;
  modificationStrategies?: string[];
}

export interface Behavior {
  operationalDefinition: string;
  behaviorClass: string;
  function: string;
  topography: string;
}

export interface Consequence {
  type: 'reinforcer' | 'punisher' | 'neutral';
  description: string;
  schedule: string;
  immediacy: 'immediate' | 'delayed';
}

export interface ReinforcementPlan {
  primaryReinforcers: string[];
  secondaryReinforcers: string[];
  schedule: 'continuous' | 'intermittent';
  fadingPlan: string;
}

// Supporting Interfaces
export interface Prerequisite {
  skill: string;
  isMet: boolean;
  assessmentMethod?: string;
  teachingRecommendation?: string;
}

export interface VisualAid {
  type: 'picture' | 'video' | 'schedule' | 'social-story';
  description: string;
  creationTips: string[];
}

export interface BaselineMetric {
  date: Date;
  measurement: string;
  context: string;
  notes?: string;
}

export interface Milestone {
  description: string;
  targetDate?: Date;
  achievedDate?: Date;
  celebration?: string;
}

// User Preferences
export interface UserPreferences {
  showAllSteps: boolean;
  reducedMotion: boolean;
  darkMode: boolean;
  textSize: TextSize;
  reminderPreference: ReminderPreference;
  highContrast?: boolean;
  soundEnabled?: boolean;
}

// API Response Types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  tokenUsage?: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
  };
}

// Form Input Types
export interface GoalInputData {
  rawGoalText: string;
  age?: string;
  skillLevel: string;
  domain: GoalDomain;
  communicationStyle?: CommunicationStyle;
  sensoryProfile?: string;
  previousAttempts?: string[];
  environment?: string;
}

export interface ContextData {
  childAge?: number;
  currentSkillLevel: string;
  previousAttempts: string[];
  environmentalFactors: string[];
  sensorySensitivities: string[];
  communicationStyle: CommunicationStyle;
}

// Progress Tracking
export interface ProgressEntry {
  id: string;
  goalId: string;
  date: Date;
  stepCompleted?: number;
  dataPoint: string;
  notes?: string;
  celebration?: string;
}

export interface ProgressSummary {
  totalSessions: number;
  completedSteps: number;
  averageProgress: number;
  recentTrend: 'improving' | 'stable' | 'declining';
  nextMilestone?: Milestone;
}

// Compliance Types
export interface ClinicianCompliance {
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

export interface ParentImplementation {
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

// Demo Data Types
export interface DemoGoalData {
  goalInput: string;
  age: string;
  skillLevel: string;
  domain: GoalDomain;
  smartGoal: {
    specific: string;
    measurable: string;
    attainable: string;
    relevant: string;
    timeBound: string;
  };
  taskSteps: Array<{
    id: number;
    text: string;
    prompt: string;
    mastery: string;
  }>;
  implementation: {
    clinician: {
      method: string;
      dataCollection: string;
      materials: string[];
      fidelity: string[];
    };
    parent: {
      activity: string;
      tips: string[];
      materials: string[];
      troubleshooting: string[];
    };
  };
}

// AI Prompt Context
export interface AIPromptContext {
  taskType: 'self-advocacy' | 'goal-parsing' | 'clinical-analysis' | 'task-breakdown';
  userGoal: string;
  context?: ContextData;
  preferences?: UserPreferences;
  previousSteps?: SimpleStep[];
}

// Component Props Types
export interface RouterScreenProps {
  onPathSelect: (path: 'self-advocacy' | 'professional') => void;
}

export interface StepTrackerProps {
  steps: SimpleStep[];
  currentIndex: number;
  onStepComplete: (stepId: string) => void;
  onToggleStep: (stepId: string) => void;
  showAllSteps: boolean;
  preferences: UserPreferences;
}

export interface ProgressDisplayProps {
  completed: number;
  total: number;
  showProgress: boolean;
}

export interface PreferencesPanelProps {
  preferences: UserPreferences;
  onPreferencesChange: (preferences: UserPreferences) => void;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type WithTimestamps<T> = T & {
  createdAt: Date;
  updatedAt: Date;
};

// Constants
export const GOAL_DOMAINS: GoalDomain[] = [
  'communication',
  'social-skills',
  'adaptive-behavior',
  'academic',
  'motor-skills',
  'self-regulation',
  'daily-living'
];

export const TEXT_SIZES: TextSize[] = ['normal', 'large', 'xlarge'];

export const URGENCY_LEVELS: UrgencyLevel[] = ['now', 'soon', 'someday'];

export const ENERGY_LEVELS: EnergyLevel[] = ['low', 'medium', 'high'];

// Processing Modality Types (for Confidence Engine)
export type ProcessingModality = 'narrative' | 'visual' | 'systematic' | 'numerical' | 'kinesthetic' | 'musical' | 'other';

export interface OnboardingProfile {
  role?: string;
  interests?: string[];
  goal?: string;
  comfort?: { reducedMotion?: boolean; highContrast?: boolean };
  // New fields for enhanced onboarding
  specialInterests?: string[];
  processingModalities?: ProcessingModality[];
  modalityDescription?: string;
  privacyConsent?: boolean;
  // Community preference
  communityPreference?: 'autistic-only' | 'mixed';
}

// Privacy and Data Sharing Types
export interface PrivacySettings {
  shareWithClinician?: boolean;
  clinicianId?: string;
  clinicianAccessLevel?: 'none' | 'summary' | 'full';
  clinicianAccessExpires?: Date;
  shareWithParent?: boolean;
  parentId?: string;
  parentAccessLevel?: 'none' | 'summary';
  shareForResearch?: boolean;
  lastUpdated?: Date;
}

export interface ClinicalDataSharing {
  sharedDataTypes: ('goals' | 'progress' | 'reflections')[];
  accessLevel: 'summary' | 'full';
  expiresAt?: Date;
  grantedAt: Date;
  clinicianId: string;
  canRevoke: boolean;
}

// Friendship and Social Features
export interface FriendshipPathway {
  id: string;
  userId: string;
  title: string;
  goal: string;
  steps: FriendshipStep[];
  specialInterests: string[];
  processingModality?: ProcessingModality;
  createdAt: Date;
  updatedAt: Date;
}

export interface FriendshipStep {
  id: string;
  order: number;
  phase: 'understanding' | 'practice' | 'opportunities' | 'confidence';
  instruction: string;
  tip?: string;
  completed: boolean;
  completedAt?: Date;
}

export interface VirtualMeetup {
  id: string;
  title: string;
  topic: string;
  specialInterest: string;
  neurotype?: 'autistic-only' | 'mixed';
  hostId: string;
  participants: MeetupParticipant[];
  templateId: string;
  settings: MeetupSettings;
  scheduledFor: Date;
  duration: number; // minutes
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface MeetupParticipant {
  userId: string;
  personalGoals: string[];
  joinedAt: Date;
  reflection?: MeetupReflection;
}

export interface MeetupReflection {
  submittedAt: Date;
  rating: number; // 1-5
  whatWentWell: string;
  whatCouldImprove: string;
  wouldAttendAgain: boolean;
}

export interface MeetupSettings {
  audioOnly: boolean;
  textChatEnabled: boolean;
  structuredTurns: boolean;
  maxParticipants: number;
  duration: number;
  recordingEnabled: boolean;
  breakoutRooms: boolean;
}

export interface MeetupTemplate {
  id: string;
  name: string;
  description: string;
  phases: MeetupPhase[];
  facilitationGuide: string;
  targetAudience: string;
  clinicalNotes?: string;
}

export interface MeetupPhase {
  name: string;
  duration: number;
  description: string;
  prompts: string[];
}

// Reward Game System
export interface RewardGame {
  id: string;
  userId: string;
  goal: string;
  reward: string;
  userLogic?: string; // User's own reasoning
  progress: number;
  target: number;
  isActive: boolean;
  modifications: RewardModification[];
  createdAt: Date;
  completedAt?: Date;
  celebrated?: boolean;
}

export interface RewardModification {
  date: Date;
  changes: string;
  reason?: string;
}

// Audit and Compliance
export interface AuditEvent {
  id: string;
  timestamp: Date;
  userId: string;
  action: string;
  resource: string;
  accessorId?: string;
  details?: Record<string, any>;
}

export interface DataAccessLog {
  id: string;
  timestamp: Date;
  userId: string;
  accessorId: string;
  dataType: 'personal' | 'clinical' | 'anonymized';
  accessType: 'read' | 'write' | 'share' | 'revoke';
  ipAddress?: string;
  userAgent?: string;
}

// Enhanced SimpleStep with contextual reasons
export interface EnhancedSimpleStep extends SimpleStep {
  contextualReason?: string; // "This helps you take care of yourself"
  horizonGoal?: string; // Optional vague future benefit
}

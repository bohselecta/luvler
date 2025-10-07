// Luvler ABA Tool - Accessibility Utilities
// Designed for autism-friendly and neurodiversity-affirming interactions

export const A11Y_LABELS = {
  // Navigation
  'nav-back': 'Go back to previous page',
  'nav-home': 'Return to home page',
  'nav-next': 'Continue to next step',
  'nav-previous': 'Go to previous step',

  // Actions
  'action-generate': 'Generate goal analysis',
  'action-save': 'Save current progress',
  'action-demo': 'Try demo with sample data',
  'action-toggle-mode': 'Switch between clinician and parent modes',
  'action-toggle-theme': 'Toggle between light and dark themes',
  'action-toggle-text-size': 'Change text size',
  'action-complete-step': 'Mark this step as completed',

  // Forms
  'form-goal-input': 'Describe your goal or what you want to accomplish',
  'form-age-input': 'Enter the age of the person',
  'form-domain-select': 'Select the skill domain',
  'form-skill-level': 'Describe current skill level and needs',

  // Progress
  'progress-current': 'Current step in the process',
  'progress-completed': 'Number of completed steps',
  'progress-total': 'Total number of steps',

  // States
  'state-loading': 'Content is loading',
  'state-generating': 'AI is generating your response',
  'state-error': 'An error occurred',
  'state-success': 'Action completed successfully',

  // Preferences
  'pref-dark-mode': 'Dark mode for reduced visual stimulation',
  'pref-text-size': 'Larger text for better readability',
  'pref-reduced-motion': 'Reduced animations for comfort',
  'pref-high-contrast': 'High contrast for better visibility',
} as const;

// ARIA live regions for dynamic content
export const createLiveRegion = (content: string, priority: 'polite' | 'assertive' = 'polite'): string => {
  return `<div aria-live="${priority}" aria-atomic="true" class="sr-only">${content}</div>`;
};

// Focus management utilities
export const trapFocus = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const firstFocusable = focusableElements[0] as HTMLElement;
  const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
};

// Skip links for keyboard navigation
export const createSkipLinks = () => {
  return [
    { href: '#main-content', text: 'Skip to main content' },
    { href: '#navigation', text: 'Skip to navigation' },
    { href: '#footer', text: 'Skip to footer' }
  ];
};

// Color contrast utilities for high contrast mode
export const HIGH_CONTRAST_COLORS = {
  primary: '#E63E8B',
  secondary: '#6B9FDB',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  text: '#000000',
  background: '#FFFFFF',
  surface: '#F8FAFC',
  border: '#1E293B'
} as const;

// Reduced motion utilities
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getMotionPreference = (): 'reduce' | 'normal' => {
  if (typeof window === 'undefined') return 'normal';
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduce' : 'normal';
};

// Text size utilities
export const getTextSizeMultiplier = (size: 'normal' | 'large' | 'xlarge'): number => {
  switch (size) {
    case 'large': return 1.25;
    case 'xlarge': return 1.5;
    default: return 1;
  }
};

// Announcement utilities for screen readers
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  if (typeof window === 'undefined') return;

  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Keyboard navigation helpers
export const handleKeyboardNavigation = (
  event: React.KeyboardEvent,
  handlers: {
    onEnter?: () => void;
    onEscape?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
  }
) => {
  switch (event.key) {
    case 'Enter':
      event.preventDefault();
      handlers.onEnter?.();
      break;
    case 'Escape':
      event.preventDefault();
      handlers.onEscape?.();
      break;
    case 'ArrowUp':
      event.preventDefault();
      handlers.onArrowUp?.();
      break;
    case 'ArrowDown':
      event.preventDefault();
      handlers.onArrowDown?.();
      break;
    case 'ArrowLeft':
      event.preventDefault();
      handlers.onArrowLeft?.();
      break;
    case 'ArrowRight':
      event.preventDefault();
      handlers.onArrowRight?.();
      break;
  }
};

// Form validation with accessibility
export const validateFormField = (
  value: string,
  rules: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
  }
): string | null => {
  if (rules.required && !value.trim()) {
    return 'This field is required';
  }

  if (rules.minLength && value.length < rules.minLength) {
    return `Must be at least ${rules.minLength} characters`;
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return `Must be no more than ${rules.maxLength} characters`;
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return 'Please enter a valid value';
  }

  if (rules.custom) {
    return rules.custom(value);
  }

  return null;
};

// Sensory accommodation helpers
export const SENSORY_ACCOMMODATIONS = {
  visual: [
    'Use consistent color schemes',
    'Avoid flashing or moving content',
    'Provide clear visual boundaries',
    'Use high contrast when requested',
    'Allow text size adjustments'
  ],
  auditory: [
    'No auto-playing sounds',
    'Optional sound feedback',
    'Clear audio controls',
    'Volume adjustment options'
  ],
  motor: [
    'Large touch targets',
    'Generous spacing between elements',
    'No time-based interactions',
    'Alternative input methods'
  ],
  cognitive: [
    'Clear, literal language',
    'Progressive disclosure',
    'Predictable navigation',
    'Error prevention',
    'Frequent save points'
  ]
} as const;

// Error boundary for graceful error handling
export const createErrorBoundary = (error: Error, resetError: () => void) => {
  return {
    error,
    resetError,
    announceError: () => announceToScreenReader('An error occurred. Please try again.', 'assertive'),
    getAccessibleMessage: () => `Error: ${error.message}. Please refresh the page or try again.`
  };
};

// Success celebration utilities
export const CELEBRATION_MESSAGES = {
  stepComplete: [
    'Great work on this step!',
    'You\'re making excellent progress!',
    'One step closer to your goal!',
    'Fantastic effort!'
  ],
  goalComplete: [
    'Amazing! You completed all the steps!',
    'Congratulations on achieving your goal!',
    'You should be so proud of yourself!',
    'Outstanding work!'
  ]
} as const;

export const getRandomCelebration = (type: keyof typeof CELEBRATION_MESSAGES): string => {
  const messages = CELEBRATION_MESSAGES[type];
  return messages[Math.floor(Math.random() * messages.length)];
};

// Focus indicators for better visibility
export const FOCUS_STYLES = {
  outline: '2px solid #E63E8B',
  outlineOffset: '2px',
  borderRadius: '0.5rem'
} as const;

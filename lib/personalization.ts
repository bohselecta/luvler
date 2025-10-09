'use client';

import { OnboardingProfile, ProcessingModality } from './types';

// Helper to safely read onboarding data with fallbacks
export function getOnboardingProfile(): OnboardingProfile {
  if (typeof window === 'undefined') return {};

  try {
    // Try v2 first (enhanced onboarding)
    const v2Data = localStorage.getItem('luvler_onboarding_v2');
    if (v2Data) {
      return JSON.parse(v2Data);
    }

    // Fallback to v1 (original onboarding)
    const v1Data = localStorage.getItem('luvler_onboarding_v1');
    if (v1Data) {
      const parsed = JSON.parse(v1Data);
      // Convert v1 format to v2
      return {
        role: parsed.role,
        interests: parsed.interests,
        goal: parsed.goal,
        comfort: parsed.comfort,
        specialInterests: parsed.interests || [], // Use interests as special interests
        processingModalities: [], // Will be empty for v1 users
        privacyConsent: false, // Default to false
      };
    }
  } catch (error) {
    console.warn('Error reading onboarding data:', error);
  }

  return {};
}

// Get user's processing modalities for AI personalization
export function getProcessingModalities(): ProcessingModality[] {
  const profile = getOnboardingProfile();
  return profile.processingModalities || [];
}

// Get user's special interests for context
export function getSpecialInterests(): string[] {
  const profile = getOnboardingProfile();
  return profile.specialInterests || profile.interests || [];
}

// Preferred community neurotype
export function getCommunityPreference(): 'autistic-only' | 'mixed' {
  const profile = getOnboardingProfile();
  const pref = (profile as any).communityPreference as 'autistic-only' | 'mixed' | undefined
  return pref || 'autistic-only'
}

// Check if user has completed enhanced onboarding
export function hasEnhancedOnboarding(): boolean {
  const profile = getOnboardingProfile();
  return !!(profile.processingModalities && profile.processingModalities.length > 0);
}

// Save enhanced onboarding data
export function saveOnboardingProfile(profile: OnboardingProfile): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('luvler_onboarding_v2', JSON.stringify(profile));
  } catch (error) {
    console.warn('Error saving onboarding data:', error);
  }
}

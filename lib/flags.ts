export type FeatureFlags = {
  community: boolean
  budget: boolean
  tracks: boolean
  portfolio: boolean
}

export function getFlags(): FeatureFlags {
  const env = (name: string) => process.env[name]?.toLowerCase() === 'true'
  return {
    community: env('NEXT_PUBLIC_FF_COMMUNITY') || false,
    budget: env('NEXT_PUBLIC_FF_BUDGET') || false,
    tracks: env('NEXT_PUBLIC_FF_TRACKS') || false,
    portfolio: env('NEXT_PUBLIC_FF_PORTFOLIO') || false,
  }
}



export type TierId = 'free' | 'individual' | 'clinician' | 'clinic' | 'enterprise'

export interface Tier {
  id: TierId
  name: string
  priceMonthly: number | 'contact'
  analysesPerMonth?: number
  seats?: number
  features: string[]
}

export const TIERS: Tier[] = [
  { id: 'free', name: 'Discovery', priceMonthly: 0, analysesPerMonth: 5, features: ['1 saved plan', 'Community resources'] },
  { id: 'individual', name: 'Individual', priceMonthly: 12, analysesPerMonth: 50, features: ['5 active plans', 'Export & share'] },
  { id: 'clinician', name: 'Clinician', priceMonthly: 49, analysesPerMonth: 300, features: ['Client folders', 'Templates', 'CSV export'] },
  { id: 'clinic', name: 'Clinic / Team', priceMonthly: 199, analysesPerMonth: 1500, seats: 5, features: ['Pooled usage', 'Roles & permissions'] },
  { id: 'enterprise', name: 'Enterprise', priceMonthly: 'contact', features: ['SSO', 'BAA addendum', 'Priority support'] },
]



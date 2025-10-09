// Minimal Netlify Identity helpers (client-side)

export type IdentityUser = {
  id: string
  email: string
  token?: string
}

export const identity = typeof window !== 'undefined' ? (window as any).netlifyIdentity : undefined

export function getCurrentUser(): IdentityUser | null {
  if (!identity) return null
  const u = identity.currentUser()
  if (!u) return null
  return { id: u.id, email: u.email, token: undefined }
}

export async function getJwt(): Promise<string | null> {
  if (!identity) return null
  const u = identity.currentUser()
  if (!u) return null
  return await u.jwt()
}



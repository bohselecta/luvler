import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/pricing',
  '/consent',
  '/login',
  '/sign-up',
  '/api(.*)'
])

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return
  const { userId, redirectToSignIn } = await auth()
  if (!userId) return redirectToSignIn()
})

export const config = {
  matcher: [
    '/((?!_next|.*\..*).*)',
  ],
}



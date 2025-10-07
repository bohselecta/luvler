import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/pricing',
  '/consent',
  '/login',
  '/sign-up',
  '/professional',
  '/self-advocacy',
  '/onboarding',
  '/legal(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  // Public routes are accessible without auth
  // Protected routes check for authentication
  if (!isPublicRoute(req)) {
    const { userId } = await auth()
    if (!userId) {
      // Clerk will automatically redirect to sign-in
      return Response.redirect(new URL('/login', req.url))
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}



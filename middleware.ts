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
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}



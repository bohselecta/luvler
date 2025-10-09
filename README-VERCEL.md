# Vercel Deployment Notes

## Clerk Integration (Marketplace)

The Clerk integration via Vercel Marketplace **automatically provisions** these environment variables on deployment:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

**You do NOT need to manually set these in Vercel's environment variables dashboard.**

### Local Development

For local development (`npm run dev`), you need valid Clerk keys. Either:
1. Get keys from your Clerk dashboard and add to `.env.local`:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```
2. Or run `npm run dev` and sign up/in will gracefully fail until you add real keys.

**Local builds (`npm run build`) will fail without valid Clerk keys** because Next.js pre-renders pages that use Clerk's context. This is expected—the build succeeds on Vercel where real keys are injected.

## Other Integrations

### Vercel Blob
If you install the Vercel Blob integration, `BLOB_READ_WRITE_TOKEN` is also auto-provisioned.

### Manual Environment Variables

You must manually add these in Vercel → Project Settings → Environment Variables:
- `ANTHROPIC_API_KEY` (required for AI features)
- `ANTHROPIC_MODEL_HAIKU` (optional, defaults to `claude-3-5-haiku-20241022`)
- `ANTHROPIC_MODEL_SONNET` (optional, defaults to `claude-3-7-sonnet-20250219`)
- `ADMIN_ALLOWLIST` (comma-separated Clerk user IDs for admin dashboard access)
- `NEXT_PUBLIC_SITE_URL` (your production URL, e.g. `https://luvler.com`)

### Stripe (Optional, for production payments)
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_MAP` (JSON object mapping tiers to Stripe price IDs)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

## AI Gateway

**You do NOT need Vercel's AI Gateway for this project.** We call Anthropic's API directly for better control over model selection (Haiku vs. Sonnet) and cost optimization.

If you want to use the AI Gateway in the future for observability/caching, you can switch the fetch calls in `app/api/pathways/route.ts` and `app/api/tracks/route.ts` to use `https://ai-gateway.vercel.sh/v1/chat/completions`.

---

## Summary

**Auto-Provisioned (via Vercel Marketplace):**
- Clerk keys (both)
- Vercel Blob token (if installed)

**Manually Set (in Vercel dashboard):**
- Anthropic API key
- Admin allowlist
- Site URL
- (Optional) Stripe keys

**Not Needed:**
- AI Gateway (we use direct Anthropic API calls)

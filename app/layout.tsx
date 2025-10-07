import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import '../styles/globals.css'
import { ThemeProvider } from '@/components/shared/theme-provider'
import { ClerkProvider } from '@clerk/nextjs'
import { Footer } from '@/components/shared/footer'
import { Analytics } from '@/components/shared/analytics'
import { MobileNav } from '@/components/shared/mobile-nav'

// Force dynamic rendering for all pages since Clerk keys are runtime-only
export const dynamic = 'force-dynamic'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://luvler.com'

export const metadata: Metadata = {
  title: 'Luvler - Love to Learn, Step by Step',
  description: 'An autism-friendly goal setting and self-advocacy tool that helps break down tasks into clear, manageable steps with evidence-based ABA methodology.',
  keywords: ['ABA', 'autism', 'goal setting', 'self-advocacy', 'executive function', 'task breakdown', 'neurodiversity'],
  authors: [{ name: 'Luvler Team' }],
  creator: 'Luvler',
  publisher: 'Luvler',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Luvler - Love to Learn, Step by Step',
    description: 'An autism-friendly goal setting and self-advocacy tool that helps break down tasks into clear, manageable steps.',
    url: siteUrl,
    siteName: 'Luvler',
    images: [{ url: '/og.png' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luvler - Love to Learn, Step by Step',
    description: 'An autism-friendly goal setting and self-advocacy tool that helps break down tasks into clear, manageable steps.',
    creator: '@luvler',
    images: ['/og.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#E63E8B" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <a href="#main" className="sr-only focus-visible:focus-visible not-sr-only absolute left-4 top-4 z-50 bg-white text-gray-900 px-3 py-2 rounded">Skip to content</a>
            <MobileNav />

            <main id="main">
              {children}
              <Analytics />
            </main>
            <Footer />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}

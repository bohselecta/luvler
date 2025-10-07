import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import '../styles/globals.css'
import { ThemeProvider } from '@/components/shared/theme-provider'
import Link from 'next/link'
import Image from 'next/image'
import { Footer } from '@/components/shared/footer'
import Script from 'next/script'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

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
  metadataBase: new URL('https://flourishing-crepe-f9591e.netlify.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Luvler - Love to Learn, Step by Step',
    description: 'An autism-friendly goal setting and self-advocacy tool that helps break down tasks into clear, manageable steps.',
    url: 'https://flourishing-crepe-f9591e.netlify.app',
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
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" strategy="afterInteractive" />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <header className="bg-white/80 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" width={28} height={28} alt="Luvler" />
                <span className="font-bold text-gray-900 dark:text-gray-100">Luvler</span>
              </Link>
              <nav className="flex items-center gap-6 text-sm">
                <Link href="/pricing" className="text-gray-700 dark:text-gray-300 hover:underline">Pricing</Link>
                <Link href="/consent" className="text-gray-700 dark:text-gray-300 hover:underline">Informed Use</Link>
                <Link href="/login" className="text-gray-700 dark:text-gray-300 hover:underline">Sign in</Link>
              </nav>
            </div>
          </header>

          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

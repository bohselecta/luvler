import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import '../styles/globals.css'
import { ThemeProvider } from '@/components/shared/theme-provider'

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
  metadataBase: new URL('https://luvler.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Luvler - Love to Learn, Step by Step',
    description: 'An autism-friendly goal setting and self-advocacy tool that helps break down tasks into clear, manageable steps.',
    url: 'https://luvler.com',
    siteName: 'Luvler',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Luvler - Love to Learn',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luvler - Love to Learn, Step by Step',
    description: 'An autism-friendly goal setting and self-advocacy tool that helps break down tasks into clear, manageable steps.',
    images: ['/og-image.png'],
    creator: '@luvler',
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
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
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
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

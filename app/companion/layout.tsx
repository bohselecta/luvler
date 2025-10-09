'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useMemo } from 'react'
import { Menu, X, Heart, Target, Users, Shield, LayoutGrid, BookOpen } from 'lucide-react'

export default function CompanionLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sideOpen, setSideOpen] = useState(false)

  const topTabs = [
    { href: '/companion', label: 'Overview', icon: LayoutGrid },
    { href: '/companion/friends', label: 'Friends', icon: Heart },
    { href: '/self-advocacy', label: 'Goals', icon: Target },
    { href: '/companion/rewards', label: 'Rewards', icon: Shield },
    { href: 'https://www.autismspeaks.org/', label: 'Learn', icon: BookOpen },
    { href: '/privacy', label: 'Privacy', icon: Users },
  ]

  const currentSection = useMemo(() => {
    if (pathname.startsWith('/companion/friends')) return 'friends'
    if (pathname.startsWith('/self-advocacy')) return 'goals'
    if (pathname.startsWith('/companion/rewards')) return 'rewards'
    if (pathname.startsWith('/privacy')) return 'privacy'
    if (pathname.startsWith('/learn')) return 'learn'
    return 'overview'
  }, [pathname])

  const sideLinks = useMemo(() => {
    switch (currentSection) {
      case 'friends':
        return [
          { href: '/companion/friends', label: 'Dashboard' },
          { href: '/companion/friends/explore', label: 'Explore' },
          { href: '/companion/friends/practice', label: 'Practice' },
          { href: '/companion/friends/meetups', label: 'Meetups' },
          { href: '/companion/friends/reflection', label: 'Reflection' },
        ]
      case 'goals':
        return [
          { href: '/self-advocacy', label: 'My Goals' },
        ]
      case 'rewards':
        return [
          { href: '/companion/rewards', label: 'Reward Games' },
        ]
      case 'privacy':
        return [
          { href: '/privacy', label: 'Privacy & Sharing' },
        ]
      case 'learn':
        return [
          { href: '/learn', label: 'Tracks' },
        ]
      default:
        return [
          { href: '/companion', label: 'Overview' },
          { href: '/companion/friends', label: 'Friends' },
          { href: '/self-advocacy', label: 'Goals' },
          { href: '/companion/rewards', label: 'Rewards' },
        ]
    }
  }, [currentSection])

  return (
    <div className="min-h-screen">
      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSideOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              aria-label="Toggle navigation"
            >
              {sideOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span className="text-sm text-gray-600 hidden md:block">Companion</span>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            {topTabs.map(({ href, label, icon: Icon }) => {
              const isExternal = href.startsWith('http')
              const active = !isExternal && (pathname === href || (href !== '/companion' && pathname.startsWith(href)))
              return isExternal ? (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 text-gray-700 hover:bg-gray-100`}>
                  <Icon className="w-4 h-4" />
                  {label}
                </a>
              ) : (
                <Link key={href} href={href} className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 ${active ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              )
            })}
          </nav>
          <div className="w-10" />
        </div>
      </header>

      {/* Main layout with optional side nav */}
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">
        {/* Side nav */}
        <aside className={`col-span-12 md:col-span-3 lg:col-span-3 ${sideOpen ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-16 space-y-2">
            {sideLinks.map(link => {
              const active = pathname === link.href
              return (
                <Link key={link.href} href={link.href} className={`block px-3 py-2 rounded-lg text-sm ${active ? 'bg-primary-50 text-primary-700 border border-primary-200' : 'text-gray-700 hover:bg-gray-100 border border-transparent'}`}>
                  {link.label}
                </Link>
              )
            })}
          </div>
        </aside>

        {/* Content */}
        <main className="col-span-12 md:col-span-9 lg:col-span-9">
          {children}
        </main>
      </div>
    </div>
  )
}



'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <Image src="/logo.png" width={28} height={28} alt="" />
            <span className="font-bold text-gray-900 dark:text-gray-100">Luvler</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/companion" className="text-gray-700 dark:text-gray-300 hover:underline">Companion</Link>
            <a href="https://www.autismspeaks.org/" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:underline">Learn</a>
            <Link href="/clients" className="text-gray-700 dark:text-gray-300 hover:underline">Clients</Link>
            <Link href="/pricing" className="text-gray-700 dark:text-gray-300 hover:underline">Pricing</Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:underline">About</Link>
            <Link href="/consent" className="text-gray-700 dark:text-gray-300 hover:underline">Informed Use</Link>
            <Link href="/privacy" className="text-gray-700 dark:text-gray-300 hover:underline">Privacy</Link>
            <Link href="/login" className="text-gray-700 dark:text-gray-300 hover:underline">Sign in</Link>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div id="mobile-menu" className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <nav className="flex flex-col px-4 py-4 space-y-3">
              <Link
                href="/companion"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2 text-base transition-colors"
                onClick={closeMenu}
              >
                Companion
              </Link>
              <a
                href="https://www.autismspeaks.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2 text-base transition-colors"
                onClick={closeMenu}
              >
                Learn
              </a>
              <Link
                href="/about"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2 text-base transition-colors"
                onClick={closeMenu}
              >
                About
              </Link>
              <Link
                href="/clients"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2 text-base transition-colors"
                onClick={closeMenu}
              >
                Clients
              </Link>
              <Link
                href="/pricing"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2 text-base transition-colors"
                onClick={closeMenu}
              >
                Pricing
              </Link>
              <Link
                href="/consent"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2 text-base transition-colors"
                onClick={closeMenu}
              >
                Informed Use
              </Link>
              <Link
                href="/privacy"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2 text-base transition-colors"
                onClick={closeMenu}
              >
                Privacy
              </Link>
              <Link
                href="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2 text-base transition-colors"
                onClick={closeMenu}
              >
                Sign in
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}


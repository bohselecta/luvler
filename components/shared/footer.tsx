'use client';

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-gray-900 dark:text-gray-100 font-bold text-lg">Luvler</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">Autism-friendly goal setting with evidence-based task analysis and supportive design.</p>
        </div>
        <div>
          <h4 className="text-gray-900 dark:text-gray-100 font-semibold">Product</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="hover:underline" href="/pricing">Pricing</Link></li>
            <li><Link className="hover:underline" href="/consent">Informed Use</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-gray-900 dark:text-gray-100 font-semibold">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="hover:underline" href="/legal/privacy">Privacy</Link></li>
            <li><Link className="hover:underline" href="/legal/terms">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 pb-8">© {new Date().getFullYear()} Luvler. All rights reserved.</div>
    </footer>
  )
}



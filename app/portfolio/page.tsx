import { getFlags } from '@/lib/flags'

export default function PortfolioPage() {
  const flags = getFlags()
  if (!flags.portfolio) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
        <p className="text-gray-700 mt-2">Showcase coming soon.</p>
      </div>
    )
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">My Portfolio</h1>
      <p className="text-gray-700 mt-2">Upload images or scans (demo).</p>
    </div>
  )
}



import { getFlags } from '@/lib/flags'

export default function LearnPage() {
  const flags = getFlags()
  if (!flags.tracks) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Learn</h1>
        <p className="text-gray-700 mt-2">Guided tracks are coming soon.</p>
      </div>
    )
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Tracks</h1>
      <p className="text-gray-700 mt-2">Explore creative and learning tracks (demo).</p>
    </div>
  )
}



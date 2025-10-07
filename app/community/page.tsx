import { getFlags } from '@/lib/flags'

export default function CommunityPage() {
  const flags = getFlags()
  if (!flags.community) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Community</h1>
        <p className="text-gray-700 mt-2">This feature is coming soon.</p>
      </div>
    )
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Groups</h1>
      <p className="text-gray-700 mt-2">Discover small, safe groups (demo).</p>
    </div>
  )
}



import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Page not found</h1>
        <p className="text-gray-600 mt-2">The page you are looking for doesn’t exist.</p>
        <div className="mt-6">
          <Link href="/" className="luvler-button-primary">Go home</Link>
        </div>
      </div>
    </div>
  )
}



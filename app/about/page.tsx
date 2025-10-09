'use client';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">About Luvler</h1>
      <p className="text-gray-700 mb-4">
        Luvler helps people on the autism spectrum set goals,
        make friends, and build skills through AI-powered support
        and structured social connection.
      </p>

      <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">Built With Community</h2>
      <p className="text-gray-700 mb-4">This tool exists because real people shared their experiences:</p>
      <ul className="list-disc list-inside space-y-2 text-gray-800">
        <li><span className="font-semibold">Hayden</span> - Created and built Luvler</li>
        <li><span className="font-semibold">Ryan</span> - Shared insights from working with autistic youth, shaped the friendship module</li>
        <li><span className="font-semibold">Malachi</span> - Tested features and provided feedback as a user</li>
        <li><span className="font-semibold">Rae</span> - Research Partner who contributed evidence-based methodology</li>
        <li><span className="font-semibold">You</span> - Every user helps us improve</li>
      </ul>

      <p className="text-gray-700 mt-6">
        We're grateful to everyone who helped shape this tool.
      </p>

      <hr className="my-8" />

      <p className="text-gray-700">
        Want to contribute? <a href="/contact" className="text-primary-600 hover:text-primary-700 underline">Contact us</a> or
        {' '}<a href="/contact" className="text-primary-600 hover:text-primary-700 underline">Join our advisory board</a>.
      </p>
    </div>
  )
}



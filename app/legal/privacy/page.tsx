export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-12 prose">
        <h1>Privacy Policy</h1>
        <p>We respect your privacy. This page outlines what we collect and how we use it. We collect minimal data needed to operate the service (account, usage metrics). Goal content is processed to provide features and is not sold to third parties.</p>
        <h2>Data we collect</h2>
        <ul>
          <li>Account: email, name (optional)</li>
          <li>Usage: plan counts and limits for metering</li>
          <li>Diagnostics: error logs for reliability</li>
        </ul>
        <h2>Your rights</h2>
        <p>You may request export or deletion of your account data. Contact support for assistance.</p>
      </div>
    </div>
  )
}



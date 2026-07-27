import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/privacy')({
  head: () => ({ meta: [{ title: 'Privacy Policy · GrowthFlow AI' }] }),
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Overview</h2>
      <p className="text-muted-foreground">GrowthFlow AI respects your privacy. We collect minimal data needed to provide our AI website generation service.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Data We Collect</h2>
      <p className="text-muted-foreground">We store your email, project configurations, and AI generation results. We do not sell your data.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">AI Processing</h2>
      <p className="text-muted-foreground">Your business information is sent to Google's Gemini API for processing. We do not store data on Google's servers beyond what is needed for the request.</p>
    </div>
  )
}

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/terms')({
  head: () => ({ meta: [{ title: 'Terms of Service · GrowthFlow AI' }] }),
  component: TermsPage,
})

function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <p className="text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Acceptance</h2>
        <p className="text-muted-foreground">By using GrowthFlow AI, you agree to these terms.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Service</h2>
        <p className="text-muted-foreground">GrowthFlow AI provides AI-powered website blueprint generation. We reserve the right to modify or discontinue the service at any time.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Usage</h2>
        <p className="text-muted-foreground">You may use generated blueprints for personal and commercial projects. You may not resell the AI generation service itself.</p>
      </div>
    </div>
  )
}

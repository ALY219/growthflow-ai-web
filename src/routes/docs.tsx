import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react'
import { Footer } from '@/components/Footer'

export const Route = createFileRoute('/docs')({
  head: () => ({
    meta: [
      { title: 'Documentation · GrowthFlow AI' },
      { name: 'description', content: 'Learn how to use GrowthFlow AI to build your startup.' },
    ],
  }),
  component: DocsPage,
})

function DocsPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <main className="max-w-3xl mx-auto px-6 py-24">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
            <BookOpen className="size-5 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
        </div>
        <p className="text-muted-foreground text-lg mb-8">
          Full documentation is coming soon. In the meantime, here are the basics to get started.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: 'Quick Start Guide', desc: 'Learn how to create your first project and generate a startup blueprint.' },
            { title: 'Project Types', desc: 'Understand the differences between blueprints, websites, and SaaS projects.' },
            { title: 'AI Features', desc: 'Explore the AI-powered tools available for each project type.' },
            { title: 'Account & Billing', desc: 'Manage your subscription, team members, and account settings.' },
          ].map((doc) => (
            <div key={doc.title} className="p-5 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-sm mb-1.5">{doc.title}</h3>
              <p className="text-xs text-muted-foreground">{doc.desc}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Scale } from 'lucide-react'
import { Footer } from '@/components/Footer'

export const Route = createFileRoute('/terms')({
  head: () => ({
    meta: [
      { title: 'Terms of Service · GrowthFlow AI' },
      { name: 'description', content: 'GrowthFlow AI terms of service.' },
    ],
  }),
  component: TermsPage,
})

function TermsPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <main className="max-w-3xl mx-auto px-6 py-24">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
            <Scale className="size-5 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
        </div>
        <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground text-sm leading-relaxed">
          <p>Last updated: July 2026</p>
          <p>
            By using GrowthFlow AI (&ldquo;the Service&rdquo;), you agree to these Terms of Service.
            Please read them carefully before using the platform.
          </p>
          <h2 className="text-foreground text-lg font-semibold mt-8">Use of Service</h2>
          <p>
            You may use the Service to generate startup blueprints, websites, and SaaS foundations.
            You retain all rights to the content you create. You are responsible for complying with
            all applicable laws.
          </p>
          <h2 className="text-foreground text-lg font-semibold mt-8">Account Terms</h2>
          <p>
            You are responsible for maintaining the security of your account. You must provide
            accurate information when creating an account and keep it up to date.
          </p>
          <h2 className="text-foreground text-lg font-semibold mt-8">Contact</h2>
          <p>
            For questions about these terms, email us at legal@growthflow.ai.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

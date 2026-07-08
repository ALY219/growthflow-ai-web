import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@blinkdotnew/ui'
import { ArrowLeft, Shield } from 'lucide-react'
import { Footer } from '@/components/Footer'

export const Route = createFileRoute('/privacy')({
  head: () => ({
    meta: [
      { title: 'Privacy Policy · GrowthFlow AI' },
      { name: 'description', content: 'GrowthFlow AI privacy policy.' },
    ],
  }),
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <main className="max-w-3xl mx-auto px-6 py-24">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
            <Shield className="size-5 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        </div>
        <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground text-sm leading-relaxed">
          <p>Last updated: July 2026</p>
          <p>
            GrowthFlow AI (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting
            your privacy. This Privacy Policy explains how we collect, use, and safeguard your
            information when you use our platform.
          </p>
          <h2 className="text-foreground text-lg font-semibold mt-8">Information We Collect</h2>
          <p>
            We collect information you provide directly, such as your name, email address, and
            project data. We also collect usage data automatically to improve our services.
          </p>
          <h2 className="text-foreground text-lg font-semibold mt-8">How We Use Your Data</h2>
          <p>
            Your data is used to provide and improve our AI-powered services, communicate with
            you about your account, and ensure the security of our platform.
          </p>
          <h2 className="text-foreground text-lg font-semibold mt-8">Contact</h2>
          <p>
            For questions about this policy, email us at privacy@growthflow.ai.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

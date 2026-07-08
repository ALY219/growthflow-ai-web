import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@blinkdotnew/ui'
import { ArrowLeft, Mail, MessageSquare } from 'lucide-react'
import { Footer } from '@/components/Footer'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: 'Contact · GrowthFlow AI' },
      { name: 'description', content: 'Get in touch with the GrowthFlow AI team.' },
    ],
  }),
  component: ContactPage,
})

function ContactPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <main className="max-w-2xl mx-auto px-6 py-24 text-center">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12">
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Get in Touch</h1>
        <p className="text-muted-foreground text-lg mb-12 max-w-md mx-auto">
          Have questions about GrowthFlow AI? We&apos;d love to hear from you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border bg-card">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Mail className="size-5 text-primary" />
            </div>
            <h3 className="font-semibold text-sm">Email Us</h3>
            <p className="text-xs text-muted-foreground">hello@growthflow.ai</p>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border bg-card">
            <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10">
              <MessageSquare className="size-5 text-accent" />
            </div>
            <h3 className="font-semibold text-sm">Join Discord</h3>
            <p className="text-xs text-muted-foreground">Community coming soon</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

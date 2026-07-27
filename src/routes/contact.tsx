import { createFileRoute } from '@tanstack/react-router'
import { Mail, MessageSquare } from 'lucide-react'

export const Route = createFileRoute('/contact')({
  head: () => ({ meta: [{ title: 'Contact · GrowthFlow AI' }] }),
  component: ContactPage,
})

function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-muted-foreground mb-12 max-w-2xl">Have questions? We're here to help.</p>
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
        <div className="rounded-xl border border-border bg-card p-6"><Mail className="size-6 text-primary mb-3" /><h3 className="text-lg font-semibold">Email Support</h3><p className="text-sm text-muted-foreground mt-2">support@growthflow.ai</p></div>
        <div className="rounded-xl border border-border bg-card p-6"><MessageSquare className="size-6 text-primary mb-3" /><h3 className="text-lg font-semibold">Community</h3><p className="text-sm text-muted-foreground mt-2">Join our Discord community</p></div>
      </div>
    </div>
  )
}

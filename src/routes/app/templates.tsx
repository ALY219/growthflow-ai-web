import { createFileRoute, Link } from '@tanstack/react-router'
import { FileText } from 'lucide-react'
import { Card, CardContent } from '@blinkdotnew/ui'

export const Route = createFileRoute('/app/templates')({
  head: () => ({ meta: [{ title: 'Templates · GrowthFlow AI' }] }),
  component: TemplatesPage,
})

const templates = [
  { name: 'SaaS Landing Page', desc: 'Modern landing page for software products', style: 'Modern' },
  { name: 'Restaurant Website', desc: 'Menu, reservations, and gallery', style: 'Warm' },
  { name: 'Portfolio', desc: 'Showcase your work and skills', style: 'Minimal' },
  { name: 'E-Commerce Store', desc: 'Product catalog and shopping cart', style: 'Clean' },
  { name: 'Agency Website', desc: 'Services, team, and case studies', style: 'Corporate' },
  { name: 'Blog Platform', desc: 'Articles, categories, and newsletter', style: 'Editorial' },
]

function TemplatesPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Templates</h1>
        <p className="text-sm text-muted-foreground mt-1">Start from a pre-built template</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((t) => (
          <Card key={t.name} className="border-border bg-card hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-5">
              <FileText className="size-6 text-primary mb-3" />
              <p className="font-semibold">{t.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
              <span className="inline-block mt-3 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                {t.style}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

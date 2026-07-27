import { createFileRoute } from '@tanstack/react-router'
import { BookOpen, Sparkles, Zap, Code2 } from 'lucide-react'

export const Route = createFileRoute('/docs')({
  head: () => ({ meta: [{ title: 'Documentation · GrowthFlow AI' }] }),
  component: DocsPage,
})

const sections = [
  { icon: Sparkles, title: 'Getting Started', desc: 'Create your account and set up your first project.' },
  { icon: Zap, title: 'AI Generation', desc: 'Learn how the AI builds website blueprints from your input.' },
  { icon: Code2, title: 'Export to Code', desc: 'Convert your blueprint into production-ready code.' },
  { icon: BookOpen, title: 'API Reference', desc: 'Integrate GrowthFlow AI into your own applications.' },
]

function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-4">Documentation</h1>
      <p className="text-muted-foreground mb-12 max-w-2xl">Everything you need to know about using GrowthFlow AI to generate websites.</p>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
        {sections.map((s) => (
          <div key={s.title} className="rounded-xl border border-border bg-card p-6">
            <s.icon className="size-6 text-primary mb-3" />
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

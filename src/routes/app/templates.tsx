import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { FileText } from 'lucide-react'
import { Card, CardContent } from '@blinkdotnew/ui'
import { useAuth } from '@/hooks/useAuth'
import { useCreateProject } from '@/hooks/useProjects'
import {
  type GenerationConfig, type Industry, type DesignStyle, type WebsiteGoal,
  createDefaultConfig,
} from '@/lib/generation-types'

export const Route = createFileRoute('/app/templates')({
  head: () => ({ meta: [{ title: 'Templates · GrowthFlow AI' }] }),
  component: TemplatesPage,
})

interface TemplateDef {
  name: string
  desc: string
  style: string
  config: Partial<GenerationConfig>
}

const templates: TemplateDef[] = [
  {
    name: 'SaaS Landing Page', desc: 'Modern landing page for software products', style: 'Modern',
    config: { industry: 'technology', designStyle: 'modern', websiteGoal: 'lead-generation', selectedPages: ['home', 'about', 'pricing', 'contact'], selectedFeatures: ['contact-form', 'newsletter', 'analytics'] },
  },
  {
    name: 'Restaurant Website', desc: 'Menu, reservations, and gallery', style: 'Warm',
    config: { industry: 'restaurant', designStyle: 'creative', websiteGoal: 'booking', selectedPages: ['home', 'about', 'services', 'contact'], selectedFeatures: ['contact-form', 'booking', 'gallery'] },
  },
  {
    name: 'Portfolio', desc: 'Showcase your work and skills', style: 'Minimal',
    config: { industry: 'other', designStyle: 'minimal', websiteGoal: 'portfolio', selectedPages: ['home', 'about', 'portfolio', 'contact'], selectedFeatures: ['contact-form', 'gallery'] },
  },
  {
    name: 'E-Commerce Store', desc: 'Product catalog and shopping cart', style: 'Clean',
    config: { industry: 'retail', designStyle: 'modern', websiteGoal: 'online-sales', selectedPages: ['home', 'about', 'services', 'pricing', 'contact'], selectedFeatures: ['contact-form', 'newsletter', 'analytics'] },
  },
  {
    name: 'Agency Website', desc: 'Services, team, and case studies', style: 'Corporate',
    config: { industry: 'marketing', designStyle: 'corporate', websiteGoal: 'lead-generation', selectedPages: ['home', 'about', 'services', 'portfolio', 'contact'], selectedFeatures: ['contact-form', 'testimonials', 'analytics'] },
  },
  {
    name: 'Blog Platform', desc: 'Articles, categories, and newsletter', style: 'Editorial',
    config: { industry: 'other', designStyle: 'light', websiteGoal: 'informational', selectedPages: ['home', 'about', 'blog', 'contact'], selectedFeatures: ['newsletter', 'cms', 'analytics'] },
  },
]

function TemplatesPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const createProject = useCreateProject()
  const [pendingTemplate, setPendingTemplate] = useState<string | null>(null)

  const handleSelect = async (tpl: TemplateDef) => {
    if (!user?.id) return
    setPendingTemplate(tpl.name)
    try {
      const result = await createProject.mutateAsync({ name: tpl.name, description: tpl.desc, userId: user.id })
      const config = { ...createDefaultConfig(), ...tpl.config, businessName: tpl.name }
      sessionStorage.setItem(`wizard-config-${result.id}`, JSON.stringify(config))
      navigate({ to: '/app/projects/$id', params: { id: result.id }, search: { wizard: true } })
    } catch {
      setPendingTemplate(null)
    }
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div><h1 className="text-2xl md:text-3xl font-bold tracking-tight">Templates</h1><p className="text-sm text-muted-foreground mt-1">Start from a pre-built template</p></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((t) => (
          <Card key={t.name} className="border-border bg-card hover:border-primary/50 transition-colors cursor-pointer" onClick={() => handleSelect(t)}>
            <CardContent className="p-5"><FileText className="size-6 text-primary mb-3" /><p className="font-semibold">{t.name}</p><p className="text-xs text-muted-foreground mt-1">{t.desc}</p><span className="inline-block mt-3 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">{pendingTemplate === t.name ? 'Creating...' : t.style}</span></CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

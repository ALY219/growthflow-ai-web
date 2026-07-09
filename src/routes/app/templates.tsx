import { useState, useMemo, useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Badge, Input, toast } from '@blinkdotnew/ui'
import {
  Search,
  Sparkles,
  Clock,
  Gauge,
  Globe,
  Layers,
  Layout,
  LayoutDashboard,
  ShoppingCart,
  GraduationCap,
  HeartPulse,
  UtensilsCrossed,
  Briefcase,
  Landmark,
  Code,
  Gamepad2,
  Leaf,
  Camera,
  Music,
  type LucideIcon,
} from 'lucide-react'
import { CreateProjectDialog } from '@/components/dashboard/CreateProjectDialog'
import type { ProjectType, ProjectIndustry } from '@/hooks/useProjects'

/* ─────────────────────────────────────────────
   Template type
   ───────────────────────────────────────────── */

type Difficulty = 'beginner' | 'intermediate' | 'advanced'

interface Template {
  id: string
  name: string
  category: string
  description: string
  difficulty: Difficulty
  buildTime: string
  projectType: ProjectType
  industry: ProjectIndustry
  icon: LucideIcon
  gradient: string
  accent: string
}

/* ─────────────────────────────────────────────
   Difficulty helpers
   ───────────────────────────────────────────── */

const DIFFICULTY_COLORS: Record<Difficulty, { bg: string; text: string }> = {
  beginner: { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  intermediate: { bg: 'bg-amber-500/10', text: 'text-amber-400' },
  advanced: { bg: 'bg-rose-500/10', text: 'text-rose-400' },
}

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

/* ─────────────────────────────────────────────
   Template data (14 templates)
   ───────────────────────────────────────────── */

const ALL_TEMPLATES: Template[] = [
  {
    id: 'saas-landing',
    name: 'SaaS Landing Page',
    category: 'SaaS',
    description: 'High-converting landing page for SaaS products with hero, features, pricing, and CTA sections.',
    difficulty: 'beginner',
    buildTime: '~5 min',
    projectType: 'landing-page',
    industry: 'technology',
    icon: Layers,
    gradient: 'from-blue-500/20 to-violet-500/20',
    accent: 'bg-blue-500',
  },
  {
    id: 'ecommerce-store',
    name: 'E-Commerce Storefront',
    category: 'E-Commerce',
    description: 'Modern product catalog with shopping cart, checkout flow, and inventory display.',
    difficulty: 'intermediate',
    buildTime: '~8 min',
    projectType: 'website',
    industry: 'e-commerce',
    icon: ShoppingCart,
    gradient: 'from-amber-500/20 to-orange-500/20',
    accent: 'bg-amber-500',
  },
  {
    id: 'portfolio-creative',
    name: 'Creative Portfolio',
    category: 'Portfolio',
    description: 'Stunning portfolio for designers, photographers, and creatives with gallery and project showcase.',
    difficulty: 'beginner',
    buildTime: '~4 min',
    projectType: 'website',
    industry: 'portfolio',
    icon: Camera,
    gradient: 'from-pink-500/20 to-rose-500/20',
    accent: 'bg-pink-500',
  },
  {
    id: 'analytics-dashboard',
    name: 'Analytics Dashboard',
    category: 'Dashboard',
    description: 'Real-time data visualization dashboard with charts, metrics, and KPI tracking panels.',
    difficulty: 'advanced',
    buildTime: '~12 min',
    projectType: 'dashboard',
    industry: 'technology',
    icon: LayoutDashboard,
    gradient: 'from-cyan-500/20 to-blue-500/20',
    accent: 'bg-cyan-500',
  },
  {
    id: 'restaurant-site',
    name: 'Restaurant Website',
    category: 'Restaurant',
    description: 'Elegant restaurant site with online menu, reservations, location map, and photo gallery.',
    difficulty: 'beginner',
    buildTime: '~6 min',
    projectType: 'website',
    industry: 'other',
    icon: UtensilsCrossed,
    gradient: 'from-red-500/20 to-orange-500/20',
    accent: 'bg-red-500',
  },
  {
    id: 'course-platform',
    name: 'Online Course Platform',
    category: 'Education',
    description: 'Educational platform with course catalog, lesson player, progress tracking, and certificates.',
    difficulty: 'advanced',
    buildTime: '~10 min',
    projectType: 'saas',
    industry: 'education',
    icon: GraduationCap,
    gradient: 'from-indigo-500/20 to-purple-500/20',
    accent: 'bg-indigo-500',
  },
  {
    id: 'health-wellness',
    name: 'Health & Wellness App',
    category: 'Healthcare',
    description: 'Clean wellness platform with appointment booking, service listings, and patient portal.',
    difficulty: 'intermediate',
    buildTime: '~7 min',
    projectType: 'website',
    industry: 'healthcare',
    icon: HeartPulse,
    gradient: 'from-teal-500/20 to-emerald-500/20',
    accent: 'bg-teal-500',
  },
  {
    id: 'fintech-landing',
    name: 'FinTech Landing',
    category: 'Finance',
    description: 'Trust-building financial services landing page with security badges, testimonials, and feature tours.',
    difficulty: 'intermediate',
    buildTime: '~6 min',
    projectType: 'landing-page',
    industry: 'finance',
    icon: Landmark,
    gradient: 'from-emerald-500/20 to-teal-500/20',
    accent: 'bg-emerald-500',
  },
  {
    id: 'dev-tool-docs',
    name: 'Developer Docs Site',
    category: 'Technology',
    description: 'Clean API documentation with search, code examples, SDK references, and interactive playground.',
    difficulty: 'intermediate',
    buildTime: '~7 min',
    projectType: 'website',
    industry: 'technology',
    icon: Code,
    gradient: 'from-slate-500/20 to-zinc-500/20',
    accent: 'bg-slate-500',
  },
  {
    id: 'gaming-community',
    name: 'Gaming Community Hub',
    category: 'Community',
    description: 'Social platform for gaming communities with forums, leaderboards, tournaments, and profiles.',
    difficulty: 'advanced',
    buildTime: '~14 min',
    projectType: 'saas',
    industry: 'other',
    icon: Gamepad2,
    gradient: 'from-purple-500/20 to-fuchsia-500/20',
    accent: 'bg-purple-500',
  },
  {
    id: 'eco-friendly-shop',
    name: 'Eco-Friendly Store',
    category: 'E-Commerce',
    description: 'Sustainable brand storefront with green design, impact tracker, and eco-friendly product badges.',
    difficulty: 'beginner',
    buildTime: '~5 min',
    projectType: 'website',
    industry: 'e-commerce',
    icon: Leaf,
    gradient: 'from-green-500/20 to-lime-500/20',
    accent: 'bg-green-500',
  },
  {
    id: 'agency-portfolio',
    name: 'Agency Showcase',
    category: 'Portfolio',
    description: 'Agency portfolio with case studies, client logos, service offerings, and contact forms.',
    difficulty: 'intermediate',
    buildTime: '~6 min',
    projectType: 'website',
    industry: 'portfolio',
    icon: Briefcase,
    gradient: 'from-orange-500/20 to-amber-500/20',
    accent: 'bg-orange-500',
  },
  {
    id: 'music-artist',
    name: 'Music Artist Page',
    category: 'Creative',
    description: 'Artist landing with music player, tour dates, merch store, and social media integration.',
    difficulty: 'beginner',
    buildTime: '~4 min',
    projectType: 'landing-page',
    industry: 'portfolio',
    icon: Music,
    gradient: 'from-rose-500/20 to-pink-500/20',
    accent: 'bg-rose-500',
  },
  {
    id: 'ai-tool-landing',
    name: 'AI Tool Showcase',
    category: 'SaaS',
    description: 'Convert AI tool visitors with interactive demos, trust signals, feature comparisons, and pricing.',
    difficulty: 'intermediate',
    buildTime: '~8 min',
    projectType: 'landing-page',
    industry: 'ai',
    icon: Sparkles,
    gradient: 'from-violet-500/20 to-blue-500/20',
    accent: 'bg-violet-500',
  },
]

/* ─────────────────────────────────────────────
   Derived: unique categories
   ───────────────────────────────────────────── */

const ALL_CATEGORIES = ['All', ...Array.from(new Set(ALL_TEMPLATES.map((t) => t.category)))]

/* ─────────────────────────────────────────────
   Route
   ───────────────────────────────────────────── */

export const Route = createFileRoute('/app/templates')({
  head: () => ({ meta: [{ title: 'Templates · GrowthFlow AI' }] }),
  component: TemplatesPage,
})

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */

function TemplatesPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  /* ── Dialog state for "Use Template" ── */
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  /* ── Filtered + searched ── */
  const filtered = useMemo(() => {
    let items = ALL_TEMPLATES

    if (activeCategory !== 'All') {
      items = items.filter((t) => t.category === activeCategory)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q),
      )
    }

    return items
  }, [search, activeCategory])

  const handleUseTemplate = useCallback((template: Template) => {
    setSelectedTemplate(template)
    setDialogOpen(true)
  }, [])

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Templates
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Pre-built starting points for your next project
          </p>
        </div>
      </div>

      {/* ── Search ── */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* ── Category filters ── */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap ${
              activeCategory === cat
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Results count ── */}
      <p className="text-xs text-muted-foreground">
        {filtered.length} template{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* ── Template grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((template, i) => (
            <TemplateCard
              key={template.id}
              template={template}
              index={i}
              onUse={handleUseTemplate}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* ── Empty state ── */}
      {filtered.length === 0 && (
        <motion.div
          className="flex flex-col items-center justify-center py-20 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Search className="size-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground">No templates found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            Try adjusting your search or category filter.
          </p>
        </motion.div>
      )}

      {/* ── Create Project Dialog ── */}
      {selectedTemplate && (
        <CreateProjectDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          initialType={selectedTemplate.projectType}
          initialIndustry={selectedTemplate.industry}
          initialName={selectedTemplate.name}
        />
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Template Card
   ───────────────────────────────────────────── */

function TemplateCard({
  template,
  index,
  onUse,
}: {
  template: Template
  index: number
  onUse: (t: Template) => void
}) {
  const Icon = template.icon
  const diffColors = DIFFICULTY_COLORS[template.difficulty]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.35,
        delay: index * 0.04,
        ease: 'easeOut',
      }}
      className="group rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 overflow-hidden"
    >
      {/* ── Thumbnail area ── */}
      <div className={`relative h-36 bg-gradient-to-br ${template.gradient} flex items-center justify-center overflow-hidden`}>
        {/* Decorative circles */}
        <div className="absolute -top-6 -right-6 size-24 rounded-full bg-background/10" />
        <div className="absolute -bottom-8 -left-4 size-20 rounded-full bg-background/10" />

        {/* Icon */}
        <div className="relative z-10">
          <div className={`size-14 rounded-xl ${template.accent} bg-opacity-20 flex items-center justify-center shadow-lg backdrop-blur-sm`}>
            <Icon className="size-7 text-white drop-shadow-md" />
          </div>
        </div>

        {/* Difficulty badge (top-right) */}
        <div className="absolute top-3 right-3 z-10">
          <Badge
            variant="outline"
            className={`text-[10px] px-2 py-0.5 border-transparent ${diffColors.bg} ${diffColors.text}`}
          >
            {DIFFICULTY_LABELS[template.difficulty]}
          </Badge>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="p-4 space-y-3">
        {/* Category + Build Time */}
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[10px] px-2 py-0">
            {template.category}
          </Badge>
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Clock className="size-3" />
            {template.buildTime}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {template.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {template.description}
        </p>

        {/* Use Template button */}
        <Button
          size="sm"
          className="w-full gap-2 group/btn"
          onClick={() => onUse(template)}
        >
          <Sparkles className="size-3.5 transition-transform group-hover/btn:scale-110" />
          Use Template
        </Button>
      </div>
    </motion.div>
  )
}

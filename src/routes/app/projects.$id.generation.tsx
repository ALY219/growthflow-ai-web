import { useMemo } from 'react'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  Button,
  Badge,
} from '@blinkdotnew/ui'
import {
  ArrowLeft,
  Sparkles,
  Clock,
  CheckCircle2,
  Globe,
  Layers,
  Palette,
  FileText,
  Zap,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useProjects } from '@/hooks/useProjects'
import type { GenerationConfig } from '@/lib/generation-types'
import {
  INDUSTRY_LABELS,
  WEBSITE_GOAL_LABELS,
  CUSTOMER_TYPE_LABELS,
  DESIGN_STYLE_LABELS,
  STANDARD_PAGE_LABELS,
  FEATURE_LABELS,
} from '@/lib/generation-types'

export const Route = createFileRoute('/app/projects/$id/generation')({
  head: () => ({ meta: [{ title: 'Generation · GrowthFlow AI' }] }),
  component: GenerationPage,
})

function GenerationPage() {
  const { user } = useAuth()
  const { data: projects = [], isLoading } = useProjects(user?.id)
  const { id } = useParams({ from: '/app/projects/$id/generation' })

  const project = useMemo(
    () => projects.find((p) => p.id === id),
    [projects, id],
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="space-y-6">
        <Link
          to="/app/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          Back to Projects
        </Link>
        <Card className="border-border bg-card border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Clock className="size-12 text-muted-foreground mb-4" />
            <h2 className="text-lg font-semibold text-foreground">Project not found</h2>
            <p className="text-sm text-muted-foreground mt-1.5">
              This project may have been deleted or the link is invalid.
            </p>
            <Link to="/app/projects" className="mt-4">
              <Button variant="outline" size="sm">View All Projects</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Back link */}
      <Link
        to="/app/projects/$id"
        params={{ id: project.id }}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        Back to Project
      </Link>

      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Generation
          </h1>
          <Badge variant="secondary" className="gap-1.5">
            <Clock className="size-3" />
            Queued
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Your website configuration for <span className="font-medium text-foreground">{project.name}</span> has been saved. AI generation will be available once a provider is connected.
        </p>
      </div>

      {/* Status card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            {/* Animated icon */}
            <div className="flex flex-col items-center text-center py-6">
              <div className="relative mb-6">
                <div className="absolute inset-0 size-16 rounded-full bg-primary/20 blur-xl" />
                <motion.div
                  className="relative size-16 rounded-full bg-primary/10 flex items-center justify-center"
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Sparkles className="size-7 text-primary" />
                </motion.div>
              </div>
              <h2 className="text-xl font-bold text-foreground">Ready for AI Generation</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                Your wizard configuration is saved and queued. When an AI provider (Gemini, OpenAI, Claude, etc.) is connected, generation will start automatically.
              </p>
            </div>

            {/* Summary chips */}
            <div className="flex flex-wrap gap-2 justify-center pt-4 border-t border-border">
              <SummaryChip icon={Globe} label="Website" />
              <SummaryChip icon={Layers} label="Structure Saved" />
              <SummaryChip icon={Palette} label="Theme Saved" />
              <SummaryChip icon={Zap} label="Features Saved" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* What happens next */}
      <Card className="border-border bg-card">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">What happens next</h3>
          <div className="space-y-3">
            <Step
              num={1}
              title="Configuration Saved"
              desc="Your wizard inputs are stored securely in the database."
              done
            />
            <Step
              num={2}
              title="Connect an AI Provider"
              desc="Link a provider like Gemini, OpenAI, or Claude to start generating."
            />
            <Step
              num={3}
              title="AI Generates Your Website"
              desc="The AI builds pages, components, and content based on your config."
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Link to="/app/projects/$id" params={{ id: project.id }}>
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="size-4" />
            Back to Project
          </Button>
        </Link>
        <Link to="/app/projects">
          <Button variant="ghost" className="gap-2">
            <Globe className="size-4" />
            All Projects
          </Button>
        </Link>
      </div>
    </div>
  )
}

function SummaryChip({ icon: Icon, label }: { icon: typeof Globe; label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">
      <Icon className="size-3" />
      {label}
    </div>
  )
}

function Step({
  num,
  title,
  desc,
  done = false,
}: {
  num: number
  title: string
  desc: string
  done?: boolean
}) {
  return (
    <div className="flex items-start gap-3">
      <div className={`flex size-7 items-center justify-center rounded-full shrink-0 text-xs font-bold ${done ? 'bg-emerald-500/20 text-emerald-400' : 'bg-muted text-muted-foreground'}`}>
        {done ? <CheckCircle2 className="size-4" /> : num}
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
    </div>
  )
}

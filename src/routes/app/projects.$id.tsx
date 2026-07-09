import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Card,
  CardContent,
  Button,
  Badge,
  Dialog,
} from '@blinkdotnew/ui'
import {
  ArrowLeft,
  Globe,
  Layers,
  Layout,
  LayoutDashboard,
  Sparkles,
  FileText,
  Database,
  Rocket,
  Clock,
  PanelRight,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import {
  useProjects,
  useCreateGenerationJob,
  type ProjectType,
  type CreateGenerationJobInput,
  parseProjectData,
} from '@/hooks/useProjects'
import {
  WorkspaceSidebar,
  type WorkspaceView,
  WORKSPACE_NAV_ITEMS,
} from '@/components/dashboard/WorkspaceSidebar'
import { PropertiesPanel } from '@/components/dashboard/PropertiesPanel'
import { GenerateConfirmDialog } from '@/components/dashboard/GenerateConfirmDialog'
import { WebsiteGenerationWizard } from '@/components/dashboard/WebsiteGenerationWizard'
import { GenerationStatusView } from '@/components/dashboard/GenerationStatusView'
import {
  createDefaultConfig,
  type GenerationConfig,
  type WizardStep,
} from '@/lib/generation-types'

/* ─────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────── */

const PROJECT_TYPE_ICONS: Record<ProjectType, typeof Globe> = {
  website: Globe,
  saas: Layers,
  'landing-page': Layout,
  dashboard: LayoutDashboard,
}

const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  website: 'Website',
  saas: 'SaaS',
  'landing-page': 'Landing Page',
  dashboard: 'Dashboard',
}

const STATUS_VARIANTS: Record<string, 'default' | 'secondary' | 'outline'> = {
  draft: 'secondary',
  building: 'default',
  completed: 'outline',
  archived: 'secondary',
}

const STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  building: 'Building',
  completed: 'Completed',
  archived: 'Archived',
}

const GEN_CARDS = [
  {
    id: 'website',
    label: 'Website',
    icon: Globe,
    desc: 'Generate landing page and website structure.',
    isWizard: true,
  },
  {
    id: 'blueprint',
    label: 'Blueprint',
    icon: FileText,
    desc: 'Generate architecture and product planning.',
    isWizard: false,
  },
  {
    id: 'database',
    label: 'Database',
    icon: Database,
    desc: 'Generate database schema.',
    isWizard: false,
  },
  {
    id: 'deployment',
    label: 'Deployment',
    icon: Rocket,
    desc: 'Prepare deployment configuration.',
    isWizard: false,
  },
] as const

const LOADING_MESSAGES = [
  'Understanding your project...',
  'Planning architecture...',
  'Preparing workspace...',
  'Finalizing...',
]

type GenState = 'idle' | 'confirming' | 'loading'
type ViewState = 'workspace' | 'wizard' | 'status'

/* ─────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────── */

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/* ─────────────────────────────────────────────
   Route
   ───────────────────────────────────────────── */

export const Route = createFileRoute('/app/projects/$id')({
  head: () => ({ meta: [{ title: 'Project · GrowthFlow AI' }] }),
  component: ProjectDetailPage,
})

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */

function ProjectDetailPage() {
  const { user } = useAuth()
  const { data: projects = [], isLoading } = useProjects(user?.id)
  const { id } = useParams({ from: '/app/projects/$id' })
  const createGenJob = useCreateGenerationJob()

  const project = useMemo(
    () => projects.find((p) => p.id === id),
    [projects, id],
  )

  /* ── workspace state ── */
  const [activeView, setActiveView] = useState<WorkspaceView>('overview')
  const [genState, setGenState] = useState<GenState>('idle')
  const [genFeature, setGenFeature] = useState('')
  const [progress, setProgress] = useState(0)
  const [statusIndex, setStatusIndex] = useState(0)
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false)

  /* ── Wizard state ── */
  const [viewState, setViewState] = useState<ViewState>('workspace')
  const [wizardOpen, setWizardOpen] = useState(false)
  const [wizardConfig, setWizardConfig] = useState<GenerationConfig>(createDefaultConfig)
  const [wizardStep, setWizardStep] = useState<WizardStep>(1)
  const [wizardPending, setWizardPending] = useState(false)

  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const messageRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* ── cleanup timers on unmount ── */
  useEffect(() => {
    return () => {
      if (progressRef.current) clearInterval(progressRef.current)
      if (messageRef.current) clearInterval(messageRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  /* ── reset wizard on open ── */
  const openWizard = useCallback(() => {
    setWizardConfig(createDefaultConfig())
    setWizardStep(1)
    setWizardPending(false)
    setWizardOpen(true)
  }, [])

  /* ── generation card click handler ── */
  const handleGenClick = useCallback((feature: string, isWizard: boolean) => {
    if (isWizard) {
      // Open the full-screen website generation wizard
      openWizard()
      return
    }
    // Other cards: show the placeholder confirm dialog
    setGenFeature(feature)
    setGenState('confirming')
  }, [openWizard])

  /* ── confirm dialog (non-wizard generation cards) ── */
  const handleGenConfirm = useCallback(() => {
    setGenState('loading')
    setProgress(0)
    setStatusIndex(0)

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1.5
        return next >= 100 ? 100 : next
      })
    }, 100)

    messageRef.current = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % LOADING_MESSAGES.length)
    }, 1700)

    timeoutRef.current = setTimeout(() => {
      if (progressRef.current) clearInterval(progressRef.current)
      if (messageRef.current) clearInterval(messageRef.current)
      setGenState('idle')
      setProgress(100)
    }, 7000)
  }, [])

  /* ── Wizard submit: save to DB then show status ── */
  const handleWizardSubmit = useCallback(async () => {
    if (!user?.id || !project) return

    setWizardPending(true)

    try {
      const input: CreateGenerationJobInput = {
        projectId: project.id,
        userId: user.id,
        config: wizardConfig,
      }
      await createGenJob.mutateAsync(input)

      setWizardOpen(false)
      setWizardPending(false)
      // Switch to generation status view
      setViewState('status')
    } catch {
      setWizardPending(false)
    }
  }, [user?.id, project, wizardConfig, createGenJob])

  /* ── Status view done → return to workspace ── */
  const handleStatusDone = useCallback(() => {
    setViewState('workspace')
  }, [])

  /* ── LOADING ── */
  if (isLoading) {
    return (
      <div className="flex gap-6">
        <div className="hidden lg:block w-52 shrink-0">
          <div className="h-full rounded bg-muted animate-pulse" />
        </div>
        <div className="flex-1 space-y-6">
          <div className="h-6 w-24 rounded bg-muted animate-pulse" />
          <div className="h-10 w-2/3 rounded bg-muted animate-pulse" />
          <div className="h-64 rounded-xl bg-muted animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-40 rounded-xl bg-muted animate-pulse" />
            <div className="h-40 rounded-xl bg-muted animate-pulse" />
            <div className="h-40 rounded-xl bg-muted animate-pulse" />
            <div className="h-40 rounded-xl bg-muted animate-pulse" />
          </div>
        </div>
        <div className="hidden lg:block w-64 shrink-0">
          <div className="h-full rounded bg-muted animate-pulse" />
        </div>
      </div>
    )
  }

  /* ── NOT FOUND ── */
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
            <h2 className="text-lg font-semibold text-foreground">
              Project not found
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5">
              This project may have been deleted or the link is invalid.
            </p>
            <Link to="/app/projects" className="mt-4">
              <Button variant="outline" size="sm">
                View All Projects
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  /* ── derived data ── */
  const TypeIcon =
    PROJECT_TYPE_ICONS[project.type as ProjectType] ?? Globe
  const projectData = parseProjectData(project)

  /* ─────────────────────────────────────────────
     RENDER — Normal state
     ───────────────────────────────────────────── */

  return (
    <>
      <div className="flex min-h-0">
        {/* ── LEFT SIDEBAR (desktop) ── */}
        <div className="hidden md:block">
          <WorkspaceSidebar
            active={activeView}
            onSelect={setActiveView}
          />
        </div>

        {/* ── CENTER ── */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* ── Mobile sidebar tab bar ── */}
          <div className="md:hidden flex gap-1 overflow-x-auto px-2 py-2 border-b border-border">
            {WORKSPACE_NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const isActive = activeView === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveView(item.id)}
                  className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors duration-150 ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="size-3" />
                  {item.label}
                </button>
              )
            })}
          </div>

          {/* ── Top header bar ── */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border shrink-0">
            <Link
              to="/app/projects"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <ArrowLeft className="size-3.5" />
              <span className="hidden sm:inline">Back to Projects</span>
            </Link>

            <div className="flex-1 min-w-0 flex items-center gap-2.5">
              <h2 className="text-lg font-bold text-foreground truncate">
                {project.name}
              </h2>
              <Badge variant="outline" className="gap-1.5 shrink-0">
                <TypeIcon className="size-3" />
                <span className="hidden sm:inline">
                  {PROJECT_TYPE_LABELS[project.type as ProjectType]}
                </span>
              </Badge>
              <Badge
                variant={STATUS_VARIANTS[project.status] ?? 'secondary'}
                className="shrink-0"
              >
                {STATUS_LABELS[project.status]}
              </Badge>
            </div>

            <span className="hidden sm:inline text-xs text-muted-foreground shrink-0">
              Updated {formatDate(project.updatedAt)}
            </span>
          </div>

          {/* ── CENTER WORKSPACE AREA ── */}
          <div className="flex-1 overflow-y-auto p-4">
            {viewState === 'status' ? (
              <GenerationStatusView
                projectId={project.id}
                onDone={handleStatusDone}
              />
            ) : genState === 'loading' ? (
              <LoadingWorkspace progress={progress} statusIndex={statusIndex} />
            ) : (
              <EmptyWorkspace onGenerate={handleGenClick} />
            )}
          </div>
        </div>

        {/* ── RIGHT PANEL (desktop) ── */}
        <div className="hidden lg:block">
          <PropertiesPanel project={project} projectData={projectData} />
        </div>
      </div>

      {/* ── Mobile panel toggle ── */}
      <Button
        size="sm"
        variant="outline"
        className="fixed bottom-4 right-4 z-30 lg:hidden shadow-lg gap-2"
        onClick={() => setMobilePanelOpen(true)}
      >
        <PanelRight className="size-4" />
        Properties
      </Button>

      {/* ── Mobile panel dialog ── */}
      <Dialog open={mobilePanelOpen} onOpenChange={setMobilePanelOpen}>
        <PropertiesPanel project={project} projectData={projectData} />
      </Dialog>

      {/* ── Generation confirm dialog (non-wizard cards) ── */}
      <GenerateConfirmDialog
        open={genState === 'confirming'}
        onOpenChange={(open) => {
          if (!open) setGenState('idle')
        }}
        onConfirm={handleGenConfirm}
        featureLabel={genFeature}
      />

      {/* ── Full-screen Website Generation Wizard ── */}
      <WebsiteGenerationWizard
        open={wizardOpen}
        onOpenChange={setWizardOpen}
        config={wizardConfig}
        setConfig={setWizardConfig}
        step={wizardStep}
        setStep={setWizardStep}
        onSubmit={handleWizardSubmit}
        isPending={wizardPending}
        variant="fullscreen"
      />
    </>
  )
}

/* ─────────────────────────────────────────────
   Sub-components
   ───────────────────────────────────────────── */

function EmptyWorkspace({
  onGenerate,
}: {
  onGenerate: (feature: string, isWizard: boolean) => void
}) {
  return (
    <div className="flex flex-col items-center">
      {/* Animated Sparkles icon */}
      <div className="relative mb-8 mt-6">
        <div className="absolute inset-0 size-16 rounded-full bg-primary/20 blur-xl" />
        <motion.div
          className="relative size-16 rounded-full bg-primary/10 flex items-center justify-center"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Sparkles className="size-7 text-primary" />
        </motion.div>
      </div>

      <h3 className="text-xl font-bold text-foreground tracking-tight">
        Ready to Generate
      </h3>
      <p className="text-sm text-muted-foreground mt-2 mb-8 max-w-md text-center">
        Choose what you want GrowthFlow AI to generate for this project.
      </p>

      {/* Generation cards — 2×2 grid */}
      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
        {GEN_CARDS.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.id}
              className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Icon className="size-5 text-primary" />
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-1">
                {card.label}
              </h4>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                {card.desc}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => onGenerate(card.label, card.isWizard)}
              >
                <Sparkles className="size-3.5" />
                Generate
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function LoadingWorkspace({
  progress,
  statusIndex,
}: {
  progress: number
  statusIndex: number
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Large animated icon */}
      <div className="relative mb-8">
        <div className="absolute inset-0 size-20 rounded-full bg-primary/20 blur-2xl" />
        <motion.div
          className="relative size-20 rounded-full bg-primary/10 flex items-center justify-center"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Sparkles className="size-9 text-primary" />
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-sm mb-6">
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Status messages */}
      <div className="h-8 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={statusIndex}
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {LOADING_MESSAGES[statusIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}

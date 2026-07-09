import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from '@tanstack/react-router'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Button,
  Input,
  toast,
} from '@blinkdotnew/ui'
import {
  Globe,
  Layers,
  Layout,
  LayoutDashboard,
  ChevronDown,
  Moon,
  Sun,
  SunMoon,
  Loader2,
  Sparkles,
  Check,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import {
  useCreateProject,
  type ProjectType,
  type ProjectIndustry,
  type ProjectTheme,
  type ProjectTargetAudience,
} from '@/hooks/useProjects'

type Step = 1 | 2 | 3 | 4

export interface CreateProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Prefill project type when dialog opens */
  initialType?: ProjectType
  /** Prefill industry when dialog opens */
  initialIndustry?: ProjectIndustry
  /** Prefill project name when dialog opens */
  initialName?: string
}

const PROJECT_TYPE_OPTIONS: {
  value: ProjectType
  label: string
  icon: typeof Globe
}[] = [
  { value: 'website', label: 'Website', icon: Globe },
  { value: 'saas', label: 'SaaS', icon: Layers },
  { value: 'landing-page', label: 'Landing Page', icon: Layout },
  { value: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
]

const INDUSTRY_OPTIONS: { value: ProjectIndustry; label: string }[] = [
  { value: 'technology', label: 'Technology' },
  { value: 'education', label: 'Education' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'finance', label: 'Finance' },
  { value: 'e-commerce', label: 'E-commerce' },
  { value: 'ai', label: 'AI' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'other', label: 'Other' },
]

const THEME_OPTIONS: {
  value: ProjectTheme
  label: string
  icon: typeof Moon
}[] = [
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'auto', label: 'Auto', icon: SunMoon },
]

const AUDIENCE_OPTIONS: { value: ProjectTargetAudience; label: string }[] = [
  { value: 'students', label: 'Students' },
  { value: 'businesses', label: 'Businesses' },
  { value: 'startups', label: 'Startups' },
  { value: 'creators', label: 'Creators' },
  { value: 'developers', label: 'Developers' },
  { value: 'other', label: 'Other' },
]

const TYPE_INFO: Record<
  ProjectType,
  { label: string; icon: typeof Globe }
> = {
  website: { label: 'Website', icon: Globe },
  saas: { label: 'SaaS', icon: Layers },
  'landing-page': { label: 'Landing Page', icon: Layout },
  dashboard: { label: 'Dashboard', icon: LayoutDashboard },
}

const INDUSTRY_LABELS: Record<ProjectIndustry, string> = {
  technology: 'Technology',
  education: 'Education',
  healthcare: 'Healthcare',
  fitness: 'Fitness',
  finance: 'Finance',
  'e-commerce': 'E-commerce',
  ai: 'AI',
  portfolio: 'Portfolio',
  other: 'Other',
}

const THEME_LABELS: Record<ProjectTheme, string> = {
  dark: 'Dark',
  light: 'Light',
  auto: 'Auto',
}

const AUDIENCE_LABELS: Record<ProjectTargetAudience, string> = {
  students: 'Students',
  businesses: 'Businesses',
  startups: 'Startups',
  creators: 'Creators',
  developers: 'Developers',
  other: 'Other',
}

const stepVariants = {
  enter: { x: 40, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -40, opacity: 0 },
}

const TOTAL_STEPS = 4

export function CreateProjectDialog({
  open,
  onOpenChange,
  initialType = 'website',
  initialIndustry = 'technology',
  initialName = '',
}: CreateProjectDialogProps) {
  const { user } = useAuth()
  const createProject = useCreateProject()
  const navigate = useNavigate()

  const [step, setStep] = useState<Step>(1)
  const [projectName, setProjectName] = useState(initialName)
  const [description, setDescription] = useState('')
  const [projectType, setProjectType] = useState<ProjectType>(initialType)
  const [industry, setIndustry] = useState<ProjectIndustry>(initialIndustry)
  const [industryOpen, setIndustryOpen] = useState(false)
  const [theme, setTheme] = useState<ProjectTheme>('dark')
  const [targetAudience, setTargetAudience] =
    useState<ProjectTargetAudience>('startups')

  // Sync prefill values when dialog opens or props change
  const [lastOpen, setLastOpen] = useState(false)
  if (open && !lastOpen) {
    setLastOpen(true)
    setStep(1)
    setProjectName(initialName)
    setDescription('')
    setProjectType(initialType)
    setIndustry(initialIndustry)
    setTheme('dark')
    setTargetAudience('startups')
    setIndustryOpen(false)
  } else if (!open && lastOpen) {
    setLastOpen(false)
  }

  const resetForm = () => {
    setStep(1)
    setProjectName(initialName)
    setDescription('')
    setProjectType(initialType)
    setIndustry(initialIndustry)
    setTheme('dark')
    setTargetAudience('startups')
    setIndustryOpen(false)
  }

  const handleOpenChange = (next: boolean) => {
    if (!next) resetForm()
    onOpenChange(next)
  }

  const canContinueStep1 = projectName.trim().length > 0
  const canSubmitStep4 = !createProject.isPending

  const handleSubmit = async () => {
    if (!user?.id) return

    try {
      const created = await createProject.mutateAsync({
        name: projectName.trim(),
        description: description.trim(),
        type: projectType,
        userId: user.id,
        industry,
        theme,
        targetAudience,
      })
      toast.success('Project created!', {
        description: `${projectName.trim()} has been added to your projects.`,
      })
      resetForm()
      onOpenChange(false)
      navigate({ to: '/app/projects/$id', params: { id: created.id } })
    } catch {
      toast.error('Failed to create project', {
        description: 'Please try again.',
      })
    }
  }

  const progressDots = Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1)

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Create Project
          </DialogTitle>
          <DialogDescription>
            Step {step} of {TOTAL_STEPS} —{' '}
            {step === 1
              ? 'Project Info'
              : step === 2
                ? 'Industry'
                : step === 3
                  ? 'Generation Options'
                  : 'Review'}
          </DialogDescription>
        </DialogHeader>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 pt-1 pb-2">
          {progressDots.map((dot) => (
            <div
              key={dot}
              className={`size-2 rounded-full transition-colors duration-300 ${
                dot <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <div className="relative overflow-hidden min-h-[280px]">
          <AnimatePresence mode="wait" initial={false}>
            {/* ────────── Step 1: Project Info ────────── */}
            {step === 1 && (
              <motion.div
                key="step-1"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Project Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    placeholder="My Awesome Project"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Short Description
                  </label>
                  <textarea
                    className="flex w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    placeholder="What's this project about?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Project Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {PROJECT_TYPE_OPTIONS.map((opt) => {
                      const Icon = opt.icon
                      const isSelected = projectType === opt.value
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setProjectType(opt.value)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                            isSelected
                              ? 'border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10'
                              : 'border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]'
                          }`}
                        >
                          <Icon
                            className={`size-4 shrink-0 ${isSelected ? 'text-primary' : ''}`}
                          />
                          {opt.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!canContinueStep1}
                    className="gap-2"
                  >
                    Continue
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ────────── Step 2: Industry ────────── */}
            {step === 2 && (
              <motion.div
                key="step-2"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Industry
                  </label>

                  {/* Custom styled select */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIndustryOpen(!industryOpen)}
                      className="flex w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2.5 text-sm shadow-sm transition-colors hover:border-muted-foreground/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <span className="text-foreground">
                        {INDUSTRY_LABELS[industry]}
                      </span>
                      <ChevronDown
                        className={`size-4 text-muted-foreground transition-transform duration-200 ${
                          industryOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {industryOpen && (
                      <div className="absolute z-20 mt-1 w-full rounded-md border border-border bg-card shadow-lg">
                        <div className="max-h-52 overflow-y-auto py-1">
                          {INDUSTRY_OPTIONS.map((opt) => {
                            const isSelected = industry === opt.value
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                  setIndustry(opt.value)
                                  setIndustryOpen(false)
                                }}
                                className={`flex w-full items-center justify-between px-3 py-2 text-sm transition-colors hover:bg-muted ${
                                  isSelected
                                    ? 'text-primary bg-primary/5'
                                    : 'text-foreground'
                                }`}
                              >
                                {opt.label}
                                {isSelected && (
                                  <Check className="size-3.5 text-primary" />
                                )}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Backdrop to close dropdown */}
                  {industryOpen && (
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIndustryOpen(false)}
                    />
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="gap-2"
                  >
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)} className="gap-2">
                    Continue
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ────────── Step 3: Generation Options ────────── */}
            {step === 3 && (
              <motion.div
                key="step-3"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Theme
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {THEME_OPTIONS.map((opt) => {
                      const Icon = opt.icon
                      const isSelected = theme === opt.value
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setTheme(opt.value)}
                          className={`flex flex-col items-center gap-2 px-4 py-4 rounded-lg border text-sm font-medium transition-all duration-200 ${
                            isSelected
                              ? 'border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10'
                              : 'border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]'
                          }`}
                        >
                          <Icon
                            className={`size-5 shrink-0 ${isSelected ? 'text-primary' : ''}`}
                          />
                          {opt.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Target Audience
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {AUDIENCE_OPTIONS.map((opt) => {
                      const isSelected = targetAudience === opt.value
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setTargetAudience(opt.value)}
                          className={`px-3 py-2 rounded-full border text-xs font-medium transition-all duration-200 ${
                            isSelected
                              ? 'border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10'
                              : 'border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]'
                          }`}
                        >
                          {opt.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="gap-2"
                  >
                    Back
                  </Button>
                  <Button onClick={() => setStep(4)} className="gap-2">
                    Continue
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ────────── Step 4: Summary ────────── */}
            {step === 4 && (
              <motion.div
                key="step-4"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="space-y-5"
              >
                <div className="rounded-xl border border-border bg-card/60 p-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">
                      Project Summary
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {/* Name */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Name
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {projectName}
                      </span>
                    </div>

                    {/* Type */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Type
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                        {(() => {
                          const info = TYPE_INFO[projectType]
                          const Icon = info.icon
                          return (
                            <>
                              <Icon className="size-3.5 text-primary" />
                              {info.label}
                            </>
                          )
                        })()}
                      </span>
                    </div>

                    {/* Description */}
                    {description && (
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-xs text-muted-foreground shrink-0">
                          Description
                        </span>
                        <span className="text-sm text-foreground/80 text-right leading-snug max-w-[60%]">
                          {description}
                        </span>
                      </div>
                    )}

                    {/* Industry */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Industry
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {INDUSTRY_LABELS[industry]}
                      </span>
                    </div>

                    {/* Theme */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Theme
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {THEME_LABELS[theme]}
                      </span>
                    </div>

                    {/* Target Audience */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Target Audience
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {AUDIENCE_LABELS[targetAudience]}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setStep(3)}
                    className="gap-2"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!canSubmitStep4}
                    className="gap-2"
                  >
                    {createProject.isPending ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="size-4" />
                        Generate Project
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}

import { useCallback, useRef, useState, useEffect, type Dispatch, type SetStateAction } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Button,
  Input,
  Dialog,
  DialogContent,
} from '@blinkdotnew/ui'
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
  ChevronDown,
  Globe,
  Store,
  HeartPulse,
  GraduationCap,
  Banknote,
  Briefcase,
  UtensilsCrossed,
  Ellipsis,
  ShoppingCart,
  TrendingUp,
  FileText,
  Layout,
  Monitor,
  Cloud,
  Moon,
  Sun,
  Palette,
  Layers,
  Star,
  Zap,
  Eye,
  Minus,
  Rocket,
  Gem,
  Building2,
  Users,
  Handshake,
  Lightbulb,
  Gamepad2,
  BriefcaseBusiness,
  Search,
  ShieldCheck,
  Smartphone,
  Film,
  Gauge,
  Lock,
  Database,
  Mail,
  CalendarCheck,
  MessageSquare,
  LayoutDashboard,
  Image as ImageIcon,
  Plus,
  X,
  Home,
  BookOpen,
  HelpCircle,
  Phone,
  ScrollText,
  Scale,
  Pen,
  Loader2,
} from 'lucide-react'
import type {
  GenerationConfig,
  WizardStep,
  Industry,
  WebsiteGoal,
  CustomerType,
  BusinessStage,
  AgeGroup,
  DesignStyle,
  StandardPage,
  WebsiteFeature,
  CustomPage,
} from '@/lib/generation-types'
import {
  INDUSTRY_LABELS,
  WEBSITE_GOAL_LABELS,
  CUSTOMER_TYPE_LABELS,
  BUSINESS_STAGE_LABELS,
  AGE_GROUP_LABELS,
  DESIGN_STYLE_LABELS,
  STANDARD_PAGE_LABELS,
  FEATURE_LABELS,
  STEP_LABELS,
  TOTAL_STEPS,
} from '@/lib/generation-types'

/* ─────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────── */

const INDUSTRIES: Industry[] = [
  'technology', 'ecommerce', 'healthcare', 'education',
  'finance', 'portfolio', 'restaurant', 'agency',
  'fitness', 'ai', 'other',
]

const INDUSTRY_ICONS: Record<Industry, typeof Globe> = {
  technology: Globe,
  ecommerce: Store,
  healthcare: HeartPulse,
  education: GraduationCap,
  finance: Banknote,
  portfolio: Briefcase,
  restaurant: UtensilsCrossed,
  agency: Building2,
  fitness: Zap,
  ai: Sparkles,
  other: Ellipsis,
}

const WEBSITE_GOALS: WebsiteGoal[] = [
  'sell-products', 'generate-leads', 'portfolio',
  'landing-page', 'business-website', 'saas',
]

const GOAL_ICONS: Record<WebsiteGoal, typeof Globe> = {
  'sell-products': ShoppingCart,
  'generate-leads': TrendingUp,
  portfolio: FileText,
  'landing-page': Layout,
  'business-website': Monitor,
  saas: Cloud,
}

const CUSTOMER_TYPES: CustomerType[] = ['b2b', 'b2c', 'both']
const BUSINESS_STAGES: BusinessStage[] = ['idea', 'pre-seed', 'seed', 'series-a', 'growth', 'established']
const AGE_GROUPS: AgeGroup[] = ['under-18', '18-24', '25-34', '35-44', '45-54', '55-64', '65-plus']

const DESIGN_STYLES: { value: DesignStyle; icon: typeof Globe; preview: string }[] = [
  { value: 'modern', icon: Zap, preview: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20' },
  { value: 'minimal', icon: Minus, preview: 'bg-gradient-to-br from-gray-500/10 to-gray-400/10' },
  { value: 'luxury', icon: Gem, preview: 'bg-gradient-to-br from-amber-500/20 to-yellow-500/20' },
  { value: 'corporate', icon: Building2, preview: 'bg-gradient-to-br from-slate-500/20 to-blue-500/20' },
  { value: 'startup', icon: Rocket, preview: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20' },
  { value: 'creative', icon: Palette, preview: 'bg-gradient-to-br from-pink-500/20 to-purple-500/20' },
  { value: 'dark', icon: Moon, preview: 'bg-gradient-to-br from-gray-800/40 to-gray-900/40' },
  { value: 'light', icon: Sun, preview: 'bg-gradient-to-br from-amber-200/20 to-orange-200/20' },
]

const STANDARD_PAGES: { value: StandardPage; icon: typeof Globe }[] = [
  { value: 'home', icon: Home },
  { value: 'about', icon: BookOpen },
  { value: 'services', icon: Layers },
  { value: 'pricing', icon: Banknote },
  { value: 'portfolio', icon: Briefcase },
  { value: 'blog', icon: Pen },
  { value: 'faq', icon: HelpCircle },
  { value: 'contact', icon: Phone },
  { value: 'privacy-policy', icon: ScrollText },
  { value: 'terms', icon: Scale },
]

const FEATURES: { value: WebsiteFeature; icon: typeof Globe; desc: string }[] = [
  { value: 'contact-form', icon: Mail, desc: 'Let visitors send you messages' },
  { value: 'newsletter', icon: FileText, desc: 'Collect email subscriptions' },
  { value: 'booking', icon: CalendarCheck, desc: 'Accept appointments online' },
  { value: 'testimonials', icon: Star, desc: 'Showcase customer reviews' },
  { value: 'gallery', icon: ImageIcon, desc: 'Display visual work' },
  { value: 'analytics', icon: Gauge, desc: 'Track visitor metrics' },
  { value: 'live-chat', icon: MessageSquare, desc: 'Real-time customer support' },
  { value: 'authentication', icon: Lock, desc: 'User login and signup' },
  { value: 'dashboard', icon: LayoutDashboard, desc: 'Private user dashboard' },
  { value: 'cms-ready', icon: Database, desc: 'Content management system' },
]

const PRESET_COLORS = [
  '#3B82F6', '#8B5CF6', '#EC4899', '#EF4444',
  '#F97316', '#EAB308', '#22C55E', '#14B8A6',
  '#06B6D4', '#6366F1', '#A855F7', '#78716C',
]

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'France', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Japan',
  'Singapore', 'India', 'Brazil', 'Mexico', 'Other',
]

const stepVariants = {
  enter: { x: 60, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -60, opacity: 0 },
}

/* ─────────────────────────────────────────────
   Props
   ───────────────────────────────────────────── */

export interface WebsiteGenerationWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  config: GenerationConfig
  setConfig: Dispatch<SetStateAction<GenerationConfig>>
  step: WizardStep
  setStep: Dispatch<SetStateAction<WizardStep>>
  onSubmit: () => void
  isPending: boolean
  /** Render as full-screen overlay instead of a dialog. Default: false */
  variant?: 'dialog' | 'fullscreen'
}

/* ─────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────── */

export function WebsiteGenerationWizard({
  open,
  onOpenChange,
  config,
  setConfig,
  step,
  setStep,
  onSubmit,
  isPending,
  variant = 'dialog',
}: WebsiteGenerationWizardProps) {
  const updateConfig = useCallback(
    (patch: Partial<GenerationConfig>) =>
      setConfig((prev) => ({ ...prev, ...patch })),
    [setConfig],
  )

  // ── Autosave indicator ──
  const [autosaveState, setAutosaveState] = useState<'idle' | 'saving' | 'saved'>('idle')
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    setAutosaveState('saving')
    const t = setTimeout(() => setAutosaveState('saved'), 600)
    return () => clearTimeout(t)
  }, [config])

  // ── Step validators ──
  const canProceedStep1 =
    config.businessName.trim().length > 0 &&
    config.industry !== '' &&
    config.websiteGoal !== ''
  const canProceedStep2 = config.primaryAudience.trim().length > 0 && config.customerType !== ''
  const canProceedStep3 = config.designStyle !== ''
  const canProceedStep4 = config.pages.length > 0
  // Step 5 always proceeds (features optional)

  const canProceed: Record<WizardStep, boolean> = {
    1: canProceedStep1,
    2: canProceedStep2,
    3: canProceedStep3,
    4: canProceedStep4,
    5: true,
    6: !isPending,
  }

  const progressDots = Array.from({ length: TOTAL_STEPS }, (_, i) => (i + 1) as WizardStep)

  /* ── HANDLERS ── */
  function handleNext() {
    if (step < TOTAL_STEPS) setStep((step + 1) as WizardStep)
  }

  function handleBack() {
    if (step > 1) setStep((step - 1) as WizardStep)
  }

  function handleOpenChange(next: boolean) {
    onOpenChange(next)
  }

  /* ── Shared content ── */
  const wizardContent = (
    <>
      {/* ── Header ── */}
      <div className="text-center space-y-1.5">
        <h2 className="text-lg font-bold text-foreground">Generate Website</h2>
        <div className="flex items-center justify-center gap-2">
          <p className="text-sm text-muted-foreground">
            Step {step} of {TOTAL_STEPS} — {STEP_LABELS[step]}
          </p>
          {autosaveState === 'saving' && (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Loader2 className="size-3 animate-spin" />
              Saving…
            </span>
          )}
          {autosaveState === 'saved' && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
              <Check className="size-3" />
              Saved
            </span>
          )}
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="w-full pt-3 pb-2">
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={false}
            animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          {progressDots.map((dot) => (
            <button
              key={dot}
              type="button"
              onClick={() => dot <= step && setStep(dot)}
              disabled={dot > step}
              className={`size-2.5 rounded-full transition-all duration-300 ${
                dot === step
                  ? 'bg-primary scale-125'
                  : dot < step
                    ? 'bg-primary/60'
                    : 'bg-muted'
              }`}
              aria-label={`Step ${dot}`}
            />
          ))}
        </div>
      </div>

      {/* ── Step content ── */}
      <div className="relative overflow-hidden flex-1" style={{ minHeight: variant === 'fullscreen' ? 420 : 360 }}>
        <AnimatePresence mode="wait" initial={false}>
          {step === 1 && (
            <Step1 key="s1" config={config} updateConfig={updateConfig} />
          )}
          {step === 2 && (
            <Step2 key="s2" config={config} updateConfig={updateConfig} />
          )}
          {step === 3 && (
            <Step3 key="s3" config={config} updateConfig={updateConfig} />
          )}
          {step === 4 && (
            <Step4 key="s4" config={config} updateConfig={updateConfig} />
          )}
          {step === 5 && (
            <Step5 key="s5" config={config} updateConfig={updateConfig} />
          )}
          {step === 6 && (
            <Step6 key="s6" config={config} />
          )}
        </AnimatePresence>
      </div>

      {/* ── Footer ── */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          onClick={step === 1 ? () => handleOpenChange(false) : handleBack}
          className="gap-2"
        >
          <ChevronLeft className="size-4" />
          {step === 1 ? 'Cancel' : 'Back'}
        </Button>

        {step < TOTAL_STEPS ? (
          <Button
            onClick={handleNext}
            disabled={!canProceed[step]}
            className="gap-2"
          >
            Continue
            <ChevronRight className="size-4" />
          </Button>
        ) : (
          <Button
            onClick={onSubmit}
            disabled={!canProceed[6]}
            className="gap-2"
          >
            <Sparkles className="size-4" />
            {isPending ? 'Generating...' : 'Generate Website'}
          </Button>
        )}
      </div>
    </>
  )

  /* ── Fullscreen variant ── */
  if (variant === 'fullscreen') {
    return (
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Close button (top-right) */}
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleOpenChange(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </Button>
            </div>

            <div className="flex-1 max-w-2xl w-full mx-auto px-4 py-8 flex flex-col justify-center overflow-y-auto">
              {wizardContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  /* ── Dialog variant (default) ── */
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl lg:max-w-2xl">
        {wizardContent}
      </DialogContent>
    </Dialog>
  )
}

/* ─────────────────────────────────────────────
   Reusable Field Components
   ───────────────────────────────────────────── */

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="text-sm font-medium text-foreground">
      {children} {required && <span className="text-destructive">*</span>}
    </label>
  )
}

function SelectDropdown({
  options,
  selected,
  onSelect,
  labelMap,
  placeholder = 'Select...',
}: {
  options: string[]
  selected: string
  onSelect: (v: string) => void
  labelMap: Record<string, string>
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2.5 text-sm shadow-sm transition-colors hover:border-muted-foreground/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <span className={selected ? 'text-foreground' : 'text-muted-foreground'}>
          {selected ? labelMap[selected] ?? selected : placeholder}
        </span>
        <ChevronDown className={`size-4 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 mt-1 w-full rounded-md border border-border bg-card shadow-lg">
            <div className="max-h-52 overflow-y-auto py-1">
              {options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => { onSelect(opt); setOpen(false) }}
                  className={`flex w-full items-center justify-between px-3 py-2 text-sm transition-colors hover:bg-muted ${
                    selected === opt ? 'text-primary bg-primary/5' : 'text-foreground'
                  }`}
                >
                  {labelMap[opt] ?? opt}
                  {selected === opt && <Check className="size-3.5 text-primary" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function ColorPicker({
  label,
  value,
  onChange,
  icon: Icon,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  icon: typeof Palette
}) {
  return (
    <div className="space-y-2">
      <FieldLabel>
        <span className="inline-flex items-center gap-1.5">
          <Icon className="size-3.5" />
          {label}
        </span>
      </FieldLabel>
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div
            className="size-9 rounded-lg border-2 border-border shadow-sm cursor-pointer"
            style={{ backgroundColor: value }}
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onChange(color)}
              className={`size-6 rounded-full border-2 transition-transform hover:scale-110 ${
                value === color ? 'border-foreground scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
              aria-label={color}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Step 1: Business Information
   ───────────────────────────────────────────── */

function Step1({
  config,
  updateConfig,
}: {
  config: GenerationConfig
  updateConfig: (patch: Partial<GenerationConfig>) => void
}) {
  return (
    <motion.div
      variants={stepVariants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="space-y-5"
    >
      {/* Business Name */}
      <div className="space-y-2">
        <FieldLabel required>Business Name</FieldLabel>
        <Input
          placeholder="e.g. Acme Corp"
          value={config.businessName}
          onChange={(e) => updateConfig({ businessName: e.target.value })}
          autoFocus
        />
      </div>

      {/* Tagline */}
      <div className="space-y-2">
        <FieldLabel>Startup Tagline</FieldLabel>
        <Input
          placeholder="e.g. Build faster, ship smarter"
          value={config.tagline}
          onChange={(e) => updateConfig({ tagline: e.target.value })}
        />
      </div>

      {/* Business Description */}
      <div className="space-y-2">
        <FieldLabel>Business Description</FieldLabel>
        <textarea
          className="flex w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
          placeholder="What does your business do?"
          value={config.businessDescription}
          onChange={(e) => updateConfig({ businessDescription: e.target.value })}
          rows={3}
        />
      </div>

      {/* Industry */}
      <div className="space-y-2">
        <FieldLabel required>Industry</FieldLabel>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {INDUSTRIES.map((ind) => {
            const Icon = INDUSTRY_ICONS[ind]
            const isSelected = config.industry === ind
            return (
              <button
                key={ind}
                type="button"
                onClick={() => updateConfig({ industry: ind })}
                className={`flex flex-col items-center gap-1.5 px-2 py-3 rounded-lg border text-xs font-medium transition-all duration-200 ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10'
                    : 'border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]'
                }`}
              >
                <Icon className={`size-4 shrink-0 ${isSelected ? 'text-primary' : ''}`} />
                <span className="truncate">{INDUSTRY_LABELS[ind]}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Country */}
      <div className="space-y-2">
        <FieldLabel>Country</FieldLabel>
        <SelectDropdown
          options={COUNTRIES}
          selected={config.country}
          onSelect={(v) => updateConfig({ country: v })}
          labelMap={Object.fromEntries(COUNTRIES.map((c) => [c, c]))}
          placeholder="Select country..."
        />
      </div>

      {/* Website Goal */}
      <div className="space-y-2">
        <FieldLabel required>Website Goal</FieldLabel>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {WEBSITE_GOALS.map((goal) => {
            const Icon = GOAL_ICONS[goal]
            const isSelected = config.websiteGoal === goal
            return (
              <button
                key={goal}
                type="button"
                onClick={() => updateConfig({ websiteGoal: goal })}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10'
                    : 'border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]'
                }`}
              >
                <Icon className={`size-4 shrink-0 ${isSelected ? 'text-primary' : ''}`} />
                <span className="truncate">{WEBSITE_GOAL_LABELS[goal]}</span>
              </button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Step 2: Target Audience
   ───────────────────────────────────────────── */

function Step2({
  config,
  updateConfig,
}: {
  config: GenerationConfig
  updateConfig: (patch: Partial<GenerationConfig>) => void
}) {
  return (
    <motion.div
      variants={stepVariants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="space-y-5"
    >
      {/* Primary Audience */}
      <div className="space-y-2">
        <FieldLabel required>Primary Audience</FieldLabel>
        <Input
          placeholder="e.g. Indie developers, small business owners"
          value={config.primaryAudience}
          onChange={(e) => updateConfig({ primaryAudience: e.target.value })}
          autoFocus
        />
      </div>

      {/* Customer Type */}
      <div className="space-y-2">
        <FieldLabel required>Customer Type</FieldLabel>
        <div className="grid grid-cols-3 gap-2">
          {CUSTOMER_TYPES.map((ct) => {
            const isSelected = config.customerType === ct
            const icons: Record<CustomerType, typeof Globe> = {
              b2b: BriefcaseBusiness,
              b2c: Users,
              both: Handshake,
            }
            const Icon = icons[ct]
            return (
              <button
                key={ct}
                type="button"
                onClick={() => updateConfig({ customerType: ct })}
                className={`flex flex-col items-center gap-2 px-3 py-4 rounded-lg border text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10'
                    : 'border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]'
                }`}
              >
                <Icon className={`size-5 shrink-0 ${isSelected ? 'text-primary' : ''}`} />
                {CUSTOMER_TYPE_LABELS[ct]}
              </button>
            )
          })}
        </div>
      </div>

      {/* Business Stage */}
      <div className="space-y-2">
        <FieldLabel>Business Stage</FieldLabel>
        <SelectDropdown
          options={BUSINESS_STAGES}
          selected={config.businessStage}
          onSelect={(v) => updateConfig({ businessStage: v as BusinessStage })}
          labelMap={BUSINESS_STAGE_LABELS}
          placeholder="Select stage..."
        />
      </div>

      {/* Target Age Group */}
      <div className="space-y-2">
        <FieldLabel>Target Age Group</FieldLabel>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {AGE_GROUPS.map((ag) => {
            const isSelected = config.targetAgeGroup === ag
            return (
              <button
                key={ag}
                type="button"
                onClick={() => updateConfig({ targetAgeGroup: ag })}
                className={`px-3 py-2.5 rounded-lg border text-xs font-medium transition-all duration-200 ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10'
                    : 'border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]'
                }`}
              >
                {AGE_GROUP_LABELS[ag]}
              </button>
            )
          })}
        </div>
      </div>

      {/* Target Countries */}
      <div className="space-y-2">
        <FieldLabel>Target Countries</FieldLabel>
        <Input
          placeholder="e.g. US, UK, Canada"
          value={config.targetCountries}
          onChange={(e) => updateConfig({ targetCountries: e.target.value })}
        />
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Step 3: Website Style
   ───────────────────────────────────────────── */

function Step3({
  config,
  updateConfig,
}: {
  config: GenerationConfig
  updateConfig: (patch: Partial<GenerationConfig>) => void
}) {
  return (
    <motion.div
      variants={stepVariants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="space-y-5"
    >
      {/* Design Style — visual cards */}
      <div className="space-y-2">
        <FieldLabel required>Choose a Style</FieldLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {DESIGN_STYLES.map((opt) => {
            const Icon = opt.icon
            const isSelected = config.designStyle === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateConfig({ designStyle: opt.value })}
                className={`relative flex flex-col items-center gap-2 px-3 py-4 rounded-xl border transition-all duration-200 overflow-hidden ${
                  isSelected
                    ? 'border-primary shadow-md shadow-primary/10'
                    : 'border-border hover:border-muted-foreground/30 hover:scale-[1.02]'
                }`}
              >
                <div className={`absolute inset-0 ${opt.preview}`} />
                <Icon className={`relative size-6 shrink-0 ${isSelected ? 'text-primary' : 'text-foreground'}`} />
                <span className={`relative text-xs font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                  {DESIGN_STYLE_LABELS[opt.value]}
                </span>
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5">
                    <Check className="size-3.5 text-primary" />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Colors */}
      <ColorPicker
        label="Primary Color"
        value={config.primaryColor}
        onChange={(v) => updateConfig({ primaryColor: v })}
        icon={Palette}
      />
      <ColorPicker
        label="Secondary Color"
        value={config.secondaryColor}
        onChange={(v) => updateConfig({ secondaryColor: v })}
        icon={Layers}
      />
      <ColorPicker
        label="Accent Color"
        value={config.accentColor}
        onChange={(v) => updateConfig({ accentColor: v })}
        icon={Sparkles}
      />
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Step 4: Website Structure
   ───────────────────────────────────────────── */

function Step4({
  config,
  updateConfig,
}: {
  config: GenerationConfig
  updateConfig: (patch: Partial<GenerationConfig>) => void
}) {
  const [customPageName, setCustomPageName] = useState('')

  const togglePage = (page: StandardPage) => {
    const next = config.pages.includes(page)
      ? config.pages.filter((p) => p !== page)
      : [...config.pages, page]
    updateConfig({ pages: next })
  }

  const addCustomPage = () => {
    const name = customPageName.trim()
    if (!name) return
    const newPage: CustomPage = {
      id: `custom-${Date.now()}`,
      name,
    }
    updateConfig({ customPages: [...config.customPages, newPage] })
    setCustomPageName('')
  }

  const removeCustomPage = (id: string) => {
    updateConfig({ customPages: config.customPages.filter((p) => p.id !== id) })
  }

  return (
    <motion.div
      variants={stepVariants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="space-y-5"
    >
      <p className="text-sm text-muted-foreground">
        Select pages to include <span className="text-destructive">*</span>
      </p>

      {/* Standard pages */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {STANDARD_PAGES.map((opt) => {
          const Icon = opt.icon
          const isSelected = config.pages.includes(opt.value)
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => togglePage(opt.value)}
              className={`flex items-center gap-2.5 px-3 py-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                isSelected
                  ? 'border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10'
                  : 'border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]'
              }`}
            >
              <Icon className={`size-4 shrink-0 ${isSelected ? 'text-primary' : ''}`} />
              <span className="truncate">{STANDARD_PAGE_LABELS[opt.value]}</span>
              {isSelected && <Check className="size-3.5 text-primary ml-auto" />}
            </button>
          )
        })}
      </div>

      {/* Custom pages */}
      <div className="space-y-3">
        <FieldLabel>Custom Pages</FieldLabel>
        <div className="flex gap-2">
          <Input
            placeholder="Page name (e.g. Careers)"
            value={customPageName}
            onChange={(e) => setCustomPageName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addCustomPage()
              }
            }}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={addCustomPage}
            disabled={!customPageName.trim()}
            className="gap-1.5 shrink-0"
          >
            <Plus className="size-4" />
            Add
          </Button>
        </div>
        {config.customPages.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {config.customPages.map((cp) => (
              <div
                key={cp.id}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
              >
                {cp.name}
                <button
                  type="button"
                  onClick={() => removeCustomPage(cp.id)}
                  className="text-primary/60 hover:text-primary transition-colors"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {config.pages.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {config.pages.length + config.customPages.length} page{(config.pages.length + config.customPages.length) !== 1 ? 's' : ''} selected
        </p>
      )}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Step 5: Features
   ───────────────────────────────────────────── */

function Step5({
  config,
  updateConfig,
}: {
  config: GenerationConfig
  updateConfig: (patch: Partial<GenerationConfig>) => void
}) {
  const toggleFeature = (feat: WebsiteFeature) => {
    const next = config.features.includes(feat)
      ? config.features.filter((f) => f !== feat)
      : [...config.features, feat]
    updateConfig({ features: next })
  }

  return (
    <motion.div
      variants={stepVariants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="space-y-4"
    >
      <p className="text-sm text-muted-foreground">
        Select features to include in your website
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {FEATURES.map((opt) => {
          const Icon = opt.icon
          const isSelected = config.features.includes(opt.value)
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleFeature(opt.value)}
              className={`flex items-start gap-3 px-4 py-3 rounded-lg border text-left transition-all duration-200 ${
                isSelected
                  ? 'border-primary bg-primary/10 shadow-sm shadow-primary/10'
                  : 'border-border bg-card hover:border-muted-foreground/30 hover:scale-[1.01]'
              }`}
            >
              <div className={`flex size-8 items-center justify-center rounded-lg shrink-0 ${isSelected ? 'bg-primary/20' : 'bg-muted'}`}>
                <Icon className={`size-4 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <span className={`text-sm font-medium block ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                  {FEATURE_LABELS[opt.value]}
                </span>
                <span className="text-xs text-muted-foreground">{opt.desc}</span>
              </div>
              {isSelected && <Check className="size-4 text-primary shrink-0 mt-0.5" />}
            </button>
          )
        })}
      </div>
      {config.features.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {config.features.length} feature{config.features.length !== 1 ? 's' : ''} selected
        </p>
      )}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Step 6: Review
   ───────────────────────────────────────────── */

function Step6({ config }: { config: GenerationConfig }) {
  const totalFields =
    (config.businessName ? 1 : 0) +
    (config.tagline ? 1 : 0) +
    (config.businessDescription ? 1 : 0) +
    (config.industry ? 1 : 0) +
    (config.country ? 1 : 0) +
    (config.websiteGoal ? 1 : 0) +
    (config.primaryAudience ? 1 : 0) +
    (config.customerType ? 1 : 0) +
    (config.businessStage ? 1 : 0) +
    (config.targetAgeGroup ? 1 : 0) +
    (config.targetCountries ? 1 : 0) +
    (config.designStyle ? 1 : 0) +
    config.pages.length +
    config.customPages.length +
    config.features.length

  const complexity =
    totalFields <= 5 ? 'Low' : totalFields <= 10 ? 'Medium' : totalFields <= 15 ? 'High' : 'Very High'

  const complexityColor: Record<string, string> = {
    Low: 'text-emerald-400',
    Medium: 'text-yellow-400',
    High: 'text-orange-400',
    'Very High': 'text-red-400',
  }

  return (
    <motion.div
      variants={stepVariants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="space-y-5"
    >
      <div className="rounded-xl border border-border bg-card/60 p-5 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-2 pb-2 border-b border-border">
          <Sparkles className="size-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Generation Summary</h3>
        </div>

        {/* Business */}
        <SectionBlock title="Business">
          <ReviewRow label="Name" value={config.businessName || '—'} />
          {config.tagline && <ReviewRow label="Tagline" value={config.tagline} />}
          {config.businessDescription && <ReviewRow label="Description" value={config.businessDescription} />}
          <ReviewRow label="Industry" value={config.industry ? INDUSTRY_LABELS[config.industry] : '—'} />
          <ReviewRow label="Country" value={config.country || '—'} />
          <ReviewRow label="Goal" value={config.websiteGoal ? WEBSITE_GOAL_LABELS[config.websiteGoal] : '—'} />
        </SectionBlock>

        {/* Audience */}
        <SectionBlock title="Audience">
          <ReviewRow label="Primary" value={config.primaryAudience || '—'} />
          <ReviewRow label="Customer Type" value={config.customerType ? CUSTOMER_TYPE_LABELS[config.customerType] : '—'} />
          <ReviewRow label="Stage" value={config.businessStage ? BUSINESS_STAGE_LABELS[config.businessStage] : '—'} />
          <ReviewRow label="Age Group" value={config.targetAgeGroup ? AGE_GROUP_LABELS[config.targetAgeGroup] : '—'} />
          <ReviewRow label="Countries" value={config.targetCountries || '—'} />
        </SectionBlock>

        {/* Theme */}
        <SectionBlock title="Theme">
          <ReviewRow label="Style" value={config.designStyle ? DESIGN_STYLE_LABELS[config.designStyle] : '—'} />
          <ReviewRow
            label="Primary"
            value={
              <span className="inline-flex items-center gap-1.5">
                <span className="size-3.5 rounded-full border border-border inline-block" style={{ backgroundColor: config.primaryColor }} />
                {config.primaryColor}
              </span>
            }
          />
          <ReviewRow
            label="Secondary"
            value={
              <span className="inline-flex items-center gap-1.5">
                <span className="size-3.5 rounded-full border border-border inline-block" style={{ backgroundColor: config.secondaryColor }} />
                {config.secondaryColor}
              </span>
            }
          />
          <ReviewRow
            label="Accent"
            value={
              <span className="inline-flex items-center gap-1.5">
                <span className="size-3.5 rounded-full border border-border inline-block" style={{ backgroundColor: config.accentColor }} />
                {config.accentColor}
              </span>
            }
          />
        </SectionBlock>

        {/* Pages */}
        <SectionBlock title="Pages">
          <ReviewRow
            label="Standard"
            value={
              config.pages.length > 0
                ? config.pages.map((p) => STANDARD_PAGE_LABELS[p]).join(', ')
                : '—'
            }
          />
          {config.customPages.length > 0 && (
            <ReviewRow
              label="Custom"
              value={config.customPages.map((p) => p.name).join(', ')}
            />
          )}
        </SectionBlock>

        {/* Features */}
        <SectionBlock title="Features">
          <ReviewRow
            label="Selected"
            value={
              config.features.length > 0
                ? config.features.map((f) => FEATURE_LABELS[f]).join(', ')
                : 'None'
            }
          />
        </SectionBlock>

        {/* AI Complexity */}
        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Estimated AI Complexity
            </span>
            <span className={`text-sm font-bold ${complexityColor[complexity]}`}>
              {complexity}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Review helpers
   ───────────────────────────────────────────── */

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        {title}
      </p>
      <div className="space-y-1.5">{children}</div>
    </div>
  )
}

function ReviewRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs text-muted-foreground shrink-0">{label}</span>
      <span className="text-sm font-medium text-foreground text-right">{value}</span>
    </div>
  )
}

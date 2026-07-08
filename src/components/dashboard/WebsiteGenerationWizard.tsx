import { useCallback, useRef, type Dispatch, type SetStateAction } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Button,
  Input,
  Dialog,
  DialogContent,
  toast,
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
  Building2,
  Ellipsis,
  ShoppingCart,
  TrendingUp,
  FileText,
  Layout,
  Monitor,
  Cloud,
  Moon,
  Sun,
  SunMoon,
  PaintBucket,
  Palette,
  Layers,
  Star,
  Zap,
  Eye,
  Minus,
  MousePointerClick,
  BookOpen,
  HelpCircle,
  MessageCircle,
  Pen,
  Mail,
  Footprints,
  Users,
  Code,
  Lightbulb,
  Rocket,
  UserCheck,
  Smile,
  Gem,
  Gamepad2,
  BriefcaseBusiness,
  Search,
  ShieldCheck,
  Smartphone,
  Film,
  Gauge,
  Lock,
  Database,
} from 'lucide-react'
import type {
  GenerationConfig,
  WizardStep,
  BusinessCategory,
  WebsiteGoal,
  ThemeMode,
  PreferredStyle,
  WebsiteSection,
  TargetAudience,
  Tone,
  AdvancedOption,
} from '@/lib/generation-types'
import {
  BUSINESS_CATEGORY_LABELS,
  WEBSITE_GOAL_LABELS,
  PREFERRED_STYLE_LABELS,
  WEBSITE_SECTION_LABELS,
  TARGET_AUDIENCE_LABELS,
  TONE_LABELS,
  ADVANCED_OPTION_LABELS,
  STEP_LABELS,
  TOTAL_STEPS,
} from '@/lib/generation-types'

/* ─────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────── */

const BUSINESS_CATEGORIES: BusinessCategory[] = [
  'technology', 'ecommerce', 'healthcare', 'education',
  'finance', 'portfolio', 'restaurant', 'agency', 'other',
]

const CATEGORY_ICONS: Record<BusinessCategory, typeof Globe> = {
  technology: Code,
  ecommerce: Store,
  healthcare: HeartPulse,
  education: GraduationCap,
  finance: Banknote,
  portfolio: Briefcase,
  restaurant: UtensilsCrossed,
  agency: Building2,
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

const THEME_OPTIONS: { value: ThemeMode; label: string; icon: typeof Moon }[] = [
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'auto', label: 'Auto', icon: SunMoon },
]

const STYLE_OPTIONS: { value: PreferredStyle; icon: typeof Star }[] = [
  { value: 'apple', icon: Star },
  { value: 'stripe', icon: Layers },
  { value: 'notion', icon: FileText },
  { value: 'linear', icon: Zap },
  { value: 'modern-startup', icon: Rocket },
  { value: 'minimal', icon: Minus },
  { value: 'bold', icon: Eye },
  { value: 'elegant', icon: Gem },
]

const SECTION_OPTIONS: { value: WebsiteSection; icon: typeof Globe }[] = [
  { value: 'hero', icon: Monitor },
  { value: 'features', icon: Star },
  { value: 'pricing', icon: Banknote },
  { value: 'testimonials', icon: Smile },
  { value: 'about', icon: BookOpen },
  { value: 'faq', icon: HelpCircle },
  { value: 'contact', icon: MessageCircle },
  { value: 'blog', icon: Pen },
  { value: 'newsletter', icon: Mail },
  { value: 'footer', icon: Footprints },
]

const AUDIENCE_OPTIONS: { value: TargetAudience; icon: typeof Globe }[] = [
  { value: 'students', icon: GraduationCap },
  { value: 'businesses', icon: BriefcaseBusiness },
  { value: 'developers', icon: Code },
  { value: 'creators', icon: Lightbulb },
  { value: 'startups', icon: Rocket },
  { value: 'enterprise', icon: Building2 },
  { value: 'other', icon: Ellipsis },
]

const TONE_OPTIONS: { value: Tone; icon: typeof Globe }[] = [
  { value: 'professional', icon: BriefcaseBusiness },
  { value: 'friendly', icon: Smile },
  { value: 'luxury', icon: Gem },
  { value: 'minimal', icon: Minus },
  { value: 'playful', icon: Gamepad2 },
  { value: 'corporate', icon: Building2 },
]

const ADVANCED_OPTIONS_LIST: { value: AdvancedOption; icon: typeof Globe }[] = [
  { value: 'seo', icon: Search },
  { value: 'accessibility', icon: ShieldCheck },
  { value: 'responsive-design', icon: Smartphone },
  { value: 'dark-mode', icon: Moon },
  { value: 'animations', icon: Film },
  { value: 'performance', icon: Gauge },
  { value: 'auth-ready', icon: Lock },
  { value: 'database-ready', icon: Database },
]

const PRESET_COLORS = [
  '#3B82F6', '#8B5CF6', '#EC4899', '#EF4444',
  '#F97316', '#EAB308', '#22C55E', '#14B8A6',
  '#06B6D4', '#6366F1', '#A855F7', '#78716C',
]

const stepVariants = {
  enter: { x: 60, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -60, opacity: 0 },
}

/* ─────────────────────────────────────────────
   Dropdown helper
   ───────────────────────────────────────────── */

function SelectDropdown({
  open,
  setOpen,
  options,
  selected,
  onSelect,
  labelMap,
}: {
  open: boolean
  setOpen: (v: boolean) => void
  options: string[]
  selected: string
  onSelect: (v: string) => void
  labelMap: Record<string, string>
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2.5 text-sm shadow-sm transition-colors hover:border-muted-foreground/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <span className={selected ? 'text-foreground' : 'text-muted-foreground'}>
          {selected ? labelMap[selected] ?? selected : 'Select...'}
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
}

/* ─────────────────────────────────────────────
   Component
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
}: WebsiteGenerationWizardProps) {
  const updateConfig = useCallback(
    (patch: Partial<GenerationConfig>) =>
      setConfig((prev) => ({ ...prev, ...patch })),
    [setConfig],
  )

  // ── Dropdown open states ──
  const catRef = useRef(false)
  const goalRef = useRef(false)

  function closeAll() {
    catRef.current = false
    goalRef.current = false
  }

  // ── Step validators ──
  const canProceedStep1 = config.businessName.trim().length > 0 && config.businessCategory !== '' && config.websiteGoal !== ''
  const canProceedStep2 = config.preferredStyle !== ''
  const canProceedStep3 = config.sections.length > 0
  const canProceedStep4 = config.targetAudiences.length > 0 && config.tone !== ''
  // Step 5 always proceeds (advanced options optional)

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
    if (!next) closeAll()
    onOpenChange(next)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl lg:max-w-2xl">
        {/* ── Header ── */}
        <div className="text-center space-y-1.5">
          <h2 className="text-lg font-bold text-foreground">Generate Website</h2>
          <p className="text-sm text-muted-foreground">
            Step {step} of {TOTAL_STEPS} — {STEP_LABELS[step]}
          </p>
        </div>

        {/* ── Progress dots ── */}
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

        {/* ── Step content ── */}
        <div className="relative overflow-hidden" style={{ minHeight: 340 }}>
          <AnimatePresence mode="wait" initial={false}>
            {step === 1 && (
              <Step1
                key="s1"
                config={config}
                updateConfig={updateConfig}
                catOpen={catRef}
                goalOpen={goalRef}
              />
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
            disabled={step === 1 && false}
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
      </DialogContent>
    </Dialog>
  )
}

/* ─────────────────────────────────────────────
   Step 1: Business Information
   ───────────────────────────────────────────── */

function Step1({
  config,
  updateConfig,
  catOpen,
  goalOpen,
}: {
  config: GenerationConfig
  updateConfig: (patch: Partial<GenerationConfig>) => void
  catOpen: React.MutableRefObject<boolean>
  goalOpen: React.MutableRefObject<boolean>
}) {
  return (
    <motion.div
      variants={stepVariants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="space-y-5"
    >
      {/* Business Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Business Name <span className="text-destructive">*</span>
        </label>
        <Input
          placeholder="e.g. Acme Corp"
          value={config.businessName}
          onChange={(e) => updateConfig({ businessName: e.target.value })}
          autoFocus
        />
      </div>

      {/* Business Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Business Description
        </label>
        <textarea
          className="flex w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
          placeholder="What does your business do?"
          value={config.businessDescription}
          onChange={(e) => updateConfig({ businessDescription: e.target.value })}
          rows={3}
        />
      </div>

      {/* Business Category */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Business Category <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {BUSINESS_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat]
            const isSelected = config.businessCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => updateConfig({ businessCategory: cat })}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10'
                    : 'border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]'
                }`}
              >
                <Icon className={`size-4 shrink-0 ${isSelected ? 'text-primary' : ''}`} />
                <span className="truncate">{BUSINESS_CATEGORY_LABELS[cat]}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Website Goal */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Website Goal <span className="text-destructive">*</span>
        </label>
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
   Step 2: Brand Identity
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
      {/* Theme */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Theme</label>
        <div className="grid grid-cols-3 gap-2">
          {THEME_OPTIONS.map((opt) => {
            const Icon = opt.icon
            const isSelected = config.theme === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateConfig({ theme: opt.value })}
                className={`flex flex-col items-center gap-2 px-4 py-4 rounded-lg border text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10'
                    : 'border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]'
                }`}
              >
                <Icon className={`size-5 shrink-0 ${isSelected ? 'text-primary' : ''}`} />
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Primary Color */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
          <PaintBucket className="size-3.5" />
          Primary Color
        </label>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="color"
              value={config.primaryColor}
              onChange={(e) => updateConfig({ primaryColor: e.target.value })}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div
              className="size-9 rounded-lg border-2 border-border shadow-sm cursor-pointer"
              style={{ backgroundColor: config.primaryColor }}
            />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => updateConfig({ primaryColor: color })}
                className={`size-6 rounded-full border-2 transition-transform hover:scale-110 ${
                  config.primaryColor === color
                    ? 'border-foreground scale-110'
                    : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Accent Color */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
          <Palette className="size-3.5" />
          Accent Color
        </label>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="color"
              value={config.accentColor}
              onChange={(e) => updateConfig({ accentColor: e.target.value })}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div
              className="size-9 rounded-lg border-2 border-border shadow-sm cursor-pointer"
              style={{ backgroundColor: config.accentColor }}
            />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => updateConfig({ accentColor: color })}
                className={`size-6 rounded-full border-2 transition-transform hover:scale-110 ${
                  config.accentColor === color
                    ? 'border-foreground scale-110'
                    : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Preferred Style */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Preferred Style <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-4 gap-2">
          {STYLE_OPTIONS.map((opt) => {
            const Icon = opt.icon
            const isSelected = config.preferredStyle === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateConfig({ preferredStyle: opt.value })}
                className={`flex flex-col items-center gap-2 px-3 py-3 rounded-lg border text-xs font-medium transition-all duration-200 ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10'
                    : 'border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]'
                }`}
              >
                <Icon className={`size-5 shrink-0 ${isSelected ? 'text-primary' : ''}`} />
                {PREFERRED_STYLE_LABELS[opt.value]}
              </button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Step 3: Website Structure
   ───────────────────────────────────────────── */

function Step3({
  config,
  updateConfig,
}: {
  config: GenerationConfig
  updateConfig: (patch: Partial<GenerationConfig>) => void
}) {
  const toggleSection = (section: WebsiteSection) => {
    const next = config.sections.includes(section)
      ? config.sections.filter((s) => s !== section)
      : [...config.sections, section]
    updateConfig({ sections: next })
  }

  return (
    <motion.div
      variants={stepVariants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="space-y-4"
    >
      <p className="text-sm text-muted-foreground">
        Select sections to include in your website
        <span className="text-destructive">*</span>
      </p>
      <div className="grid grid-cols-2 gap-2">
        {SECTION_OPTIONS.map((opt) => {
          const Icon = opt.icon
          const isSelected = config.sections.includes(opt.value)
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleSection(opt.value)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                isSelected
                  ? 'border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10'
                  : 'border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]'
              }`}
            >
              <Icon className={`size-4 shrink-0 ${isSelected ? 'text-primary' : ''}`} />
              <span>{WEBSITE_SECTION_LABELS[opt.value]}</span>
              {isSelected && <Check className="size-3.5 text-primary ml-auto" />}
            </button>
          )
        })}
      </div>
      {config.sections.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {config.sections.length} section{config.sections.length !== 1 ? 's' : ''} selected
        </p>
      )}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Step 4: Target Audience
   ───────────────────────────────────────────── */

function Step4({
  config,
  updateConfig,
}: {
  config: GenerationConfig
  updateConfig: (patch: Partial<GenerationConfig>) => void
}) {
  const toggleAudience = (audience: TargetAudience) => {
    const next = config.targetAudiences.includes(audience)
      ? config.targetAudiences.filter((a) => a !== audience)
      : [...config.targetAudiences, audience]
    updateConfig({ targetAudiences: next })
  }

  return (
    <motion.div
      variants={stepVariants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="space-y-5"
    >
      {/* Target Audience */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Target Audience <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {AUDIENCE_OPTIONS.map((opt) => {
            const Icon = opt.icon
            const isSelected = config.targetAudiences.includes(opt.value)
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggleAudience(opt.value)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10'
                    : 'border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]'
                }`}
              >
                <Icon className={`size-4 shrink-0 ${isSelected ? 'text-primary' : ''}`} />
                <span>{TARGET_AUDIENCE_LABELS[opt.value]}</span>
                {isSelected && <Check className="size-3.5 text-primary ml-auto" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tone */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Tone <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {TONE_OPTIONS.map((opt) => {
            const Icon = opt.icon
            const isSelected = config.tone === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateConfig({ tone: opt.value })}
                className={`flex flex-col items-center gap-2 px-3 py-3 rounded-lg border text-xs font-medium transition-all duration-200 ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10'
                    : 'border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]'
                }`}
              >
                <Icon className={`size-5 shrink-0 ${isSelected ? 'text-primary' : ''}`} />
                {TONE_LABELS[opt.value]}
              </button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Step 5: Advanced Options
   ───────────────────────────────────────────── */

function Step5({
  config,
  updateConfig,
}: {
  config: GenerationConfig
  updateConfig: (patch: Partial<GenerationConfig>) => void
}) {
  const toggleOption = (opt: AdvancedOption) => {
    const next = config.advancedOptions.includes(opt)
      ? config.advancedOptions.filter((o) => o !== opt)
      : [...config.advancedOptions, opt]
    updateConfig({ advancedOptions: next })
  }

  return (
    <motion.div
      variants={stepVariants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="space-y-4"
    >
      <p className="text-sm text-muted-foreground">
        Enable advanced features for your website
      </p>
      <div className="grid grid-cols-2 gap-2">
        {ADVANCED_OPTIONS_LIST.map((opt) => {
          const Icon = opt.icon
          const isSelected = config.advancedOptions.includes(opt.value)
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleOption(opt.value)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                isSelected
                  ? 'border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10'
                  : 'border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]'
              }`}
            >
              <Icon className={`size-4 shrink-0 ${isSelected ? 'text-primary' : ''}`} />
              <span>{ADVANCED_OPTION_LABELS[opt.value]}</span>
              {isSelected && <Check className="size-3.5 text-primary ml-auto" />}
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Step 6: Review
   ───────────────────────────────────────────── */

function Step6({ config }: { config: GenerationConfig }) {
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
          <ReviewRow label="Name" value={config.businessName} />
          {config.businessDescription && (
            <ReviewRow label="Description" value={config.businessDescription} />
          )}
          <ReviewRow
            label="Category"
            value={BUSINESS_CATEGORY_LABELS[config.businessCategory as BusinessCategory] ?? '—'}
          />
          <ReviewRow
            label="Goal"
            value={WEBSITE_GOAL_LABELS[config.websiteGoal as WebsiteGoal] ?? '—'}
          />
        </SectionBlock>

        {/* Design */}
        <SectionBlock title="Design">
          <ReviewRow label="Theme" value={config.theme.charAt(0).toUpperCase() + config.theme.slice(1)} />
          <ReviewRow
            label="Primary Color"
            value={
              <span className="inline-flex items-center gap-1.5">
                <span className="size-3.5 rounded-full border border-border inline-block" style={{ backgroundColor: config.primaryColor }} />
                {config.primaryColor}
              </span>
            }
          />
          <ReviewRow
            label="Accent Color"
            value={
              <span className="inline-flex items-center gap-1.5">
                <span className="size-3.5 rounded-full border border-border inline-block" style={{ backgroundColor: config.accentColor }} />
                {config.accentColor}
              </span>
            }
          />
          <ReviewRow
            label="Style"
            value={PREFERRED_STYLE_LABELS[config.preferredStyle as PreferredStyle] ?? '—'}
          />
        </SectionBlock>

        {/* Audience */}
        <SectionBlock title="Audience">
          <ReviewRow
            label="Target"
            value={config.targetAudiences.map((a) => TARGET_AUDIENCE_LABELS[a]).join(', ') || '—'}
          />
          <ReviewRow
            label="Tone"
            value={TONE_LABELS[config.tone as Tone] ?? '—'}
          />
        </SectionBlock>

        {/* Sections */}
        <SectionBlock title="Website Sections">
          <ReviewRow
            label="Sections"
            value={
              config.sections.length > 0
                ? config.sections.map((s) => WEBSITE_SECTION_LABELS[s]).join(', ')
                : '—'
            }
          />
        </SectionBlock>

        {/* Advanced */}
        <SectionBlock title="Advanced Options">
          <ReviewRow
            label="Features"
            value={
              config.advancedOptions.length > 0
                ? config.advancedOptions.map((o) => ADVANCED_OPTION_LABELS[o]).join(', ')
                : 'None'
            }
          />
        </SectionBlock>
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

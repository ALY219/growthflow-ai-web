import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, X, Plus, Building2, Users, Palette, LayoutGrid as Layout, Zap, CircleCheck as CheckCircle2, Save, Sparkles } from 'lucide-react'
import { Button, Input, Textarea } from '@blinkdotnew/ui'
import {
  type GenerationConfig, type Industry, type WebsiteGoal, type CustomerType,
  type DesignStyle, type StandardPage, type Feature, type CustomPage,
  INDUSTRY_LABELS, WEBSITE_GOAL_LABELS, CUSTOMER_TYPE_LABELS,
  DESIGN_STYLE_LABELS, STANDARD_PAGE_LABELS, FEATURE_LABELS,
  createDefaultConfig,
} from '@/lib/generation-types'
import { cn } from '@/lib/utils'

interface WebsiteGenerationWizardProps {
  open: boolean
  config: GenerationConfig
  onConfigChange: (config: GenerationConfig) => void
  onSubmit: () => void
  onCancel: () => void
  pending?: boolean
}

const STEPS = [
  { id: 0, label: 'Business', icon: Building2 },
  { id: 1, label: 'Audience', icon: Users },
  { id: 2, label: 'Style', icon: Palette },
  { id: 3, label: 'Pages', icon: Layout },
  { id: 4, label: 'Features', icon: Zap },
  { id: 5, label: 'Review', icon: CheckCircle2 },
] as const

const INDUSTRIES = Object.keys(INDUSTRY_LABELS) as Industry[]
const WEBSITE_GOALS = Object.keys(WEBSITE_GOAL_LABELS) as WebsiteGoal[]
const CUSTOMER_TYPES = Object.keys(CUSTOMER_TYPE_LABELS) as CustomerType[]
const DESIGN_STYLES = Object.keys(DESIGN_STYLE_LABELS) as DesignStyle[]
const STANDARD_PAGES = Object.keys(STANDARD_PAGE_LABELS) as StandardPage[]
const FEATURES = Object.keys(FEATURE_LABELS) as Feature[]

const COUNTRIES = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan', 'India', 'Brazil', 'Other']
const BUSINESS_STAGES = ['Idea', 'Startup', 'Growing', 'Established', 'Enterprise']
const AGE_GROUPS = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+']

const STYLE_GRADIENTS: Record<DesignStyle, string> = {
  modern: 'from-blue-500 to-cyan-400', minimal: 'from-gray-500 to-gray-300',
  luxury: 'from-amber-600 to-yellow-400', corporate: 'from-slate-600 to-slate-400',
  startup: 'from-emerald-500 to-teal-400', creative: 'from-pink-500 to-rose-400',
  dark: 'from-gray-800 to-gray-600', light: 'from-sky-200 to-blue-100',
}

export function WebsiteGenerationWizard({
  open, config, onConfigChange, onSubmit, onCancel, pending = false,
}: WebsiteGenerationWizardProps) {
  const [step, setStep] = useState(0)
  const [saved, setSaved] = useState(false)

  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const update = useCallback((patch: Partial<GenerationConfig>) => {
    onConfigChange({ ...config, ...patch })
    setSaved(true)
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current)
    savedTimerRef.current = setTimeout(() => setSaved(false), 1500)
  }, [config, onConfigChange])

  useEffect(() => {
    return () => {
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current)
    }
  }, [])

  const togglePage = (page: StandardPage) => {
    const has = config.selectedPages.includes(page)
    update({ selectedPages: has ? config.selectedPages.filter((p) => p !== page) : [...config.selectedPages, page] })
  }

  const toggleFeature = (feature: Feature) => {
    const has = config.selectedFeatures.includes(feature)
    update({ selectedFeatures: has ? config.selectedFeatures.filter((f) => f !== feature) : [...config.selectedFeatures, feature] })
  }

  const addCustomPage = () => {
    const newPage: CustomPage = { id: crypto.randomUUID(), name: 'New Page' }
    update({ customPages: [...config.customPages, newPage] })
  }

  const removeCustomPage = (id: string) => {
    update({ customPages: config.customPages.filter((p) => p.id !== id) })
  }

  const renameCustomPage = (id: string, name: string) => {
    update({ customPages: config.customPages.map((p) => (p.id === id ? { ...p, name } : p)) })
  }

  const canProceed = () => {
    if (step === 0) return config.businessName.trim().length > 0
    if (step === 1) return config.primaryAudience.trim().length > 0
    return true
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl border border-border bg-card shadow-xl flex flex-col">
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold">Website Generation Wizard</h2>
            {saved && (<span className="inline-flex items-center gap-1 text-xs text-emerald-500 animate-fade-in"><Save className="size-3" />Saved</span>)}
          </div>
          <button onClick={onCancel} className="text-muted-foreground hover:text-foreground transition-colors"><X className="size-5" /></button>
        </div>
        <div className="px-6 py-3 border-b border-border">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2 flex-1 last:flex-none">
                <button onClick={() => i < step && setStep(i)} className={cn('flex items-center gap-2 text-xs font-medium transition-colors', i === step ? 'text-primary' : i < step ? 'text-emerald-500 cursor-pointer' : 'text-muted-foreground')}>
                  <div className={cn('flex size-7 items-center justify-center rounded-full text-xs font-bold transition-colors', i === step ? 'bg-primary text-primary-foreground' : i < step ? 'bg-emerald-500/20 text-emerald-500' : 'bg-muted text-muted-foreground')}>
                    {i < step ? <Check className="size-3.5" /> : i + 1}
                  </div>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < STEPS.length - 1 && (<div className={cn('h-px flex-1 mx-1 transition-colors', i < step ? 'bg-emerald-500/40' : 'bg-border')} />)}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
              {step === 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Business Information</h3>
                  <div className="space-y-2"><label className="text-sm font-medium">Business Name *</label><Input value={config.businessName} onChange={(e) => update({ businessName: e.target.value })} placeholder="Acme Inc." /></div>
                  <div className="space-y-2"><label className="text-sm font-medium">Tagline</label><Input value={config.tagline} onChange={(e) => update({ tagline: e.target.value })} placeholder="Building the future, today" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium">Description</label><Textarea value={config.description} onChange={(e) => update({ description: e.target.value })} placeholder="Tell us about your business..." rows={3} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><label className="text-sm font-medium">Industry</label><div className="grid grid-cols-3 gap-2">{INDUSTRIES.map((ind) => (<button key={ind} onClick={() => update({ industry: ind })} className={cn('rounded-lg border px-2 py-2 text-xs font-medium transition-colors text-center', config.industry === ind ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:bg-accent')}>{INDUSTRY_LABELS[ind]}</button>))}</div></div>
                    <div className="space-y-2"><label className="text-sm font-medium">Country</label><select value={config.country} onChange={(e) => update({ country: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">{COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}</select><label className="text-sm font-medium mt-3 block">Website Goal</label><div className="grid grid-cols-2 gap-2">{WEBSITE_GOALS.map((g) => (<button key={g} onClick={() => update({ websiteGoal: g })} className={cn('rounded-lg border px-2 py-2 text-xs font-medium transition-colors text-center', config.websiteGoal === g ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:bg-accent')}>{WEBSITE_GOAL_LABELS[g]}</button>))}</div></div>
                  </div>
                </div>
              )}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Target Audience</h3>
                  <div className="space-y-2"><label className="text-sm font-medium">Primary Audience *</label><Input value={config.primaryAudience} onChange={(e) => update({ primaryAudience: e.target.value })} placeholder="Small business owners looking for..." /></div>
                  <div className="space-y-2"><label className="text-sm font-medium">Customer Type</label><div className="grid grid-cols-3 gap-2">{CUSTOMER_TYPES.map((c) => (<button key={c} onClick={() => update({ customerType: c })} className={cn('rounded-lg border px-2 py-2 text-xs font-medium transition-colors text-center', config.customerType === c ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:bg-accent')}>{CUSTOMER_TYPE_LABELS[c]}</button>))}</div></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><label className="text-sm font-medium">Business Stage</label><select value={config.businessStage} onChange={(e) => update({ businessStage: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">{BUSINESS_STAGES.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
                    <div className="space-y-2"><label className="text-sm font-medium">Age Group</label><div className="grid grid-cols-3 gap-2">{AGE_GROUPS.map((a) => (<button key={a} onClick={() => update({ ageGroup: a })} className={cn('rounded-lg border px-2 py-2 text-xs font-medium transition-colors text-center', config.ageGroup === a ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:bg-accent')}>{a}</button>))}</div></div>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Website Style</h3>
                  <div className="space-y-2"><label className="text-sm font-medium">Design Style</label><div className="grid grid-cols-4 gap-2">{DESIGN_STYLES.map((style) => (<button key={style} onClick={() => update({ designStyle: style })} className={cn('rounded-lg border overflow-hidden transition-all', config.designStyle === style ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50')}><div className={cn('h-12 bg-gradient-to-br', STYLE_GRADIENTS[style])} /><p className="text-xs font-medium py-1.5 text-center">{DESIGN_STYLE_LABELS[style]}</p></button>))}</div></div>
                  <div className="space-y-2"><label className="text-sm font-medium">Brand Colors</label><div className="grid grid-cols-3 gap-4">{(['primary', 'secondary', 'accent'] as const).map((key) => (<div key={key} className="space-y-1.5"><span className="text-xs text-muted-foreground capitalize">{key}</span><div className="flex items-center gap-2"><input type="color" value={config.brandColors[key]} onChange={(e) => update({ brandColors: { ...config.brandColors, [key]: e.target.value } })} className="size-9 rounded-lg border border-border cursor-pointer" /><Input value={config.brandColors[key]} onChange={(e) => update({ brandColors: { ...config.brandColors, [key]: e.target.value } })} className="flex-1 text-xs font-mono" /></div></div>))}</div></div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Website Structure</h3>
                  <div className="space-y-2"><label className="text-sm font-medium">Pages</label><div className="grid grid-cols-2 sm:grid-cols-3 gap-2">{STANDARD_PAGES.map((page) => (<button key={page} onClick={() => togglePage(page)} className={cn('flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors', config.selectedPages.includes(page) ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:bg-accent')}><div className={cn('flex size-4 items-center justify-center rounded border', config.selectedPages.includes(page) ? 'bg-primary border-primary' : 'border-border')}>{config.selectedPages.includes(page) && <Check className="size-3 text-primary-foreground" />}</div>{STANDARD_PAGE_LABELS[page]}</button>))}</div></div>
                  <div className="space-y-2"><div className="flex items-center justify-between"><label className="text-sm font-medium">Custom Pages</label><Button variant="ghost" size="sm" onClick={addCustomPage} className="gap-1.5"><Plus className="size-3.5" />Add</Button></div>{config.customPages.length === 0 ? (<p className="text-xs text-muted-foreground py-2">No custom pages added.</p>) : (<div className="space-y-2">{config.customPages.map((p) => (<div key={p.id} className="flex items-center gap-2"><Input value={p.name} onChange={(e) => renameCustomPage(p.id, e.target.value)} className="flex-1" /><Button variant="ghost" size="sm" onClick={() => removeCustomPage(p.id)}><X className="size-4" /></Button></div>))}</div>)}</div>
                </div>
              )}
              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Features</h3>
                  <p className="text-sm text-muted-foreground">Select the features you want on your website.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{FEATURES.map((feature) => (<button key={feature} onClick={() => toggleFeature(feature)} className={cn('flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors text-left', config.selectedFeatures.includes(feature) ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:bg-accent')}><div className={cn('flex size-4 items-center justify-center rounded border shrink-0', config.selectedFeatures.includes(feature) ? 'bg-primary border-primary' : 'border-border')}>{config.selectedFeatures.includes(feature) && <Check className="size-3 text-primary-foreground" />}</div>{FEATURE_LABELS[feature]}</button>))}</div>
                </div>
              )}
              {step === 5 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Review & Generate</h3>
                  <div className="space-y-3">
                    <ReviewGroup title="Business"><ReviewItem label="Name" value={config.businessName} /><ReviewItem label="Tagline" value={config.tagline} /><ReviewItem label="Industry" value={INDUSTRY_LABELS[config.industry]} /><ReviewItem label="Goal" value={WEBSITE_GOAL_LABELS[config.websiteGoal]} /></ReviewGroup>
                    <ReviewGroup title="Audience"><ReviewItem label="Primary" value={config.primaryAudience} /><ReviewItem label="Type" value={CUSTOMER_TYPE_LABELS[config.customerType]} /><ReviewItem label="Stage" value={config.businessStage} /></ReviewGroup>
                    <ReviewGroup title="Design"><ReviewItem label="Style" value={DESIGN_STYLE_LABELS[config.designStyle]} /><div className="flex items-center gap-2"><span className="text-xs text-muted-foreground w-20">Colors</span><div className="flex gap-1.5"><div className="size-5 rounded border border-border" style={{ backgroundColor: config.brandColors.primary }} /><div className="size-5 rounded border border-border" style={{ backgroundColor: config.brandColors.secondary }} /><div className="size-5 rounded border border-border" style={{ backgroundColor: config.brandColors.accent }} /></div></div></ReviewGroup>
                    <ReviewGroup title="Pages"><div className="flex flex-wrap gap-1.5">{config.selectedPages.map((p) => (<span key={p} className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium">{STANDARD_PAGE_LABELS[p]}</span>))}{config.customPages.map((p) => (<span key={p.id} className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium">{p.name}</span>))}</div></ReviewGroup>
                    <ReviewGroup title="Features"><div className="flex flex-wrap gap-1.5">{config.selectedFeatures.length === 0 ? (<span className="text-xs text-muted-foreground">None selected</span>) : (config.selectedFeatures.map((f) => (<span key={f} className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium">{FEATURE_LABELS[f]}</span>)))}</div></ReviewGroup>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="border-t border-border px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={onCancel} disabled={pending}>Cancel</Button>
          <div className="flex gap-2">
            {step > 0 && (<Button variant="outline" onClick={() => setStep(step - 1)} disabled={pending} className="gap-1.5"><ArrowLeft className="size-4" />Back</Button>)}
            {step < STEPS.length - 1 ? (<Button onClick={() => setStep(step + 1)} disabled={!canProceed()} className="gap-1.5">Continue<ArrowRight className="size-4" /></Button>) : (<Button onClick={onSubmit} disabled={pending} className="gap-1.5">{pending ? 'Generating...' : 'Generate Website'}<Sparkles className="size-4" /></Button>)}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function ReviewGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="rounded-lg border border-border p-3"><p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">{title}</p><div className="space-y-1.5">{children}</div></div>)
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (<div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">{label}</span><span className="font-medium text-right max-w-[60%] truncate">{value || '—'}</span></div>)
}

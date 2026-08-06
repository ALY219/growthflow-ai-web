import { createFileRoute, useParams, Link } from '@tanstack/react-router'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Sparkles, CircleAlert as AlertCircle, RotateCcw, CircleCheck as CheckCircle2, Clock, Palette, Type, FileText, LayoutGrid as Layout, Lightbulb } from 'lucide-react'
import { Button, Card, CardContent, Badge } from '@blinkdotnew/ui'
import { useAuth } from '@/hooks/useAuth'
import { useProjects, useGenerationJobs, useUpdateGenerationJob } from '@/hooks/useProjects'
import { generateBlueprint } from '@/ai-engine/ai-service'
import type { WebsiteBlueprint, GenerationError, GenerationConfig } from '@/lib/generation-types'

export const Route = createFileRoute('/app/projects/$id/generation')({
  head: () => ({ meta: [{ title: 'Generation · GrowthFlow AI' }] }),
  component: GenerationPage,
  validateSearch: (search: Record<string, unknown>) => ({
    wizard: Boolean(search.wizard),
  }),
})

type ViewState = 'loading' | 'success' | 'error'

function GenerationPage() {
  const { user } = useAuth()
  const { id } = useParams({ from: '/app/projects/$id/generation' })
  const { data: projects = [], isLoading: projectsLoading } = useProjects(user?.id)
  const { data: jobs = [] } = useGenerationJobs(id)
  const updateJob = useUpdateGenerationJob()

  const project = useMemo(() => projects.find((p) => p.id === id), [projects, id])
  const latestJob = useMemo(() => jobs[0], [jobs])

  const [viewState, setViewState] = useState<ViewState>('loading')
  const [blueprint, setBlueprint] = useState<WebsiteBlueprint | null>(null)
  const [error, setError] = useState<GenerationError | null>(null)
  const runningRef = useRef(false)

  const runGeneration = useCallback(async () => {
    if (!latestJob || runningRef.current) return
    runningRef.current = true
    setViewState('loading')
    setError(null)

    try {
      await updateJob.mutateAsync({ id: latestJob.id, status: 'generating' })
      const config = latestJob.config as unknown as GenerationConfig
      const result = await generateBlueprint(config)

      if (!result.ok) {
        setError(result.error)
        setViewState('error')
        await updateJob.mutateAsync({ id: latestJob.id, status: 'failed' })
        return
      }

      setBlueprint(result.blueprint)
      setViewState('success')
      await updateJob.mutateAsync({
        id: latestJob.id,
        status: 'completed',
        config: {
          ...(latestJob.config as Record<string, unknown>),
          blueprint: result.blueprint,
          rawText: result.rawText,
        },
      })
    } catch (err) {
      setError({ type: 'unknown', message: err instanceof Error ? err.message : 'An unexpected error occurred.' })
      setViewState('error')
      try {
        if (latestJob) await updateJob.mutateAsync({ id: latestJob.id, status: 'failed' })
      } catch { /* ignore secondary failure */ }
    } finally {
      runningRef.current = false
    }
  }, [latestJob, updateJob])

  useEffect(() => {
    if (latestJob && (latestJob.status === 'pending' || latestJob.status === 'generating')) {
      if (latestJob.status === 'pending') {
        runGeneration()
      } else {
        setViewState('loading')
      }
    } else if (latestJob && latestJob.status === 'completed') {
      const stored = (latestJob.config as Record<string, unknown>)?.blueprint as WebsiteBlueprint | undefined
      if (stored) {
        setBlueprint(stored)
        setViewState('success')
      } else {
        setError({ type: 'unknown', message: 'Blueprint data is missing from the completed job.' })
        setViewState('error')
      }
    } else if (latestJob && latestJob.status === 'failed') {
      setViewState('error')
      setError({ type: 'unknown', message: 'The previous generation attempt failed.' })
    }
  }, [latestJob, runGeneration])

  if (projectsLoading || !latestJob) {
    return (<div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <Link to="/app/projects/$id" params={{ id }} search={{ wizard: false }} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="size-3.5" />Back to Project</Link>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">AI Generation</h1>
          <StatusBadge state={viewState} />
        </div>
        <p className="text-sm text-muted-foreground">{project ? `Generating blueprint for ${project.name}` : 'Generating website blueprint...'}</p>
      </div>
      <AnimatePresence mode="wait">
        {viewState === 'loading' && <LoadingView key="loading" />}
        {viewState === 'success' && blueprint && (<SuccessView key="success" blueprint={blueprint} projectId={id} />)}
        {viewState === 'error' && error && (<ErrorView key="error" error={error} onRetry={runGeneration} />)}
      </AnimatePresence>
    </div>
  )
}

function StatusBadge({ state }: { state: ViewState }) {
  if (state === 'loading') return <Badge variant="secondary" className="gap-1.5"><Clock className="size-3" /> Generating</Badge>
  if (state === 'success') return <Badge className="gap-1.5 bg-emerald-500/20 text-emerald-400 border-emerald-500/30"><CheckCircle2 className="size-3" /> Completed</Badge>
  return <Badge variant="destructive" className="gap-1.5"><AlertCircle className="size-3" /> Failed</Badge>
}

function LoadingView() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
      <Card className="border-border bg-card"><CardContent className="p-12">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 size-20 rounded-full bg-primary/20 blur-xl animate-pulse" />
            <motion.div className="relative size-20 rounded-full bg-primary/10 flex items-center justify-center" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
              <Sparkles className="size-9 text-primary" />
            </motion.div>
          </div>
          <h2 className="text-xl font-bold">Generating Your Website Blueprint</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-md">Google Gemini AI is analyzing your business information and creating a complete website blueprint...</p>
          <div className="mt-6 flex gap-1.5">{[0, 1, 2].map((i) => (<motion.div key={i} className="size-2 rounded-full bg-primary" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />))}</div>
        </div>
      </CardContent></Card>
      <div className="grid md:grid-cols-3 gap-4">{[0, 1, 2].map((i) => (<Card key={i} className="border-border bg-card"><CardContent className="p-5 space-y-3"><div className="h-4 w-24 rounded bg-muted animate-pulse" /><div className="h-3 w-full rounded bg-muted animate-pulse" /><div className="h-3 w-2/3 rounded bg-muted animate-pulse" /></CardContent></Card>))}</div>
    </motion.div>
  )
}

function SuccessView({ blueprint, projectId }: { blueprint: WebsiteBlueprint; projectId: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
      <Card className="border-border bg-gradient-to-r from-primary/10 to-accent/10"><CardContent className="p-8">
        <div className="flex items-start gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary shrink-0"><Sparkles className="size-6 text-primary-foreground" /></div>
          <div><h2 className="text-2xl font-bold">{blueprint.siteName}</h2>{blueprint.tagline && (<p className="text-muted-foreground mt-1">{blueprint.tagline}</p>)}</div>
        </div>
      </CardContent></Card>
      {Object.keys(blueprint.colorPalette).length > 0 && (
        <Card className="border-border bg-card"><CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4"><Palette className="size-4 text-primary" /><h3 className="text-sm font-semibold">Color Palette</h3></div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">{Object.entries(blueprint.colorPalette).map(([key, color]) => (color && (<div key={key} className="text-center"><div className="h-16 rounded-lg border border-border mb-2" style={{ backgroundColor: color }} /><p className="text-xs font-medium capitalize">{key}</p><p className="text-xs text-muted-foreground font-mono">{color}</p></div>)))}</div>
        </CardContent></Card>
      )}
      {blueprint.recommendedFonts.length > 0 && (
        <Card className="border-border bg-card"><CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4"><Type className="size-4 text-primary" /><h3 className="text-sm font-semibold">Recommended Fonts</h3></div>
          <div className="flex flex-wrap gap-2">{blueprint.recommendedFonts.map((font) => (<span key={font} className="rounded-full border border-border bg-accent px-3 py-1.5 text-sm font-medium">{font}</span>))}</div>
        </CardContent></Card>
      )}
      {blueprint.sections.length > 0 && (
        <Card className="border-border bg-card"><CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4"><Layout className="size-4 text-primary" /><h3 className="text-sm font-semibold">Homepage Sections</h3></div>
          <div className="space-y-3">{blueprint.sections.map((section, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="rounded-lg border border-border p-4">
              <div className="flex items-start gap-3"><span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary shrink-0 mt-0.5">{i + 1}</span><div><p className="text-sm font-semibold">{section.title}</p>{section.description && (<p className="text-sm text-muted-foreground mt-1">{section.description}</p>)}</div></div>
            </motion.div>
          ))}</div>
        </CardContent></Card>
      )}
      {blueprint.pages.length > 0 && (
        <Card className="border-border bg-card"><CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4"><FileText className="size-4 text-primary" /><h3 className="text-sm font-semibold">Pages ({blueprint.pages.length})</h3></div>
          <div className="grid sm:grid-cols-2 gap-3">{blueprint.pages.map((page, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between mb-1"><p className="text-sm font-semibold">{page.name}</p><code className="text-xs text-muted-foreground">/{page.slug}</code></div>
              {page.sections.length > 0 && (<div className="mt-2 space-y-1">{page.sections.map((s, j) => (<div key={j} className="flex items-start gap-1.5 text-xs text-muted-foreground"><span className="text-primary">•</span><span>{s.title}</span></div>))}</div>)}
            </motion.div>
          ))}</div>
        </CardContent></Card>
      )}
      {blueprint.designNotes.length > 0 && (
        <Card className="border-border bg-card"><CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4"><Lightbulb className="size-4 text-primary" /><h3 className="text-sm font-semibold">Design Notes</h3></div>
          <ul className="space-y-2">{blueprint.designNotes.map((note, i) => (<li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><Lightbulb className="size-3.5 text-primary shrink-0 mt-0.5" />{note}</li>))}</ul>
        </CardContent></Card>
      )}
      <div className="flex gap-3">
        <Link to="/app/projects/$id" params={{ id: projectId }} search={{ wizard: false }}><Button variant="outline" className="gap-2"><ArrowLeft className="size-4" />Back to Project</Button></Link>
      </div>
    </motion.div>
  )
}

function ErrorView({ error, onRetry }: { error: GenerationError; onRetry: () => void }) {
  const errorLabels: Record<string, string> = {
    invalid_api_key: 'Invalid API Key', timeout: 'Request Timeout', network: 'Network Error',
    malformed_json: 'Malformed Response', rate_limit: 'Rate Limited', unknown: 'Generation Failed',
  }
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <Card className="border-destructive/30 bg-destructive/5"><CardContent className="p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-14 items-center justify-center rounded-xl bg-destructive/10 mb-4"><AlertCircle className="size-7 text-destructive" /></div>
          <h2 className="text-xl font-bold">{errorLabels[error.type] ?? 'Generation Failed'}</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-md">{error.message}</p>
          <Button onClick={onRetry} className="mt-6 gap-2" size="lg"><RotateCcw className="size-4" />Retry Generation</Button>
        </div>
      </CardContent></Card>
    </motion.div>
  )
}

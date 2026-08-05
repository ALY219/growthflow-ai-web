import { createFileRoute, useParams, useNavigate, Link, useSearch, Outlet, useLocation } from '@tanstack/react-router'
import { useState, useCallback, useMemo, useEffect } from 'react'
import { ArrowLeft, Sparkles, Trash2, CheckCircle2, AlertCircle, Eye, RotateCcw } from 'lucide-react'
import { Button, Card, CardContent } from '@blinkdotnew/ui'
import { useAuth } from '@/hooks/useAuth'
import { useProjects, useDeleteProject, useCreateGenerationJob, useGenerationJobs } from '@/hooks/useProjects'
import { WebsiteGenerationWizard } from '@/components/dashboard/WebsiteGenerationWizard'
import { type GenerationConfig, createDefaultConfig } from '@/lib/generation-types'

export const Route = createFileRoute('/app/projects/$id')({
  head: () => ({ meta: [{ title: 'Project · GrowthFlow AI' }] }),
  component: ProjectDetailPage,
  validateSearch: (search: Record<string, unknown>) => ({
    wizard: Boolean(search.wizard),
  }),
})

function ProjectDetailPage() {
  const { user } = useAuth()
  const { id } = useParams({ from: '/app/projects/$id' })
  const search = useSearch({ from: '/app/projects/$id' })
  const navigate = useNavigate()
  const location = useLocation()
  const { data: projects = [], isLoading } = useProjects(user?.id)
  const { data: jobs = [] } = useGenerationJobs(id)
  const deleteProject = useDeleteProject()
  const createGenJob = useCreateGenerationJob()

  const project = useMemo(() => projects.find((p) => p.id === id), [projects, id])
  const latestJob = useMemo(() => jobs[0], [jobs])

  const [wizardOpen, setWizardOpen] = useState(false)
  const [wizardConfig, setWizardConfig] = useState<GenerationConfig>(createDefaultConfig)
  const [wizardPending, setWizardPending] = useState(false)
  const [wizardError, setWizardError] = useState<string | null>(null)

  useEffect(() => {
    if (search.wizard && project && !wizardOpen) {
      const stored = sessionStorage.getItem(`wizard-config-${project.id}`)
      if (stored) {
        try { setWizardConfig(JSON.parse(stored)) } catch { /* keep default */ }
        sessionStorage.removeItem(`wizard-config-${project.id}`)
      }
      setWizardOpen(true)
      navigate({ to: '/app/projects/$id', params: { id }, search: { wizard: false }, replace: true })
    }
  }, [search.wizard, project, wizardOpen, id, navigate])

  useEffect(() => {
    if (latestJob && (latestJob.status === 'pending' || latestJob.status === 'generating')) {
      navigate({ to: '/app/projects/$id/generation', params: { id }, search: { wizard: false }, replace: true })
    }
  }, [latestJob, id, navigate])

  const handleWizardSubmit = useCallback(async () => {
    if (!user?.id || !project) return
    if (latestJob && latestJob.status === 'completed' && (latestJob.config as Record<string, unknown>)?.blueprint) return
    setWizardPending(true)
    setWizardError(null)
    try {
      await createGenJob.mutateAsync({ projectId: project.id, userId: user.id, config: wizardConfig })
      setWizardOpen(false)
      setWizardPending(false)
      navigate({ to: '/app/projects/$id/generation', params: { id: project.id }, search: { wizard: false } })
    } catch (err) {
      setWizardPending(false)
      setWizardError(err instanceof Error ? err.message : 'Failed to start generation.')
    }
  }, [user?.id, project, wizardConfig, createGenJob, navigate, latestJob])

  if (isLoading) {
    return (<div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>)
  }

  if (location.pathname !== `/app/projects/${id}`) {
    return <Outlet />
  }

  if (!project) {
    return (
      <div className="space-y-6">
        <Link to="/app/projects" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="size-3.5" />Back to Projects</Link>
        <Card className="border-border bg-card border-dashed"><CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-lg font-semibold">Project not found</p>
          <p className="text-sm text-muted-foreground mt-1.5">This project may have been deleted.</p>
          <Link to="/app/projects" className="mt-4"><Button variant="outline" size="sm">View All Projects</Button></Link>
        </CardContent></Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <Link to="/app/projects" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="size-3.5" />Back to Projects</Link>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{project.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">{project.description || 'No description'}</p>
          <p className="text-xs text-muted-foreground mt-2">Created {new Date(project.created_at).toLocaleDateString()}</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => { if (confirm('Delete this project?')) { deleteProject.mutate(project.id); navigate({ to: '/app/projects' }) } }} className="gap-1.5 text-destructive hover:text-destructive"><Trash2 className="size-3.5" />Delete</Button>
      </div>
      {latestJob && latestJob.status === 'completed' && (latestJob.config as Record<string, unknown>)?.blueprint ? (
        <Card className="border-border bg-gradient-to-r from-primary/10 to-accent/10"><CardContent className="p-8 text-center">
          <div className="inline-flex size-14 items-center justify-center rounded-xl bg-emerald-500/20 mb-4"><CheckCircle2 className="size-7 text-emerald-500" /></div>
          <h2 className="text-lg font-semibold">Blueprint Ready</h2>
          <p className="text-sm text-muted-foreground mt-1.5 max-w-md mx-auto mb-6">Your AI-generated website blueprint is ready to view.</p>
          <Link to="/app/projects/$id/generation" params={{ id }} search={{ wizard: false }}><Button size="lg" className="gap-2"><Eye className="size-4" />View Blueprint</Button></Link>
        </CardContent></Card>
      ) : latestJob && latestJob.status === 'failed' ? (
        <Card className="border-destructive/30 bg-destructive/5"><CardContent className="p-8 text-center">
          <div className="inline-flex size-14 items-center justify-center rounded-xl bg-destructive/10 mb-4"><AlertCircle className="size-7 text-destructive" /></div>
          <h2 className="text-lg font-semibold">Generation Failed</h2>
          <p className="text-sm text-muted-foreground mt-1.5 max-w-md mx-auto mb-6">The previous generation attempt failed. You can retry or start a new wizard.</p>
          <div className="flex justify-center gap-3">
            <Link to="/app/projects/$id/generation" params={{ id }} search={{ wizard: false }}><Button variant="outline" size="lg" className="gap-2"><RotateCcw className="size-4" />Retry Generation</Button></Link>
            <Button onClick={() => setWizardOpen(true)} size="lg" className="gap-2"><Sparkles className="size-4" />New Wizard</Button>
          </div>
        </CardContent></Card>
      ) : (
        <Card className="border-border bg-card"><CardContent className="p-8 text-center">
          <div className="inline-flex size-14 items-center justify-center rounded-xl bg-primary/10 mb-4"><Sparkles className="size-7 text-primary" /></div>
          <h2 className="text-lg font-semibold">Generate Your Website</h2>
          <p className="text-sm text-muted-foreground mt-1.5 max-w-md mx-auto mb-6">Use the AI wizard to configure your website and generate a complete blueprint with Google Gemini.</p>
          <Button onClick={() => setWizardOpen(true)} size="lg" className="gap-2"><Sparkles className="size-4" />Open Generation Wizard</Button>
        </CardContent></Card>
      )}
      {wizardError && (<div className="rounded-lg bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive">{wizardError}</div>)}
      <WebsiteGenerationWizard open={wizardOpen} config={wizardConfig} onConfigChange={setWizardConfig} onSubmit={handleWizardSubmit} onCancel={() => setWizardOpen(false)} pending={wizardPending} />
    </div>
  )
}

import { createFileRoute, useParams, useNavigate, Link } from '@tanstack/react-router'
import { useState, useCallback, useMemo } from 'react'
import { ArrowLeft, Sparkles, Trash2 } from 'lucide-react'
import { Button, Card, CardContent } from '@blinkdotnew/ui'
import { useAuth } from '@/hooks/useAuth'
import { useProjects, useDeleteProject, useCreateGenerationJob } from '@/hooks/useProjects'
import { WebsiteGenerationWizard } from '@/components/dashboard/WebsiteGenerationWizard'
import { type GenerationConfig, createDefaultConfig } from '@/lib/generation-types'

export const Route = createFileRoute('/app/projects/$id')({
  head: () => ({ meta: [{ title: 'Project · GrowthFlow AI' }] }),
  component: ProjectDetailPage,
})

function ProjectDetailPage() {
  const { user } = useAuth()
  const { id } = useParams({ from: '/app/projects/$id' })
  const navigate = useNavigate()
  const { data: projects = [], isLoading } = useProjects(user?.id)
  const deleteProject = useDeleteProject()
  const createGenJob = useCreateGenerationJob()

  const project = useMemo(() => projects.find((p) => p.id === id), [projects, id])

  const [wizardOpen, setWizardOpen] = useState(false)
  const [wizardConfig, setWizardConfig] = useState<GenerationConfig>(createDefaultConfig)
  const [wizardPending, setWizardPending] = useState(false)
  const [wizardError, setWizardError] = useState<string | null>(null)

  const handleWizardSubmit = useCallback(async () => {
    if (!user?.id || !project) return
    setWizardPending(true)
    setWizardError(null)
    try {
      await createGenJob.mutateAsync({ projectId: project.id, userId: user.id, config: wizardConfig })
      setWizardOpen(false)
      setWizardPending(false)
      navigate({ to: '/app/projects/$id/generation', params: { id: project.id } })
    } catch (err) {
      setWizardPending(false)
      setWizardError(err instanceof Error ? err.message : 'Failed to start generation.')
    }
  }, [user?.id, project, wizardConfig, createGenJob, navigate])

  if (isLoading) {
    return (<div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>)
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
      <Card className="border-border bg-card"><CardContent className="p-8 text-center">
        <div className="inline-flex size-14 items-center justify-center rounded-xl bg-primary/10 mb-4"><Sparkles className="size-7 text-primary" /></div>
        <h2 className="text-lg font-semibold">Generate Your Website</h2>
        <p className="text-sm text-muted-foreground mt-1.5 max-w-md mx-auto mb-6">Use the AI wizard to configure your website and generate a complete blueprint with Google Gemini.</p>
        <Button onClick={() => setWizardOpen(true)} size="lg" className="gap-2"><Sparkles className="size-4" />Open Generation Wizard</Button>
      </CardContent></Card>
      {wizardError && (<div className="rounded-lg bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive">{wizardError}</div>)}
      <WebsiteGenerationWizard open={wizardOpen} config={wizardConfig} onConfigChange={setWizardConfig} onSubmit={handleWizardSubmit} onCancel={() => setWizardOpen(false)} pending={wizardPending} />
    </div>
  )
}

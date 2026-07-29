import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, FolderOpen } from 'lucide-react'
import { Button, Card, CardContent, Input, Dialog, DialogContent, DialogHeader, DialogTitle } from '@blinkdotnew/ui'
import { useAuth } from '@/hooks/useAuth'
import { useProjects, useCreateProject, useDeleteProject } from '@/hooks/useProjects'

export const Route = createFileRoute('/app/projects')({
  head: () => ({ meta: [{ title: 'Projects · GrowthFlow AI' }] }),
  component: ProjectsPage,
})

function ProjectsPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { data: projects = [], isLoading } = useProjects(user?.id)
  const createProject = useCreateProject()
  const deleteProject = useDeleteProject()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const [createError, setCreateError] = useState<string | null>(null)

  const handleCreate = async () => {
    if (!user?.id || !name.trim()) return
    setCreateError(null)
    try {
      const result = await createProject.mutateAsync({ name: name.trim(), description, userId: user.id })
      setName(''); setDescription(''); setDialogOpen(false)
      navigate({ to: '/app/projects/$id', params: { id: result.id } })
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Failed to create project.')
    }
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl md:text-3xl font-bold tracking-tight">Projects</h1><p className="text-sm text-muted-foreground mt-1">Manage your website generation projects</p></div>
        <Button onClick={() => setDialogOpen(true)} className="gap-1.5"><Plus className="size-4" />New Project</Button>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" /></div>
      ) : projects.length === 0 ? (
        <Card className="border-border bg-card border-dashed"><CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <FolderOpen className="size-12 text-muted-foreground mb-4" />
          <p className="text-sm font-medium">No projects yet</p>
          <p className="text-xs text-muted-foreground mt-1 mb-4">Create a project to start generating websites with AI.</p>
          <Button onClick={() => setDialogOpen(true)} size="sm" className="gap-1.5"><Plus className="size-3.5" />Create Your First Project</Button>
        </CardContent></Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="border-border bg-card hover:border-primary/50 transition-colors">
                <CardContent className="p-5">
                  <Link to="/app/projects/$id" params={{ id: p.id }}>
                    <p className="font-semibold truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.description || 'No description'}</p>
                    <p className="text-xs text-muted-foreground mt-3">{new Date(p.created_at).toLocaleDateString()}</p>
                  </Link>
                  <button onClick={() => deleteProject.mutate(p.id)} className="text-xs text-destructive hover:underline mt-2">Delete</button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Create New Project</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><label className="text-sm font-medium">Project Name</label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="My Awesome Website" autoFocus /></div>
            <div className="space-y-2"><label className="text-sm font-medium">Description (optional)</label><Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A brief description of your project" /></div>
            {createError && (<div className="rounded-lg bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive">{createError}</div>)}
            <Button onClick={handleCreate} className="w-full" disabled={!name.trim() || createProject.isPending}>{createProject.isPending ? 'Creating...' : 'Create Project'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

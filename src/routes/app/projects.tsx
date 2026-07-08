import { useState, useMemo } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@blinkdotnew/ui'
import { Plus, Globe, Layers, Layout, LayoutDashboard, Sparkles } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useProjects, type ProjectType } from '@/hooks/useProjects'
import { CreateProjectDialog } from '@/components/dashboard/CreateProjectDialog'

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

const FILTER_TABS = [
  { value: 'all', label: 'All' },
  { value: 'website', label: 'Website' },
  { value: 'saas', label: 'SaaS' },
  { value: 'landing-page', label: 'Landing Page' },
  { value: 'dashboard', label: 'Dashboard' },
] as const

type FilterValue = (typeof FILTER_TABS)[number]['value']

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export const Route = createFileRoute('/app/projects')({
  head: () => ({ meta: [{ title: 'Projects · GrowthFlow AI' }] }),
  component: ProjectsPage,
})

function ProjectsPage() {
  const { user } = useAuth()
  const { data: projects = [], isLoading } = useProjects(user?.id)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [filterTab, setFilterTab] = useState<FilterValue>('all')

  const filteredProjects = useMemo(() => {
    if (filterTab === 'all') return projects
    return projects.filter((p) => p.type === filterTab)
  }, [projects, filterTab])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Projects
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {projects.length} project{projects.length !== 1 ? 's' : ''} total
          </p>
        </div>

        <CreateProjectDialog open={dialogOpen} onOpenChange={setDialogOpen} />

        <Button
          size="sm"
          className="gap-2"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="size-4" />
          Create Project
        </Button>
      </div>

      {/* Filter Tabs */}
      <Tabs
        value={filterTab}
        onValueChange={(v) => setFilterTab(v as FilterValue)}
      >
        <TabsList>
          {FILTER_TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Project Cards */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="border-border bg-card">
              <CardHeader className="pb-2">
                <div className="h-5 w-3/4 rounded bg-muted animate-pulse" />
                <div className="h-3 w-1/2 rounded bg-muted animate-pulse mt-1" />
              </CardHeader>
              <CardContent>
                <div className="h-4 w-full rounded bg-muted animate-pulse" />
                <div className="h-4 w-2/3 rounded bg-muted animate-pulse mt-1" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && filteredProjects.length === 0 && (
        <Card className="border-border bg-card border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-muted mb-5">
              <Sparkles className="size-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {filterTab === 'all'
                ? 'No projects yet'
                : `No ${FILTER_TABS.find((t) => t.value === filterTab)?.label} projects`}
            </h3>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-sm">
              {filterTab === 'all'
                ? 'Create your first project to get started.'
                : 'Try a different filter or create a new project.'}
            </p>
            <Button
              className="mt-6 gap-2"
              onClick={() => setDialogOpen(true)}
            >
              <Plus className="size-4" />
              Create Project
            </Button>
          </CardContent>
        </Card>
      )}

      {!isLoading && filteredProjects.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project, i) => {
            const TypeIcon = PROJECT_TYPE_ICONS[project.type as ProjectType]
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: i * 0.06,
                  ease: 'easeOut',
                }}
              >
                <Link to="/app/projects/$id" params={{ id: project.id }}>
                  <Card className="group border-border bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {project.name}
                        </CardTitle>
                        <TypeIcon className="size-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Badge variant={STATUS_VARIANTS[project.status]}>
                          {STATUS_LABELS[project.status]}
                        </Badge>
                        <Badge variant="outline">
                          {PROJECT_TYPE_LABELS[project.type as ProjectType]}
                        </Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description || 'No description yet.'}
                      </p>
                      <p className="text-xs text-muted-foreground/60 mt-3">
                        Created {formatDate(project.createdAt)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}

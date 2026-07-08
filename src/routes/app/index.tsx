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
  Skeleton,
} from '@blinkdotnew/ui'
import {
  Plus,
  Globe,
  Layers,
  Layout,
  LayoutDashboard,
  FolderOpen,
  ChevronRight,
  Clock,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useProjects, type ProjectType, type ProjectStatus } from '@/hooks/useProjects'
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

const STATUS_VARIANTS: Record<ProjectStatus, 'default' | 'secondary' | 'outline'> = {
  draft: 'secondary',
  building: 'default',
  completed: 'outline',
  archived: 'secondary',
}

const STATUS_LABELS: Record<ProjectStatus, string> = {
  draft: 'Draft',
  building: 'Building',
  completed: 'Completed',
  archived: 'Archived',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export const Route = createFileRoute('/app/')({
  head: () => ({ meta: [{ title: 'Dashboard · GrowthFlow AI' }] }),
  component: DashboardPage,
})

function DashboardPage() {
  const { user } = useAuth()
  const { data: projects = [], isLoading } = useProjects(user?.id)

  const [dialogOpen, setDialogOpen] = useState(false)

  const kpi = useMemo(() => {
    return {
      total: projects.length,
      inProgress: projects.filter((p) => p.status === 'draft' || p.status === 'building').length,
      completed: projects.filter((p) => p.status === 'completed').length,
    }
  }, [projects])

  const displayName = user?.displayName ?? user?.email ?? 'there'

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Welcome back, {displayName}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Here&apos;s what&apos;s happening with your projects today.
          </p>
        </div>

        <CreateProjectDialog open={dialogOpen} onOpenChange={setDialogOpen} />

        <Button
          size="sm"
          className="gap-2"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="size-4" />
          Create New Project
        </Button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: 'Active Projects',
            value: kpi.inProgress,
            icon: Clock,
            color: 'text-primary',
            bg: 'bg-primary/10',
          },
          {
            label: 'Total Projects',
            value: kpi.total,
            icon: FolderOpen,
            color: 'text-accent',
            bg: 'bg-accent/10',
          },
          {
            label: 'Completed',
            value: kpi.completed,
            icon: CheckCircle2,
            color: 'text-emerald-400',
            bg: 'bg-emerald-400/10',
          },
        ].map((stat) => (
          <Card key={stat.label} className="border-border bg-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div
                  className={`flex size-10 items-center justify-center rounded-lg ${stat.bg}`}
                >
                  <stat.icon className={`size-5 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {isLoading ? (
                      <Skeleton className="h-7 w-10 inline-block" />
                    ) : (
                      stat.value
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Projects Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Your Projects</h2>
          {projects.length > 0 && (
            <Link
              to="/app/projects"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View all
              <ChevronRight className="size-3.5" />
            </Link>
          )}
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-3 w-1/2 mt-1" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3 mt-1" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && projects.length === 0 && (
          <Card className="border-border bg-card border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-muted mb-5">
                <Sparkles className="size-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                No projects yet
              </h3>
              <p className="text-sm text-muted-foreground mt-1.5 max-w-sm">
                Create your first project to get started with AI-powered
                blueprints, website generation, and more.
              </p>
              <Button
                className="mt-6 gap-2"
                onClick={() => setDialogOpen(true)}
              >
                <Plus className="size-4" />
                Create Your First Project
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Project cards */}
        {!isLoading && projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, i) => {
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
                  <Link
                    to="/app/projects/$id"
                    params={{ id: project.id }}
                  >
                    <Card className="group border-border bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {project.name}
                          </CardTitle>
                          <TypeIcon className="size-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Badge variant={STATUS_VARIANTS[project.status as ProjectStatus]}>
                            {STATUS_LABELS[project.status as ProjectStatus]}
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
    </div>
  )
}

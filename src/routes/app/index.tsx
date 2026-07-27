import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { FolderOpen, Sparkles, ArrowRight } from 'lucide-react'
import { Button, Card, CardContent } from '@blinkdotnew/ui'
import { useAuth } from '@/hooks/useAuth'
import { useProjects } from '@/hooks/useProjects'

export const Route = createFileRoute('/app/')({
  head: () => ({ meta: [{ title: 'Dashboard · GrowthFlow AI' }] }),
  component: DashboardPage,
})

function DashboardPage() {
  const { user } = useAuth()
  const { data: projects = [], isLoading } = useProjects(user?.id)

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back{user?.email ? `, ${user.email}` : ''}. Let's build something great.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Projects</p>
            <p className="text-3xl font-bold mt-1">{projects.length}</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">AI Generations</p>
            <p className="text-3xl font-bold mt-1">0</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Plan</p>
            <p className="text-3xl font-bold mt-1">Free</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Projects</h2>
          <Link to="/app/projects">
            <Button variant="ghost" size="sm" className="gap-1.5">
              View All
              <ArrowRight className="size-3.5" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
          </div>
        ) : projects.length === 0 ? (
          <Card className="border-border bg-card border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <FolderOpen className="size-10 text-muted-foreground mb-3" />
              <p className="text-sm font-medium">No projects yet</p>
              <p className="text-xs text-muted-foreground mt-1 mb-4">
                Create your first project to start generating websites with AI.
              </p>
              <Link to="/app/projects">
                <Button size="sm" className="gap-1.5">
                  <Sparkles className="size-3.5" />
                  Create Project
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.slice(0, 6).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to="/app/projects/$id" params={{ id: p.id }}>
                  <Card className="border-border bg-card hover:border-primary/50 transition-colors cursor-pointer">
                    <CardContent className="p-5">
                      <p className="font-semibold truncate">{p.name}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {p.description || 'No description'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-3">
                        {new Date(p.created_at).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

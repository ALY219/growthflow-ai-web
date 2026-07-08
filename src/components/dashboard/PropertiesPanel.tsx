import { Badge, Separator } from '@blinkdotnew/ui'
import type { Project } from '@/hooks/useProjects'

const INDUSTRY_LABELS: Record<string, string> = {
  technology: 'Technology',
  education: 'Education',
  healthcare: 'Healthcare',
  fitness: 'Fitness',
  finance: 'Finance',
  'e-commerce': 'E-commerce',
  ai: 'AI',
  portfolio: 'Portfolio',
  other: 'Other',
}

const THEME_LABELS: Record<string, string> = {
  dark: 'Dark',
  light: 'Light',
  auto: 'Auto',
}

const AUDIENCE_LABELS: Record<string, string> = {
  students: 'Students',
  businesses: 'Businesses',
  startups: 'Startups',
  creators: 'Creators',
  developers: 'Developers',
  other: 'Other',
}

const TYPE_LABELS: Record<string, string> = {
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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export interface PropertiesPanelProps {
  project: Project
  projectData: { industry?: string; theme?: string; targetAudience?: string }
}

export function PropertiesPanel({
  project,
  projectData,
}: PropertiesPanelProps) {
  const industryLabel = projectData.industry
    ? INDUSTRY_LABELS[projectData.industry] ?? projectData.industry
    : '—'
  const themeLabel = projectData.theme
    ? THEME_LABELS[projectData.theme] ?? projectData.theme
    : '—'
  const audienceLabel = projectData.targetAudience
    ? AUDIENCE_LABELS[projectData.targetAudience] ?? projectData.targetAudience
    : '—'
  const typeLabel = TYPE_LABELS[project.type] ?? project.type
  const statusLabel = STATUS_LABELS[project.status] ?? project.status
  const statusVariant = STATUS_VARIANTS[project.status] ?? 'secondary'

  return (
    <aside className="w-64 shrink-0 border-l border-border bg-card/20 p-4 space-y-6 overflow-y-auto">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Properties
      </h3>

      <div className="space-y-4">
        <PropertyRow label="Industry" value={industryLabel} />
        <PropertyRow label="Project Type" value={typeLabel} />
        <PropertyRow label="Theme" value={themeLabel} />
        <PropertyRow label="Target Audience" value={audienceLabel} />

        <Separator />

        <div>
          <p className="text-xs text-muted-foreground mb-1.5">Status</p>
          <Badge variant={statusVariant}>{statusLabel}</Badge>
        </div>

        <PropertyRow label="Created" value={formatDate(project.createdAt)} />

        <Separator />

        <div>
          <p className="text-xs text-muted-foreground mb-1.5">
            Subscription Plan
          </p>
          <Badge variant="secondary">Free</Badge>
        </div>
      </div>
    </aside>
  )
}

function PropertyRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  )
}

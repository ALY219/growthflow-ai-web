import {
  LayoutDashboard,
  Globe,
  FileText,
  Database,
  Rocket,
  Package,
  Clock,
} from 'lucide-react'

const WORKSPACE_NAV = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'website', label: 'Website', icon: Globe },
  { id: 'blueprint', label: 'Blueprint', icon: FileText },
  { id: 'database', label: 'Database', icon: Database },
  { id: 'deployment', label: 'Deployment', icon: Rocket },
  { id: 'assets', label: 'Assets', icon: Package },
  { id: 'history', label: 'History', icon: Clock },
] as const

export type WorkspaceView = (typeof WORKSPACE_NAV)[number]['id']

export const WORKSPACE_NAV_ITEMS = WORKSPACE_NAV

interface WorkspaceSidebarProps {
  active: WorkspaceView
  onSelect: (id: WorkspaceView) => void
  className?: string
}

export function WorkspaceSidebar({
  active,
  onSelect,
  className,
}: WorkspaceSidebarProps) {
  return (
    <aside
      className={`w-52 shrink-0 border-r border-border bg-card/30 overflow-y-auto ${className ?? ''}`}
    >
      <nav className="p-3 space-y-0.5">
        {WORKSPACE_NAV.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon className="size-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

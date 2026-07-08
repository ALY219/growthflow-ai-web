import { useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Button } from '@blinkdotnew/ui'
import {
  LayoutDashboard,
  FolderOpen,
  Settings,
  LogOut,
  Sparkles,
  Menu,
  X,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

const NAV_ITEMS = [
  { to: '/app' as const, label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/projects' as const, label: 'Projects', icon: FolderOpen },
  { to: '/app/settings' as const, label: 'Settings', icon: Settings },
]

export function DashboardSidebar() {
  const { user, signOut } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Get current path for active state
  const currentPath = useRouterState({ select: (s) => s.location.pathname })

  const initials = user?.displayName
    ? user.displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? '?'

  const isActive = (to: string) => {
    if (to === '/app') {
      return currentPath === '/app' || currentPath === '/app/'
    }
    return currentPath.startsWith(to)
  }

  const sidebarContent = (
    <div className="flex h-full flex-col bg-sidebar">
      {/* Logo */}
      <div className="shrink-0 border-b border-sidebar-border px-4 py-4">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-semibold text-sm text-sidebar-foreground tracking-tight hover:opacity-80 transition-opacity"
        >
          <span className="relative flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs font-bold">
            G
          </span>
          <span className="truncate">GrowthFlow AI</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 min-h-0 overflow-y-auto px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const active = isActive(item.to)
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium
                transition-colors duration-150
                ${
                  active
                    ? 'bg-sidebar-accent text-sidebar-primary'
                    : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                }
              `}
            >
              <Icon className="size-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer — user + sign out */}
      <div className="shrink-0 border-t border-sidebar-border p-3 space-y-2">
        {/* User info */}
        <div className="flex items-center gap-2.5 px-1">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-sidebar-foreground truncate">
              {user?.displayName ?? 'User'}
            </p>
            <p className="text-[10px] text-muted-foreground truncate">
              {user?.email ?? ''}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
          onClick={signOut}
        >
          <LogOut className="size-3.5 shrink-0" />
          <span className="text-xs">Sign Out</span>
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-14 px-4 bg-background border-b border-border">
        <Link to="/" className="flex items-center gap-2 font-semibold text-sm text-foreground">
          <span className="relative flex size-6 items-center justify-center rounded-md bg-gradient-to-br from-primary to-accent text-primary-foreground text-[10px] font-bold">
            G
          </span>
          <Sparkles className="size-3.5 text-primary" />
          GrowthFlow
        </Link>
        <button
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle sidebar"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Desktop sidebar — fixed left */}
      <aside className="hidden md:flex w-64 shrink-0 fixed inset-y-0 left-0 z-30 border-r border-border">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="md:hidden fixed inset-y-0 left-0 z-50 w-72 border-r border-border shadow-2xl">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  )
}

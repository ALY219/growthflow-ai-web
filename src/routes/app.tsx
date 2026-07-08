import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { blink } from '@/blink/client'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'

export const Route = createFileRoute('/app')({
  component: AppLayout,
})

function AppLayout() {
  const [ready, setReady] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setAuthenticated(state.isAuthenticated)
      if (!state.isLoading) setReady(true)
    })
    return unsubscribe
  }, [])

  // Show loading spinner while checking auth
  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  // Redirect to sign-in if not authenticated
  if (!authenticated) {
    // Use window.location for redirect since redirect() in TanStack
    // can be tricky with client-side auth state
    if (typeof window !== 'undefined') {
      window.location.href = '/sign-in'
      return null
    }
    return null
  }

  return (
    <div className="flex min-h-dvh bg-background">
      <DashboardSidebar />
      <main className="flex-1 min-w-0 md:pl-64 pt-14 md:pt-0 overflow-y-auto">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

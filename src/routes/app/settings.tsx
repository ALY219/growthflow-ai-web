import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent } from '@blinkdotnew/ui'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/app/settings')({
  head: () => ({ meta: [{ title: 'Settings · GrowthFlow AI' }] }),
  component: SettingsPage,
})

function SettingsPage() {
  const { user } = useAuth()
  return (
    <div className="space-y-6 max-w-2xl">
      <div><h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1><p className="text-sm text-muted-foreground mt-1">Manage your account and preferences</p></div>
      <Card className="border-border bg-card"><CardContent className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">Account</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Email</span><span className="text-sm font-medium">{user?.email ?? '—'}</span></div>
          <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">User ID</span><span className="text-sm font-mono text-muted-foreground">{user?.id?.slice(0, 8)}...</span></div>
        </div>
      </CardContent></Card>
      <Card className="border-border bg-card"><CardContent className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">AI Provider</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Active Provider</span><span className="text-sm font-medium">Google Gemini</span></div>
          <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Model</span><span className="text-sm font-medium">gemini-2.0-flash</span></div>
        </div>
      </CardContent></Card>
    </div>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from '@blinkdotnew/ui'
import { UserCog, Bell, CreditCard } from 'lucide-react'

const SETTINGS_CARDS = [
  {
    title: 'Account Settings',
    description: 'Manage your profile, email, and password.',
    icon: UserCog,
  },
  {
    title: 'Notifications',
    description: 'Configure how you receive updates and alerts.',
    icon: Bell,
  },
  {
    title: 'Billing',
    description: 'View plan details and manage your subscription.',
    icon: CreditCard,
  },
]

export const Route = createFileRoute('/app/settings')({
  head: () => ({ meta: [{ title: 'Settings · GrowthFlow AI' }] }),
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage your account preferences and workspace configuration.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SETTINGS_CARDS.map((card) => (
          <Card
            key={card.title}
            className="border-border bg-card hover:border-primary/30 transition-colors duration-200 cursor-pointer"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                  <card.icon className="size-4.5 text-muted-foreground" />
                </div>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  Coming Soon
                </Badge>
              </div>
              <CardTitle className="text-sm font-semibold text-foreground">
                {card.title}
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                {card.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

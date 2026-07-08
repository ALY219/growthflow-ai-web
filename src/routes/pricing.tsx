import { createFileRoute } from '@tanstack/react-router'
import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription, Badge } from '@blinkdotnew/ui'
import { Check } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const PLANS = [
  {
    name: 'Launch Pad',
    price: 9,
    description: 'Perfect for students and first-time founders.',
    features: ['3 active projects', 'Basic AI assistance', 'Community support', 'Export to PDF', 'Standard templates'],
    popular: false,
  },
  {
    name: 'Startup Engine',
    price: 18,
    description: 'For freelancers and builders shipping fast.',
    features: ['10 active projects', 'Advanced AI generation', 'Priority support', 'Custom domains', 'Premium templates', 'Analytics dashboard'],
    popular: true,
  },
  {
    name: 'AI Founder Suite',
    price: 25,
    description: 'For entrepreneurs building multiple ventures.',
    features: ['Unlimited projects', 'Premium AI models', 'Dedicated support', 'Team collaboration', 'White-label exports', 'API access', 'Early feature access'],
    popular: false,
  },
]

export const Route = createFileRoute('/pricing')({
  head: () => ({
    meta: [
      { title: 'Pricing · GrowthFlow AI' },
      { name: 'description', content: 'Simple, transparent pricing for turning your ideas into startups.' },
    ],
  }),
  component: PricingPage,
})

function PricingPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              Start building for free. Upgrade when you&apos;re ready to scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PLANS.map((plan) => (
              <Card
                key={plan.name}
                className={`relative border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 ${
                  plan.popular ? 'ring-1 ring-primary/50 shadow-lg shadow-primary/5' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground text-xs font-medium px-3 py-0.5">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-semibold">{plan.name}</CardTitle>
                  <CardDescription className="text-sm mt-1">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground text-sm">/mo</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check className="size-4 shrink-0 text-primary mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

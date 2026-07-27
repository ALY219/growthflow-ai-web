import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { Button } from '@blinkdotnew/ui'

export const Route = createFileRoute('/pricing')({
  head: () => ({ meta: [{ title: 'Pricing · GrowthFlow AI' }] }),
  component: PricingPage,
})

const plans = [
  { name: 'Starter', price: '$0', period: 'forever', desc: 'Perfect for trying out GrowthFlow AI', features: ['3 AI generations per month', 'Basic website blueprint', 'Standard design styles', 'Community support'], cta: 'Get Started', highlight: false },
  { name: 'Pro', price: '$29', period: 'per month', desc: 'For professionals and growing businesses', features: ['Unlimited AI generations', 'Full website blueprints', 'All design styles', 'Custom pages & features', 'Priority support', 'Export to code'], cta: 'Start Pro Trial', highlight: true },
  { name: 'Business', price: '$99', period: 'per month', desc: 'For teams and agencies', features: ['Everything in Pro', 'Team collaboration', 'Multiple projects', 'API access', 'White-label options', 'Dedicated support'], cta: 'Contact Sales', highlight: false },
]

function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">Choose the plan that fits your needs. Upgrade or downgrade anytime.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`rounded-2xl border p-6 ${plan.highlight ? 'border-primary bg-primary/5 shadow-lg' : 'border-border bg-card'}`}>
            {plan.highlight && (<div className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground mb-4"><Sparkles className="size-3" />Most Popular</div>)}
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{plan.desc}</p>
            <div className="mt-4 mb-6"><span className="text-4xl font-bold">{plan.price}</span><span className="text-muted-foreground ml-1">/{plan.period}</span></div>
            <ul className="space-y-3 mb-6">
              {plan.features.map((f) => (<li key={f} className="flex items-start gap-2 text-sm"><Check className="size-4 text-primary shrink-0 mt-0.5" />{f}</li>))}
            </ul>
            <Link to="/sign-up" className="block"><Button className="w-full" variant={plan.highlight ? 'default' : 'outline'}>{plan.cta}</Button></Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

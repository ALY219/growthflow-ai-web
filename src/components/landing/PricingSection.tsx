import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@blinkdotnew/ui'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'

const PLANS = [
  {
    name: 'Launch Pad',
    price: '$9',
    period: '/mo',
    for: 'For students',
    features: ['3 projects', 'Basic AI generation', 'Community support', 'Export as ZIP'],
    cta: 'Get Started',
    href: '/sign-up',
    popular: false,
  },
  {
    name: 'Startup Engine',
    price: '$18',
    period: '/mo',
    for: 'For freelancers & builders',
    features: ['10 projects', 'Advanced AI generation', 'Priority support', 'Custom domains', 'Analytics dashboard'],
    cta: 'Get Started',
    href: '/sign-up',
    popular: true,
  },
  {
    name: 'AI Founder Suite',
    price: '$25',
    period: '/mo',
    for: 'For entrepreneurs',
    features: ['Unlimited projects', 'Premium AI models', 'Dedicated support', 'Custom domains', 'Team collaboration', 'White-label exports'],
    cta: 'Get Started',
    href: '/sign-up',
    popular: false,
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export function PricingSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Start free. Upgrade when you&apos;re ready to scale. No hidden fees, no surprises.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={`
                relative flex flex-col rounded-xl border p-6 transition-all duration-300
                ${plan.popular
                  ? 'border-primary/40 bg-card shadow-lg shadow-primary/5 ring-1 ring-primary/20'
                  : 'border-border/50 bg-card/60 hover:border-border hover:bg-card'
                }
              `}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                  Most Popular
                </div>
              )}

              <div className="mb-5">
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{plan.for}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="space-y-3 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <Check className="size-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link to={plan.href} className="mt-auto">
                <Button
                  variant={plan.popular ? 'default' : 'outline'}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

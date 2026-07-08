import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Lightbulb, Globe, Layers, TrendingUp } from 'lucide-react'

const CAPABILITIES = [
  {
    icon: Lightbulb,
    title: 'AI Startup Blueprint',
    description: 'Transform rough ideas into structured business plans with market analysis, competitor research, and actionable roadmaps.',
  },
  {
    icon: Globe,
    title: 'Website Builder',
    description: 'Generate beautiful, responsive websites from a simple description — no code, no templates, just your brand.',
  },
  {
    icon: Layers,
    title: 'SaaS Generator',
    description: 'Spin up complete SaaS foundations with authentication, payments, dashboards, and API scaffolding in minutes.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Engine',
    description: 'AI-powered growth strategies tailored to your startup, including SEO, content plans, and go-to-market playbooks.',
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

export function CapabilitiesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Everything You Need to Launch
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            From idea validation to launch day — GrowthFlow gives you the full toolkit to build something real.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {CAPABILITIES.map((cap) => (
            <motion.div
              key={cap.title}
              variants={cardVariants}
              className="group relative rounded-xl border border-border/50 bg-card/60 hover:bg-card hover:border-border transition-all duration-300 p-6"
            >
              <div className="size-11 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                <cap.icon className="size-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{cap.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

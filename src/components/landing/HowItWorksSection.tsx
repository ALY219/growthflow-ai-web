import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  {
    step: '01',
    title: 'Describe Your Idea',
    description: 'Tell us about your startup concept, target audience, and goals. Our AI asks the right questions to understand your vision.',
  },
  {
    step: '02',
    title: 'AI Builds the Foundation',
    description: 'Our AI generates a complete project blueprint, website, or SaaS scaffold — with real code, not just mockups.',
  },
  {
    step: '03',
    title: 'Customize & Launch',
    description: 'Fine-tune the output, connect your domain, and go live. Iterate with AI assistance as your startup grows.',
  },
]

export function HowItWorksSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-card/30">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            From Idea to Launch in Minutes
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Three simple steps — no technical skills required. Just your idea and ambition.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[19px] top-10 bottom-10 w-px bg-border hidden sm:block" />

          <div className="flex flex-col gap-10">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex gap-6 items-start"
              >
                {/* Step number circle */}
                <div className="relative z-10 shrink-0 size-10 flex items-center justify-center rounded-full border-2 border-primary/40 bg-background text-sm font-bold text-primary">
                  {i + 1}
                </div>
                {/* Content */}
                <div className="pt-1">
                  <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-lg">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

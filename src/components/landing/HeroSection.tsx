import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@blinkdotnew/ui'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

function FloatingGeometricShapes() {
  return (
    <div className="relative w-full h-full min-h-[360px] flex items-center justify-center">
      {/* Dashboard card 1 */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-6 right-6 sm:top-10 sm:right-10 w-44 sm:w-56 rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm p-4 shadow-lg"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="size-2 rounded-full bg-emerald-400" />
          <div className="h-2 w-16 rounded bg-muted" />
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full rounded bg-muted" />
          <div className="h-2 w-4/5 rounded bg-muted" />
          <div className="h-8 w-full rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 mt-3" />
        </div>
      </motion.div>

      {/* Dashboard card 2 */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-10 left-4 sm:bottom-16 sm:left-8 w-36 sm:w-48 rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm p-4 shadow-lg"
      >
        <div className="space-y-1.5 mb-3">
          <div className="h-2 w-3/5 rounded bg-muted" />
          <div className="h-2 w-4/5 rounded bg-muted" />
        </div>
        <div className="flex gap-2">
          <div className="h-14 w-1/2 rounded-lg bg-gradient-to-b from-primary/30 to-transparent" />
          <div className="h-14 w-1/2 rounded-lg bg-gradient-to-b from-accent/30 to-transparent" />
        </div>
      </motion.div>

      {/* Floating accent bar */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/20"
      />

      {/* Glowing orbs */}
      <div className="absolute top-1/3 left-1/3 w-20 h-20 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-28 h-28 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full bg-primary/15 blur-2xl" />
    </div>
  )
}

export function HeroSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative min-h-dvh flex items-center overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -left-40 w-[600px] h-[500px] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute bottom-0 -right-40 w-[500px] h-[400px] rounded-full bg-accent/8 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5 blur-[100px]" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="mx-auto max-w-7xl px-6 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08]">
              Turn Your Idea{' '}
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                Into a Real Startup
              </span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Generate startup blueprints, build professional websites, create SaaS foundations, and launch faster with AI — all in one platform.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/sign-up">
                <Button size="lg" className="gap-2 text-base">
                  Start Building Free
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="gap-2 text-base">
                <Play className="size-4" />
                View Demo
              </Button>
            </div>
          </motion.div>

          {/* Right: illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:block"
          >
            <FloatingGeometricShapes />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

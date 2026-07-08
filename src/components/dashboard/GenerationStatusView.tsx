import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Card, CardContent } from '@blinkdotnew/ui'
import { Sparkles, Check, Loader2, Clock, ArrowLeft } from 'lucide-react'
import { Link } from '@tanstack/react-router'

/* ─────────────────────────────────────────────
   Timeline steps
   ───────────────────────────────────────────── */

interface TimelineStep {
  id: string
  label: string
}

const TIMELINE_STEPS: TimelineStep[] = [
  { id: 'saving', label: 'Saving Configuration' },
  { id: 'prompt', label: 'Preparing Prompt' },
  { id: 'engine', label: 'Initializing AI Engine' },
  { id: 'response', label: 'Waiting for AI Response' },
]

/* ─────────────────────────────────────────────
   Props
   ───────────────────────────────────────────── */

export interface GenerationStatusViewProps {
  projectId: string
  onDone: () => void
}

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */

export function GenerationStatusView({ projectId, onDone }: GenerationStatusViewProps) {
  const [completedSteps, setCompletedSteps] = useState<number>(0)
  const [progress, setProgress] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    // Step 1: "Saving Configuration" — completes at 25% progress (~1.2s)
    const t1 = setTimeout(() => {
      setCompletedSteps(1)
    }, 1200)

    // Step 1 animation: progress to 25%
    const pInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1.2
        return next >= 25 ? 25 : next
      })
    }, 60)

    // After step 1, progress stays at 25; we keep showing next 3 as pending
    // Simulate the remaining steps staying in "pending" state

    timersRef.current.push(t1)

    // Auto-finish after ~8s — return to workspace (config saved, remaining pending)
    const tFinish = setTimeout(() => {
      clearInterval(pInterval)
      setProgress(100)
      setIsFinished(true)
    }, 8000)

    timersRef.current.push(tFinish)

    return () => {
      timersRef.current.forEach(clearTimeout)
      clearInterval(pInterval)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {/* ── Animated AI Icon ── */}
      <div className="relative mb-10">
        <div className="absolute inset-0 size-24 rounded-full bg-primary/20 blur-2xl animate-pulse" />
        <motion.div
          className="relative size-24 rounded-full bg-primary/10 flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles className="size-11 text-primary" />
        </motion.div>
      </div>

      {/* ── Heading ── */}
      <motion.h2
        className="text-2xl font-bold text-foreground tracking-tight text-center"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {isFinished ? 'Generation Configured!' : 'Preparing your Website Generation...'}
      </motion.h2>
      <motion.p
        className="text-sm text-muted-foreground mt-2 mb-10 text-center max-w-md"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {isFinished
          ? 'Your configuration has been saved. Generation will begin when the AI engine is connected.'
          : 'We are saving your configuration and preparing the generation pipeline.'}
      </motion.p>

      {/* ── Progress bar ── */}
      <div className="w-full max-w-sm mb-8">
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* ── Timeline ── */}
      <Card className="w-full max-w-md border-border bg-card/50">
        <CardContent className="py-5 px-5">
          <div className="space-y-0">
            {TIMELINE_STEPS.map((step, idx) => {
              const isCompleted = idx < completedSteps
              const isCurrent = idx === completedSteps && !isFinished
              const isPending = idx > completedSteps || (isFinished && idx >= completedSteps && idx > 0)

              return (
                <motion.div
                  key={step.id}
                  className="flex items-center gap-4 py-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.15 }}
                >
                  {/* Icon */}
                  <div className="shrink-0 relative">
                    {isCompleted ? (
                      <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="size-4 text-primary" />
                      </div>
                    ) : isCurrent ? (
                      <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Loader2 className="size-4 text-primary animate-spin" />
                      </div>
                    ) : (
                      <div className="size-8 rounded-full bg-muted flex items-center justify-center">
                        <Clock className="size-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Label */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium ${
                        isCompleted
                          ? 'text-foreground'
                          : isCurrent
                            ? 'text-primary'
                            : 'text-muted-foreground'
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>

                  {/* Status badge */}
                  <div className="shrink-0">
                    {isCompleted ? (
                      <span className="text-xs text-primary font-medium">✓</span>
                    ) : isCurrent ? (
                      <span className="text-xs text-primary font-medium animate-pulse">⏳</span>
                    ) : (
                      <span className="text-xs text-muted-foreground">⏳</span>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* ── Return button (shown after "completion") ── */}
      <AnimatePresence>
        {isFinished && (
          <motion.div
            className="mt-8 flex gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Link to="/app/projects/$id" params={{ id: projectId }}>
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="size-4" />
                Back to Project
              </Button>
            </Link>
            <Button onClick={onDone} className="gap-2">
              <Sparkles className="size-4" />
              View Workspace
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

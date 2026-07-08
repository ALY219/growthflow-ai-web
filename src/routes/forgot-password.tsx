import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@blinkdotnew/ui'
import { ArrowLeft } from 'lucide-react'
import { BlinkClientBoundary } from '@/components/BlinkClientBoundary'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/forgot-password')({
  head: () => ({
    meta: [
      { title: 'Reset Password · GrowthFlow AI' },
      { name: 'description', content: 'Reset your GrowthFlow AI account password.' },
    ],
  }),
  component: ForgotPasswordPage,
})

function ForgotPasswordPage() {
  return (
    <BlinkClientBoundary fallback={<ForgotPasswordSkeleton />}>
      <ForgotPasswordContent />
    </BlinkClientBoundary>
  )
}

function ForgotPasswordSkeleton() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </main>
  )
}

function ForgotPasswordContent() {
  const { isLoading, signIn } = useAuth()

  if (isLoading) {
    return <ForgotPasswordSkeleton />
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Reset Your Password</h1>
        <p className="text-sm text-muted-foreground max-w-sm">
          You&apos;ll be redirected to the Blink authentication page where you can reset your
          password securely. Follow the instructions sent to your email.
        </p>
      </div>

      <Button onClick={signIn} size="lg" className="w-full max-w-xs">
        Continue to Reset
      </Button>

      <Link
        to="/sign-in"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to Sign In
      </Link>
    </main>
  )
}

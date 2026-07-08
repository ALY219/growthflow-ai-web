import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@blinkdotnew/ui'
import { useEffect } from 'react'
import { BlinkClientBoundary } from '@/components/BlinkClientBoundary'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/sign-up')({
  head: () => ({
    meta: [
      { title: 'Sign Up · GrowthFlow AI' },
      { name: 'description', content: 'Create your GrowthFlow AI account and start building.' },
    ],
  }),
  component: SignUpPage,
})

function SignUpPage() {
  return (
    <BlinkClientBoundary fallback={<SignUpSkeleton />}>
      <SignUpContent />
    </BlinkClientBoundary>
  )
}

function SignUpSkeleton() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </main>
  )
}

function SignUpContent() {
  const { user, isLoading, isAuthenticated, signIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/app' })
    }
  }, [isAuthenticated, navigate])

  if (isLoading) {
    return <SignUpSkeleton />
  }

  if (isAuthenticated) return null

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
        <p className="text-sm text-muted-foreground max-w-sm">
          Create your GrowthFlow AI account and start transforming your ideas into real startups.
        </p>
      </div>

      <Button onClick={signIn} size="lg" className="w-full max-w-xs">
        Continue with Email
      </Button>

      <p className="text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link to="/sign-in" className="text-primary hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </main>
  )
}

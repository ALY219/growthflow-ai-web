import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@blinkdotnew/ui'
import { useEffect } from 'react'
import { BlinkClientBoundary } from '@/components/BlinkClientBoundary'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/sign-in')({
  head: () => ({
    meta: [
      { title: 'Sign In · GrowthFlow AI' },
      { name: 'description', content: 'Sign in to your GrowthFlow AI account.' },
    ],
  }),
  component: SignInPage,
})

function SignInPage() {
  return (
    <BlinkClientBoundary fallback={<SignInSkeleton />}>
      <SignInContent />
    </BlinkClientBoundary>
  )
}

function SignInSkeleton() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </main>
  )
}

function SignInContent() {
  const { isAuthenticated, isLoading, signIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/app' })
    }
  }, [isAuthenticated, navigate])

  if (isLoading) {
    return <SignInSkeleton />
  }

  if (isAuthenticated) return null

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome Back</h1>
        <p className="text-sm text-muted-foreground max-w-sm">
          Sign in to your GrowthFlow AI account and continue building.
        </p>
      </div>

      <Button onClick={signIn} size="lg" className="w-full max-w-xs">
        Sign In with Email
      </Button>

      <div className="flex flex-col gap-1 text-sm text-muted-foreground">
        <p>
          Don&apos;t have an account?{' '}
          <Link to="/sign-up" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
        <p>
          <Link to="/forgot-password" className="text-primary hover:underline font-medium">
            Forgot your password?
          </Link>
        </p>
      </div>
    </main>
  )
}

import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Sparkles } from 'lucide-react'
import { Button, Input } from '@blinkdotnew/ui'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/forgot-password')({
  head: () => ({ meta: [{ title: 'Forgot Password · GrowthFlow AI' }] }),
  component: ForgotPasswordPage,
})

function ForgotPasswordPage() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await resetPassword(email)
    setLoading(false)
    if (error) { setError(error) } else { setSent(true) }
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex size-12 items-center justify-center rounded-xl bg-primary mb-4"><Sparkles className="size-6 text-primary-foreground" /></div>
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-sm text-muted-foreground mt-2">We'll send you a reset link</p>
        </div>
        {sent ? (
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground mb-4">If an account exists for {email}, you'll receive a password reset link shortly.</p>
            <Link to="/sign-in"><Button variant="outline" className="w-full">Back to Sign In</Button></Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-card p-6">
            {error && (<div className="rounded-lg bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive">{error}</div>)}
            <div className="space-y-2">
              <label htmlFor="forgot-email" className="text-sm font-medium">Email</label>
              <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" /><Input id="forgot-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="pl-9" required /></div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Sending...' : 'Send Reset Link'}</Button>
            <p className="text-sm text-muted-foreground text-center"><Link to="/sign-in" className="text-muted-foreground hover:text-foreground">Back to sign in</Link></p>
          </form>
        )}
      </motion.div>
    </div>
  )
}

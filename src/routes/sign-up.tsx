import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Mail, Lock } from 'lucide-react'
import { Button, Input } from '@blinkdotnew/ui'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/sign-up')({
  head: () => ({ meta: [{ title: 'Sign Up · GrowthFlow AI' }] }),
  component: SignUpPage,
})

function SignUpPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await signUp(email, password)
    setLoading(false)
    if (error) { setError(error) } else { navigate({ to: '/app' }) }
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex size-12 items-center justify-center rounded-xl bg-primary mb-4"><Sparkles className="size-6 text-primary-foreground" /></div>
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-sm text-muted-foreground mt-2">Start generating websites with AI</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-card p-6">
          {error && (<div className="rounded-lg bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive">{error}</div>)}
          <div className="space-y-2">
            <label htmlFor="sign-up-email" className="text-sm font-medium">Email</label>
            <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" /><Input id="sign-up-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="pl-9" required /></div>
          </div>
          <div className="space-y-2">
            <label htmlFor="sign-up-password" className="text-sm font-medium">Password</label>
            <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" /><Input id="sign-up-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-9" required minLength={6} /></div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Creating account...' : 'Create Account'}</Button>
          <p className="text-sm text-muted-foreground text-center">Already have an account? <Link to="/sign-in" className="text-primary font-medium hover:underline">Sign in</Link></p>
        </form>
      </motion.div>
    </div>
  )
}

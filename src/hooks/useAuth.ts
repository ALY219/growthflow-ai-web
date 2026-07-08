import { useState, useEffect, useCallback } from 'react'
import { blink } from '@/blink/client'
import type { BlinkUser } from '@blinkdotnew/sdk'

export interface UserState {
  id: string
  email: string
  displayName: string
  avatarUrl?: string
}

function mapUser(u: BlinkUser | null): UserState | null {
  if (!u) return null
  return {
    id: u.id,
    email: u.email ?? '',
    displayName: u.displayName ?? u.email?.split('@')[0] ?? 'User',
    avatarUrl: u.avatar ?? undefined,
  }
}

export function useAuth() {
  const [user, setUser] = useState<UserState | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(mapUser(state.user))
      // CRITICAL: only set false, never reset to true
      if (!state.isLoading) setIsLoading(false)
    })
    return unsubscribe
  }, [])

  const signIn = useCallback(() => blink.auth.login(), [])
  const signOut = useCallback(() => blink.auth.logout(), [])
  const isAuthenticated = !!user

  return { user, isLoading, isAuthenticated, signIn, signOut }
}

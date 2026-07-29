import '@/index.css'
import { StrictMode, startTransition } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/react-start/client'
import { createRouter } from '@/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BlinkUIProvider, Toaster } from '@blinkdotnew/ui'
import { AuthProvider } from '@/hooks/useAuth'

const router = createRouter()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
})

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BlinkUIProvider>
          <AuthProvider>
            <StartClient />
            <Toaster />
          </AuthProvider>
        </BlinkUIProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
})

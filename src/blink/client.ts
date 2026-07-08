import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID || 'growthflow-ai-saas-kkeg14mp',
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY || 'blnk_pk_xx0cEuGqfsIc79Lbugv-TlWFRiPd7YbQ',
  authRequired: false,
  auth: { mode: 'managed' },
})

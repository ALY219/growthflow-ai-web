import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          user_id: string | null
          name: string
          description: string | null
          type: string
          status: string
          data: Record<string, unknown> | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          description?: string | null
          type?: string
          status?: string
          data?: Record<string, unknown> | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<{
          name: string
          description: string | null
          type: string
          status: string
          data: Record<string, unknown> | null
          updated_at: string
        }>
      }
      generation_jobs: {
        Row: {
          id: string
          project_id: string
          user_id: string | null
          config: Record<string, unknown>
          status: string
          generation_type: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          user_id?: string | null
          config?: Record<string, unknown>
          status?: string
          generation_type?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<{
          config: Record<string, unknown>
          status: string
          generation_type: string
          updated_at: string
        }>
      }
    }
  }
}

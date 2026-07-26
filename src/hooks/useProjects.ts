import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { GenerationConfig } from '@/lib/generation-types'

export interface Project {
  id: string
  userId: string
  name: string
  description: string
  type: string
  status: string
  data: string
  createdAt: string
  updatedAt: string
}

export type ProjectType = 'website' | 'saas' | 'landing-page' | 'dashboard'
export type ProjectStatus = 'draft' | 'building' | 'completed' | 'archived'
export type ProjectIndustry = 'technology' | 'education' | 'healthcare' | 'fitness' | 'finance' | 'e-commerce' | 'ai' | 'portfolio' | 'other'
export type ProjectTheme = 'dark' | 'light' | 'auto'
export type ProjectTargetAudience = 'students' | 'businesses' | 'startups' | 'creators' | 'developers' | 'other'

export interface CreateProjectInput {
  name: string
  description: string
  type: ProjectType
  userId: string
  industry: ProjectIndustry
  theme: ProjectTheme
  targetAudience: ProjectTargetAudience
}

// ── Generation Job ──
export interface GenerationJob {
  id: string
  projectId: string
  userId: string
  config: string
  status: 'pending' | 'in-progress' | 'completed' | 'failed'
  generationType: 'website'
  createdAt: string
  updatedAt: string
}

export interface CreateGenerationJobInput {
  projectId: string
  userId: string
  config: GenerationConfig
}

// ── Supabase row shapes ──
interface ProjectRow {
  id: string
  user_id: string
  name: string
  description: string
  type: string
  status: string
  data: Record<string, unknown>
  created_at: string
  updated_at: string
}

interface GenerationJobRow {
  id: string
  project_id: string
  user_id: string
  config: Record<string, unknown>
  status: string
  generation_type: string
  created_at: string
  updated_at: string
}

function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    description: row.description ?? '',
    type: row.type,
    status: row.status,
    data: JSON.stringify(row.data ?? {}),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function mapJob(row: GenerationJobRow): GenerationJob {
  return {
    id: row.id,
    projectId: row.project_id,
    userId: row.user_id,
    config: JSON.stringify(row.config ?? {}),
    status: row.status as GenerationJob['status'],
    generationType: row.generation_type as GenerationJob['generationType'],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function useProjects(userId?: string) {
  return useQuery<Project[]>({
    queryKey: ['projects', userId],
    queryFn: async () => {
      if (!userId) return []
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      if (error) throw error
      return (data as ProjectRow[]).map(mapProject)
    },
    enabled: !!userId,
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation<Project, Error, CreateProjectInput>({
    mutationFn: async (input) => {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          name: input.name,
          description: input.description,
          type: input.type,
          user_id: input.userId,
          status: 'draft',
          data: {
            industry: input.industry,
            theme: input.theme,
            targetAudience: input.targetAudience,
          },
        })
        .select()
        .single()
      if (error) throw error
      return mapProject(data as ProjectRow)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

export function useCreateGenerationJob() {
  const queryClient = useQueryClient()

  return useMutation<GenerationJob, Error, CreateGenerationJobInput>({
    mutationFn: async (input) => {
      const { data, error } = await supabase
        .from('generation_jobs')
        .insert({
          project_id: input.projectId,
          user_id: input.userId,
          config: input.config,
          status: 'pending',
          generation_type: 'website',
        })
        .select()
        .single()
      if (error) throw error
      return mapJob(data as GenerationJobRow)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['generation-jobs'] })
    },
  })
}

export function parseProjectData(project: Project): { industry?: string; theme?: string; targetAudience?: string } {
  try {
    return JSON.parse(project.data || '{}')
  } catch {
    return {}
  }
}

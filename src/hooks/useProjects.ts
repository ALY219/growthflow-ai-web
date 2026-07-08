import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { blink } from '@/blink/client'
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
  config: string // JSON string of GenerationConfig
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

const projectsTable = blink.db.table<Project>('projects')
const generationJobsTable = blink.db.table<GenerationJob>('generation_jobs')

export function useProjects(userId?: string) {
  return useQuery<Project[]>({
    queryKey: ['projects', userId],
    queryFn: async () => {
      if (!userId) return []
      const result = await projectsTable.list({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      })
      return result
    },
    enabled: !!userId,
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation<Project, Error, CreateProjectInput>({
    mutationFn: async (input) => {
      const project = await projectsTable.create({
        name: input.name,
        description: input.description,
        type: input.type,
        userId: input.userId,
        status: 'draft',
        data: JSON.stringify({
          industry: input.industry,
          theme: input.theme,
          targetAudience: input.targetAudience,
        }),
      } as unknown as Project)
      return project
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await projectsTable.delete(id)
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
      const job = await generationJobsTable.create({
        projectId: input.projectId,
        userId: input.userId,
        config: JSON.stringify(input.config),
        status: 'pending',
        generationType: 'website',
      } as unknown as GenerationJob)
      return job
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

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { GenerationConfig } from '@/lib/generation-types'

export interface Project {
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

export function useProjects(userId?: string) {
  return useQuery<Project[]>({
    queryKey: ['projects', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data ?? []
    },
    enabled: !!userId,
  })
}

export function useCreateProject() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: { name: string; description?: string; userId: string }) => {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          name: input.name,
          description: input.description ?? '',
          user_id: input.userId,
          type: 'website',
          status: 'draft',
        })
        .select()
        .single()
      if (error) throw error
      return data
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  })
}

export function useDeleteProject() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('projects').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  })
}

export interface GenerationJob {
  id: string
  project_id: string
  user_id: string | null
  config: Record<string, unknown>
  status: string
  generation_type: string
  created_at: string
  updated_at: string
}

export function useGenerationJobs(projectId?: string) {
  const [hasActive, setHasActive] = useState(false)
  const query = useQuery<GenerationJob[]>({
    queryKey: ['generation-jobs', projectId],
    queryFn: async () => {
      let q = supabase.from('generation_jobs').select('*')
      if (projectId) q = q.eq('project_id', projectId)
      q = q.order('created_at', { ascending: false })
      const { data, error } = await q
      if (error) throw error
      return data ?? []
    },
    enabled: !!projectId,
    refetchInterval: hasActive ? 3000 : false,
  })

  useEffect(() => {
    const jobs = query.data ?? []
    setHasActive(jobs.some((j) => j.status === 'pending' || j.status === 'generating'))
  }, [query.data])

  return query
}

export interface CreateGenerationJobInput {
  projectId: string
  userId: string
  config: GenerationConfig
}

export function useCreateGenerationJob() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: CreateGenerationJobInput) => {
      const { data: existing } = await supabase
        .from('generation_jobs')
        .select('id, status')
        .eq('project_id', input.projectId)
        .in('status', ['pending', 'generating'])
        .order('created_at', { ascending: false })
        .limit(1)
      if (existing && existing.length > 0) {
        return existing[0]
      }
      const { data, error } = await supabase
        .from('generation_jobs')
        .insert({
          project_id: input.projectId,
          user_id: input.userId,
          config: input.config as unknown as Record<string, unknown>,
          status: 'pending',
          generation_type: 'website',
        })
        .select()
        .single()
      if (error) throw error
      return data
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['generation-jobs'] }),
  })
}

export function useUpdateGenerationJob() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: {
      id: string
      status: string
      config?: Record<string, unknown>
    }) => {
      const update: Record<string, unknown> = {
        status: input.status,
        updated_at: new Date().toISOString(),
      }
      if (input.config) update.config = input.config
      const { data, error } = await supabase
        .from('generation_jobs')
        .update(update)
        .eq('id', input.id)
        .select()
        .single()
      if (error) throw error
      return data
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['generation-jobs'] }),
  })
}

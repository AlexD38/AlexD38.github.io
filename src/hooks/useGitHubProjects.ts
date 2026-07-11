import { useEffect, useState } from 'react'
import { fetchGitHubProjects } from '../services/github'
import type { Project } from '../types/project'

interface UseGitHubProjectsResult {
  projects: Project[]
  loading: boolean
  source: 'live' | 'fallback' | null
  retry: () => void
}

export function useGitHubProjects(): UseGitHubProjectsResult {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState<'live' | 'fallback' | null>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)

      const result = await fetchGitHubProjects()
      if (cancelled) return

      setProjects(result.projects)
      setSource(result.source)
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [attempt])

  return {
    projects,
    loading,
    source,
    retry: () => setAttempt((n) => n + 1),
  }
}

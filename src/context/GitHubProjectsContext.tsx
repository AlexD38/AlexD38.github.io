import { createContext, useContext, type ReactNode } from 'react'
import { useGitHubProjects } from '../hooks/useGitHubProjects'
import type { Project } from '../types/project'

interface GitHubProjectsContextValue {
  projects: Project[]
  loading: boolean
  source: 'live' | 'fallback' | null
  retry: () => void
}

const GitHubProjectsContext = createContext<GitHubProjectsContextValue | null>(null)

export function GitHubProjectsProvider({ children }: { children: ReactNode }) {
  const value = useGitHubProjects()
  return (
    <GitHubProjectsContext.Provider value={value}>
      {children}
    </GitHubProjectsContext.Provider>
  )
}

export function useGitHubProjectsContext(): GitHubProjectsContextValue {
  const context = useContext(GitHubProjectsContext)
  if (!context) {
    throw new Error('useGitHubProjectsContext must be used within GitHubProjectsProvider')
  }
  return context
}

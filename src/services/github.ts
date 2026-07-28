import { github } from '../data/portfolio'
import fallbackData from '../data/repos.generated.json'
import type { Project } from '../types/project'

/** Repos that should not appear in the projects grid (this site itself). */
const EXCLUDED_REPOS = new Set(['AlexD38.github.io', 'portfolio'])

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  topics?: string[]
  fork: boolean
}

function isIncludedRepo(repo: Pick<GitHubRepo, 'name' | 'fork'>): boolean {
  return !repo.fork && !EXCLUDED_REPOS.has(repo.name)
}

export interface GitHubProjectsResult {
  projects: Project[]
  source: 'live' | 'fallback'
}

function formatTitle(name: string): string {
  return name
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function formatDescription(repo: GitHubRepo): string {
  if (repo.description?.trim()) return repo.description.trim()
  return `Open source project — ${formatTitle(repo.name)}.`
}

function getTags(repo: GitHubRepo): string[] {
  if (repo.topics && repo.topics.length > 0) return repo.topics.slice(0, 4)
  if (repo.language) return [repo.language]
  return []
}

function mapRepoToProject(repo: GitHubRepo): Project {
  return {
    id: repo.id,
    title: formatTitle(repo.name),
    description: formatDescription(repo),
    tags: getTags(repo),
    url: repo.homepage?.trim() || null,
    github: repo.html_url,
    featured: false,
  }
}

function githubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }

  const token = import.meta.env.VITE_GITHUB_TOKEN
  if (token) headers.Authorization = `Bearer ${token}`

  return headers
}

function getFallback(): GitHubProjectsResult {
  return {
    projects: fallbackData.projects.filter(
      (project) =>
        !EXCLUDED_REPOS.has(project.github.split('/').pop() ?? ''),
    ),
    source: 'fallback',
  }
}

async function fetchFromGitHub(): Promise<Project[]> {
  const res = await fetch(
    `https://api.github.com/users/${github.username}/repos?per_page=100&sort=updated&type=owner`,
    { headers: githubHeaders() },
  )

  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}`)
  }

  const repos = (await res.json()) as GitHubRepo[]

  return repos
    .filter(isIncludedRepo)
    .map(mapRepoToProject)
    .sort((a, b) => b.id - a.id)
    .map((project, index) => ({
      ...project,
      featured: index < 2,
    }))
}

export async function fetchGitHubProjects(): Promise<GitHubProjectsResult> {
  try {
    const projects = await fetchFromGitHub()
    return { projects, source: 'live' }
  } catch {
    return getFallback()
  }
}

import { writeFileSync, existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const USERNAME = 'AlexD38'
/** Repos that should not appear in the projects grid (this site itself). */
const EXCLUDED_REPOS = new Set(['AlexD38.github.io', 'portfolio'])
const OUTPUT = join(dirname(fileURLToPath(import.meta.url)), '../src/data/repos.generated.json')

function formatTitle(name) {
  return name
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function formatDescription(repo) {
  if (repo.description?.trim()) return repo.description.trim()
  return `Open source project — ${formatTitle(repo.name)}.`
}

function getTags(repo) {
  if (repo.topics?.length > 0) return repo.topics.slice(0, 4)
  if (repo.language) return [repo.language]
  return []
}

function mapRepoToProject(repo, index) {
  return {
    id: repo.id,
    title: formatTitle(repo.name),
    description: formatDescription(repo),
    tags: getTags(repo),
    url: repo.homepage?.trim() || null,
    github: repo.html_url,
    featured: index < 2,
  }
}

function readExisting() {
  if (!existsSync(OUTPUT)) return null
  try {
    return JSON.parse(readFileSync(OUTPUT, 'utf8'))
  } catch {
    return null
  }
}

async function fetchRepos() {
  const token = process.env.GITHUB_TOKEN ?? process.env.VITE_GITHUB_TOKEN
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated&type=owner`,
    { headers },
  )

  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}: ${await res.text()}`)
  }

  const repos = await res.json()
  const projects = repos
    .filter((repo) => !repo.fork && !EXCLUDED_REPOS.has(repo.name))
    .sort((a, b) => b.id - a.id)
    .map(mapRepoToProject)

  const payload = {
    fetchedAt: new Date().toISOString(),
    username: USERNAME,
    projects,
  }

  writeFileSync(OUTPUT, `${JSON.stringify(payload, null, 2)}\n`)
  console.log(`✓ ${projects.length} repo(s) written to src/data/repos.generated.json`)
}

try {
  await fetchRepos()
} catch (err) {
  const existing = readExisting()
  if (existing?.projects?.length) {
    console.warn(`⚠ ${err.message}`)
    console.warn(`→ Keeping existing file (${existing.projects.length} project(s))`)
    process.exit(0)
  }
  console.error(`✗ ${err.message}`)
  process.exit(1)
}

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowDown,
  faArrowUpRightFromSquare,
  faBars,
  faDatabase,
  faRotate,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import {
  faCss3Alt,
  faDocker,
  faGithub,
  faJs,
  faLinkedinIn,
  faNodeJs,
  faPython,
  faReact,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons'

export const icons = {
  github: faGithub,
  linkedin: faLinkedinIn,
  twitter: faXTwitter,
  menu: faBars,
  close: faXmark,
  arrowDown: faArrowDown,
  external: faArrowUpRightFromSquare,
  spinner: faRotate,
} as const

const skillIconMap: Record<string, IconDefinition> = {
  React: faReact,
  TypeScript: faJs,
  'Node.js': faNodeJs,
  Python: faPython,
  CSS: faCss3Alt,
  PostgreSQL: faDatabase,
  Docker: faDocker,
}

export function getSocialIcon(key: string): IconDefinition {
  if (key === 'github') return icons.github
  if (key === 'linkedin') return icons.linkedin
  if (key === 'twitter') return icons.twitter
  return icons.github
}

export function getSkillIcon(name: string): IconDefinition | null {
  return skillIconMap[name] ?? null
}

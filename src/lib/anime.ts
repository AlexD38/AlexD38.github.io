export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const animeDefaults = {
  ease: 'outExpo' as const,
  duration: 800,
}

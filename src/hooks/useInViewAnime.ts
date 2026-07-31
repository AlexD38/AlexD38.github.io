import { useEffect, useRef, useState } from 'react'

export function useInViewOnce<T extends HTMLElement = HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.2 },
) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  const optionsRef = useRef(options)
  optionsRef.current = options

  useEffect(() => {
    const node = ref.current
    if (!node || inView) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, optionsRef.current)

    observer.observe(node)
    return () => observer.disconnect()
  }, [inView])

  return { ref, inView }
}

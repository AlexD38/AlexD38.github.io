import { useEffect, useRef } from 'react'
import { animate } from 'animejs'
import { about } from '../data/portfolio'
import { useGitHubProjectsContext } from '../context/GitHubProjectsContext'
import { useInViewOnce } from '../hooks/useInViewAnime'
import { prefersReducedMotion } from '../lib/anime'

type ParsedStat = { end: number; suffix: string } | { static: string }

function parseStatValue(value: string): ParsedStat {
  if (value === '∞' || value === '—' || value.trim() === '') {
    return { static: value || '—' }
  }
  const match = value.match(/^(\d+)(.*)$/)
  if (!match) return { static: value }
  return { end: Number(match[1]), suffix: match[2] ?? '' }
}

function initialStatText(value: string): string {
  const parsed = parseStatValue(value)
  if ('static' in parsed) return parsed.static
  return `0${parsed.suffix}`
}

export default function About() {
  const { ref, inView } = useInViewOnce<HTMLElement>({ threshold: 0.25 })
  const { projects } = useGitHubProjectsContext()
  const valuesRef = useRef<(HTMLSpanElement | null)[]>([])

  const highlights = [
    { label: 'Projects', value: projects.length > 0 ? String(projects.length) : '—' },
    ...about.highlights,
  ]

  useEffect(() => {
    if (!inView) return
    const reduce = prefersReducedMotion()

    highlights.forEach((item, i) => {
      const el = valuesRef.current[i]
      if (!el) return
      const parsed = parseStatValue(item.value)

      if ('static' in parsed) {
        el.textContent = parsed.static
        return
      }

      if (reduce) {
        el.textContent = `${parsed.end}${parsed.suffix}`
        return
      }

      const counter = { n: 0 }
      animate(counter, {
        n: parsed.end,
        duration: 1300,
        ease: 'outCubic',
        modifier: Math.round,
        onRender: () => {
          el.textContent = `${counter.n}${parsed.suffix}`
        },
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- animate once when section enters view
  }, [inView, projects.length])

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="container">
        <div>
          <h2 className="section-title">About</h2>
          <p className="section-subtitle">Why I build these projects.</p>
        </div>

        <div className="about__grid">
          <div className="about__text">
            {about.description.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="about__stats">
            {highlights.map((item, i) => (
              <div key={item.label} className="about__stat">
                <span
                  className="about__stat-value"
                  ref={(node) => {
                    valuesRef.current[i] = node
                  }}
                >
                  {initialStatText(item.value)}
                </span>
                <span className="about__stat-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .about {
          background: linear-gradient(180deg, transparent 0%, rgba(16, 18, 24, 0.85) 40%, transparent 100%);
        }
        .about__grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 64px;
          align-items: start;
        }
        .about__text p {
          color: var(--text);
          margin-bottom: 18px;
          font-size: 1.05rem;
          line-height: 1.8;
        }
        .about__text p:last-child {
          margin-bottom: 0;
        }
        .about__stats {
          display: flex;
          flex-direction: column;
          gap: 28px;
          padding-top: 8px;
          border-left: 1px solid var(--border);
          padding-left: 36px;
        }
        .about__stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .about__stat-value {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 4vw, 3.4rem);
          font-weight: 600;
          letter-spacing: -0.04em;
          line-height: 1;
          color: var(--accent);
          font-variant-numeric: tabular-nums;
        }
        .about__stat-label {
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        @media (max-width: 768px) {
          .about__grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .about__stats {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 24px 40px;
            border-left: none;
            border-top: 1px solid var(--border);
            padding-left: 0;
            padding-top: 28px;
          }
        }
      `}</style>
    </section>
  )
}

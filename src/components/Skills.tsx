import { useEffect, type CSSProperties } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { animate, set } from 'animejs'
import { skills } from '../data/portfolio'
import { useInViewOnce } from '../hooks/useInViewAnime'
import { prefersReducedMotion } from '../lib/anime'
import { getSkillIcon } from '../lib/icons'

function SkillChip({ skill }: { skill: string }) {
  const icon = getSkillIcon(skill)
  return (
    <span className="skills__chip">
      {icon && (
        <span className="skills__icon" aria-hidden>
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
      <span className="skills__name">{skill}</span>
    </span>
  )
}

function MarqueeRow({
  items,
  reverse = false,
  duration,
}: {
  items: string[]
  reverse?: boolean
  duration: string
}) {
  const loop = [...items, ...items]
  return (
    <div
      className={`skills__row ${reverse ? 'skills__row--reverse' : ''}`}
      style={{ '--marquee-duration': duration } as CSSProperties}
    >
      <div className="skills__track">
        {loop.map((skill, i) => (
          <SkillChip key={`${skill}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const { ref, inView } = useInViewOnce<HTMLElement>({ threshold: 0.2 })
  const reduce = prefersReducedMotion()
  const rowB = [...skills].reverse()

  useEffect(() => {
    if (!inView || !ref.current) return
    const heading = ref.current.querySelectorAll<HTMLElement>('[data-skills-heading]')
    const bands = ref.current.querySelectorAll<HTMLElement>('[data-skills-band]')

    if (prefersReducedMotion()) {
      set([heading, bands], { opacity: 1, translateY: 0 })
      return
    }

    set(heading, { opacity: 0, translateY: 20 })
    set(bands, { opacity: 0, translateY: 24 })

    animate(heading, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 650,
      ease: 'outExpo',
    })

    animate(bands, {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 900,
      delay: 120,
      ease: 'outExpo',
    })
  }, [inView, ref])

  return (
    <section id="skills" className="section skills" ref={ref}>
      <div className="container">
        <div className="skills__header" data-skills-heading>
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">Technologies used across my projects.</p>
        </div>
      </div>

      {reduce ? (
        <div className="skills__static" data-skills-band>
          {skills.map((skill) => (
            <SkillChip key={skill} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="skills__marquee" data-skills-band aria-hidden="true">
          <MarqueeRow items={skills} duration="38s" />
          <MarqueeRow items={rowB} reverse duration="46s" />
        </div>
      )}

      {!reduce && (
        <ul className="skills__sr">
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      )}

      <style>{`
        .skills {
          overflow: hidden;
        }
        .skills__header {
          text-align: center;
          margin-bottom: 48px;
        }
        .skills__header .section-subtitle {
          margin-left: auto;
          margin-right: auto;
        }
        .skills__marquee {
          display: flex;
          flex-direction: column;
          gap: 18px;
          mask-image: linear-gradient(
            90deg,
            transparent 0%,
            #000 12%,
            #000 88%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0%,
            #000 12%,
            #000 88%,
            transparent 100%
          );
        }
        .skills__row {
          overflow: hidden;
          width: 100%;
        }
        .skills__track {
          display: flex;
          width: max-content;
          gap: 14px;
          padding-inline: 7px;
          animation: skills-marquee var(--marquee-duration, 40s) linear infinite;
          will-change: transform;
        }
        .skills__row--reverse .skills__track {
          animation-direction: reverse;
        }
        .skills__marquee:hover .skills__track {
          animation-play-state: paused;
        }
        .skills__static {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          max-width: var(--max-width);
          margin-inline: auto;
          padding-inline: 24px;
        }
        .skills__chip {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
          padding: 14px 22px;
          font-weight: 600;
          font-size: 1rem;
          letter-spacing: -0.02em;
          color: var(--text-heading);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          background: rgba(21, 24, 33, 0.72);
          white-space: nowrap;
        }
        .skills__icon {
          font-size: 1.1rem;
          color: var(--accent);
        }
        .skills__name {
          letter-spacing: -0.01em;
        }
        .skills__sr {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        @keyframes skills-marquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        @media (max-width: 768px) {
          .skills__header {
            margin-bottom: 36px;
          }
          .skills__chip {
            padding: 12px 18px;
            font-size: 0.95rem;
          }
          .skills__marquee {
            gap: 12px;
            mask-image: linear-gradient(
              90deg,
              transparent 0%,
              #000 8%,
              #000 92%,
              transparent 100%
            );
            -webkit-mask-image: linear-gradient(
              90deg,
              transparent 0%,
              #000 8%,
              #000 92%,
              transparent 100%
            );
          }
        }
      `}</style>
    </section>
  )
}

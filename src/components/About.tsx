import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { about } from '../data/portfolio'
import { useGitHubProjectsContext } from '../context/GitHubProjectsContext'

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { projects } = useGitHubProjectsContext()

  const highlights = [
    { label: 'Projects', value: projects.length > 0 ? String(projects.length) : '—' },
    ...about.highlights,
  ]

  return (
    <section id="about" className="section about">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About</h2>
          <p className="section-subtitle">
            Why I build these projects.
          </p>
        </motion.div>

        <div className="about__grid">
          <motion.div
            className="about__text"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {about.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>

          <motion.div
            className="about__stats"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                className="about__stat"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              >
                <span className="about__stat-value gradient-text">{item.value}</span>
                <span className="about__stat-label">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        .about__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .about__text p {
          color: var(--text);
          margin-bottom: 16px;
          line-height: 1.8;
        }
        .about__text p:last-child {
          margin-bottom: 0;
        }
        .about__stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .about__stat {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px 20px;
          text-align: center;
          transition: border-color 0.3s, transform 0.3s;
        }
        .about__stat:hover {
          border-color: var(--border-hover);
          transform: translateY(-4px);
        }
        .about__stat-value {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }
        .about__stat-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.4;
        }
        @media (max-width: 768px) {
          .about__grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .about__stats {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 480px) {
          .about__stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

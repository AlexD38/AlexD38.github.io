import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { skills } from '../data/portfolio'

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="section skills">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">
            Technologies used across my projects.
          </p>
        </motion.div>

        <div className="skills__grid">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="skills__item"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              <div className="skills__header">
                <span className="skills__name">{skill.name}</span>
                <span className="skills__level">{skill.level}%</span>
              </div>
              <div className="skills__bar">
                <motion.div
                  className="skills__fill"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: 0.3 + i * 0.08, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .skills {
          background: var(--bg-elevated);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .skills__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .skills__item {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px;
          transition: border-color 0.3s;
        }
        .skills__item:hover {
          border-color: var(--border-hover);
        }
        .skills__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .skills__name {
          font-weight: 500;
          color: var(--text-heading);
          font-size: 0.95rem;
        }
        .skills__level {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-variant-numeric: tabular-nums;
        }
        .skills__bar {
          height: 6px;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 100px;
          overflow: hidden;
        }
        .skills__fill {
          height: 100%;
          background: var(--gradient);
          border-radius: 100px;
        }
        @media (max-width: 768px) {
          .skills__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

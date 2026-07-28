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

        <ul className="skills__grid">
          {skills.map((skill, i) => (
            <motion.li
              key={skill}
              className="skills__item"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 + i * 0.04 }}
            >
              {skill}
            </motion.li>
          ))}
        </ul>
      </div>

      <style>{`
        .skills {
          background: var(--bg-elevated);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .skills__grid {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 12px;
        }
        .skills__item {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 56px;
          padding: 14px 16px;
          text-align: center;
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--text-heading);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          transition: border-color 0.25s, color 0.25s, background 0.25s;
        }
        .skills__item:hover {
          border-color: var(--accent);
          color: var(--accent-light);
          background: var(--accent-glow);
        }
      `}</style>
    </section>
  )
}

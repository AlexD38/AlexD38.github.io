import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, MapPin } from 'lucide-react'
import { personal, socials } from '../data/portfolio'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="links" className="section contact">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Links</h2>
          <p className="section-subtitle">
            Find my projects online or reach out if you&apos;d like to connect.
          </p>
        </motion.div>

        <motion.div
          className="contact__content"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="contact__intro">
            This portfolio is a showcase of what I build.
            The links below lead to source code and my online profiles.
          </p>

          <div className="contact__details">
            <a href={`mailto:${personal.email}`} className="contact__detail">
              <Mail size={20} />
              <span>{personal.email}</span>
            </a>
            <div className="contact__detail">
              <MapPin size={20} />
              <span>{personal.location}</span>
            </div>
          </div>

          <div className="contact__socials">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social"
              >
                {s.name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .contact {
          background: var(--bg-elevated);
          border-top: 1px solid var(--border);
        }
        .contact__content {
          max-width: 560px;
        }
        .contact__intro {
          color: var(--text);
          line-height: 1.8;
          margin-bottom: 32px;
        }
        .contact__details {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }
        .contact__detail {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-muted);
          font-size: 0.95rem;
          transition: color 0.2s;
        }
        a.contact__detail:hover {
          color: var(--accent-light);
        }
        .contact__detail svg {
          color: var(--accent-light);
          flex-shrink: 0;
        }
        .contact__socials {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .contact__social {
          padding: 10px 20px;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.25s;
        }
        .contact__social:hover {
          color: var(--accent-light);
          border-color: var(--accent);
          background: var(--accent-glow);
        }
      `}</style>
    </section>
  )
}

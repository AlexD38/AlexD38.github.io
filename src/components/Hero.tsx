import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Code, Globe, Mail } from 'lucide-react'
import { personal, socials } from '../data/portfolio'

const iconMap: Record<string, ReactNode> = {
  github: <Code size={20} />,
  linkedin: <Globe size={20} />,
  twitter: <Mail size={20} />,
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' as const },
  }),
}

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__glow" />
      <div className="container hero__content">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="hero__badge"
        >
          Personal portfolio
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="hero__title"
        >
          Hi, I&apos;m{' '}
          <span className="gradient-text">{personal.name}</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="hero__role"
        >
          {personal.title}
        </motion.p>

        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="hero__tagline"
        >
          {personal.tagline}
        </motion.p>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="hero__actions"
        >
          <a href="#projects" className="btn btn-primary">
            View my projects
          </a>
        </motion.div>

        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="hero__socials"
        >
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label={s.name}
            >
              {iconMap[s.icon]}
            </a>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#projects"
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.a>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: var(--nav-height);
          overflow: hidden;
        }
        .hero__glow {
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero__content {
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 100px;
          border: 1px solid var(--border);
          background: var(--bg-elevated);
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 32px;
        }
        .hero__title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 700;
          color: var(--text-heading);
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 16px;
        }
        .hero__role {
          font-size: clamp(1.1rem, 2.5vw, 1.35rem);
          color: var(--accent-light);
          font-weight: 500;
          margin-bottom: 20px;
        }
        .hero__tagline {
          font-size: 1.05rem;
          color: var(--text-muted);
          max-width: 540px;
          margin: 0 auto 40px;
          line-height: 1.7;
        }
        .hero__actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }
        .hero__socials {
          display: flex;
          gap: 12px;
          justify-content: center;
        }
        .hero__social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: 1px solid var(--border);
          color: var(--text-muted);
          transition: all 0.25s;
        }
        .hero__social-link:hover {
          color: var(--accent-light);
          border-color: var(--accent);
          background: var(--accent-glow);
          transform: translateY(-2px);
        }
        .hero__scroll {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          color: var(--text-muted);
          transition: color 0.2s;
        }
        .hero__scroll:hover {
          color: var(--text-heading);
        }
      `}</style>
    </section>
  )
}

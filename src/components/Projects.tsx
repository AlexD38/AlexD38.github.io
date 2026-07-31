import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { animate, set, stagger } from 'animejs'
import { useGitHubProjectsContext } from '../context/GitHubProjectsContext'
import { useInViewOnce } from '../hooks/useInViewAnime'
import { prefersReducedMotion } from '../lib/anime'
import { icons } from '../lib/icons'

export default function Projects() {
  const { ref, inView } = useInViewOnce<HTMLElement>({ threshold: 0.12 })
  const { projects, loading, source, retry } = useGitHubProjectsContext()

  useEffect(() => {
    if (!inView || !ref.current) return
    const items = ref.current.querySelectorAll<HTMLElement>('[data-project]')
    const heading = ref.current.querySelectorAll<HTMLElement>('[data-projects-heading]')
    if (prefersReducedMotion()) {
      set([heading, items], { opacity: 1, translateY: 0 })
      return
    }
    set(heading, { opacity: 0, translateY: 24 })
    set(items, { opacity: 0, translateY: 28 })
    animate(heading, {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 700,
      ease: 'outExpo',
    })
    animate(items, {
      opacity: [0, 1],
      translateY: [28, 0],
      delay: stagger(70, { start: 120 }),
      duration: 700,
      ease: 'outExpo',
    })
  }, [inView, projects, loading, ref])

  return (
    <section id="projects" className="section projects" ref={ref}>
      <div className="container">
        <div data-projects-heading>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">Personal work synced live from GitHub.</p>
        </div>

        {source === 'fallback' && !loading && (
          <p className="projects__fallback-notice">
            GitHub unavailable — showing cached projects.
            <button type="button" className="projects__retry" onClick={retry}>
              Retry
            </button>
          </p>
        )}

        {loading && (
          <div className="projects__state">
            <FontAwesomeIcon icon={icons.spinner} className="projects__spinner" />
            <p>Loading projects…</p>
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="projects__state">
            <p>No public repositories found yet.</p>
          </div>
        )}

        {!loading && projects.length > 0 && (
          <ul className="projects__grid">
            {projects.map((project) => (
              <li
                key={project.id}
                className={`project-card${project.featured ? ' project-card--featured' : ''}`}
                data-project
              >
                <div className="project-card__header">
                  <span className="project-card__icon" aria-hidden>
                    <FontAwesomeIcon icon={faFolder} />
                  </span>
                  <div className="project-card__links">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} on GitHub`}
                    >
                      <FontAwesomeIcon icon={icons.github} />
                    </a>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title}`}
                      >
                        <FontAwesomeIcon icon={icons.external} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>

                {project.tags.length > 0 && (
                  <div className="project-card__tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <style>{`
        .projects__fallback-notice {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          padding: 14px 16px;
          margin-bottom: 28px;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          background: var(--bg-paper);
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        .projects__retry {
          color: var(--accent);
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .projects__state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 56px 0;
          color: var(--text-muted);
          text-align: center;
        }
        .projects__spinner {
          font-size: 1.4rem;
          color: var(--accent);
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .projects__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .project-card {
          display: flex;
          flex-direction: column;
          position: relative;
          min-height: 220px;
          padding: 28px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          background: var(--bg-paper);
          transition: border-color 0.3s, transform 0.35s var(--ease-out), background 0.3s;
        }
        .project-card:hover {
          border-color: var(--border-strong);
          transform: translateY(-4px);
          background: var(--bg-elevated);
        }
        .project-card--featured {
          border-color: rgba(255, 106, 61, 0.28);
        }
        .project-card--featured::before {
          content: '';
          position: absolute;
          top: 0;
          left: 28px;
          right: 28px;
          height: 2px;
          border-radius: 0 0 4px 4px;
          background: var(--accent);
        }
        .project-card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .project-card__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          color: var(--accent);
          background: var(--accent-soft);
          font-size: 1rem;
        }
        .project-card__links {
          display: flex;
          gap: 8px;
        }
        .project-card__links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          color: var(--text-muted);
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .project-card__links a:hover {
          color: var(--accent);
          border-color: var(--accent);
          background: var(--accent-soft);
        }
        .project-card__title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          letter-spacing: -0.03em;
          color: var(--text-heading);
          margin-bottom: 12px;
        }
        .project-card__desc {
          flex: 1;
          font-size: 0.95rem;
          color: var(--text);
          line-height: 1.7;
          margin-bottom: 20px;
        }
        .project-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: auto;
        }
        @media (max-width: 768px) {
          .projects__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

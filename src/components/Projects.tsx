import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Code, Folder, LoaderCircle } from 'lucide-react'
import { useGitHubProjectsContext } from '../context/GitHubProjectsContext'

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { projects, loading, source, retry } = useGitHubProjectsContext()

  return (
    <section id="projects" className="section projects">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            My personal creations, synced from GitHub.
          </p>
        </motion.div>

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
            <LoaderCircle size={28} className="projects__spinner" />
            <p>Loading projects…</p>
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="projects__state">
            <p>No public repositories found yet.</p>
          </div>
        )}

        {!loading && projects.length > 0 && (
          <div className="projects__grid">
            {projects.map((project, i) => (
              <motion.article
                key={project.id}
                className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <div className="project-card__icon">
                  <Folder size={24} />
                </div>

                <div className="project-card__links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Code size={18} />
                  </a>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label="View project">
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>

                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>

                {project.tags.length > 0 && (
                  <div className="project-card__tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .projects__fallback-notice {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          padding: 12px 16px;
          margin-bottom: 24px;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          background: var(--bg-card);
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        .projects__retry {
          color: var(--accent-light);
          font-weight: 500;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .projects__retry:hover {
          color: var(--text-heading);
        }
        .projects__state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 48px 0;
          color: var(--text-muted);
          text-align: center;
        }
        .projects__spinner {
          animation: spin 1s linear infinite;
          color: var(--accent-light);
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .projects__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .project-card {
          position: relative;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 32px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .project-card:hover {
          border-color: var(--border-hover);
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
        }
        .project-card--featured {
          border-color: rgba(59, 130, 246, 0.15);
        }
        .project-card--featured::before {
          content: '';
          position: absolute;
          top: 0;
          left: 32px;
          right: 32px;
          height: 2px;
          background: var(--gradient);
          border-radius: 0 0 4px 4px;
        }
        .project-card__icon {
          color: var(--accent-light);
          margin-bottom: 20px;
        }
        .project-card__links {
          position: absolute;
          top: 32px;
          right: 32px;
          display: flex;
          gap: 12px;
        }
        .project-card__links a {
          color: var(--text-muted);
          transition: color 0.2s;
        }
        .project-card__links a:hover {
          color: var(--accent-light);
        }
        .project-card__title {
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--text-heading);
          margin-bottom: 12px;
        }
        .project-card__desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 20px;
        }
        .project-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
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

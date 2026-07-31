import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { personal, socials } from '../data/portfolio'
import { getSocialIcon } from '../lib/icons'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__copy">
          &copy; {year} <span className="footer__name">{personal.name}</span>
        </p>

        <div className="footer__socials">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social"
              aria-label={s.name}
            >
              <FontAwesomeIcon icon={getSocialIcon(s.icon)} />
            </a>
          ))}
        </div>

        <p className="footer__made">Built with React, Vite & Anime.js</p>
      </div>

      <style>{`
        .footer {
          padding: 40px 0;
          border-top: 1px solid var(--border);
          background: rgba(16, 18, 24, 0.7);
        }
        .footer__inner {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 16px;
          font-size: 0.88rem;
          color: var(--text-muted);
        }
        .footer__name {
          font-family: var(--font-display);
          font-weight: 600;
          color: var(--text-heading);
        }
        .footer__socials {
          display: flex;
          gap: 8px;
        }
        .footer__social {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          color: var(--text);
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .footer__social:hover {
          color: var(--accent);
          border-color: var(--accent);
          background: var(--accent-soft);
        }
        .footer__made {
          text-align: right;
          opacity: 0.75;
        }
        @media (max-width: 640px) {
          .footer__inner {
            grid-template-columns: 1fr;
            justify-items: center;
            text-align: center;
            gap: 14px;
          }
          .footer__made {
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}

import { personal } from '../data/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          &copy; {year} <span className="gradient-text">{personal.name}</span>. All rights reserved.
        </p>
        <p className="footer__made">
          Built with React & Vite
        </p>
      </div>

      <style>{`
        .footer {
          padding: 32px 0;
          border-top: 1px solid var(--border);
        }
        .footer__inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .footer__made {
          opacity: 0.6;
        }
        @media (max-width: 480px) {
          .footer__inner {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}

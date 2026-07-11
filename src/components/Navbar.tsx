import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks, personal } from '../data/portfolio'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
    >
      <div className="container navbar__inner">
        <a href="#home" className="navbar__logo">
          <span className="gradient-text">{personal.name}</span>
        </a>

        <nav className="navbar__links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="navbar__link">
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#projects" className="btn btn-primary navbar__cta">
          View projects
        </a>

        <button
          className="navbar__burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="navbar__mobile"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="navbar__mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#projects"
              className="btn btn-primary"
              onClick={() => setMenuOpen(false)}
            >
              View projects
            </a>
          </motion.nav>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          height: var(--nav-height);
          transition: background 0.3s, border-color 0.3s, backdrop-filter 0.3s;
        }
        .navbar--scrolled {
          background: rgba(10, 10, 15, 0.8);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
        .navbar__inner {
          display: flex;
          align-items: center;
          height: 100%;
          gap: 32px;
        }
        .navbar__logo {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .navbar__links {
          display: flex;
          gap: 8px;
          margin-left: auto;
        }
        .navbar__link {
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-muted);
          transition: color 0.2s, background 0.2s;
        }
        .navbar__link:hover {
          color: var(--text-heading);
          background: rgba(255, 255, 255, 0.04);
        }
        .navbar__cta {
          padding: 10px 20px;
          font-size: 0.85rem;
        }
        .navbar__burger {
          display: none;
          color: var(--text-heading);
          padding: 8px;
        }
        .navbar__mobile {
          display: none;
          overflow: hidden;
          background: var(--bg-elevated);
          border-bottom: 1px solid var(--border);
          padding: 16px 24px;
          flex-direction: column;
          gap: 8px;
        }
        .navbar__mobile-link {
          padding: 12px 16px;
          border-radius: 8px;
          font-weight: 500;
          color: var(--text);
          transition: background 0.2s;
        }
        .navbar__mobile-link:hover {
          background: rgba(255, 255, 255, 0.04);
        }
        @media (max-width: 768px) {
          .navbar__links, .navbar__cta { display: none; }
          .navbar__burger { display: flex; margin-left: auto; }
          .navbar__mobile { display: flex; }
        }
      `}</style>
    </motion.header>
  )
}

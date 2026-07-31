import { useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { animate, set } from 'animejs'
import { navLinks, personal, sectionIds } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'
import { prefersReducedMotion } from '../lib/anime'
import { icons } from '../lib/icons'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [logoVisible, setLogoVisible] = useState(false)
  const ids = useMemo(() => sectionIds, [])
  const activeId = useActiveSection(ids)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const brand = document.querySelector('[data-hero-brand]')
    if (!brand) {
      setLogoVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setLogoVisible(!entry.isIntersecting)
      },
      { threshold: 0 },
    )
    observer.observe(brand)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const panel = document.querySelector<HTMLElement>('.navbar__mobile')
    if (!panel || !menuOpen) return
    if (prefersReducedMotion()) {
      set(panel, { opacity: 1, translateY: 0 })
      return
    }
    set(panel, { opacity: 0, translateY: -12 })
    const anim = animate(panel, {
      opacity: [0, 1],
      translateY: [-12, 0],
      duration: 350,
      ease: 'outExpo',
    })
    return () => {
      anim.pause()
    }
  }, [menuOpen])

  return (
    <header className={`navbar ${scrolled || menuOpen ? 'navbar--scrolled' : ''}`} data-navbar>
      <div className="container navbar__inner">
        <a
          href="#home"
          className={`navbar__logo ${logoVisible ? 'navbar__logo--visible' : ''}`}
          aria-hidden={!logoVisible}
          tabIndex={logoVisible ? undefined : -1}
        >
          {personal.name}
        </a>

        <nav className="navbar__links" aria-label="Primary">
          {navLinks.map((link) => {
            const id = link.href.slice(1)
            const isActive = activeId === id
            return (
              <a
                key={link.href}
                href={link.href}
                className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                data-nav-item
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <a href="#projects" className="btn btn-primary navbar__cta" data-nav-item>
          View projects
        </a>

        <button
          type="button"
          className="navbar__burger"
          data-nav-item
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <FontAwesomeIcon icon={menuOpen ? icons.close : icons.menu} />
        </button>
      </div>

      {menuOpen && (
        <nav className="navbar__mobile" aria-label="Mobile">
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
          <a href="#projects" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
            View projects
          </a>
        </nav>
      )}

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          height: var(--nav-height);
          opacity: 0;
          pointer-events: none;
          transition: background 0.35s, border-color 0.35s, backdrop-filter 0.35s;
        }
        .navbar__link,
        .navbar__cta,
        .navbar__burger {
          opacity: 0;
        }
        .navbar--scrolled {
          background: rgba(7, 8, 12, 0.82);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border);
        }
        .navbar__inner {
          display: flex;
          align-items: center;
          height: 100%;
          gap: 28px;
        }
        .navbar__logo {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 600;
          letter-spacing: -0.03em;
          color: #ffffff;
          opacity: 0;
          transform: translateY(-8px);
          pointer-events: none;
          transition: opacity 0.4s var(--ease-out), transform 0.4s var(--ease-out);
        }
        .navbar__logo--visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .navbar__links {
          display: flex;
          gap: 4px;
          margin-left: auto;
        }
        .navbar__link {
          position: relative;
          padding: 10px 14px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #c8ccd6;
          transition: color 0.2s;
        }
        .navbar__link:hover,
        .navbar__link--active {
          color: #ffffff;
        }
        .navbar__link--active::after {
          content: '';
          position: absolute;
          left: 14px;
          right: 14px;
          bottom: 6px;
          height: 2px;
          background: var(--accent);
          border-radius: 2px;
        }
        .navbar__cta {
          padding: 10px 18px;
          min-height: 42px;
          font-size: 0.85rem;
        }
        .navbar__burger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          color: var(--text-heading);
          font-size: 1.15rem;
        }
        .navbar__mobile {
          display: none;
          position: absolute;
          top: var(--nav-height);
          left: 0;
          right: 0;
          min-height: calc(100svh - var(--nav-height));
          background: rgba(7, 8, 12, 0.96);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
          padding: 28px 24px 40px;
          flex-direction: column;
          gap: 8px;
        }
        .navbar__mobile-link {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 600;
          letter-spacing: -0.03em;
          color: var(--text-heading);
          padding: 12px 0;
        }
        .navbar__mobile .btn {
          margin-top: 20px;
          width: 100%;
        }
        @media (max-width: 768px) {
          .navbar__links,
          .navbar__cta {
            display: none;
          }
          .navbar__burger {
            display: flex;
            margin-left: auto;
          }
          .navbar__mobile {
            display: flex;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .navbar {
            opacity: 1;
            pointer-events: auto;
          }
          .navbar__link,
          .navbar__cta,
          .navbar__burger {
            opacity: 1;
          }
          .navbar__logo {
            transition: none;
          }
        }
      `}</style>
    </header>
  )
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createTimeline, set, stagger } from 'animejs'
import { useEffect, useRef } from 'react'
import { personal, socials } from '../data/portfolio'
import { prefersReducedMotion } from '../lib/anime'
import { getSocialIcon, icons } from '../lib/icons'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const layerARef = useRef<HTMLDivElement>(null)
  const layerBRef = useRef<HTMLDivElement>(null)
  const layerCRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const layerA = layerARef.current
    const layerB = layerBRef.current
    const layerC = layerCRef.current
    const content = contentRef.current
    if (!section || !layerA || !layerB || !layerC || !content) return

    const reduce = prefersReducedMotion()
    const brand = content.querySelectorAll<HTMLElement>('[data-hero-brand]')
    const lines = content.querySelectorAll<HTMLElement>('[data-hero-line]')
    const nav = document.querySelector<HTMLElement>('[data-navbar]')
    const navItems = document.querySelectorAll<HTMLElement>('[data-nav-item]')
    let introDone = false

    const applyParallax = () => {
      const rect = section.getBoundingClientRect()
      // 0 while hero fills from the top → 1 only once the whole section has left the viewport
      const p = Math.min(1, Math.max(0, 1 - rect.bottom / (rect.height || 1)))

      layerA.style.transform = `translate3d(${p * -120}px, ${p * 180}px, 0) rotate(${p * -4}deg) scale(${1 + p * 0.15})`
      layerB.style.transform = `translate3d(${p * 200}px, ${p * 320}px, 0) rotate(${p * 6}deg)`
      layerC.style.transform = `translate3d(${p * -80}px, ${p * 480}px, 0) scale(${1 + p * 0.2})`
      layerA.style.opacity = String(Math.max(0.35, 1 - p * 0.35))
      layerB.style.opacity = String(Math.max(0.2, 1 - p * 0.55))
      layerC.style.opacity = String(Math.max(0.1, 1 - p * 0.75))
    }

    const revealVisible = () => {
      set([brand, lines], {
        opacity: 1,
        translateY: 0,
        clipPath: 'inset(0% 0% 0% 0%)',
      })
      ;[...brand, ...lines].forEach((el) => {
        el.style.opacity = '1'
        el.style.clipPath = 'none'
        el.style.transform = 'none'
      })
      content.style.opacity = '1'
      content.style.transform = 'none'
      if (nav) {
        nav.style.opacity = '1'
        nav.style.transform = 'none'
        nav.style.pointerEvents = 'auto'
      }
      navItems.forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      introDone = true
      applyParallax()
    }

    let ticking = false
    const onScrollFrame = () => {
      if (!introDone || ticking) return
      ticking = true
      requestAnimationFrame(() => {
        applyParallax()
        ticking = false
      })
    }

    if (reduce) {
      revealVisible()
      return
    }

    window.addEventListener('scroll', onScrollFrame, { passive: true })
    window.addEventListener('resize', onScrollFrame)

    set(layerA, { opacity: 0, translateX: 90, translateY: -70, scale: 1.18, rotate: 10 })
    set(layerB, { opacity: 0, translateX: -110, translateY: 50, scale: 0.88 })
    set(layerC, { opacity: 0, translateY: 140, scale: 1.12 })
    set(brand, { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' })
    set(lines, { opacity: 0, translateY: 28 })
    if (nav) set(nav, { opacity: 0, translateY: -28 })
    if (navItems.length) set(navItems, { opacity: 0, translateY: -10 })

    const timeline = createTimeline({
      defaults: { ease: 'outExpo' },
    })
    timeline
      .add(layerA, {
        opacity: [0, 1],
        translateX: [90, 0],
        translateY: [-70, 0],
        scale: [1.18, 1],
        rotate: [10, 0],
        duration: 1400,
      })
      .add(
        layerB,
        {
          opacity: [0, 1],
          translateX: [-110, 0],
          translateY: [50, 0],
          scale: [0.88, 1],
          duration: 1300,
        },
        '-=1200',
      )
      .add(
        layerC,
        {
          opacity: [0, 1],
          translateY: [140, 0],
          scale: [1.12, 1],
          duration: 1400,
        },
        '-=1150',
      )
      .add(
        brand,
        {
          opacity: [0, 1],
          clipPath: ['inset(0% 0% 100% 0%)', 'inset(0% 0% 0% 0%)'],
          duration: 1000,
        },
        '-=900',
      )
      .add(
        lines,
        {
          opacity: [0, 1],
          translateY: [28, 0],
          duration: 750,
          delay: stagger(90),
        },
        '-=500',
      )

    if (nav) {
      timeline.add(
        nav,
        {
          opacity: [0, 1],
          translateY: [-28, 0],
          duration: 700,
        },
        '+=80',
      )
    }
    if (navItems.length) {
      timeline.add(
        navItems,
        {
          opacity: [0, 1],
          translateY: [-10, 0],
          duration: 480,
          delay: stagger(55),
        },
        '-=480',
      )
    }

    timeline.call(revealVisible)

    return () => {
      timeline.pause()
      revealVisible()
      window.removeEventListener('scroll', onScrollFrame)
      window.removeEventListener('resize', onScrollFrame)
    }
  }, [])

  return (
    <section id="home" className="hero" ref={sectionRef}>
      <div className="hero__bg" aria-hidden />
      <div className="hero__layer hero__layer--a" ref={layerARef} aria-hidden />
      <div className="hero__layer hero__layer--b" ref={layerBRef} aria-hidden />
      <div className="hero__layer hero__layer--c" ref={layerCRef} aria-hidden />

      <div className="container hero__content" ref={contentRef}>
        <h1 className="hero__brand" data-hero-brand>
          {personal.name}
        </h1>
        <p className="hero__role" data-hero-line>
          {personal.title}
        </p>
        <p className="hero__tagline" data-hero-line>
          {personal.tagline}
        </p>
        <div className="hero__actions" data-hero-line>
          <a href="#projects" className="btn btn-primary">
            View projects
            <FontAwesomeIcon icon={icons.external} />
          </a>
        </div>
        <div className="hero__socials" data-hero-line>
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label={s.name}
            >
              <FontAwesomeIcon icon={getSocialIcon(s.icon)} />
            </a>
          ))}
        </div>
      </div>

      <a href="#projects" className="hero__scroll" aria-label="Scroll to projects">
        <FontAwesomeIcon icon={icons.arrowDown} />
      </a>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          min-height: 100svh;
          display: flex;
          align-items: flex-end;
          padding: calc(var(--nav-height) + 48px) 0 96px;
          overflow: hidden;
          isolation: isolate;
        }
        .hero__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: #090a0f;
          pointer-events: none;
        }
        .hero__layer {
          position: absolute;
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          will-change: transform, opacity;
        }
        /* Large diagonal coral slab */
        .hero__layer--a {
          top: -20%;
          right: -15%;
          width: 70vw;
          height: 90vh;
          min-width: 420px;
          border-radius: 40% 60% 55% 45%;
          background: linear-gradient(145deg, rgba(255, 106, 61, 0.55) 0%, rgba(255, 106, 61, 0.05) 70%);
          filter: blur(8px);
        }
        /* Soft light panel */
        .hero__layer--b {
          top: 10%;
          left: -25%;
          width: 55vw;
          height: 70vh;
          min-width: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 200, 160, 0.28) 0%, transparent 68%);
          filter: blur(4px);
        }
        /* Bottom accent band */
        .hero__layer--c {
          bottom: -30%;
          left: 20%;
          width: 90vw;
          height: 55vh;
          border-radius: 50% 40% 60% 50%;
          background: linear-gradient(0deg, rgba(255, 80, 40, 0.35) 0%, transparent 75%);
          filter: blur(12px);
        }
        .hero__content {
          position: relative;
          z-index: 1;
          max-width: 720px;
          margin: 0;
          margin-right: auto;
          opacity: 1;
        }
        .hero__brand,
        .hero__role,
        .hero__tagline,
        .hero__actions,
        .hero__socials {
          opacity: 1;
        }
        .hero__brand {
          font-family: var(--font-display);
          font-size: clamp(4rem, 14vw, 8rem);
          font-weight: 600;
          line-height: 0.95;
          letter-spacing: -0.05em;
          color: #ffffff;
          margin-bottom: 20px;
          text-shadow: 0 0 40px rgba(255, 255, 255, 0.08);
          clip-path: none;
        }
        .hero__role {
          font-family: var(--font-display);
          font-size: clamp(1.05rem, 2vw, 1.2rem);
          font-weight: 500;
          color: #ff8f6a;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }
        .hero__tagline {
          font-size: clamp(1.05rem, 1.6vw, 1.2rem);
          color: #e8eaef;
          max-width: 460px;
          margin-bottom: 36px;
          line-height: 1.7;
        }
        .hero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 36px;
        }
        .hero__socials {
          display: flex;
          gap: 10px;
        }
        .hero__social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: var(--radius);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #f2f3f5;
          background: rgba(255, 255, 255, 0.06);
          transition: color 0.25s, border-color 0.25s, background 0.25s, transform 0.35s var(--ease-out);
        }
        .hero__social-link:hover {
          color: var(--accent);
          border-color: var(--accent);
          background: var(--accent-soft);
          transform: translateY(-3px);
        }
        .hero__scroll {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          color: #d0d4dc;
          font-size: 1rem;
          z-index: 1;
          animation: hero-bounce 2.2s ease-in-out infinite;
        }
        .hero__scroll:hover {
          color: #ffffff;
        }
        @keyframes hero-bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @media (max-width: 768px) {
          .hero {
            align-items: center;
            padding: calc(var(--nav-height) + 32px) 0 88px;
          }
          .hero__content {
            max-width: 100%;
          }
          .hero__actions .btn {
            width: 100%;
          }
          .hero__layer--a {
            width: 90vw;
            height: 70vh;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero__scroll {
            animation: none;
          }
          .hero__layer {
            opacity: 1;
            will-change: auto;
          }
        }
      `}</style>
    </section>
  )
}

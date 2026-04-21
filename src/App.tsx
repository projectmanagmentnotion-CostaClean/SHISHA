import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Hero from './components/Hero'
import MenuSection from './components/MenuSection'
import PdfCta from './components/PdfCta'
import { getLocaleContent, getLocaleFromPath, localeOptions } from './data/menu'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function App() {
  const appRef = useRef<HTMLDivElement | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const locale = getLocaleFromPath(window.location.pathname)
  const content = getLocaleContent(locale)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.72,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 0.68,
      lerp: 0.055,
    })
    lenisRef.current = lenis

    const onLenisScroll = () => {
      ScrollTrigger.update()
    }

    lenis.on('scroll', onLenisScroll)

    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', onLenisScroll)
      gsap.ticker.remove(tick)
      lenisRef.current = null
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  useGSAP(
    () => {
      gsap.to('.global-marble', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })

      gsap.utils.toArray<HTMLElement>('.js-parallax').forEach((element) => {
        const depth = Number(element.dataset.depth ?? 0.12)

        gsap.to(element, {
          yPercent: -depth * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: element.closest('.js-parallax-scope') ?? element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('.js-drift-x').forEach((element) => {
        const drift = Number(element.dataset.drift ?? 16)

        gsap.to(element, {
          xPercent: drift,
          ease: 'none',
          scrollTrigger: {
            trigger: element.closest('.js-parallax-scope') ?? element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      heroTimeline
        .to('.js-hero-art', { yPercent: -8, scale: 1.03, rotate: -0.8, ease: 'none' }, 0)
        .to('.js-hero-emblem', { yPercent: -10, rotate: 4, scale: 1.03, ease: 'none' }, 0)
        .to('.js-hero-title', { yPercent: -8, ease: 'none' }, 0)
        .to('.js-hero-logo', { yPercent: -6, scale: 1.02, ease: 'none' }, 0)
        .to('.js-hero-caption', { yPercent: -12, ease: 'none' }, 0)
        .to('.smoke-overlay-hero-a', { yPercent: -16, opacity: 0.88, scale: 1.08, ease: 'none' }, 0)
        .to('.smoke-overlay-hero-b', { yPercent: -12, opacity: 0.92, scale: 1.08, ease: 'none' }, 0)
        .to('.hero-smoke-front', { opacity: 1, scale: 1.12, ease: 'none' }, 0)
        .to('.hero-smoke-back', { opacity: 0.94, scale: 1.08, ease: 'none' }, 0)

      gsap.utils.toArray<HTMLElement>('.js-section').forEach((section) => {
        const heading = section.querySelector<HTMLElement>('.section-heading, .section-toggle')
        const frame = section.querySelector<HTMLElement>('.section-frame')
        const grid = section.querySelector<HTMLElement>('.item-grid')
        const note = section.querySelector<HTMLElement>('.section-note, .section-subtitle')
        const progress = section.querySelector<HTMLElement>('.js-section-progress')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 88%',
            end: 'bottom 18%',
            scrub: true,
          },
        })

        if (frame) {
          tl.fromTo(frame, { scaleX: 0.14, opacity: 0.34, transformOrigin: 'left center' }, { scaleX: 1, opacity: 1, ease: 'none' }, 0)
        }

        if (heading) {
          tl.fromTo(heading, { y: 28 }, { y: 0, ease: 'none' }, 0)
        }

        if (note) {
          tl.fromTo(note, { y: 16 }, { y: 0, ease: 'none' }, 0.1)
        }

        if (grid) {
          tl.fromTo(grid, { y: 20 }, { y: 0, ease: 'none' }, 0.12)
        }

        if (progress) {
          tl.fromTo(progress, { scaleY: 0 }, { scaleY: 1, transformOrigin: 'top center', ease: 'none' }, 0)
        }

        ScrollTrigger.create({
          trigger: section,
          start: 'top 28%',
          end: 'bottom 42%',
          toggleClass: { targets: section, className: 'is-reading' },
        })
      })

      gsap.utils.toArray<HTMLElement>('.item-card').forEach((card) => {
        gsap.fromTo(
          card,
          { y: 16 },
          {
            y: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    },
    { scope: appRef },
  )

  return (
    <div className="app-shell" ref={appRef} data-locale={locale}>
      <div className="global-marble" aria-hidden="true" />
      <div className="global-progress" aria-hidden="true">
        <div className="global-progress-fill" />
      </div>
      <div className="ambient ambient-left js-parallax" data-depth="0.22" aria-hidden="true" />
      <div className="ambient ambient-right js-parallax" data-depth="0.18" aria-hidden="true" />
      <div className="smoke-atmosphere smoke-atmosphere-a js-parallax js-drift-x" data-depth="0.08" data-drift="10" aria-hidden="true" />
      <div className="smoke-atmosphere smoke-atmosphere-b js-parallax js-drift-x" data-depth="0.12" data-drift="-8" aria-hidden="true" />
      <div className="smoke-atmosphere smoke-atmosphere-c js-parallax js-drift-x" data-depth="0.16" data-drift="12" aria-hidden="true" />
      <div className="smoke-ribbon smoke-ribbon-a js-parallax js-drift-x" data-depth="0.2" data-drift="18" aria-hidden="true" />
      <div className="smoke-ribbon smoke-ribbon-b js-parallax js-drift-x" data-depth="0.26" data-drift="-16" aria-hidden="true" />

      <Hero
        locale={locale}
        localeOptions={localeOptions}
        onScrollToMenu={() => {
          const menu = document.getElementById('menu')
          if (!menu) return
          lenisRef.current?.scrollTo(menu, {
            offset: -10,
            duration: 2.1,
            lerp: 0.05,
          })
        }}
        uiText={{
          heroTitle: content.ui.heroTitle,
          heroPrimaryAction: content.ui.heroPrimaryAction,
          heroSecondaryAction: content.ui.heroSecondaryAction,
          quickInstagram: content.ui.quickInstagram,
          quickCall: content.ui.quickCall,
          quickDirections: content.ui.quickDirections,
        }}
      />

      <main className="content" id="menu">
        <section className="highlight-strip js-section js-parallax-scope">
          <div className="section-frame" />
          <div className="highlight-grid">
            {content.highlights.map((item, index) => (
              <article className={`highlight-card ${index < 3 ? 'highlight-card-strong' : ''}`} key={item.label}>
                <p>{item.label}</p>
                <strong>{item.value}</strong>
                {item.note ? <span>{item.note}</span> : null}
              </article>
            ))}
          </div>
        </section>

        {content.sections.map((section) => (
          <MenuSection key={section.anchor} section={section} referencesLabel={content.ui.referencesLabel} />
        ))}

        <PdfCta uiText={content.ui} />
      </main>

    </div>
  )
}

export default App

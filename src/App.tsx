import { useEffect, useRef, useState } from 'react'
import Hero from './components/Hero'
import MenuSection from './components/MenuSection'
import PdfCta from './components/PdfCta'
import TapasSection from './components/tapas/TapasSection'
import { getLocaleContent, getLocaleFromPath, localeOptions } from './data/menu/index'

type ScrollOptions = {
  offset?: number
  duration?: number
  lerp?: number
}

type LenisController = {
  destroy: () => void
  off: (event: 'scroll', callback: (event: { animatedScroll: number }) => void) => void
  on: (event: 'scroll', callback: (event: { animatedScroll: number }) => void) => void
  raf: (time: number) => void
  scrollTo: (target: string | HTMLElement, options?: ScrollOptions) => void
}

function App() {
  const appRef = useRef<HTMLDivElement | null>(null)
  const lenisRef = useRef<LenisController | null>(null)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const locale = getLocaleFromPath(window.location.pathname)
  const content = getLocaleContent(locale)

  useEffect(() => {
    let disposed = false
    let cleanup = () => undefined

    const setupMotion = async () => {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      if (disposed) return

      gsap.registerPlugin(ScrollTrigger)

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const lenis = new Lenis({
        duration: prefersReducedMotion ? 0.01 : 0.92,
        smoothWheel: !prefersReducedMotion,
        syncTouch: !prefersReducedMotion,
        touchMultiplier: 1,
        wheelMultiplier: 1.12,
        lerp: prefersReducedMotion ? 1 : 0.14,
      })
      lenisRef.current = lenis

      const onLenisScroll = ({ animatedScroll }: { animatedScroll: number }) => {
        setShowBackToTop(animatedScroll > window.innerHeight * 0.9)
        ScrollTrigger.update()
      }

      lenis.on('scroll', onLenisScroll)

      const tick = (time: number) => {
        lenis.raf(time * 1000)
      }

      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)

      const refreshScrollTriggers = () => {
        ScrollTrigger.refresh()
      }

      const context = gsap.context(() => {
        const media = gsap.matchMedia()

        media.add('(min-width: 768px)', () => {
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

          gsap.utils.toArray<HTMLElement>('.item-card').forEach((card) => {
            gsap.fromTo(
              card,
              { y: 12 },
              {
                y: -4,
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
        })

        gsap.fromTo(
          '.hero-brand-screen',
          { autoAlpha: 0, scale: 0.96, y: 18 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 2.15, ease: 'power2.out' },
        )

        gsap.fromTo(
          '.hero-logo-welcome-mask',
          { autoAlpha: 0, scale: 0.94 },
          { autoAlpha: 1, scale: 1, duration: 2.3, ease: 'power2.out' },
        )

        gsap.fromTo(
          '.hero-scroll-indicator',
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power2.out' },
        )

        const introTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.hero-intro',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.45,
          },
        })

        introTimeline
          .to('.hero-brand-screen', { yPercent: -8, scale: 0.98, ease: 'none' }, 0)
          .to('.js-hero-logo', { yPercent: -4, scale: 1.01, ease: 'none' }, 0)
          .to('.js-hero-indicator', { yPercent: -18, autoAlpha: 0.2, ease: 'none' }, 0)
          .to('.hero-intro-marble', { yPercent: -6, scale: 1.02, ease: 'none' }, 0)
          .to('.hero-intro-clean-bg', { yPercent: -4, scale: 1.01, ease: 'none' }, 0)

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
              scrub: 0.4,
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

        gsap.utils.toArray<HTMLElement>('.menu-section-featured .js-section-visual').forEach((visual) => {
          const image = visual.querySelector<HTMLElement>('.js-section-visual-image, .section-visual-copy')
          const glow = visual.querySelector<HTMLElement>('.section-visual-glow')
          const wolf = visual.querySelector<HTMLElement>('.section-visual-wolf')
          const direction = visual.dataset.visualDirection === 'right' ? 1 : -1

          const visualTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: visual,
              start: 'top bottom',
              end: 'bottom 35%',
              scrub: 0.55,
            },
          })

          if (image) {
            visualTimeline.fromTo(
              image,
              { xPercent: 34 * direction, yPercent: 24, rotate: 4 * direction, opacity: 0.18 },
              { xPercent: 0, yPercent: 0, rotate: 0, opacity: 1, ease: 'none' },
              0,
            )
          }

          if (wolf) {
            visualTimeline.fromTo(
              wolf,
              { xPercent: -10 * direction, yPercent: 10, scale: 0.92, opacity: 0.02 },
              { xPercent: 0, yPercent: 0, scale: 1, opacity: 0.07, ease: 'none' },
              0,
            )
          }

          if (glow) {
            visualTimeline.fromTo(
              glow,
              { xPercent: 8 * direction, yPercent: 12, scale: 0.84, opacity: 0.12 },
              { xPercent: 0, yPercent: 0, scale: 1, opacity: 0.34, ease: 'none' },
              0,
            )
          }
        })

        const tapasTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.js-tapas-section',
            start: 'top 88%',
            end: 'bottom 10%',
            scrub: 0.92,
          },
        })

        tapasTimeline
          .fromTo('.js-tapas-hero', { y: 34 }, { y: -8, ease: 'none' }, 0)
          .fromTo(
            '.js-tapas-hero-image',
            { xPercent: 10, yPercent: 10, rotate: -1.2, opacity: 0.7 },
            { xPercent: 0, yPercent: -4, rotate: 0.08, opacity: 1, ease: 'none' },
            0,
          )

        gsap.utils.toArray<HTMLElement>('.js-tapas-card').forEach((card, index) => {
          const direction = index % 2 === 0 ? -1 : 1

          gsap.fromTo(
            card,
            { xPercent: 8 * direction, y: 20, opacity: 0.5 },
            {
              xPercent: 0,
              y: -5,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom 24%',
                scrub: 0.86,
              },
            },
          )
        })

        const croquetasTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.js-croquetas-block',
            start: 'top bottom',
            end: 'bottom 18%',
            scrub: 0.86,
          },
        })

        croquetasTimeline
          .fromTo('.js-croquetas-image', { xPercent: -6, yPercent: 8, opacity: 0.64 }, { xPercent: 0, yPercent: -4, opacity: 1, ease: 'none' }, 0)
          .fromTo('.js-croqueta-item', { y: 16, opacity: 0.42 }, { y: 0, opacity: 1, stagger: 0.06, ease: 'none' }, 0)

        const sectionImages = gsap.utils.toArray<HTMLImageElement>('.js-section-visual-image, .js-tapas-hero-image, .js-tapas-card-image, .js-croquetas-image')
        sectionImages.forEach((image) => {
          if (!image.complete) {
            image.addEventListener('load', refreshScrollTriggers)
          }
        })

        window.addEventListener('load', refreshScrollTriggers)
        window.addEventListener('resize', refreshScrollTriggers)

        cleanup = () => {
          const sectionImages = gsap.utils.toArray<HTMLImageElement>('.js-section-visual-image, .js-tapas-hero-image, .js-tapas-card-image, .js-croquetas-image')
          sectionImages.forEach((image) => {
            image.removeEventListener('load', refreshScrollTriggers)
          })
          window.removeEventListener('load', refreshScrollTriggers)
          window.removeEventListener('resize', refreshScrollTriggers)
          media.revert()
          context.revert()
          lenis.off('scroll', onLenisScroll)
          gsap.ticker.remove(tick)
          lenisRef.current = null
          lenis.destroy()
        }
      }, appRef)

      if (disposed) {
        cleanup()
      }
    }

    void setupMotion()

    return () => {
      disposed = true
      cleanup()
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const scrollToElement = (id: string, offset = -10) => {
    const element = document.getElementById(id)
    if (!element) return

    lenisRef.current?.scrollTo(element, {
      offset,
      duration: 1.15,
      lerp: 0.14,
    })
  }

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
        onAdvance={() => scrollToElement('shishas', -8)}
        uiText={{
          heroScrollDown: content.ui.heroScrollDown,
        }}
      />

      <main className="content" id="menu">
        {content.sectionsBeforeTapas.map((section) => (
          <MenuSection key={section.anchor} section={section} />
        ))}

        <TapasSection content={content.tapas} />

        {content.sectionsAfterTapas.map((section) => (
          <MenuSection key={section.anchor} section={section} />
        ))}

        <PdfCta uiText={content.ui} />
      </main>

      <button
        className={`back-to-top ${showBackToTop ? 'is-visible' : ''}`}
        type="button"
        onClick={() => scrollToElement('top', 0)}
        aria-label={content.ui.backToTop}
      >
        <span aria-hidden="true" />
      </button>
    </div>
  )
}

export default App

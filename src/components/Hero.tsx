import type { LocaleCode, UiLocaleOption } from '../data/menu/types'

type HeroProps = {
  locale: LocaleCode
  localeOptions: UiLocaleOption[]
  onAdvance: () => void
  uiText: {
    heroScrollDown: string
  }
}

function Hero({ locale, localeOptions, onAdvance, uiText }: HeroProps) {
  return (
    <section className="hero hero-stage js-parallax-scope" id="top" aria-label={`Luxury Shisha ${locale}`}>
      <div className="hero-stage-surface">
        <div className="hero-locale-bar">
          <nav className="locale-switcher" aria-label="Language selector">
            {localeOptions.map((option) => (
              <a
                key={option.code}
                className={`locale-switcher-button ${locale === option.code ? 'is-active' : ''}`}
                href={option.href}
                hrefLang={option.code}
                lang={option.code}
                data-locale={option.code}
                aria-current={locale === option.code ? 'page' : undefined}
              >
                {option.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="hero-intro">
          <div className="hero-marble-layer hero-intro-marble js-parallax" data-depth="0.08" aria-hidden="true" />
          <div className="hero-intro-clean-bg" aria-hidden="true" />
          <div className="hero-brand-screen">
            <div className="hero-logo-welcome js-hero-logo" aria-label="Luxury Shisha">
              <img className="hero-logo hero-logo-intro" src="/branding/logo-luxury-shisha.svg" alt="Luxury Shisha" />
              <span className="hero-logo-welcome-mask" aria-hidden="true" />
            </div>
          </div>

          <button className="hero-scroll-indicator js-hero-indicator" type="button" onClick={onAdvance}>
            <span className="hero-scroll-label">{uiText.heroScrollDown}</span>
            <span className="hero-scroll-arrow-wrap" aria-hidden="true">
              <span className="hero-scroll-line" />
              <span className="hero-scroll-arrow" />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero

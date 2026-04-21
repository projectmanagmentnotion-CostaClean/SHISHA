import type { LocaleCode, UiLocaleOption } from '../data/menu'

type HeroProps = {
  locale: LocaleCode
  localeOptions: UiLocaleOption[]
  onScrollToMenu: () => void
  uiText: {
    heroTitle: string
    heroPrimaryAction: string
    heroSecondaryAction: string
    quickInstagram: string
    quickCall: string
    quickDirections: string
  }
}

function Hero({ locale, localeOptions, onScrollToMenu, uiText }: HeroProps) {
  return (
    <header className="hero js-parallax-scope" id="top">
      <div className="hero-marble-layer js-parallax" data-depth="0.16" aria-hidden="true" />
      <div className="hero-smoke-layer hero-smoke-back js-parallax js-drift-x" data-depth="0.22" data-drift="-12" aria-hidden="true" />
      <div className="hero-smoke-layer hero-smoke-front js-parallax js-drift-x" data-depth="0.3" data-drift="14" aria-hidden="true" />
      <div className="smoke-overlay smoke-overlay-hero-a js-parallax js-drift-x" data-depth="0.2" data-drift="-10" aria-hidden="true" />
      <div className="smoke-overlay smoke-overlay-hero-b js-parallax js-drift-x" data-depth="0.28" data-drift="12" aria-hidden="true" />

      <div className="hero-copy">
        <div className="hero-topbar">
          <div className="hero-brand">
            <div className="hero-brand-line" />
          </div>

          <nav className="locale-switcher" aria-label="Language selector">
            {localeOptions.map((option) => (
              <button
                key={option.code}
                className={`locale-switcher-button ${locale === option.code ? 'is-active' : ''}`}
                type="button"
                aria-pressed={locale === option.code}
                onClick={() => {
                  window.location.href = option.href
                }}
              >
                {option.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="hero-logo-wrap">
          <img className="hero-logo js-hero-logo" src="/branding/logo-luxury-shisha.svg" alt="Luxury Shisha" />
        </div>

        <div className="hero-intro">
          <h1 className="js-hero-title">{uiText.heroTitle}</h1>
        </div>

        <div className="hero-actions">
          <button className="button button-primary" type="button" onClick={onScrollToMenu}>
            {uiText.heroPrimaryAction}
          </button>
          <a className="button button-secondary" href="https://luxuryshishalloret.com/menu/carta-luxury.pdf" target="_blank" rel="noreferrer">
            {uiText.heroSecondaryAction}
          </a>
        </div>

        <div className="hero-quick-actions" aria-label="Quick actions">
          <a className="hero-quick-link" href="https://instagram.com/luxuryshishalounge/" target="_blank" rel="noreferrer">
            {uiText.quickInstagram}
          </a>
          <a className="hero-quick-link" href="tel:+34972144294">
            {uiText.quickCall}
          </a>
          <a
            className="hero-quick-link"
            href="https://www.google.com/maps/search/?api=1&query=Av.+Vila+de+Tossa+48,+17310+Lloret+de+Mar"
            target="_blank"
            rel="noreferrer"
          >
            {uiText.quickDirections}
          </a>
        </div>

      </div>

      <div className="hero-visual">
        <div className="hero-visual-shell">
          <div className="hero-orbit hero-orbit-a js-parallax" data-depth="0.18" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-b js-parallax" data-depth="0.12" aria-hidden="true" />
          <div className="hero-frame">
            <div className="hero-wolf-mark" aria-hidden="true">
              <img className="hero-emblem js-hero-emblem" src="/branding/logo-mark-wolf.svg" alt="" />
            </div>

            <div className="hero-glass-panel js-parallax" data-depth="0.1" aria-hidden="true" />
            <div className="hero-image-fade" aria-hidden="true" />
            <img className="hero-image js-hero-art" src="/branding/hero-shisha-cutout.webp" alt="Luxury Shisha" />

            <div className="hero-caption js-hero-caption">
              <span>Luxury Shisha</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Hero

import { useState } from 'react'
import type { CSSProperties } from 'react'
import type { MenuSectionData } from '../data/menu/types'

type MenuSectionProps = {
  section: MenuSectionData
}

const sectionVisuals: Record<
  string,
  {
    accent: string
    fileName: string
    source: 'products' | 'branding'
    label: string
    objectPosition?: string
    mobileObjectPosition?: string
    maxWidth?: string
    mobileMaxWidth?: string
  }
> = {
  shishas: { accent: 'smoke-gold', fileName: 'hero-shisha-cutout.webp', source: 'branding', label: 'Hero shisha', objectPosition: 'center 56%', mobileObjectPosition: 'center 58%', maxWidth: '360px', mobileMaxWidth: '320px' },
  cocktails: { accent: 'citrus-copper', fileName: 'section-cocktails-cutout.webp', source: 'products', label: 'Signature cocktail', objectPosition: 'center 52%', mobileObjectPosition: 'center 54%', maxWidth: '320px', mobileMaxWidth: '300px' },
  sangrias: { accent: 'berry-rose', fileName: 'section-sangrias-cutout.webp', source: 'products', label: 'Sangria service', objectPosition: 'center 54%', mobileObjectPosition: 'center 56%', maxWidth: '328px', mobileMaxWidth: '304px' },
  'cervezas-vinos': { accent: 'amber-wine', fileName: 'section-cervezas-vinos-cutout.webp', source: 'products', label: 'Beer and wine pairing', objectPosition: 'center 54%', mobileObjectPosition: 'center 57%', maxWidth: '332px', mobileMaxWidth: '308px' },
  refrescos: { accent: 'ice-blue', fileName: 'section-refrescos-cutout.webp', source: 'products', label: 'Cold soft drinks', objectPosition: 'center 54%', mobileObjectPosition: 'center 56%', maxWidth: '320px', mobileMaxWidth: '296px' },
  'cafe-infusiones': { accent: 'espresso-bronze', fileName: 'section-cafe-infusiones-cutout.webp', source: 'products', label: 'Coffee and tea service', objectPosition: 'center 56%', mobileObjectPosition: 'center 58%', maxWidth: '300px', mobileMaxWidth: '282px' },
  batidos: { accent: 'vanilla-cream', fileName: 'section-batidos-cutout.webp', source: 'products', label: 'Milkshake glass', objectPosition: 'center 54%', mobileObjectPosition: 'center 56%', maxWidth: '310px', mobileMaxWidth: '288px' },
  palomitas: { accent: 'pop-gold', fileName: 'section-palomitas-cutout.webp', source: 'products', label: 'Popcorn bowl', objectPosition: 'center 58%', mobileObjectPosition: 'center 60%', maxWidth: '324px', mobileMaxWidth: '300px' },
  smoothies: { accent: 'tropical-mint', fileName: 'section-smoothies-cutout.webp', source: 'products', label: 'Fresh smoothie', objectPosition: 'center 54%', mobileObjectPosition: 'center 56%', maxWidth: '316px', mobileMaxWidth: '294px' },
  vodka: { accent: 'frost-silver', fileName: 'section-vodka-cutout.webp', source: 'products', label: 'Vodka bottle and serve', objectPosition: 'center 58%', mobileObjectPosition: 'center 60%', maxWidth: '296px', mobileMaxWidth: '272px' },
  whiskey: { accent: 'oak-amber', fileName: 'section-whiskey-cutout.webp', source: 'products', label: 'Whiskey bottle and glass', objectPosition: 'center 58%', mobileObjectPosition: 'center 60%', maxWidth: '314px', mobileMaxWidth: '292px' },
  ron: { accent: 'rum-caramel', fileName: 'section-ron-cutout.webp', source: 'products', label: 'Rum bottle and serve', objectPosition: 'center 58%', mobileObjectPosition: 'center 60%', maxWidth: '300px', mobileMaxWidth: '278px' },
  ginebras: { accent: 'botanical-jade', fileName: 'section-ginebras-cutout.webp', source: 'products', label: 'Gin and tonic serve', objectPosition: 'center 56%', mobileObjectPosition: 'center 58%', maxWidth: '320px', mobileMaxWidth: '296px' },
}

function MenuSection({ section }: MenuSectionProps) {
  const [open, setOpen] = useState(section.featured ?? false)
  const [hasImageError, setHasImageError] = useState(false)
  const compact = !section.featured
  const visual = sectionVisuals[section.anchor]
  const visualSrc = visual ? `/${visual.source}/${visual.fileName}` : ''
  const visualStyle = visual
    ? ({
        ['--section-visual-object-position' as string]: visual.objectPosition ?? 'center center',
        ['--section-visual-object-position-mobile' as string]: visual.mobileObjectPosition ?? visual.objectPosition ?? 'center center',
        ['--section-visual-max-width' as string]: visual.maxWidth ?? '340px',
        ['--section-visual-mobile-max-width' as string]: visual.mobileMaxWidth ?? visual.maxWidth ?? '320px',
      } as CSSProperties)
    : undefined
  const visualDirection =
    section.anchor === 'cocktails' || section.anchor === 'batidos' || section.anchor === 'vodka' || section.anchor === 'ron'
      ? 'right'
      : 'left'
  const smokeClass =
    section.anchor === 'shishas'
      ? 'smoke-overlay-section-shishas'
      : section.anchor === 'cocktails'
        ? 'smoke-overlay-section-cocktails'
        : section.anchor === 'sangrias'
          ? 'smoke-overlay-section-sangrias'
          : ''

  return (
    <section
      className={`menu-section js-section js-parallax-scope ${section.featured ? 'menu-section-featured' : 'menu-section-compact'} section-tone-${visual?.accent ?? 'smoke-gold'} ${open ? 'is-open' : 'is-collapsed'}`}
      id={section.anchor}
    >
      <div className="section-ornament section-ornament-top js-parallax" data-depth="0.16" aria-hidden="true" />
      <div className="section-ornament section-ornament-bottom js-parallax" data-depth="0.1" aria-hidden="true" />
      {smokeClass ? (
        <div
          className={`smoke-overlay ${smokeClass} js-parallax js-drift-x`}
          data-depth="0.18"
          data-drift={section.anchor === 'cocktails' ? '10' : '-8'}
          aria-hidden="true"
        />
      ) : null}
      <div className="section-frame" />
      <div className="section-progress">
        <div className="section-progress-fill js-section-progress" />
      </div>

      {compact ? (
        <button className="section-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls={`${section.anchor}-panel`}>
          <div className="section-toggle-copy">
            {section.kicker ? <span>{section.kicker}</span> : null}
            <h2>{section.title}</h2>
          </div>
          <div className={`section-toggle-icon ${open ? 'is-open' : ''}`} aria-hidden="true">
            <span />
            <span />
          </div>
        </button>
      ) : (
        <div className="section-heading section-heading-compact">
          {section.kicker ? <span>{section.kicker}</span> : null}
          <h2>{section.title}</h2>
        </div>
      )}

      <div className={`section-panel ${open ? 'is-open' : ''}`} id={`${section.anchor}-panel`}>
        {visual ? (
          <div className="section-visual js-section-visual" data-visual-direction={visualDirection} style={visualStyle}>
            <div className="section-visual-frame">
              <div className="section-visual-wolf" aria-hidden="true">
                <img src="/branding/logo-mark-wolf.svg" alt="" />
              </div>
              <div className="section-visual-glow" aria-hidden="true" />
              <div className="section-visual-art js-section-visual-art">
                {hasImageError ? (
                  <div className="section-visual-copy" aria-hidden="true">
                    <span>Visual slot</span>
                    <strong>{visual.label}</strong>
                    <small>{visual.fileName}</small>
                  </div>
                ) : (
                  <img
                    className="js-section-visual-image"
                    src={visualSrc}
                    alt={visual.label}
                    loading="lazy"
                    onError={() => setHasImageError(true)}
                  />
                )}
              </div>
            </div>
          </div>
        ) : null}

        {section.subtitle ? <p className="section-subtitle">{section.subtitle}</p> : null}
        {section.priceNote ? <p className="section-note">{section.priceNote}</p> : null}

        <div className="item-grid">
          {section.items.map((item) => (
            <article className="item-card" key={item.name}>
              <div className="item-row">
                <h3>{item.name}</h3>
                {item.price ? <strong>{item.price}</strong> : null}
              </div>
              {item.note ? <p>{item.note}</p> : null}
            </article>
          ))}
        </div>

        {section.footerNotes?.length ? (
          <div className="section-footnotes">
            {section.footerNotes.map((note) => (
              <p className="section-footnote" key={note}>
                {note}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default MenuSection

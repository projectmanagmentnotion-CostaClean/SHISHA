import { useState } from 'react'
import type { MenuSectionData } from '../data/menu'

type MenuSectionProps = {
  section: MenuSectionData
  referencesLabel: string
}

function MenuSection({ section, referencesLabel }: MenuSectionProps) {
  const [open, setOpen] = useState(section.featured ?? false)
  const compact = !section.featured
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
      className={`menu-section js-section js-parallax-scope ${section.featured ? 'menu-section-featured' : 'menu-section-compact'} ${open ? 'is-open' : 'is-collapsed'}`}
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
            <p>
              {section.items.length} {referencesLabel}
            </p>
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

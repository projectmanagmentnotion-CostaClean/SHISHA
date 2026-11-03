import { useState } from 'react'
import type { TapasContent } from '../../data/menu/types'
import CroquetasBlock from './CroquetasBlock'
import TapasCard from './TapasCard'

type TapasSectionProps = {
  content: TapasContent
}

function TapasSection({ content }: TapasSectionProps) {
  const [heroImageIndex, setHeroImageIndex] = useState(0)
  const heroImage = content.hero.image.sources[heroImageIndex] ?? null

  return (
    <section className="tapas-section js-tapas-section js-parallax-scope" id={content.anchor}>
      <div className="tapas-shell">
        <div className="tapas-header">
          <span>{content.kicker}</span>
          <h2>{content.title}</h2>
          <p>{content.subtitle}</p>
        </div>

        <div className="tapas-hero js-tapas-hero">
          <div className="tapas-hero-visual">
            <div className="tapas-hero-frame">
              <div className="tapas-hero-glow" aria-hidden="true" />
              {heroImage ? (
                <img
                  className="js-tapas-hero-image"
                  src={heroImage}
                  alt={content.hero.image.alt}
                  loading="lazy"
                  onError={() => setHeroImageIndex((current) => current + 1)}
                />
              ) : (
                <div className="tapas-hero-placeholder js-tapas-hero-image" aria-hidden="true">
                  <span>Taco Luxury visual</span>
                </div>
              )}
            </div>
          </div>

          <div className="tapas-hero-copy">
            <span>{content.hero.kicker}</span>
            <div className="tapas-title-row">
              <h3>{content.hero.title}</h3>
              {content.hero.price ? <strong>{content.hero.price}</strong> : null}
            </div>
            <p>{content.hero.description}</p>

            <div className="tapas-hero-meta">
              <div className="tapas-meta-group">
                <strong>Halal</strong>
                <ul>
                  {content.hero.meatOptions.map((option) => (
                    <li key={option}>{option}</li>
                  ))}
                </ul>
              </div>

              <div className="tapas-meta-group">
                <strong>{content.hero.saucesTitle}</strong>
                <ul>
                  {content.hero.sauces.map((sauce) => (
                    <li key={sauce}>{sauce}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="tapas-classics">
          <div className="tapas-group-header">
            <span>{content.classics.kicker}</span>
            <h3>{content.classics.title}</h3>
            <p>{content.classics.description}</p>
          </div>

          <div className="tapas-card-grid">
            {content.classics.items.map((item) => (
              <TapasCard key={item.name} item={item} />
            ))}
          </div>
        </div>

        <CroquetasBlock group={content.croquetas} />
      </div>
    </section>
  )
}

export default TapasSection

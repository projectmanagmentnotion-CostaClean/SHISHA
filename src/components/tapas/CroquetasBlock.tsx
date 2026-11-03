import { useState } from 'react'
import type { CroquetasGroup } from '../../data/menu/types'

type CroquetasBlockProps = {
  group: CroquetasGroup
}

function CroquetasBlock({ group }: CroquetasBlockProps) {
  const [imageIndex, setImageIndex] = useState(0)
  const sources = group.image.sources
  const currentImage = imageIndex < sources.length ? sources[imageIndex] : null

  return (
    <section className="croquetas-block js-croquetas-block js-parallax-scope" id={group.anchor}>
      <div className="croquetas-visual">
        <div className="croquetas-visual-shell">
          <div className="croquetas-visual-wolf" aria-hidden="true" />
          {currentImage ? (
            <img
              className="js-croquetas-image"
              src={currentImage}
              alt={group.image.alt}
              loading="lazy"
              onError={() => setImageIndex((current) => current + 1)}
            />
          ) : (
            <div className="croquetas-placeholder js-croquetas-image" aria-hidden="true">
              <span>Imagen general de croquetas</span>
            </div>
          )}
        </div>
      </div>

      <div className="croquetas-layout">
        <div className="croquetas-header">
          <span>{group.kicker}</span>
          <h3>{group.title}</h3>
          <p>{group.description}</p>
        </div>

        <div className="croquetas-list">
          {group.items.map((item) => (
            <article className="croqueta-item js-croqueta-item" key={item.name}>
              <div className="tapas-title-row">
                <h4>{item.name}</h4>
                {item.price ? <strong>{item.price}</strong> : null}
              </div>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CroquetasBlock

import { useState } from 'react'
import type { TapasItem } from '../../data/menu/types'

type TapasCardProps = {
  item: TapasItem
  className?: string
}

function TapasCard({ item, className = '' }: TapasCardProps) {
  const sources = item.image?.sources ?? []
  const [imageIndex, setImageIndex] = useState(0)
  const hasImage = sources.length > 0 && imageIndex < sources.length
  const currentImage = hasImage ? sources[imageIndex] : null

  const handleError = () => {
    setImageIndex((current) => current + 1)
  }

  return (
    <article className={`tapas-card js-tapas-card ${className}`.trim()}>
      <div className="tapas-card-visual">
        {currentImage ? (
          <img
            className="js-tapas-card-image"
            src={currentImage}
            alt={item.image?.alt ?? item.name}
            loading="lazy"
            onError={handleError}
          />
        ) : (
          <div className="tapas-card-placeholder js-tapas-card-image" aria-hidden="true">
            <span>Visual pendiente</span>
          </div>
        )}
      </div>

      <div className="tapas-card-copy">
        <div className="tapas-title-row">
          <h3>{item.name}</h3>
          {item.price ? <strong>{item.price}</strong> : null}
        </div>
        <p>{item.description}</p>
        {item.note ? <span className="tapas-card-note">{item.note}</span> : null}
      </div>
    </article>
  )
}

export default TapasCard

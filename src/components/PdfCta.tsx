type PdfCtaProps = {
  uiText: {
    contactTitle: string
    contactMenu: string
    contactInstagram: string
    contactCall: string
    contactDirections: string
    backToTop: string
  }
}

function PdfCta({ uiText }: PdfCtaProps) {
  return (
    <section className="pdf-cta js-section js-parallax-scope">
      <div className="section-ornament section-ornament-top js-parallax" data-depth="0.16" aria-hidden="true" />
      <div className="smoke-overlay smoke-overlay-cta js-parallax js-drift-x" data-depth="0.14" data-drift="8" aria-hidden="true" />
      <div className="section-frame" />
      <h2>{uiText.contactTitle}</h2>
      <div className="contact-actions">
        <a className="button button-primary" href="https://luxuryshishalloret.com/menu/carta-luxury.pdf" target="_blank" rel="noreferrer">
          {uiText.contactMenu}
        </a>
        <a className="button button-secondary" href="https://instagram.com/luxuryshishalounge/" target="_blank" rel="noreferrer">
          {uiText.contactInstagram}
        </a>
        <a className="button button-secondary" href="tel:+34972144294">
          {uiText.contactCall}
        </a>
        <a
          className="button button-secondary"
          href="https://www.google.com/maps/search/?api=1&query=Av.+Vila+de+Tossa+48,+17310+Lloret+de+Mar"
          target="_blank"
          rel="noreferrer"
        >
          {uiText.contactDirections}
        </a>
      </div>
    </section>
  )
}

export default PdfCta

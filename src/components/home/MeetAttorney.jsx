import { Link } from 'react-router-dom'
import data from '../../data/site.json'
import images from '../../assets/images.js'

const { attorney } = data

export default function MeetAttorney() {
  return (
    <section className="hl-section hl-attorney">
      <div className="hl-container">
        <div className="hl-attorney-panel">
          {/* Image (grid-area: image) */}
          <div className="hl-attorney-img-wrap">
            <img
              src={images[attorney.image]}
              alt={`${attorney.eyebrow} — Hirani Law Firm team`}
              className="hl-attorney-img"
              loading="lazy"
            />
          </div>

          {/* Heading (grid-area: heading) — shows first on mobile */}
          <div className="hl-attorney-heading">
            <span className="hl-eyebrow">{attorney.eyebrow}</span>
            <h2 className="hl-h2">{attorney.title}</h2>
          </div>

          {/* Content (grid-area: content) */}
          <div className="hl-attorney-content">
            {attorney.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? 'mt-3' : ''}>
                {p}
              </p>
            ))}
            <Link to={attorney.cta.to} className="btn btn-gold mt-3">
              {attorney.cta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

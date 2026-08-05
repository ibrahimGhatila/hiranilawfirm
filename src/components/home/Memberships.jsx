import data from '../../data/active.js'
import images from '../../assets/images.js'

const { memberships } = data

export default function Memberships() {
  return (
    <section className="hl-memberships">
      <div className="hl-container">
        <div className="hl-membership-label">{memberships.eyebrow}</div>
        <div className="hl-membership-grid">
          {memberships.logos.map((logo) => (
            <div className="hl-membership-cell" key={logo.src}>
              <img src={images[logo.src]} alt={logo.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import LeadForm from './LeadForm.jsx'
import images from '../../assets/images.js'
import data from '../../data/active.js'

const { hero } = data

// Drop an image named `hero-banner.(jpg|png|webp)` into src/assets to activate
// the hero background banner — it auto-registers and shows behind a dark overlay.
// `hero-banner-mobile` is a portrait crop swapped in on phones via CSS.
const banner = images['hero-banner']
const bannerMobile = images['hero-banner-mobile']

export default function Hero() {
  return (
    <section
      className={'hl-hero hl-section' + (banner ? ' has-banner' : '')}
      style={
        banner
          ? { backgroundImage: `url(${banner})`, '--hero-mobile-bg': `url(${bannerMobile})` }
          : undefined
      }
    >
      <div className="hl-container">
        <div className="row align-items-center g-5">
          {/* Copy */}
          <div className="col-lg-8">
            <span className="hl-eyebrow mt-4">{hero.eyebrow}</span>
            <h1 className="hl-display hl-hero-title mb-4">{hero.title}</h1>
            <p className="hl-hero-desc mb-4">{hero.description}</p>
            <div className="d-flex flex-wrap gap-3 hl-hero-actions">
              <Link to={hero.primaryCta.to} className="btn btn-gold">
                {hero.primaryCta.label}
              </Link>
              <Link to={hero.secondaryCta.to} className="btn btn-outline-light-hl">
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          {/* Lead form */}
          <div className="col-lg-4 hl-hero-form-col">
            <div className="hl-hero-form">
              <span className="hl-eyebrow mb-2">{hero.form.eyebrow}</span>
              <h3 className="hl-h3 mb-2">{hero.form.title}</h3>
              <p className="text-muted mb-4" style={{ fontSize: '0.833rem' }}>
                {hero.form.description}
              </p>
              <LeadForm
                helpOptions={hero.form.helpOptions}
                submitLabel={hero.form.submitLabel}
                submitClass="btn-dark-solid"
                layout="stacked"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import SEO from '../components/common/SEO.jsx'
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx'
import images from '../assets/images.js'
import data from '../data/site.json'

const { aboutPage, business } = data

/** Reusable trio of dark gold-bordered value cards. */
function ValueCards({ cards }) {
  return (
    <div className="row g-4">
      {cards.map((card) => (
        <div className="col-md-4" key={card.title}>
          <div className="hl-value-card h-100">
            <h3>{card.title}</h3>
            <p className="mb-0">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function About() {
  const { intro, quote, mission, values, difference, cta } = aboutPage
  return (
    <>
      <SEO title={aboutPage.seo.title} description={aboutPage.seo.description} path="/about" />
      <Breadcrumbs items={[{ label: 'About Us', to: '/about' }]} />

      {/* Intro */}
      <section className="hl-section">
        <div className="hl-container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 order-lg-1 order-2">
              <img src={images[intro.image]} alt="Hirani Law Firm team" className="hl-about-intro-img" />
            </div>
            <div className="col-lg-6 order-lg-2 order-1">
              <span className="hl-eyebrow">{intro.eyebrow}</span>
              <h2 className="hl-h2 mb-4">{intro.title}</h2>
              {intro.paragraphs.map((p, i) => (
                <p key={i} className="hl-lead" style={{ fontSize: '1.1rem' }}>
                  {p}
                </p>
              ))}
              <div className="hl-about-stats mt-4">
                {intro.stats.map((s) => (
                  <div className="hl-about-stat" key={s.label}>
                    <div className="hl-about-stat-value">{s.value}</div>
                    <div className="hl-about-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
              <Link to={intro.cta.to} className="btn btn-dark-solid mt-4">
                {intro.cta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quote band */}
      <section
        className="hl-quote-band"
        style={{ backgroundImage: `url(${images['justice-band']})` }}
      >
        <div className="hl-container">
          <p className="hl-quote-text">&ldquo;{quote}&rdquo;</p>
        </div>
      </section>

      {/* Mission */}
      <section className="hl-section hl-bg-cream">
        <div className="hl-container">
          <div className="row g-5">
            <div className="col-lg-4">
              <span className="hl-eyebrow">{mission.eyebrow}</span>
              <h2 className="hl-h2 mb-3">{mission.title}</h2>
              <p className="hl-lead mb-0">{mission.description}</p>
            </div>
            <div className="col-lg-8">
              <ValueCards cards={mission.cards} />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="hl-section">
        <div className="hl-container">
          <div className="row g-5">
            <div className="col-lg-4">
              <span className="hl-eyebrow">{values.eyebrow}</span>
              <h2 className="hl-h2 mb-3">{values.title}</h2>
              <p className="hl-lead mb-0">{values.description}</p>
            </div>
            <div className="col-lg-8">
              <ValueCards cards={values.cards} />
            </div>
          </div>
        </div>
      </section>

      {/* Difference */}
      <section className="hl-section pt-0">
        <div className="hl-container">
          <span className="hl-eyebrow">{difference.eyebrow}</span>
          <h2 className="hl-h2 mb-5" style={{ maxWidth: '30ch' }}>
            {difference.title}
          </h2>
          <div className="row g-4">
            {difference.cards.map((card) => (
              <div className="col-md-6" key={card.title}>
                <div className="hl-difference-card h-100">
                  <img src={images[card.image]} alt={card.title} loading="lazy" />
                  <div className="hl-difference-body">
                    <h3>{card.title}</h3>
                    <p className="mb-0">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="hl-about-cta">
        <div className="hl-container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-8">
              <span className="hl-eyebrow">{cta.eyebrow}</span>
              <h2 className="hl-h2 text-white mb-0" style={{ color: '#fff' }}>
                {cta.title}
              </h2>
            </div>
            <div className="col-lg-4">
              <div className="d-flex flex-column gap-3 align-items-lg-end">
                <Link to={cta.primary.to} className="btn btn-gold w-100">
                  {cta.primary.label}
                </Link>
                <a href={business.phoneHref} className="btn btn-outline-light-hl w-100">
                  Call Us Today — {business.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

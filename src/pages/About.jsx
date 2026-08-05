import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/common/SEO.jsx'
import PageHero from '../components/common/PageHero.jsx'
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
  const [activeImage, setActiveImage] = useState(0)
  const introImages = intro.images || [intro.image]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % introImages.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [introImages.length])

  const showImage = (index) => {
    setActiveImage((index + introImages.length) % introImages.length)
  }

  return (
    <>
      <SEO title={aboutPage.seo.title} description={aboutPage.seo.description} path="/about" />
      <PageHero
        title={intro.title}
        description={aboutPage.seo.description}
        crumbs={[{ label: 'About Us', to: '/about' }]}
        bgImage="page-hero-banner"
      />

      {/* Intro */}
      <section className="hl-section">
        <div className="hl-container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5 order-1">
              <span className="hl-eyebrow d-lg-none mb-3">{intro.eyebrow}</span>
              <div className="hl-about-carousel" aria-roledescription="carousel" aria-label="Hirani Law Firm team photos">
                <img
                  src={images[introImages[activeImage]]}
                  alt={`Hirani Law Firm team photo ${activeImage + 1} of ${introImages.length}`}
                  className="hl-about-intro-img"
                />
                <div className="hl-about-carousel-dots" aria-label="Choose team photo">
                  {introImages.map((image, index) => (
                    <button
                      type="button"
                      key={image}
                      className={index === activeImage ? 'active' : ''}
                      onClick={() => showImage(index)}
                      aria-label={`Show team photo ${index + 1}`}
                      aria-current={index === activeImage ? 'true' : undefined}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-7 order-2">
              <span className="hl-eyebrow d-none d-lg-inline-block">{intro.eyebrow}</span>
              {intro.paragraphs.map((p, i) => (
                <p key={i} className="hl-lead" style={{ fontSize: '0.935rem' }}>
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

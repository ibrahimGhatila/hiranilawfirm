import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/common/SEO.jsx'
import images from '../assets/images.js'
import data from '../data/active.js'

const { aboutPage, business } = data

/**
 * Splits body copy on any phrase listed in `links` and turns those phrases
 * into real links, so the data can stay plain strings.
 */
function withLinks(text, links) {
  if (!links || links.length === 0) return text
  const escaped = links.map((l) => l.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  return text.split(new RegExp(`(${escaped.join('|')})`, 'g')).map((part, i) => {
    const link = links.find((l) => l.text === part)
    return link ? (
      <Link key={i} to={link.to} className="hl-inline-link">
        {part}
      </Link>
    ) : (
      part
    )
  })
}

/** Reusable trio of dark gold-bordered value cards. */
function ValueCards({ cards }) {
  return (
    <div className="row g-2">
      {cards.map((card) => (
        <div className="col-md-4" key={card.title}>
          <div className="hl-value-card h-100">
            <h3>{card.title}</h3>
            <p className="mb-0">{withLinks(card.description, card.links)}</p>
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

      {/* Intro — the page opens straight into this, with no hero banner. */}
      <section className="hl-section hl-about-intro">
        <div className="hl-container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 order-1">
              <div className="hl-about-intro-frame">
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
            </div>
            <div className="col-lg-6 order-2">
              <span className="hl-eyebrow">{intro.eyebrow}</span>
              {/* Held to the reference width so the title breaks after "one". */}
              <h2 className="hl-h2 mb-4" style={{ maxWidth: '30rem' }}>
                {intro.title}
              </h2>
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
              <div className="text-center text-lg-start">
                <Link to={intro.cta.to} className="btn btn-dark-solid mt-4">
                  {intro.cta.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote band */}
      <section
        className="hl-quote-band"
        style={{ backgroundImage: `url(${images['page-hero-banner']})` }}
      >
        <div className="hl-container">
          <p className="hl-quote-text">&ldquo;{quote}&rdquo;</p>
        </div>
      </section>

      {/* Mission */}
      <section className="hl-section hl-bg-cream">
        <div className="hl-container">
          <div className="row g-3">
            <div className="col-lg-5">
              <span className="hl-eyebrow">{mission.eyebrow}</span>
              <h2 className="hl-h2 mb-3">{mission.title}</h2>
              <p className="hl-lead mb-0">{mission.description}</p>
            </div>
            <div className="col-lg-7">
              <ValueCards cards={mission.cards} />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="hl-section">
        <div className="hl-container">
          <div className="row g-3">
            <div className="col-lg-5">
              <span className="hl-eyebrow">{values.eyebrow}</span>
              <h2 className="hl-h2 mb-3">{values.title}</h2>
              <p className="hl-lead mb-0">{withLinks(values.description, values.descriptionLinks)}</p>
            </div>
            <div className="col-lg-7">
              <ValueCards cards={values.cards} />
            </div>
          </div>
        </div>
      </section>

      {/* Difference */}
      <section className="hl-section pt-0">
        <div className="hl-container">
          <span className="hl-eyebrow">{difference.eyebrow}</span>
          <h2 className="hl-h2 mb-5">
            {difference.title}
          </h2>
          <div className="row g-2">
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

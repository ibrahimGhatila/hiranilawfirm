import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import SEO from '../components/common/SEO.jsx'
import ContactCTA from '../components/home/ContactCTA.jsx'
import images from '../assets/images.js'

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

/**
 * Shared layout for a single practice area (Family Law / Personal Injury).
 * `page` is the data object; `path` drives SEO.
 */
export default function PracticeAreaTemplate({ page, path, category, cols = 4 }) {
  const colClass = cols === 3 ? 'col-12 col-md-6 col-lg-4' : 'col-12 col-md-6 col-lg-3'
  const slides = page.slides || [page.slide]
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return undefined
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [slides.length])

  const slide = slides[activeSlide]

  return (
    <>
      <SEO title={page.seo.title} description={page.seo.description} path={path} />

      {/* Hero — the page opens straight into this, with no banner above it. */}
      <section className="hl-section hl-practice-hero">
        <div className="hl-container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 order-2 order-lg-1">
              <span className="hl-eyebrow">{page.eyebrow}</span>
              <h1 className="hl-h2 hl-practice-hero-title">{page.title}</h1>
              {page.paragraphs.map((p, i) => (
                <p key={i} className="hl-body-muted hl-practice-hero-lead">
                  {withLinks(p, page.paragraphLinks)}
                </p>
              ))}
              <div className="hl-practice-stats mt-4">
                {page.stats.map((s) => (
                  <div className="hl-about-stat" key={s.label}>
                    <div className="hl-about-stat-value">{s.value}</div>
                    <div className="hl-about-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2">
              <div className="hl-practice-slide">
                <img
                  src={images[slide.image]}
                  alt={`${slide.eyebrow} — ${slide.title}`}
                  className="hl-practice-slide-img"
                />
                {slides.length > 1 && (
                  <div className="hl-practice-slide-dots" aria-label="Choose slide">
                    {slides.map((s, index) => (
                      <button
                        type="button"
                        key={s.image}
                        className={index === activeSlide ? 'active' : ''}
                        onClick={() => setActiveSlide(index)}
                        aria-label={`Show slide ${index + 1}`}
                        aria-current={index === activeSlide ? 'true' : undefined}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas grid */}
      <section className="hl-section hl-bg-cream">
        <div className="hl-container">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-5">
            <h2 className="hl-h2 mb-0">{page.areasTitle}</h2>
            {page.reviewCta && (
              <Link to={page.reviewCta.to} className="btn btn-dark-solid">
                {page.reviewCta.label}
              </Link>
            )}
          </div>

          <div className="row g-2">
            {page.areas.map((area) => (
              <div className={colClass} key={area.title}>
                <Link
                  to={`/practice-areas/${category}/${area.slug}`}
                  className="hl-area-card h-100 text-decoration-none"
                >
                  <img src={images[area.image]} alt={area.title} loading="lazy" />
                  <div className="hl-area-body">
                    <h3>{area.title}</h3>
                    <p>{area.description}</p>
                    <span className="hl-link-arrow">
                      View More <FiArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attorney band */}
      <section className="hl-attorney-band">
        <div className="hl-container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-4">
              <img
                src={images[page.attorney.image]}
                alt="Sehar Hirani"
                className="hl-attorney-band-img"
                loading="lazy"
              />
            </div>
            <div className="col-lg-8">
              <span className="hl-eyebrow">{page.attorney.eyebrow}</span>
              <h2 className="hl-h2 text-white mb-3" style={{ color: '#fff' }}>
                {page.attorney.title}
              </h2>
              <p className="mb-4" style={{ color: '#c9c5bc', fontSize: '0.935rem' }}>
                {page.attorney.description}
              </p>
              <Link to={page.attorney.cta.to} className="btn btn-gold">
                {page.attorney.cta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

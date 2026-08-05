import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import SEO from '../components/common/SEO.jsx'
import PageHero from '../components/common/PageHero.jsx'
import ContactCTA from '../components/home/ContactCTA.jsx'
import images from '../assets/images.js'

/**
 * Shared layout for a single practice area (Family Law / Personal Injury).
 * `page` is the data object; `path`/`crumb` drive SEO + breadcrumbs.
 */
export default function PracticeAreaTemplate({ page, path, crumb, category, cols = 4 }) {
  const colClass = cols === 3 ? 'col-12 col-md-6 col-lg-4' : 'col-12 col-md-6 col-lg-3'

  return (
    <>
      <SEO title={page.seo.title} description={page.seo.description} path={path} />
      <PageHero
        title={page.title}
        description={page.heroSubtitle}
        crumbs={[{ label: 'Practice Areas', to: '/practice-areas' }, { label: crumb, to: path }]}
        bgImage="page-hero-banner"
      />

      {/* Intro + stats + slideshow image */}
      <section className="hl-section">
        <div className="hl-container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <span className="hl-eyebrow">{page.eyebrow}</span>
              {page.paragraphs.map((p, i) => (
                <p key={i} className="hl-body-muted">
                  {p}
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
            <div className="col-lg-6">
              <div
                className="hl-practice-slide"
                style={{ backgroundImage: `url(${images[page.slide.image]})` }}
              >
                <span className="hl-practice-slide-eyebrow">{page.slide.eyebrow}</span>
                <h2 className="hl-practice-slide-title">{page.slide.title}</h2>
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

          <div className="row g-4">
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

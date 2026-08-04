import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import SEO from '../components/common/SEO.jsx'
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx'
import ContactCTA from '../components/home/ContactCTA.jsx'
import images from '../assets/images.js'
import data from '../data/site.json'

const { attorneyPage, business, memberships } = data

export default function AttorneyProfile() {
  const { hero, sections, quote, strategy, education, sidebar } = attorneyPage

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Attorney',
    name: 'Sehar Hirani',
    jobTitle: 'Family Law & Personal Injury Attorney',
    worksFor: { '@type': 'LegalService', name: business.name },
    url: `${business.url}/about/sehar-hirani`,
    image: `${business.url}/og-image.png`,
    telephone: business.phone,
    alumniOf: ['University of Houston', 'South Texas College of Law'],
  }

  return (
    <>
      <SEO
        title={attorneyPage.seo.title}
        description={attorneyPage.seo.description}
        path="/about/sehar-hirani"
        jsonLd={jsonLd}
      />

      {/* Dark hero */}
      <section className="hl-attorney-hero">
        <div className="hl-container">
          <div className="row g-0 align-items-stretch">
            <div className="col-lg-5">
              <img src={images[hero.image]} alt={hero.name} className="hl-attorney-hero-img" />
            </div>
            <div className="col-lg-7">
              <div className="hl-attorney-hero-body">
                <span className="hl-eyebrow">{hero.eyebrow}</span>
                <h1 className="hl-display text-white mb-2">{hero.name}</h1>
                {hero.subtitle.map((s) => (
                  <div key={s} className="hl-attorney-hero-sub">
                    {s}
                  </div>
                ))}
                <p className="hl-attorney-hero-desc mt-3">{hero.description}</p>
                <Link to={hero.cta.to} className="btn btn-gold mt-3">
                  {hero.cta.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Breadcrumbs items={[{ label: 'Sehar Hirani', to: '/about/sehar-hirani' }]} />

      {/* Body + sidebar */}
      <section className="hl-section">
        <div className="hl-container">
          <div className="row g-5">
            {/* Main column */}
            <div className="col-lg-8">
              {sections.map((sec) => (
                <div key={sec.title} className="mb-4">
                  <h2 className="hl-h3 hl-underline-title mb-3">{sec.title}</h2>
                  {sec.paragraphs.map((p, i) => (
                    <p key={i} className="hl-body-muted">
                      {p}
                    </p>
                  ))}
                </div>
              ))}

              <blockquote className="hl-blockquote">
                <p className="mb-3">&ldquo;{quote.text}&rdquo;</p>
                <cite>— {quote.author}</cite>
              </blockquote>

              <div className="row g-4 align-items-center my-2">
                <div className="col-md-6">
                  <h2 className="hl-h3 mb-3">{strategy.title}</h2>
                  {strategy.paragraphs.map((p, i) => (
                    <p key={i} className="hl-body-muted">
                      {p}
                    </p>
                  ))}
                </div>
                <div className="col-md-6">
                  <img
                    src={images[strategy.image]}
                    alt="Hirani Law Firm team"
                    className="hl-rounded-img"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="mt-4">
                <h2 className="hl-h3 hl-underline-title mb-3">{education.title}</h2>
                {education.paragraphs.map((p, i) => (
                  <p key={i} className="hl-body-muted">
                    {p}
                  </p>
                ))}
              </div>

              {/* Memberships tiles */}
              <div className="mt-5">
                <div className="hl-membership-label text-start ps-0" style={{ color: 'var(--hl-muted)' }}>
                  {memberships.eyebrow}
                </div>
                <div className="hl-membership-tiles">
                  {memberships.logos.map((logo) => (
                    <div className="hl-membership-tile" key={logo.src}>
                      <img src={images[logo.src]} alt={logo.alt} loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="hl-side-consult mb-4">
                <span className="hl-eyebrow">{sidebar.consult.eyebrow}</span>
                <h3 className="hl-h3 text-white mb-2">{sidebar.consult.title}</h3>
                <p className="mb-3" style={{ color: '#b7b2a8', fontSize: '0.95rem' }}>
                  {sidebar.consult.note}
                </p>
                <Link to={sidebar.consult.cta.to} className="btn btn-gold w-100 mb-3">
                  {sidebar.consult.cta.label}
                </Link>
                <a href={business.phoneHref} className="hl-side-phone">
                  {business.phone}
                </a>
              </div>

              <div className="hl-side-list mb-4">
                <div className="hl-side-list-title">{sidebar.practiceAreas.title}</div>
                {sidebar.practiceAreas.items.map((item) => (
                  <div className="hl-side-list-item" key={item}>
                    {item}
                  </div>
                ))}
              </div>

              <div className="hl-side-list">
                <div className="hl-side-list-title">{sidebar.reviews.title}</div>
                {sidebar.reviews.items.map((r) => (
                  <div className="hl-side-review" key={r.author}>
                    <div className="hl-side-stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <p className="mb-1 fst-italic">&ldquo;{r.text}&rdquo;</p>
                    <span className="hl-side-review-author">— {r.author}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

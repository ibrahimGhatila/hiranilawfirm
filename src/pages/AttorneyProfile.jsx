import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import SEO from '../components/common/SEO.jsx'
import PageHero from '../components/common/PageHero.jsx'
import ContactCTA from '../components/home/ContactCTA.jsx'
import images from '../assets/images.js'
import data from '../data/site.json'

const { attorneyPage, business, memberships } = data

export default function AttorneyProfile() {
  const { hero, sections, quote, strategy, education, sidebar } = attorneyPage
  const strategyImages = strategy.images || [strategy.image]
  const [activeStrategyImage, setActiveStrategyImage] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStrategyImage((current) => (current + 1) % strategyImages.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [strategyImages.length])

  const showStrategyImage = (index) => {
    setActiveStrategyImage((index + strategyImages.length) % strategyImages.length)
  }

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

      <PageHero
        title={hero.name}
        description="Family Law & Personal Injury Attorney serving Greater Houston and clients across Texas."
        crumbs={[{ label: 'About Us', to: '/about' }, { label: hero.name, to: '/about/sehar-hirani' }]}
        bgImage="page-hero-banner"
      />

      {/* Attorney profile introduction */}
      <section className="hl-section-sm hl-attorney-profile-intro">
        <div className="hl-container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-4">
              <img src={images[hero.image]} alt={hero.name} className="hl-attorney-hero-img" />
            </div>
            <div className="col-lg-8">
              <div className="hl-attorney-profile-body">
                <span className="hl-eyebrow">{hero.eyebrow}</span>
                <h2 className="hl-h2 mb-2">{hero.name}</h2>
                {hero.subtitle.map((s) => (
                  <div key={s} className="hl-attorney-hero-sub">
                    {s}
                  </div>
                ))}
                <p className="hl-body-muted hl-attorney-profile-desc mt-3">{hero.description}</p>
                <Link to={hero.cta.to} className="btn btn-gold mt-3">
                  {hero.cta.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body + sidebar */}
      <section className="hl-section pt-0">
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
                  <div className="hl-about-carousel hl-strategy-carousel" aria-roledescription="carousel" aria-label="Hirani Law Firm team photos">
                    <img
                      src={images[strategyImages[activeStrategyImage]]}
                      alt={`Hirani Law Firm team photo ${activeStrategyImage + 1} of ${strategyImages.length}`}
                      className="hl-strategy-carousel-img"
                      loading="lazy"
                    />
                    <div className="hl-about-carousel-dots" aria-label="Choose team photo">
                      {strategyImages.map((image, index) => (
                        <button type="button" key={image} className={index === activeStrategyImage ? 'active' : ''} onClick={() => showStrategyImage(index)} aria-label={`Show team photo ${index + 1}`} aria-current={index === activeStrategyImage ? 'true' : undefined} />
                      ))}
                    </div>
                  </div>
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
              <div className="hl-attorney-sidebar">
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
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

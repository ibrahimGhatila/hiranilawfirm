import { useParams, Link, Navigate } from 'react-router-dom'
import SEO from '../components/common/SEO.jsx'
import PageHero from '../components/common/PageHero.jsx'
import ContactCTA from '../components/home/ContactCTA.jsx'
import data, { currentLang } from '../data/active.js'
import detailsEn from '../data/practiceDetails.json'
import detailsEs from '../data/practiceDetails.es.json'

const { business } = data
// Sidebar consult box copy is language-aware (shares the attorney-page strings).
const consult = data.attorneyPage.sidebar.consult
// Practice-area detail content follows the active language (Spanish mirror
// falls back to English content per item where a translation is missing).
const details = currentLang === 'es' ? detailsEs : detailsEn

export default function PracticeDetail() {
  const { category, slug } = useParams()
  const group = details[category]
  const item = group?.items.find((i) => i.slug === slug)

  // Unknown slug/category → send back to the practice areas index.
  if (!item) return <Navigate to="/practice-areas" replace />

  const categoryPath = `/practice-areas/${category}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `${item.title} — ${business.name}`,
    serviceType: item.title,
    description: item.heroSubtitle,
    url: `${business.url}${categoryPath}/${slug}`,
    telephone: business.phone,
    areaServed: 'Greater Houston, TX',
    provider: { '@type': 'LegalService', name: business.name },
  }

  return (
    <>
      <SEO
        title={item.heroTitle}
        description={item.heroSubtitle}
        path={`${categoryPath}/${slug}`}
        jsonLd={jsonLd}
      />
      <PageHero
        title={item.heroTitle}
        description={item.heroSubtitle}
        crumbs={[
          { label: data.ui.practiceAreasLabel, to: '/practice-areas' },
          { label: group.label, to: categoryPath },
          { label: item.title, to: `${categoryPath}/${slug}` },
        ]}
        bgImage="page-hero-banner"
      />

      <section className="hl-section">
        <div className="hl-container">
          <div className="row g-5">
            {/* Main content */}
            <div className="col-lg-8">
              {item.sections.map((sec, si) => (
                <div className="hl-detail-section" key={si}>
                  {sec.heading && <h2 className="hl-detail-heading">{sec.heading}</h2>}
                  {sec.paragraphs?.map((p, i) => (
                    <p key={i} className="hl-body-muted">
                      {p}
                    </p>
                  ))}
                  {sec.bullets && (
                    <ul className="hl-detail-list">
                      {sec.bullets.map((b, i) => (
                        <li key={i} className="hl-body-muted">
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="hl-side-consult mb-4">
                <span className="hl-eyebrow">{consult.eyebrow}</span>
                <h3 className="hl-h3 text-white mb-2">{consult.title}</h3>
                <p className="mb-3" style={{ color: '#b7b2a8', fontSize: '0.8075rem' }}>
                  {consult.note}
                </p>
                <Link to={consult.cta.to} className="btn btn-gold w-100 mb-3">
                  {consult.cta.label}
                </Link>
                <a href={business.phoneHref} className="hl-side-phone">
                  {business.phone}
                </a>
              </div>

              <div className="hl-side-list">
                <div className="hl-side-list-title">{group.label}</div>
                {group.items.map((sibling) => {
                  const active = sibling.slug === slug
                  return (
                    <Link
                      key={sibling.slug}
                      to={`${categoryPath}/${sibling.slug}`}
                      className={'hl-side-link' + (active ? ' active' : '')}
                    >
                      {sibling.title}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

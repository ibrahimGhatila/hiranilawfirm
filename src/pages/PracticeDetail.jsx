import { useParams, Link, Navigate } from 'react-router-dom'
import SEO from '../components/common/SEO.jsx'
import PageHero from '../components/common/PageHero.jsx'
import ContactCTA from '../components/home/ContactCTA.jsx'
import data from '../data/site.json'
import details from '../data/practiceDetails.json'

const { business } = data

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
          { label: 'Practice Areas', to: '/practice-areas' },
          { label: group.label, to: categoryPath },
          { label: item.title, to: `${categoryPath}/${slug}` },
        ]}
        bgImage="justice-band"
      />

      <section className="hl-section">
        <div className="hl-container">
          <div className="row g-5">
            {/* Main content */}
            <div className="col-lg-8">
              {item.sections.map((sec) => (
                <div className="hl-detail-section" key={sec.heading}>
                  <h2 className="hl-detail-heading">{sec.heading}</h2>
                  {sec.paragraphs.map((p, i) => (
                    <p key={i} className="hl-body-muted">
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="hl-side-consult mb-4">
                <span className="hl-eyebrow">Free Consultation</span>
                <h3 className="hl-h3 text-white mb-2">Talk to Sehar Hirani Today</h3>
                <p className="mb-3" style={{ color: '#b7b2a8', fontSize: '0.95rem' }}>
                  Confidential · No obligation · We respond within 24 hours.
                </p>
                <Link to="/contact" className="btn btn-gold w-100 mb-3">
                  Request Consultation
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

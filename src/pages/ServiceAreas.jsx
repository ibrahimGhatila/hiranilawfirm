import { Link } from 'react-router-dom'
import SEO from '../components/common/SEO.jsx'
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx'
import LeadForm from '../components/home/LeadForm.jsx'
import data from '../data/site.json'

const { serviceAreaPage, business, contactCta } = data

function CountyMap({ query }) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(
    query
  )}&t=&z=9&ie=UTF8&iwloc=&output=embed`
  return (
    <iframe
      className="hl-county-map"
      title={`Map of ${query}`}
      src={src}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  )
}

export default function ServiceAreas() {
  const { intro, contactCard, areas, cta } = serviceAreaPage

  return (
    <>
      <SEO
        title={serviceAreaPage.seo.title}
        description={serviceAreaPage.seo.description}
        path="/about/service-areas"
      />
      <Breadcrumbs items={[{ label: 'Service Areas', to: '/about/service-areas' }]} />

      {/* Intro + contact card */}
      <section className="hl-section">
        <div className="hl-container">
          <div className="row g-5">
            <div className="col-lg-8">
              <span className="hl-eyebrow">{intro.eyebrow}</span>
              <h2 className="hl-h2 mb-4">{intro.title}</h2>
              {intro.paragraphs.map((p, i) => (
                <p key={i} className="hl-body-muted">
                  {p}
                </p>
              ))}
              <div className="mt-4">
                <span className="hl-eyebrow">{intro.citiesLabel}</span>
                <div className="hl-pill-group mt-2">
                  {intro.cities.map((c) => (
                    <span className="hl-pill" key={c}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="hl-contact-card">
                <span className="hl-eyebrow">{contactCard.eyebrow}</span>

                <div className="hl-contact-row">
                  <div className="hl-contact-label">{contactCard.phoneLabel}</div>
                  <a href={business.phoneHref} className="hl-contact-phone">
                    {business.phone}
                  </a>
                </div>
                <div className="hl-contact-row">
                  <div className="hl-contact-label">{contactCard.addressLabel}</div>
                  {contactCard.address.map((a) => (
                    <div key={a}>{a}</div>
                  ))}
                </div>
                <div className="hl-contact-row">
                  <div className="hl-contact-label">{contactCard.hoursLabel}</div>
                  {contactCard.hours.map((h) => (
                    <div key={h}>{h}</div>
                  ))}
                </div>
                <div className="hl-contact-row">
                  <div className="hl-contact-label">{contactCard.emailLabel}</div>
                  <a href={`mailto:${contactCard.email}`}>{contactCard.email}</a>
                </div>
                <Link to={contactCard.cta.to} className="btn btn-gold w-100 mt-3">
                  {contactCard.cta.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* County list */}
      <section className="hl-section hl-bg-cream">
        <div className="hl-container">
          <span className="hl-eyebrow">{areas.eyebrow}</span>
          <h2 className="hl-h2 mb-5" style={{ maxWidth: '24ch' }}>
            {areas.title}
          </h2>

          <div className="hl-county-list">
            {areas.counties.map((county) => (
              <div
                className={'hl-county-row' + (county.highlight ? ' highlight' : '')}
                key={county.name}
              >
                <div className="hl-county-info">
                  <h3 className="hl-h3 mb-3">{county.name}</h3>
                  <p className="hl-body-muted">{county.description}</p>
                  <div className="hl-county-cities">
                    {county.cities.map((c) => (
                      <span key={c}>{c}</span>
                    ))}
                  </div>
                </div>
                <div className="hl-county-map-wrap">
                  <CountyMap query={county.map} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="hl-section hl-bg-cream pt-0">
        <div className="hl-container">
          <div className="hl-card-accent p-4 p-lg-5">
            <div className="row g-5 align-items-center">
              <div className="col-lg-6">
                <span className="hl-eyebrow">{cta.eyebrow}</span>
                <h2 className="hl-h2 mb-4">{cta.title}</h2>
                <p className="hl-lead mb-4">{cta.description}</p>
                <div className="hl-cta-divider" />
                <div className="hl-cta-phone-label mb-1">Phone</div>
                <a href={business.phoneHref} className="hl-cta-phone d-block mb-3">
                  {business.phone}
                </a>
                <div className="hl-cta-phone-label mb-1">{cta.addressLabel}</div>
                <div className="hl-body-muted">{cta.address}</div>
              </div>
              <div className="col-lg-6">
                <LeadForm
                  helpOptions={contactCta.form.helpOptions}
                  submitLabel="Submit"
                  submitClass="btn-dark-solid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

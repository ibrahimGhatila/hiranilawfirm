import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import SEO from '../components/common/SEO.jsx'
import PageHero from '../components/common/PageHero.jsx'
import LeadForm from '../components/home/LeadForm.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import data from '../data/site.json'

const { contactPage, contactCta, business } = data

export default function Contact() {
  const { hero, form, info, map, links, whyApart } = contactPage
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    map
  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    map
  )}`

  return (
    <>
      <SEO title={contactPage.seo.title} description={contactPage.seo.description} path="/contact" />
      <PageHero
        title={hero.title}
        description={hero.description}
        crumbs={[{ label: 'Contact', to: '/contact' }]}
      />

      {/* Form + info */}
      <section className="hl-section">
        <div className="hl-container">
          <div className="row g-5">
            <div className="col-lg-7">
              <span className="hl-eyebrow">{form.eyebrow}</span>
              <h2 className="hl-h2 mb-3">{form.title}</h2>
              <p className="hl-body-muted mb-4">{form.description}</p>
              <LeadForm
                helpOptions={contactCta.form.helpOptions}
                submitLabel="Submit"
                submitClass="btn-dark-solid"
              />
            </div>

            <div className="col-lg-5">
              <div className="hl-contact-card">
                <div className="hl-contact-row">
                  <div className="hl-contact-label">{info.phoneLabel}</div>
                  <a href={business.phoneHref} className="hl-contact-phone">
                    {business.phone}
                  </a>
                </div>
                <div className="hl-contact-row">
                  <div className="hl-contact-label">{info.emailLabel}</div>
                  <a href={`mailto:${info.email}`}>{info.email}</a>
                </div>
                <div className="hl-contact-row">
                  <div className="hl-contact-label">{info.addressLabel}</div>
                  {info.address.map((a) => (
                    <div key={a}>{a}</div>
                  ))}
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hl-link-arrow mt-2 d-inline-flex"
                  >
                    {info.directionsLabel} <FiArrowRight size={13} />
                  </a>
                </div>
                <div className="hl-contact-row">
                  <div className="hl-contact-label">{info.hoursLabel}</div>
                  {info.hours.map((h) => (
                    <div key={h.day} className="d-flex justify-content-between">
                      <span>{h.day}</span>
                      <span className="text-muted">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width map */}
      <iframe
        className="hl-contact-map"
        title="Hirani Law Firm location"
        src={mapSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Link accordion */}
      <section className="hl-section-sm">
        <div className="hl-container">
          <div className="hl-link-list">
            {links.map((link, i) => (
              <Link
                to={link.to}
                key={i}
                className={'hl-link-row' + (i % 2 === 1 ? ' alt' : '')}
              >
                <span>{link.label}</span>
                <span className="hl-link-row-more">Read More</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why apart */}
      <section className="hl-section hl-bg-dark">
        <div className="hl-container">
          <span className="hl-eyebrow">{whyApart.eyebrow}</span>
          <h2 className="hl-h2 text-white mb-5" style={{ color: '#fff', maxWidth: '28ch' }}>
            {whyApart.title}
          </h2>
          <div className="row g-4">
            {whyApart.cards.map((card) => (
              <div className="col-md-6" key={card.title}>
                <div className="hl-apart-card h-100">
                  <h3>{card.title}</h3>
                  <p className="mb-0">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  )
}

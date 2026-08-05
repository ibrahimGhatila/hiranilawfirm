import { useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import SEO from '../components/common/SEO.jsx'
import PageHero from '../components/common/PageHero.jsx'
import LeadForm from '../components/home/LeadForm.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import data from '../data/site.json'

const { contactPage, contactCta, business } = data

export default function Contact() {
  // Each panel opens independently; they all start collapsed (Read More) on
  // every page load — no persisted state.
  const [openAbout, setOpenAbout] = useState(() => contactPage.about.map(() => false))
  const toggleAbout = (i) =>
    setOpenAbout((prev) => prev.map((v, idx) => (idx === i ? !v : v)))
  const { hero, form, info, map, about, whyApart } = contactPage
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

      {/* About accordion */}
      {about.map((item, i) => {
        const isOpen = openAbout[i]
        const panelId = `about-panel-${i}`
        return (
          <section
            key={item.heading}
            className={'hl-section hl-about-acc' + (i % 2 === 1 ? ' hl-bg-cream' : '')}
          >
            <div className="hl-container">
              <div className="hl-about-acc-head">
                <h2 className="hl-h2 mb-0">{item.heading}</h2>
                <button
                  type="button"
                  className="hl-about-acc-toggle"
                  onClick={() => toggleAbout(i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  {isOpen ? 'Show Less' : 'Read More'}
                </button>
              </div>
              <hr className="hl-about-acc-rule" />
              {isOpen && (
                <div className="hl-about-acc-body" id={panelId}>
                  {item.intro && <p className="hl-body-muted">{item.intro}</p>}
                  {item.bullets && (
                    <ul className="hl-about-acc-list">
                      {item.bullets.map((b, bi) => (
                        <li key={bi}>
                          <strong>{b.label}</strong>{' '}
                          <span className="hl-body-muted">{b.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.outro && <p className="hl-body-muted mb-0">{item.outro}</p>}
                </div>
              )}
            </div>
          </section>
        )
      })}

      {/* Why apart */}
      <section className="hl-section hl-bg-dark">
        <div className="hl-container">
          <span className="hl-eyebrow">{whyApart.eyebrow}</span>
          <h2 className="hl-h2 text-white mb-5" style={{ color: '#fff', maxWidth: '28ch' }}>
            {whyApart.title}
          </h2>
          <div className="row g-2">
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

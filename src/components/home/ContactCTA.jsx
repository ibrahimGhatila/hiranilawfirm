import LeadForm from './LeadForm.jsx'
import data from '../../data/active.js'

const { contactCta, business } = data

export default function ContactCTA() {
  return (
    <section className="hl-section hl-cta">
      <div className="hl-container">
        <div className="hl-card-accent p-4 p-lg-5">
          <div className="row g-4 g-lg-5 align-items-center">
            {/* Copy + phone (phone is prominent on desktop only) */}
            <div className="col-lg-6">
              <span className="hl-eyebrow">{contactCta.eyebrow}</span>
              <h2 className="hl-h2 mb-4">{contactCta.title}</h2>
              <p className="hl-lead mb-4">{contactCta.description}</p>
              <div className="d-none d-lg-block">
                <div className="hl-cta-divider" />
                <div className="hl-cta-phone-label mb-1">
                  {contactCta.phoneLabel}
                </div>
                <a href={business.phoneHref} className="hl-cta-phone">
                  {business.phone}
                </a>
              </div>
            </div>

            {/* Form — the primary action on mobile; phone sits below it, muted */}
            <div className="col-lg-6">
              <LeadForm
                helpOptions={contactCta.form.helpOptions}
                submitLabel={contactCta.form.submitLabel}
                submitClass="btn-dark-solid"
                layout="spaced"
              />
              <a href={business.phoneHref} className="hl-cta-phone-mini d-lg-none">
                {contactCta.phoneLabel}: <strong>{business.phone}</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

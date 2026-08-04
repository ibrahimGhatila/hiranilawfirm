import LeadForm from './LeadForm.jsx'
import data from '../../data/site.json'

const { contactCta, business } = data

export default function ContactCTA() {
  return (
    <section className="hl-section hl-cta">
      <div className="hl-container">
        <div className="hl-card-accent p-4 p-lg-5">
          <div className="row g-5 align-items-center">
            {/* Copy + phone */}
            <div className="col-lg-6">
              <span className="hl-eyebrow">{contactCta.eyebrow}</span>
              <h2 className="hl-h2 mb-4">{contactCta.title}</h2>
              <p className="hl-lead mb-4">{contactCta.description}</p>
              <div className="hl-cta-divider" />
              <div className="hl-cta-phone-label mb-1">
                {contactCta.phoneLabel}
              </div>
              <a href={business.phoneHref} className="hl-cta-phone">
                {business.phone}
              </a>
            </div>

            {/* Form */}
            <div className="col-lg-6">
              <LeadForm
                helpOptions={contactCta.form.helpOptions}
                submitLabel={contactCta.form.submitLabel}
                submitClass="btn-dark-solid"
                layout="spaced"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

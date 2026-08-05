import { useState } from 'react'

// Where every lead form delivers. All forms open the visitor's mail client
// with a pre-filled message addressed here.
const RECIPIENT = 'info@hiranilawfirm.com'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[\d\s()+.-]{7,}$/

/**
 * Reusable lead-capture form. Validates the fields, then hands the visitor off
 * to their email client via a mailto: link addressed to the firm.
 * `layout` = "stacked" (hero) or "spaced" (bottom CTA, larger gaps).
 */
export default function LeadForm({
  helpOptions = [],
  submitLabel = 'Submit',
  submitClass = 'btn-dark-solid',
  layout = 'stacked',
}) {
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    help: '',
  })

  const update = (key) => (e) => {
    const { value } = e.target
    setForm((prev) => ({ ...prev, [key]: value }))
    // Clear a field's error as soon as the visitor edits it.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
  }

  const validate = () => {
    const next = {}
    if (!form.firstName.trim()) next.firstName = 'Please enter your first name.'
    if (!form.lastName.trim()) next.lastName = 'Please enter your last name.'
    if (!form.email.trim()) next.email = 'Please enter your email address.'
    else if (!EMAIL_RE.test(form.email.trim())) next.email = 'Please enter a valid email address.'
    if (form.phone.trim() && !PHONE_RE.test(form.phone.trim()))
      next.phone = 'Please enter a valid phone number.'
    if (!form.help) next.help = 'Please tell us what you need help with.'
    return next
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`.trim()
    const subject = `Consultation Request — ${fullName}`
    const body = [
      `Name: ${fullName}`,
      `Email: ${form.email.trim()}`,
      `Phone: ${form.phone.trim() || 'Not provided'}`,
      `How can we help: ${form.help}`,
    ].join('\r\n')

    const mailto = `mailto:${RECIPIENT}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setSent(true)
  }

  const gap = layout === 'spaced' ? 'gap-3' : 'gap-3'

  if (sent) {
    return (
      <div className="p-3 text-center" role="status">
        <p className="mb-1 fw-bold" style={{ color: 'var(--hl-gold)' }}>
          Thank you.
        </p>
        <p className="mb-0 text-muted" style={{ fontSize: '0.8075rem' }}>
          Your email client should have opened with your message to us. If it did not, please
          email us directly at{' '}
          <a href={`mailto:${RECIPIENT}`}>{RECIPIENT}</a>.
        </p>
      </div>
    )
  }

  return (
    <form className={`hl-form d-flex flex-column ${gap}`} onSubmit={handleSubmit} noValidate>
      <div className="row g-3">
        <div className="col-6">
          <input
            type="text"
            className={'form-control' + (errors.firstName ? ' is-invalid' : '')}
            placeholder="First Name"
            value={form.firstName}
            onChange={update('firstName')}
            required
            aria-label="First name"
          />
          {errors.firstName && <div className="invalid-feedback d-block">{errors.firstName}</div>}
        </div>
        <div className="col-6">
          <input
            type="text"
            className={'form-control' + (errors.lastName ? ' is-invalid' : '')}
            placeholder="Last Name"
            value={form.lastName}
            onChange={update('lastName')}
            required
            aria-label="Last name"
          />
          {errors.lastName && <div className="invalid-feedback d-block">{errors.lastName}</div>}
        </div>
      </div>

      <div>
        <input
          type="email"
          className={'form-control' + (errors.email ? ' is-invalid' : '')}
          placeholder="Email address"
          value={form.email}
          onChange={update('email')}
          required
          aria-label="Email address"
        />
        {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
      </div>

      <div>
        <input
          type="tel"
          className={'form-control' + (errors.phone ? ' is-invalid' : '')}
          placeholder="Phone number"
          value={form.phone}
          onChange={update('phone')}
          aria-label="Phone number"
        />
        {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
      </div>

      <div>
        <select
          className={'form-select' + (errors.help ? ' is-invalid' : '')}
          value={form.help}
          onChange={update('help')}
          aria-label="What do you need help with?"
          required
        >
          <option value="" disabled>
            What do you need help with?
          </option>
          {helpOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.help && <div className="invalid-feedback d-block">{errors.help}</div>}
      </div>

      <button type="submit" className={`btn ${submitClass} w-100`}>
        {submitLabel}
      </button>
    </form>
  )
}

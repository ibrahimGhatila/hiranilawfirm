import { useState } from 'react'

/**
 * Reusable lead-capture form (no backend — logs + shows a thank-you note).
 * `layout` = "stacked" (hero) or "spaced" (bottom CTA, larger gaps).
 */
export default function LeadForm({
  helpOptions = [],
  submitLabel = 'Submit',
  submitClass = 'btn-dark-solid',
  layout = 'stacked',
}) {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    help: '',
  })

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder submission — wire to a backend / email service later.
    // eslint-disable-next-line no-console
    console.log('Lead submitted:', form)
    setSent(true)
  }

  const gap = layout === 'spaced' ? 'gap-3' : 'gap-3'

  if (sent) {
    return (
      <div className="p-3 text-center" role="status">
        <p className="mb-1 fw-bold" style={{ color: 'var(--hl-gold)' }}>
          Thank you.
        </p>
        <p className="mb-0 text-muted" style={{ fontSize: '0.95rem' }}>
          We received your request and will reach out shortly.
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
            className="form-control"
            placeholder="First Name"
            value={form.firstName}
            onChange={update('firstName')}
            required
            aria-label="First name"
          />
        </div>
        <div className="col-6">
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            value={form.lastName}
            onChange={update('lastName')}
            required
            aria-label="Last name"
          />
        </div>
      </div>

      <input
        type="email"
        className="form-control"
        placeholder="Email address"
        value={form.email}
        onChange={update('email')}
        required
        aria-label="Email address"
      />

      <input
        type="tel"
        className="form-control"
        placeholder="Phone number"
        value={form.phone}
        onChange={update('phone')}
        aria-label="Phone number"
      />

      <select
        className="form-select"
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

      <button type="submit" className={`btn ${submitClass} w-100`}>
        {submitLabel}
      </button>
    </form>
  )
}

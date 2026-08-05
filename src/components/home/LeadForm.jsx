import { useState } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[\d\s()+.-]{7,}$/

/** Reusable lead form delivered through the server-side Resend endpoint. */
export default function LeadForm({
  helpOptions = [],
  submitLabel = 'Submit',
  submitClass = 'btn-dark-solid',
  layout = 'stacked',
}) {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    help: '',
    website: '',
  })

  const update = (key) => (event) => {
    const { value } = event.target
    setForm((previous) => ({ ...previous, [key]: value }))
    setErrors((previous) => (previous[key] ? { ...previous, [key]: undefined } : previous))
    if (submitError) setSubmitError('')
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

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSending(true)
    setSubmitError('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          formContext: layout === 'spaced' ? 'Page consultation section' : 'Consultation form',
          sourceUrl: window.location.href,
          pageTitle: document.title,
          referrer: document.referrer,
        }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error || 'Unable to send your request.')
      setSent(true)
    } catch (error) {
      setSubmitError(error.message || 'Unable to send your request. Please try again.')
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className="p-3 text-center" role="status">
        <p className="mb-1 fw-bold" style={{ color: 'var(--hl-gold)' }}>Thank you.</p>
        <p className="mb-0 text-muted" style={{ fontSize: '0.8075rem' }}>
          Your consultation request has been sent successfully. Our team will contact you soon.
        </p>
      </div>
    )
  }

  return (
    <form className="hl-form d-flex flex-column gap-3 position-relative" onSubmit={handleSubmit} noValidate>
      <div className="position-absolute opacity-0 pe-none" aria-hidden="true">
        <label htmlFor="website-field">Website</label>
        <input id="website-field" type="text" tabIndex="-1" autoComplete="off" value={form.website} onChange={update('website')} />
      </div>

      <div className="row g-3">
        <div className="col-6">
          <input type="text" className={'form-control' + (errors.firstName ? ' is-invalid' : '')} placeholder="First Name" value={form.firstName} onChange={update('firstName')} required aria-label="First name" />
          {errors.firstName && <div className="invalid-feedback d-block">{errors.firstName}</div>}
        </div>
        <div className="col-6">
          <input type="text" className={'form-control' + (errors.lastName ? ' is-invalid' : '')} placeholder="Last Name" value={form.lastName} onChange={update('lastName')} required aria-label="Last name" />
          {errors.lastName && <div className="invalid-feedback d-block">{errors.lastName}</div>}
        </div>
      </div>

      <div>
        <input type="email" className={'form-control' + (errors.email ? ' is-invalid' : '')} placeholder="Email address" value={form.email} onChange={update('email')} required aria-label="Email address" />
        {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
      </div>

      <div>
        <input type="tel" className={'form-control' + (errors.phone ? ' is-invalid' : '')} placeholder="Phone number" value={form.phone} onChange={update('phone')} aria-label="Phone number" />
        {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
      </div>

      <div>
        <select className={'form-select' + (errors.help ? ' is-invalid' : '')} value={form.help} onChange={update('help')} aria-label="What do you need help with?" required>
          <option value="" disabled>What do you need help with?</option>
          {helpOptions.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        {errors.help && <div className="invalid-feedback d-block">{errors.help}</div>}
      </div>

      {submitError && <div className="alert alert-danger py-2 mb-0" role="alert" style={{ fontSize: '0.8075rem' }}>{submitError}</div>}
      <button type="submit" className={`btn ${submitClass} w-100`} disabled={sending}>
        {sending ? 'Sending…' : submitLabel}
      </button>
    </form>
  )
}

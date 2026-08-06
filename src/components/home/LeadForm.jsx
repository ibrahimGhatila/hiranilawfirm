import { useState } from 'react'
import data from '../../data/active.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[\d\s()+.-]{7,}$/
// Interface copy follows the active language (English / Spanish).
const t = data.ui.form

/** Reusable lead form delivered through the server-side Resend endpoint. */
export default function LeadForm({
  helpOptions = [],
  submitLabel = t.submit,
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
    if (!form.firstName.trim()) next.firstName = t.errFirstName
    if (!form.lastName.trim()) next.lastName = t.errLastName
    if (!form.email.trim()) next.email = t.errEmailRequired
    else if (!EMAIL_RE.test(form.email.trim())) next.email = t.errEmailInvalid
    if (form.phone.trim() && !PHONE_RE.test(form.phone.trim()))
      next.phone = t.errPhoneInvalid
    if (!form.help) next.help = t.errHelp
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
      if (!response.ok) throw new Error(result.error || t.errGeneric)
      setSent(true)
    } catch (error) {
      setSubmitError(error.message || t.errGeneric)
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className="p-3 text-center" role="status">
        <p className="mb-1 fw-bold" style={{ color: 'var(--hl-gold)' }}>{t.successTitle}</p>
        <p className="mb-0 text-muted" style={{ fontSize: '0.8075rem' }}>
          {t.successBody}
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
          <input type="text" className={'form-control' + (errors.firstName ? ' is-invalid' : '')} placeholder={t.firstName} value={form.firstName} onChange={update('firstName')} required aria-label={t.firstName} />
          {errors.firstName && <div className="invalid-feedback d-block">{errors.firstName}</div>}
        </div>
        <div className="col-6">
          <input type="text" className={'form-control' + (errors.lastName ? ' is-invalid' : '')} placeholder={t.lastName} value={form.lastName} onChange={update('lastName')} required aria-label={t.lastName} />
          {errors.lastName && <div className="invalid-feedback d-block">{errors.lastName}</div>}
        </div>
      </div>

      <div>
        <input type="email" className={'form-control' + (errors.email ? ' is-invalid' : '')} placeholder={t.email} value={form.email} onChange={update('email')} required aria-label={t.email} />
        {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
      </div>

      <div>
        <input type="tel" className={'form-control' + (errors.phone ? ' is-invalid' : '')} placeholder={t.phone} value={form.phone} onChange={update('phone')} aria-label={t.phone} />
        {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
      </div>

      <div>
        <select className={'form-select' + (errors.help ? ' is-invalid' : '')} value={form.help} onChange={update('help')} aria-label={t.helpPlaceholder} required>
          <option value="" disabled>{t.helpPlaceholder}</option>
          {helpOptions.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        {errors.help && <div className="invalid-feedback d-block">{errors.help}</div>}
      </div>

      {submitError && <div className="alert alert-danger py-2 mb-0" role="alert" style={{ fontSize: '0.8075rem' }}>{submitError}</div>}
      <button type="submit" className={`btn ${submitClass} w-100`} disabled={sending}>
        {sending ? t.sending : submitLabel}
      </button>
    </form>
  )
}

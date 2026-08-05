import { useEffect, useRef, useState } from 'react'
import { FiX } from 'react-icons/fi'
import LeadForm from '../home/LeadForm.jsx'
import images from '../../assets/images.js'
import data from '../../data/active.js'

const POPUP_KEY = 'hl-consultation-popup-shown'

export default function ConsultationPopup() {
  const [open, setOpen] = useState(false)
  const closeRef = useRef(null)

  useEffect(() => {
    if (window.sessionStorage.getItem(POPUP_KEY)) return undefined

    const timer = window.setTimeout(() => {
      setOpen(true)
      window.sessionStorage.setItem(POPUP_KEY, 'true')
    }, 25000)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  if (!open) return null

  return (
    <div className="hl-consult-popup-backdrop" onMouseDown={() => setOpen(false)}>
      <section
        className="hl-consult-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-popup-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="hl-consult-popup-close" onClick={() => setOpen(false)} aria-label="Close consultation form">
          <FiX />
        </button>

        <div className="hl-consult-popup-image-wrap">
          <img src={images['sehar-attorney-profile']} alt="Attorney Sehar Hirani" />
          <div className="hl-consult-popup-image-caption">Sehar Hirani · Attorney at Law</div>
        </div>

        <div className="hl-consult-popup-content">
          <span className="hl-eyebrow">We&rsquo;re Here to Help</span>
          <h2 id="consult-popup-title" className="hl-h3 mb-2">Need a consultation?</h2>
          <p className="hl-body-muted mb-4">Tell us what you&rsquo;re facing. Your first conversation is free and confidential.</p>
          <LeadForm
            helpOptions={data.contactCta.form.helpOptions}
            submitLabel="Request Consultation"
            submitClass="btn-dark-solid"
          />
        </div>
      </section>
    </div>
  )
}

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'hl-cookie-consent'

/**
 * Bottom cookie-consent banner. Shows once until the visitor accepts or
 * declines; the choice is remembered in localStorage.
 */
export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setShow(true)
    } catch {
      /* localStorage unavailable — skip the banner */
    }
  }, [])

  const decide = (value) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* ignore */
    }
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="hl-cookie" role="dialog" aria-label="Cookie consent" aria-live="polite">
      <p className="hl-cookie-text">
        We use cookies to improve your experience and analyze site traffic. By continuing to
        browse, you agree to our use of cookies.
      </p>
      <div className="hl-cookie-actions">
        <button type="button" className="btn btn-gold hl-cookie-btn" onClick={() => decide('accepted')}>
          Accept
        </button>
        <button type="button" className="hl-cookie-decline" onClick={() => decide('declined')}>
          Decline
        </button>
      </div>
    </div>
  )
}

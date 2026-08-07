import { useEffect, useState } from 'react'
import { applyAnalyticsConsent } from '../../utils/analytics.js'
import { Link } from 'react-router-dom'
import { currentLang } from '../../data/active.js'

const STORAGE_KEY = 'hl-cookie-consent'
const CONSENT_VERSION = 2
const MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000

function readConsent() {
  try {
    const consent = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    if (consent?.version !== CONSENT_VERSION) return null
    if (!consent.timestamp || Date.now() - new Date(consent.timestamp).getTime() > MAX_AGE_MS) return null
    return consent
  } catch {
    return null
  }
}

export default function CookieConsent() {
  const isEs = currentLang === 'es'
  const [show, setShow] = useState(false)
  const [settings, setSettings] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    const consent = readConsent()
    if (consent) {
      setAnalytics(Boolean(consent.analytics))
      applyAnalyticsConsent(Boolean(consent.analytics))
    } else {
      setShow(true)
    }

    const openSettings = () => {
      const current = readConsent()
      setAnalytics(Boolean(current?.analytics))
      setSettings(true)
      setShow(true)
    }
    window.addEventListener('hl:open-cookie-settings', openSettings)
    return () => window.removeEventListener('hl:open-cookie-settings', openSettings)
  }, [])

  const save = (analyticsAllowed, decision) => {
    const consent = {
      version: CONSENT_VERSION,
      essential: true,
      analytics: analyticsAllowed,
      decision,
      timestamp: new Date().toISOString(),
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
    } catch {
      // Consent still applies for this page view if storage is unavailable.
    }
    applyAnalyticsConsent(analyticsAllowed)
    setAnalytics(analyticsAllowed)
    setSettings(false)
    setShow(false)
  }

  if (!show) return null

  return (
    <div className={'hl-cookie' + (settings ? ' is-settings' : '')} role="dialog" aria-modal="true" aria-labelledby="hl-cookie-title">
      <div className="hl-cookie-content">
        <h2 id="hl-cookie-title" className="hl-cookie-title">{isEs ? 'Sus opciones de privacidad' : 'Your privacy choices'}</h2>
        {!settings ? (
          <p className="hl-cookie-text">
            {isEs ? 'Usamos almacenamiento esencial para sus preferencias. Con su permiso, Google Analytics nos ayuda a comprender el tráfico. Las analíticas permanecen desactivadas hasta que usted las acepte.' : 'We use essential storage for site preferences. With your permission, Google Analytics helps us understand site traffic. Analytics stays off unless you accept it.'} <Link to="/privacy-policy">{isEs ? 'Política de Privacidad' : 'Privacy Policy'}</Link>
          </p>
        ) : (
          <div className="hl-cookie-settings">
            <p className="hl-cookie-text mb-3">
              {isEs ? 'Elija qué tecnologías podemos utilizar. Puede reabrir estas opciones desde el pie de página y retirar su consentimiento en cualquier momento.' : 'Choose which technologies we may use. You can reopen these settings from the footer and withdraw consent at any time.'}
            </p>
            <div className="hl-cookie-category">
              <div><strong>{isEs ? 'Esencial' : 'Essential'}</strong><small>{isEs ? 'Guarda sus preferencias de idioma y consentimiento. Siempre activo.' : 'Stores your language and consent preferences. Always active.'}</small></div>
              <span className="hl-cookie-always">{isEs ? 'Siempre activo' : 'Always on'}</span>
            </div>
            <label className="hl-cookie-category" htmlFor="hl-analytics-consent">
              <div><strong>{isEs ? 'Analíticas' : 'Analytics'}</strong><small>{isEs ? <>Google Analytics mide visitas y uso de páginas. Puede establecer cookies <code>_ga</code> hasta por 2 años.</> : <>Google Analytics measures visits and page usage. It may set <code>_ga</code> cookies retained for up to 2 years.</>}</small></div>
              <input id="hl-analytics-consent" type="checkbox" role="switch" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} />
            </label>
            <p className="hl-cookie-policy-note">
              {isEs ? 'Proveedor: Google LLC. Los datos pueden procesarse en Estados Unidos. Consulte la ' : 'Provider: Google LLC. Data may be processed in the United States. Read the '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">{isEs ? 'Política de Privacidad de Google' : 'Google Privacy Policy'}</a>. {' '}<Link to="/privacy-policy">{isEs ? 'Nuestra Política de Privacidad' : 'Our Privacy Policy'}</Link>.
            </p>
          </div>
        )}
      </div>

      <div className="hl-cookie-actions">
        {settings ? (
          <>
            <button type="button" className="btn btn-gold hl-cookie-btn" onClick={() => save(analytics, 'custom')}>{isEs ? 'Guardar opciones' : 'Save choices'}</button>
            <button type="button" className="btn hl-cookie-outline hl-cookie-btn" onClick={() => save(false, 'rejected')}>{isEs ? 'Rechazar todo' : 'Reject all'}</button>
          </>
        ) : (
          <>
            <button type="button" className="btn btn-gold hl-cookie-btn" onClick={() => save(true, 'accepted')}>{isEs ? 'Aceptar todo' : 'Accept all'}</button>
            <button type="button" className="btn hl-cookie-outline hl-cookie-btn" onClick={() => save(false, 'rejected')}>{isEs ? 'Rechazar todo' : 'Reject all'}</button>
            <button type="button" className="hl-cookie-customize" onClick={() => setSettings(true)}>{isEs ? 'Personalizar' : 'Customize'}</button>
          </>
        )}
      </div>
    </div>
  )
}

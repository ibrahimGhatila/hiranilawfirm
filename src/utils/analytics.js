const GOOGLE_TAG_ID = 'GT-M6JLVZ7K'
const SCRIPT_ID = 'hl-google-tag'

function ensureGtag() {
  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments)
  }
  return window.gtag
}

export function initializeConsentMode() {
  if (typeof window === 'undefined') return
  const gtag = ensureGtag()
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500,
  })
}

function configureGoogleTag() {
  const gtag = ensureGtag()
  gtag('set', 'linker', { domains: ['hiranilawfirm.com'] })
  gtag('js', new Date())
  gtag('set', 'developer_id.dZTNiMT', true)
  gtag('config', GOOGLE_TAG_ID, { googlesitekit_post_type: 'page' })

  window._googlesitekit = window._googlesitekit || {}
  window._googlesitekit.throttledEvents = []
  window._googlesitekit.gtagEvent = (name, data) => {
    const key = JSON.stringify({ name, data })
    if (window._googlesitekit.throttledEvents[key]) return
    window._googlesitekit.throttledEvents[key] = true
    window.setTimeout(() => {
      delete window._googlesitekit.throttledEvents[key]
    }, 5)
    gtag('event', name, { ...data, event_source: 'site-kit' })
  }
}

function loadGoogleTag() {
  if (document.getElementById(SCRIPT_ID)) return
  const script = document.createElement('script')
  script.id = SCRIPT_ID
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`
  script.onload = configureGoogleTag
  document.head.appendChild(script)
}

function clearAnalyticsCookies() {
  const names = document.cookie.split(';').map((item) => item.split('=')[0].trim())
  const analyticsNames = names.filter((name) => name === '_ga' || name === '_gid' || name === '_gat' || name.startsWith('_ga_'))
  const domains = ['', window.location.hostname, `.${window.location.hostname}`, '.hiranilawfirm.com']
  for (const name of analyticsNames) {
    for (const domain of domains) {
      const domainPart = domain ? `; domain=${domain}` : ''
      document.cookie = `${name}=; Max-Age=0; path=/${domainPart}; SameSite=Lax`
    }
  }
}

export function applyAnalyticsConsent(granted) {
  if (typeof window === 'undefined') return
  const gtag = ensureGtag()
  gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  if (granted) loadGoogleTag()
  else clearAnalyticsCookies()
}

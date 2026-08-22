const GTM_CONTAINER_ID = 'GTM-T8KPC6ZH'
const SCRIPT_ID = 'hl-google-tag-manager'

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

function loadGoogleTagManager() {
  if (document.getElementById(SCRIPT_ID)) return

  window.dataLayer.push({
    'gtm.start': Date.now(),
    event: 'gtm.js',
  })

  const script = document.createElement('script')
  script.id = SCRIPT_ID
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`
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
  if (granted) loadGoogleTagManager()
  else clearAnalyticsCookies()
}

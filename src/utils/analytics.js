const GTM_CONTAINER_ID = 'GTM-T8KPC6ZH'
const SCRIPT_ID = 'hl-google-tag-manager'
const BODY_CONTAINER_ID = 'hl-google-tag-manager-body'
const IFRAME_ID = 'hl-google-tag-manager-iframe'

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
  if (!document.getElementById(SCRIPT_ID)) {
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

  const bodyContainer = document.getElementById(BODY_CONTAINER_ID)
  if (bodyContainer && !document.getElementById(IFRAME_ID)) {
    const iframe = document.createElement('iframe')
    iframe.id = IFRAME_ID
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`
    iframe.height = '0'
    iframe.width = '0'
    iframe.style.display = 'none'
    iframe.style.visibility = 'hidden'
    iframe.title = 'Google Tag Manager'
    bodyContainer.appendChild(iframe)
  }
}

function clearGoogleCookies({ analytics, advertising }) {
  const names = document.cookie.split(';').map((item) => item.split('=')[0].trim())
  const googleNames = names.filter((name) => (
    (!analytics && (name === '_ga' || name === '_gid' || name === '_gat' || name.startsWith('_ga_')))
    || (!advertising && (name.startsWith('_gcl_') || name === '_gac'))
  ))
  const domains = ['', window.location.hostname, `.${window.location.hostname}`, '.hiranilawfirm.com', '.hiranilawfirm.co']
  for (const name of googleNames) {
    for (const domain of domains) {
      const domainPart = domain ? `; domain=${domain}` : ''
      document.cookie = `${name}=; Max-Age=0; path=/${domainPart}; SameSite=Lax`
    }
  }
}

export function applyGoogleConsent({ analytics, advertising }) {
  if (typeof window === 'undefined') return
  const gtag = ensureGtag()
  gtag('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: advertising ? 'granted' : 'denied',
    ad_user_data: advertising ? 'granted' : 'denied',
    ad_personalization: advertising ? 'granted' : 'denied',
  })
  if (analytics || advertising) loadGoogleTagManager()
  else {
    document.getElementById(IFRAME_ID)?.remove()
  }
  clearGoogleCookies({ analytics, advertising })
}

import { useEffect } from 'react'

import TopBar from './TopBar.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import ConsultationPopup from '../common/ConsultationPopup.jsx'
import CookieConsent from '../common/CookieConsent.jsx'

/**
 * Publishes the real height of the top bar + navbar as `--hl-chrome` so the
 * hero can size itself to exactly one viewport at any breakpoint or zoom.
 */
function useChromeHeight() {
  useEffect(() => {
    const measure = () => {
      const topBar = document.querySelector('.hl-topbar')
      const navbar = document.querySelector('.hl-navbar')
      if (!navbar) return
      const height = (topBar?.offsetHeight || 0) + navbar.offsetHeight
      document.documentElement.style.setProperty('--hl-chrome', `${height}px`)
    }

    measure()
    const observer = new ResizeObserver(measure)
    for (const selector of ['.hl-topbar', '.hl-navbar']) {
      const el = document.querySelector(selector)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])
}

export default function Layout({ children }) {
  useChromeHeight()

  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar />
      <Header />
      <main className="flex-grow-1">{children}</main>
      <Footer />
      <ConsultationPopup />
      <CookieConsent />
    </div>
  )
}

import { Link, useLocation } from 'react-router-dom'
import SEO from '../components/common/SEO.jsx'
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx'
import ContactCTA from '../components/home/ContactCTA.jsx'

/**
 * Temporary page shell for routes not yet built out. Demonstrates the
 * breadcrumb + SEO wiring so the landing page's links resolve cleanly.
 */
export default function Placeholder({ title }) {
  const { pathname } = useLocation()

  return (
    <>
      <SEO title={title} path={pathname} />
      <Breadcrumbs items={[{ label: title, to: pathname }]} />

      <section className="hl-section">
        <div className="hl-container text-center py-5">
          <span className="hl-eyebrow">Hirani Law Firm PLLC</span>
          <h1 className="hl-h2 mb-3">{title}</h1>
          <p className="hl-lead mx-auto mb-4" style={{ maxWidth: '40rem' }}>
            This page is coming next. The landing page is complete — let us know
            which section to build out and it will follow the same design system.
          </p>
          <Link to="/" className="btn btn-gold">
            Back to Home
          </Link>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

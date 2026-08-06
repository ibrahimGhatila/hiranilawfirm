import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import SEO from '../components/common/SEO.jsx'
import data from '../data/active.js'

const { business } = data
const { crumbs, practiceAreasLabel, notFound } = data.ui

const quickLinks = [
  { label: crumbs.home, to: '/' },
  { label: practiceAreasLabel, to: '/practice-areas' },
  { label: crumbs.meetSehar, to: '/about/sehar-hirani' },
  { label: crumbs.clientReviews, to: '/reviews' },
  { label: crumbs.contactUs, to: '/contact' },
]

export default function NotFound() {
  return (
    <>
      <SEO title={notFound.seoTitle} description={notFound.desc} path="/404" />

      <section className="hl-404">
        <div className="hl-container text-center">
          <div className="hl-404-code">404</div>
          <span className="hl-eyebrow">{notFound.eyebrow}</span>
          <h1 className="hl-display hl-404-title">{notFound.title}</h1>
          <p className="hl-404-desc">
            {notFound.desc}
          </p>

          <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
            <Link to="/" className="btn btn-gold">
              {notFound.backHome}
            </Link>
            <a href={business.phoneHref} className="btn btn-outline-dark-hl">
              {notFound.callLabel} {business.phone}
            </a>
          </div>

          <div className="hl-404-links">
            <div className="hl-404-links-label">{notFound.helpfulLinks}</div>
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {quickLinks.map((l) => (
                <Link key={l.to} to={l.to} className="hl-404-chip">
                  {l.label} <FiArrowRight size={13} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa'

import data from '../../data/site.json'

const { business, footer } = data

const socialIcons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  tiktok: FaTiktok,
}

export default function Footer() {
  return (
    <footer className="hl-footer">
      <div className="hl-container">
        <div className="row gy-4">
          <div className="col-lg-7">
            <h4>{business.name}</h4>
            <p className="mb-0" style={{ maxWidth: '32rem' }}>
              {business.tagline}
            </p>
            <div className="hl-footer-social">
              {Object.entries(business.social).map(([key, url]) => {
                const Icon = socialIcons[key]
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={key}
                  >
                    {Icon && <Icon />}
                  </a>
                )
              })}
            </div>
          </div>

          <div className="col-lg-5">
            <h4 style={{ fontSize: '1.25rem' }}>{footer.contactHeading}</h4>
            <p className="mb-2">
              <a href={business.phoneHref}>{business.phone}</a>
            </p>
            <p className="mb-0">
              <Link to="/contact">{footer.bookLabel}</Link>
            </p>
          </div>
        </div>

        <div className="hl-footer-bottom">{footer.disclaimer}</div>
      </div>
    </footer>
  )
}

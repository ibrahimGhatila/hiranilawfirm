import { FiPhone, FiMail } from 'react-icons/fi'
import data from '../../data/site.json'

const { nav, business } = data

export default function TopBar() {
  return (
    <div className="hl-topbar">
      <div className="hl-container d-flex flex-wrap align-items-center justify-content-center justify-content-md-between gap-2">
        <a href={`mailto:${business.email}`} className="hl-topbar-item">
          <FiMail size={15} />
          <span>{business.email}</span>
        </a>
        <a href={business.phoneHref} className="hl-topbar-item">
          <FiPhone size={15} />
          <span>
            {nav.topBarText} <strong>{business.phone}</strong>
          </span>
        </a>
      </div>
    </div>
  )
}

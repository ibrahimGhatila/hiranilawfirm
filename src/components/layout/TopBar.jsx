import data from '../../data/active.js'

const { nav, business } = data

export default function TopBar() {
  return (
    <div className="hl-topbar">
      <div className="hl-container d-flex align-items-center justify-content-center">
        <a href={business.phoneHref} className="hl-topbar-item">
          <span>
            {nav.topBarText} <strong>{business.phone}</strong>
          </span>
        </a>
      </div>
    </div>
  )
}

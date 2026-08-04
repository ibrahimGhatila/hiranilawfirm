import data from '../../data/site.json'

const { nav, business } = data

export default function TopBar() {
  return (
    <div className="hl-topbar">
      {nav.topBarText}{' '}
      <a href={business.phoneHref}>{business.phone}</a>
    </div>
  )
}

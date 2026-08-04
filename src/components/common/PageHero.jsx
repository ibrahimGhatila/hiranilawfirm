import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'
import images from '../../assets/images.js'

/**
 * Dark page hero with an inline breadcrumb trail.
 * `crumbs` = [{ label, to }] (current page last).
 * `bgImage` = optional image key rendered behind a dark overlay.
 */
export default function PageHero({ title, description, crumbs = [], bgImage }) {
  const trail = [{ label: 'Home', to: '/' }, ...crumbs]
  const style = bgImage
    ? { backgroundImage: `url(${images[bgImage]})` }
    : undefined

  return (
    <section className={'hl-page-hero' + (bgImage ? ' has-bg' : '')} style={style}>
      <div className="hl-container">
        <div className="hl-page-hero-crumbs">
          {trail.map((c, i) => {
            const isLast = i === trail.length - 1
            return (
              <span key={c.to + i}>
                {isLast ? (
                  <span className="current">{c.label}</span>
                ) : (
                  <>
                    <Link to={c.to}>{c.label}</Link>
                    <FiChevronRight size={12} className="mx-1" style={{ verticalAlign: 'middle' }} />
                  </>
                )}
              </span>
            )
          })}
        </div>
        <h1 className="hl-display" style={{ maxWidth: '20ch' }}>
          {title}
        </h1>
        {description && <p className="hl-page-hero-desc">{description}</p>}
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FiChevronRight } from 'react-icons/fi'

import data from '../../data/active.js'

const { business } = data

/**
 * Breadcrumb trail with matching BreadcrumbList JSON-LD for SEO.
 * `items` = [{ label, to }] where the last item is the current page.
 */
export default function Breadcrumbs({ items }) {
  const trail = [{ label: 'Home', to: '/' }, ...items]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `${business.url}${item.to}`,
    })),
  }

  return (
    <nav className="hl-breadcrumbs" aria-label="Breadcrumb">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <div className="hl-container">
        {trail.map((item, i) => {
          const isLast = i === trail.length - 1
          return (
            <span key={item.to}>
              {isLast ? (
                <span className="current">{item.label}</span>
              ) : (
                <>
                  <Link to={item.to}>{item.label}</Link>
                  <FiChevronRight className="sep" size={14} style={{ verticalAlign: 'middle' }} />
                </>
              )}
            </span>
          )
        })}
      </div>
    </nav>
  )
}

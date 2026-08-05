import { Helmet } from 'react-helmet-async'
import data from '../../data/active.js'

const { business } = data

/**
 * Reusable SEO block: title, meta description, Open Graph, Twitter card,
 * canonical URL, and optional JSON-LD structured data.
 */
export default function SEO({
  title,
  description,
  path = '/',
  image = '/og-image.png',
  type = 'website',
  jsonLd,
}) {
  const fullTitle = title
    ? `${title} | ${business.shortName}`
    : `${business.name} | Houston & Katy Family Law & Personal Injury Attorney`
  const url = `${business.url}${path}`
  const desc =
    description ||
    'Attorney Sehar Hirani helps clients across Greater Houston and Katy with family law and personal injury claims. Free confidential consultation.'
  const ogImage = image.startsWith('http') ? image : `${business.url}${image}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={business.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}

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
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1536" />
      <meta property="og:image:height" content="1024" />
      <meta property="og:image:alt" content={`${business.name} — ${title || 'Houston and Katy attorney'}`} />
      <meta property="og:logo" content={`${business.url}/favicon.png`} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${business.name} — ${title || 'Houston and Katy attorney'}`} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}

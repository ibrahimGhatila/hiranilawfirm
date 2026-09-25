import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import data from '../../data/active.js'

const { business } = data

/**
 * Reusable SEO block: title, meta description, Open Graph, Twitter card,
 * canonical URL, optional keywords/article metadata, and JSON-LD structured data.
 */
export default function SEO({
  title,
  description,
  path = '/',
  image = '/og-image.png',
  imageWidth = 1536,
  imageHeight = 1024,
  imageType = 'image/png',
  imageAlt,
  type = 'website',
  keywords,
  article,
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
  const ogAlt = imageAlt || `${business.name} — ${title || 'Houston and Katy attorney'}`

  // The build prerenders JSON-LD into static HTML for crawlers that skip
  // JavaScript; drop it once React takes over so the graph is not duplicated.
  useEffect(() => {
    document.querySelectorAll('script[data-static-schema]').forEach((el) => el.remove())
  }, [])

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={business.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content={imageType} />
      <meta property="og:image:width" content={String(imageWidth)} />
      <meta property="og:image:height" content={String(imageHeight)} />
      <meta property="og:image:alt" content={ogAlt} />
      <meta property="og:logo" content={`${business.url}/favicon.png`} />
      <meta property="og:locale" content="en_US" />
      {article?.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
      {article?.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
      {article?.author && <meta property="article:author" content={article.author} />}
      {article?.section && <meta property="article:section" content={article.section} />}
      {article?.tags?.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogAlt} />
      {type === 'article' && (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      )}

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}

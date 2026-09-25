import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  ATTORNEY_PATH,
  OG_IMAGE,
  blogIndexSchema,
  isoDate,
  ogImagePath,
  postSchema,
} from '../src/data/blogSchema.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const data = JSON.parse(await readFile(path.join(root, 'src/data/site.json'), 'utf8'))
const details = JSON.parse(await readFile(path.join(root, 'src/data/practiceDetails.json'), 'utf8'))
const blog = JSON.parse(await readFile(path.join(root, 'src/data/blog.json'), 'utf8'))
const template = await readFile(path.join(dist, 'index.html'), 'utf8')
// Canonicals must always identify the production domain, including preview builds.
const siteUrl = 'https://www.hiranilawfirm.com'
const imageUrl = `${siteUrl}/og-image.png`
const logoUrl = `${siteUrl}/favicon.png`
const defaultImage = { url: imageUrl, type: 'image/png', width: 1536, height: 1024 }
const feedPath = '/blog/rss.xml'

const escape = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')

const pageTitle = (title) => title
  ? `${title} | ${data.business.shortName}`
  : `${data.business.name} | Houston & Katy Family Law & Personal Injury Attorney`

const routes = [
  { route: '/', title: '', description: 'Attorney Sehar Hirani helps clients across Greater Houston and Katy with divorce, custody, child support, adoption, and personal injury claims. Free case evaluation.' },
  { route: '/about', ...data.aboutPage.seo },
  { route: '/about/sehar-hirani', ...data.attorneyPage.seo },
  { route: '/about/our-team', ...data.teamPage.seo },
  { route: '/about/service-areas', ...data.serviceAreaPage.seo },
  { route: '/practice-areas', ...data.practiceIndex.seo },
  { route: '/practice-areas/family-law', ...data.familyLawPage.seo },
  { route: '/practice-areas/personal-injury', ...data.personalInjuryPage.seo },
  { route: '/reviews', ...data.reviewsPage.seo },
  { route: '/faqs', ...data.faqPage.seo },
  {
    route: '/blog',
    ...blog.seo,
    feed: true,
    schema: blogIndexSchema({ blog, business: data.business }),
  },
  { route: '/contact', ...data.contactPage.seo },
  { route: '/privacy-policy', title: 'Privacy Policy', description: 'Learn how Hirani Law Firm PLLC collects, uses, protects, and shares information submitted through this website.' },
]

for (const member of data.teamPage.members.filter((item) => item.slug)) {
  routes.push({
    route: `/about/our-team/${member.slug}`,
    title: `${member.name} | ${member.role}`,
    description: member.bio[0],
  })
}

for (const [category, group] of Object.entries(details)) {
  for (const item of group.items) {
    routes.push({
      route: `/practice-areas/${category}/${item.slug}`,
      title: item.heroTitle,
      description: item.heroSubtitle,
    })
  }
}

const relatedServices = (post) =>
  post.related
    .map(({ category, slug }) => {
      const item = details[category]?.items.find((i) => i.slug === slug)
      return item && { title: item.title, to: `/practice-areas/${category}/${slug}` }
    })
    .filter(Boolean)

for (const post of blog.posts) {
  routes.push({
    route: `/blog/${post.slug}`,
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords.join(', '),
    type: 'article',
    image: { url: `${siteUrl}${ogImagePath(post.slug)}`, ...OG_IMAGE, alt: post.imageAlt },
    article: {
      published: isoDate(post.datePublished),
      modified: isoDate(post.dateModified),
      section: post.categoryLabel,
      tags: post.keywords,
    },
    feed: true,
    schema: postSchema({ post, business: data.business, related: relatedServices(post) }),
  })
}

function socialBlock({ route, title, description, keywords, type = 'website', image = defaultImage, article, feed }) {
  const canonical = `${siteUrl}${route === '/' ? '/' : route}`
  const fullTitle = pageTitle(title)
  const imageAlt = image.alt || data.business.name
  const extra = [
    keywords && `<meta name="keywords" content="${escape(keywords)}" />`,
    article && '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />',
    article && `<meta property="article:published_time" content="${escape(article.published)}" />`,
    article && `<meta property="article:modified_time" content="${escape(article.modified)}" />`,
    article && `<meta property="article:author" content="${escape(siteUrl + ATTORNEY_PATH)}" />`,
    article && `<meta property="article:section" content="${escape(article.section)}" />`,
    ...(article?.tags || []).map((tag) => `<meta property="article:tag" content="${escape(tag)}" />`),
    feed && `<link rel="alternate" type="application/rss+xml" title="${escape(data.business.shortName)} Blog" href="${escape(siteUrl + feedPath)}" />`,
  ].filter(Boolean).map((tag) => `\n    ${tag}`).join('')
  return `<link rel="canonical" href="${escape(canonical)}" />${extra}

    <!-- Static social metadata is intentionally kept here for crawlers that do not run React. -->
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="${escape(type)}" />
    <meta property="og:site_name" content="${escape(data.business.name)}" />
    <meta property="og:title" content="${escape(fullTitle)}" />
    <meta property="og:description" content="${escape(description)}" />
    <meta property="og:url" content="${escape(canonical)}" />
    <meta property="og:image" content="${escape(image.url)}" />
    <meta property="og:image:secure_url" content="${escape(image.url)}" />
    <meta property="og:image:type" content="${escape(image.type)}" />
    <meta property="og:image:width" content="${image.width}" />
    <meta property="og:image:height" content="${image.height}" />
    <meta property="og:image:alt" content="${escape(imageAlt)}" />
    <meta property="og:logo" content="${escape(logoUrl)}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(fullTitle)}" />
    <meta name="twitter:description" content="${escape(description)}" />
    <meta name="twitter:image" content="${escape(image.url)}" />
    <meta name="twitter:image:alt" content="${escape(imageAlt)}" />`
}

// Structured data for crawlers that do not run JavaScript. SEO.jsx removes
// `data-static-schema` scripts on mount and re-adds the same graph via Helmet.
const schemaScript = (schema) =>
  `<script type="application/ld+json" data-static-schema>${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`

function render(page) {
  const fullTitle = pageTitle(page.title)
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(fullTitle)}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?\/\s*>/, `<meta name="description" content="${escape(page.description)}" />`)
    .replace(/<link rel="canonical"[\s\S]*?<meta name="twitter:image:alt"[^>]*\/>/, socialBlock(page))
  return page.schema ? html.replace('</head>', `  ${schemaScript(page.schema)}\n  </head>`) : html
}

function rssFeed() {
  const items = [...blog.posts]
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished))
    .map((post) => {
      const link = `${siteUrl}/blog/${post.slug}`
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escape(post.metaDescription)}</description>
      <category>${escape(post.categoryLabel)}</category>
      <dc:creator>${escape(data.business.attorney)}</dc:creator>
      <pubDate>${new Date(isoDate(post.datePublished)).toUTCString()}</pubDate>
      <media:content url="${siteUrl}${ogImagePath(post.slug)}" medium="image" type="${OG_IMAGE.type}" width="${OG_IMAGE.width}" height="${OG_IMAGE.height}" />
    </item>`
    })
    .join('\n')
  const latest = blog.posts.map((p) => p.dateModified).sort().at(-1)
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escape(data.business.shortName)} Blog</title>
    <link>${siteUrl}/blog</link>
    <atom:link href="${siteUrl}${feedPath}" rel="self" type="application/rss+xml" />
    <description>${escape(blog.seo.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(isoDate(latest)).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`
}

for (const page of routes) {
  if (page.route === '/') {
    await writeFile(path.join(dist, 'index.html'), render(page))
    continue
  }
  const target = path.join(dist, ...page.route.slice(1).split('/'))
  await mkdir(target, { recursive: true })
  await writeFile(path.join(target, 'index.html'), render(page))
}

await writeFile(path.join(dist, ...feedPath.slice(1).split('/')), rssFeed())

console.log(`Generated route-specific social metadata for ${routes.length} pages and ${feedPath}.`)

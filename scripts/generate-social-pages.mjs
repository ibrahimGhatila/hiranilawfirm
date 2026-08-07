import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const data = JSON.parse(await readFile(path.join(root, 'src/data/site.json'), 'utf8'))
const details = JSON.parse(await readFile(path.join(root, 'src/data/practiceDetails.json'), 'utf8'))
const template = await readFile(path.join(dist, 'index.html'), 'utf8')
const siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://hiranilawfirm-azure.vercel.app').replace(/\/$/, '')
const imageUrl = `${siteUrl}/og-image.png`
const logoUrl = `${siteUrl}/favicon.png`

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

function socialBlock({ route, title, description }) {
  const canonical = `${siteUrl}${route === '/' ? '/' : route}`
  const fullTitle = pageTitle(title)
  return `<link rel="canonical" href="${escape(canonical)}" />

    <!-- Static social metadata is intentionally kept here for crawlers that do not run React. -->
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escape(data.business.name)}" />
    <meta property="og:title" content="${escape(fullTitle)}" />
    <meta property="og:description" content="${escape(description)}" />
    <meta property="og:url" content="${escape(canonical)}" />
    <meta property="og:image" content="${escape(imageUrl)}" />
    <meta property="og:image:secure_url" content="${escape(imageUrl)}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1536" />
    <meta property="og:image:height" content="1024" />
    <meta property="og:image:alt" content="${escape(data.business.name)}" />
    <meta property="og:logo" content="${escape(logoUrl)}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(fullTitle)}" />
    <meta name="twitter:description" content="${escape(description)}" />
    <meta name="twitter:image" content="${escape(imageUrl)}" />
    <meta name="twitter:image:alt" content="${escape(data.business.name)}" />`
}

function render(page) {
  const fullTitle = pageTitle(page.title)
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(fullTitle)}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?\/\s*>/, `<meta name="description" content="${escape(page.description)}" />`)
    .replace(/<link rel="canonical"[\s\S]*?<meta name="twitter:image:alt"[^>]*\/>/, socialBlock(page))
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

console.log(`Generated route-specific social metadata for ${routes.length} pages.`)

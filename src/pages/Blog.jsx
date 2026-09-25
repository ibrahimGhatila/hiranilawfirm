import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiChevronDown, FiClock } from 'react-icons/fi'
import SEO from '../components/common/SEO.jsx'
import PageHero from '../components/common/PageHero.jsx'
import ContactCTA from '../components/home/ContactCTA.jsx'
import images from '../assets/images.js'
import data, { currentLang } from '../data/active.js'
import blog from '../data/blog.json'
import { blogIndexSchema } from '../data/blogSchema.js'

const { business } = data
const t = data.ui.blog

export function formatDate(iso) {
  // Noon avoids the date shifting a day in US time zones.
  return new Date(`${iso}T12:00:00`).toLocaleDateString(currentLang === 'es' ? 'es-US' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function BlogCard({ post, headingLevel = 'h2' }) {
  const Heading = headingLevel
  return (
    <Link to={`/blog/${post.slug}`} className="text-decoration-none d-block h-100">
      <article className="hl-blog-card h-100">
        <div className="hl-blog-card-img">
          <img src={images[post.image]} alt={post.imageAlt} width="1200" height="750" loading="lazy" decoding="async" />
          <span className="hl-blog-tag">{t.categories[post.category]}</span>
        </div>
        <div className="hl-blog-card-body">
          <div className="hl-blog-meta">
            <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
            <span aria-hidden="true">·</span>
            <span>
              <FiClock size={12} /> {post.readMinutes} {t.minRead}
            </span>
          </div>
          <Heading className="hl-blog-card-title">{post.title}</Heading>
          <p>{post.metaDescription}</p>
          <span className="hl-link-arrow">
            {t.readArticle} <FiArrowRight size={13} />
          </span>
        </div>
      </article>
    </Link>
  )
}

const FILTERS = ['all', 'family-law', 'personal-injury']
const filterLabel = (key) => (key === 'all' ? t.allArticles : t.categories[key])

export default function Blog() {
  const [filter, setFilter] = useState('all')
  const posts = blog.posts.filter((p) => filter === 'all' || p.category === filter)

  const jsonLd = blogIndexSchema({ blog, business })

  return (
    <>
      <SEO
        title={blog.seo.title}
        description={blog.seo.description}
        keywords={blog.seo.keywords}
        path="/blog"
        jsonLd={jsonLd}
      />
      <PageHero
        title={blog.hero.title}
        description={blog.hero.description}
        crumbs={[{ label: t.label, to: '/blog' }]}
        bgImage="page-hero-banner"
      />

      <section className="hl-section hl-bg-cream">
        <div className="hl-container">
          {/* Desktop/tablet: filter buttons */}
          <div className="hl-blog-filters d-none d-md-flex" role="group" aria-label={t.filterLabel}>
            {FILTERS.map((key) => (
              <button
                key={key}
                type="button"
                className={'hl-blog-filter' + (filter === key ? ' active' : '')}
                aria-pressed={filter === key}
                onClick={() => setFilter(key)}
              >
                {filterLabel(key)}
              </button>
            ))}
          </div>

          {/* Mobile: article count + category dropdown */}
          <div className="hl-blog-filter-mobile d-flex d-md-none">
            <span className="hl-blog-count">
              {posts.length} {posts.length === 1 ? t.article : t.articles}
            </span>
            <div className="hl-blog-select">
              <select
                value={filter}
                aria-label={t.filterLabel}
                onChange={(e) => setFilter(e.target.value)}
              >
                {FILTERS.map((key) => (
                  <option key={key} value={key}>
                    {filterLabel(key)}
                  </option>
                ))}
              </select>
              <FiChevronDown aria-hidden="true" />
            </div>
          </div>

          <div className="row g-4">
            {posts.map((post) => (
              <div className="col-12 col-md-6 col-lg-4" key={post.slug}>
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

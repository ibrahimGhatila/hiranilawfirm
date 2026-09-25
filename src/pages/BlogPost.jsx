import { useParams, Link, Navigate } from 'react-router-dom'
import { FiClock, FiPhone, FiChevronDown } from 'react-icons/fi'
import SEO from '../components/common/SEO.jsx'
import PageHero from '../components/common/PageHero.jsx'
import RichText from '../components/common/RichText.jsx'
import StickySidebar from '../components/common/StickySidebar.jsx'
import ContactCTA from '../components/home/ContactCTA.jsx'
import images from '../assets/images.js'
import data, { currentLang } from '../data/active.js'
import blog from '../data/blog.json'
import detailsEn from '../data/practiceDetails.json'
import detailsEs from '../data/practiceDetails.es.json'
import { formatDate } from './Blog.jsx'
import { postSchema, ogImagePath, stripMarkup, isoDate, OG_IMAGE, SITE_URL, ATTORNEY_PATH } from '../data/blogSchema.js'

const { business } = data
const t = data.ui.blog
const consult = data.attorneyPage.sidebar.consult
const details = currentLang === 'es' ? detailsEs : detailsEn

function Paragraphs({ items }) {
  return items?.map((p, i) => (
    <p key={i} className="hl-body-muted">
      <RichText text={p} />
    </p>
  ))
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = blog.posts.find((p) => p.slug === slug)

  if (!post) return <Navigate to="/blog" replace />

  const image = images[post.image]
  const relatedIn = (source) =>
    post.related
      .map(({ category, slug: s }) => {
        const item = source[category]?.items.find((i) => i.slug === s)
        return item && { title: item.title, to: `/practice-areas/${category}/${s}` }
      })
      .filter(Boolean)
  const related = relatedIn(details)
  const others = blog.posts.filter((p) => p.slug !== post.slug)
  const ctaHasPhone = post.cta.paragraphs.some((p) => stripMarkup(p) === business.phone)
  // Structured data stays in English to match the static prerendered copy.
  const jsonLd = postSchema({ post, business, related: relatedIn(detailsEn) })

  return (
    <>
      <SEO
        title={post.metaTitle}
        description={post.metaDescription}
        keywords={post.keywords.join(', ')}
        path={`/blog/${post.slug}`}
        type="article"
        image={ogImagePath(post.slug)}
        imageWidth={OG_IMAGE.width}
        imageHeight={OG_IMAGE.height}
        imageType={OG_IMAGE.type}
        imageAlt={post.imageAlt}
        article={{
          publishedTime: isoDate(post.datePublished),
          modifiedTime: isoDate(post.dateModified),
          author: `${SITE_URL}${ATTORNEY_PATH}`,
          section: post.categoryLabel,
          tags: post.keywords,
        }}
        jsonLd={jsonLd}
      />
      <PageHero
        title={post.title}
        description={post.metaDescription}
        crumbs={[
          { label: t.label, to: '/blog' },
          { label: post.title, to: `/blog/${post.slug}` },
        ]}
        bgImage="page-hero-banner"
      />

      <section className="hl-section">
        <div className="hl-container">
          <div className="row g-5">
            <article className="col-lg-8 hl-blog-article">
              <div className="hl-blog-meta mb-3">
                <span className="hl-blog-tag hl-blog-tag--inline">{t.categories[post.category]}</span>
                <span>
                  {t.by}{' '}
                  <Link to={ATTORNEY_PATH} rel="author" className="hl-inline-link">
                    {business.attorney}
                  </Link>
                </span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                <span aria-hidden="true">·</span>
                <span className="hl-blog-readtime">
                  <FiClock size={12} /> {post.readMinutes} {t.minRead}
                </span>
              </div>

              <img src={image} alt={post.imageAlt} className="hl-blog-feature" width="1200" height="750" fetchpriority="high" />

              <div className="hl-detail-section">
                <Paragraphs items={post.intro} />
              </div>

              {post.sections.map((sec) => (
                <section className="hl-detail-section" key={sec.heading}>
                  <h2 className="hl-detail-heading">{sec.heading}</h2>
                  {sec.blocks.map((block, i) =>
                    block.list ? (
                      <ul className="hl-detail-list" key={i}>
                        {block.list.map((item) => (
                          <li key={item} className="hl-body-muted">
                            <RichText text={item} />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p key={i} className="hl-body-muted">
                        <RichText text={block.text} />
                      </p>
                    )
                  )}
                </section>
              ))}

              <aside className="hl-blog-cta">
                <h2 className="hl-h3 text-white mb-2">{post.cta.title}</h2>
                {post.cta.paragraphs.map((p) =>
                  stripMarkup(p) === business.phone ? (
                    <a key={p} href={business.phoneHref} className="hl-side-phone d-inline-flex align-items-center gap-2 mb-2">
                      <FiPhone size={15} /> {business.phone}
                    </a>
                  ) : (
                    <p key={p} className="hl-blog-cta-text">
                      <RichText text={p} />
                    </p>
                  )
                )}
                <div className="d-flex flex-wrap gap-3 align-items-center mt-3">
                  <Link to="/contact" className="btn btn-gold">
                    {t.ctaButton}
                  </Link>
                  {!ctaHasPhone && (
                    <a href={business.phoneHref} className="hl-side-phone d-inline-flex align-items-center gap-2">
                      <FiPhone size={15} /> {business.phone}
                    </a>
                  )}
                </div>
              </aside>

              <section className="hl-blog-faq">
                <h2 className="hl-detail-heading">{t.faqTitle}</h2>
                {post.faqs.map((f, i) => (
                  <details key={f.q} className="hl-faq-item hl-blog-faq-item" open={i === 0}>
                    <summary className="hl-faq-q">
                      <h3>{f.q}</h3>
                      <FiChevronDown />
                    </summary>
                    <div className="hl-faq-a">{f.a}</div>
                  </details>
                ))}
              </section>
            </article>

            <div className="col-lg-4">
              <StickySidebar>
                <div className="hl-side-consult mb-4">
                  <span className="hl-eyebrow">{consult.eyebrow}</span>
                  <h3 className="hl-h3 text-white mb-2">{consult.title}</h3>
                  <p className="mb-3" style={{ color: '#b7b2a8', fontSize: '0.8075rem' }}>
                    {consult.note}
                  </p>
                  <Link to={consult.cta.to} className="btn btn-gold w-100 mb-3">
                    {consult.cta.label}
                  </Link>
                  <a href={business.phoneHref} className="hl-side-phone">
                    {business.phone}
                  </a>
                </div>

                {related.length > 0 && (
                  <nav className="hl-side-list mb-4" aria-label={t.relatedServices}>
                    <div className="hl-side-list-title">{t.relatedServices}</div>
                    {related.map((r) => (
                      <Link key={r.to} to={r.to} className="hl-side-link">
                        {r.title}
                      </Link>
                    ))}
                  </nav>
                )}

                {others.length > 0 && (
                  <nav className="hl-side-list" aria-label={t.moreArticles}>
                    <div className="hl-side-list-title">{t.moreArticles}</div>
                    {others.map((p) => (
                      <Link key={p.slug} to={`/blog/${p.slug}`} className="hl-side-link">
                        {p.title}
                      </Link>
                    ))}
                  </nav>
                )}
              </StickySidebar>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

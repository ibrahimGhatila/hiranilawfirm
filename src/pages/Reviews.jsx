import SEO from '../components/common/SEO.jsx'
import PageHero from '../components/common/PageHero.jsx'
import ClientsMention from '../components/home/ClientsMention.jsx'
import ContactCTA from '../components/home/ContactCTA.jsx'
import ReviewCard from '../components/common/ReviewCard.jsx'
import data from '../data/active.js'

const { reviewsPage, business } = data

export default function Reviews() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: business.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: String(reviewsPage.reviews.length),
      bestRating: '5',
    },
    review: reviewsPage.reviews.slice(0, 6).map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.text,
    })),
  }

  return (
    <>
      <SEO
        title={reviewsPage.seo.title}
        description={reviewsPage.seo.description}
        path="/reviews"
        jsonLd={jsonLd}
      />
      <PageHero
        title={reviewsPage.hero.title}
        description={reviewsPage.hero.description}
        crumbs={[{ label: data.ui.crumbs.reviews, to: '/reviews' }]}
      />

      <ClientsMention />

      {/* Review grid */}
      <section className="hl-section hl-testimonials">
        <div className="hl-container">
          <h2 className="hl-testimonials-title">What Clients Are Saying</h2>
          <div className="row g-2 hl-reviews-grid">
            {reviewsPage.reviews.map((review) => (
              <div className="col-md-6 col-lg-4" key={review.name}>
                <ReviewCard review={review} className="h-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Themes */}
      <section className="hl-section">
        <div className="hl-container">
          <span className="hl-eyebrow">{reviewsPage.themes.eyebrow}</span>
          <h2 className="hl-h2 mb-5" style={{ maxWidth: '30ch' }}>
            {reviewsPage.themes.title}
          </h2>
          <div className="row g-2">
            {reviewsPage.themes.cards.map((card) => (
              <div className="col-md-4" key={card.title}>
                <div className="hl-theme-card h-100">
                  <h3>{card.title}</h3>
                  <p className="mb-0">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

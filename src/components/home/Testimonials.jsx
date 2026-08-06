import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import ReviewCard from '../common/ReviewCard.jsx'
import data from '../../data/active.js'

const { testimonials, reviewsPage } = data
// Pull the full review set from the Reviews page so the landing carousel
// stays in sync and scrolls through every client review.
const reviews = reviewsPage.reviews

export default function Testimonials() {
  const trackRef = useRef(null)
  const [activeReview, setActiveReview] = useState(0)

  const goToReview = (index) => {
    const track = trackRef.current
    if (!track) return
    const cards = track.querySelectorAll('.hl-review-card')
    const card = cards[index]
    if (!card) return
    track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' })
    setActiveReview(index)
  }

  const updateActiveReview = () => {
    const track = trackRef.current
    if (!track) return
    const cards = Array.from(track.querySelectorAll('.hl-review-card'))
    if (!cards.length) return
    const closestIndex = cards.reduce((bestIndex, card, index) => {
      const bestDistance = Math.abs(cards[bestIndex].offsetLeft - track.scrollLeft)
      const distance = Math.abs(card.offsetLeft - track.scrollLeft)
      return distance < bestDistance ? index : bestIndex
    }, 0)
    setActiveReview(closestIndex)
  }

  const scroll = (dir) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('.hl-review-card')
    const gap = parseFloat(getComputedStyle(track).columnGap) || 16
    const amount = card ? card.offsetWidth + gap : 340
    // Move exactly one card; the browser clamps at the ends, so it simply
    // stops when the reviews run out — no wrap-around to the other side.
    track.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <section className="hl-testimonials hl-section">
      {/* Title uses padded container; carousel below is full-bleed */}
      <div className="hl-container">
        <h2 className="hl-testimonials-title">{testimonials.title}</h2>
      </div>

      <div className="hl-review-carousel">
        <button
          type="button"
          className="hl-carousel-btn hl-carousel-prev"
          onClick={() => scroll(-1)}
          aria-label="Previous reviews"
        >
          <FiArrowLeft />
        </button>

        <div className="hl-review-scroll" ref={trackRef} onScroll={updateActiveReview}>
          {reviews.map((review) => (
            <ReviewCard review={review} key={review.name} />
          ))}
        </div>

        <button
          type="button"
          className="hl-carousel-btn hl-carousel-next"
          onClick={() => scroll(1)}
          aria-label="Next reviews"
        >
          <FiArrowRight />
        </button>
      </div>

      <div className="hl-testimonial-dots" aria-label="Choose a client review">
        {reviews.map((review, index) => (
          <button
            type="button"
            key={review.name}
            className={index === activeReview ? 'active' : ''}
            onClick={() => goToReview(index)}
            aria-label={`Show review ${index + 1}`}
            aria-current={index === activeReview ? 'true' : undefined}
          />
        ))}
      </div>

      <div className="hl-container text-center mt-5">
        <Link to={testimonials.cta.to} className="btn btn-gold">
          {testimonials.cta.label}
        </Link>
      </div>
    </section>
  )
}

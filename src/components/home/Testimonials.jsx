import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { FaGoogle } from 'react-icons/fa'
import data from '../../data/site.json'

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
    const amount = card ? card.offsetWidth + 24 : 340
    const atStart = track.scrollLeft <= 4
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4
    const left = dir > 0 && atEnd
      ? 0
      : dir < 0 && atStart
        ? track.scrollWidth
        : track.scrollLeft + dir * amount
    track.scrollTo({ left, behavior: 'smooth' })
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
            <article className="hl-review-card" key={review.name}>
              <div className="hl-review-head">
                <div className="hl-review-avatar">{review.initials}</div>
                <div>
                  <div className="hl-review-name">{review.name}</div>
                  <div className="hl-review-when">{review.when}</div>
                </div>
                <FaGoogle className="hl-review-google" />
              </div>
              <div className="hl-review-stars">
                {'★'.repeat(review.rating)}
              </div>
              <p className="hl-review-text">{review.text}</p>
              <span className="hl-review-more">Read more</span>
            </article>
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

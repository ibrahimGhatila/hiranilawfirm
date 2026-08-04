import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { FaGoogle } from 'react-icons/fa'
import data from '../../data/site.json'

const { testimonials } = data

export default function Testimonials() {
  const trackRef = useRef(null)

  const scroll = (dir) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('.hl-review-card')
    const amount = card ? card.offsetWidth + 24 : 340
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
          className="hl-carousel-btn hl-carousel-prev"
          onClick={() => scroll(-1)}
          aria-label="Previous reviews"
        >
          <FiArrowLeft />
        </button>

        <div className="hl-review-scroll" ref={trackRef}>
          {testimonials.reviews.map((review) => (
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
          className="hl-carousel-btn hl-carousel-next"
          onClick={() => scroll(1)}
          aria-label="Next reviews"
        >
          <FiArrowRight />
        </button>
      </div>

      <div className="hl-container text-center mt-5">
        <Link to={testimonials.cta.to} className="btn btn-gold">
          {testimonials.cta.label}
        </Link>
      </div>
    </section>
  )
}

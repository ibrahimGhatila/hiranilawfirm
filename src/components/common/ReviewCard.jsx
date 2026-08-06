/**
 * Google-style client review card — shared by the home carousel and the
 * Reviews page grid so both stay identical.
 */
import { useState, useRef, useEffect } from 'react'
import data from '../../data/active.js'

function GoogleMark() {
  return (
    <svg className="hl-review-google" viewBox="0 0 24 24" aria-label="Google review" role="img">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.8Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.94-2.91l-3.88-3.01c-1.08.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.72-4.95H1.27v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.28a7.2 7.2 0 0 1 0-4.56v-3.1H1.27a12 12 0 0 0 0 10.76l4.01-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.62l4.01 3.1C6.22 6.88 8.87 4.77 12 4.77Z"
      />
    </svg>
  )
}

function VerifiedBadge() {
  return (
    <svg className="hl-review-verified" viewBox="0 0 24 24" aria-label="Verified review" role="img">
      <circle cx="12" cy="12" r="11" fill="#1a73e8" />
      <path
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m7 12.3 3.3 3.3L17 8.9"
      />
    </svg>
  )
}

export default function ReviewCard({ review, className = '' }) {
  const [expanded, setExpanded] = useState(false)
  const [clamped, setClamped] = useState(false)
  const textRef = useRef(null)

  // Only show the toggle when the collapsed text actually overflows its clamp.
  // While expanded we skip re-measuring so the clamped flag (and therefore the
  // "Read less" control) stays put.
  useEffect(() => {
    const el = textRef.current
    if (!el) return
    const measure = () => {
      if (expanded) return
      setClamped(el.scrollHeight > el.clientHeight + 1)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [review.text, expanded])

  return (
    <article className={`hl-review-card ${className}`.trim()}>
      <div className="hl-review-head">
        <div className="hl-review-avatar">{review.initials}</div>
        <div>
          <div className="hl-review-name">{review.name}</div>
          <div className="hl-review-when">{review.when}</div>
        </div>
        <GoogleMark />
      </div>

      <div className="hl-review-rating">
        <span className="hl-review-stars" aria-label={`${review.rating} out of 5 stars`}>
          {'★'.repeat(review.rating)}
        </span>
        {review.verified && <VerifiedBadge />}
      </div>

      <p ref={textRef} className={'hl-review-text' + (expanded ? ' is-expanded' : '')}>
        {review.text}
      </p>
      {(clamped || expanded) && (
        <button
          type="button"
          className="hl-review-more"
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? data.ui.readLess : data.ui.readMore}
        </button>
      )}
    </article>
  )
}

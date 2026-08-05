import { useEffect, useRef, useState } from 'react'
import data from '../../data/active.js'

const { clientsMention } = data

export default function ClientsMention() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  // Animate the bars once the section scrolls into view.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="hl-section hl-bg-cream hl-clients-mention">
      <div className="hl-container" ref={ref}>
        <div className="hl-card-accent">
          <h2 className="hl-h2 mb-3">{clientsMention.title}</h2>
          <p className="hl-lead mb-4 mb-lg-5">{clientsMention.description}</p>

          {clientsMention.metrics.map((metric) => (
            <div className="hl-metric" key={metric.label}>
              <div className="hl-metric-head">
                <span className="hl-metric-label">{metric.label}</span>
                <span className="hl-metric-value">{metric.value}%</span>
              </div>
              <div className="hl-metric-track">
                <div
                  className="hl-metric-fill"
                  style={{ width: visible ? `${metric.value}%` : 0 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

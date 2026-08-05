import { FiDownload } from 'react-icons/fi'
import data from '../../data/active.js'

const { resources } = data

export default function Resources() {
  return (
    <section className="hl-section hl-bg-cream">
      <div className="hl-container text-center">
        <span className="hl-eyebrow">{resources.eyebrow}</span>
        <h2 className="hl-h2 mb-5 mx-auto" style={{ maxWidth: '46rem' }}>
          {resources.title}
        </h2>

        <div className="row g-2 justify-content-center">
          {resources.cards.map((card) => (
            <div className="col-md-8 col-lg-6" key={card.title}>
              <a
                href={card.to}
                download
                className="text-decoration-none d-block"
                aria-label={`Download ${card.title}`}
              >
                <div className="hl-resource-card hl-resource-card--wide mx-auto">
                  <div className="hl-resource-icon">
                    <FiDownload />
                  </div>
                  <h3>{card.title}</h3>
                  <p className="mb-0">{card.description}</p>
                  <div className="hl-resource-meta">{card.meta}</div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

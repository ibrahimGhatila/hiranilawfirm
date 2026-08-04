import { Link } from 'react-router-dom'
import { FiDownload } from 'react-icons/fi'
import data from '../../data/site.json'

const { resources } = data

export default function Resources() {
  return (
    <section className="hl-section hl-bg-cream">
      <div className="hl-container">
        <span className="hl-eyebrow">{resources.eyebrow}</span>
        <h2 className="hl-h2 mb-5" style={{ maxWidth: '38rem' }}>
          {resources.title}
        </h2>

        <div className="row g-4">
          {resources.cards.map((card) => (
            <div className="col-md-6 col-lg-5" key={card.title}>
              <Link to={card.to} className="text-decoration-none d-block">
                <div className="hl-resource-card">
                  <div className="hl-resource-icon">
                    <FiDownload />
                  </div>
                  <h3>{card.title}</h3>
                  <p className="mb-0">{card.description}</p>
                  <div className="hl-resource-meta">{card.meta}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

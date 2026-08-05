import { Link } from 'react-router-dom'
import data from '../../data/active.js'
import images from '../../assets/images.js'

const { practiceAreas } = data

export default function PracticeAreas() {
  return (
    <section className="hl-section hl-bg-cream">
      <div className="hl-container">
        <div className="row g-5 align-items-center">
          {/* Intro copy */}
          <div className="col-lg-4">
            <span className="hl-eyebrow">{practiceAreas.eyebrow}</span>
            <h2 className="hl-h2 mb-4">{practiceAreas.title}</h2>
            <p className="hl-lead mb-0">{practiceAreas.description}</p>
          </div>

          {/* Cards */}
          <div className="col-lg-8">
            <div className="row g-2">
              {practiceAreas.cards.map((card) => (
                <div className="col-md-6" key={card.title}>
                  <div
                    className="hl-practice-card h-100"
                    style={{ '--card-bg': `url(${images[card.image]})` }}
                  >
                    <h3 className="mb-3">{card.title}</h3>
                    <p className="mb-4">{card.description}</p>
                    <Link to={card.to} className="hl-link align-self-start">
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

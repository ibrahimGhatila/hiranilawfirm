import {
  FaBullseye,
  FaLandmark,
  FaRegComments,
  FaBalanceScale,
  FaRegClipboard,
} from 'react-icons/fa'
import data from '../../data/site.json'

const { whyChooseUs } = data

const iconMap = {
  strategy: FaBullseye,
  experience: FaLandmark,
  communication: FaRegComments,
  court: FaBalanceScale,
  evaluation: FaRegClipboard,
}

export default function WhyChooseUs() {
  return (
    <section className="hl-section hl-why">
      <div className="hl-container">
        <span className="hl-eyebrow">{whyChooseUs.eyebrow}</span>
        <h2 className="hl-h2 mb-5" style={{ maxWidth: '68rem' }}>
          {whyChooseUs.title}
        </h2>

        <div className="hl-why-grid">
          {whyChooseUs.features.map((feature) => {
            const Icon = iconMap[feature.icon] || FaBullseye
            return (
              <div className="hl-why-cell" key={feature.title}>
                <div className="hl-why-icon">
                  <Icon />
                </div>
                <h3>{feature.title}</h3>
                <p className="mb-0">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

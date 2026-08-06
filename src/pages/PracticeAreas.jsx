import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import SEO from '../components/common/SEO.jsx'
import PageHero from '../components/common/PageHero.jsx'
import ContactCTA from '../components/home/ContactCTA.jsx'
import images from '../assets/images.js'
import data from '../data/active.js'

const { practiceIndex, familyLawPage, personalInjuryPage } = data

function AreaCard({ area, category }) {
  return (
    <Link to={`/practice-areas/${category}/${area.slug}`} className="text-decoration-none">
      <div className="hl-area-card h-100">
        <img src={images[area.image]} alt={area.title} loading="lazy" />
        <div className="hl-area-body">
          <h3>{area.title}</h3>
          <p>{area.description}</p>
          <span className="hl-link-arrow">
            View More <FiArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  )
}

function AreaSection({ section, areas, category, cols, bg }) {
  const colClass = cols === 3 ? 'col-12 col-md-4' : 'col-12 col-md-6 col-lg-3'
  return (
    <section className={'hl-section' + (bg ? ' hl-bg-cream' : '')}>
      <div className="hl-container">
        <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-5">
          <div style={{ maxWidth: '46rem' }}>
            <h2 className="hl-h2 mb-3">{section.title}</h2>
            <p className="hl-lead mb-0">{section.description}</p>
          </div>
          <Link to={section.cta.to} className="btn btn-dark-solid flex-shrink-0">
            {section.cta.label}
          </Link>
        </div>
        <div className="row g-2">
          {areas.map((area) => (
            <div className={colClass} key={area.slug}>
              <AreaCard area={area} category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function PracticeAreas() {
  return (
    <>
      <SEO
        title={practiceIndex.seo.title}
        description={practiceIndex.seo.description}
        path="/practice-areas"
      />
      <PageHero
        title={practiceIndex.hero.title}
        description={practiceIndex.hero.description}
        crumbs={[{ label: data.ui.practiceAreasLabel, to: '/practice-areas' }]}
        bgImage="page-hero-banner"
      />

      <AreaSection
        section={practiceIndex.familySection}
        areas={familyLawPage.areas}
        category="family-law"
        cols={4}
        bg
      />
      <AreaSection
        section={practiceIndex.injurySection}
        areas={personalInjuryPage.areas}
        category="personal-injury"
        cols={3}
      />

      <ContactCTA />
    </>
  )
}

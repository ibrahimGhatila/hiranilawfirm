import { Link } from 'react-router-dom'
import SEO from '../components/common/SEO.jsx'
import PageHero from '../components/common/PageHero.jsx'
import ContactCTA from '../components/home/ContactCTA.jsx'
import images from '../assets/images.js'
import data from '../data/active.js'

const { teamPage } = data

function MemberCard({ member }) {
  const card = (
    <div className="hl-team-card d-flex flex-column w-100">
      <img src={images[member.image]} alt={member.name} loading="lazy" />
      <div className="hl-team-info flex-grow-1 d-flex flex-column justify-content-center">
        <div className="hl-team-name">{member.name}</div>
        <div className="hl-team-role">{member.role}</div>
      </div>
    </div>
  )
  // Sehar links to her full attorney profile; everyone else to their own page.
  const to = member.to || (member.slug && `/about/our-team/${member.slug}`)
  return to ? (
    <Link to={to} className="text-decoration-none d-flex w-100">
      {card}
    </Link>
  ) : (
    card
  )
}

export default function OurTeam() {
  return (
    <>
      <SEO
        title={teamPage.seo.title}
        description={teamPage.seo.description}
        path="/about/our-team"
      />
      <PageHero
        title={teamPage.hero.title}
        description={teamPage.hero.description}
        crumbs={[{ label: data.ui.crumbs.ourTeam, to: '/about/our-team' }]}
      />

      <section className="hl-section">
        <div className="hl-container">
          <span className="hl-eyebrow">{teamPage.eyebrow}</span>
          <div className="row g-2 mt-1">
            {teamPage.members.map((member) => (
              <div className="col-6 col-md-4 col-lg-3 d-flex" key={member.name}>
                <MemberCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

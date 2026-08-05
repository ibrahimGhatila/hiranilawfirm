import { Navigate, useParams } from 'react-router-dom'
import SEO from '../components/common/SEO.jsx'
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx'
import ContactCTA from '../components/home/ContactCTA.jsx'
import images from '../assets/images.js'
import data from '../data/site.json'

const { teamPage } = data

export default function TeamMember() {
  const { slug } = useParams()
  const member = teamPage.members.find((m) => m.slug === slug)

  // Sehar has her own fuller profile page, and an unknown slug is a 404.
  if (!member) return <Navigate to="/about/our-team" replace />

  return (
    <>
      <SEO
        title={`${member.name} | ${member.role}`}
        description={member.bio[0]}
        path={`/about/our-team/${member.slug}`}
      />

      <section className="hl-member">
        <div className="hl-member-crumbs">
          <Breadcrumbs
            items={[
              { label: 'Our Team', to: '/about/our-team' },
              { label: member.name, to: `/about/our-team/${member.slug}` },
            ]}
          />
        </div>

        <div className="hl-container">
          <div className="row g-5">
            <div className="col-lg-5">
              <div className="hl-member-photo">
                <img src={images[member.image]} alt={member.name} />
              </div>
            </div>
            <div className="col-lg-7">
              <span className="hl-eyebrow">{member.role}</span>
              <h1 className="hl-member-name">{member.name}</h1>
              {member.bio.map((p) => (
                <p key={p} className="hl-member-bio">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

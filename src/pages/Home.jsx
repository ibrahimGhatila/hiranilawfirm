import SEO from '../components/common/SEO.jsx'
import Hero from '../components/home/Hero.jsx'
import StatsBar from '../components/home/StatsBar.jsx'
import PracticeAreas from '../components/home/PracticeAreas.jsx'
import MeetAttorney from '../components/home/MeetAttorney.jsx'
import Memberships from '../components/home/Memberships.jsx'
import ClientsMention from '../components/home/ClientsMention.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import WhyChooseUs from '../components/home/WhyChooseUs.jsx'
import Resources from '../components/home/Resources.jsx'
import ContactCTA from '../components/home/ContactCTA.jsx'
import data from '../data/site.json'

const { business } = data

// LegalService / Attorney structured data for the homepage.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: business.name,
  description: business.tagline,
  url: business.url,
  telephone: business.phone,
  email: business.email,
  image: `${business.url}/og-image.png`,
  priceRange: 'Free Consultation',
  areaServed: business.areasServed.map((a) => ({ '@type': 'City', name: a })),
  founder: { '@type': 'Person', name: business.attorney },
  foundingDate: business.founded,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Houston',
    addressRegion: 'TX',
    addressCountry: 'US',
  },
  sameAs: Object.values(business.social),
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '200',
  },
}

export default function Home() {
  return (
    <>
      <SEO
        path="/"
        jsonLd={jsonLd}
        title=""
        description="Attorney Sehar Hirani helps Greater Houston and Katy families with divorce, custody, child support, adoption, name changes, and personal injury claims. Free confidential case evaluation."
      />
      <Hero />
      <StatsBar />
      <PracticeAreas />
      <MeetAttorney />
      <Memberships />
      <ClientsMention />
      <Testimonials />
      <WhyChooseUs />
      <Resources />
      <ContactCTA />
    </>
  )
}

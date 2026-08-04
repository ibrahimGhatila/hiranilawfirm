import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import AttorneyProfile from './pages/AttorneyProfile.jsx'
import OurTeam from './pages/OurTeam.jsx'
import ServiceAreas from './pages/ServiceAreas.jsx'
import PracticeAreas from './pages/PracticeAreas.jsx'
import FamilyLaw from './pages/FamilyLaw.jsx'
import PersonalInjury from './pages/PersonalInjury.jsx'
import PracticeDetail from './pages/PracticeDetail.jsx'
import Reviews from './pages/Reviews.jsx'
import FAQ from './pages/FAQ.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/sehar-hirani" element={<AttorneyProfile />} />
          <Route path="/about/our-team" element={<OurTeam />} />
          <Route path="/about/service-areas" element={<ServiceAreas />} />
          <Route path="/practice-areas" element={<PracticeAreas />} />
          <Route path="/practice-areas/family-law" element={<FamilyLaw />} />
          <Route path="/practice-areas/personal-injury" element={<PersonalInjury />} />
          <Route path="/practice-areas/:category/:slug" element={<PracticeDetail />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/faqs" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  )
}

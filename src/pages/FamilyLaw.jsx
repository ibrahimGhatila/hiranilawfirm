import PracticeAreaTemplate from './PracticeAreaTemplate.jsx'
import data from '../data/active.js'

export default function FamilyLaw() {
  return (
    <PracticeAreaTemplate
      page={data.familyLawPage}
      path="/practice-areas/family-law"
      category="family-law"
      cols={4}
    />
  )
}

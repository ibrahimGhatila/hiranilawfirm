import PracticeAreaTemplate from './PracticeAreaTemplate.jsx'
import data from '../data/site.json'

export default function FamilyLaw() {
  return (
    <PracticeAreaTemplate
      page={data.familyLawPage}
      path="/practice-areas/family-law"
      crumb="Family Law"
      category="family-law"
      cols={4}
    />
  )
}

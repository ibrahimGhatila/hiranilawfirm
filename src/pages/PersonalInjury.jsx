import PracticeAreaTemplate from './PracticeAreaTemplate.jsx'
import data from '../data/site.json'

export default function PersonalInjury() {
  return (
    <PracticeAreaTemplate
      page={data.personalInjuryPage}
      path="/practice-areas/personal-injury"
      category="personal-injury"
      cols={3}
    />
  )
}

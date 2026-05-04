import Hero from '../sections/Hero'
import CapabilityGrid from '../sections/CapabilityGrid'
import FeatureSections from '../sections/FeatureSections'
import Process from '../sections/Process'
import RecentProjects from '../sections/RecentProjects'
import FinalCTA from '../sections/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityGrid />
      <FeatureSections />
      <Process />
      <RecentProjects />
      <FinalCTA />
    </>
  )
}

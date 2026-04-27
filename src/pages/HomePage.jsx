import Hero from '../sections/Hero'
import CapabilityGrid from '../sections/CapabilityGrid'
import FeatureSections from '../sections/FeatureSections'
import WhyParallax from '../sections/WhyParallax'
import Process from '../sections/Process'
import RecentProjects from '../sections/RecentProjects'

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityGrid />
      <FeatureSections />
      <Process />
      <WhyParallax />
      <RecentProjects />
    </>
  )
}

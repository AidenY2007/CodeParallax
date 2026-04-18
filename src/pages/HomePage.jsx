import Hero from '../sections/Hero'
import CapabilityGrid from '../sections/CapabilityGrid'
import FeatureSections from '../sections/FeatureSections'
import WhyParallax from '../sections/WhyParallax'
import Process from '../sections/Process'
import PricingPreview from '../sections/PricingPreview'
import FinalCTA from '../sections/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityGrid />
      <FeatureSections />
      <WhyParallax />
      <Process />
      <PricingPreview />
      <FinalCTA />
    </>
  )
}

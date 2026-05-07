import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../sections/Hero'
import CapabilityGrid from '../sections/CapabilityGrid'
import FeatureSections from '../sections/FeatureSections'
import Process from '../sections/Process'
import RecentProjects from '../sections/RecentProjects'
import FinalCTA from '../sections/FinalCTA'

export default function HomePage() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return

    const id = location.hash.slice(1)
    const timeout = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)

    return () => window.clearTimeout(timeout)
  }, [location.hash])

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

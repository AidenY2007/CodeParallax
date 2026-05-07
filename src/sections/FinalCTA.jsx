import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useStartProject } from '../hooks/useStartProject'

const AURORA = 'linear-gradient(135deg, #0f9b74 0%, #06b6d4 55%, #8b5cf6 100%)'
const MotionDiv = motion.div
const MotionP = motion.p
const MotionH2 = motion.h2

export default function FinalCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const startProject = useStartProject()

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <MotionDiv
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(#0c1426, #0c1426) padding-box, linear-gradient(135deg, #0f9b74, #06b6d4, #8b5cf6) border-box',
            border: '1px solid transparent',
          }}
        >
          {/* Aurora background fill */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{ background: 'linear-gradient(135deg, rgba(15,155,116,0.07) 0%, rgba(6,182,212,0.06) 50%, rgba(139,92,246,0.05) 100%)' }}
          />

          {/* Top edge glow line */}
          <div className="absolute top-0 left-1/4 right-1/4 h-px opacity-70"
            style={{ background: AURORA }} />

          {/* Center glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 rounded-full pointer-events-none blur-[70px] opacity-25"
            style={{ background: AURORA }}
          />

          <div className="relative text-center py-20 px-8">
            <MotionH2
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05] mb-2"
            >
              Reimagine with{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: AURORA }}>
                Parallax
              </span>
            </MotionH2>

            <MotionP
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-white text-lg mb-8 max-w-lg mx-auto leading-relaxed"
            >
              The future of your business lives here. Reach out today.
            </MotionP>

            <MotionDiv
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <button
                onClick={startProject}
                className="group flex items-center justify-center gap-2 px-8 py-4 text-white text-sm font-bold rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: AURORA, boxShadow: '0 4px 28px rgba(15,155,116,0.30)' }}
              >
                Contact
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </MotionDiv>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}

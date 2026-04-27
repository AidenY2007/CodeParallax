import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const AURORA = 'linear-gradient(135deg, #0f9b74 0%, #06b6d4 55%, #8b5cf6 100%)'

export default function FinalCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-28 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
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

          {/* Center bloom */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-36 opacity-15 blur-3xl rounded-full pointer-events-none animate-glow-pulse"
            style={{ background: AURORA }}
          />

          <div className="relative text-center py-20 px-8">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-5 bg-clip-text text-transparent"
              style={{ backgroundImage: AURORA }}
            >
              Join the Parallax network
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05] mb-6"
            >
              Build with{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: AURORA }}>
                Parallax
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed"
            >
              Enter the network. Tell us what you're building — we'll respond within one business day.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex justify-center"
            >
              <Link
                to="/contact"
                className="group flex items-center justify-center gap-2 px-8 py-4 text-white text-sm font-bold rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: AURORA, boxShadow: '0 4px 28px rgba(15,155,116,0.30)' }}
              >
                Start a project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
